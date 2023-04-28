import{t as u,w as X}from"./___vite-browser-external_commonjs-proxy-4a27f4fc.js";import{c as Y,i as Z}from"./addresses-61594ce1.js";import{u as U}from"./web3Modal-7a6f7b09.js";import{g as j,W as q}from"./web3-ad2cfba4.js";import{x as S,r as p,o as z,w as R,a7 as f,y as k,H as F,I as a,P as t,M as g,O as V,u as i,z as O,a0 as H,F as $,L as ee,aa as te,A as le,J as ae,S as ne}from"./runtime-core.esm-bundler-c80a0204.js";import{u as se}from"./hooks-51d06512.js";import{u as L}from"./wallet-7672d753.js";import{_ as re}from"./WalletTable.vue_vue_type_style_index_0_lang-81d0818e.js";const E=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"sender",type:"address"},{indexed:!1,internalType:"string",name:"name",type:"string"}],name:"eventCreateWallet",type:"event"},{inputs:[{internalType:"string",name:"_name",type:"string"},{internalType:"address[]",name:"_owners",type:"address[]"},{internalType:"uint256",name:"_required",type:"uint256"}],name:"createWallet",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"getAllWallet",outputs:[{internalType:"address[]",name:"",type:"address[]"}],stateMutability:"view",type:"function"},{inputs:[],name:"getWalletList",outputs:[{components:[{internalType:"string",name:"name",type:"string"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"ownerCount",type:"uint256"},{internalType:"uint256",name:"threshold",type:"uint256"},{internalType:"address[]",name:"owners",type:"address[]"}],internalType:"struct Wallet.WalletItem[]",name:"walletList",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"}],oe=S({__name:"AddWallet",props:{visible:{type:Boolean,default:!1},data:{type:Object,default:()=>null}},emits:["update:visible","refresh-wallet-list"],setup(I,{emit:v}){const c=I,m=p(!1),d=p(!1),w=p(null),C=p(null),x={name:"1rens",owners:[],confirmNumber:1},D=p(),e=p(x);z(()=>{m.value=!0,w.value=U().getWallet,C.value=U().getWeb3,e.value.owners.push({address:w.value.address,error:""}),m.value=!1});const T=async()=>{const n=await D.value.validate(s=>!!s);let l=0;return e.value.owners.map(s=>{if(s.address){if(s.address&&(s.address=Y(s.address),!Z(s.address))){l++,s.error=u("wallet.invalid wallet address");return}const r=e.value.owners.filter(b=>b.address===s.address);if(r.length>1){const b=u("wallet.owner is already added");l++,s.error=b,r.map(W=>{W.error=b});return}else{l=l===0?0:l--,s.error="";return}}else{l++,s.error=u("wallet.please add owners");return}}),l<=0&&n},_=async()=>{if(await T()){m.value=!0;const l=[];e.value.owners.map(r=>{l.push(r.address)}),j(E,q[w.value.chainId],C.value).methods.createWallet(e.value.name,l,e.value.confirmNumber).send({from:w.value.address}).then(()=>{v("refresh-wallet-list")}).catch(r=>{console.error(r)}).finally(()=>{m.value=!1,h()})}},y=n=>{const l=e.value.owners.indexOf(n);l!==-1&&e.value.owners.splice(l,1)},N=()=>{const n={name:"",address:"",error:""};e.value.owners.push(n)},h=()=>{d.value=!1};return R(()=>d.value,n=>{v("update:visible",n)}),R(()=>c.visible,n=>{d.value=n}),R(()=>c.data,n=>{m.value=!0,n?(e.value.name=n.name,e.value.confirmNumber=n.threshold,e.value.owners=[],n.owners.map(l=>{e.value.owners.push({address:l,error:""})})):e.value=x,m.value=!1}),R(()=>e.value.owners.length,n=>{e.value.confirmNumber>e.value.owners.length&&(e.value.confirmNumber=n)}),(n,l)=>{const s=f("el-input"),r=f("el-col"),b=f("el-row"),W=f("el-form-item"),A=f("el-button"),J=f("el-divider"),P=f("el-option"),G=f("el-select"),K=f("el-form"),Q=f("el-dialog");return k(),F(Q,{modelValue:d.value,"onUpdate:modelValue":l[3]||(l[3]=o=>d.value=o),title:i(u)("wallet.createWallet"),width:"90%",draggable:"","close-on-click-modal":!1,"before-close":h},{footer:a(()=>[t(A,{loading:m.value,onClick:h},{default:a(()=>[g(V(i(u)("wallet.btnCancel")),1)]),_:1},8,["loading"]),t(A,{loading:m.value,type:"primary",onClick:_},{default:a(()=>[g(V(i(u)("wallet.btnSubmit")),1)]),_:1},8,["loading"])]),default:a(()=>[t(K,{ref_key:"walletFormRef",ref:D,model:e.value,"label-width":"100px",class:"demo-ruleForm","hide-required-asterisk":!0,"label-position":"top"},{default:a(()=>[t(W,{prop:"name",label:i(u)("wallet.name"),style:{width:"100%"},rules:[{required:!0,message:i(u)("wallet.please input wallet name"),trigger:"blur"}]},{default:a(()=>[t(b,{gutter:20,style:{width:"100%"}},{default:a(()=>[t(r,{span:24},{default:a(()=>[t(s,{modelValue:e.value.name,"onUpdate:modelValue":l[0]||(l[0]=o=>e.value.name=o)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["label","rules"]),t(W,{prop:"owners",label:i(u)("wallet.owners"),style:{width:"100%"}},{default:a(()=>[(k(!0),O($,null,H(e.value.owners,(o,M)=>(k(),F(W,{style:{width:"100%","margin-bottom":"1.2rem"},key:M,error:o.error},{default:a(()=>[t(b,{gutter:10,style:{width:"100%"}},{default:a(()=>[t(r,{xs:1,md:1},{default:a(()=>[g(V(M+1),1)]),_:2},1024),t(r,{xs:17,md:19},{default:a(()=>[t(s,{modelValue:o.address,"onUpdate:modelValue":B=>o.address=B,onBlur:l[1]||(l[1]=B=>T())},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(r,{xs:6,md:4},{default:a(()=>[M!==0?(k(),F(A,{key:0,onClick:X(B=>y(o),["prevent"])},{default:a(()=>[g("删除")]),_:2},1032,["onClick"])):ee("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1032,["error"]))),128))]),_:1},8,["label"]),t(W,null,{default:a(()=>[t(A,{type:"primary",onClick:N},{default:a(()=>[g(V(i(u)("wallet.btnAddOwner")),1)]),_:1})]),_:1}),t(J),t(W,{prop:"confirmNumber",label:i(u)("wallet.confirmNumber"),style:{width:"100%"},rules:[{required:!0,message:i(u)("wallet.please select confirm number"),trigger:"change"}]},{default:a(()=>[t(b,{gutter:20,style:{width:"100%"}},{default:a(()=>[t(r,{xs:8,md:2},{default:a(()=>[t(G,{modelValue:e.value.confirmNumber,"onUpdate:modelValue":l[2]||(l[2]=o=>e.value.confirmNumber=o)},{default:a(()=>[(k(!0),O($,null,H(e.value.owners.length,o=>(k(),F(P,{key:o,label:o,value:o},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(r,{xs:1,md:1},{default:a(()=>[g("/")]),_:1}),t(r,{xs:8,md:2},{default:a(()=>[g(V(e.value.owners.length),1)]),_:1}),t(r,{xs:7,md:19})]),_:1})]),_:1},8,["label","rules"])]),_:1},8,["model"])]),_:1},8,["modelValue","title"])}}}),ue={width:24,height:24,body:'<path fill="currentColor" d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16z"/>'},de=ue,ie={class:"main"},ce={class:"w-full flex justify-between mb-4"},me=S({name:"HomeWallet"}),he=S({...me,props:{connectedWallet:{type:Object,default:null},web3:{type:Object,default:null}},setup(I){const v=I,c=p([]),m=p(!0),d=p(null),w=async()=>{try{d.value=L().getWallet;const y=await j(E,q[v.connectedWallet.chainId],v.web3).methods.getWalletList().call({from:v.connectedWallet.address});c.value=y,c.value.length>0?d.value?c.value.filter(h=>h.token.toLowerCase()===d.value.toLowerCase()).length<=0&&(L().setDefaultWallet(c.value[0].token),d.value=c.value[0].token):(L().setDefaultWallet(c.value[0].token),d.value=c.value[0].token):L().removeDefaultWallet()}catch{}finally{m.value=!1}},C=p(!1),x=p(null),D=_=>{C.value=!0,ne(()=>{x.value=_??null})},e=_=>{L().setDefaultWallet(_.token),w()},T=()=>{w()};return z(()=>{w()}),(_,y)=>{const N=f("el-button"),h=te("loading");return k(),O("div",ie,[le("div",ce,[t(N,{icon:i(se)(i(de)),onClick:y[0]||(y[0]=n=>D())},{default:a(()=>[g(V(i(u)("wallet.btnAdd")),1)]),_:1},8,["icon"])]),ae(t(re,{data:c.value,connectedWallet:v.connectedWallet,web3:v.web3,currentWallet:d.value,onChangeWallet:e,onRefreshWalletList:T},null,8,["data","connectedWallet","web3","currentWallet"]),[[h,m.value]]),t(oe,{visible:C.value,"onUpdate:visible":y[1]||(y[1]=n=>C.value=n),data:x.value,onRefreshWalletList:T},null,8,["visible","data"])])}}});export{he as _};
