#!/usr/bin/env node
/* Independent evidence and chronology check for CSV-derived dated history. */
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,join} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
function csv(text){
  const rows=[];let row=[],cell='',quote=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(quote){if(ch==='"'&&text[i+1]==='"'){cell+='"';i++}else if(ch==='"')quote=false;else cell+=ch}
    else if(ch==='"')quote=true;
    else if(ch===','){row.push(cell);cell=''}
    else if(ch==='\n'){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell=''}
    else cell+=ch;
  }
  if(row.length||cell)rows.push([...row,cell]);
  const headers=rows.shift();
  return rows.filter(r=>r.length===headers.length).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]])));
}
const data=JSON.parse(readFileSync(join(root,'docs/assets/dashboard-data.json'),'utf8'));
const source=csv(readFileSync(join(root,'data/observations.csv'),'utf8'));
const mapping={new:{SA:'firearms_licence_application',VIC:'new_firearm_licence_application'},renewal:{SA:'firearms_licence_renewal',VIC:'firearm_licence_renewal_application'},pta:{SA:'permit_to_acquire',VIC:'online_permit_to_acquire'}};
const errors=[];
for(const [category,jurs] of Object.entries(mapping)){
  for(const [jur,series] of Object.entries(jurs)){
    const entry=data.trends?.[category]?.[jur];
    if(!entry||entry.series!==series||!Array.isArray(entry.points)){errors.push('Missing series '+category+'/'+jur);continue;}
    const dates=new Set();
    let previous='';
    for(const point of entry.points){
      const fields=['date','processing_date','source_url','evidence_path'];
      if(fields.some(k=>typeof point[k]!=='string'||!point[k]))errors.push('Missing field '+category+'/'+jur);
      if(!Number.isInteger(point.backlog_age_days)||point.backlog_age_days<0)errors.push('Bad lag '+category+'/'+jur);
      if(!/^\d{4}-\d{2}-\d{2}$/.test(point.date)||point.date<='2026-09-01'&&point.date!=='2026-09-01')errors.push('Invalid date '+category+'/'+jur);
      if(previous>=point.date||dates.has(point.date))errors.push('Unsorted/repeated date '+category+'/'+jur);
      dates.add(point.date);previous=point.date;
      const row=source.find(r=>r.jurisdiction===jur&&r.series===series&&r.metric_type==='processing_date'&&r.evidence_status==='verified'&&r.evidence_path===point.evidence_path&&(r.metric_date||r.source_updated_date)===point.date&&r.processing_date===point.processing_date&&r.source_url===point.source_url&&Number(r.backlog_age_days)===point.backlog_age_days);
      if(!row)errors.push('Untraceable point '+category+'/'+jur+'/'+point.date);
    }
    const required=source.filter(r=>r.jurisdiction===jur&&r.series===series&&r.metric_type==='processing_date'&&r.evidence_status==='verified'&&r.evidence_path&&(r.metric_date||r.source_updated_date)>='2026-09-01'&&Number.isInteger(Number(r.backlog_age_days))&&Number(r.backlog_age_days)>=0);
    if(new Set(required.map(r=>r.metric_date||r.source_updated_date)).size!==entry.points.length)errors.push('Missing or surplus dated point '+category+'/'+jur);
  }
}
if(errors.length){errors.forEach(x=>console.error('HISTORY CHECK:',x));process.exitCode=1}
else console.log('All six in-series histories are chronological and traceable to verified CSV evidence.');
