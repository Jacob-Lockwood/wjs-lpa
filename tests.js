import{ev,prs}from"./wjs-lpa.js"
let C=console,L=C.log,E=C.error,_S,sl=0,ts={}
,S=s=>{_S=s+"";sl=Math.max(sl,_S.length + 1)}
,t=(s,o=ts[_S]??={})=>{try{o[s]=ev(prs(s+"≡1")[0][1])[0]
  }catch(e){E("ERR in: "+s);E(e);o[s]=0}}

S`HARNESS`;t`1⊣0`;t`0⊢1`;t`1+2=3`
S`PERVASION`;t`1 2+1≡2 3`;t`1 2+¯1 2≡0 4`;t`(1 2)(3 4)+1 2≡(2 3)(5 6)`
S`RANGE`;t`5⇡≡0 1 2 3 4`
S`RESHAPE`;t`0↯2≡0 0`;t`0 1↯3≡0 1 0`;t`0 1 2↯2≡0 1`;t`0 1↯2 3↯1≡(0¤)`
 t`0 1↯2 3≡(0 1 0)(1 0 1)`;t`0 1↯3 2↯3≡(0 1↯2 3↯3)`;
S`JOIN`;t`1⊂2≡1 2`;t`1⊂2 3≡1 2 3`;t`1 2⊂3≡1 2 3`;t`1 2⊂3 4≡1 2 3 4`
 t`1⊂(2 3)(4 5)≡(1 1)(2 3)(4 5)`;t`(1 2)(3 4)⊂5≡(1 2)(3 4)(5 5)`
 t`(1 2)(3 4)⊂(5 6)≡(1 2)(3 4)(5 6)`;t`(1 2)⊂(3 4)(5 6)≡(1 2)(3 4)(5 6)`;
 t`(1 2)⊂(8⇡↯2 2 2)≡((1 2)(1 2))((0 1)(2 3))((4 5)(6 7))`;

let tp=0,tf=0
for(let s in ts){let p=0,f=0,e=[],o=ts[s];for(let t in o){
 o[t]?++p:++f&&e.push(t)};L(`${s}:`.padEnd(sl),p,"passed",f,"failed")
 e.map(e=>E('| fail:',e));tp+=p;tf+=f}
L(`TOTAL:`.padEnd(sl),tp,"passed",tf,"failed",`(${tp}/${tp+tf} = ${tp/(tp+tf)*100|0}%)`)
