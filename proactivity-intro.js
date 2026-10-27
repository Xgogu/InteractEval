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
    surface: 'A possible agreement. The practical constraints are still unclear.',
    change: 'An unspoken constraint becomes visible.',
    reading: 'The reply did not establish that the plan was feasible. One question reveals a constraint that matters before booking.',
    next: 'Check a later train or an earlier pickup together.'
  },
  {
    name: 'Learning something new', context: 'A student has just heard an explanation.',
    opening: ['Does that explanation make sense?', 'Yes, I think so.'],
    question: 'How would you use it on this example?',
    answer: 'I know the formula. I don’t know when to choose it.',
    surface: 'An acknowledgment. It leaves the level of understanding open.',
    change: 'Recognition and understanding come apart.',
    reading: 'A short acknowledgment can fit several interpretations. Trying a new example supplies evidence about what still needs explaining.',
    next: 'Work through how to choose the formula on a fresh example.'
  },
  {
    name: 'Taking on more work', context: 'A colleague is being asked for help.',
    opening: ['Could you take one more thing today?', 'I can try.'],
    question: 'What is already due today?',
    answer: 'The draft and two revisions. I’d have to push one back.',
    surface: 'A willingness to help. Available capacity has not been established.',
    change: 'An apparent yes contains a trade-off.',
    reading: 'The follow-up makes a scheduling conflict explicit. Taking the reply as a firm commitment would leave that conflict unresolved.',
    next: 'Agree which task can move before adding another.'
  }
];
let introductoryDialogue = 0;
let introductoryRevealed = false;

function proactivityHero() {
  return editorialHero({
    kicker: 'THE QUESTION BEHIND INTERACTEVAL',
    title: 'What remains<br/><em>unsaid.</em>',
    deck: 'People rarely spell out every goal, constraint, or concern. A useful partner must decide what to ask, when to offer a next step, and when to wait.',
    byline: 'InteractEval',
    subline: 'Understanding what unfolds between people and systems',
    aside: `<aside class="agency-origin" aria-label="Four properties of agency"><div class="agency-origin-heading"><span>FOUR PROPERTIES OF AGENCY</span><span>1995</span></div>${introductoryTraits.map(([name,meaning],i)=>`<div class="agency-origin-trait ${i===3?'agency-origin-active':''}"><span>0${i+1}</span><div><h2>${name}</h2><p>${meaning}</p></div>${i===3?'<b aria-hidden="true">↗</b>':''}</div>`).join('')}<p class="agency-origin-credit">Wooldridge &amp; Jennings<br/><cite>Intelligent Agents: Theory and Practice</cite></p><a href="#beneath-the-words" data-research-section="beneath-the-words">Where initiative begins <span>↓</span></a></aside>`,
    foot: ['THE STATE BENEATH THE WORDS', 'THE TRAJECTORY ACROSS TURNS', 'THE INITIATIVE TO MOVE FORWARD']
  });
}

function introductoryDialoguePanel() {
  const c=introductoryDialogues[introductoryDialogue];
  return `<div class="intro-dialogue-record"><div class="intro-record-heading"><span>${c.context}</span><span>ILLUSTRATIVE DIALOGUE</span></div><ol class="intro-turns"><li><span>01</span><blockquote>${c.opening[0]}</blockquote></li><li class="intro-reply"><span>02</span><blockquote>${c.opening[1]}</blockquote></li>${introductoryRevealed?`<li class="intro-follow-up"><span>03</span><blockquote>${c.question}</blockquote></li><li class="intro-reply intro-follow-up"><span>04</span><blockquote>${c.answer}</blockquote></li>`:''}</ol><button class="intro-follow-button" data-intro-reveal aria-expanded="${introductoryRevealed}">${introductoryRevealed?'Return to the first exchange':'Ask one more question'}<span aria-hidden="true">${introductoryRevealed?'↶':'↗'}</span></button></div><aside class="intro-dialogue-reading" aria-live="polite"><span>${introductoryRevealed?'AFTER THE FOLLOW-UP':'WHAT WE KNOW SO FAR'}</span><h3>${introductoryRevealed?c.change:'The words leave room for more.'}</h3><p>${introductoryRevealed?c.reading:c.surface}</p>${introductoryRevealed?`<div class="intro-next-step"><span>A USEFUL NEXT STEP</span><p>${c.next}</p></div>`:'<p class="intro-uncertainty">A follow-up can test an interpretation before the conversation proceeds.</p>'}</aside>`;
}

function proactivityOpening() {
  return `<section id="beneath-the-words" class="proactivity-opening" aria-labelledby="proactivity-heading"><div class="intro-history"><span class="intro-eyebrow">A QUESTION THAT ENDURES</span><div><p>In 1995, Michael Wooldridge and Nicholas R. Jennings described four properties of an agent: reactivity, social ability, autonomy, and proactiveness. The last asks how a system takes initiative toward a goal.</p><p>For conversational systems, this raises a difficult question: <strong>how do you recognize a useful next step when the need for it has not been stated?</strong> Existing work studies proactive dialogue, but evaluation across open-ended settings remains fragmented.</p></div></div><div class="intro-section-heading"><div><span class="intro-eyebrow">BENEATH THE WORDS</span><h2 id="proactivity-heading">An ordinary reply.<br/><em>An incomplete picture.</em></h2></div><p>A constraint, a gap in understanding, a competing priority. Some of what matters becomes clear only as the conversation unfolds.</p></div><div class="intro-case-selector" role="group" aria-label="Choose an everyday dialogue">${introductoryDialogues.map((c,i)=>`<button data-intro-case="${i}" aria-pressed="${i===introductoryDialogue}"><span>0${i+1}</span>${c.name}<b aria-hidden="true">↗</b></button>`).join('')}</div><div id="intro-dialogue-panel" class="intro-dialogue-panel">${introductoryDialoguePanel()}</div><div class="intro-bridge"><span class="intro-eyebrow">WHY INTERACTEVAL</span><div><h3>The next turn changes what we can know.</h3><p>InteractEval follows the state behind the words, the trajectory across turns, and the contribution of each response. The question is how an interaction develops as participants ask, act, adapt, or wait.</p></div><a href="#model-readout" data-research-section="model-readout">Explore the findings <span>↓</span></a></div></section>`;
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
