require(__dirname+'/harness.js');G.startGame(false);step(3);const S=G.S;let errs=0;const ce=console.error;console.error=(...a)=>{errs++;ce('ERR',...a)};
const t0=Date.now();
G.frNew();const F=()=>S.fr;G.frU('c',1);G.frU('d',2);F().ph='draft';G.frLottery();
function draft(){while(F().pk<16)G.frCpuPick(G.frSnake(F().pk));F().ph='season';F().sched=G.frSched();F().wk=0}
function season(){let k=0;while(k++<400){G.frCatchUp();if(['awards','done'].includes(F().ph))break;const nx=G.frNext();if(!nx){console.log('stuck at',F().ph,F().wk);break}G.frGoSim(nx)}}
draft();console.log('draft:',F().teams.map(t=>t.p.join('+')).join(' | '));
console.log('sched weeks',F().sched.length,'games/wk',F().sched[0].length,'each team plays 7:',[...Array(8).keys()].every(i=>F().sched.flat().filter(g=>g.h===i||g.a===i).length===7));
season();const f=F();
console.log('phase',f.ph,'standings',G.frStandings&&f.teams.map(t=>t.w+'-'+t.l).join(' '),'total W',f.teams.reduce((a,t)=>a+t.w,0));
console.log('all-star',JSON.stringify({cle:f.as.cle,col:f.as.col,mvp:f.as.mvp}));
console.log('playoffs semis',f.po.semi.map(m=>m.a+'v'+m.b+'->'+m.w).join(', '),'finals',f.po.fin.a+'v'+f.po.fin.b,f.po.fin.w.join('-'),'champ',f.champ);
console.log('results',f.res.length,'records',JSON.stringify(f.rec));
const z=f.st[G.BBN[0]];console.log('season stat sample',G.BBN[0],JSON.stringify(z).slice(0,400));
for(const a of f.aw)console.log(' ',a.a.padEnd(26),'|',String(a.w).padEnd(40),'|',a.s);
// pages
for(const fn of ['frHub','frStandings','frRecords','frSchedule','frBoxPage','frTeamPage','frHistory','frIntro','frUniform','frLottery','frBoard'])G[fn]();for(let i=0;i<G.FRL.length;i++){G.frLeaders(i,false);G.frLeaders(i,true)}for(let i=0;i<f.aw.length;i++)G.frCeremony(i,f.aw,true);
G.frCeremony(f.aw.length-1,f.aw,true);
// season 2
f.ph='done';G.frNextSeason();console.log('s2 order',F().order.join(','),'champ picks last:',F().order[7]===f.champ||'champ was '+f.champ,'cover',F().cover);
draft();season();console.log('s2 phase',F().ph,'champ',F().champ,'MIP',F().aw.find(a=>a.a==='MIP').w,F().aw.find(a=>a.a==='MIP').s,'| ROY',F().aw.find(a=>a.a==='ROY').w,'| Varied',F().aw.find(a=>a.a==='Varied Teammate POY').s);
console.log('hist',F().hist.length,'save bytes',JSON.stringify(S.fr).length,'errors',errs,'secs',(Date.now()-t0)/1000);
