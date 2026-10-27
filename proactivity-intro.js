'use strict';

// Historical framing: Wooldridge & Jennings (1995), Intelligent Agents: Theory
// and Practice, section 2.1, "A Weak Notion of Agency".
// https://www.cs.ox.ac.uk/people/michael.wooldridge/pubs/ker95.pdf
// Evaluation context: ProactiveEval (2025), https://arxiv.org/abs/2508.20973.
// These authored vignettes illustrate uncertainty; they are not scored episodes.
const introductoryTraits = [
  ['Reactivity', 'Respond to changes in the environment.'],
  ['Social ability', 'Interact with people and other agents.'],
  ['Autonomy', 'Control actions without direct intervention.'],
  ['Proactiveness', 'Take initiative toward a goal.']
];
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
  return editorialHero({
    kicker: 'Main',
    title: 'What remains<br/><em>unsaid.</em>',
    deck: 'People rarely spell out every goal, constraint, or concern. A useful partner must decide what to ask, when to offer a next step, and when to wait.',
    aside: `<aside class="agency-origin" aria-label="Four properties of agency"><div class="agency-origin-heading"><span>FOUR PROPERTIES OF AGENCY</span><span>1995</span></div>${introductoryTraits.map(([name,meaning],i)=>`<div class="agency-origin-trait ${i===3?'agency-origin-active':''}"><span>0${i+1}</span><div><h2>${name}</h2><p>${meaning}</p></div>${i===3?'<b aria-hidden="true">↗</b>':''}</div>`).join('')}<p class="agency-origin-credit">Wooldridge &amp; Jennings<br/><cite>Intelligent Agents: Theory and Practice</cite></p><a href="#beneath-the-words" data-research-section="beneath-the-words">Conversation examples <span>↓</span></a></aside>`
  });
}

function introductoryDialoguePanel() {
  const c=introductoryDialogues[introductoryDialogue];
  return `<div class="intro-dialogue-record"><div class="intro-record-heading"><span>${c.context}</span><span>ILLUSTRATIVE DIALOGUE</span></div><ol class="intro-turns"><li><span>01</span><blockquote>${c.opening[0]}</blockquote></li><li class="intro-reply"><span>02</span><blockquote>${c.opening[1]}</blockquote></li>${introductoryRevealed?`<li class="intro-follow-up"><span>03</span><blockquote>${c.question}</blockquote></li><li class="intro-reply intro-follow-up"><span>04</span><blockquote>${c.answer}</blockquote></li>`:''}</ol><button class="intro-follow-button" data-intro-reveal aria-expanded="${introductoryRevealed}">${introductoryRevealed?'Return to the first exchange':'Ask one more question'}<span aria-hidden="true">${introductoryRevealed?'↶':'↗'}</span></button></div><aside class="intro-dialogue-reading" aria-live="polite"><span>${introductoryRevealed?'AFTER THE FOLLOW-UP':'WHAT WE KNOW SO FAR'}</span><h3>${introductoryRevealed?c.change:c.unknown}</h3><p>${introductoryRevealed?c.reading:c.surface}</p>${introductoryRevealed?`<div class="intro-next-step"><span>A USEFUL NEXT STEP</span><p>${c.next}</p></div>`:''}</aside>`;
}

function proactivityOpening() {
  return `<section id="beneath-the-words" class="proactivity-opening" aria-labelledby="proactivity-heading"><div class="intro-history"><span class="intro-eyebrow">PROACTIVENESS</span><div><p>In their 1995 account of agency, Michael Wooldridge and Nicholas R. Jennings included taking initiative toward a goal. In conversation, that may begin with checking an assumption the other person has left unstated.</p></div></div><div class="intro-section-heading"><div><span class="intro-eyebrow">EXAMPLES</span><h2 id="proactivity-heading">Short<br/><em>conversations.</em></h2></div><p>Open a follow-up to see what the initial reply left unclear.</p></div><div class="intro-case-selector" role="group" aria-label="Choose an everyday dialogue">${introductoryDialogues.map((c,i)=>`<button data-intro-case="${i}" aria-pressed="${i===introductoryDialogue}"><span>0${i+1}</span>${c.name}<b aria-hidden="true">&#8599;</b></button>`).join('')}</div><div id="intro-dialogue-panel" class="intro-dialogue-panel">${introductoryDialoguePanel()}</div><a class="intro-results-link" href="#model-readout" data-research-section="model-readout">Model results <span>&darr;</span></a></section>`;
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
