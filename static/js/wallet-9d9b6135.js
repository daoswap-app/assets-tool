import{l as a,n as r}from"./index-51c58d4e.js";import{s as t}from"./i18n-4a0f4af2.js";const e="defaultWallet",s=a({id:"pure-wallet",state:()=>({wallet:t().getItem(e)??""}),getters:{getWallet(){return this.wallet}},actions:{setDefaultWallet(l){t().setItem(e,l),this.wallet=l},removeDefaultWallet(){t().removeItem(e),this.wallet=null}}});function n(){return s(r)}export{n as u};