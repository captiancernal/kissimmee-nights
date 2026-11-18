require(__dirname+'/harness.js');
G.startGame(false);step(5);const R=G.RG,B=G.BB,rn=(a,b)=>a+Math.random()*(b-a);
function play(n,t,acc,pre){G.S.mg={};G.mgGo(G.GAMES.bb,n,{t});const s=R.st;let g=0,sp=0,lastBan='';const seen={},st={q:0,sp:0,sv:0,k:0};if(pre)pre(s);
 while(s.ph!=='over'&&g++<120000){const p=B.cur(s);if(s.ph==='intro'&&s.t>.5)B.down(s,360,360);
  if(s.ph==='qte'&&!s.q.cpu&&g%5===0){st.q++;if(Math.random()<.85)B.qin(s,s.q.seq[s.q.i]);else B.qin(s,(s.q.seq[s.q.i]+1)%4)}if(s.ban==='SPILLED!'&&lastBan!=='SPILLED!')st.sp++;if(s.ban==='SAVED!'&&lastBan!=='SAVED!')st.sv++;if(s.ban==='KILLED IT!'&&lastBan!=='KILLED IT!')st.k++;if(s.ban!==lastBan){lastBan=s.ban;for(const k in G.SPEC)if(s.ban===G.SPEC[k].n.toUpperCase()+'!')seen[k]=(seen[k]||0)+1}
  if((s.ph==='ready'||s.ph==='aim')&&p.hum&&s.t>.3&&!s.ball){const tg=s.P[(1-p.tm)*2+(Math.random()*2|0)],o=B.org(p.tm),dx=(tg.x-o[0])/2.4+rn(-acc,acc),dy=(tg.y-o[1])/2.4+rn(-acc,acc),y0=p.tm?200:500;B.down(s,360,y0);B.move(s,360-dx,y0-dy);B.up(s,360-dx,y0-dy)}
  if(s.ph==='drink'){const tm=s.dtm,df=1-tm;R.ptr={};if(s.drk&&s.drk.hum&&s.gl[tm]<.8)R.ptr.h={x:360,y:tm?100:650};
   if(s.run&&s.P[df*2].hum&&s.ball&&s.t>.5&&g%4===0){const b=s.ball;if(s.run.st==='wait')B.down(s,Math.max(30,Math.min(690,b.x)),Math.max(30,Math.min(690,b.y)));else B.down(s,360,df?250:470)}}else R.ptr={};
  G.mgTick(.033)}R.ptr={};return{st,ok:s.ph==='over',secs:g/30|0,won:!!G.S.mg.bb,seen,msg:s.msg,sum:s.sum}}
const T4=['Jacob','Kait','Brandon','Jaimee'],S=G.S;
function cfg(name,f,R,n,N){S.bbF=f;Object.assign(S.bbR,{bo:1,drink:0,ice:0,sd:0,heck:1},R);let t=0,w=0,bad=0;for(let i=0;i<N;i++){const r=play(n||1,T4,8);if(!r.ok)bad++;t+=r.secs;w+=r.won}console.log(name,'avg',t/N|0,'s wins',w+'/'+N,'stuck',bad)}
cfg('garage+draft','garage',{},1,6);cfg('kitchen+roommate','kitchen',{},1,6);cfg('living+cat','living',{},1,6);cfg('yard+dog','yard',{},1,6);
cfg('thrower drinks','garage',{drink:1},1,5);cfg('ice','garage',{ice:1},1,5);cfg('sudden death','garage',{sd:1},1,5);cfg('all rules 2P yard','yard',{drink:1,ice:1,sd:1},2,4);
// series: play() loops until ph over on the first state; drive manually
function series(n){Object.assign(S.bbR,{bo:3,drink:0,ice:0,sd:0,heck:1});S.bbF='yard';G.mgGo(G.GAMES.bb,n,{t:T4.slice()});let g=0,games=[],last=null;
 while(g++<400000){const s=R.st,p=B.cur(s);if(s!==last){last=s;games.push(s.P.map(q=>q.n).join(',')+' tt'+s.tt+' ser'+JSON.stringify(s.ser.w))}if(s.ph==='over')break;if(s.ph==='intro'&&s.t>.5)B.down(s,360,360);
  if(s.ph==='qte'&&!s.q.cpu&&g%5===0)B.qin(s,s.q.seq[s.q.i]);
  if((s.ph==='ready'||s.ph==='aim')&&p.hum&&s.t>.3&&!s.ball){const tg=s.P[(1-p.tm)*2+(Math.random()*2|0)],o=B.org(p.tm),dx=(tg.x-o[0])/2.4+rn(-8,8),dy=(tg.y-o[1])/2.4+rn(-8,8),y0=p.tm?200:500;B.down(s,360,y0);B.move(s,360-dx,y0-dy);B.up(s,360-dx,y0-dy)}
  if(s.ph==='drink'){const tm=s.dtm,df=1-tm;R.ptr={};if(s.drk&&s.drk.hum&&s.gl[tm]<.8)R.ptr.h={x:360,y:tm?100:650};if(s.run&&s.P[df*2].hum&&s.ball&&s.t>.5&&g%4===0){const b=s.ball;if(s.run.st==='wait')B.down(s,Math.max(30,Math.min(690,b.x)),Math.max(30,Math.min(690,b.y)));else B.down(s,360,df?250:470)}}else R.ptr={};
  G.mgTick(.033)}
 console.log('series n='+n,R.st.ph,'|',R.st.msg,'| opt.ser',R.opt.ser,'\n  '+games.join('\n  '))}
series(1);series(2);
console.log('career',JSON.stringify(S.bbS.Jacob));
// card picker + draft
let got=null;G.bbPick('Who are you?',['Josh'],n=>got=n);const mb=els.menuBody;console.log('picker children',mb.children.length,'first card',G.BBCARD.list[G.BBCARD.i]);G.BBCARD.go(1);G.BBCARD.go(1);G.BBCARD.pick();console.log('picked',got);
for(const n of G.BBN)for(const t of [0,.3,.8,2])G.bbCardDraw(stubg(),n,t);function stubg(){return els.mgC.getContext('2d')}console.log('cards drew for',G.BBN.length);
