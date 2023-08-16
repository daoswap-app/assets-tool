import{q as ee,r as te,c as j,f as g,e as W,t as ne,i as oe,u as ae,a as ue,v as le}from"./index-2be9993c.js";import{d as se,u as re}from"./vue-router-935545c9.js";import{e as I}from"./mitt-7f99bbc0.js";import{V as L,s as c,Y as ie,E as z}from"./___vite-browser-external_commonjs-proxy-7f1f402a.js";import{u as N}from"./web3Modal-9b2051b7.js";import{e as d,w as de,y as x,z as H,A as y,r as D}from"./runtime-core.esm-bundler-c80a0204.js";import{u as V}from"./vue-i18n.runtime.esm-bundler-d653d868.js";function fe(){const{$storage:t,$config:e}=L(),n=()=>{ee().multiTagsCache&&(!t.tags||t.tags.length===0)&&(t.tags=te),t.locale||(t.locale={locale:(e==null?void 0:e.Locale)??"zh"},V().locale.value=(e==null?void 0:e.Locale)??"zh"),t.layout||(t.layout={layout:(e==null?void 0:e.Layout)??"vertical",theme:(e==null?void 0:e.Theme)??"default",darkMode:(e==null?void 0:e.DarkMode)??!1,sidebarStatus:(e==null?void 0:e.SidebarStatus)??!0,epThemeColor:(e==null?void 0:e.EpThemeColor)??"#409EFF"}),t.configure||(t.configure={grey:(e==null?void 0:e.Grey)??!1,weak:(e==null?void 0:e.Weak)??!1,hideTabs:(e==null?void 0:e.HideTabs)??!1,showLogo:(e==null?void 0:e.ShowLogo)??!0,showModel:(e==null?void 0:e.ShowModel)??"smart",multiTagsCache:(e==null?void 0:e.MultiTagsCache)??!1})},o=d(()=>t==null?void 0:t.layout.layout),a=d(()=>t.layout);return{layout:o,layoutTheme:a,initStorage:n}}const ce=j({id:"pure-app",state:()=>{var t,e;return{sidebar:{opened:((t=c().getItem("responsive-layout"))==null?void 0:t.sidebarStatus)??g().SidebarStatus,withoutAnimation:!1,isClickCollapse:!1},layout:((e=c().getItem("responsive-layout"))==null?void 0:e.layout)??g().Layout,device:ie()?"mobile":"desktop"}},getters:{getSidebarStatus(){return this.sidebar.opened},getDevice(){return this.device}},actions:{TOGGLE_SIDEBAR(t,e){const n=c().getItem("responsive-layout");t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!0,n.sidebarStatus=!0):!t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!1,n.sidebarStatus=!1):!t&&!e&&(this.sidebar.withoutAnimation=!1,this.sidebar.opened=!this.sidebar.opened,this.sidebar.isClickCollapse=!this.sidebar.opened,n.sidebarStatus=this.sidebar.opened),c().setItem("responsive-layout",n)},async toggleSideBar(t,e){await this.TOGGLE_SIDEBAR(t,e)},toggleDevice(t){this.device=t},setLayout(t){this.layout=t}}});function me(){return ce(W)}const he=j({id:"pure-epTheme",state:()=>{var t,e;return{epThemeColor:((t=c().getItem("responsive-layout"))==null?void 0:t.epThemeColor)??g().EpThemeColor,epTheme:((e=c().getItem("responsive-layout"))==null?void 0:e.theme)??g().Theme}},getters:{getEpThemeColor(){return this.epThemeColor},fill(){return this.epTheme==="light"?"#409eff":this.epTheme==="yellow"?"#d25f00":"#fff"}},actions:{setEpThemeColor(t){const e=c().getItem("responsive-layout");this.epTheme=e==null?void 0:e.theme,this.epThemeColor=t,e&&(e.epThemeColor=t,c().setItem("responsive-layout",e))}}});function C(){return he(W)}const pe=(t,e,n)=>t?t.slice(0,e??6)+"..."+t.slice(-n):null,P="当前路由配置不正确，请检查配置";function ge(){var _;const t=me(),e=se().options.routes,{wholeMenus:n}=ne(oe()),o=((_=g())==null?void 0:_.TooltipEffect)??"light",a=d(()=>pe(N().getWalletAddress,6,4)),r=d(()=>(u,i)=>({background:u===i?C().epThemeColor:"",color:u===i?"#f4f4f5":"#000"})),f=d(()=>(u,i)=>u===i?"":"dark:hover:!text-primary"),v=d(()=>a.value?{marginRight:"10px"}:""),m=d(()=>!t.getSidebarStatus),M=d(()=>t.getDevice),{$storage:h,$config:s}=L(),l=d(()=>{var u;return(u=h==null?void 0:h.layout)==null?void 0:u.layout}),p=d(()=>s.Title);function B(u){const i=g().Title;i?document.title=`${z(u.title)} | ${i}`:document.title=z(u.title)}function S(){N().disconnectWallet(),ae().logOut()}function U(){ue.push("/welcome")}function q(){I.emit("openPanel")}function Y(){t.toggleSideBar()}function J(u){u==null||u.handleResize()}function K(u){var $;if(!u.children)return console.error(P);const i=/^http(s?):\/\//,b=($=u.children[0])==null?void 0:$.path;return i.test(b)?u.path+"/"+b:b}function X(u,i){if(n.value.length===0||Z(u))return;let b="";const $=u.lastIndexOf("/");$>0&&(b=u.slice(0,$));function k(w,E){return E?E.map(T=>{T.path===w?T.redirect?k(T.redirect,T.children):I.emit("changLayoutRoute",{indexPath:w,parentPath:b}):T.children&&k(w,T.children)}):console.error(P)}k(u,i)}function Z(u){return le.includes(u)}return{title:p,device:M,layout:l,logout:S,routers:e,$storage:h,backHome:U,onPanel:q,changeTitle:B,toggleSideBar:Y,menuSelect:X,handleResize:J,resolvePath:K,isCollapse:m,pureApp:t,username:a,avatarsStyle:v,tooltipEffect:o,getDropdownItemStyle:r,getDropdownItemClass:f}}function We(t){const{$storage:e,changeTitle:n,handleResize:o}=ge(),{locale:a,t:r}=V(),f=re();function v(){e.locale={locale:"zh"},a.value="zh",t&&o(t.value)}function m(){e.locale={locale:"en"},a.value="en",t&&o(t.value)}return de(()=>a.value,()=>{n(f.meta)}),{t:r,route:f,locale:a,translationCh:v,translationEn:m}}const ve={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em","aria-hidden":"true",class:"globalization",viewBox:"0 0 512 512"},be=y("path",{fill:"currentColor",d:"m478.33 433.6-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362 368 281.65 401.17 362zm-66.99-19.08a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73 39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93.92 1.19 1.83 2.35 2.74 3.51-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59 22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z"},null,-1),Te=[be];function $e(t,e){return x(),H("svg",ve,Te)}const Ve={render:$e},Fe={width:1024,height:1024,body:'<path fill="currentColor" d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256l512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"/>'},A={outputDir:"",defaultScopeName:"",includeStyleWithColors:[],extract:!0,themeLinkTagId:"theme-link-tag",themeLinkTagInjectTo:"head",removeCssScopeName:!1,customThemeCssFileName:null,arbitraryMode:!1,defaultPrimaryColor:"",customThemeOutputPath:"/Users/blues/Workspaces/DaoswapDex/daoswapapp/assets-tool/node_modules/.pnpm/@pureadmin+theme@3.0.0/node_modules/@pureadmin/theme/setCustomTheme.js",styleTagId:"custom-theme-tagid",InjectDefaultStyleTagToHtml:!0,hueDiffControls:{low:0,high:0},multipleScopeVars:[{scopeName:"layout-theme-default",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #001529 !default;
        $menuHover: #4091f7 !default;
        $subMenuBg: #0f0303 !default;
        $subMenuActiveBg: #4091f7 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #002140 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-light",varsContent:`
        $subMenuActiveText: #409eff !default;
        $menuBg: #fff !default;
        $menuHover: #e0ebf6 !default;
        $subMenuBg: #fff !default;
        $subMenuActiveBg: #e0ebf6 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #fff !default;
        $menuTitleHover: #000 !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-dusk",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2a0608 !default;
        $menuHover: #e13c39 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #e13c39 !default;
        $menuText: rgb(254 254 254 / 65.1%) !default;
        $sidebarLogo: #42090c !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e13c39 !default;
      `},{scopeName:"layout-theme-volcano",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2b0e05 !default;
        $menuHover: #e85f33 !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #e85f33 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #441708 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e85f33 !default;
      `},{scopeName:"layout-theme-yellow",varsContent:`
        $subMenuActiveText: #d25f00 !default;
        $menuBg: #2b2503 !default;
        $menuHover: #f6da4d !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #f6da4d !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #443b05 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #f6da4d !default;
      `},{scopeName:"layout-theme-mingQing",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #032121 !default;
        $menuHover: #59bfc1 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #59bfc1 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #053434 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #59bfc1 !default;
      `},{scopeName:"layout-theme-auroraGreen",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #0b1e15 !default;
        $menuHover: #60ac80 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #60ac80 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #112f21 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #60ac80 !default;
      `},{scopeName:"layout-theme-pink",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #28081a !default;
        $menuHover: #d84493 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #d84493 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #3f0d29 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #d84493 !default;
      `},{scopeName:"layout-theme-saucePurple",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #130824 !default;
        $menuHover: #693ac9 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #693ac9 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #1f0c38 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #693ac9 !default;
      `}]},ye="/",Ce="assets";function F(t){let e=t.replace("#","").match(/../g);for(let n=0;n<3;n++)e[n]=parseInt(e[n],16);return e}function Q(t,e,n){let o=[t.toString(16),e.toString(16),n.toString(16)];for(let a=0;a<3;a++)o[a].length==1&&(o[a]=`0${o[a]}`);return`#${o.join("")}`}function Me(t,e){let n=F(t);for(let o=0;o<3;o++)n[o]=Math.floor(n[o]*(1-e));return Q(n[0],n[1],n[2])}function Be(t,e){let n=F(t);for(let o=0;o<3;o++)n[o]=Math.floor((255-n[o])*e+n[o]);return Q(n[0],n[1],n[2])}function R(t){return`(^${t}\\s+|\\s+${t}\\s+|\\s+${t}$|^${t}$)`}function G({scopeName:t,multipleScopeVars:e}){const n=Array.isArray(e)&&e.length?e:A.multipleScopeVars;let o=document.documentElement.className;new RegExp(R(t)).test(o)||(n.forEach(a=>{o=o.replace(new RegExp(R(a.scopeName),"g"),` ${t} `)}),document.documentElement.className=o.replace(/(^\s+|\s+$)/g,""))}function O({id:t,href:e}){const n=document.createElement("link");return n.rel="stylesheet",n.href=e,n.id=t,n}function Se(t){const e={scopeName:"theme-default",customLinkHref:r=>r,...t},n=e.themeLinkTagId||A.themeLinkTagId;let o=document.getElementById(n);const a=e.customLinkHref(`${ye.replace(/\/$/,"")}${`/${Ce}/${e.scopeName}.css`.replace(/\/+(?=\/)/g,"")}`);if(o){o.id=`${n}_old`;const r=O({id:n,href:a});o.nextSibling?o.parentNode.insertBefore(r,o.nextSibling):o.parentNode.appendChild(r),r.onload=()=>{setTimeout(()=>{o.parentNode.removeChild(o),o=null},60),G(e)};return}o=O({id:n,href:a}),G(e),document[(e.themeLinkTagInjectTo||A.themeLinkTagInjectTo||"").replace("-prepend","")].appendChild(o)}function Qe(){var h;const{layoutTheme:t,layout:e}=fe(),n=D([{color:"#1b2a47",themeColor:"default"},{color:"#ffffff",themeColor:"light"},{color:"#f5222d",themeColor:"dusk"},{color:"#fa541c",themeColor:"volcano"},{color:"#fadb14",themeColor:"yellow"},{color:"#13c2c2",themeColor:"mingQing"},{color:"#52c41a",themeColor:"auroraGreen"},{color:"#eb2f96",themeColor:"pink"},{color:"#722ed1",themeColor:"saucePurple"}]),{$storage:o}=L(),a=D((h=o==null?void 0:o.layout)==null?void 0:h.darkMode),r=document.documentElement;function f(s="default"){var l,p;if(t.value.theme=s,Se({scopeName:`layout-theme-${s}`}),o.layout={layout:e.value,theme:s,darkMode:a.value,sidebarStatus:(l=o.layout)==null?void 0:l.sidebarStatus,epThemeColor:(p=o.layout)==null?void 0:p.epThemeColor},s==="default"||s==="light")m(g().EpThemeColor);else{const B=n.value.find(S=>S.themeColor===s);m(B.color)}}function v(s,l,p){document.documentElement.style.setProperty(`--el-color-primary-${s}-${l}`,a.value?Me(p,l/10):Be(p,l/10))}const m=s=>{C().setEpThemeColor(s),document.documentElement.style.setProperty("--el-color-primary",s);for(let l=1;l<=2;l++)v("dark",l,s);for(let l=1;l<=9;l++)v("light",l,s)};function M(){C().epTheme==="light"&&a.value?f("default"):f(C().epTheme),a.value?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}return{body:r,dataTheme:a,layoutTheme:t,themeColors:n,dataThemeChange:M,setEpThemeColor:m,setLayoutThemeColor:f}}const ke={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},we=y("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),Ae=y("path",{d:"M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"},null,-1),Le=[we,Ae];function xe(t,e){return x(),H("svg",ke,Le)}const Ue={render:xe},He={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},_e=y("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),Ee=y("path",{d:"M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"},null,-1),Ie=[_e,Ee];function ze(t,e){return x(),H("svg",He,Ie)}const qe={render:ze};export{ge as a,Qe as b,me as c,Fe as d,Ue as e,qe as f,Ve as g,fe as h,Se as t,We as u};
