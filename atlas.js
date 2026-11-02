'use strict';

const atlasFindings=[
  {id:'iceberg',name:'Data Iceberg Theory',chart:'state',icon:'iceberg',principle:'The same words can hide different states.',result:'−23',unit:'percentage points',evidence:'without latent-state records',experiment:'State probes'},
  {id:'movie',name:'Movie Evaluation Theory',chart:'trajectory',icon:'movie',principle:'The sequence reveals whether an interaction moves forward.',result:'−32',unit:'percentage points',evidence:'without the event chain',experiment:'Recurrence probes'},
  {id:'agency',name:'Agency Principle',chart:'initiative',icon:'agency',principle:'Useful initiative opens a direction and carries it through.',result:'10.6×',unit:'wider model gap',evidence:'at the active stage',experiment:'Across-model ranges'},
  {id:'mind',name:'Theory of Mind',chart:'mind-probe',icon:'mind',principle:'What someone believes can differ from what is true.',result:'91%',unit:'state-probe separation',evidence:'68% when latent-state records are removed',experiment:'State-probe design',connection:'State probes alter the preceding user utterance while keeping the assistant turn unchanged. Its value depends on the participant state it addresses.'},
  {id:'grounding',name:'Common Ground Theory',chart:'partner',icon:'grounding',principle:'Shared understanding is built through evidence, not assumed.',result:'0.172',unit:'score spread',evidence:'for the same assistant across these four partners',experiment:'Related result · four partner pairings',connection:'Partner-dependent scores show why an interaction must be read jointly. The diagram illustrates how checking understanding can build common ground.'},
  {id:'awareness',name:'Situation Awareness Theory',chart:'information',icon:'awareness',principle:'Notice what changed, understand its meaning, anticipate what comes next.',result:'3 / 3',unit:'matched models',evidence:'score lower with partial than insufficient information',experiment:'Related experiment · information conditions',connection:'The matched comparison changes the available evidence. A partial picture can make the situation harder to reconstruct than an explicit gap.'}
];
// State and recurrence probes: paper Table 33; stage ranges: Table 4.
// Psychology lenses: Premack & Woodruff (1978), doi:10.1017/S0140525X00076512;
// Clark & Brennan (1991), Grounding in Communication; Endsley (1995),
// Toward a Theory of Situation Awareness in Dynamic Systems.
// Related experiments illustrate the connection; they do not validate the full theories.
let atlasFinding='iceberg',atlasMobileGroup=0;
const atlasSymbols={
  mind:'<path d="M12 57V38a19 19 0 0 1 38 0v19M30 64V48m19-23a17 17 0 0 1 19 17v20H50" stroke="currentColor" stroke-width="3"/><circle cx="31" cy="34" r="7" fill="currentColor" opacity=".4"/><path d="M43 34h17m-5-5 5 5-5 5" stroke="currentColor" stroke-width="3"/>',
  grounding:'<circle cx="29" cy="39" r="23" fill="currentColor" opacity=".18"/><circle cx="51" cy="39" r="23" fill="currentColor" opacity=".18"/><path d="m28 40 8 8 17-19" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  awareness:'<circle cx="28" cy="48" r="17" stroke="currentColor" stroke-width="3"/><circle cx="28" cy="48" r="6" fill="currentColor"/><path d="M28 48 57 19m-18 0h18v18M50 56h18M59 47v18" stroke="currentColor" stroke-width="3"/>',
  information:'<rect x="12" y="15" width="23" height="50" rx="3" fill="currentColor" opacity=".2"/><path d="M19 28h9m-9 12h9m-9 12h9M45 24h22M45 40h9M45 56h22" stroke="currentColor" stroke-width="5"/>',
  partner:'<circle cx="23" cy="25" r="10" fill="currentColor"/><circle cx="57" cy="55" r="10" fill="currentColor" opacity=".45"/><path d="M12 57V45h23M68 23v12H45M35 51l10-22" stroke="currentColor" stroke-width="4"/>',
  architecture:'<path d="M12 15h22v22H12zM46 43h22v22H46z" fill="currentColor" opacity=".3"/><path d="M12 43h22v22H12zM46 15h22v22H46zM34 26h12M34 54h12" stroke="currentColor" stroke-width="3"/>',
  iceberg:'<path d="m17 32 20-25 18 25Z" fill="currentColor"/><path d="m10 39 19 30 23-4 17-26Z" fill="currentColor" opacity=".27"/><path d="M6 35h68" stroke="currentColor" stroke-width="3"/><path d="m37 39-8 30 23-4Z" fill="currentColor" opacity=".28"/>',
  movie:'<path d="M12 19h56v42H12Z" fill="currentColor" opacity=".15"/><path d="M12 19h56v42H12Z" stroke="currentColor" stroke-width="3"/><path d="m34 29 17 11-17 11Z" fill="currentColor"/><path d="M19 13v12m14-12v12m14-12v12m14-12v12M19 55v12m14-12v12m14-12v12m14-12v12" stroke="currentColor" stroke-width="3"/>',
  agency:'<path d="M12 61V42h18V27h18V12h19v12H58v15H40v15H22v7Z" fill="currentColor" opacity=".22"/><path d="M12 61h12V49h18V34h18V19h7" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><circle cx="65" cy="18" r="7" fill="currentColor"/>'
};
function atlasSymbol(name){return `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true">${atlasSymbols[name]}</svg>`;}
function atlasHero(){return `<section class="atlas-hero"><div><h1>A response is not<br/>an interaction.</h1><p>Interaction is what unfolds between replies. InteractEval measures how models understand changing situations, take initiative, and follow through across a conversation.</p><a href="#response-interaction" data-research-section="response-interaction">Why interact <span aria-hidden="true">&#8595;</span></a></div><figure><img src="./assets/brand/iceberg.svg" width="405" height="365" alt="An iceberg separates spoken words from a participant’s uncertain understanding, trust, and goals."/></figure></section>`;}
function atlasFindingPanel(){
 const f=atlasFindings.find(f=>f.id===atlasFinding);
 return `<p class="atlas-principle">${f.principle}</p><div class="atlas-evidence-grid"><figure class="atlas-theory-visual"><div class="atlas-mechanism" data-motion-chart="${f.id}-mechanism"><p class="atlas-loading-note">${f.principle}</p></div></figure><figure class="atlas-experiment-visual"><figcaption>${f.experiment}</figcaption><div class="atlas-finding-chart" data-motion-chart="${f.chart}">${f.chart==='initiative'?atlasRangeFallback():['state','trajectory'].includes(f.chart)?atlasProbeFallback(f.chart):'<p class="atlas-loading-note">'+f.principle+'</p>'}</div></figure></div>${f.connection?`<p class="atlas-theory-connection">${f.connection}</p>`:''}<div class="atlas-finding-result"><strong>${f.result}</strong><span>${f.unit}<br/><small>${f.evidence}</small></span></div>`;
}
function atlasProbeFallback(kind){const state=kind==='state',values=state?[91,68]:[89,57];return `<div class="atlas-static-probes">${values.map((v,i)=>`<div><span>${i?(state?'Without latent state':'Without event chain'):'Full framework'}</span><i><b style="width:${v}%"></b></i><strong>${v}%</strong></div>`).join('')}</div>`;}
function atlasRangeFallback(){return `<div class="atlas-static-probes">${['Follow','Adapt','Take initiative'].map((label,i)=>{const a=publication.models.map(m=>m.stages[i]),v=Math.max(...a)-Math.min(...a);return `<div><span>${label}</span><i><b style="width:${v/.4*100}%"></b></i><strong>${number(v)}</strong></div>`;}).join('')}</div>`;}
function atlasKeyFindings(){return `<section id="key-findings" class="article-section atlas-key-findings"><h2>Key Findings</h2><div class="atlas-finding-tabs" role="tablist" aria-label="Key findings">${atlasFindings.map(f=>`<button type="button" role="tab" data-atlas-finding="${f.id}" aria-selected="${atlasFinding===f.id}" aria-controls="atlas-finding-panel">${atlasSymbol(f.icon)}<span>${f.name}</span></button>`).join('')}</div><div id="atlas-finding-panel" class="atlas-finding-panel" role="tabpanel" aria-live="polite">${atlasFindingPanel()}</div></section>`;}
function atlasMobileScores(){
 const columns=[[0,5,6],[1,2,3],[4,5,6]][atlasMobileGroup],names=['Overall','L1','L2','L3','L4','L5','L6'];
 return `<div class="atlas-mobile-switch" role="group" aria-label="Displayed capability levels">${['Overview','L1–L3','L4–L6'].map((label,i)=>`<button type="button" data-atlas-mobile="${i}" aria-pressed="${atlasMobileGroup===i}">${label}</button>`).join('')}</div><div>${publication.models.map(m=>`<div class="atlas-mobile-model"><a href="#model/${encodeURIComponent(m.name)}">${modelIdentity(m.name)}</a><div>${columns.map(i=>{const v=[m.composite,...m.levels][i];return `<button type="button" data-main-level="${i?'L'+i:'composite'}" style="--score-fill:${.06+v*.4}"><span>${names[i]}</span><b>${number(v)}</b></button>`;}).join('')}</div></div>`).join('')}</div>`;
}
function syncAtlasLayout(){
 setupInteractionFigures();
 window.InteractEvalMotion?.unmountAll();window.InteractEvalMotion?.scan();
 const header=document.querySelector('.masthead');
 if(header){const size=()=>document.documentElement.style.setProperty('--header-height',Math.ceil(header.getBoundingClientRect().height)+'px');size();if(!header.atlasResize){header.atlasResize=new ResizeObserver(size);header.atlasResize.observe(header);}}
 syncAtlasActiveSection();
 atlasResponsiveTables();
 atlasDataMotion();
}
function atlasResponsiveTables(){
 document.querySelectorAll('.comparison-data-table,.agent-results-table').forEach(table=>{
   const wrap=table.parentElement;if(wrap.dataset.atlasCards==='true')return;
   const headerNodes=[...table.querySelectorAll('thead th')],heads=headerNodes.map(th=>th.textContent.trim());
   if(heads.length<2)return;
   const cards=document.createElement('div');cards.className='atlas-comparison-cards';
   for(const row of table.querySelectorAll('tbody tr')){
     const cells=[...row.children];if(cells.length!==heads.length)continue;
     const card=document.createElement('article'),name=document.createElement('div'),list=document.createElement('dl');
     name.className='atlas-comparison-identity';name.innerHTML=cells[0].innerHTML;card.append(name);
     cells.slice(1).forEach((cell,i)=>{const item=document.createElement('div'),term=document.createElement('dt'),value=document.createElement('dd');const identity=headerNodes[i+1].querySelector('.model-identity');if(identity)term.append(identity.cloneNode(true));else term.textContent=heads[i+1];value.innerHTML=cell.innerHTML;item.append(term,value);list.append(item)});
     card.append(list);cards.append(card);
   }
   wrap.dataset.atlasCards='true';wrap.classList.add('has-atlas-cards');wrap.after(cards);
 });
}
function atlasScrollTo(element){
 if(!element)return;
 const instant=document.documentElement.dataset.uiInput==='keyboard'||matchMedia('(prefers-reduced-motion: reduce)').matches;
 element.scrollIntoView({behavior:instant?'instant':'smooth',block:'start'});
}
document.addEventListener('keydown',()=>{document.documentElement.dataset.uiInput='keyboard'},{capture:true});
document.addEventListener('pointerdown',()=>{document.documentElement.dataset.uiInput='pointer'},{capture:true,passive:true});
function syncAtlasActiveSection(){
 const sections=[...document.querySelectorAll('.results-page .article-body>.article-section')];if(!sections.length)return;
 const edge=(document.querySelector('.masthead')?.getBoundingClientRect().bottom||0)+85;
 let current=sections[0];for(const section of sections)if(section.getBoundingClientRect().top<=edge)current=section;
 document.querySelectorAll('.main-rail-content [data-research-section]').forEach(a=>a.classList.toggle('active',a.dataset.researchSection===current.id));
}
let atlasScrollPending=false;
window.addEventListener('scroll',()=>{if(!atlasScrollPending){atlasScrollPending=true;requestAnimationFrame(()=>{atlasScrollPending=false;syncAtlasActiveSection()});}},{passive:true});
document.addEventListener('click',event=>{
 const tab=event.target.closest('[data-atlas-finding]');
 if(tab){atlasFinding=tab.dataset.atlasFinding;window.InteractEvalMotion?.unmountAll();document.querySelectorAll('[data-atlas-finding]').forEach(b=>b.setAttribute('aria-selected',String(b===tab)));document.getElementById('atlas-finding-panel').innerHTML=atlasFindingPanel();window.InteractEvalMotion?.scan();}
 const toggle=event.target.closest('[data-atlas-contents]');
 if(toggle){const expanded=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(expanded));document.querySelector('.main-results-rail').classList.toggle('is-open',expanded);}
 const group=event.target.closest('[data-atlas-mobile]');if(group){atlasMobileGroup=Number(group.dataset.atlasMobile);document.querySelector('.atlas-mobile-scores').innerHTML=atlasMobileScores();}
 if(event.target.closest('.main-rail-content [data-research-section],.main-rail-content [data-main-comparison]')){document.querySelector('.main-results-rail')?.classList.remove('is-open');document.querySelector('[data-atlas-contents]')?.setAttribute('aria-expanded','false');}
});
document.addEventListener('keydown',event=>{
 const tab=event.target.closest('[data-atlas-finding]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
 event.preventDefault();const tabs=[...document.querySelectorAll('[data-atlas-finding]')],i=tabs.indexOf(tab),n=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[n].focus();tabs[n].click();
});


const atlasMotionSeen=new WeakSet();
const atlasMotionObserver=new IntersectionObserver(entries=>{
 for(const entry of entries){
  if(!entry.isIntersecting)continue;
  atlasMotionObserver.unobserve(entry.target);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.uiInput==='keyboard')continue;
  const bars=entry.target.querySelectorAll('.comparison-bar-track>b,.architecture-gain-row>i>b,.journal-purpose-row>span>i');
  if(bars.length){bars.forEach((bar,i)=>{bar.style.transformOrigin=bar.closest('.is-signed')&&parseFloat(bar.style.left)<50?'right center':'left center';bar.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:420,delay:Math.min(i*25,200),easing:'cubic-bezier(.23,1,.32,1)',fill:'backwards'});});}
  else entry.target.querySelectorAll('tbody tr').forEach((row,i)=>row.animate([{opacity:.35},{opacity:1}],{duration:220,delay:i*18,easing:'cubic-bezier(.23,1,.32,1)',fill:'backwards'}));
 }
},{threshold:.15});
function atlasDataMotion(){
 document.querySelectorAll('.comparison-bars,.main-capability-wrap,.architecture-comparison-grid,.main-outcome-wrap,.comparison-table-wrap').forEach(el=>{if(!atlasMotionSeen.has(el)){atlasMotionSeen.add(el);atlasMotionObserver.observe(el);}});
}
