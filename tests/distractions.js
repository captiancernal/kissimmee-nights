require(__dirname+'/harness.js');
G.startGame(false);step(5);const R=G.RG,B=G.BB,rn=(a,b)=>a+Math.random()*(b-a);
function play(n,t,acc,pre){G.S.mg={};G.mgGo(G.GAMES.bb,n,{t});const s=R.st;let g=0,sp=0,lastBan='';const seen={},st={q:0,sp:0,sv:0,k:0};if(pre)pre(s);
 while(s.ph!=='over'&&g++<120000){const p=B.cur(s);if(s.ph==='intro'&&s.t>.5)B.down(s,360,360);
  if(s.ph==='qte'&&!s.q.cpu&&g%5===0){st.q++;if(Math.random()<.85)B.qin(s,s.q.seq[s.q.i]);else B.qin(s,(s.q.seq[s.q.i]+1)%4)}if(s.ban==='SPILLED!'&&lastBan!=='SPILLED!')st.sp++;if(s.ban==='SAVED!'&&lastBan!=='SAVED!')st.sv++;if(s.ban==='KILLED IT!'&&lastBan!=='KILLED IT!')st.k++;if(s.ban!==lastBan){lastBan=s.ban;for(const k in G.SPEC)if(s.ban===G.SPEC[k].n.toUpperCase()+'!')seen[k]=(seen[k]||0)+1}
  if((s.ph==='ready'||s.ph==='aim')&&p.hum&&s.t>.3&&!s.ball){const tg=s.P[(1-p.tm)*2+(Math.random()*2|0)],o=B.org(p.tm),dx=(tg.x-o[0])/2.4+rn(-acc,acc),dy=(tg.y-o[1])/2.4+rn(-acc,acc),y0=p.tm?200:500;B.down(s,360,y0);B.move(s,360-dx,y0-dy);if(s.dr)s.dr.t=1.5*B.per(s,B.cur(s))+(Math.random()-.5)*.14;B.up(s,360-dx,y0-dy)}
  if(s.ph==='drink'){const tm=s.dtm,df=1-tm;R.ptr={};if(s.drk&&s.drk.hum&&s.gl[tm]<.8)R.ptr.h={x:360,y:tm?100:650};
   if(s.run&&s.P[df*2].hum&&s.ball&&s.t>.5&&g%4===0){const b=s.ball;if(s.run.st==='wait')B.down(s,Math.max(30,Math.min(690,b.x)),Math.max(30,Math.min(690,b.y)));else B.down(s,360,df?250:470)}}else R.ptr={};
  G.mgTick(.033)}R.ptr={};return{st,ok:s.ph==='over',secs:g/30|0,won:!!G.S.mg.bb,seen,msg:s.msg,sum:s.sum}}
const S=G.S,T4=['Jacob','Kait','Brandon','Jaimee'];
function count(floor,R,N){S.bbF=floor;Object.assign(S.bbR,{bo:1,drink:0,ice:0,sd:0,heck:1,dog:1,cat:1,mate:1,wind:1},R);let ev=0,bad=0;
 for(let i=0;i<N;i++){const r=play(1,T4,8,s=>{const tk=G.BB.tick;s._c=0});}
 // instrument via a wrapped tick
 return ev}
const orig=G.BB.ev;let evs=0;G.BB.ev=function(s,dt,p,b){const a=!!(s.dog||s.ob||s.wind);orig.call(this,s,dt,p,b);if(!a&&(s.dog||s.ob||s.wind))evs++};
for(const [f,k] of [['yard','dog'],['living','cat'],['kitchen','mate'],['garage','wind']]){for(const on of [1,0]){evs=0;S.bbF=f;Object.assign(S.bbR,{bo:1,heck:1,dog:1,cat:1,mate:1,wind:1});S.bbR[k]=on;let bad=0;for(let i=0;i<4;i++)if(!play(1,T4,8).ok)bad++;console.log(f,k,on?'on ':'off','events',evs,'stuck',bad)}}
evs=0;S.bbF='yard';Object.assign(S.bbR,{heck:0,dog:1});for(let i=0;i<3;i++)play(1,T4,8);console.log('master off, dog on: events',evs);
// mid-match switch-off clears an active distraction
Object.assign(S.bbR,{heck:1,dog:1,cat:1,mate:1,wind:1});S.bbF='kitchen';G.mgGo(G.GAMES.bb,1,{t:T4});let s=R.st;s.ph='ready';s.evT=0;G.mgTick(.033);console.log('roommate out:',!!s.ob);S.bbR.mate=0;G.mgTick(.033);console.log('after toggle off:',!!s.ob);
// menus
G.mgGo(G.GAMES.bb,1,{t:T4});els.mgM.onclick();console.log('pause:',els.menuBody.children.map(b=>b.children[0]&&b.children[0].textContent).join(' | '));els.menuBody.children[3].onclick();console.log('dist:',els.menuBody.children.map(b=>b.children[0]&&b.children[0].textContent+' ['+(b.children[1]&&b.children[1].textContent)+']').join(' | '));
els.menuBody.children[1].onclick();console.log('master off:',bbline());els.menuBody.children[3].onclick();console.log('cat toggled:',bbline(),'heck',S.bbR.heck);
function bbline(){return els.menuBody.children.map(b=>b.children[0]&&b.children[0].textContent).join(' | ')}
