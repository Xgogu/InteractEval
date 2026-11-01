'use strict';

const atlasFindings=[
  {id:'iceberg',name:'Data Iceberg Theory',chart:'state',icon:'iceberg',principle:'The same words can hide different states.',result:'−23',unit:'percentage points',evidence:'without latent-state records',experiment:'State probes'},
  {id:'movie',name:'Movie Evaluation Theory',chart:'trajectory',icon:'movie',principle:'The sequence reveals whether an interaction moves forward.',result:'−32',unit:'percentage points',evidence:'without the event chain',experiment:'Recurrence probes'},
  {id:'agency',name:'Agency Principle',chart:'initiative',icon:'agency',principle:'Useful initiative opens a direction and carries it through.',result:'10.6×',unit:'wider model gap',evidence:'at the active stage',experiment:'Across-model ranges'}
];
// State and recurrence probes: paper Table 33; stage ranges: Table 4.
let atlasFinding='iceberg',atlasMobileGroup=0;
const atlasSymbols={
  iceberg:'<path d="m17 32 20-25 18 25Z" fill="currentColor"/><path d="m10 39 19 30 23-4 17-26Z" fill="currentColor" opacity=".27"/><path d="M6 35h68" stroke="currentColor" stroke-width="3"/><path d="m37 39-8 30 23-4Z" fill="currentColor" opacity=".28"/>',
  movie:'<path d="M12 19h56v42H12Z" fill="currentColor" opacity=".15"/><path d="M12 19h56v42H12Z" stroke="currentColor" stroke-width="3"/><path d="m34 29 17 11-17 11Z" fill="currentColor"/><path d="M19 13v12m14-12v12m14-12v12m14-12v12M19 55v12m14-12v12m14-12v12m14-12v12" stroke="currentColor" stroke-width="3"/>',
  agency:'<path d="M12 61V42h18V27h18V12h19v12H58v15H40v15H22v7Z" fill="currentColor" opacity=".22"/><path d="M12 61h12V49h18V34h18V19h7" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><circle cx="65" cy="18" r="7" fill="currentColor"/>'
};
function atlasSymbol(name){return `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true">${atlasSymbols[name]}</svg>`;}
function atlasHero(){return `<section class="atlas-hero"><div><h1>A good reply is only <br/>the beginning.</h1><p>InteractEval measures how models understand changing situations, take initiative, and follow through across a conversation.</p><a href="#key-findings" data-research-section="key-findings">Explore the findings</a></div><figure><img src="./assets/brand/iceberg.svg" width="405" height="365" alt="An iceberg separates spoken words from a participant’s uncertain understanding, trust, and goals."/></figure></section>`;}
function atlasFindingPanel(){
 const f=atlasFindings.find(f=>f.id===atlasFinding);
 return `<p class="atlas-principle">${f.principle}</p><div class="atlas-evidence-grid"><figure class="atlas-theory-visual"><figcaption>How it works</figcaption><div class="atlas-mechanism" data-motion-chart="${f.id}-mechanism"><img src="./assets/research/concepts/${{iceberg:'state',movie:'trajectory',agency:'initiative'}[f.id]}.svg" alt="${f.principle}"/></div></figure><figure class="atlas-experiment-visual"><figcaption>${f.experiment}</figcaption><div class="atlas-finding-chart" data-motion-chart="${f.chart}">${f.chart==='initiative'?atlasRangeFallback():atlasProbeFallback(f.chart)}</div></figure></div><div class="atlas-finding-result"><strong>${f.result}</strong><span>${f.unit}<br/><small>${f.evidence}</small></span></div>`;
}
function atlasProbeFallback(kind){const state=kind==='state',values=state?[91,68]:[89,57];return `<div class="atlas-static-probes">${values.map((v,i)=>`<div><span>${i?(state?'Without latent state':'Without event chain'):'Full framework'}</span><i><b style="width:${v}%"></b></i><strong>${v}%</strong></div>`).join('')}</div>`;}
function atlasRangeFallback(){return `<div class="atlas-static-probes">${['Follow','Adapt','Take initiative'].map((label,i)=>{const a=publication.models.map(m=>m.stages[i]),v=Math.max(...a)-Math.min(...a);return `<div><span>${label}</span><i><b style="width:${v/.4*100}%"></b></i><strong>${number(v)}</strong></div>`;}).join('')}</div>`;}
function atlasKeyFindings(){return `<section id="key-findings" class="article-section atlas-key-findings"><h2>Key Findings</h2><div class="atlas-finding-tabs" role="tablist" aria-label="Theoretical findings">${atlasFindings.map(f=>`<button type="button" role="tab" data-atlas-finding="${f.id}" aria-selected="${atlasFinding===f.id}" aria-controls="atlas-finding-panel">${atlasSymbol(f.icon)}<span>${f.name}</span></button>`).join('')}</div><div id="atlas-finding-panel" class="atlas-finding-panel" role="tabpanel" aria-live="polite">${atlasFindingPanel()}</div></section>`;}
function atlasMobileScores(){
 const columns=[[0,5,6],[1,2,3],[4,5,6]][atlasMobileGroup],names=['Overall','L1','L2','L3','L4','L5','L6'];
 return `<div class="atlas-mobile-switch" role="group" aria-label="Displayed capability levels">${['Overview','L1–L3','L4–L6'].map((label,i)=>`<button type="button" data-atlas-mobile="${i}" aria-pressed="${atlasMobileGroup===i}">${label}</button>`).join('')}</div><div>${publication.models.map(m=>`<div class="atlas-mobile-model"><a href="#model/${encodeURIComponent(m.name)}">${modelIdentity(m.name)}</a><div>${columns.map(i=>{const v=[m.composite,...m.levels][i];return `<button type="button" data-main-level="${i?'L'+i:'composite'}" style="--score-fill:${.06+v*.4}"><span>${names[i]}</span><b>${number(v)}</b></button>`;}).join('')}</div></div>`).join('')}</div>`;
}
function syncAtlasLayout(){
 window.InteractEvalMotion?.unmountAll();window.InteractEvalMotion?.scan();
 const header=document.querySelector('.masthead');
 if(header){const size=()=>document.documentElement.style.setProperty('--header-height',Math.ceil(header.getBoundingClientRect().height)+'px');size();if(!header.atlasResize){header.atlasResize=new ResizeObserver(size);header.atlasResize.observe(header);}}
 syncAtlasActiveSection();
}
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
