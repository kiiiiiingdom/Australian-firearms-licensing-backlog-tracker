/* Read-only, data-derived index panel. No private applicant information or telemetry. */
(() => {
  const root = document.getElementById('benchmark-comparison');
  if (!root) return;
  const source = root.getAttribute('data-source') || 'assets/dashboard-data.json';
  const text = (tag, value, className) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = value;
    return el;
  };
  const controls = document.createElement('div');
  controls.className = 'compare-controls';
  const typeLabel = text('label','Business category / 业务');
  const typeSelect = document.createElement('select');
  [['new','New licence / 新证'],['renewal','Renewal / 续证'],['pta','PTA / 购买许可']].forEach(([value,label])=>{
    const opt=document.createElement('option'); opt.value=value;opt.textContent=label;typeSelect.append(opt);
  });
  typeLabel.append(typeSelect);
  const baseLabel=text('label','Reference index = 1.00 / 基准');
  const baseSelect=document.createElement('select');
  baseLabel.append(baseSelect);
  controls.append(typeLabel,baseLabel);
  const result=document.createElement('div');
  const caption=text('p','Ratios are descriptive comparisons of published queue-date age, not measures of staff efficiency or actual applicant waiting time. / 比值只描述公开处理日期滞后，不代表警员效率或个人实际等待时间。','compare-warning');
  root.append(controls,result,caption);
  let dataset=null;
  function draw(){
    if(!dataset) return;
    const rows=dataset.categories[typeSelect.value]||[];
    const old=baseSelect.value;
    baseSelect.replaceChildren();
    if(!rows.length){result.replaceChildren(text('p','No comparable verified points / 无可比官方数据'));return}
    const min=rows.reduce((a,b)=>a.backlog_age_days<=b.backlog_age_days?a:b);
    const choice=rows.some(x=>x.key===old)?old:min.key;
    for(const row of rows){const o=document.createElement('option');o.value=row.key;o.textContent=row.label+' · '+row.backlog_age_days+' d';baseSelect.append(o);}
    baseSelect.value=choice;
    render();
  }
  function render(){
    if(!dataset)return;
    const rows=dataset.categories[typeSelect.value]||[];
    const base=rows.find(x=>x.key===baseSelect.value);
    result.replaceChildren();
    if(!base||base.backlog_age_days<=0){result.append(text('p','A positive reference backlog-age value is required / 基准值必须大于零'));return}
    const max=Math.max(...rows.map(x=>x.backlog_age_days/base.backlog_age_days));
    result.append(text('div','Relative reported backlog index / 相对公开积压指数','compare-title'));
    rows.forEach(row=>{
      const value=row.backlog_age_days/base.backlog_age_days;
      const item=document.createElement('div');item.className='compare-row';
      const head=document.createElement('div');head.className='compare-row-head';
      head.append(text('span',row.label),text('span',value.toFixed(2)+'×','compare-value'));
      const track=document.createElement('div');track.className='compare-track';
      const fill=document.createElement('div');fill.className='compare-fill';fill.style.width=(100*value/max).toFixed(2)+'%';
      track.append(fill);item.append(head,track,text('div',row.backlog_age_days+' d · official metric '+row.metric_date+' · '+row.series,'compare-foot'));result.append(item);
    });
    const warn=text('p','Reference: '+base.label+' (1.00×). Dates and application channels may differ. These are queue-date age proxies, NOT observed processing durations or a ranked comparison of police efficiency.','small-note');
    result.append(warn);
  }
  typeSelect.addEventListener('change',draw);
  baseSelect.addEventListener('change',render);
  fetch(new URL(source,document.baseURI),{credentials:'same-origin'})
    .then(response=>{if(!response.ok)throw Error('HTTP '+response.status);return response.json()})
    .then(data=>{dataset=data;draw()})
    .catch(()=>{root.replaceChildren(text('p','Interactive data unavailable; use the static verified charts below. / 互动图暂不可用，请查看下方静态图。'));});
})();
