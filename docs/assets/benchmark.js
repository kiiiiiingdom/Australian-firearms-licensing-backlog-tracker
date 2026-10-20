/* Editorial data workbench: data from committed verified CSV snapshots. No third-party telemetry. */
(() => {
  const root=document.getElementById('benchmark-comparison');
  if(!root)return;
  const baseURL='https://github.com/kiiiiiingdom/Australian-firearms-licensing-backlog-tracker/blob/main/';
  const categories={new:'New licence / 新证',renewal:'Renewal / 续证',pta:'Permit to acquire / PTA'};
  const names={SA:'South Australia',VIC:'Victoria'};
  const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;};
  const top=el('div','workbench-header');
  const eyebrow=el('p','workbench-eyebrow','01 / CURRENT OFFICIAL QUEUE-DATE SNAPSHOTS');
  const title=el('h2','workbench-title','How far back is the published queue?');
  const subtitle=el('p','workbench-sub','正在处理的申请提交日期距官方统计日有多少天？这是队列日期的滞后值，不是申请人的实际等待时间。');
  top.append(eyebrow,title,subtitle);
  const strip=el('div','workbench-kpis');
  const cat=el('div','workbench-controls');
  const catLabel=el('label','','Compare / 业务类别');
  const select=el('select','workbench-select');
  Object.entries(categories).forEach(([k,v])=>{const o=el('option','',v);o.value=k;select.append(o);});
  catLabel.append(select);cat.append(catLabel);
  const tabs=el('div','workbench-view-switch');
  const daysButton=el('button','workbench-view selected','Days / 天数');
  const indexButton=el('button','workbench-view','Relative index / 相对指数');
  daysButton.type=indexButton.type='button';
  daysButton.setAttribute('aria-pressed','true');indexButton.setAttribute('aria-pressed','false');
  tabs.append(daysButton,indexButton);
  const plot=el('div','workbench-plot');plot.setAttribute('aria-live','polite');
  const note=el('div','workbench-disclaimer','Scope: snapshot comparison only; channel definitions and reporting dates differ. / 仅为不同发布时间的官方队列日期快照，业务渠道可能不同，不能据此衡量警员效率。');
  const link=el('p','workbench-sources');
  let dataset=null,mode='days';
  const fmtDate=date=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return date||'undated';const [y,m,d]=date.split('-');return d+'/'+m+'/'+y;};
  function render(){
    if(!dataset)return;
    const rows=dataset.categories?.[select.value]||[];
    strip.replaceChildren();plot.replaceChildren();link.replaceChildren();
    if(!rows.length){plot.append(el('p','','No comparable verified data / 暂无可比核实数据'));return;}
    const sorted=[...rows].sort((a,b)=>b.backlog_age_days-a.backlog_age_days);
    const min=Math.min(...sorted.map(r=>r.backlog_age_days));
    const max=Math.max(...sorted.map(r=>r.backlog_age_days));
    const asof=sorted.map(r=>r.metric_date).filter(Boolean).sort().at(-1)||'—';
    for(const [label,value,detail] of [
      ['REPORTED JURISDICTIONS / 可比辖区',String(rows.length),'Other states are not zero / 其他辖区非零积压'],
      ['LATEST SOURCE DATE / 最近统计日',fmtDate(asof),'Reporting dates differ / 统计日不同'],
      ['DATA TYPE / 数据口径','Queue-date lag','Not processing duration / 非实际审批耗时']
    ]){const box=el('div','workbench-kpi');box.append(el('span','workbench-kpi-label',label),el('strong','workbench-kpi-value',value),el('span','workbench-kpi-detail',detail));strip.append(box);}
    sorted.forEach((r,i)=>{
      const ratio=min>0?r.backlog_age_days/min:NaN;
      const value=mode==='days'?r.backlog_age_days+' days':Number.isFinite(ratio)?ratio.toFixed(2)+'×':'n/a';
      const pct=mode==='days'?r.backlog_age_days/max*100:ratio/(max/min)*100;
      const item=el('article','workbench-item');
      const heading=el('div','workbench-item-top');
      const left=el('div','workbench-item-name');
      left.append(el('span','workbench-item-code',r.key),el('strong','',names[r.key]||r.key));
      heading.append(left,el('strong','workbench-item-value',value));
      const track=el('div','workbench-track');track.setAttribute('role','img');track.setAttribute('aria-label',r.key+': '+value);
      const fill=el('div','workbench-bar'+(i===0?' first':''));fill.style.width=Math.max(0,Math.min(100,pct)).toFixed(2)+'%';track.append(fill);
      const meta=el('div','workbench-item-meta');
      meta.append(el('span','',fmtDate(r.metric_date)+' · '+r.series.replaceAll('_',' ')));
      const anchor=el('a','','Official source ↗');anchor.href=r.source_url;anchor.target='_blank';anchor.rel='noopener noreferrer';meta.append(anchor);
      item.append(heading,track,meta);
      plot.append(item);
    });
    link.append(el('span','','Reference = smallest published backlog-age within selected category. / 相对指数以当前类别中较小值为 1.00；这不是绩效排名。'));
    daysButton.classList.toggle('selected',mode==='days');indexButton.classList.toggle('selected',mode==='index');
    daysButton.setAttribute('aria-pressed',String(mode==='days'));indexButton.setAttribute('aria-pressed',String(mode==='index'));
  }
  daysButton.addEventListener('click',()=>{mode='days';render();});
  indexButton.addEventListener('click',()=>{mode='index';render();});
  select.addEventListener('change',render);
  const footer=el('div','workbench-footer');
  footer.append(note,link);
  root.replaceChildren(top,strip,cat,tabs,plot,footer);
  fetch(new URL(root.dataset.source,document.baseURI),{credentials:'same-origin'})
    .then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json();})
    .then(v=>{dataset=v;render();})
    .catch(()=>{plot.replaceChildren(el('p','workbench-error','Interactive comparison is unavailable. Please use the dated static charts below. / 交互暂不可用，请查看下方有日期的静态图。'));});
})();
