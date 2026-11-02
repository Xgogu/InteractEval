import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

// Authored visual metaphors. Measured results live in the separate data panel.
const green='#234e3b',sage='#8ca58a',pale='#dce7d7',line='#c5d2c1',rust='#a05b35',gold='#c59a55',paper='#f5f8f1',muted='#607266';
const timing={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.22,.8,.24,1)};
function usePhase(start,end){const frame=useCurrentFrame(),{fps}=useVideoConfig();return interpolate(frame,[start*fps,end*fps],[0,1],timing);}
function Scene({label,children}){return <AbsoluteFill style={{fontFamily:'"DM Sans",Arial,sans-serif'}}><svg viewBox="0 0 480 300" role="img" aria-label={label} style={{overflow:'hidden'}}>{children}</svg></AbsoluteFill>;}
function Trace({d,start=.4,end=2.4,color=green,width=3,dashed=false}){const p=usePhase(start,end);return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray={dashed?'.015 .025':'1'} strokeDashoffset={1-p}/>;}
function Appear({start=.3,children}){const p=usePhase(start,start+.45);return <g opacity={p}>{children}</g>;}
function Check({x,y,r=10,color=green}){return <g transform={`translate(${x} ${y})`}><circle r={r} fill={color}/><path d={`M${-r*.43} 0l${r*.3} ${r*.3} ${r*.6} ${-r*.65}`} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>;}
function Flag({x,y}){return <g transform={`translate(${x} ${y})`}><path d="M0 15v-31m0 0c9-6 16 5 26 0v17c-10 5-17-6-26 0" fill={pale} stroke={green} strokeWidth="2" strokeLinejoin="round"/><circle cy="18" r="3" fill={green}/></g>;}
function Person({x,y,flip=false}){return <g transform={`translate(${x} ${y}) scale(${flip?-1:1} 1)`}><circle cy="-18" r="15" fill={pale} stroke={green} strokeWidth="1.8"/><path d="M-24 34v-8c0-18 10-26 24-26s24 8 24 26v8" fill={pale} stroke={green} strokeWidth="1.8"/><circle cx="5" cy="-19" r="1.8" fill={green}/><path d="M4-12q5 3 8-1" fill="none" stroke={green} strokeWidth="1.5" strokeLinecap="round"/></g>;}
function Key({x,y,scale=1,opacity=1}){return <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fill="none" stroke={gold} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="-9" r="7"/><path d="M-2 0h23m-4 0v6m-7-6v5"/></g>;}

function SubmergedState(){
 const reveal=usePhase(.4,1.9),scan=usePhase(1.3,3.5);
 return <g>
  <g opacity={.18+.82*reveal}>
   <path d="m126 106 25 91 85 63 100-56 35-98Z" fill="#dce7d7"/>
   <path d="m126 106 110 154 2-154Z" fill="#b4cbb2"/>
   <path d="m238 106-2 154 100-56 35-98Z" fill="#91b291" opacity=".75"/>
   <path d="m126 106 110 154 100-56 35-98M151 197l87-91 98 98" fill="none" stroke="#769c7d" strokeWidth="1" opacity=".6"/>
  </g>
  <path d={`M117 ${118+scan*112}q122 17 264 0`} fill="none" stroke="#fff" strokeWidth="2" opacity={scan<.98?.8:0}/>
  <Appear start={1.2}><g transform="translate(142 162)"><path d="M-13 0q13-15 26 0-13 15-26 0" fill={paper} stroke={green} strokeWidth="1.5"/><circle r="4" fill={green}/></g><text x="90" y="192" textAnchor="middle" fill={muted} fontSize="20">Belief</text><path d="M112 181l19-13" stroke={sage}/></Appear>
  <Appear start={1.7}><circle cx="238" cy="212" r="12" fill={paper} stroke={green} strokeWidth="1.5"/><circle cx="238" cy="212" r="5" fill={green}/><path d="M238 225v32" stroke={sage}/><text x="238" y="283" textAnchor="middle" fill={muted} fontSize="20">Goal</text></Appear>
  <Appear start={2.2}><path d="M331 158c-13-16-25 2 0 20 25-18 13-36 0-20" fill={paper} stroke={green} strokeWidth="1.5"/><path d="M344 177l22 14" stroke={sage}/><text x="389" y="198" textAnchor="middle" fill={muted} fontSize="20">Trust</text></Appear>
 </g>;
}
export function IcebergMechanism(){return <Scene label="A small spoken reply sits above the water; a much larger iceberg below reveals beliefs, goals and trust.">
 <defs><linearGradient id="ice-water" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#dae8dc" stopOpacity=".45"/><stop offset="1" stopColor="#edf3e8" stopOpacity="0"/></linearGradient></defs>
 <path d="M18 105H462V290H18Z" fill="url(#ice-water)"/>
 <path d="m178 103 59-65 52 65Z" fill="#fdfefb" stroke={sage} strokeWidth="1.2"/><path d="m237 38 12 65h40Z" fill="#cfddca"/>
 <SubmergedState/>
 <path d="M20 105q30-6 60 0t60 0 60 0 60 0 60 0 60 0 60 0" fill="none" stroke={sage} strokeWidth="1.4"/>
 <text x="240" y="25" textAnchor="middle" fill={green} fontSize="23">“I understand.”</text>
 </Scene>;}

