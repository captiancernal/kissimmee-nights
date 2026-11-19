require(__dirname+'/harness.js');
G.startGame(false);step(5);const R=G.RG,B=G.BB,rn=(a,b)=>a+Math.random()*(b-a);
function play(n,t,acc,pre){G.S.mg={};G.mgGo(G.GAMES.bb,n,{t});const s=R.st;let g=0,sp=0,lastBan='';const seen={},st={q:0,sp:0,sv:0,k:0};if(pre)pre(s);
 while(s.ph!=='over'&&g++<120000){const p=B.cur(s);if(s.ph==='intro'&&s.t>.5)B.down(s,360,360);
  if(s.ph==='qte'&&!s.q.cpu&&g%5===0){st.q++;if(Math.random()<.85)B.qin(s,s.q.seq[s.q.i]);else B.qin(s,(s.q.seq[s.q.i]+1)%4)}if(s.ban==='SPILLED!'&&lastBan!=='SPILLED!')st.sp++;if(s.ban==='SAVED!'&&lastBan!=='SAVED!')st.sv++;if(s.ban==='KILLED IT!'&&lastBan!=='KILLED IT!')st.k++;if(s.ban!==lastBan){lastBan=s.ban;for(const k in G.SPEC)if(s.ban===G.SPEC[k].n.toUpperCase()+'!')seen[k]=(seen[k]||0)+1}
  if((s.ph==='ready'||s.ph==='aim')&&p.hum&&s.t>.3&&!s.ball){const tg=s.P[(1-p.tm)*2+(Math.random()*2|0)],o=B.org(p.tm),dx=(tg.x-o[0])/2.4+rn(-acc,acc),dy=(tg.y-o[1])/2.4+rn(-acc,acc),y0=p.tm?200:500;B.down(s,360,y0);B.move(s,360-dx,y0-dy);if(s.dr)s.dr.t=1.5*B.per(s,B.cur(s))+(Math.random()-.5)*.14;B.up(s,360-dx,y0-dy)}
  if(s.ph==='drink'){const tm=s.dtm,df=1-tm;R.ptr={};if(s.drk&&s.drk.hum&&s.gl[tm]<.8)R.ptr.h={x:360,y:tm?100:650};
   if(s.run&&s.P[df*2].hum&&s.ball&&s.t>.5&&g%4===0){const b=s.ball;if(s.run.st==='wait')B.down(s,Math.max(30,Math.min(690,b.x)),Math.max(30,Math.min(690,b.y)));else B.down(s,360,df?250:470)}}else R.ptr={};
  G.mgTick(.033)}R.ptr={};return{st,ok:s.ph==='over',secs:g/30|0,won:!!G.S.mg.bb,seen,msg:s.msg,sum:s.sum}}
// every player throws with special pre-armed + as defender/drinker
const N=G.BBN;let fails=0;
for(let i=0;i<N.length;i++){const t=[N[i],N[(i+5)%16],N[(i+9)%16],N[(i+13)%16]];for(const n of [1,2]){const r=play(n,t,7,s=>{for(const q of s.P){const Z=G.SPEC[q.n];if(Z.k==='mate')s.P[s.P.indexOf(q)^1].steady=2;else if(Z.k==='team')s.calm[q.tm]=3;else q.buff={id:q.n,n:Z.u}}});if(!r.ok){fails++;console.log('STUCK',t,n)}}}
console.log('pre-armed specials, 32 matches, failures:',fails);
// natural triggers
const tot={},agg={};let secs=0,M=24;for(let i=0;i<M;i++){const t=N.slice().sort(()=>Math.random()-.5).slice(0,4);const r=play(i%2+1,t,6);if(!r.ok)console.log('STUCK natural',t);secs+=r.secs;for(const k in r.st)agg[k]=(agg[k]||0)+r.st[k];for(const k in r.seen)tot[k]=(tot[k]||0)+r.seen[k]}
console.log('spills/saves/kills over matches',JSON.stringify(agg));console.log('natural: avg match',secs/M|0,'s; specials fired',JSON.stringify(tot));
function ser(label,t,acc,K){let w=0,sx=0;for(let i=0;i<K;i++){const r=play(1,t,acc);w+=r.won;sx+=r.secs}console.log(label,'human wins',w+'/'+K,'avg',sx/K|0,'s')}
ser('Josh+Michael vs Eric+Carly',['Josh','Michael','Eric','Carly'],6,10);
ser('Eric+Carly vs Josh+Michael',['Eric','Carly','Josh','Michael'],6,10);
ser('Jacob+Kait vs Brandon+Jaimee',['Jacob','Kait','Brandon','Jaimee'],6,10);
ser('Brandon+Jaimee vs Jacob+Kait',['Brandon','Jaimee','Jacob','Kait'],6,10);
ser('Dante+Steven vs Glenn+Joe',['Dante','Steven','Glenn','Joe'],6,10);
