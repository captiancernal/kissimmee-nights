// Dr. Matt / BBA Matt: one guy, two outfits, never both at once.
require(__dirname+'/harness.js');G.startGame(false);step(5);const S=G.S,P=G.P,M=G.MATT;let errs=0;const ce=console.error;console.error=(...a)=>{errs++;ce('ERR',...a)};
const ok=(c,m)=>{console.log((c?'pass ':'FAIL ')+m);if(!c)errs++};
const run=sec=>{for(let i=0;i<sec*30;i++)step(1)};
ok(M.mode===G.mattSched(),'starts in the right outfit for '+Math.round(S.tod)+' min: '+M.mode);
// sample a full day while standing far away: exactly one Matt at a time, and he is where his schedule says
let both=0,modes={doc:0,bba:0};P.x=5600;P.y=3000;for(let k=0;k<48;k++){S.tod=(k*30)%1440;run(1);modes[M.mode]++;if(M.mode!==G.mattSched())both++}
ok(both===0,'far away, he snaps to the schedule every time (doc '+modes.doc+' · bba '+modes.bba+' half-hours)');
// watch a porta-john change up close: player parks next to the porta-john at shift change
S.tod=1040;run(1);ok(M.mode==='doc'&&M.st==='idle','5:20 PM: Dr. Matt at the hospital');
P.x=M.porta[0]+60;P.y=M.porta[1];S.tod=1050;S.mode='play';const seen0=S.mattSeen||0;let sawRun=0,sawChange=0,maxT=0;
for(let i=0;i<30*40&&!(M.mode==='bba'&&M.st==='idle');i++){step(1);if(M.st==='run')sawRun=1;if(M.st==='change')sawChange=1;S.tod=1052}
ok(sawRun&&sawChange,'he runs to the porta-john and changes');ok(M.mode==='bba'&&M.st==='idle','now BBA Matt at the arena');
ok((S.mattSeen||0)===seen0+1,'the change counts as witnessed');console.log('   toast:',els.toast&&els.toast.textContent||'');
ok(Object.keys({steth:1,cap:1,badge:1,mask:1}).includes(M.clue),'he kept a doctor clue: '+M.clue);
// pager gag: stand next to Dr. Matt long enough and he gets paged, changes right there
S.tod=600;P.x=0;P.y=0;run(1);ok(M.mode==='doc','10 AM: Dr. Matt');P.x=M.x+40;P.y=M.y;P.veh=null;S.mission=null;S.mode='play';M.cool=0;
let paged=0;for(let i=0;i<30*120&&!paged;i++){step(1);S.tod=600;S.mode='play';if(M.st==='change'&&M.via==='here')paged=1}
ok(paged,'the pager goes off and he changes on the spot');run(4);ok(M.mode==='bba','…into Crash Out');
// mission giver only exists as BBA Matt
S.story=5;S.done.bba_matt=0;delete S.done.bba_matt;S.tod=600;M.ov=null;P.x=0;P.y=0;run(1);
ok(!G.sideList().includes(G.MATTM),'daytime: no BBA Matt mission (he is Dr. Matt)');S.tod=1300;run(1);ok(G.sideList().includes(G.MATTM),'night: BBA Matt mission is up');
ok(G.MATTM.g.x===M.x&&G.MATTM.g.y===M.y,'mission giver follows the real Matt');
// talking to Dr. Matt: free daily checkup
S.tod=600;run(1);P.x=M.x+20;P.y=M.y;P.hp=20;S.mode='play';G.mattTalk();(async()=>{await clickOpt(0);run(1);
 ok(P.hp>=90&&S.mattChk===S.dayN,'Dr. Matt patches you up for free once a day');
 // hospital respawn while he's on the court: he bursts in
 M.mode='bba';M.st='idle';const t=G.mattTell('Base line.');ok(/bursts in/.test(t)&&M.mode==='doc','respawn during a game: '+t.slice(0,70)+'…');
 M.ov=null;S.tod=600;run(1);S.mattSeen=2;P.x=M.x+30;P.y=M.y;G.mattStartChange('here');run(4);ok(S.own['acc:stetho'],'third sighting unlocks the suspicious stethoscope');
 console.log('mattSeen',S.mattSeen,'errors',errs)})();
