import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
function buildSite(observationsText, staffingText) {
  const JURS=["SA","VIC","NSW","QLD","WA","TAS","ACT","NT"];
  const NAMES={SA:"South Australia",VIC:"Victoria",NSW:"New South Wales",QLD:"Queensland",WA:"Western Australia",TAS:"Tasmania",ACT:"Australian Capital Territory",NT:"Northern Territory"};
  const SERIES={
    new:{SA:"firearms_licence_application",VIC:"new_firearm_licence_application"},
    renewal:{SA:"firearms_licence_renewal",VIC:"firearm_licence_renewal_application"},
    pta:{SA:"permit_to_acquire",VIC:"online_permit_to_acquire"}
  };
  function parseCSV(s) {
    const rows=[];let row=[],cell="",quoted=false;
    for(let i=0;i<s.length;i++){
      const c=s[i];
      if(quoted){
        if(c==='"'&&s[i+1]==='"'){cell+='"';i++}
        else if(c==='"')quoted=false;
        else cell+=c;
      }else if(c==='"')quoted=true;
      else if(c===','){row.push(cell);cell=""}
      else if(c==='\n'){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell=""}
      else cell+=c;
    }
    if(row.length||cell)rows.push([...row,cell]);
    if(quoted)throw Error("Unclosed CSV quotation");
    const head=rows.shift();
    if(!head||new Set(head).size!==head.length)throw Error("Invalid CSV header");
    return rows.filter(r=>r.length).map((r,i)=>{
      if(r.length!==head.length)throw Error("CSV width mismatch at record "+(i+2));
      return Object.fromEntries(head.map((k,n)=>[k,r[n]]));
    });
  }
  const obs=parseCSV(observationsText).filter(r=>r.evidence_status==="verified"&&r.evidence_path);
  const staffing=parseCSV(staffingText).filter(r=>r.evidence_status==="verified"&&r.evidence_path);
  const officialDate=r=>r.metric_date||r.source_updated_date||"";
  const sortDate=r=>officialDate(r)||r.observation_date;
  const compare=(a,b)=>sortDate(a).localeCompare(sortDate(b));
  const latest=arr=>arr.slice().sort(compare).at(-1);
  const shownDate=r=>officialDate(r)||"not stated / 未注明";
  const xml=v=>String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
  const barNum=n=>Number.isInteger(n)?String(n):Number(n).toFixed(2);
  const categoryRows={};
  for(const [cat,mapping]of Object.entries(SERIES)){
    categoryRows[cat]=Object.entries(mapping).map(([j,series])=>{
      const r=latest(obs.filter(x=>x.jurisdiction===j&&x.series===series&&x.metric_type==="processing_date"&&Number(x.backlog_age_days)>0&&officialDate(x)));
      return r?{key:j,label:j+" · "+(cat==="new"?"new licence":cat==="renewal"?"renewal":j==="SA"?"PTA":"online PTA"),series,backlog_age_days:Number(r.backlog_age_days),metric_date:officialDate(r),source_url:r.source_url,evidence_path:r.evidence_path}:null;
    }).filter(Boolean);
  }
  const outputs={};
  outputs["docs/assets/dashboard-data.json"]=JSON.stringify({generated_from:"verified committed CSV records",categories:categoryRows},null,2)+"\n";
  function barSvg(title,subtitle,rows,foot){
    const h=185+rows.length*92;
    let s=`<svg xmlns="http://www.w3.org/2000/svg" width="1150" height="${h}" viewBox="0 0 1150 ${h}" role="img" aria-label="${xml(title)}"><title>${xml(title)}</title><rect width="1150" height="${h}" fill="#f6f9fb"/><rect x="32" y="29" width="7" height="54" rx="3" fill="#168092"/><text x="60" y="60" font-size="31" font-weight="700" font-family="Arial,sans-serif" fill="#193e57">${xml(title)}</text><text x="60" y="88" font-size="18" font-family="Arial,sans-serif" fill="#536a79">${xml(subtitle)}</text>`;
    const max=Math.max(1,...rows.map(x=>x.value));
    for(let i=0;i<rows.length;i++){
      const r=rows[i],y=113+i*92,w=(r.value/max)*570;
      s+=`<text x="50" y="${y+26}" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="#24455a">${xml(r.label)}</text><rect x="430" y="${y+1}" width="580" height="32" rx="9" fill="#dfeaf0"/><rect x="430" y="${y+1}" width="${w.toFixed(1)}" height="32" rx="9" fill="${i%2?"#42849c":"#147a88"}"/><text x="1024" y="${y+26}" font-family="Arial,sans-serif" font-size="25" font-weight="700" fill="#163e55">${xml(r.display||barNum(r.value))}</text><text x="435" y="${y+57}" font-family="Arial,sans-serif" font-size="15" fill="#536a79">${xml(r.note||"")}</text>`;
    }
    s+=`<text x="50" y="${h-23}" font-family="Arial,sans-serif" font-size="16" fill="#526a7b">${xml(foot)}</text></svg>\n`;
    return s;
  }
  const labels={new:"NEW LICENCE / 新证",renewal:"RENEWAL / 续证",pta:"PTA / 购买许可"};
  for(const [cat,filename]of [["new","new-licence-backlog.svg"],["renewal","renewal-backlog.svg"],["pta","pta-backlog.svg"]]){
    outputs["docs/images/"+filename]=barSvg(labels[cat]+" — QUEUE-DATE LAG","Published queue-date backlog age / 官方处理日期滞后 · calendar days",categoryRows[cat].map(x=>({label:x.label,value:x.backlog_age_days,display:x.backlog_age_days+" d",note:"Official as at "+x.metric_date})),"Queue-date lag is NOT completed-applicant waiting time or staff efficiency.");
  }
  const avgSpec=[["QLD · new licence","QLD","new_licence_online"],["QLD · PTA","QLD","permit_to_acquire_online"],["NSW · new licence","NSW","new_licence_application_average"],["NSW · renewal","NSW","licence_renewal_average"],["NSW · PTA","NSW","pta_average"]];
  const avgs=avgSpec.map(([label,jur,series])=>{
    const r=latest(obs.filter(x=>x.jurisdiction===jur&&x.series===series&&(x.metric_type==="average_processing_days"||x.metric_type==="average_processing_weeks")&&Number.isFinite(Number(x.metric_value))&&Number(x.metric_value)>=0&&officialDate(x)));
    if(!r)return null;
    const days=Number(r.metric_value)*(r.metric_type==="average_processing_weeks"?7:1);
    return{label,value:days,display:barNum(days)+" d",note:r.metric_value+" "+(r.metric_type==="average_processing_weeks"?"weeks":"days")+" as reported · "+officialDate(r)};
  }).filter(Boolean);
  outputs["docs/images/average-time-overview.svg"]=barSvg("OFFICIAL MEAN TIMES / 官方平均时间","Days conversion for visual reading only — cohorts and rules can differ",avgs,"Different statutory waiting and cohort definitions: NOT a harmonised efficiency ranking.");
  const histories=[];
  for(const [cat,mapping]of Object.entries(SERIES)){
    for(const [jur,series]of Object.entries(mapping)){
      const seq=obs.filter(r=>r.jurisdiction===jur&&r.series===series&&r.metric_type==="processing_date"&&Number(r.backlog_age_days)>0&&officialDate(r)>="2026-09-01").sort(compare);
      if(seq.length<2)continue;
      const baseline=seq[0],recent=seq.at(-1),base=Number(baseline.backlog_age_days);
      if(base<=0)continue;
      const value=Number(recent.backlog_age_days)/base;
      histories.push({label:jur+" · "+cat,value,display:value.toFixed(2)+"×",note:"Reference "+officialDate(baseline)+" → "+officialDate(recent)});
    }
  }
  outputs["docs/images/historical-index.svg"]=barSvg("WITHIN-SERIES HISTORY / 自身历史指数","Each series starts from its own earliest verified Sep 2026 baseline = 1.00",histories,"Own-history change is NOT a cross-state absolute waiting time or productivity ranking.");
  function trendSvg(jur,series,title){
    const rows=obs.filter(x=>x.jurisdiction===jur&&x.series===series&&x.metric_type==="processing_date"&&officialDate(x)&&Number.isFinite(Number(x.backlog_age_days))&&Number(x.backlog_age_days)>=0).sort(compare);
    const h=390;let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1050" height="${h}" viewBox="0 0 1050 ${h}" role="img" aria-label="${xml(title)}"><title>${xml(title)}</title><rect width="1050" height="${h}" fill="#f6f9fb"/><text x="40" y="49" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#193e57">${xml(title)}</text>`;
    if(rows.length>=2){
      const lo=Math.min(...rows.map(r=>Number(r.backlog_age_days))),hi=Math.max(...rows.map(r=>Number(r.backlog_age_days)));
      const coords=rows.map((r,i)=>[90+i/(rows.length-1)*850,302-(Number(r.backlog_age_days)-lo)*210/Math.max(1,hi-lo)]);
      svg+=`<path d="M90 302 H960" stroke="#cad9e2" stroke-width="2"/><polyline points="${coords.map(x=>x.map(v=>v.toFixed(1)).join(",")).join(" ")}" fill="none" stroke="#138090" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
      for(const p of coords)svg+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4.5" fill="#155875"/>`;
      svg+=`<text x="90" y="337" fill="#576e7b" font-size="17" font-family="Arial,sans-serif">${xml(officialDate(rows[0]))}</text><text x="960" y="337" text-anchor="end" fill="#576e7b" font-size="17" font-family="Arial,sans-serif">${xml(officialDate(rows.at(-1)))}</text>`;
    }else svg+=`<text x="90" y="160" font-size="24" fill="#617687">Not enough comparable observations / 目前数据不足</text>`;
    svg+=`<text x="40" y="375" fill="#607987" font-size="15" font-family="Arial,sans-serif">Historical queue-date lag in days; source definitions and dates may change.</text></svg>\n`;
    return svg;
  }
  for(const jur of ["SA","VIC"])outputs["docs/images/"+jur.toLowerCase()+"-new-trend.svg"]=trendSvg(jur,SERIES.new[jur],jur+" NEW LICENCE / 新证历史变化");
  function sourceLinks(r){
    const origin=r.source_url?`[official source](${r.source_url})`:"source not stated";
    return origin+" · [evidence](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/"+r.evidence_path+")";
  }
  function cell(v){return String(v??"").replace(/\|/g," / ").replace(/\r?\n/g," ").trim();}
  const baseurl="https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/";
  for(const jur of JURS){
    const current=obs.filter(r=>r.jurisdiction===jur),seen=[...new Set(current.map(x=>x.series))],recent=seen.map(series=>latest(current.filter(x=>x.series===series))).filter(Boolean).sort((a,b)=>compare(b,a));
    let md=`# ${jur} · ${NAMES[jur]}\n\n**Official verified records / 官方已核实记录**. Not a personal application-date forecast. / 不提供个人审批时间预测。\n\n[← National dashboard / 全国总览](../overview.md)\n\n## Latest official records / 最新官方记录\n\n| Series / 业务 | Metric type / 口径 | Value / 数值 | Official as-at / 官方统计日 | Evidence / 证据 |\n|---|---|---|---|---|\n`;
    for(const r of recent){
      let value;
      if(r.metric_type==="processing_date")value=r.processing_date?"processing "+r.processing_date+(r.backlog_age_days?" · queue-date lag "+r.backlog_age_days+" d":""):"no processing date";
      else value=(r.metric_value||"context only")+(r.metric_unit?" "+r.metric_unit:"");
      md+=`| \`${cell(r.series)}\` | \`${cell(r.metric_type)}\` | ${cell(value)} | ${shownDate(r)} | ${sourceLinks(r)} |\n`;
    }
    if(!recent.length)md+="| No verified entries | — | — | — | — |\n";
    md+=`\n## Trend / 历史趋势\n\n`;
    if(jur==="SA"||jur==="VIC")md+=`![${jur} new licence queue-date history](../images/${jur.toLowerCase()}-new-trend.svg)\n\n`;
    else md+=`A comparable continuous processing-date series has not been verified for this jurisdiction. / 暂无适用于该辖区的连续处理日期序列，不制作虚假趋势图。\n\n`;
    md+=`## Staffing and capacity / 人员与行政能力\n\n`;
    const st=staffing.filter(r=>r.jurisdiction===jur).sort((a,b)=>(a.as_of_date||a.observation_date).localeCompare(b.as_of_date||b.observation_date)).slice(-12);
    if(st.length){
      md+="| Measure / 口径 | Reported values / 记录 | Official as-at / 官方日期 | Evidence / 证据 |\n|---|---|---|---|\n";
      const fields=["headcount","fte","permanent_positions","funded_positions","vacancies","recruitment_positions","sworn_headcount","permanent_unsworn_headcount","temporary_unsworn_headcount","approved_permanent_sworn_positions","estimated_total_cost_aud_m","approved_funding_aud_m"];
      for(const r of st){
        const vals=fields.filter(f=>r[f]).map(f=>f+" "+r[f]).join("; ")||"Official context only / 无明确人数";
        md+=`| \`${cell(r.metric_type)}\` | ${cell(vals)} | ${r.as_of_date||"not stated"} | ${sourceLinks(r)} |\n`;
      }
    }else md+="No matching verified quantitative workforce data in the current archive. / 当前资料库尚无同口径的已核实人员数据。\n";
    md+=`\n## Evidence limitations / 数据局限\n\n- Published processing dates, averages, minimum waits and staffing measures are different quantities. / 不同指标不可混为一谈。\n- Disclosure dates can differ. Missing data do not represent zero backlog. / 数据日期各异；未公开不等于零积压。\n- The archive does not include individual applicant data or case-specific predictions. / 本资料库不存储个人申请数据。\n\n[Raw processing observations](${baseurl}data/observations.csv) · [Raw staffing disclosures](${baseurl}data/staffing.csv) · [Evidence directory](https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/tree/main/evidence/${jur})\n`;
    outputs["docs/jurisdictions/"+jur+".md"]=md;
  }
  const cover=JURS.map(j=>`<div class="metric-panel"><div class="label"><a href="jurisdictions/${j}/">${j}</a></div><div class="muted">${NAMES[j]}</div></div>`).join("\n");
  outputs["docs/index.md"]=`# Australian Firearms Licensing Tracker\n### 澳大利亚枪证行政处理进度与积压追踪\n\n<div class="hero-copy">Independent evidence-first comparison of public licensing data across eight Australian jurisdictions. / 以公开官方证据为基础，跟踪澳大利亚八个辖区的行政处理及积压变化。</div>\n\n<div class="hero-links"><a href="overview/">National dashboard / 全国总览</a><a href="jurisdictions/SA/" class="secondary">Jurisdictions / 各州</a><a href="contribute/" class="secondary">Contribute / 贡献</a></div>\n\n## Latest new-licence queue-date comparison / 最新新证处理日期对比\n\n![New licence queue-date lag](images/new-licence-backlog.svg)\n\n*Reported queue-date age, not mean processing time or productivity. Reporting dates may differ. / 公开队列日期滞后，不是平均办理耗时或警员效率，统计日期可能不同。*\n\n## Jurisdiction pages / 辖区详情\n\n<div class="coverage-grid">\n${cover}\n</div>\n\n[Complete comparison / 全国比较](overview.md) · [Indices explained / 指数方法](methodology/comparison-indices.md) · [Source freshness / 来源时效](methodology/data-freshness.md)\n\nThis is not a live government application-tracking service. / 这不是政府实时个人申请进度查询系统。\n`;
  outputs["docs/overview.md"]=`# National dashboard / 全国总览\n\n**Verified repository snapshots; NOT live government data or individual application forecasts.**  \n**以下为仓库已核实记录，不是实时政府数据，也不提供个人审批预测。**\n\n<div class="hero-links"><a href="../jurisdictions/SA/">South Australia</a><a href="../jurisdictions/VIC/">Victoria</a><a href="../methodology/comparison-indices/" class="secondary">Comparison rules / 比较方法</a></div>\n\n## Published queue-date backlog age / 处理日期积压年龄\n\nThese are categories, not a pooled cross-state efficiency ranking. Published as-at dates differ. / 仅在业务类别内描述公开处理日期滞后，且各州统计日并非完全相同。\n\n### New licence / 新证\n\n![New licence backlog age](images/new-licence-backlog.svg)\n\n### Renewal / 续证\n\n![Renewal backlog age](images/renewal-backlog.svg)\n\n### Permit to acquire / PTA\n\n![PTA backlog age](images/pta-backlog.svg)\n\n## Select reference = 1.00 / 自选相对基准 1.00\n\nThe selectable reference index compares **published queue-date ages**, not officer productivity or actual individual wait durations. / 指数只表示官方公布处理日期的相对滞后，不代表警员效率或个人办理时间。\n\n<div id="benchmark-comparison" class="compare-panel" data-source="../assets/dashboard-data.json"><p>Loading verified records / 加载已核实数据…</p></div>\n\n## Average time series / 官方平均办理时间\n\n![NSW and QLD officially published means](images/average-time-overview.svg)\n\nQLD online averages and NSW registry averages have different definitions and possible statutory waiting inclusions. We convert weeks to days only for **visual scale**, not a harmonised performance index. / 单位换算只是方便阅读，绝不据此给警方效率排名。\n\n## Own-history change / 各序列自身变化\n\n![Within-series relative indices](images/historical-index.svg)\n\nEach series uses its own earliest verified positive backlog-age point since September 2026 as 1.00; periods differ. / 每个序列分别以其 2026 年 9 月以来最早有效已核实值为 1.00 基准，无法视为相同起点的横向实验。\n\n## Staff and administrative resources / 官方人员及处理能力\n\n![Distinct official staffing and resources](images/staffing-capacity-overview.svg)\n\n[Official staffing CSV](${baseurl}data/staffing.csv) · [Staffing scope method](${baseurl}analysis/staffing-methodology.md)\n\n## Other jurisdictions / 无连续可比指标的辖区\n\nACT, NT, TAS and WA currently hold official workflow, statutory or historical observations without a continuous comparable current processing-date series. Missing values do not mean zero backlog. / 缺少连续数据不代表不存在积压。\n\n[ACT](jurisdictions/ACT.md) · [NT](jurisdictions/NT.md) · [TAS](jurisdictions/TAS.md) · [WA](jurisdictions/WA.md) · [Methodology](methodology/comparison-indices.md)\n`;
  return outputs;
}
const site=buildSite(readFileSync(join(ROOT,'data/observations.csv'),'utf8'),readFileSync(join(ROOT,'data/staffing.csv'),'utf8'));
const check=process.argv.includes('--check');
let mismatches=0;
for(const [name,expected] of Object.entries(site)){
  const pathname=join(ROOT,name);
  if(check){let actual='';try{actual=readFileSync(pathname,'utf8')}catch{};
    if(actual!==expected){console.error('OUTDATED GENERATED SITE FILE: '+name);mismatches++;}
  }else{mkdirSync(dirname(pathname),{recursive:true});writeFileSync(pathname,expected,'utf8');console.log('Generated '+name);}
}
if(check){if(mismatches){console.error('Site generation mismatches: '+mismatches);process.exitCode=1;}else console.log('All '+Object.keys(site).length+' generated site files are current.');}
