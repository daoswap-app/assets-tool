import{t as c}from"./i18n-d274a306.js";import{f as V}from"./formatters-607f9df1.js";import{h,r as a,o as k,a3 as r,a6 as C,j as v,k as N,y as j,v as W,x as e,l as b,C as t,u as d,D as u,B as n}from"./runtime-core.esm-bundler-f67957fc.js";const O={class:"card-header"},A={class:"font-medium"},E=h({name:"HomeBalance"}),T=h({...E,props:{connectedWallet:{type:Object,default:null},web3:{type:Object,default:null}},setup(B){const i=B,l=a(!1),o=a(null),s=a(null),_=a("0"),w=a("BNB");async function y(){if(l.value=!0,o.value=i.connectedWallet,s.value=i.web3,s.value){const m=await s.value.eth.getBalance(o.value.address);_.value=V(m,18)}l.value=!1}return k(()=>{y()}),(m,H)=>{const f=r("el-descriptions-item"),g=r("el-descriptions"),x=r("el-card"),D=C("loading");return v(),N("div",null,[j((v(),W(x,{shadow:"never"},{header:e(()=>[b("div",O,[b("span",A,t(d(c)("account.info")),1)])]),default:e(()=>[u(g,{column:1,border:""},{default:e(()=>[u(f,null,{label:e(()=>[n(t(d(c)("account.address")),1)]),default:e(()=>{var p;return[n(" "+t(((p=o.value)==null?void 0:p.address)??""),1)]}),_:1}),u(f,null,{label:e(()=>[n(t(d(c)("account.balance")),1)]),default:e(()=>[n(" "+t(_.value+" "+w.value),1)]),_:1})]),_:1})]),_:1})),[[D,l.value]])])}}});export{T as _};
