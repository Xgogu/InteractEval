'use strict';

// Historical framing: Wooldridge & Jennings (1995), Intelligent Agents: Theory
// and Practice, section 2.1, "A Weak Notion of Agency".
// https://www.cs.ox.ac.uk/people/michael.wooldridge/pubs/ker95.pdf
// Evaluation context: ProactiveEval (2025), https://arxiv.org/abs/2508.20973.
// These authored vignettes illustrate uncertainty; they are not scored episodes.
const introductoryDialogues = [
  {
    name: 'Making a plan', context: 'Two friends are arranging a trip.',
    opening: ['Let’s take the 7 a.m. train.', 'That could work.'],
    question: 'How would you get to the station?',
    answer: 'It’s an hour away. The buses don’t start that early.',
    unknown: 'Getting to the station',
    surface: 'We do not yet know whether the station is reachable in time.',
    change: 'A transport constraint',
    reading: 'The proposed departure conflicts with the available transport.',
    next: 'Check a later train or an earlier pickup together.'
  },
  {
    name: 'Learning something new', context: 'A student has just heard an explanation.',
    opening: ['Does that explanation make sense?', 'Yes, I think so.'],
    question: 'How would you use it on this example?',
    answer: 'I know the formula. I don’t know when to choose it.',
    unknown: 'Applying the formula',
    surface: 'The reply does not establish whether the student can use the explanation.',
    change: 'Choosing a method',
    reading: 'The remaining difficulty is deciding when the formula applies.',
    next: 'Work through how to choose the formula on a fresh example.'
  },
  {
    name: 'Taking on more work', context: 'A colleague is being asked for help.',
    opening: ['Could you take one more thing today?', 'I can try.'],
    question: 'What is already due today?',
    answer: 'The draft and two revisions. I’d have to push one back.',
    unknown: 'Available time',
    surface: 'The colleague is willing to help, but their existing commitments are unknown.',
    change: 'A scheduling conflict',
    reading: 'Accepting another task would delay an existing commitment.',
    next: 'Agree which task can move before adding another.'
  }
];
let introductoryDialogue = 0;
let introductoryRevealed = false;

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
  return `<div class="intro-dialogue-record"><div class="intro-record-heading"><span>${c.context}</span><span>Illustrative dialogue</span></div><ol class="intro-turns"><li><span>01</span><blockquote>${c.opening[0]}</blockquote></li><li class="intro-reply"><span>02</span><blockquote>${c.opening[1]}</blockquote></li>${introductoryRevealed?`<li class="intro-follow-up"><span>03</span><blockquote>${c.question}</blockquote></li><li class="intro-reply intro-follow-up"><span>04</span><blockquote>${c.answer}</blockquote></li>`:''}</ol><button class="intro-follow-button" data-intro-reveal aria-expanded="${introductoryRevealed}">${introductoryRevealed?'Return to the first exchange':'Ask one more question'}<span aria-hidden="true">${introductoryRevealed?'↶':'↗'}</span></button></div><aside class="intro-dialogue-reading" aria-live="polite"><span>${introductoryRevealed?'After the follow-up':'What we know so far'}</span><h3>${introductoryRevealed?c.change:c.unknown}</h3><p>${introductoryRevealed?c.reading:c.surface}</p>${introductoryRevealed?`<div class="intro-next-step"><span>A useful next step</span><p>${c.next}</p></div>`:''}</aside>`;
}

function proactivityOpening() {
  return `<section id="beneath-the-words" class="proactivity-opening" aria-labelledby="proactivity-heading"><div class="intro-history"><span class="intro-eyebrow">Proactiveness</span><div><p>In their 1995 account of agency, Michael Wooldridge and Nicholas R. Jennings included taking initiative toward a goal. In conversation, that may begin with checking an assumption the other person has left unstated.</p></div></div><div class="intro-section-heading"><div><span class="intro-eyebrow">Examples</span><h2 id="proactivity-heading">Short<br/><em>conversations.</em></h2></div><p>Open a follow-up to see what the initial reply left unclear.</p></div><div class="intro-case-selector" role="group" aria-label="Choose an everyday dialogue">${introductoryDialogues.map((c,i)=>`<button data-intro-case="${i}" aria-pressed="${i===introductoryDialogue}"><span>0${i+1}</span>${c.name}<b aria-hidden="true">&#8599;</b></button>`).join('')}</div><div id="intro-dialogue-panel" class="intro-dialogue-panel">${introductoryDialoguePanel()}</div></section>`;
}

document.addEventListener('click',event=>{
  const choose=event.target.closest('[data-intro-case]');
  if(choose){
    introductoryDialogue=Number(choose.dataset.introCase);
    introductoryRevealed=false;
    document.querySelectorAll('[data-intro-case]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.introCase)===introductoryDialogue)));
    const panel=document.getElementById('intro-dialogue-panel');
    if(panel)panel.innerHTML=introductoryDialoguePanel();
  }
  const reveal=event.target.closest('[data-intro-reveal]');
  if(reveal){
    introductoryRevealed=!introductoryRevealed;
    const panel=document.getElementById('intro-dialogue-panel');
    if(panel){panel.innerHTML=introductoryDialoguePanel();panel.querySelector('[data-intro-reveal]')?.focus({preventScroll:true});}
  }
});
