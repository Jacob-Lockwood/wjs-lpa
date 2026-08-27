// usage: node main.js
// reads program on stdin, evals one line at a time, printing
// formatted code, then result
import{prs,ev,pty}from"./wjs-lpa.js"
import{readFileSync}from"node:fs"
let C=console,L=C.log,E=C.error
try{for(let[s,p]of prs(readFileSync(0)+"")){
 L("    "+s)
 try{p&&L(typeof(p=ev(p))=="function"?"fn":pty(p))
 }catch(e){E("EVAL ERR!",e)}}
}catch(e){E("PARSE ERR!",e)}
