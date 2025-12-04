// Jacob Lockwood : WJS-LPA

g=(d,f)=>f?d&&f(d):d
prs=s=>{let bdg={}
,r=a=>new RegExp("^"+a.raw).exec(s=s.replace(/^ +/,""))
,c=p=>f=>g(r(p),m=>(s=s.slice(m[0].length),f?f(...m):m[0]))
,p=_=>g(r``&&Object.keys(fns).sort((a,b)=>b.length-a.length)
 .find(n=>s.startsWith(n)),n=>(s=s.slice(n.length),[fns[n][0],n]))
  ||c`[a-zA-Z]+`(n=>[-1,"R",n])||c`\d+(\.\d+)?`(n=>[0,"N",+n])
  ||c`'([^']|\\.)'`(c=>[0,"C",eval(c)])
  ||c`"((\\"|[^"])*)"`((_,s)=>[0,"T",s])
  ||c`\(`()&&(e(r=>c`\)`()&&r)??X`unclosed parenthesis`)
,e=(f,a=["E"],v)=>{while(v=p())a.push(v);return a[1]&&g(a,f)}
,l=_=>c`([a-zA-Z]+) *:([:.]?)`(
  (_,n,a)=>["B",n,bdg[n]=[a?a==":"?2:1:-1,e()]])||e()
,ra=(n,[a,b]=bdg[n])=>a<0?bdg[n]=rd(b):a
,rdm=([a,m,l],r)=>[fns[m][1](r[0],l?.[0])[0],[a,m,r,l]]
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
,pgm=[],out=[]
 while(s=s.replace(/^\s*(NB\..*)?\s*/,""))pgm.push(l())
 for(let n in bdg){if(bdg[n][1][0]=="E")bdg[n]=rd(bdg[n])
  out.push(["B",n,bdg[n]])}
 for(let x of pgm)if(x[0]=="E")out.push(rd(x))
 return out}

let bdg={}
,mrg=a=>[[a.length,...a[0][0]],a.flatMap(v=>v[1])]
,ev=(n,arg,[a,b,c]=n,r=v=>ev(v,arg))=>!b?arg[a-1]
  :a=="B"?bdg[b]=ev(c):b=="R"?bdg[c]
  :b[0]=="S"?mrg(n.slice(2).map(r))
  :b=="T"?[[c.length],[...c]]:b=="N"||b=="C"?[[],[c]]
  :b[0]>2?fns[b[1]][1](b[2][0],b[3]?.[0])[1](ev(b[2]),g(b[3],ev))
  :a.map?r(a)(r(b),g(c,r))
  :b.map?a?(...s)=>ev(b,s):ev(b)
  :fns[b][1]
,fmt=(n,[a,b,c]=n)=>!b?".xy"[a]
  :b[0]=="S"?`(${n.slice(2).map(v=>fmt(v)).join` `})`
  :b=="N"||b=="R"?c:b=="C"?`'${c}'`:b=="T"?`"${c}"`
  :b[0]>2?(b[3]?fmt(b[3]):"")+b[1]+fmt(b[2])
  :a.map?`(${fmt(b)} ${fmt(a)}${c?" "+fmt(c):""})`
  :b.map?a?`{${fmt(b)}}`:fmt(b):b
,pty=([s,d])=>s.length*t(d[0])==1?`"${d.join``}"`
  :d.slice(0,s[0]).map((l,i)=>s.length<2?l
   :`(${pty([s.slice(1),d.slice(i*(l=d.length/s[0]),++i*l)])})`
  ).join` `
,mch=(a,b)=>a.length==b.length&&a.every((v,i)=>v===b[i])
,pfm=(a,b,l=Math.min(a.length,b.length))=>
  mch(a.slice(0,l),b.slice(0,l))
,prv=f=>(x,y,
  dx=x[1],dy=y?.[1],sx=x[0],sy=y?.[0],rx=sx.length,ry=sy?.length
 )=>!y?[sx,dx.map(v=>f(v))]
  :mch(sx,sy)?[sx,dx.map((v,i)=>f(v,dy[i]))]
  :!pfm(sx,sy)?X
  :rx<ry?[sy,dy.map((v,i)=>f(dx[i*dx.length/dy.length|0],v))]
  :[sx,dx.map((v,i)=>f(v,dy[i*dy.length/dx.length|0]))]
,fns={},[mf,df,mm,dm]=[1,2,3,4].map(n=>s=>f=>fns[s]=[n,f])
,[pm,pd]=[mf,df].map(g=>s=>f=>g(s)(prv(f)))
,t=v=>["number","string","object"].indexOf(
  typeof(Array.isArray(v)?v[1][0]:v))
,ch=String.fromCodePoint,od=c=>c.codePointAt(0)

pd`+`((x,y,s=t(x)+t(y))=>s==1?ch(t(x)?od(x)+y:od(y)+x):s?X:x+y)
pd`-`((x,y,tx=t(x),ty=t(y))=>tx?ty?od(x)-od(y):ch(od(x)-y):ty?X:x-y)
pd`*`((x,y)=>x*y);pd`%`((x,y)=>x/y)
df`,`((x,y)=>[[x[0][0]+y[0][0]],x[1].concat(y[1])])
df`$`((x,y)=>[y[1],x[2]])
mf`#`(x=>[[],[x[0][1]]])
mf`range`(x=>x[0].length?X:[x[1],[...Array(x[1][0]).keys()]])
mm`/`(a=>a<2?X
 :[1,f=>x=>x[1].map(a=>[[],[a]]).reduce((a,b)=>f(a,b))])

for(let l of prs(s=require("fs").readFileSync(0)+"")){
 console.log("    "+(l[0]=="B"?l[1]+": "+fmt(l[2]):fmt(l)))
 l=ev(l);console.log(typeof l=="function"?"fn":pty(l))}
