require(__dirname+'/harness.js');G.startGame(false);step(5);const S=G.S,R=G.RG;let errs=0;const ce=console.error;console.error=(...a)=>{errs++;ce('ERR',...a)};
console.log('defaults: voices',S.bbV,'sfx',S.bbX,'music',S.bbM);
console.log('interactables total',G.IT.length);
// play each shift with a bot that's right 85% of the time
for(const k in G.SHIFTS){const m0=G.P.money;G.shiftGo(k);const s=R.st;let g=0;while(s.ph!=='over'&&g++<4000){if(s.ph==='play'&&s.cur&&s.cur.t>1.0&&g%3===0){const i=Math.random()<.85?s.cur.w:(s.cur.w+1)%4;G.SHF.down(s,20+i*170.5+80,600)}G.mgTick(.033)}console.log(k.padEnd(9),'earned $'+(G.P.money-m0),'served',s.served,'missed',s.miss);
 G.mgClose();G.shiftGo(k);console.log('   same day again ->',R.st?R.st.ph:'blocked')}
// sound toggles: tone gate
let calls=0;G.mgGo(G.GAMES.bb,1,{t:['Josh','Matt','Eric','Jill']});S.bbX=0;console.log('sfx off gate',G.RG.on);
// parade + fireworks over time
G.mgClose();G.P.x=-1200;G.P.y=-2700;S.tod=898;for(let i=0;i<300;i++)step(1);console.log('parade on',G.paradeOn(),'tod',S.tod.toFixed(0));
S.tod=1258;G.P.x=-1200;G.P.y=-3000;for(let i=0;i<1500;i++)step(1);console.log('after fireworks tod',S.tod.toFixed(0));
console.log('errors',errs);
