/* Interactive, source-linked in-series queue-date lag history. No telemetry. */
(() => {
  const root=document.getElementById('history-workbench');
  if(!root)return;
  const make=(tag,cls,content)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(content!==undefined)e.textContent=content;return e;};
  const svgNS='http://www.w3.org/2000/svg';
  const ns=(tag,attributes)=>{const e=document.createElementNS(svgNS,tag);Object.entries(attributes||{}).forEach(([k,v])=>e.setAttribute(k,String(v)));return e;};
  const selectBox=(label,choices)=>{const wrap=make('label','history-select-label',label);const sel=make('select','workbench-select');for(const [v,name] of choices){const opt=make('option','',name);opt.value=v;sel.append(opt);}wrap.append(sel);return [wrap,sel];};
  const [categoryLabel,category]=selectBox('Application category / 业务类别',[['new','New licence / 新证'],['renewal','Renewal / 续证'],['pta','PTA / 购买许可']]);
  const [jurLabel,jur]=selectBox('Jurisdiction / 辖区',[['SA','SA · South Australia'],['VIC','VIC · Victoria']]);
  const controls=make('div','history-controls');controls.append(categoryLabel,jurLabel);
  const stats=make('div','history-stats');
  const plot=make('div','history-chart');plot.setAttribute('aria-live','polite');
  const facts=make('div','history-facts');
  const disclosure=make('details','history-detail');const summary=make('summary','','Show verified observations / 查看全部已核实观测');const tableWrap=make('div','history-table-wrap');disclosure.append(summary,tableWrap);
  const disclaimer=make('p','history-disclaimer','Each line contains one state and one published queue-date category. Lower lag = an improvement in this proxy, NOT a verified shorter applicant wait. Reporting gaps are not interpolated. / 仅绘制同州同类业务的已核实数据；积压日期滞后减少不等同于个人实际审批时间缩短。');
  root.replaceChildren(controls,stats,plot,facts,disclosure,disclaimer);
  let data;
  const fmt=date=>/^\d{4}-\d{2}-\d{2}$/.test(date||'')?date.slice(8)+'/'+date.slice(5,7)+'/'+date.slice(0,4):date||'—';
  const days=(start,end)=>Math.round((Date.parse(end+'T00:00:00Z')-Date.parse(start+'T00:00:00Z'))/86400000);
  function render(){
    const entry=data?.trends?.[category.value]?.[jur.value];const points=entry?.points||[];
    stats.replaceChildren();plot.replaceChildren();facts.replaceChildren();tableWrap.replaceChildren();
    if(!points.length){plot.append(make('p','','No verified historical points / 尚无已核实历史数据'));return;}
    const first=points[0],last=points.at(-1),delta=last.backlog_age_days-first.backlog_age_days;
    const formatDelta=delta>0?'+'+delta:delta.toString();
    for(const [label,value,description] of [
      ['LATEST QUEUE-DATE LAG / 最新积压年龄',last.backlog_age_days+' d',fmt(last.date)],
      ['CHANGE IN OBSERVED LAG / 与首点相比',formatDelta+' d',delta<0?'Lower / 减少':delta>0?'Higher / 增加':'Unchanged / 不变'],
      ['VERIFIED OBSERVATIONS / 已核实观测',String(points.length),fmt(first.date)+' — '+fmt(last.date)]
    ]){const box=make('div','history-stat');box.append(make('small','',label),make('strong','',value),make('span','',description));stats.append(box);}
    if(points.length<2){plot.append(make('p','history-insufficient','A trend requires at least two verified observations / 少于两个点无法展示变化'));return;}
    const width=900,height=350,left=66,right=30,top=28,bottom=56;
    const xStart=Date.parse(first.date+'T00:00:00Z'),xEnd=Date.parse(last.date+'T00:00:00Z');
    const values=points.map(x=>x.backlog_age_days),lo=Math.max(0,Math.min(...values)-12),hi=Math.max(...values)+12;
    const x=p=>left+(Date.parse(p.date+'T00:00:00Z')-xStart)/(xEnd-xStart||1)*(width-left-right);
    const y=p=>top+(hi-p.backlog_age_days)/(hi-lo||1)*(height-top-bottom);
    const svg=ns('svg',{viewBox:'0 0 900 350',role:'img','aria-label':jur.value+' '+category.value+' queue-date lag by official date',class:'history-svg'});
    const title=ns('title');title.textContent='Verified in-series queue-date lag (calendar days)';svg.append(title);
    for(let i=0;i<4;i++){const val=lo+(hi-lo)*i/3,Y=top+(hi-val)/(hi-lo)*(height-top-bottom);svg.append(ns('line',{x1:left,y1:Y,x2:width-right,y2:Y,class:'history-grid'}));const t=ns('text',{x:54,y:Y+4,'text-anchor':'end',class:'history-axis-label'});t.textContent=Math.round(val)+' d';svg.append(t);}
    const poly=ns('polyline',{points:points.map(p=>x(p).toFixed(1)+','+y(p).toFixed(1)).join(' '),class:'history-line'});svg.append(poly);
    for(const p of points){const dot=ns('circle',{cx:x(p),cy:y(p),r:6,class:'history-dot'});const tooltip=ns('title');tooltip.textContent=fmt(p.date)+': '+p.backlog_age_days+' days';dot.append(tooltip);svg.append(dot);}
    for(const p of [first,last]){const lab=ns('text',{x:x(p),y:height-17,'text-anchor':p===first?'start':'end',class:'history-axis-label'});lab.textContent=fmt(p.date);svg.append(lab);}
    plot.append(svg);
    const note=make('p','history-change-note',delta<0?'Reported queue-date lag decreased by '+Math.abs(delta)+' days over '+days(first.date,last.date)+' calendar days. / 已核实滞后值下降 '+Math.abs(delta)+' 天。':delta>0?'Reported queue-date lag increased by '+delta+' days over '+days(first.date,last.date)+' calendar days. / 已核实滞后值增加 '+delta+' 天。':'No net change between the first and latest observation / 首末观测未见净变化。');
    facts.append(note);
    const table=make('table','history-table');const head=make('thead'),hr=make('tr');for(const col of ['Official date / 日期','Queue lag / 滞后','Processing date / 处理日期','Evidence / 来源'])hr.append(make('th','',col));head.append(hr);table.append(head);
    const body=make('tbody');for(const p of points){const tr=make('tr');tr.append(make('td','',fmt(p.date)),make('td','',p.backlog_age_days+' d'),make('td','',fmt(p.processing_date)));const td=make('td');const a=make('a','','Official ↗');a.href=p.source_url;a.target='_blank';a.rel='noopener noreferrer';const evidence=make('a','','Archive ↗');evidence.href='https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/'+p.evidence_path;evidence.target='_blank';evidence.rel='noopener noreferrer';td.append(a,' · ',evidence);tr.append(td);body.append(tr);}table.append(body);tableWrap.append(table);
  }
  category.addEventListener('change',render);jur.addEventListener('change',render);
  fetch(new URL(root.dataset.source,document.baseURI),{credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error(r.status);return r.json()}).then(json=>{data=json;render()}).catch(()=>plot.replaceChildren(make('p','','Historical data unavailable. Refer to the static charts and raw CSV. / 历史数据无法加载，请查看静态图与 CSV。')));
})();