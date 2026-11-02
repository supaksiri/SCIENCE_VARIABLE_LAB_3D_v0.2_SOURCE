import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Text} from '@react-three/drei';
import {Suspense, useEffect, useRef, useState} from 'react';
import type {Lab,Value} from '../data/labs';

const WHITE='#edf2f6';
function Glassware({x=0,level=.5,color='#b9e3ef',width=.42}:{x?:number;level?:number;color?:string;width?:number}){
 const liquidHeight=Math.max(.035,level)*1.18;
 return <group position={[x,.16,0]}>
  <mesh position={[0,.59,0]}><cylinderGeometry args={[width,width*.92,1.2,48,1,true]}/><meshPhysicalMaterial color="#9bb7c5" transparent opacity={.32} roughness={.05} side={2} depthWrite={false}/></mesh>
  <mesh position={[0,.015,0]}><cylinderGeometry args={[width*.92,width*.92,.03,48]}/><meshStandardMaterial color="#b1c4cf" transparent opacity={.5}/></mesh>
  <mesh position={[0,liquidHeight/2+.025,0]}><cylinderGeometry args={[width*.89,width*.89,liquidHeight,48]}/><meshPhysicalMaterial color={color} transparent opacity={.66} roughness={.12} depthWrite={false}/></mesh>
  <mesh position={[0,liquidHeight+.027,0]}><cylinderGeometry args={[width*.89,width*.89,.015,48]}/><meshPhysicalMaterial color={color} transparent opacity={.76}/></mesh>
  {[.2,.45,.7,.95].map((v,i)=><group key={i} position={[width+.035,v,0]}><mesh><boxGeometry args={[.105,.008,.012]}/><meshStandardMaterial color="#7d94a0"/></mesh></group>)}
 </group>;
}
function SmallInstrument({position,label,value}:{position:[number,number,number];label:string;value:string}){
 return <group position={position}><mesh castShadow><boxGeometry args={[1.18,.7,.55]}/><meshStandardMaterial color="#d4e0e6" metalness={.12} roughness={.43}/></mesh><mesh position={[0,.1,.285]}><planeGeometry args={[.96,.38]}/><meshStandardMaterial color="#102d39"/></mesh><Text position={[0,.10,.297]} fontSize={.15} color="#76e7dc" anchorX="center">{value}</Text><Text position={[0,-.54,.05]} fontSize={.145} color="#426072" anchorX="center">{label}</Text></group>
}
function Plant({x,height=1.45}:{x:number;height?:number}){return <group position={[x,.01,0]}><mesh position={[0,.28,0]} castShadow><cylinderGeometry args={[.42,.32,.54,24]}/><meshStandardMaterial color="#e5ebef"/></mesh><mesh position={[0,.48,0]}><cylinderGeometry args={[.37,.37,.07,24]}/><meshStandardMaterial color="#604e39"/></mesh><mesh position={[0,.54+height/2,0]}><cylinderGeometry args={[.026,.041,height,8]}/><meshStandardMaterial color="#41926a"/></mesh>{[.30,.55,.78].map((v,i)=><group key={i} position={[0,.54+v*height,0]} rotation={[0,i*2.4,0]}>{[-1,1].map(s=><mesh key={s} position={[s*.19,.04,0]} rotation={[0,0,-s*.4]}><sphereGeometry args={[.27,.075,.135,16,10]}/><meshStandardMaterial color={i===2?'#54b378':'#348f5e'} side={2}/></mesh>)}</group>)}</group>}
function SpecializedScene({lab,choice,result,progress}:{lab:Lab;choice:Value;result:number;progress:number}){
 if(lab.id===2){const temp=Number(choice);const amount=Math.max(0,1-progress);return <group>
  {[-2.3,0,2.3].map((x,i)=><group key={i} position={[x,0,0]}><Glassware level={.62} color="#c0e6f2"/><mesh position={[.01,.12+amount*.15,0]} scale={[1,Math.max(.06,amount),1]}><sphereGeometry args={[.26,24,14]}/><meshStandardMaterial color="#fbfdff" roughness={.88}/></mesh><mesh position={[.55,.94,0]}><cylinderGeometry args={[.045,.045,1.85,12]}/><meshStandardMaterial color="#d3dde2"/></mesh><mesh position={[.55,.18+temp/100*1.28,.01]}><cylinderGeometry args={[.023,.023,.1+temp/100,12]}/><meshStandardMaterial color="#e36b73"/></mesh><Text position={[0,1.83,0]} fontSize={.23} color="#31546a">{i===1?`${temp}°C`:'น้ำ 100 mL'}</Text></group>)}
  <SmallInstrument position={[0,.42,1.05]} label="เครื่องจับเวลา" value={`${(result*progress).toFixed(1)} s`}/>
 </group>}
 if(lab.id===3){const gas=result*progress;return <group>
  {[-2.2,0,2.2].map((x,i)=><group key={i} position={[x,0,0]}><Glassware level={.48} color="#d8eef4"/><mesh position={[0,1.55,0]}><torusGeometry args={[.4,.035,10,40]}/><meshStandardMaterial color="#9cbbc7" metalness={.35}/></mesh>{Array.from({length:11},(_,k)=><mesh key={k} position={[(Math.sin(k*2.3)*.27),.27+((k*.147+progress*(.3+k%3*.13))%1.12),Math.cos(k)*.22]} scale={Math.max(.005,progress)}><sphereGeometry args={[.035+(k%3)*.018,10,10]}/><meshPhysicalMaterial color="#effaff" transparent opacity={.65}/></mesh>)}<Text position={[0,1.98,0]} fontSize={.23} color="#335267">{i===1?`${choice} mL`:'CO₂'}</Text></group>)}
  <SmallInstrument position={[0,.4,1.2]} label="ปริมาตรแก๊ส" value={`${gas.toFixed(1)} mL`}/>
 </group>}
 if(lab.id===11){const h=Number(choice)/20;const ballY=.47+(1-progress)*h*.57;return <group>
  {[-2.2,0,2.2].map((x,i)=><group key={i} position={[x,0,0]}><mesh position={[0,.12,0]} castShadow><cylinderGeometry args={[.64,.64,.21,40]}/><meshStandardMaterial color="#91a9b8" roughness={.8}/></mesh><mesh position={[0,.20,0]} scale={[1,1-Math.min(.45,progress*.14),1]}><cylinderGeometry args={[.59,.59,.08,40]}/><meshStandardMaterial color="#74a0ac"/></mesh><mesh castShadow position={[0,ballY,0]}><sphereGeometry args={[.27,28,28]}/><meshStandardMaterial color="#8d9da8" metalness={.82} roughness={.2}/></mesh><mesh position={[.68,1.64,0]}><cylinderGeometry args={[.025,.025,3.2,12]}/><meshStandardMaterial color="#9fb0bc" metalness={.5}/></mesh><Text position={[0,2.75,0]} fontSize={.24} color="#345265">{i===1?`${choice} cm`:'ลูกเหล็ก'}</Text></group>)}
 <SmallInstrument position={[0,.42,1.13]} label="ความลึกรอยบุบ" value={`${(result*progress).toFixed(2)} mm`}/>
 </group>}
 return null;
}
function GenericScene({lab,choice,result,progress}:{lab:Lab;choice:Value;result:number;progress:number}){
 const isPlants=lab.kind==='plants';const isLiquid=['liquid','reaction','indicator','metal','evaporation','yeast','ice','icebath'].includes(lab.kind);
 const phColors:Record<number,string>={3:'#e5658f',5:'#df8eae',7:'#b190d7',9:'#9baf7b',11:'#8eac60'};
 const color=lab.kind==='indicator'?(phColors[Number(choice)]??'#b9d9ef'):lab.kind==='metal'?'#cdbb9a':'#b9e3ef';
 return <group>{[-2.2,0,2.2].map((x,i)=><group key={i}>{isPlants?<Plant x={x} height={.9+progress*result/9}/>:isLiquid?<group position={[x,0,0]}><Glassware level={lab.kind==='evaporation'?.7-progress*.35:.58} color={color}/>{lab.kind==='ice'&&<mesh position={[0,.64,0]} scale={Math.max(.01,1-progress)}><boxGeometry args={[.46,.46,.46]}/><meshPhysicalMaterial color="#d9f3ff" transparent opacity={.7}/></mesh>}</group>:<group position={[x,.46,0]}><mesh castShadow><boxGeometry args={[1.13,.72,.88]}/><meshStandardMaterial color={lab.kind==='food'?'#dcbf88':lab.kind==='washer'?'#e7f0f4':'#b5d4dc'}/></mesh></group>}<Text position={[x,.03,1.06]} rotation={[-Math.PI/2,0,0]} fontSize={.24} color="#486678">{['A','B','C'][i]}</Text></group>)}</group>;
}
function ActiveExperiment({lab,choice,result,running,runId}:{lab:Lab;choice:Value;result:number;running:boolean;runId:number}){
 const [progress]=useFrameProgress(running,runId);
 return <group>{[2,3,11].includes(lab.id)?<SpecializedScene lab={lab} choice={choice} result={result} progress={progress}/>:<GenericScene lab={lab} choice={choice} result={result} progress={progress}/>}</group>;
}
function useFrameProgress(running:boolean,runId:number):[number,(n:number)=>void]{
 const [progress,setProgress]=useState(0);
 const elapsed=useRef(0);const throttle=useRef(0);
 useEffect(()=>{elapsed.current=0;throttle.current=0;setProgress(0)},[runId]);
 useFrame((_,dt)=>{if(!running)return; elapsed.current=Math.min(1,elapsed.current+dt*.25);throttle.current+=dt; if(throttle.current>=.06){throttle.current=0;setProgress(elapsed.current);}});
 return [progress,setProgress];
}
function Room({lab,choice,result,running,runId}:{lab:Lab;choice:Value;result:number;running:boolean;runId:number}){
 return <><color attach="background" args={[WHITE]}/><ambientLight intensity={0.55}/><hemisphereLight intensity={0.5} color="#ffffff" groundColor="#9caeba"/><directionalLight castShadow position={[5,8,6]} intensity={1.15} shadow-mapSize={[1024,1024]} shadow-bias={-0.0002}/>
 <mesh receiveShadow position={[0,-.45,0]}><boxGeometry args={[18,.3,11]}/><meshStandardMaterial color="#dce3e9" roughness={.84}/></mesh>
 <mesh position={[0,3,-3.5]}><boxGeometry args={[18,8,.16]}/><meshStandardMaterial color="#f2f5f7"/></mesh>
 {[-5.2,-2.6,0,2.6,5.2].map(x=><group key={x}><mesh position={[x,3.3,-3.34]}><boxGeometry args={[2.05,2.75,.04]}/><meshStandardMaterial color="#d5eef7" emissive="#c8e8f5" emissiveIntensity={.15}/></mesh><mesh position={[x,3.3,-3.3]}><boxGeometry args={[.055,2.75,.07]}/><meshStandardMaterial color="#bcced9"/></mesh></group>)}
 <mesh castShadow receiveShadow position={[0,-.12,0]}><boxGeometry args={[9.6,.35,3.2]}/><meshStandardMaterial color="#e9eef2" roughness={.48}/></mesh>
 <mesh position={[0,-1,0]}><boxGeometry args={[9,1.48,2.7]}/><meshStandardMaterial color="#e3eaf0" roughness={.65}/></mesh>
 <mesh position={[-4.05,.58,-.7]}><boxGeometry args={[.15,1.55,.15]}/><meshStandardMaterial color="#b8cbd5" metalness={.6}/></mesh>
 <Text position={[0,3.62,-3.15]} fontSize={.4} color="#2c5166" anchorX="center">SCIENCE VARIABLE LAB 3D</Text>
 <ActiveExperiment lab={lab} choice={choice} result={result} running={running} runId={runId}/>
 </>;
}
export function LabScene({lab,choice,result,running,runId=0}:{lab:Lab;choice:Value;result:number;running:boolean;runId?:number}){
 return <div className="canvas-wrap"><Canvas shadows camera={{position:[6.2,5.5,10.5],fov:42}} dpr={[1,1.7]} gl={{antialias:true,alpha:false}}><Suspense fallback={null}><Room lab={lab} choice={choice} result={result} running={running} runId={runId}/></Suspense><OrbitControls minDistance={6.4} maxDistance={17} maxPolarAngle={Math.PI/2.05} target={[0,.65,0]} enablePan={false}/></Canvas><div className="scene-note">3D INTERACTIVE • ผลจำลองเพื่อการศึกษา ไม่ใช่ค่าที่วัดจริง</div></div>;
}
