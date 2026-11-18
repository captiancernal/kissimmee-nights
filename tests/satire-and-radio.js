require(__dirname+'/harness.js');G.startGame(false);step(5);const S=G.S;let errs=0;const ce=console.error;console.error=(...a)=>{errs++;ce('ERR',...a)};
console.log('stands',G.STANDS.map(s=>s.k+'@'+Math.round(s.x)+','+Math.round(s.y)).join(' | '));
const c={};for(const d of G.DECO)c[d.t]=(c[d.t]||0)+1;console.log('cones',c.cone,'strollers',c.strollers,'mower',c.mower,'billboards',c.billboard,'IT',G.IT.length);
G.P.money=1e5;let fail=[];for(const it of G.IT){try{it.fn();if(G.RG.on)G.mgClose()}catch(e){fail.push(it.label+': '+e.message)}}console.log('fired all, failures',fail.length,fail.slice(0,3));
// annual pass + blackout
const ride=G.IT.find(i=>i.label.startsWith('Ride the Haunted Manor'));S.apass=1;G.P.x=-1985;G.P.y=-3345;S.day=2;let m=G.P.money;ride.fn();console.log('pass weekday cost',m-G.P.money);S.cine=null;S.day=6;m=G.P.money;ride.fn();console.log('pass Saturday cost',m-G.P.money);S.cine=null;S.apass=0;
// virtual queue
S.vq=null;G.IT.find(i=>i.label.includes('virtual queue for the Star')).fn();console.log('vq',JSON.stringify(S.vq));S.tod+=50;G.parkEvents(.03);console.log('vq ready',S.vq.ready);const sc=G.IT.find(i=>i.label.startsWith('Ride the Star Coaster'));m=G.P.money;sc.fn();console.log('vq ride cost',m-G.P.money,'vq now',S.vq);S.cine=null;
// surge
G.P.x=-1110;G.P.y=-2950;S.day=2;S.tod=12*60;console.log('surge noon in park',G.parkSurge());S.tod=9*60;console.log('surge 9am',G.parkSurge());G.P.x=5600;G.P.y=2950;S.tod=12*60;console.log('surge outside park',G.parkSurge());
// own fireworks + snow
const n0=G.PT?G.PT.length:0;S.myfw=2;for(let i=0;i<60;i++)G.parkEvents(.033);console.log('fireworks particles spawned',(G.PT?G.PT.length:'n/a'));
G.P.x=2500;G.P.y=5900;S.tod=1085;for(let i=0;i<30;i++)G.parkEvents(.033);console.log('snow toast day',S.snow===S.dayN);
// radio
const veh=G.VEH.find(v=>!v.dead&&v.type==='sedan');G.P.veh=veh||G.VEH[0];S.radio=1;S.mode='play';G.P.dead=false;for(let i=0;i<5;i++)step(1);console.log('mode',S.mode,'veh',!!G.P.veh);console.log('radio text:',els.radio.textContent.slice(0,90));G.radioNext();console.log('next station',S.radio,els.radio.textContent.slice(0,60));
console.log('errors',errs);
