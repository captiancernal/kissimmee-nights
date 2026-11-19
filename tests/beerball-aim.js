// Beer ball pulse aiming: perfect release always hits; timing windows scale with THROWING; power drives knock-overs.
require(__dirname+'/harness.js');G.startGame(false);step(5);const R=G.RG,B=G.BB,S=G.S;Object.assign(S.bbR,{bo:1,drink:0,ice:0,sd:0,heck:0});
const gauss=()=>Math.sqrt(-2*Math.log(1-Math.random()*.9999))*Math.cos(2*Math.PI*Math.random());
let lastKo=0;
function trial(name,err,hold){G.mgGo(G.GAMES.bb,1,{t:[name,'Eric','Kait','Jill']});const s=R.st;s.ph='ready';s.t=1;const p=B.cur(s),tg=s.P[2+(Math.random()*2|0)],o=B.org(p.tm);s.T=Math.random()*100;
 B.down(s,360,500);const T=B.per(s,p),t=hold!=null?hold:Math.max(0,1.5*T+err());s.dr.t=t;const sw=B.sway(s,p),dx=(tg.x-o[0]-sw[0])/2.4,dy=(tg.y-o[1]-sw[1])/2.4;s.dr.x=360-dx;s.dr.y=500-dy;B.up(s,360-dx,500-dy);
 let g=0;while(s.ph==='fly'&&g++<200)B.tick(s,1/30);lastKo=s.ph==='qte';return s.ph==='drink'||s.ph==='qte'}
const rate=(n,e,N=500)=>{let h=0;for(let i=0;i<N;i++)h+=trial(n,e);return Math.round(h/N*100)};
const who=G.BBN.slice().sort((a,b)=>G.BBR[b][2]-G.BBR[a][2]),pickN=[who[0],who[3],who[7],who[11],who[15]];
console.log('player      THROW  pulse   perfect  sharp(±30ms) average(±60ms) sloppy(±120ms)');
const res={};for(const n of pickN){G.mgGo(G.GAMES.bb,1,{t:[n,'Eric','Kait','Jill']});const p=B.cur(R.st),T=B.per(R.st,p);
 const r=[rate(n,()=>0,200),rate(n,()=>gauss()*.03),rate(n,()=>gauss()*.06),rate(n,()=>gauss()*.12)];res[n]=r;
 console.log(n.padEnd(10),String(G.BBR[n][2]).padStart(5),(T.toFixed(2)+'s').padStart(7),...r.map((x,i)=>String(x+'%').padStart(i?13:8)))}
const ok=(c,m)=>console.log((c?'pass ':'FAIL ')+m);
ok(pickN.every(n=>res[n][0]===100),'a perfect release hits every time, for everyone');
ok(res[pickN[0]][2]>res[pickN[4]][2]+15,'average timing: best thrower '+res[pickN[0]][2]+'% vs worst '+res[pickN[4]][2]+'%');
ok(res[pickN[0]][2]<100,'even the best thrower can miss with average timing');
// power: knock-over rate when the can is hit at full vs barely-held power
const realPR=B.pR;B.pR=()=>0;let kf=0,kw=0,hf=0,hw=0;for(let i=0;i<400;i++){if(trial('Josh',null,1.2)){hf++;kf+=lastKo}if(trial('Josh',null,.25)){hw++;kw+=lastKo}}B.pR=realPR;
console.log('knock-over rate on a hit: full power '+Math.round(kf/hf*100)+'%, weak power '+Math.round(kw/hw*100)+'%');ok(kf/hf>kw/hw+.12,'power drives the knock-over chance');
