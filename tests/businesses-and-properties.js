require(__dirname+'/harness.js');G.startGame(false);step(5);const S=G.S;let errs=0;const ce=console.error;console.error=(...a)=>{errs++;ce('ERR',...a)};
const D=G.DECO||[];console.log('interactables',G.IT.length,'gas stations',G.GAS.length,G.GAS.map(g=>g.slice(0,2).map(Math.round).join(',')).join(' | '));
// fire every interactable once with lots of money, then close menus
G.P.money=1e6;let n=0,fail=[];for(const it of G.IT){try{it.fn();n++;G.closeMenu&&G.closeMenu();if(G.RG.on)G.mgClose()}catch(e){fail.push(it.label+': '+e.message)}}console.log('fired',n,'failures',fail.length,fail.slice(0,5));
// property: buy The Big Orange, advance days, collect
const it=G.IT.find(i=>i.label==='Visit The Big Orange');it.fn();const buyB=els.menuBody.children.find(b=>b.children[0]&&b.children[0].textContent==='Buy this property');buyB.onclick();console.log('owned',JSON.stringify(S.props));
S.dayN+=2;console.log('due after 2 days',G.propDue('orange'));S.dayN+=5;console.log('due after 7 days (cap 3)',G.propDue('orange'));it.fn();const col=els.menuBody.children.find(b=>b.children[0]&&b.children[0].textContent==='Collect earnings');const m0=G.P.money;col.onclick();console.log('collected',G.P.money-m0,'due now',G.propDue('orange'));
// beer ball menu
const items=G.GAMES.bb.menu();console.log('bb menu:',items.map(i=>i.label).join(' | '));G.P.money=500;items[0].fn();console.log('play now -> players',G.RG.st.P.map(p=>p.n+(p.hum?'*':'')).join(','),'n',G.RG.n);G.mgClose();
console.log('errors',errs);
