import{l as a,n as r}from"./index-f2389810.js";import{s as t}from"./___vite-browser-external_commonjs-proxy-17b6bc4b.js";const e="defaultWallet",s=a({id:"pure-wallet",state:()=>({wallet:t().getItem(e)??""}),getters:{getWallet(){return this.wallet}},actions:{setDefaultWallet(l){t().setItem(e,l),this.wallet=l},removeDefaultWallet(){t().removeItem(e),this.wallet=null}}});function n(){return s(r)}export{n as u};
