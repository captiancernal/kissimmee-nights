const fs=require('fs');
function stub(){const f=function(){return stub()};return new Proxy(f,{get(t,k){if(k===Symbol.toPrimitive)return()=>0;if(k==='then')return undefined;if(!(k in t))t[k]=(k==='length'?0:stub());return t[k]},set(t,k,v){t[k]=v;return true},apply(){return stub()}})}
const els={};
function el(id){return els[id]||(els[id]={id,style:{},classList:{add(){},remove(){},toggle(){}},children:[],appendChild(c){this.children.push(c)},addEventListener(){},getContext(){return stub()},firstChild:{style:{}},set innerHTML(v){this._h=v;this.children=[]},get innerHTML(){return this._h},textContent:'',remove(){},width:0,height:0})}
global.document={getElementById:el,createElement:()=>el('new'+Math.random())};
global.window=global;global.innerWidth=900;global.innerHeight=500;global.devicePixelRatio=1;
global.addEventListener=()=>{};global.localStorage={_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v},removeItem(k){delete this._d[k]}};
global.Path2D=class{moveTo(){}lineTo(){}};
let raf=null;global.requestAnimationFrame=f=>{raf=f};global.setInterval=()=>0;global.clearInterval=()=>{};
const timers=[];global.setTimeout=(f)=>{timers.push(f);return 0};
eval(fs.readFileSync(__dirname+'/g.js','utf8'));
const G=global.__G;let T=0;const _sg=G.startGame;G.startGame=function(c){_sg(c);if(els.charDone&&els.charDone.onclick&&G.S.mode==='menu')els.charDone.onclick()};
global.step=function(n){for(let i=0;i<n;i++){T+=33;raf(T);while(timers.length)timers.shift()()}};
global.G=G;global.els=els;
global.clickOpt=async function(idx){for(let k=0;k<40;k++){await null;const o=els.dlgOpts;if(o&&o.children.length){const b=o.children[idx%o.children.length];o.children=[];b.onclick();await null;await null;continue}
    if(els.dlgNext.onclick){els.dlgNext.onclick();els.dlgNext.onclick()} step(1)} };
