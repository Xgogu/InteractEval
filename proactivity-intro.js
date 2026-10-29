'use strict';

// Historical framing: Wooldridge & Jennings (1995), Intelligent Agents: Theory
// and Practice, section 2.1, "A Weak Notion of Agency".
// https://www.cs.ox.ac.uk/people/michael.wooldridge/pubs/ker95.pdf
// Evaluation context: ProactiveEval (2025), https://arxiv.org/abs/2508.20973.
// These authored vignettes illustrate uncertainty; they are not scored episodes.
const introductoryDialogues = [
  {
    name: 'Before a release', context: 'A team is preparing a software release.',
    lesson: 'The value of the intervention depends on when it happens and whether the compatibility issue is followed through to a check.',
    stages: [
      {title: 'The tests passed.', copy: 'The team has evidence about the tested setup. Coverage of existing installations is still unknown.', next: 'Check what the tests covered', turns: [['Engineer', 'The patch passes all the tests.'], ['Reviewer', "Great. Let's get the release ready."]]},
      {title: 'Existing installations remain unchecked.', copy: 'A targeted question exposes a gap in the evidence. The release decision now depends on the older configuration.', next: 'Act on the new information', turns: [['Reviewer', 'Did we test an upgraded project as well as a new one?'], ['Engineer', 'Only a new one. Older projects use a different configuration.']]},
      {title: 'The release plan changes.', copy: 'The check happens before publication and finds a failure. A proposed fix creates a new obligation: confirm that it works.', next: 'Follow the change through', turns: [['Reviewer', "Let's try an upgraded project before we publish."], ['Engineer', "It fails. I'll add a migration for the old configuration."]]},
      {title: 'The new condition is checked.', copy: 'The final exchange supplies evidence that the compatibility issue was addressed. The useful contribution spans several turns: notice, check, act, and verify.', turns: [['Reviewer', 'Does the upgraded project pass with the migration?'], ['Engineer', 'Yes. Both the old and new configurations pass now.']]}
    ]
  },
  {
    name: 'Helping a learner', context: 'A learner has just heard an explanation of fractions.',
    lesson: 'Understanding is an estimate revised from the answers. Correcting an answer with a hint and applying the idea independently provide different evidence.',
    stages: [
      {title: 'Agreement leaves something untested.', copy: 'The learner says the explanation makes sense. Their ability to use it has not yet been demonstrated.', next: 'Try a concrete comparison', turns: [['Tutor', 'Does that explanation make sense?'], ['Learner', 'Yes, I think so.']]},
      {title: 'A specific misconception appears.', copy: 'The answer suggests that the learner is comparing the denominators as whole numbers. Repeating the same explanation may leave that difficulty unresolved.', next: 'Change the explanation', turns: [['Tutor', 'Which is larger: one third or one quarter?'], ['Learner', 'One quarter. Four is bigger than three.']]},
      {title: 'The learner revises the answer.', copy: 'A different representation helps with the original comparison. A fresh example can show whether the reasoning transfers.', next: 'Check a fresh example', turns: [['Tutor', 'Imagine the same cake cut into three equal pieces, then four. Which pieces are larger?'], ['Learner', 'The thirds. So one third is larger.']]},
      {title: 'The reasoning carries to a new example.', copy: 'The learner explains a new comparison without the cake prompt. This supports understanding of this idea; it does not establish broader mastery of fractions.', turns: [['Tutor', 'And one fifth or one sixth? How would you decide?'], ['Learner', 'One fifth. Fewer pieces means each piece is larger.']]}
    ]
  },
  {
    name: 'Finding the right support', context: 'Two friends meet after a difficult meeting.',
    lesson: 'The purpose of an interaction and the participant’s willingness can change. Useful initiative includes offering a choice, respecting the answer, and allowing the pace to change.',
    stages: [
      {title: 'The kind of support is still open.', copy: 'Advice may be welcome, but the person has not yet said what they need from this conversation.', next: 'Hear the response', turns: [['Person', 'That meeting went badly.'], ['Friend', 'Want to work out what to say next time?']]},
      {title: 'A boundary becomes explicit.', copy: 'The person declines a detailed discussion tonight. The next offer gives them a choice about how to continue.', next: 'Follow their preference', turns: [['Person', "I can't go through it all again tonight."], ['Friend', 'Would you prefer some company, without talking through it?']]},
      {title: 'The immediate goal becomes companionship.', copy: 'Both people agree to a walk. Pushing for a solution at this point would disregard the preference just expressed.', next: 'Continue to the end of the walk', turns: [['Person', "Yes. Let's just take a walk."], ['Friend', 'Okay. We can leave the meeting alone.']]},
      {title: 'Readiness changes later.', copy: 'At the end of the walk, the person asks for help tomorrow. The friend leaves the timing with them rather than treating the earlier boundary as permanent.', time: 'At the end of the walk', turns: [['Person', 'Could we look at what happened tomorrow?'], ['Friend', "Of course. Let me know when you're ready."]]}
    ]
  }
];
let introductoryDialogue = 0;
let introductoryStep = 0;

