// Jacob Lockwood
// Fixed-arity LPA implemented in "Whitney JS"
////////////////////////////////////////////////////////////
g=(d,f)=>f?d&&f(d):d
prs=s=>{let bdg={}
,r=a=>new RegExp("^"+a.raw[0]).exec(s=s.replace(/^ +/,""))
,c=p=>f=>g(r(p),m=>(s=s.slice(m[0].length),f?f(...m):m[0]))
,t=r=>(...j)=>c(r)(v=>[...j,v])
,p=f=>g(t`[a-zA-Z]+`(-1,"R")||c`\d+(\.\d+)?`(n=>[0,"N",+n])
  ||c`'(.)'`((_,c)=>[0,"C",c])
  ||c`"((\\"|[^"])*)"`((_,s)=>[0,"T",s])
  ||t`[#]`(1)||t`[+-]`(2)||t`[\/]`(3)||t`[@&]`(4)
  ||c`\(`()&&e(r=>c`\)`()?r:X`unclosed parenthesis`),f)
,e=(f,a=["E"],v)=>{while(v=p())a.push(v);return a[1]&&g(a,f)}
,l=_=>c`([a-zA-Z]+) *:([:.]?)`(
  (_,n,a)=>["B",n,bdg[n]=[a?a==":"?2:1:-1,e()]])||e()
,ra=(n,[a,b]=bdg[n])=>a<0?bdg[n]=rd(b):a
,rdm=([a,m,l],r)=>[a>3?m=="@"?l[0]:X:m=="/"&&r[0]>1?1:X,[a,m,r,l]]
,rd=e=>{
  e=e.slice(1).reduce((a,n)=>(
   n=n[0]=="E"?rd(n):n[1]=="R"?[ra(n[2]),"R",n[2]]:n
  ,n[0]==4?a[0]=[...n,a[0]]:n[0]+a[0]?.[0]==0?a[0][1]=="S"
   ?a[0].push(n):a[0]=[0,"S",a[0],n]:a.unshift(n),a),[]
  ).reduce((a,n)=>(n[0]>2?a[0]=rdm(n,a[0]):a.unshift(n),a),[])
  if(!e[1])return e[0][1]=="S"?[0,"S_",...e[0].slice(2)]:e[0]
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


dsp=(n,[a,b,c]=n)=>!b?".xy"[a]
 :b[0]=="S"?`(${n.slice(2).map(v=>dsp(v)).join` `})`
 :b=="N"||b=="R"?c:b=="C"?`'${c}'`:b=="T"?`"${c}"`
 :b[0]>2?(b[3]?dsp(b[3]):"")+b[1]+dsp(b[2])
 :a.map?`(${dsp(b)} ${dsp(a)}${c?" "+dsp(c):""})`
 :b.map?a?`{${dsp(b)}}`:dsp(b):b

mrg=a=>[[a.length,...a[0][0]],a.flatMap(v=>v[1])]
ev=(n,arg,[a,b,c]=n,r=v=>ev(v,arg))=>!b?arg[a-1]
 :a=="B"?bdg[b]=ev(c):b=="R"?bdg[c]
 :b[0]=="S"?mrg(n.slice(2).map(r))
 :b=="T"?[[c.length],[...c]]:b=="N"||b=="C"?[[],[c]]
//:b[0]>2?...
 :a.map?r(a)(r(b),g(c,r))
 :b.map?a?(...s)=>ev(b,s):ev(b)
 :fns[b][1]
prv=f=>(x,y)=>!y?[x[0],x[1].map(v=>f(v))]
 :0
fns={"+":[2,(x,y)=>[[],[x[1][0]+y[1][0]]]]}
bdg={}
for(l of prs(s=require("fs").readFileSync(0)+"")){
 console.log("    "+(l[0]=="B"?l[1]+": "+dsp(l[2]):dsp(l)))
 console.log(JSON.stringify(ev(l)))}