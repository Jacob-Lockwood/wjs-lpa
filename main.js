#!/usr/bin/env node
let copyright="wjs-lpa © Jacob Lockwood",helptxt=`
usage          node main.js [file] [options]
               if no file: uses stdin if not TTY, else opens REPL
options:
-f --format    format provided code instead of running
               if file, overwrites text, else prints to stdout
-h --help      display this help text
`

import * as lang from"./wjs-lpa.js"
import * as fs   from"node:fs"
import * as rl   from"node:readline/promises"

let C=console,L=C.log,E=C.error,P=process,IN=P.stdin,OUT=P.stdout,
id=_=>_,end=_=>P.exit(0),die=_=>P.exit(1),
trycb=(fn,msg)=>
 (x,cb=id,errcb=E)=>{try{return cb(fn(x))}catch(e){E(msg);errcb?.(e)}},
prs=trycb(lang.prs,"PARSE ERR!"),ev=trycb(lang.ev,"EVAL ERR!"),

opt=(...v)=>v.some(o=>P.argv.includes(o)),
fmt=opt("-f","--format"),help=opt("-h","--help"),
file=IN.isTTY||help?null:(P.argv[2]?.[0]!="-"&&P.argv[2])??0,
ftxt=file!=null&&fs.readFileSync(file,"utf8")

if(help){
 L(copyright+helptxt)
}else if(fmt){
 if(file==null)die(E("nothing to format"))
 let txt=prs(ftxt).map(([s])=>s).join('\n').trim()+"\n"
 file==0?OUT.write(txt):fs.writeFileSync(file,txt)
}else if(file!=null){
 prs(ftxt,l=>{
  l.map(([s,p],i)=>p&&ev(p,
   v=>L(lang.pty(v)),err=>die(E(`  on line ${i+1}: ${s}`),E(err))
  ))
 })
}else{
 L(`${copyright} | blank line or ^C to exit REPL`)
 let I=rl.createInterface(IN,OUT),prompt="    ",l,
 clear=()=>{OUT.moveCursor(0,-1);OUT.clearLine(0);OUT.cursorTo(0)}
 I.on("SIGINT",_=>end(clear(L())))
 while(l=await I.question(prompt)||clear()){
  prs(l,st=>st.map(([s,p])=>{
   clear();L(prompt+s);p&&L(ev(p,v=>typeof v=="function"?"fn":lang.pty(v)))
  }))
 }
}