function proactivityHero() {
  const stages = [
    ['Follow the brief', 'L1\u2013L2'],
    ['Adapt as things change', 'L3\u2013L4'],
    ['Take the lead & follow through', 'L5\u2013L6']
  ];
  const ranges = stages.map((_, i) => {
    const scores = publication.models.map(model => model.stages[i]);
    return { low: Math.min(...scores), high: Math.max(...scores) };
  });
  return editorialHero({
    kicker: 'Main',
    body: `<p class="hero-method-summary">The framework follows participant states and event trajectories across turns, then evaluates six levels of interaction capability.</p><div class="hero-entry-links"><a href="#model-readout">Explore the results <span aria-hidden="true">&#8595;</span></a><a href="./research.html">How evaluation works <span aria-hidden="true">&#8599;</span></a></div>`,
    title: 'Can a model<br/><em>take the next step?</em>',
    deck: 'InteractEval is a benchmark and evaluation framework for multi-turn interaction. It measures how models understand changing situations, take useful initiative, and follow through.',
    aside: `<figure class="hero-finding" aria-labelledby="hero-finding-title"><figcaption><h2 id="hero-finding-title">The gap grows with initiative.</h2><p>Models cluster when following a brief. Their scores spread out when they must take the lead.</p></figcaption><div class="hero-finding-axis"><span>Score (0 to 1)</span><span>Gap between models</span></div>${stages.map(([label,levels],i)=>{const r=ranges[i];return `<div class="hero-finding-row ${i===2?'is-active-stage':''}"><div class="hero-finding-label"><h3>${label}</h3><span>${levels}</span></div><div class="hero-finding-measure"><div class="hero-finding-track" role="img" aria-label="${label}: model scores range from ${r.low.toFixed(3)} to ${r.high.toFixed(3)}"><i style="left:${r.low*100}%;width:${(r.high-r.low)*100}%"></i><b style="left:${r.low*100}%"></b><b style="left:${r.high*100}%"></b></div><strong>${(r.high-r.low).toFixed(3)}</strong></div></div>`;}).join('')}<div class="hero-finding-scale" aria-hidden="true"><span>0</span><span>0.5</span><span>1</span></div><p class="hero-finding-note">Each band spans the lowest to highest score across ten base models. All three use the same scale.</p><a href="#capability">Explore the six capability levels <span aria-hidden="true">&#8595;</span></a></figure>`
  });
}

