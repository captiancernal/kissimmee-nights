require(__dirname+'/harness.js');
G.startGame(false);step(5);const R=G.RG,B=G.BB,rn=(a,b)=>a+Math.random()*(b-a);
function play(n,t,acc,pre){G.S.mg={};G.mgGo(G.GAMES.bb,n,{t});const s=R.st;let g=0,sp=0,lastBan='';const seen={},st={q:0,sp:0,sv:0,k:0};if(pre)pre(s);
 while(s.ph!=='over'&&g++<120000){const p=B.cur(s);if(s.ph==='intro'&&s.t>.5)B.down(s,360,360);
  if(s.ph==='qte'&&!s.q.cpu&&g%5===0){st.q++;if(Math.random()<.85)B.qin(s,s.q.seq[s.q.i]);else B.qin(s,(s.q.seq[s.q.i]+1)%4)}if(s.ban==='SPILLED!'&&lastBan!=='SPILLED!')st.sp++;if(s.ban==='SAVED!'&&lastBan!=='SAVED!')st.sv++;if(s.ban==='KILLED IT!'&&lastBan!=='KILLED IT!')st.k++;if(s.ban!==lastBan){lastBan=s.ban;for(const k in G.SPEC)if(s.ban===G.SPEC[k].n.toUpperCase()+'!')seen[k]=(seen[k]||0)+1}
  if((s.ph==='ready'||s.ph==='aim')&&p.hum&&s.t>.3&&!s.ball){const tg=s.P[(1-p.tm)*2+(Math.random()*2|0)],o=B.org(p.tm),dx=(tg.x-o[0])/2.4+rn(-acc,acc),dy=(tg.y-o[1])/2.4+rn(-acc,acc),y0=p.tm?200:500;B.down(s,360,y0);B.move(s,360-dx,y0-dy);if(s.dr)s.dr.t=1.5*B.per(s,B.cur(s))+(Math.random()-.5)*.14;B.up(s,360-dx,y0-dy)}
  if(s.ph==='drink'){const tm=s.dtm,df=1-tm;R.ptr={};if(s.drk&&s.drk.hum&&s.gl[tm]<.8)R.ptr.h={x:360,y:tm?100:650};
   if(s.run&&s.P[df*2].hum&&s.ball&&s.t>.5&&g%4===0){const b=s.ball;if(s.run.st==='wait')B.down(s,Math.max(30,Math.min(690,b.x)),Math.max(30,Math.min(690,b.y)));else B.down(s,360,df?250:470)}}else R.ptr={};
  G.mgTick(.033)}R.ptr={};return{st,ok:s.ph==='over',secs:g/30|0,won:!!G.S.mg.bb,seen,msg:s.msg,sum:s.sum}}
const S=G.S;let errs=0;const ce=console.error;console.error=(...a)=>{errs++;ce('ERR',...a)};
G.frNew();S.fr.ph='draft';G.frLottery();while(S.fr.pk<16)G.frCpuPick(G.frSnake(S.fr.pk));S.fr.ph='season';S.fr.sched=G.frSched();
G.frHub();const nx=G.frNext();console.log('next',JSON.stringify(nx));G.frGo(nx,false);const s=R.st;console.log('human game: P0',s.P[0].n,'hum',s.P.map(q=>q.hum).join(','),'venue',s.venue,'cols',G.BBN&&s.uni.c2.join(','),'againLabel',els.mgAgain.textContent);
// drive with the th.js bot loop
let g=0;while(s.ph!=='over'&&g++<120000){const p=B.cur(s);if(s.ph==='intro'&&s.t>.5)B.down(s,360,360);if(s.ph==='qte'&&!s.q.cpu&&g%5===0)B.qin(s,s.q.seq[s.q.i]);
 if((s.ph==='ready'||s.ph==='aim')&&p.hum&&s.t>.3&&!s.ball){const tg=s.P[2+(Math.random()*2|0)],o=B.org(p.tm),dx=(tg.x-o[0])/2.4+rn(-8,8),dy=(tg.y-o[1])/2.4+rn(-8,8);B.down(s,360,500);B.move(s,360-dx,500-dy);if(s.dr)s.dr.t=1.5*B.per(s,B.cur(s))+(Math.random()-.5)*.14;B.up(s,360-dx,500-dy)}
 if(s.ph==='drink'){R.ptr={};if(s.drk&&s.drk.hum&&s.gl[s.dtm]<.8)R.ptr.h={x:360,y:650}}else R.ptr={};G.mgTick(.033)}
console.log('over',s.ph,'pend',S.fr.pend,'res',S.fr.res.length,'box',JSON.stringify(s.box[0]).slice(0,300));
for(let i=0;i<50;i++)G.mgTick(.033);console.log('end buttons',els.mgB.style.display);els.mgAgain.onclick();console.log('after Back to franchise: menu title',els.menuTitle.textContent,'res',S.fr.res.length,'wk',S.fr.wk,'pend',S.fr.pend);
const z=Object.values(S.fr.st).find(z=>z.ret);console.log('retrieval avg sample',z&&(z.retS/z.ret).toFixed(2));
// normal quick match still says Play again and isn't a series / franchise
G.mgGo(G.GAMES.bb,1,{t:['Josh','Matt','Eric','Jill']});console.log('quick match label',els.mgAgain.textContent,'fr',R.st.fr,'colors',R.st.P&&G.BB&&'ok');
// save round trip
G.save&&0;console.log('errors',errs);
