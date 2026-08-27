// Jacob Lockwood : WJS-LPA
// error message key: f∘g xfy sc=scalar t=type n=num

let g=(d,f)=>f?d&&f(d):d,X=e=>{throw""+e},
prs=s=>{let bdg={},fs=""
,r=a=>new RegExp("^"+a.raw).exec(s=s.replace(/^[ ;]+/,
  x=>(x.includes(" ")?fs+=" ":0,"")))
,ts=_=>{_=fs;r``;fs=_}
,c=p=>f=>g(r(p),m=>(s=s.slice(m[0].length),f?f(...m):m[0]))
,j=p=>f=>c(p)((...m)=>(fs+=m[0],f?f(...m):m[0]))
,p=_=>g(r``&&Object.keys(fns).find(n=>s.startsWith(n)),
  (n,m=fns[n][1])=>(s=s.slice(n.length),fs+=m,[fns[n][0],m]))
  ||c`([_¯]?)(\d*\.?\d+)`((_,s,n)=>
   (fs+=(s?"¯":"")+n,[0,"N",s?-n:+n]))
  ||j`[a-zA-Z]+`(n=>[-1,"R",n])
  ||j`'([^']|\\.)'`(c=>[0,"C",eval(c)])
  ||j`"(\\"|[^"])*"`(s=>[0,"T",eval(s)])
  ||j`\(`()&&(e(r=>j`\)`()&&r)??X`unclosed parenthesis`)
,e=(f,a=["E"],v)=>{ts();while(v=p())a.push(v);return a[1]&&g(a,f)}
,l=_=>c`([a-zA-Z]+) *[:←]([:.]?)`(
  (_,n,a)=>(fs+=n+` ←${a} `,["B",n,bdg[n]=[a?a==":"?2:1:-1,e()]]))||e()
,ra=(n,[a,b]=bdg[n])=>a<0?bdg[n]=rd(b):a
,rdm=([a,m,l],r)=>[fns[m][2](r[0],l?.[0])[0],[a,m,r,l]]
,rd=e=>{
  e=e.slice(1).reduce((a,n)=>(
   n=n[0]=="E"?rd(n):n[1]=="R"?[ra(n[2]),"R",n[2]]:n
  ,n[0]==4?a[0]=[...n,a[0]]:n[0]+a[0]?.[0]==0?a[0][1]=="S"
   ?a[0].push(n):a[0]=[0,"S",a[0],n]:a.unshift(n),a),[]
  ).reduce((a,n)=>(n[0]>2?a[0]=rdm(n,a[0]):a.unshift(n),a),[])
  if(!e[1]){e=e[0];if(e[1]=="S")e[1]+="_";return e}
  e=e.reduce(([a,p],n,x)=>(x=n[0],
   !p?!x?[0,n]:[1,x>1?[3,n,[1]]:[n,[1]]]
   :p[0]!=3?[a,x==2?[3,n,p]:x?[n,p]:X`unexpected nilad`]
   :[x>a?x:a,[p[1],p[2],x?[n,[1],x>1&&[2]]:n]]),[0])
  return e[1][0]!=3?e:[2,[e[1][1],e[1][2],[2]]]}
,pgm=[],out=[],prvs=s,x
 while(s){x=l();j`#.+`();pgm.push([x,fs]);j`\n`();fs=""
  if(s==prvs)throw console.error("bad token @",s);prvs=s}
 for(let n in bdg)if(bdg[n][1][0]=="E")bdg[n]=rd(bdg[n])
 for(let[x,fs]of pgm)
  out.push([fs,!x?0:x[0]=="E"?rd(x):["B",x[1],bdg[x[1]]]])
 return out}

let bdg={}
,A=(d,s=[d.length])=>(d.s=s,d),S=d=>A([d],[]),R=a=>a.s.length
,mrg=a=>a.some(v=>!mch(v.s,a[0].s))?X`mrg shapes must match`
  :A(a.flat(),[a.length,...a[0].s])
,ev=(n,arg,[a,b,c]=n,r=v=>ev(v,arg))=>!b?arg[a-1]
  :a=="B"?bdg[b]=ev(c):b=="R"?bdg[c]
  :b[0]=="S"?mrg(n.slice(2).map(r))
  :b=="T"?A([...c]):b=="N"||b=="C"?S(c)
  :b[0]>2?fns[b[1]][2](b[2][0],b[3]?.[0])[1](ev(b[2]),g(b[3],ev))
  :a.map?r(a)(r(b),g(c,r))
  :b.map?a?(...s)=>ev(b,s):ev(b)
  :fns[b][2]
,pty=(d,s=d.s)=>d.length==0?"()":
 s.length*t(d[0])==1?`"${d.join``}"`
  :d.slice(0,s[0]).map((l,i)=>s.length<2?t(l)?l:l<0?"¯"+-l:l
   :`(${pty(A(d.slice(i*(l=d.length/s[0]),++i*l),s.slice(1)))})`
  ).join` `