function introductoryDialoguePanel() {
  const c=introductoryDialogues[introductoryDialogue];
  const stage=c.stages[introductoryStep],labels=['First exchange','New evidence','Action','Follow-through'];
  const turns=c.stages.slice(0,introductoryStep+1).map((s,i)=>`${s.time?`<li class="intro-time-note">${s.time}</li>`:''}${s.turns.map(([speaker,text],j)=>`<li class="${i===introductoryStep?'is-current':'is-earlier'} ${j===1?'intro-reply':''}"><div class="intro-turn-speaker"><span>${String(i*2+j+1).padStart(2,'0')}</span>${speaker}</div><blockquote>${safe(text)}</blockquote></li>`).join('')}`).join('');
  return `<nav class="intro-story-progress" aria-label="Conversation stages">${labels.map((label,i)=>`<button data-intro-step="${i}" aria-pressed="${i===introductoryStep}" ${i===introductoryStep?'aria-current="step"':''}><span aria-hidden="true">${i<introductoryStep?'✓':String(i+1)}</span>${label}</button>`).join('')}</nav><div class="intro-dialogue-record"><div class="intro-record-heading"><span>${c.context}</span><span>${(introductoryStep+1)*2} turns</span></div><ol class="intro-turns">${turns}</ol><button class="intro-follow-button" data-intro-next>${stage.next||'Read from the beginning'}<span aria-hidden="true">${stage.next?'↓':'↶'}</span></button></div><aside class="intro-dialogue-reading" aria-live="polite" aria-atomic="true"><span>${labels[introductoryStep]}</span><h3>${stage.title}</h3><p>${stage.copy}</p>${introductoryStep===c.stages.length-1?`<div class="intro-story-lesson"><h4>What this illustrates</h4><p>${c.lesson}</p><a href="./research.html#theory">State, trajectory, and initiative ↗</a></div>`:''}</aside>`;
}

function proactivityOpening() {
  return `<section id="beneath-the-words" class="proactivity-opening" aria-labelledby="proactivity-heading"><div class="intro-history"><span class="intro-eyebrow">Proactiveness</span><div><p>In their 1995 account of agency, Michael Wooldridge and Nicholas R. Jennings included taking initiative toward a goal. In conversation, that may begin with checking an assumption the other person has left unstated.</p></div></div><div class="intro-section-heading"><div><span class="intro-eyebrow">Examples</span><h2 id="proactivity-heading">What happens<br/><em>after the reply?</em></h2></div><p>Three authored examples. Follow each exchange to see how new evidence changes the next step.</p></div><div class="intro-case-selector" role="group" aria-label="Choose a conversation">${introductoryDialogues.map((c,i)=>`<button data-intro-case="${i}" aria-pressed="${i===introductoryDialogue}"><span>0${i+1}</span>${c.name}<b aria-hidden="true">&#8599;</b></button>`).join('')}</div><div id="intro-dialogue-panel" class="intro-dialogue-panel">${introductoryDialoguePanel()}</div></section>`;
}

function updateIntroductoryPanel(focusNext=false){
  const panel=document.getElementById('intro-dialogue-panel');
  if(!panel)return;
  panel.innerHTML=introductoryDialoguePanel();
  if(focusNext){
    panel.querySelector('[data-intro-next]')?.focus({preventScroll:true});
    panel.querySelector('.intro-turns .is-current')?.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
}

document.addEventListener('click',event=>{
  const choose=event.target.closest('[data-intro-case]');
  if(choose){
    introductoryDialogue=Number(choose.dataset.introCase);
    introductoryStep=0;
    document.querySelectorAll('[data-intro-case]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.introCase)===introductoryDialogue)));
    updateIntroductoryPanel();
  }
  const step=event.target.closest('[data-intro-step]');
  if(step){
    introductoryStep=Number(step.dataset.introStep);
    updateIntroductoryPanel();
    document.querySelector(`[data-intro-step="${introductoryStep}"]`)?.focus({preventScroll:true});
  }
  if(event.target.closest('[data-intro-next]')){
    introductoryStep=(introductoryStep+1)%introductoryDialogues[introductoryDialogue].stages.length;
    updateIntroductoryPanel(true);
  }
});