function JourneyDot(){
 const p=usePhase(.5,3.1),t=p<.5?p*2:(p-.5)*2,q=1-t;
 const pts=p<.5?[[58,145],[134,170],[168,118],[240,112]]:[[240,112],[312,106],[350,98],[420,80]];
 const x=q*q*q*pts[0][0]+3*q*q*t*pts[1][0]+3*q*t*t*pts[2][0]+t*t*t*pts[3][0];
 const y=q*q*q*pts[0][1]+3*q*q*t*pts[1][1]+3*q*t*t*pts[2][1]+t*t*t*pts[3][1];
 return <g><circle cx={x} cy={y} r="13" fill={green} opacity=".1"/><circle cx={x} cy={y} r="5.5" fill={green}/></g>;
}
export function MovieMechanism(){return <Scene label="Across four turns, one trajectory advances to a goal while a second keeps returning to the same state. Both follow the same time axis.">
 {[58,179,300,420].map((x,i)=><g key={x}><path d={`M${x} 45V253`} stroke={line} strokeDasharray="2 7"/><text x={x} y="281" textAnchor="middle" fill={muted} fontSize="20">Turn {i+1}</text></g>)}
 <text x="20" y="36" fill={green} fontSize="20">Progress</text><text x="20" y="193" fill={rust} fontSize="20">Repetition</text>
 <path d="M58 145C134 170 168 118 240 112S350 98 420 80" stroke={line} strokeWidth="2" fill="none"/>
 <Trace d="M58 145C134 170 168 118 240 112S350 98 420 80" start={.5} end={3.1}/>
 <Trace d="M58 220C98 182 138 258 179 220S259 182 300 220 380 258 420 220" start={.5} end={3.1} color={rust} width={2}/>
 {[58,179,300,420].map(x=><circle key={x} cx={x} cy="220" r="9" fill={paper} stroke={rust} strokeWidth="1.5"/>)}
 <JourneyDot/><Appear start={2.9}><Check x={420} y={80} r={13}/></Appear>
 </Scene>;}

