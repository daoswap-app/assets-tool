import{E as c}from"./___vite-browser-external_commonjs-proxy-7f1f402a.js";import{u as v,W as x}from"./Wallet_abi-7ed4f783.js";import{u as f}from"./web3Modal-6c97c605.js";import{g as S,W as V}from"./web3-62625531.js";import{_ as A}from"./Queue.vue_vue_type_style_index_0_lang-600fc940.js";import{_ as T}from"./History.vue_vue_type_style_index_0_lang-b123545d.js";import{B as E}from"./ButtonOfCopy-9be7905e.js";import{x as w,r as o,o as I,a7 as u,y as n,z as L,P as i,I as r,A as y,M as N,O as H,u as m,H as p,L as k}from"./runtime-core.esm-bundler-c80a0204.js";import"./vue-i18n.runtime.esm-bundler-d653d868.js";import"./index-32864bd7.js";import"./vue-router-935545c9.js";import"./web3.min-18b32501.js";import"./chains-85289d49.js";import"./arrow-down-s-line-da487a0d.js";import"./decodeParams-f5fdd745.js";import"./ERC20_abi-801f43f8.js";import"./message-b641d895.js";import"./index-aa74f938.js";import"./_plugin-vue_export-helper-c27b6911.js";const M={class:"card-header"},O={class:"font-medium",style:{"word-wrap":"break-word"}},$=w({name:"Transactions"}),re=w({...$,setup(R){const e=o(null),t=o(null),a=o(null);async function W(){e.value=v().getWallet,t.value=f().getWallet,a.value=f().getWeb3;try{const l=await S(x,V[t.value.chainId],a.value).methods.getWalletList().call({from:t.value.address});l.length>0?e.value||(v().setDefaultWallet(l[0].token),e.value=l[0].token):(v().removeDefaultWallet(),e.value=null)}catch{}}I(()=>{W()});const d=o("0"),_=o(0);function h({index:s}){d.value=s,_.value=Date.parse(new Date().toString())}return f().$subscribe(()=>{W()}),(s,l)=>{const b=u("el-tab-pane"),C=u("el-tabs"),g=u("el-empty"),B=u("el-card");return n(),L("div",null,[i(B,{shadow:"never"},{header:r(()=>[y("div",M,[y("span",O,[N(H(m(c)("transaction.transactions"))+" - ",1),i(E,{text:e.value},null,8,["text"])])])]),default:r(()=>[e.value?(n(),p(C,{key:0,modelValue:d.value,"onUpdate:modelValue":l[0]||(l[0]=D=>d.value=D),onTabClick:h},{default:r(()=>[i(b,{label:m(c)("transaction.queue"),name:"0"},{default:r(()=>[t.value&&a.value&&e.value?(n(),p(A,{connectedWallet:t.value,web3:a.value,currentWallet:e.value,key:_.value},null,8,["connectedWallet","web3","currentWallet"])):k("",!0)]),_:1},8,["label"]),i(b,{label:m(c)("transaction.history"),name:"1"},{default:r(()=>[t.value&&a.value&&e.value?(n(),p(T,{connectedWallet:t.value,web3:a.value,currentWallet:e.value,key:_.value},null,8,["connectedWallet","web3","currentWallet"])):k("",!0)]),_:1},8,["label"])]),_:1},8,["modelValue"])):(n(),p(g,{key:1,description:m(c)("transaction.noData")},null,8,["description"]))]),_:1})])}}});export{re as default};
