import{u as v}from"./vue-i18n.runtime.esm-bundler-d653d868.js";import{u as g}from"./vue-router-935545c9.js";import{x as l,r as n,u as e,o as h,aa as x,J as k,y as w,z as y,A as R,S}from"./runtime-core.esm-bundler-c80a0204.js";import{_ as V}from"./_plugin-vue_export-helper-c27b6911.js";const B=["element-loading-text"],E=["src"],L=l({name:"FrameView"}),b=l({...L,setup(D){var f,m,_;const{t:u}=v(),r=n(!0),t=g(),c=n(""),i=n(null);(f=e(t.meta))!=null&&f.frameSrc&&(c.value=(m=e(t.meta))==null?void 0:m.frameSrc),((_=e(t.meta))==null?void 0:_.frameLoading)===!1&&o();function o(){r.value=!1}function d(){S(()=>{const a=e(i);if(!a)return;const s=a;s.attachEvent?s.attachEvent("onload",()=>{o()}):a.onload=()=>{o()}})}return h(()=>{d()}),(a,s)=>{const p=x("loading");return k((w(),y("div",{class:"frame","element-loading-text":e(u)("status.hsLoad")},[R("iframe",{src:c.value,class:"frame-iframe",ref_key:"frameRef",ref:i},null,8,E)],8,B)),[[p,r.value]])}}});const F=V(b,[["__scopeId","data-v-8f8c8b9e"]]);export{F as default};