function InitiativeJourney(){
 const p=usePhase(1.1,3.5),q=1-p;
 const x=q*q*q*58+3*q*q*p*195+3*q*p*p*340+p*p*p*416;
 const y=q*q*q*211+3*q*q*p*285+3*q*p*p*250+p*p*p*84;
 return <g><Trace d="M58 211C195 285 340 250 416 84" start={1.1} end={3.5}/><circle cx={x} cy={y} r="14" fill={green} opacity=".1"/><circle cx={x} cy={y} r="6" fill={green}/></g>;
}
export function AgencyMechanism(){return <Scene label="A direct route is blocked. An agent finds a useful alternative and follows it through to a verified goal.">
 <path d="M57 211Q107 87 187 68M57 211Q176 120 415 84M57 211C195 285 340 250 416 84" stroke={line} strokeWidth="1.5" fill="none" strokeDasharray="4 6"/>
 <path d="M244 57v132" stroke={rust} strokeWidth="3" strokeLinecap="round"/><path d="M251 64v117" stroke={rust} opacity=".15" strokeWidth="9"/>
 <Trace d="M57 211Q147 157 244 137" start={.2} end={.9} color={rust} width={2}/>
 <Appear start={.75}><path d="m236 129 16 16m0-16-16 16" stroke={rust} strokeWidth="2.5" strokeLinecap="round"/></Appear>
 <circle cx="57" cy="211" r="12" fill={paper} stroke={green} strokeWidth="2"/><Flag x={416} y={66}/>
 <InitiativeJourney/>
 <text x="35" y="249" fill={muted} fontSize="20">Notice</text><text x="250" y="276" fill={muted} fontSize="20">Choose &amp; act</text>
 <Appear start={3.3}><Check x={416} y={84} r={13}/><text x="375" y="126" fill={green} fontSize="20">Verify</text></Appear>
 </Scene>;}