,mch=(a,b)=>a.length==b.length&&a.every((v,i)=>v===b[i])
,rws=(d,[n,...r]=d.s)=>d.slice(0,n).map((l,i)=>
  A(d.slice(i*(l=d.length/(n??1)),++i*l),r))
,pfm=(a,b,l=Math.min(a.length,b.length))=>
  mch(a.slice(0,l),b.slice(0,l))
,prv=f=>(x,y)=>!y?A(x.map(v=>f(v)),x.s)
  :mch(x.s,y.s)?A(x.map((v,i)=>f(v,y[i])),x.s)
  :!pfm(x.s,y.s)?X`prv shape prefixes must match`
  :R(x)<R(y)?A(y.map((v,i)=>f(x[i*x.length/y.length|0],v)),y.s)
            :A(x.map((v,i)=>f(v,y[i*y.length/x.length|0])),x.s)
,fns={},r={}
,[mf,df,mm,dm]=[1,2,3,4].map(n=>
  (_,s=_.raw[0],g=s[0],m=s.slice(2))=>x=>(
   fns[m]=fns[g]=[n,g,
    r[m]=r[g]=(...a)=>(_=X,X=s=>_(g+" "+s),a=x(...a),X=_,a)]
   ))
,prd=s=>s.reduce((x,y)=>x*y,1)
,rep=(n,a)=>Array(n).fill(a).flat()
,[pm,pd]=[mf,df].map(g=>s=>f=>g(s)(prv(f)))
,t=v=>["number","string","object"].indexOf(typeof(v.s?v[0]:v))
,ch=String.fromCodePoint,od=c=>c.codePointAt(0)
,rec=(f,g=(...x)=>f(g,...x))=>g

mf`⋅ id`(x=>x);df`⊣ lft`((x,_)=>x);df`⊢ rgt`((_,y)=>y)
mf`, rav`(x=>A([...x]))
mf`△ sha`(x=>A(x.s))
mf`⧻ len`(x=>S(x.s[0]??1))

pm`⌵ abs`(Math.abs)
pm`± sig`(Math.sign)
pd`+ add`((x,y,s=t(x)+t(y))=>
 s==1?ch(t(x)?od(x)+y:od(y)+x):!s?x+y:X`x=n or y=n`)
pd`- sub`((x,y,tx=t(x),ty=t(y))=>
 tx?ty?od(x)-od(y):ch(od(x)-y):!ty?x-y:X`x=n -> y=n`)
pd`× mul`((x,y)=>t(x)+t(y)?X`x=y=n`:x*y)
pd`÷ div`((x,y)=>t(x)+t(y)?X`x=y=n`:x/y)

mf`⇌ rev`(x=>mrg(rws(x).reverse()))
df`↯ res`((x,y,l=prd(y))=>A(rep(Math.ceil(l/x.length),x).slice(0,l),y))
mf`¤ fix`(x=>r.res(x,[1,...x.s]))
df`⊂ joi`(rec((j,x,y,rx=R(x),ry=R(y),xsf=x.s.slice(1),ysf=y.s.slice(1)
 )=>t(x)!=t(y)?X`tx=ty`
 :rx<ry?j(r.res(x,[...ry-rx==1?[1]:y.s.slice(1,ry-rx),...x.s]),y)
 :ry<rx?j(x,r.res(y,[...rx-ry==1?[1]:x.s.slice(1,rx-ry),...y.s]))
 :rx==ry&&mch(xsf,ysf)?A([...x,...y],[(x.s[0]??1)+(y.s[0]??1),...xsf])
 :X`x and y must have matching cells`))
mf`⇡ ran`(x=>R(x)?X`x=sc`:A([...Array(x[0]).keys()]))

mm`˙ slf`(a=>[1,f=>    x=>a?f(x,x):f])
mm`˜ bac`(a=>[2,f=>(x,y)=>a?f(y,x):f])
mm`/ red`(a=>a<2?X`f=2`:[1,f=>x=>rws(x).reduce((a,b)=>f(a,b))])
mm`\ sca`(a=>a<2?X`f=2`
 :[1,f=>x=>mrg(rws(x).map((a,i)=>x=i?f(x,a):a))])
dm`⊸ bef`((r,l)=>!r?X`g!=0`
 :!l?r==1?[0,(g,f)=>g(f)]:[1,(g,f)=>x=>g(f,x)]
 :r==1?[l,(g,f)=>(x,y)=>g(l==1?f(x):f(x,y))]
      :[2,(g,f)=>(x,y)=>g(r==1?f(x):f(x,y),y)])
dm`⟜ aft`((r,l)=>!l?X`f!=0`
 :!r?l==1?[0,(g,f)=>f(g)]:[1,(g,f)=>x=>f(x,g)]
 :[r,(g,f)=>(x,y)=>(l==1?f:y=>f(x,y))(r==1?g(x):g(x,y))])

export{prs,ev,pty}
