import type {Lab,Value} from '../data/labs';
export type Trial = {id:string;labId:number;choice:Value;control:number;value:number;unit:string;at:string};
const gauss=(x:number,mid:number,spread:number)=>Math.exp(-Math.pow((x-mid)/spread,2));
export function simulate(lab:Lab,choice:Value,control=lab.defaultControl):number {
 const x=typeof choice==='number'?choice:lab.choices.indexOf(choice);
 const factor=Math.max(.05,control/lab.defaultControl);
 let y=0;
 switch(lab.id){
 case 1:y=[9.7,10.9,11.4][x];break;
 case 2:y=85*Math.exp(-.017*(x-20))*Math.sqrt(100/control);break;
 case 3:{const acidMoles=x*.05*.83/60.05; const bicarbonateMoles=control/84.0066;y=Math.min(acidMoles,bicarbonateMoles)*24465;break;}
 case 4:y=4+28*x*factor;break;
 case 5:y=8+6*gauss(x,1.6,1.5);break;
 case 6:y=Math.min(control, x*.32);break;
 case 7:y=x;break;
 case 8:y=8+65*gauss(x,34,14)*factor;break;
 case 9:y=.05+1.05*gauss(x,9,10);break;
 case 10:y=[62,78,69][x];break;
 case 11:y=1.7*Math.sqrt(x/20)*Math.sqrt(factor);break;
 case 12:y=[55,73,64][x];break;
 case 13:y=38+42*(1-Math.exp(-x/7))-Math.max(0,x-12)*.75;break;
 case 14:y=70*factor/(x+2);break;
 case 15:y=6+7*gauss(x,6.4,1.65);break;
 default:y=0;
 }
 return Math.round(y*100)/100;
}
export function isComparable(a:Trial,b:Trial){return a.labId===b.labId && a.control===b.control && a.choice!==b.choice;}
export function makeTrial(lab:Lab,choice:Value,control:number):Trial{return {id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,labId:lab.id,choice,control,value:simulate(lab,choice,control),unit:lab.unit,at:new Date().toISOString()};}
export function csvExport(rows: Trial[]): string {const lines=[['lab','trial','independent','controlled','result','unit','timestamp'],...rows.map(r=>[r.labId,r.id,r.choice,r.control,r.value,r.unit,r.at])];return '\ufeff'+lines.map(row=>row.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\r\n');}
