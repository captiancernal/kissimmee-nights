require(__dirname+'/harness.js');
G.startGame(false);step(5);const R=G.RG,B=G.BB,rn=(a,b)=>a+Math.random()*(b-a);
function play(n,t,acc,pre){G.S.mg={};G.mgGo(G.GAMES.bb,n,{t});const s=R.st;let g=0,sp=0,lastBan='';const seen={},st={q:0,sp:0,sv:0,k:0};if(pre)pre(s);
 while(s.ph!=='over'&&g++<120000){const p=B.cur(s);if(s.ph==='intro'&&s.t>.5)B.down(s,360,360);
  if(s.ph==='qte'&&!s.q.cpu&&g%5===0){st.q++;if(Math.random()<.85)B.qin(s,s.q.seq[s.q.i]);else B.qin(s,(s.q.seq[s.q.i]+1)%4)}if(s.ban==='SPILLED!'&&lastBan!=='SPILLED!')st.sp++;if(s.ban==='SAVED!'&&lastBan!=='SAVED!')st.sv++;if(s.ban==='KILLED IT!'&&lastBan!=='KILLED IT!')st.k++;if(s.ban!==lastBan){lastBan=s.ban;for(const k in G.SPEC)if(s.ban===G.SPEC[k].n.toUpperCase()+'!')seen[k]=(seen[k]||0)+1}
  if((s.ph==='ready'||s.ph==='aim')&&p.hum&&s.t>.3&&!s.ball){const tg=s.P[(1-p.tm)*2+(Math.random()*2|0)],o=B.org(p.tm),dx=(tg.x-o[0])/2.4+rn(-acc,acc),dy=(tg.y-o[1])/2.4+rn(-acc,acc),y0=p.tm?200:500;B.down(s,360,y0);B.move(s,360-dx,y0-dy);B.up(s,360-dx,y0-dy)}
  if(s.ph==='drink'){const tm=s.dtm,df=1-tm;R.ptr={};if(s.drk&&s.drk.hum&&s.gl[tm]<.8)R.ptr.h={x:360,y:tm?100:650};
   if(s.run&&s.P[df*2].hum&&s.ball&&s.t>.5&&g%4===0){const b=s.ball;if(s.run.st==='wait')B.down(s,Math.max(30,Math.min(690,b.x)),Math.max(30,Math.min(690,b.y)));else B.down(s,360,df?250:470)}}else R.ptr={};
  G.mgTick(.033)}R.ptr={};return{st,ok:s.ph==='over',secs:g/30|0,won:!!G.S.mg.bb,seen,msg:s.msg,sum:s.sum}}

// pause / resume / end buttons
G.S.bbF='yard';G.mgGo(G.GAMES.bb,1,{t:['Josh','Matt','Eric','Carly']});const s=R.st;for(let i=0;i<30;i++)G.mgTick(.033);const T0=s.T;els.mgM.onclick();for(let i=0;i<30;i++)G.mgTick(.033);console.log('paused: time frozen',s.T===T0,'menu:',els.menuBody.children.map(b=>b.children[0].textContent).join(' | '));
els.menuBody.children[0].onclick();for(let i=0;i<10;i++)G.mgTick(.033);console.log('resumed',s.T>T0,'endButtons',els.mgB.style.display);
s.ph='over';s.sum='';s.msg='x';for(let i=0;i<20;i++)G.mgTick(.033);console.log('0.66 s after over:',els.mgB.style.display);for(let i=0;i<25;i++)G.mgTick(.033);console.log('1.5 s after over:',els.mgB.style.display);
els.mgAgain.onclick();G.mgTick(.033);console.log('after play again:',els.mgB.style.display,R.st.ph);
els.mgM.onclick();els.menuBody.children[2].onclick();console.log('floor menu:',els.menuBody.children.map(b=>b.children[0]&&b.children[0].textContent).join(' | '));els.menuBody.children[2].onclick();console.log('picked',G.S.bbF,'back in pause menu:',els.menuTitle.textContent);els.menuBody.children[6].onclick();console.log('left: on',R.on,'mode',G.S.mode);