function MovingKey(){const p=usePhase(.7,2.1),x=236+141*p,y=185-75*Math.sin(p*Math.PI);return <Key x={x} y={y} scale={.8}/>;}
function Drawer({x,y,scale=1}){return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M-39-22h78v51h-78Z" fill="#e1e8d9" stroke={green} strokeWidth="1.6"/><path d="M-39 3h78M-10-9h20M-10 16h20" stroke={green} strokeWidth="1.5" strokeLinecap="round"/><path d="M-33 29v7m66-7v7" stroke={green} strokeWidth="2"/></g>;}
function Bag({x,y}){return <g transform={`translate(${x} ${y})`}><path d="M-27-12h54l8 58h-70Z" fill="#e9dfc7" stroke={gold} strokeWidth="1.8" strokeLinejoin="round"/><path d="M-13-10v-9a13 13 0 0 1 26 0v9" stroke={gold} strokeWidth="2" fill="none"/></g>;}
export function MindMechanism(){return <Scene label="A key moves from a drawer to a bag while a person's thought still shows the key in the drawer. Belief and the physical world diverge.">
 <path d="M26 255H452" stroke={line}/><Person x={78} y={207}/>
 <path d="M104 112c-29 14-66 3-66-22s22-35 51-33 48 13 48 35-13 29-33 20Z" fill="#fff" stroke={sage} strokeWidth="1.2"/>
 <circle cx="91" cy="130" r="4" fill="#fff" stroke={sage}/><circle cx="85" cy="143" r="2.3" fill={sage}/>
 <Drawer x={87} y={83} scale={.65}/><Key x={87} y={80} scale={.5}/>
 <Drawer x={236} y={205}/><Bag x={377} y={194}/><MovingKey/>
 <Trace d="M104 185Q141 166 195 190" start={2.1} end={3.1} width={1.5} color={sage} dashed/>
 <text x="78" y="35" textAnchor="middle" fill={muted} fontSize="20">Belief</text><text x="236" y="282" textAnchor="middle" fill={muted} fontSize="20">Drawer</text><text x="377" y="282" textAnchor="middle" fill={muted} fontSize="20">Bag</text>
 </Scene>;}

function SharedFields(){
 const p=usePhase(.5,2.4),left=149+33*p,right=331-33*p,shared=usePhase(2,3.2);
 return <g>
  <circle cx={left} cy="133" r="82" fill={green} opacity=".09"/><circle cx={right} cy="133" r="82" fill={gold} opacity=".13"/>
  <circle cx={left} cy="133" r="82" stroke={sage} strokeWidth="1.2" fill="none"/><circle cx={right} cy="133" r="82" stroke={gold} strokeWidth="1.2" fill="none"/>
  <circle cx={left-21} cy="111" r="7" fill={sage}/><path d={`m${left-35} 160 8-14 8 14Z`} fill={green} opacity=".7"/>
  <path d={`m${right+20} 103 9 9-9 9-9-9Z`} fill={gold}/><circle cx={right+30} cy="158" r="6" fill={gold}/>
  <circle cx={left+34+(240-left-34)*shared} cy={125} r="6" fill={green}/><circle cx={right-35+(240-right+35)*shared} cy={143} r="6" fill={gold}/>
  <g opacity={shared}><path d="M234 125h12v18h-12Z" fill={green} opacity=".15"/><Check x={240} y={134} r={14}/></g>
 </g>;
}
export function GroundingMechanism(){return <Scene label="Two participants exchange evidence. Their knowledge fields overlap and a shared understanding is confirmed in the centre.">
 <SharedFields/><Person x={65} y={229}/><Person x={415} y={229} flip/>
 <Trace d="M90 206Q148 245 211 163" start={.6} end={1.8} color={sage} width={1.8}/><Trace d="M390 206Q335 244 269 163" start={1.2} end={2.5} color={gold} width={1.8}/>
 <text x="65" y="288" textAnchor="middle" fill={muted} fontSize="20">A</text><text x="415" y="288" textAnchor="middle" fill={muted} fontSize="20">B</text>
 <Appear start={2.7}><text x="240" y="262" textAnchor="middle" fill={green} fontSize="20">Shared understanding</text></Appear>
 </Scene>;}

function Reroute(){
 const p=usePhase(1.6,3.5),q=1-p;
 const x=q*q*q*62+3*q*q*p*170+3*q*p*p*327+p*p*p*419;
 const y=q*q*q*205+3*q*q*p*281+3*q*p*p*247+p*p*p*74;
 return <g><Trace d="M62 205C170 281 327 247 419 74" start={1.6} end={3.5}/><circle cx={x} cy={y} r="6" fill={green}/><circle cx={x} cy={y} r="13" fill={green} opacity=".1"/></g>;
}
function Attention(){const p=usePhase(.2,1.4);return <g><circle cx="230" cy="111" r={15+p*36} fill="none" stroke={rust} strokeWidth="1" opacity={1-p}/><circle cx="230" cy="111" r="13" fill="#f2e4d8" stroke={rust}/><path d="m225 106 10 10m0-10-10 10" stroke={rust} strokeWidth="2" strokeLinecap="round"/></g>;}
export function AwarenessMechanism(){return <Scene label="A train connection is cancelled. Attention shifts to the disruption; the expected route fades and an alternative route is projected and followed.">
 <defs><pattern id="transit-grid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill={line}/></pattern></defs>
 <path d="M16 24H464V254H16Z" fill="url(#transit-grid)" opacity=".5"/>
 <path d="M62 205 230 111 419 74M230 111 261 212 419 74M62 205C170 281 327 247 419 74" stroke={line} strokeWidth="2" fill="none"/>
 <path d="M230 111 419 74" stroke={rust} opacity=".5" strokeWidth="2" strokeDasharray="5 7"/>
 <circle cx="62" cy="205" r="10" fill={paper} stroke={green} strokeWidth="2"/><circle cx="261" cy="212" r="7" fill={paper} stroke={sage} strokeWidth="2"/>
 <Attention/><Reroute/><Flag x={419} y={56}/>
 <text x="211" y="79" fill={rust} fontSize="20">Cancelled</text>
 <text x="34" y="240" fill={muted} fontSize="20">Now</text><text x="380" y="115" fill={muted} fontSize="20">9 a.m.</text>
 <g fill={muted} fontSize="20"><text x="24" y="290">Notice</text><text x="178" y="290">Understand</text><text x="359" y="290">Anticipate</text></g>
 <Trace d="M24 267H450" start={.3} end={3.5} width={1.5}/>
 </Scene>;}
