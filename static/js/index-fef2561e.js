import{E as r}from"./___vite-browser-external_commonjs-proxy-eabcf697.js";import{u as h}from"./wallet-e44cf233.js";import{u as f}from"./web3Modal-85a9e5d3.js";import{_ as B}from"./Queue.vue_vue_type_style_index_0_lang-2c1e7b3c.js";import{_ as g}from"./History.vue_vue_type_style_index_0_lang-16a66407.js";import{B as D}from"./ButtonOfCopy-b4d19cd5.js";import{x as k,r as l,o as N,a7 as s,y as o,z as S,P as u,I as n,A as b,M as H,O as M,u as c,H as m,L as W}from"./runtime-core.esm-bundler-c80a0204.js";import"./vue-i18n.runtime.esm-bundler-d653d868.js";import"./index-0f69c7bb.js";import"./vue-router-935545c9.js";import"./web3.min-86d33c45.js";import"./index-997097ac.js";import"./arrow-down-s-line-da487a0d.js";import"./web3-5746e9c3.js";import"./ERC20_abi-801f43f8.js";import"./index-7ea0abad.js";import"./message-c0d7d08e.js";import"./index-b35d802c.js";import"./_plugin-vue_export-helper-c27b6911.js";const T={class:"card-header"},E={class:"font-medium",style:{"word-wrap":"break-word"}},I=k({name:"Transactions"}),ae=k({...I,setup(O){const e=l(null),t=l(null),a=l(null);N(()=>{e.value=h().getWallet,t.value=f().getWallet,a.value=f().getWeb3});const i=l("0"),p=l(0);function w({index:d}){i.value=d,p.value=Date.parse(new Date().toString())}return(d,_)=>{const v=s("el-tab-pane"),y=s("el-tabs"),x=s("el-empty"),C=s("el-card");return o(),S("div",null,[u(C,{shadow:"never"},{header:n(()=>[b("div",T,[b("span",E,[H(M(c(r)("transaction.transactions"))+" - ",1),u(D,{text:e.value},null,8,["text"])])])]),default:n(()=>[e.value?(o(),m(y,{key:0,modelValue:i.value,"onUpdate:modelValue":_[0]||(_[0]=V=>i.value=V),onTabClick:w},{default:n(()=>[u(v,{label:c(r)("transaction.queue"),name:"0"},{default:n(()=>[t.value&&a.value&&e.value?(o(),m(B,{connectedWallet:t.value,web3:a.value,currentWallet:e.value,key:p.value},null,8,["connectedWallet","web3","currentWallet"])):W("",!0)]),_:1},8,["label"]),u(v,{label:c(r)("transaction.history"),name:"1"},{default:n(()=>[t.value&&a.value&&e.value?(o(),m(g,{connectedWallet:t.value,web3:a.value,currentWallet:e.value,key:p.value},null,8,["connectedWallet","web3","currentWallet"])):W("",!0)]),_:1},8,["label"])]),_:1},8,["modelValue"])):(o(),m(x,{key:1,description:c(r)("transaction.noData")},null,8,["description"]))]),_:1})])}}});export{ae as default};
