import{E as n}from"./___vite-browser-external_commonjs-proxy-7f1f402a.js";import{g as E,M,a as S}from"./web3-9c810363.js";import{g as P,d as V,a as R,c as j}from"./getLogs-dc1384f7.js";import{B as z}from"./ButtonOfCopy-7cfa85d9.js";import{i as J}from"./chains-68c757ba.js";import{x as L,r as N,o as q,a7 as m,aa as G,y as o,z as h,J as K,H as _,I as s,P as p,A as i,M as d,O as e,u as a,F as D,a0 as H,L as y}from"./runtime-core.esm-bundler-c80a0204.js";const Q={style:{"word-wrap":"break-word"}},U={key:0},X={key:1},Y={style:{"word-wrap":"break-word"}},Z={class:"block"},$={style:{"word-wrap":"break-word"}},tt={style:{"word-wrap":"break-word"}},et={style:{display:"flex","align-items":"left"}},at={style:{display:"flex","align-items":"left"}},nt=L({name:"TransactionsHistory"}),dt=L({...nt,props:{connectedWallet:{type:Object,default:null},web3:{type:Object,default:null},currentWallet:{type:String,default:""}},setup(F){const l=F,I=N(!1),b=N([]),B=N(null),O=async()=>{I.value=!0;const w=E(M,l.currentWallet,l.web3);b.value=[];const W=await w.methods.getTransactionIds(1).call(),x=await w.methods.getTransactionIds(2).call(),C=W.concat(x).map(async v=>{const c=await w.methods.getTransaction(v).call(),g=await w.methods.getTransactionConfirmationStatus(v,l.connectedWallet.address).call(),k=await l.web3.eth.getChainId();B.value=J(k);const T={transactionId:v},t=await P(w,k,l.web3,T),r={id:v,destination:c.to,tokenSymbol:"",value:null,data:null,confirmations:c.confirmations,revokes:c.revokes,executeState:c.state,confirmStatus:g,type:1,methodName:"",events:t};let u=null;c.to.toLowerCase()===l.currentWallet.toLowerCase()?u=V(c):u=R(c,B,l.web3);const A={...r,...u};b.value.push(A)});await Promise.all(C),b.value.sort(j("id")),I.value=!1};return q(()=>{l.connectedWallet&&l.web3&&l.currentWallet&&O()}),(w,W)=>{const x=m("el-divider"),f=m("el-tag"),C=m("el-card"),v=m("el-timeline-item"),c=m("el-timeline"),g=m("el-table-column"),k=m("el-table"),T=G("loading");return o(),h("div",null,[K((o(),_(k,{data:b.value,style:{width:"100%"}},{default:s(()=>[p(g,{type:"expand"},{default:s(t=>[i("p",Q,[d(e(a(n)("transaction.destination"))+": ",1),p(z,{text:t.row.destination},null,8,["text"])]),t.row.type==2?(o(),h("div",U,[(o(!0),h(D,null,H(t.row.data,(r,u)=>(o(),h("p",{style:{"word-wrap":"break-word"},key:u},e(a(n)("transaction."+r.name))+": "+e(r.value),1))),128))])):y("",!0),t.row.type==1?(o(),h("div",X,[i("p",Y,e(a(n)("transaction.amount"))+": "+e(t.row.value)+" "+e(t.row.tokenSymbol),1)])):y("",!0),p(x),i("div",Z,[t.row.events.length>0?(o(),_(c,{key:0},{default:s(()=>[(o(!0),h(D,null,H(t.row.events,(r,u)=>(o(),_(v,{key:u,timestamp:r.createTime,placement:"top"},{default:s(()=>[p(C,null,{default:s(()=>[i("h4",null,[d(e(a(n)("transaction.eventName"))+": ",1),p(f,{type:a(S)[r.eventName].tagType},{default:s(()=>[d(e(a(S)[r.eventName].name?a(n)("transaction."+a(S)[r.eventName].name):""),1)]),_:2},1032,["type"])]),i("p",$,[d(e(a(n)("transaction.eventFrom"))+": ",1),i("span",null,e(r.from),1)]),i("p",tt,[d(e(a(n)("transaction.eventTransactionHash"))+": ",1),i("span",null,e(r.transactionHash),1)])]),_:2},1024)]),_:2},1032,["timestamp"]))),128))]),_:2},1024)):y("",!0)])]),_:1}),p(g,{label:a(n)("transaction.type")},{default:s(t=>[i("div",et,[t.row.type==1?(o(),_(f,{key:0,type:"success"},{default:s(()=>[d(e(a(n)("transaction."+t.row.methodName)),1)]),_:2},1024)):y("",!0),t.row.type==2?(o(),_(f,{key:1,type:"warning"},{default:s(()=>[d(e(a(n)("transaction."+t.row.methodName)),1)]),_:2},1024)):y("",!0)])]),_:1},8,["label"]),p(g,{label:a(n)("transaction.status")},{default:s(t=>[i("div",at,[t.row.executeState==1?(o(),_(f,{key:0,type:"success"},{default:s(()=>[d(e(a(n)("transaction.statusSuccess")),1)]),_:1})):y("",!0),t.row.executeState==2?(o(),_(f,{key:1,type:"danger"},{default:s(()=>[d(e(a(n)("transaction.statusRevoke")),1)]),_:1})):y("",!0)])]),_:1},8,["label"])]),_:1},8,["data"])),[[T,I.value]])])}}});export{dt as _};