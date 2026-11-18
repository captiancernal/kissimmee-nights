require(__dirname+'/harness.js');
const tp=(x,y)=>{G.P.x=x;G.P.y=y;G.CAM.x=x;G.CAM.y=y};
G.startGame(false);step(30);const S=G.S,P=G.P;const st=()=>S.heat<1?0:Math.min(5,Math.floor(S.heat));
const clear=()=>{for(const p of G.PED)if(p.kind==='cop'||p.kind==='civ'||p.kind==='spec')p.rm=1;for(const v of G.VEH)if(v.type==='police'||v.type==='swat')v.rm=1;S.heat=0;S.mode='play';P.dead=false;P.hp=100;step(2)};
const lone=()=>{clear();for(const p of G.PED)if(Math.hypot(p.x-P.x,p.y-P.y)<700&&p.kind!=='cop')p.rm=1;step(1)};
// 1 idle on foot and standing in the world for 3 minutes
tp(9520,6385);let mx=0;for(let i=0;i<5400;i++){step(1);mx=Math.max(mx,S.heat);P.hp=100}console.log('idle 3 min: max heat',mx.toFixed(2),'stars',st());
// 2 one gunshot with bystanders
S.heat=0;P.own.pistol=1;P.ammo.pistol=999;P.cur='pistol';G.mkPed(P.x+120,P.y+60,'civ',{});P.a=-Math.PI/2;G.K.Space=true;step(2);G.K.Space=false;step(2);console.log('one shot near a bystander: heat',S.heat.toFixed(2),'stars',st());
G.K.Space=true;step(90);G.K.Space=false;console.log('3 s of shooting in the air near bystander: heat',S.heat.toFixed(2),'stars',st());
// 3 kill, witnessed vs not
lone();let v=G.mkPed(P.x+30,P.y,'civ',{});v.hp=1;G.mkPed(P.x+150,P.y+80,'civ',{});P.cur='fist';P.a=0;G.K.Space=true;for(let i=0;i<60&&v.st!=='dead';i++)step(1);G.K.Space=false;console.log('punch-kill with witness:',v.st,'heat',S.heat.toFixed(2),'stars',st(),'|',els.toast.textContent);
lone();tp(9520,6385);for(const p of G.PED)p.rm=1;step(1);v=G.mkPed(P.x+30,P.y,'civ',{});v.hp=1;G.K.Space=true;for(let i=0;i<60&&v.st!=='dead';i++)step(1);G.K.Space=false;console.log('punch-kill, nobody around:',v.st,'heat',S.heat.toFixed(2),'stars',st());
let t=0;while(S.heat>0&&t<3000){step(1);t++;for(const p of G.PED)if(p.kind==='civ')p.rm=1}console.log('  suspicion fades in',(t/30).toFixed(0),'s');
// 4 AI car explodes next to pedestrians, player 200 away
lone();const car=G.mkVeh('sedan',P.x+200,P.y,0,{});for(let i=0;i<4;i++)G.mkPed(car.x+rn(),car.y+rn(),'civ',{});function rn(){return Math.random()*60-30}car.hp=0;car.burn=.1;step(20);console.log('AI car blows up by itself near 4 peds: heat',S.heat.toFixed(2),'stars',st(),'kills',S.kills);
// 5 carjack with no cop
lone();const c2=G.mkVeh('sedan',P.x+30,P.y,0,{ai:{from:1,to:2}});G.mkPed(P.x+100,P.y+100,'civ',{});try{G.doCar()}catch(e){console.log('doCar',e.message)}step(3);console.log('carjack w/ civilian witness: in car',!!P.veh,'heat',S.heat.toFixed(2),'stars',st());
// 6 run one pedestrian over
S.heat=0;if(P.veh){const q=G.mkPed(P.veh.x+Math.cos(P.veh.a)*40,P.veh.y+Math.sin(P.veh.a)*40,'civ',{});P.veh.s=260;G.K.ArrowUp=true;step(12);G.K.ArrowUp=false;console.log('ran over one pedestrian:',q.st,'heat',S.heat.toFixed(2),'stars',st())}
// 7 tap a parked cruiser gently vs ram it
S.heat=0;P.veh=null;lone();
// 8 kill a cop
const cop=G.mkPed(P.x+30,P.y,'cop',{});cop.hp=1;P.cur='fist';P.a=0;G.K.Space=true;for(let i=0;i<60&&cop.st!=='dead';i++)step(1);G.K.Space=false;console.log('killed a cop: heat',S.heat.toFixed(2),'stars',st());
t=0;tp(2000,2000);while(S.heat>0&&t<9000){step(1);t++;P.hp=100;if(t%30===0)for(const p of G.PED)if(p.kind==='cop')p.rm=1;for(const q of G.VEH)if(q.ai&&q.ai.chase)q.rm=1}console.log('  out of sight, lost them after',(t/30).toFixed(0),'s |',els.toast.textContent);
// 9 drive around normally for 4 minutes following roads (teleport along edges at speed)
