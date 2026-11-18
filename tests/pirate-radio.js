require(__dirname+'/harness.js');G.startGame(false);step(5);const S=G.S;let errs=0;const ce=console.error;console.error=(...a)=>{errs++;ce('ERR',...a)};
let spoken=[];global.window=global.window||{};
const v=G.VEH.find(v=>!v.dead&&v.type==='sedan')||G.VEH[0];G.P.veh=v;S.mode='play';S.radio=G.RADIO.length;console.log('stations',G.RADIO.map(r=>r.n).join(' | '));
const seen=new Set();for(let i=0;i<30*120;i++){step(1);seen.add(els.radio.textContent.slice(0,70))}console.log('ticker lines seen in 2 min:',seen.size);[...seen].slice(0,4).forEach(x=>console.log('  ',x));
G.radioNext();console.log('after next ->',S.radio,'(0 = off)');step(2);console.log('  ',els.radio.textContent);
console.log('errors',errs);
