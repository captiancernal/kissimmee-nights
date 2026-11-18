require(__dirname+'/harness.js');
G.startGame(false);step(20);const R=G.RG,GA=G.GAMES,B=G.BB,rn=(a,b)=>a+Math.random()*(b-a);
function bb(n,opt,acc){G.S.mg={};G.mgGo(GA.bb,n,opt);const s=R.st;let g=0;while(s.ph!=='over'&&g++<90000){const p=B.cur(s);
  if(s.ph==='intro'&&s.t>.5)B.down(s,360,360);
  if((s.ph==='ready'||s.ph==='aim')&&p.hum&&s.t>.3&&!s.ball){const tg=s.P[(1-p.tm)*2+(Math.random()*2|0)],o=B.org(p.tm),sw=B.sway(s,p),dx=(tg.x-o[0])/2.4+rn(-acc,acc)+sw[0]*rn(-.4,.4),dy=(tg.y-o[1])/2.4+rn(-acc,acc)+sw[1]*rn(-.4,.4),y0=p.tm?200:500;B.down(s,360,y0);B.move(s,360-dx,y0-dy);B.up(s,360-dx,y0-dy)}
  if(s.ph==='drink'){const tm=s.dtm,df=1-tm;R.ptr={};if(s.drk&&s.drk.hum&&s.gl[tm]<.8)R.ptr.h={x:360,y:tm?100:650};
   if(s.run&&s.P[df*2].hum&&s.ball&&s.t>.6&&g%6===0){const b=s.ball;if(s.run.st==='wait')B.down(s,b.x,b.y);else if(s.run.st==='back')B.down(s,360,df?250:470)}}else R.ptr={};
  G.mgTick(.033)}R.ptr={};return{ph:s.ph,secs:(g/30)|0,msg:s.msg,sum:s.sum,won:!!G.S.mg.bb}}
function series(label,n,mk,acc,N){let w=0,t=0,last;for(let i=0;i<N;i++){last=bb(n,mk(),acc);if(last.ph!=='over'){console.log('STUCK',label,last);return}w+=last.won;t+=last.secs}console.log(label,'wins',w+'/'+N,'avg',(t/N|0)+'s |',last.msg,'|',last.sum)}
series('default random',1,()=>undefined,6,6);
series('Josh+Michael vs Eric+Carly',1,()=>({t:['Josh','Michael','Eric','Carly']}),6,8);
series('Eric+Carly vs Josh+Michael',1,()=>({t:['Eric','Carly','Josh','Michael']}),6,8);
series('Jacob+Kait vs Brandon+Jaimee',1,()=>({t:['Jacob','Kait','Brandon','Jaimee']}),6,8);
series('same, sloppy aim',1,()=>({t:['Jacob','Kait','Brandon','Jaimee']}),14,8);
series('2 teams',2,()=>({t:['Glenn','Joe','Tyler','Jason']}),8,4);
// menus + gauntlet
G.S.mode='play';const items=G.bbMenu();console.log('menu items',items.map(i=>i.label+' ['+i.sub+']').join(' | '));
for(let r=0;r<5;r++){const t=['Josh','Matt'],rest=G.BBN.filter(x=>!t.includes(x)).sort((a,b)=>G.BBR[a][1]-G.BBR[b][1]),g=Math.min(G.S.bbG,4),opp=[rest[g*3],rest[g*3+1]];let res,tries=0;do{res=bb(1,{t:t.concat(opp),g},5);tries++;G.S.mg={}}while(G.S.bbG===g&&tries<8);console.log('gauntlet round',g+1,'vs',opp.join(' & '),'tries',tries,'money',G.P.money,'|',res.msg,'|',res.sum.slice(0,40))}
console.log('bbG',G.S.bbG,'sub',G.bbMenu()[3].sub);
// draft menu flow
items.find(x=>x.label==='Custom match · 1 player').fn();console.log('draft title:',els.menuTitle.textContent);for(let i=0;i<4;i++)G.BBCARD.pick();console.log('after 4 picks: game on',R.on,R.st.P.map(p=>p.n).join(','),R.st.ph);
for(let i=0;i<200;i++)G.mgTick(.033);console.log('intro auto-advances →',R.st.ph);G.mgClose();
let bad=0;for(const it of G.IT){G.S.mode='play';G.S.cine=null;G.S.mission=null;G.P.veh=null;G.P.money=500;try{it.fn();if(R.on){for(let i=0;i<20;i++)G.mgTick(.05);G.mgClose()}}catch(e){bad++;console.log('IT fail',it.label,e.message)}}console.log('IT errors',bad);
G.S.mode='play';step(60);console.log('save ok',G.safehouse?true:false,G.S.mode);
