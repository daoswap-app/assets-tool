import{u,i as C,w as V}from"./index-a318ffbc.js";import{k as b}from"./___vite-browser-external_commonjs-proxy-76af39aa.js";import{x as _,e as x,r as B,a7 as a,y as i,H as P,I as t,P as s,E as m,u as d,M as S,A as p,O as z,z as H,F as N,a0 as U}from"./runtime-core.esm-bundler-c80a0204.js";import"./vue-router-935545c9.js";import"./index-83b979c8.js";import"./vue-i18n.runtime.esm-bundler-d653d868.js";const A={class:"card-header"},E=_({name:"PermissionPage"}),R=_({...E,setup(F){var n;const l=x(()=>({width:"85vw",justifyContent:"start"})),o=B((n=u())==null?void 0:n.username),f=[{value:"admin",label:"管理员角色"},{value:"common",label:"普通角色"}];function v(){u().loginByUsername({username:o.value,password:"admin123"}).then(r=>{r.success&&(b().removeItem("async-routes"),C().clearAllCachePage(),V())})}return(r,c)=>{const y=a("el-tag"),g=a("el-option"),h=a("el-select"),k=a("el-card"),w=a("el-space");return i(),P(w,{direction:"vertical",size:"large"},{default:t(()=>[s(y,{style:m(d(l)),size:"large",effect:"dark"},{default:t(()=>[S(" 模拟后台根据不同角色返回对应路由（具体参考完整版pure-admin代码） ")]),_:1},8,["style"]),s(k,{shadow:"never",style:m(d(l))},{header:t(()=>[p("div",A,[p("span",null,"当前角色："+z(o.value),1)])]),default:t(()=>[s(h,{modelValue:o.value,"onUpdate:modelValue":c[0]||(c[0]=e=>o.value=e),onChange:v},{default:t(()=>[(i(),H(N,null,U(f,e=>s(g,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1},8,["style"])]),_:1})}}});export{R as default};
