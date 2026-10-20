#!/usr/bin/env node
/**
 * Read-only independent consistency check for the interactive benchmark panel.
 * Run after editing either data/observations.csv or docs/assets/dashboard-data.json.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
function parseCSV(src){
  const all=[];let row=[],buf='',quoted=false;
  for(let i=0;i<src.length;i++){
    const c=src[i];
    if(quoted){
      if(c==='"' && src[i+1]==='"'){buf+='"';i++}
      else if(c==='"')quoted=false;
      else buf+=c;
    }else if(c==='"')quoted=true;
    else if(c===','){row.push(buf);buf=''}
    else if(c==='\n'){row.push(buf.replace(/\r$/,''));all.push(row);row=[];buf=''}
    else buf+=c;
  }
  if(row.length||buf)all.push([...row,buf]);
  const head=all.shift();
  return all.filter(r=>r.length===head.length).map(r=>Object.fromEntries(head.map((k,i)=>[k,r[i]])));
}
const obs=parseCSV(readFileSync(join(root,'data/observations.csv'),'utf8'));
const data=JSON.parse(readFileSync(join(root,'docs/assets/dashboard-data.json'),'utf8'));
const map={
  new:{SA:'firearms_licence_application',VIC:'new_firearm_licence_application'},
  renewal:{SA:'firearms_licence_renewal',VIC:'firearm_licence_renewal_application'},
  pta:{SA:'permit_to_acquire',VIC:'online_permit_to_acquire'},
};
let errors=0;
for(const [category,mapping] of Object.entries(map)){
  const recorded=data.categories[category]||[];
  if(recorded.length!==Object.keys(mapping).length){console.error(category+': incorrect number of benchmark points');errors++}
  for(const [jur,series] of Object.entries(mapping)){
    const matches=obs.filter(r=>r.jurisdiction===jur && r.series===series && r.metric_type==='processing_date' && r.evidence_status==='verified' && r.evidence_path && Number(r.backlog_age_days)>0);
    matches.sort((a,b)=>(a.metric_date||a.source_updated_date||a.observation_date).localeCompare(b.metric_date||b.source_updated_date||b.observation_date));
    const r=matches.at(-1),point=recorded.find(x=>x.key===jur);
    if(!r||!point||point.series!==series||point.backlog_age_days!==Number(r.backlog_age_days)||point.metric_date!==(r.metric_date||r.source_updated_date||r.observation_date)||point.evidence_path!==r.evidence_path||point.source_url!==r.source_url){
      console.error('Benchmark mismatch: '+category+'/'+jur+'/'+series);errors++;
    }
  }
}
if(errors){console.error('Dashboard source checks failed: '+errors);process.exitCode=1}
else console.log('All interactive benchmark points match verified latest CSV rows.');
