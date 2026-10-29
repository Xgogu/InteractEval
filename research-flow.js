'use strict';

let researchConceptNode=1;
const researchConceptFlows={
  iceberg:{
    name:'State',note:'Later evidence can revise an estimate. The state remains an interpretation.',
    nodes:[
      ['Words & actions','Observable evidence','Start with what the transcript actually records. A polite reply alone leaves goals, beliefs, and constraints uncertain.'],
      ['Interpret in context','Goals, beliefs, constraints','Use the evidence and the situation together to form an interpretation, while keeping unresolved alternatives visible.'],
      ['State estimate','Evidence + uncertainty','Record what the evidence suggests about the participant. An estimate is revisable rather than a direct observation of their mind.'],
      ['Later evidence','Keep or revise','A new turn may support the current estimate, reveal a gap, or require a different interpretation.']
    ],
    paths:[['M270 145H380',true],['M620 145H730',true],['M500 290V200',true]],
    mobile:[['M200 94V144',true],['M200 226V276',true],['M368 455H386V185H368',true]]
  },
  movie:{
    name:'Trajectory',note:'Solid paths connect observed turns. Dashed paths are possible continuations.',
    nodes:[
      ['Earlier turns','Established events','Earlier events supply the premises for interpreting what happens next. Their order matters.'],
      ['Present turn','Realized change','Ask what this turn changes, preserves, or makes harder in the situation established so far.'],
      ['Possible next step','Not yet observed','A continuation describes what could follow. It becomes an established event only when later evidence supports it.'],
      ['Alternative path','Still conditional','Keep other plausible developments distinct from what has already happened.']
    ],
    paths:[['M270 180H380',true],['M620 180C680 180 680 100 730 100',false],['M620 180C680 180 680 280 730 280',false]],
    mobile:[['M200 94V144',true],['M200 226V282H100V332',false],['M200 282H300V332',false]]
  },
  agency:{
    name:'Initiative',note:'A useful direction is proposed, carried forward, and checked against the evolving situation.',
    nodes:[
      ['Notice a need','A relevant gap','Notice an unresolved need or overlooked constraint that matters to the interaction.'],
      ['Propose a direction','A warranted next step','Introduce a useful next step that fits the goals and constraints, without requiring the partner to specify every move.'],
      ['Follow through','Sustain the direction','Carry the direction across later turns while preserving the goal, role, and world constraints.'],
      ['Check & adjust','Respond to new evidence','Read what the action changed and revise the direction when the evidence calls for it.']
    ],
    paths:[['M270 145H380',true],['M620 145H730',true],['M850 200V335H620',true],['M500 290V200',true]],
    mobile:[['M200 94V144',true],['M200 226V276',true],['M200 358V414',true],['M368 455H386V185H368',true]]
  }
};

function researchFlowPaths(paths,id){
  return `<defs><marker id="${id}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1 7 4 1 7" fill="none" stroke="#6c8963" stroke-width="1.2"/></marker></defs>${paths.map(([path,observed],i)=>`<path d="${path}" class="mechanism-wire ${observed?'':'is-conditional'}" marker-end="url(#${id})"/>${observed?`<path d="${path}" pathLength="200" class="mechanism-current" style="--flow-delay:${i*-.7}s"/>`:''}`).join('')}`;
}

function researchMechanismFlow(){
  const flow=researchConceptFlows[theoryPrinciple];
  return `<figure class="mechanism-flow" data-kind="${theoryPrinciple}"><div class="mechanism-flow-heading"><span>${flow.name}</span><small>Select a node to explore</small></div><div class="mechanism-flow-map"><svg class="mechanism-links mechanism-links-wide" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">${researchFlowPaths(flow.paths,'concept-wide-'+theoryPrinciple)}</svg><svg class="mechanism-links mechanism-links-narrow" viewBox="0 0 400 ${theoryPrinciple==='movie'?460:520}" preserveAspectRatio="none" aria-hidden="true">${researchFlowPaths(flow.mobile,'concept-narrow-'+theoryPrinciple)}</svg>${flow.nodes.map(([title,subtitle],i)=>`<button type="button" class="mechanism-node mechanism-node-${i} ${theoryPrinciple==='movie'&&i>1?'is-projected':''}" data-research-flow-node="${i}" aria-pressed="${researchConceptNode===i}"><strong>${title}</strong><span>${subtitle}</span></button>`).join('')}</div><figcaption>${flow.note}</figcaption></figure>`;
}

const researchStageViews=[
  {title:'Define the case',copy:'Specify the world and keep each participant’s information separate.',input:'Goals, rules, role profiles',output:['Case','Separate role views'],action:'Separate the views'},
  {title:'Observe the exchange',copy:'Record what each participant says or does.',input:'Role-visible history',output:['Utterances','Visible actions'],action:'Record the interaction'},
  {title:'Update the world',copy:'Carry three records forward as new evidence arrives.',input:'Evidence + prior state',output:['Scene','Latent state','Event chain'],action:'Reconstruct'},
  {title:'Evaluate capability',copy:'Judge against cited evidence, then apply the dependency rules.',input:'Evidence + authorized world record',output:['L1–L6 judgments'],action:'Adjudicate'}
];

function researchStageFlow(){
  const view=researchStageViews[instrumentStage],stage=instrumentContent[instrumentStage];
  return `<header class="stage-flow-heading"><h3>${view.title}</h3><p>${view.copy}</p></header><div class="stage-flow"><section><small>Input</small><strong>${view.input}</strong></section><div class="stage-flow-transfer"><svg viewBox="0 0 180 40" preserveAspectRatio="none" aria-hidden="true">${researchFlowPaths([['M8 20H170',true]],'stage-flow-'+instrumentStage)}</svg><span>${view.action}</span></div><section><small>Output</small><div>${view.output.map(label=>`<strong>${label}</strong>`).join('')}</div></section></div><details class="mechanism-context"><summary>Information boundaries</summary><p>${stage.boundary}</p><p>${stage.copy}</p></details>`;
}

document.addEventListener('click',event=>{
  const node=event.target.closest('[data-research-flow-node]');
  if(!node)return;
  researchConceptNode=Number(node.dataset.researchFlowNode);
  const panel=document.getElementById('feature-theory-panel');
  if(panel){panel.innerHTML=researchTheoryPanel();panel.querySelector(`[data-research-flow-node="${researchConceptNode}"]`)?.focus({preventScroll:true});}
});
