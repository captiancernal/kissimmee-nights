require(__dirname+'/harness.js');
G.startGame(false);step(20);const R=G.RG,GA=G.GAMES,rn=(a,b)=>a+Math.random()*(b-a);
function play(id,n,ctl,N){const out=[];let wins=0,mx=0;for(let k=0;k<N;k++){G.S.mg={};G.mgGo(GA[id],n);const E=R.d;let s=R.st,g=0;while(s.ph!=='over'&&g++<40000){s=R.st;const pl=s.pl[s.turn];if(!pl.cpu&&s.ph==='ready'){E.down(s,360,600)}else if(s.ph==='play')ctl(s,E,pl,g);G.mgTick(.033);mx=Math.max(mx,s.fx.length);for(const f of s.fx)if(!isFinite(f.x+f.y+f.l))throw new Error('NaN fx '+id)}if(s.ph!=='over'){console.log(id,'STUCK',s.ph,s.rd);break}out.push(s.pl.map(p=>p.sc).join('-'));if(G.S.mg[id])wins++;R.ptr={}}return id+' n='+n+' wins '+wins+'/'+N+' maxfx '+mx+' scores '+out.slice(0,6).join(' | ')}
const drag=(s,E,dx,dy)=>{E.down(s,360,400);E.move(s,360-dx,400-dy);E.up(s,360-dx,400-dy)};
console.log(play('shuf',1,(s,E,pl)=>{if(!pl.cpu&&!s.cur.live){const v=Math.sqrt(480*(640-rn(85,200)))*rn(.94,1.07);drag(s,E,rn(-8,8),-v/3)}},6));
console.log(play('hoop',1,(s,E,pl)=>{if(!pl.cpu&&!s.b.live){const T=1.05;drag(s,E,(545-s.b.x)/T/5*rn(.97,1.03),(-310/T-450*T)/5*rn(.97,1.03))}},8));
console.log(play('hoop',2,(s,E,pl)=>{if(!s.b.live)drag(s,E,80,-150)},1));
console.log(play('die',1,(s,E,pl,g)=>{if(!pl.cpu&&s.st==='aim'){if(!s.hold)E.down(s,300,300);else if(s.c>=.62+rn(-.12,.12))E.up(s,300,300)}if(s.st==='catch'&&pl.cpu&&s.ct>.35&&Math.random()<.5)E.down(s,s.fl.x,s.fl.y)},6));
console.log(play('pfb',1,(s,E,pl)=>{if(!pl.cpu&&!s.ball&&s.t>.4){const T=Math.hypot(s.rx-360,s.ry-610)/520;let px=s.rx+s.rv*T;if(px<110)px=220-px;if(px>610)px=1220-px;E.down(s,px+rn(-25,25),s.ry)}},6));
// golf: greedy bot with random jitter, records which holes get finished
const seenH={};console.log(play('golf',1,(s,E)=>{const b=s.b;seenH[s.rd]=1;if(!Math.hypot(b.vx,b.vy)&&s.t>.2){const c=s.h.c;let tx=c[0]+rn(-160,160)*(s.stk>2?1:0),ty=c[1]+rn(-160,160)*(s.stk>2?1:0);if(s.rd===3&&b.x<345&&b.y>230){tx=250;ty=120}if(s.rd===3&&b.x<345&&b.y<=230){tx=520;ty=150}const d=Math.hypot(tx-b.x,ty-b.y)||1,v=Math.min(900,Math.sqrt(520*d)*1.08);drag(s,E,(tx-b.x)/d*v/4+rn(-3,3),(ty-b.y)/d*v/4)}},5),'holes seen',Object.keys(seenH).join(','));
console.log(play('swing',1,(s,E)=>{if(s.st==='pump')R.ptr=s.om>0?{a:{x:1,y:1}}:{};else if(s.st==='jump'){R.ptr={};if(s.om>0&&s.th>.55)E.down(s,1,1)}},4));
console.log(play('bike',1,(s,E,pl,g)=>{if(g%5===0)E.down(s,s.nx?500:100,600)},3));
console.log(play('lift',1,(s,E)=>{R.ptr=s.a>.05?{a:{x:500,y:1}}:s.a<-.05?{a:{x:100,y:1}}:{}},4));
// chess: play 40 plies of legal moves through the tap UI
G.mgGo(GA.chess,2);let cs=R.st,pl=0;for(let k=0;k<40&&cs.ph==='play';k++){const ms=G.chLegal(cs.b,cs.w);if(!ms.length)break;const m=ms[Math.random()*ms.length|0];G.CHS.move(cs,m);pl++;for(let i=0;i<10;i++)G.mgTick(.033)}console.log('chess plies',pl,'ph',cs.ph);
G.mgGo(GA.chess,1);G.mgTap(4.5/8,6.5/8);G.mgTap(4.5/8,4.5/8);for(let i=0;i<60;i++)G.mgTick(.05);console.log('chess 1P reply ok, white to move:',R.st.w);
G.mgGo(GA.vault,1);const vs=R.st;for(let k=0;k<30;k++){R.d.dir&&0;G.mgTap(Math.random(),Math.random());for(let i=0;i<8;i++)G.mgTick(.033);if(!isFinite(vs.ax+vs.ay))throw new Error('vault NaN')}console.log('vault ok',vs.ph,vs.px,vs.ax.toFixed(2));G.mgClose();
