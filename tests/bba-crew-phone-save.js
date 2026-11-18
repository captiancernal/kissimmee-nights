// BBA crew side stories, the phone, and save backup/export/import.
require(__dirname+'/harness.js');global.location={reload(){reloads++}};let reloads=0;
G.startGame(false);step(5);const S=G.S,P=G.P;let errs=0;const ce=console.error;console.error=(...a)=>{errs++;ce('ERR',...a)};
const ok=(c,m)=>{console.log((c?'pass ':'FAIL ')+m);if(!c)errs++};
ok(G.CREW.length===16,'16 BBA crew missions');
ok(G.CREW.every(m=>G.BBR[m.g.name]),'every crew giver is a real BBA roster player');
ok(new Set(G.CREW.map(m=>m.g.name)).size===16,'no duplicate players');
ok(G.CREW.every(m=>!G.solid(m.g.x,m.g.y,10)&&!G.inWater(m.g.x,m.g.y,2)),'givers stand on open ground');
S.story=0;ok(G.sideList().filter(m=>m.crew).length===3,'story 0 shows 3 crew ('+G.sideList().filter(m=>m.crew).map(m=>m.g.name)+')');
S.story=5;ok(G.sideList().filter(m=>m.crew).length===16,'story 5 shows all 16');
(async()=>{
  for(const m of G.CREW){P.veh=null;P.x=m.g.x+20;P.y=m.g.y;S.mode='play';P.hp=100;P.dead=false;S.wanted=0;
    const before=P.money;G.startMission(m);await clickOpt(m.id.length);let guard=0;
    while(S.mission&&S.mission.m===m&&!S.mission.ret&&guard++<60){const ms=S.mission,st=m.steps[ms.i];
      if(st.veh&&!P.veh){const v=G.VEH.find(v=>!v.dead&&v.type==='sedan');P.veh=v}
      if(st.type==='talk'){await clickOpt(0);continue}
      const tg=G.missionTargets();if(st.type==='kill'){tg.forEach(p=>{p.kod=1});step(2);continue}
      if(tg[0]){P.x=tg[0].x;P.y=tg[0].y;if(P.veh){P.veh.x=P.x;P.veh.y=P.y}}step(2)}
    const ret=S.mission&&S.mission.ret;P.veh=null;P.x=m.g.x+10;P.y=m.g.y;step(2);await clickOpt(1);step(3);
    ok(S.done[m.id]&&S.crewMet[m.g.name]&&P.money>before,m.g.name.padEnd(8)+' '+m.name+' · steps '+m.steps.map(s=>s.type).join('+')+' · +$'+(P.money-before)+(ret?'':' (no return)'))}
  ok(S.own['top:bbaall'],'BBA Association jersey unlocked after all 16');
  // phone
  S.mode='play';S.mission=null;G.phoneOpen();const items=els.menuBody.children.map(c=>c.children[0]&&c.children[0].textContent);console.log('phone:',items.join(' | '));
  ok(items.length>=7,'phone has its apps');
  const unread=S.texts.filter(t=>!t.r).length;G.phoneMsgs();ok(S.texts.every(t=>t.r),'opening Messages marks '+unread+' texts read');
  G.phoneContacts();const cn=els.menuBody.children.map(c=>c.children[0]&&c.children[0].textContent);ok(cn.filter(x=>G.BBR[x]).length===16,'all 16 crew are contacts ('+cn.length+' rows)');
  S.texts=[];S.txs={};S.story=1;S.mode='play';for(let i=0;i<30*600;i++)G.phoneTick(1/30);console.log('texts over 10 min:',S.texts.length);S.texts.slice(0,5).forEach(t=>console.log('   ',t.f+':',t.t.slice(0,60)));ok(S.texts.length>=2,'phone gets texts over time');
  // save
  G.save();const raw=localStorage.getItem(G.SK),d=JSON.parse(raw);ok(d.v===G.SAVEV&&d.crewMet&&Object.keys(d.crewMet).length===16,'save carries version '+d.v+' and crew');
  const code=G.saveCode();ok(/^KN\d+:/.test(code),'save code '+code.slice(0,12)+'… '+Math.round(code.length/1024)+' KB');
  ok(G.parseSave(code)===raw,'code round-trips to the same save');ok(JSON.parse(G.parseSave(raw)).m===P.money,'raw JSON file also imports');
  let bad=0;try{G.parseSave('KN3:bm9wZQ==')}catch(e){bad=1}ok(bad,'garbage code is rejected');
  const m0=P.money;P.money=1;G.restoreFrom(code);step(2);ok(JSON.parse(localStorage.getItem(G.SK)).m===m0&&reloads===1,'restore writes the save and reloads');
  const old=JSON.parse(raw);delete old.v;delete old.texts;delete old.crewMet;ok(G.migrateSave(old).v===G.SAVEV&&old.crewMet,'v1 save migrates');
  localStorage.setItem(G.SK+'_bak',raw);localStorage.setItem(G.SK,'{broken');P.money=0;ok(G.load()&&P.money===m0,'corrupt save falls back to backup');
  console.log('errors',errs);
})();
