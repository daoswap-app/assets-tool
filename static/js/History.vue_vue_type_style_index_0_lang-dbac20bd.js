import{t as s}from"./___vite-browser-external_commonjs-proxy-17b6bc4b.js";import{M as j,g as at,E as nt,a as W,w as H,T as ot}from"./web3-a6b087d2.js";import{E as st}from"./ERC20_abi-801f43f8.js";import{I as z,p as lt,c as J}from"./index-9f1413dd.js";import{g as rt,h as it}from"./chains-5e4fdd5e.js";import{x as K,r as p,o as ct,a7 as L,aa as dt,y as w,z as ut,J as mt,H as b,I as a,P as c,u as l,A as n,O as i,M as g,L as k}from"./runtime-core.esm-bundler-c80a0204.js";const ft={style:{display:"flex","align-items":"left"}},_t={style:{display:"flex","align-items":"left"}},vt={style:{display:"flex","align-items":"left"}},pt={style:{display:"flex","align-items":"left"}},wt={style:{display:"flex","align-items":"left"}},yt={style:{display:"flex","align-items":"left"}},bt={style:{"margin-left":"10px"}},ht={style:{display:"flex","align-items":"left"}},gt={style:{"margin-left":"3px"}},kt={style:{display:"flex","align-items":"left"}},It=K({name:"TransactionsHistory"}),Et=K({...It,props:{connectedWallet:{type:Object,default:null},web3:{type:Object,default:null},currentWallet:{type:String,default:""}},setup(Q){const e=Q,q=new z(st),G=new z(j),I=p(!1),h=p([]),x=p(null),T=p(0),R=p(0),M=p(0),U=async()=>{I.value=!0;const u=at(j,e.currentWallet,e.web3);T.value=nt[e.connectedWallet.chainId],R.value=await e.web3.eth.getBlockNumber(),M.value=Math.ceil((R.value-T.value)/W),h.value=[];const O=await u.methods.getTransactionIds(1).call(),r=await u.methods.getTransactionIds(2).call(),_=O.concat(r).map(async m=>{const t=await u.methods.getTransaction(m).call(),d=await u.methods.getTransactionConfirmationStatus(m,e.connectedWallet.address).call(),V=await e.web3.eth.getChainId();x.value=rt(it(parseInt(V)));let B=1,N="",S="",F=t.to,E=null,P=null;if(t.to.toLowerCase()===e.currentWallet.toLowerCase()){B=2;const o=t.data?G.decodeData(t.data):null;o&&(N=o.method)}else{B=1;const o=t.data?q.decodeData(t.data):null;if(S=x.value.token,E=H(t.value,e.web3),o){const f=ot[V].filter(y=>y.token.toLowerCase()===t.to.toLowerCase());N=o.method,S=f.length>0?f[0].symbol:x.value.token,F=o.inputs[0],E=H(new e.web3.utils.toBN(o.inputs[1].toString()),e.web3),P={to:o.inputs[0],value:H(new e.web3.utils.toBN(o.inputs[1].toString()),e.web3)}}}const D={id:m,destination:F,tokenSymbol:S,value:E,data:P,confirmations:t.confirmations,revokes:t.revokes,executeState:t.state,confirmStatus:d,type:B,methodName:N,events:[]};for(let o=0;o<M.value;o++){const f=T.value+W*o,y=f+(W-1),X=await u.getPastEvents("TransactionCreated",{filter:{transactionId:m},fromBlock:f,toBlock:y}),Y=await u.getPastEvents("TransactionConfirmed",{filter:{transactionId:m},fromBlock:f,toBlock:y}),Z=await u.getPastEvents("TransactionRevoke",{filter:{transactionId:m},fromBlock:f,toBlock:y}),A=X.concat(Y,Z);if(A.length>0){const $=A.map(async v=>{const tt=await e.web3.eth.getTransaction(v.transactionHash),et={eventName:v.event,...v.returnValues,transactionHash:v.transactionHash,blockNumber:v.blockNumber,from:tt.from,createTime:lt(v.returnValues.createTime)};D.events.push(et)});await Promise.all($),D.events.sort(J("blockNumber"))}}h.value.push(D)});await Promise.all(_),h.value.sort(J("id")),I.value=!1};return ct(()=>{e.connectedWallet&&e.web3&&e.currentWallet&&U()}),(u,O)=>{const r=L("el-table-column"),C=L("el-table"),_=L("el-tag"),m=dt("loading");return w(),ut("div",null,[mt((w(),b(C,{data:h.value,style:{width:"100%"}},{default:a(()=>[c(r,{type:"expand"},{default:a(t=>[c(C,{data:t.row.events,style:{width:"100%"}},{default:a(()=>[c(r,{label:l(s)("transaction.eventName")},{default:a(d=>[n("div",ft,[n("span",null,i(d.row.eventName),1)])]),_:1},8,["label"]),c(r,{label:l(s)("transaction.eventFrom")},{default:a(d=>[n("div",_t,[n("span",null,i(d.row.from),1)])]),_:1},8,["label"]),c(r,{label:l(s)("transaction.eventTransactionHash")},{default:a(d=>[n("div",vt,[n("span",null,i(d.row.transactionHash),1)])]),_:1},8,["label"]),c(r,{label:l(s)("transaction.eventCreateTime")},{default:a(d=>[n("div",pt,[n("span",null,i(d.row.createTime),1)])]),_:1},8,["label"])]),_:2},1032,["data"])]),_:1}),c(r,{label:l(s)("transaction.type")},{default:a(t=>[n("div",wt,[t.row.type==1?(w(),b(_,{key:0,type:"success"},{default:a(()=>[g(i(l(s)("transaction."+t.row.methodName)),1)]),_:2},1024)):k("",!0),t.row.type==2?(w(),b(_,{key:1,type:"warning"},{default:a(()=>[g(i(l(s)("transaction."+t.row.methodName)),1)]),_:2},1024)):k("",!0)])]),_:1},8,["label"]),c(r,{label:l(s)("transaction.destination")},{default:a(t=>[n("div",yt,[n("span",bt,i(t.row.destination),1)])]),_:1},8,["label"]),c(r,{label:l(s)("transaction.value")},{default:a(t=>[n("div",ht,[n("span",null,i(t.row.value),1),n("span",gt,i(t.row.tokenSymbol),1)])]),_:1},8,["label"]),c(r,{label:l(s)("transaction.status")},{default:a(t=>[n("div",kt,[t.row.executeState==1?(w(),b(_,{key:0,type:"success"},{default:a(()=>[g(i(l(s)("transaction.statusSuccess")),1)]),_:1})):k("",!0),t.row.executeState==2?(w(),b(_,{key:1,type:"danger"},{default:a(()=>[g(i(l(s)("transaction.statusRevoke")),1)]),_:1})):k("",!0)])]),_:1},8,["label"])]),_:1},8,["data"])),[[m,I.value]])])}}});export{Et as _};
