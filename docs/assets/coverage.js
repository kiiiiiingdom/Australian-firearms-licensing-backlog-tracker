/* Coverage explorer: a verified repository inventory, not a government completeness claim. */
(()=>{const root=document.getElementById('coverage-workbench');if(!root)return;
const E=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const label=E('label','coverage-control','Record family / 指标类型'),select=E('select','workbench-select');select.setAttribute('aria-label','Select an official record family');label.append(select);
const state=E('p','coverage-caption'),grid=E('div','coverage-cards');root.replaceChildren(label,state,grid);
const statuses={within_30:'Within 30 days / 近期',within_90:'31–90 days / 较旧',older_90:'Historical (>90d) / 历史',undated:'Date unknown / 日期未知',future_dated:'Future-dated / 未来日期',no_record:'Not in archive / 未收录'};
let data;
function render(){const key=select.value;grid.replaceChildren();const cat=data.categories.find(x=>x.key===key);const rows=data.rows||[];
const present=rows.filter(r=>r.cells?.[key]?.status!=='no_record').length;
state.textContent=present+' of '+rows.length+' jurisdictions have verified archived records in this category. Snapshot '+data.snapshot_date+'. Not in archive ≠ not publicly available. / 仅表示本资料库覆盖情况。';
for(const row of rows){const cell=row.cells?.[key]||{status:'no_record',record_count:0};const box=E('article','coverage-card');const head=E('div','coverage-card-head');const name=E('strong','',row.jurisdiction+' · '+row.name);head.append(name,E('span','coverage-status coverage-'+cell.status,statuses[cell.status]||cell.status));box.append(head);
if(cell.status!=='no_record'){box.append(E('p','coverage-value',cell.description),E('p','coverage-date','Official date: '+(cell.source_date||'not stated')+' · '+cell.record_count+' verified records'));const a=E('a','coverage-source','View official source ↗');a.href=cell.source_url;a.target='_blank';a.rel='noopener noreferrer';box.append(a);}
else box.append(E('p','coverage-date','No matching verified record in this archive. This does not imply zero delay or no government publication.'));
grid.append(box);}}
fetch(new URL(root.dataset.source,document.baseURI),{credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error(r.status);return r.json()}).then(d=>{data=d;for(const c of d.categories){const o=E('option','',c.label);o.value=c.key;select.append(o);}select.addEventListener('change',render);render()}).catch(()=>root.replaceChildren(E('p','coverage-error','Interactive coverage data unavailable; see the static matrix above. / 交互信息暂不可用，请查看上方静态矩阵。')));
})();
