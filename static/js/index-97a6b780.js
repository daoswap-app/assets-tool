import{j as u,v as B,G as V}from"./index-079d1153.js";import{i as b}from"./i18n-d274a306.js";import{h as _,a as w,r as x,a3 as a,j as i,v as S,x as t,D as s,q as m,u as p,B as P,l as d,C as j,k as z,F as N,X as U}from"./runtime-core.esm-bundler-f67957fc.js";import"./preload-helper-101896b7.js";import"./__vite-browser-external-c2c4480c.js";import"./index-5342a498.js";import"./vue-router-048c6826.js";import"./___vite-browser-external_commonjs-proxy-66fe83c2.js";import"./vue-i18n.runtime.esm-bundler-4810931d.js";const D={class:"card-header"},F=_({name:"PermissionPage"}),J=_({...F,setup(H){var n;const l=w(()=>({width:"85vw",justifyContent:"start"})),o=x((n=u())==null?void 0:n.username),f=[{value:"admin",label:"管理员角色"},{value:"common",label:"普通角色"}];function v(){u().loginByUsername({username:o.value,password:"admin123"}).then(r=>{r.success&&(b().removeItem("async-routes"),B().clearAllCachePage(),V())})}return(r,c)=>{const y=a("el-tag"),g=a("el-option"),h=a("el-select"),k=a("el-card"),C=a("el-space");return i(),S(C,{direction:"vertical",size:"large"},{default:t(()=>[s(y,{style:m(p(l)),size:"large",effect:"dark"},{default:t(()=>[P(" 模拟后台根据不同角色返回对应路由（具体参考完整版pure-admin代码） ")]),_:1},8,["style"]),s(k,{shadow:"never",style:m(p(l))},{header:t(()=>[d("div",D,[d("span",null,"当前角色："+j(o.value),1)])]),default:t(()=>[s(h,{modelValue:o.value,"onUpdate:modelValue":c[0]||(c[0]=e=>o.value=e),onChange:v},{default:t(()=>[(i(),z(N,null,U(f,e=>s(g,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1},8,["style"])]),_:1})}}});export{J as default};
