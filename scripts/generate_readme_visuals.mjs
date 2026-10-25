import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function renderCharts(obsCsv,staffCsv){
function parseCSV(src){let all=[],row=[],v="",inside=false;for(let i=0;i<src.length;i++){const c=src[i];if(inside){if(c==='"'&&src[i+1]==='"'){v+='"';i++;}else if(c==='"')inside=false;else v+=c;}else if(c==='"')inside=true;else if(c===','){row.push(v);v="";}else if(c==='\n'){row.push(v.replace(/\r$/,""));all.push(row);row=[];v="";}else v+=c;}if(row.length||v)all.push([...row,v]);const head=all.shift();return all.filter(r=>r.length===head.length).map(r=>Object.fromEntries(head.map((c,i)=>[c,r[i]])));}
const obs=parseCSV(obsCsv),st=parseCSV(staffCsv);
function latest(rows,jur,series,type){const a=rows.filter(r=>r.jurisdiction===jur&&r.evidence_status==="verified"&&(series===null||r.series===series)&&(type===null||r.metric_type===type));a.sort((x,y)=>(x.metric_date||x.source_updated_date||x.observation_date).localeCompare(y.metric_date||y.source_updated_date||y.observation_date));return a[a.length-1]||null;}
function mustObs(j,s){const r=latest(obs,j,s,null);if(!r||!r.evidence_path)throw Error("Missing official verified observation "+j+"/"+s);return r}
function mustSt(j,t){const r=latest(st,j,null,t);if(!r||!r.evidence_path)throw Error("Missing official verified staffing "+j+"/"+t);return r}
const sa=mustObs("SA","firearms_licence_application"),vic=mustObs("VIC","new_firearm_licence_application"),qNew=mustObs("QLD","new_licence_online"),qPta=mustObs("QLD","permit_to_acquire_online"),nsw=mustObs("NSW","new_licence_application_average"),nswPta=mustObs("NSW","pta_average"),nswRenew=mustObs("NSW","licence_renewal_average"),tas=mustObs("TAS","licence_application_minimum_wait"),act=mustObs("ACT","permit_to_acquire_minimum_wait");
const qStaff=mustSt("QLD","substantive_headcount_components"),qApproved=mustSt("QLD","approved_permanent_sworn_positions"),nswPos=mustSt("NSW","permanent_positions"),nswRecruit=mustSt("NSW","recruitment_positions"),saFte=mustSt("SA","fte"),wa=mustSt("WA","ict_capacity_funding");
const fmt=d=>{if(!d)return "not stated";const [y,m,day]=d.split("-");return `${day} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][Number(m)-1]} ${y}`;};
const xml=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const col={bg:"#F5F8FB",white:"#FFFFFF",navy:"#1A344A",text:"#254358",muted:"#66788A",line:"#DFE8EE",teal:"#0E8A84",tealLight:"#DCF3ED",blue:"#3367A6",blueLight:"#E3EEFB",amber:"#B16A25",amberLight:"#FFF0DE",gray:"#697788",grayLight:"#EDF1F6"};
const T=(x,y,t,size=20,color=col.text,weight=400,anchor="start")=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-family="Arial,Helvetica,sans-serif" font-weight="${weight}" text-anchor="${anchor}">${xml(t)}</text>`;
const R=(x,y,w,h,fill=col.white,r=18,stroke=col.line,sw=1)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col.line}" stroke-width="1"/>`;
const pill=(x,y,label,bg,fg,w)=>R(x,y,w,30,bg,15,bg,0)+T(x+w/2,y+21,label,13,fg,700,"middle");
const shell=(w,h,title,desc,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${xml(title)}"><title>${xml(title)}</title><desc>${xml(desc)}</desc>${R(0,0,w,h,col.bg,0,col.bg,0)}${body}</svg>\n`;
let a=[];
a.push(R(48,36,6,72,col.teal,3,col.teal,0));
a.push(T(72,72,"PUBLIC LICENSING PROCESSING",31,col.navy,800));
a.push(T(72,107,"澳大利亚各辖区最新已核实公开指标 · 各州指标口径不同，不作横向排名",19,col.muted,500));
a.push(pill(1130,48,"8 JURISDICTIONS",col.blueLight,col.blue,295));
a.push(T(49,157,"Same-jurisdiction trends only / 仅同一统计口径的数据可比较",18,col.muted,600));
const infos=[
["SA","PROCESSING DATE",`New licence: ${fmt(sa.processing_date)}`,`Backlog age ${sa.backlog_age_days} days · as at ${fmt(sa.metric_date)}`,`Latest ${sa.elapsed_days}-day change: ${Number(sa.backlog_age_change_days)<0?"−":"+"}${Math.abs(Number(sa.backlog_age_change_days))} days`,col.teal,col.tealLight],
["VIC","PROCESSING DATE",`New licence: ${fmt(vic.processing_date)}`,`Backlog age ${vic.backlog_age_days} days · as at ${fmt(vic.metric_date)}`,`Latest ${vic.elapsed_days}-day change: ${Number(vic.backlog_age_change_days)<0?"−":"+"}${Math.abs(Number(vic.backlog_age_change_days))} days`,col.blue,col.blueLight],
["QLD","AVERAGE TIME",`New licence average: ${qNew.metric_value} weeks`,`PTA average ${qPta.metric_value} days · as at ${fmt(qNew.metric_date)}`,"Means, not a queue processing date",col.amber,col.amberLight],
["NSW","MONTHLY AVERAGE",`New licence average: ${nsw.metric_value} days`,`PTA ${nswPta.metric_value} days · renewal ${nswRenew.metric_value} days`,`Report period: ${fmt(nsw.metric_date)} · statutory wait included`,col.blue,col.blueLight],
["ACT","MINIMUM / POLICY","No verified comparable queue-age series",`PTA statutory minimum: ${act.metric_value} days`,"Minimum ≠ observed processing performance",col.gray,col.grayLight],
["TAS","MINIMUM / POLICY","No verified comparable queue-age series",`Licence minimum: ${tas.metric_value} days`,"Minimum ≠ average or accumulated backlog",col.gray,col.grayLight],
["NT","WORKFLOW CONTEXT","No current waiting-time series in dataset","Official throughput and processing rules tracked","Annual throughput ≠ licence queue age",col.gray,col.grayLight],
["WA","TRANSITION CONTEXT","No current waiting-time series in dataset","Historical backlog and transition statistics tracked","Transition counts ≠ current processing duration",col.gray,col.grayLight],
];
for(let i=0;i<infos.length;i++){const [j,kind,l1,l2,l3,fg,bg]=infos[i];const x=i%2===0?48:758,y=192+Math.floor(i/2)*176,w=674; a.push(R(x,y,w,159,col.white,17,col.line));a.push(R(x+17,y+21,6,39,fg,3,fg,0));a.push(T(x+36,y+47,j,27,col.navy,800));const chipw=Math.max(153,kind.length*10.2+28);a.push(pill(x+w-chipw-21,y+17,kind,bg,fg,chipw));a.push(T(x+25,y+85,l1,23,col.text,700));a.push(T(x+25,y+118,l2,19,col.text,500));a.push(T(x+25,y+145,l3,16,col.muted,400));}
a.push(T(50,933,"SOURCE: verified records in data/observations.csv  •  Static extract; not live advice or an applicant-specific forecast",15,col.muted,500));
const processing=shell(1480,964,"Current public firearms licensing processing indicators","Eight Australian jurisdictions; native metrics, no forced rankings, verified evidence only.",a.join(""));
let b=[];
b.push(R(48,36,6,72,col.teal,3,col.teal,0));
b.push(T(72,72,"OFFICIAL STAFFING & CAPACITY DISCLOSURES",30,col.navy,800));
b.push(T(72,106,"官方披露的编制、人数与系统投入 · 不是当前实际在岗警员人数排名",19,col.muted,500));
b.push(pill(1118,46,"NON-COMPARABLE",col.amberLight,col.amber,314));
b.push(T(50,158,"Different source dates and measurement units; do not add or compare these figures as if all were employed officers.",17,col.muted,500));
const y=188,h=454,w=438,xq=48,xn=521,xs=994;
b.push(R(xq,y,w,h));b.push(T(xq+26,y+43,"QLD   /   Weapons Licensing Group",19,col.navy,700));
b.push(T(xq+26,y+78,`As at ${fmt(qStaff.as_of_date)} · headcount components`,16,col.muted));
let bars=[["Permanent police",Number(qStaff.sworn_headcount),col.teal],["Permanent civilian",Number(qStaff.permanent_unsworn_headcount),col.blue],["Temporary civilian",Number(qStaff.temporary_unsworn_headcount),col.amber]];
for(let i=0;i<bars.length;i++){const [name,n,colour]=bars[i], yy=y+122+i*92; b.push(T(xq+27,yy,name,19,col.text,600));b.push(T(xq+w-28,yy,String(n),24,col.navy,800,"end"));b.push(R(xq+27,yy+18,374,15,col.grayLight,7,col.grayLight,0));b.push(R(xq+27,yy+18,Math.max(4,374*n/65),15,colour,7,colour,0));}
b.push(line(xq+26,y+399,xq+w-26,y+399));b.push(T(xq+26,y+422,`Approved permanent police posts: ${qApproved.approved_permanent_sworn_positions}`,17,col.text,600));b.push(T(xq+26,y+444,`Separate disclosure: ${fmt(qApproved.as_of_date)}`,14,col.muted));
b.push(R(xn,y,w,h));b.push(T(xn+26,y+43,"NSW   /   Firearms Registry",19,col.navy,700));b.push(T(xn+26,y+78,`As at ${fmt(nswPos.as_of_date)}`,16,col.muted));
b.push(T(xn+28,y+186,nswPos.permanent_positions,99,col.blue,800));b.push(T(xn+169,y+183,"PERMANENT",20,col.navy,700));b.push(T(xn+169,y+210,"POSITIONS",20,col.navy,700));
b.push(line(xn+26,y+234,xn+w-26,y+234));b.push(T(xn+27,y+276,`${nswPos.vacancies} recorded vacancy`,24,col.text,700));
b.push(T(xn+27,y+317,`+${nswRecruit.recruitment_positions} additional positions announced`,21,col.amber,700));b.push(T(xn+27,y+345,`Announcement: ${fmt(nswRecruit.as_of_date)}`,15,col.muted));
b.push(T(xn+27,y+409,"Positions / planned hires ≠ filled headcount",17,col.muted));
b.push(R(xs,y,w,h));b.push(T(xs+26,y+43,"SA   /   Registry & Adjudication",19,col.navy,700));b.push(T(xs+26,y+78,`FOI disclosure: ${fmt(saFte.as_of_date)}`,16,col.muted));
b.push(T(xs+26,y+193,saFte.fte,91,col.teal,800));b.push(T(xs+275,y+182,"FTE",34,col.navy,700));
b.push(T(xs+27,y+237,"SUBSTANTIVE POSITIONS",17,col.text,700));b.push(line(xs+26,y+264,xs+w-26,y+264));
b.push(T(xs+27,y+304,"Temporary staff also mentioned",19,col.text,600));
b.push(T(xs+27,y+334,"but not numerically specified.",19,col.text,500));
b.push(T(xs+27,y+405,"17.8 is not a confirmed total workforce",17,col.muted));
b.push(R(48,674,672,210));b.push(T(76,721,"WA   /   ICT INVESTMENT (NOT STAFF)",20,col.navy,700));
b.push(T(76,753,"Firearms Licensing & Registry System · 16 Jun 2025",17,col.muted));
b.push(T(76,803,`AUD ${wa.estimated_total_cost_aud_m}m`,33,col.blue,800));b.push(T(350,803,`estimated cost`,18,col.text,500));
b.push(T(76,851,`AUD ${wa.approved_funding_aud_m}m approved funding · ${wa.percentage_unfunded}% unfunded`,19,col.amber,700));
b.push(R(747,674,685,210));b.push(T(775,721,"NO VERIFIED MATCHING NUMERIC STAFFING",20,col.navy,700));
b.push(T(775,751,"in the currently tracked official extracts:",18,col.muted));
for(let i=0;i<4;i++){const jur=["ACT","NT","TAS","VIC"][i],xx=780+i*158;b.push(R(xx,784,142,62,col.grayLight,13,col.grayLight,0));b.push(T(xx+71,821,jur,24,col.gray,800,"middle"));}
b.push(T(50,933,"SOURCES: verified data/staffing.csv rows  •  FTE ≠ positions ≠ headcount ≠ recruitment ≠ ICT funding",17,col.navy,600));
b.push(T(50,964,"Snapshot covers official evidence available in this repository, not a census of all on-duty licensing personnel.",16,col.muted,500));
const staffing=shell(1480,996,"Official Australian firearms licensing staffing and capacity disclosures","QLD headcount components, NSW permanent positions and announced recruitment, SA substantive FTE, WA ICT funding. Different measures, not directly comparable.",b.join(""));
return {processing,staffing,details:{latestProcessing:{SA:sa.metric_date,VIC:vic.metric_date,QLD:qNew.metric_date,NSW:nsw.metric_date},staffing:{QLD:qStaff.as_of_date,NSW:nswPos.as_of_date,SA:saFte.as_of_date,WA:wa.as_of_date}}}
}
const observed = readFileSync(join(ROOT, 'data/observations.csv'), 'utf8');
const staffingData = readFileSync(join(ROOT, 'data/staffing.csv'), 'utf8');
const charts = renderCharts(observed, staffingData);
const assets = [
  ['current-processing-overview.svg', charts.processing],
  ['staffing-capacity-overview.svg', charts.staffing],
];
const outputDir = join(ROOT, 'docs/images');
if (process.argv.includes('--check')) {
  let errors = 0;
  for (const [name, expected] of assets) {
    const path = join(outputDir, name);
    let found = '';
    try { found = readFileSync(path, 'utf8'); } catch { /* report missing below */ }
    if (found !== expected) {
      console.error('OUTDATED README CHART: ' + path);
      errors++;
    }
  }
  if (errors) process.exitCode = 1;
  else console.log('README charts current; verified against repository CSVs.');
} else {
  mkdirSync(outputDir, {recursive: true});
  for (const [name, data] of assets) {
    writeFileSync(join(outputDir, name), data, 'utf8');
    console.log('Generated ' + name);
  }
}
