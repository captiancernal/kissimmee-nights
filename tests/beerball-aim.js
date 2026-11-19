// Beer ball aim: nobody is automatic. Perfect aim + perfect timing hit rates by THROWING rating.
require(__dirname+'/harness.js');G.startGame(false);step(5);const R=G.RG,B=G.BB,S=G.S;Object.assign(S.bbR,{bo:1,drink:0,ice:0,sd:0,heck:0});
function trial(name,stF){G.mgGo(G.GAMES.bb,1,{t:[name,'Eric','Kait','Jill']});const s=R.st;s.ph='ready';s.t=1;const p=B.cur(s),tg=s.P[2+(Math.random()*2|0)],o=B.org(p.tm);s.T=Math.random()*100;
 const y0=500;B.down(s,360,y0);const w=B.win?B.win(p):[0,0];if(s.dr)s.dr.st=stF(w);const sw=B.sway(s,p),dx=(tg.x-o[0]-sw[0])/2.4,dy=(tg.y-o[1]-sw[1])/2.4;B.move&&0;s.dr.x=360-dx;s.dr.y=y0-dy;B.up(s,360-dx,y0-dy);
 let g=0;while(s.ph==="fly"&&g++<200)B.tick(s,1/30);return s.ph==='drink'||s.ph==='qte'}
const rate=(n,f,N=700)=>{let h=0;for(let i=0;i<N;i++)h+=trial(n,f);return Math.round(h/N*100)};
const who=G.BBN.slice().sort((a,b)=>G.BBR[b][2]-G.BBR[a][2]);const pickN=[who[0],who[3],who[7],who[11],who[15]];
console.log('player      THROW  steady  rushed  held-too-long');
const res={};for(const n of pickN){const a=rate(n,w=>(w[0]+w[1])/2),b=rate(n,()=>.05),c=rate(n,w=>w[1]+1.2);res[n]=[a,b,c];console.log(n.padEnd(10),String(G.BBR[n][2]).padStart(5),String(a+'%').padStart(7),String(b+'%').padStart(7),String(c+'%').padStart(9))}
const top=res[pickN[0]],low=res[pickN[4]];
console.log((top[0]<=85&&top[0]>=55?'pass':'FAIL')+' best thrower is not automatic ('+top[0]+'%)');
console.log((low[0]<top[0]-15?'pass':'FAIL')+' worst thrower is clearly worse ('+low[0]+'% vs '+top[0]+'%)');
console.log((top[1]<top[0]-8?'pass':'FAIL')+' rushing the throw costs accuracy');
