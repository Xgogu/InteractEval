import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {charts} from './Charts.jsx';

function ChartPlayer({kind}){
 const mechanism=kind.endsWith('-mechanism'),height=mechanism?300:340;
 const ref=useRef(null),host=useRef(null);
 const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{
   const media=matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setReduced(media.matches);
   media.addEventListener('change',change);
   const observer=new IntersectionObserver(entries=>{
     if(!ref.current)return;
     if(!media.matches&&entries[0].isIntersecting&&!document.hidden)ref.current.play();else ref.current.pause();
   },{threshold:.15});
   observer.observe(host.current);
   const visibility=()=>{if(document.hidden)ref.current?.pause();else if(!media.matches&&host.current.getBoundingClientRect().bottom>0&&host.current.getBoundingClientRect().top<innerHeight)ref.current?.play()};
   document.addEventListener('visibilitychange',visibility);
   return()=>{observer.disconnect();media.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility)};
 },[]);
 useEffect(()=>{if(reduced){ref.current?.pause();ref.current?.seekTo(120)}},[reduced]);
 return <div ref={host} aria-label={mechanism?'Animated theory illustration':'Animated data chart'} style={{width:'100%',aspectRatio:`480 / ${height}`}}>
   <Player ref={ref} component={charts[kind]} compositionWidth={480} compositionHeight={height} durationInFrames={210} fps={30}
     controls={false} loop autoPlay={!reduced} initiallyMuted clickToPlay={false} doubleClickToFullscreen={false}
     spaceKeyToPlayOrPause={false} initialFrame={reduced?120:0} style={{width:'100%',height:'100%',fontFamily:'"DM Sans",Sans,Arial,sans-serif'}}/>
 </div>;
}

const mounted=new Map();
function mount(element,kind){
 if(!element||!charts[kind]||mounted.has(element))return;
 const root=createRoot(element);mounted.set(element,root);root.render(<ChartPlayer kind={kind}/>);
}
function unmountAll(){mounted.forEach(root=>root.unmount());mounted.clear()}
function scan(){document.querySelectorAll('[data-motion-chart]').forEach(el=>mount(el,el.dataset.motionChart))}
window.InteractEvalMotion={mount,unmountAll,scan};
scan();
