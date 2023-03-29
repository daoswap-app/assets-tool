import{J as ee,f as te,l as G,z as g,n as V,K as ne,A as oe,m as I,j as ae,L as ue}from"./index-dd8ad2b3.js";import{d as le,u as se}from"./vue-router-935545c9.js";import{e as z}from"./mitt-7f99bbc0.js";import{O as L,s as c,p as re,t as N}from"./i18n-c677edf9.js";import{u as ie}from"./onboard-b9e738ca.js";import{e as d,w as de,y as x,z as H,A as y,r as D}from"./runtime-core.esm-bundler-c80a0204.js";import{u as W}from"./vue-i18n.runtime.esm-bundler-d653d868.js";function fe(){const{$storage:t,$config:e}=L(),o=()=>{ee().multiTagsCache&&(!t.tags||t.tags.length===0)&&(t.tags=te),t.locale||(t.locale={locale:(e==null?void 0:e.Locale)??"zh"},W().locale.value=(e==null?void 0:e.Locale)??"zh"),t.layout||(t.layout={layout:(e==null?void 0:e.Layout)??"vertical",theme:(e==null?void 0:e.Theme)??"default",darkMode:(e==null?void 0:e.DarkMode)??!1,sidebarStatus:(e==null?void 0:e.SidebarStatus)??!0,epThemeColor:(e==null?void 0:e.EpThemeColor)??"#409EFF"}),t.configure||(t.configure={grey:(e==null?void 0:e.Grey)??!1,weak:(e==null?void 0:e.Weak)??!1,hideTabs:(e==null?void 0:e.HideTabs)??!1,showLogo:(e==null?void 0:e.ShowLogo)??!0,showModel:(e==null?void 0:e.ShowModel)??"smart",multiTagsCache:(e==null?void 0:e.MultiTagsCache)??!1})},n=d(()=>t==null?void 0:t.layout.layout),u=d(()=>t.layout);return{layout:n,layoutTheme:u,initStorage:o}}const ce=G({id:"pure-app",state:()=>{var t,e;return{sidebar:{opened:((t=c().getItem("responsive-layout"))==null?void 0:t.sidebarStatus)??g().SidebarStatus,withoutAnimation:!1,isClickCollapse:!1},layout:((e=c().getItem("responsive-layout"))==null?void 0:e.layout)??g().Layout,device:re()?"mobile":"desktop"}},getters:{getSidebarStatus(){return this.sidebar.opened},getDevice(){return this.device}},actions:{TOGGLE_SIDEBAR(t,e){const o=c().getItem("responsive-layout");t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!0,o.sidebarStatus=!0):!t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!1,o.sidebarStatus=!1):!t&&!e&&(this.sidebar.withoutAnimation=!1,this.sidebar.opened=!this.sidebar.opened,this.sidebar.isClickCollapse=!this.sidebar.opened,o.sidebarStatus=this.sidebar.opened),c().setItem("responsive-layout",o)},async toggleSideBar(t,e){await this.TOGGLE_SIDEBAR(t,e)},toggleDevice(t){this.device=t},setLayout(t){this.layout=t}}});function me(){return ce(V)}const he=G({id:"pure-epTheme",state:()=>{var t,e;return{epThemeColor:((t=c().getItem("responsive-layout"))==null?void 0:t.epThemeColor)??g().EpThemeColor,epTheme:((e=c().getItem("responsive-layout"))==null?void 0:e.theme)??g().Theme}},getters:{getEpThemeColor(){return this.epThemeColor},fill(){return this.epTheme==="light"?"#409eff":this.epTheme==="yellow"?"#d25f00":"#fff"}},actions:{setEpThemeColor(t){const e=c().getItem("responsive-layout");this.epTheme=e==null?void 0:e.theme,this.epThemeColor=t,e&&(e.epThemeColor=t,c().setItem("responsive-layout",e))}}});function C(){return he(V)}const P="当前路由配置不正确，请检查配置";function pe(){var _;const t=me(),e=le().options.routes,{wholeMenus:o}=ne(oe()),n=((_=g())==null?void 0:_.TooltipEffect)??"light",u=d(()=>{var a;return(a=I())==null?void 0:a.username}),r=d(()=>(a,i)=>({background:a===i?C().epThemeColor:"",color:a===i?"#f4f4f5":"#000"})),f=d(()=>(a,i)=>a===i?"":"dark:hover:!text-primary"),v=d(()=>u.value?{marginRight:"10px"}:""),m=d(()=>!t.getSidebarStatus),M=d(()=>t.getDevice),{$storage:h,$config:s}=L(),l=d(()=>{var a;return(a=h==null?void 0:h.layout)==null?void 0:a.layout}),p=d(()=>s.Title);function B(a){const i=g().Title;i?document.title=`${N(a.title)} | ${i}`:document.title=N(a.title)}function S(){ie().disconnectWallet(),I().logOut()}function U(){ae.push("/welcome")}function J(){z.emit("openPanel")}function K(){t.toggleSideBar()}function q(a){a==null||a.handleResize()}function X(a){var $;if(!a.children)return console.error(P);const i=/^http(s?):\/\//,b=($=a.children[0])==null?void 0:$.path;return i.test(b)?a.path+"/"+b:b}function Y(a,i){if(o.value.length===0||Z(a))return;let b="";const $=a.lastIndexOf("/");$>0&&(b=a.slice(0,$));function k(w,E){return E?E.map(T=>{T.path===w?T.redirect?k(T.redirect,T.children):z.emit("changLayoutRoute",{indexPath:w,parentPath:b}):T.children&&k(w,T.children)}):console.error(P)}k(a,i)}function Z(a){return ue.includes(a)}return{title:p,device:M,layout:l,logout:S,routers:e,$storage:h,backHome:U,onPanel:J,changeTitle:B,toggleSideBar:K,menuSelect:Y,handleResize:q,resolvePath:X,isCollapse:m,pureApp:t,username:u,avatarsStyle:v,tooltipEffect:n,getDropdownItemStyle:r,getDropdownItemClass:f}}function Ge(t){const{$storage:e,changeTitle:o,handleResize:n}=pe(),{locale:u,t:r}=W(),f=se();function v(){e.locale={locale:"zh"},u.value="zh",t&&n(t.value)}function m(){e.locale={locale:"en"},u.value="en",t&&n(t.value)}return de(()=>u.value,()=>{o(f.meta)}),{t:r,route:f,locale:u,translationCh:v,translationEn:m}}const ge={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em","aria-hidden":"true",class:"globalization",viewBox:"0 0 512 512"},ve=y("path",{fill:"currentColor",d:"m478.33 433.6-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362 368 281.65 401.17 362zm-66.99-19.08a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73 39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93.92 1.19 1.83 2.35 2.74 3.51-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59 22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z"},null,-1),be=[ve];function Te(t,e){return x(),H("svg",ge,be)}const Ve={render:Te},We={width:1024,height:1024,body:'<path fill="currentColor" d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256l512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"/>'},A={outputDir:"",defaultScopeName:"",includeStyleWithColors:[],extract:!0,themeLinkTagId:"theme-link-tag",themeLinkTagInjectTo:"head",removeCssScopeName:!1,customThemeCssFileName:null,arbitraryMode:!1,defaultPrimaryColor:"",customThemeOutputPath:"/Users/blues/Workspaces/DaoswapDex/daoswapapp/assets-tool/node_modules/.pnpm/@pureadmin+theme@3.0.0/node_modules/@pureadmin/theme/setCustomTheme.js",styleTagId:"custom-theme-tagid",InjectDefaultStyleTagToHtml:!0,hueDiffControls:{low:0,high:0},multipleScopeVars:[{scopeName:"layout-theme-default",varsContent:`
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
      `}]},$e="/",ye="assets";function F(t){let e=t.replace("#","").match(/../g);for(let o=0;o<3;o++)e[o]=parseInt(e[o],16);return e}function Q(t,e,o){let n=[t.toString(16),e.toString(16),o.toString(16)];for(let u=0;u<3;u++)n[u].length==1&&(n[u]=`0${n[u]}`);return`#${n.join("")}`}function Ce(t,e){let o=F(t);for(let n=0;n<3;n++)o[n]=Math.floor(o[n]*(1-e));return Q(o[0],o[1],o[2])}function Me(t,e){let o=F(t);for(let n=0;n<3;n++)o[n]=Math.floor((255-o[n])*e+o[n]);return Q(o[0],o[1],o[2])}function R(t){return`(^${t}\\s+|\\s+${t}\\s+|\\s+${t}$|^${t}$)`}function O({scopeName:t,multipleScopeVars:e}){const o=Array.isArray(e)&&e.length?e:A.multipleScopeVars;let n=document.documentElement.className;new RegExp(R(t)).test(n)||(o.forEach(u=>{n=n.replace(new RegExp(R(u.scopeName),"g"),` ${t} `)}),document.documentElement.className=n.replace(/(^\s+|\s+$)/g,""))}function j({id:t,href:e}){const o=document.createElement("link");return o.rel="stylesheet",o.href=e,o.id=t,o}function Be(t){const e={scopeName:"theme-default",customLinkHref:r=>r,...t},o=e.themeLinkTagId||A.themeLinkTagId;let n=document.getElementById(o);const u=e.customLinkHref(`${$e.replace(/\/$/,"")}${`/${ye}/${e.scopeName}.css`.replace(/\/+(?=\/)/g,"")}`);if(n){n.id=`${o}_old`;const r=j({id:o,href:u});n.nextSibling?n.parentNode.insertBefore(r,n.nextSibling):n.parentNode.appendChild(r),r.onload=()=>{setTimeout(()=>{n.parentNode.removeChild(n),n=null},60),O(e)};return}n=j({id:o,href:u}),O(e),document[(e.themeLinkTagInjectTo||A.themeLinkTagInjectTo||"").replace("-prepend","")].appendChild(n)}function Fe(){var h;const{layoutTheme:t,layout:e}=fe(),o=D([{color:"#1b2a47",themeColor:"default"},{color:"#ffffff",themeColor:"light"},{color:"#f5222d",themeColor:"dusk"},{color:"#fa541c",themeColor:"volcano"},{color:"#fadb14",themeColor:"yellow"},{color:"#13c2c2",themeColor:"mingQing"},{color:"#52c41a",themeColor:"auroraGreen"},{color:"#eb2f96",themeColor:"pink"},{color:"#722ed1",themeColor:"saucePurple"}]),{$storage:n}=L(),u=D((h=n==null?void 0:n.layout)==null?void 0:h.darkMode),r=document.documentElement;function f(s="default"){var l,p;if(t.value.theme=s,Be({scopeName:`layout-theme-${s}`}),n.layout={layout:e.value,theme:s,darkMode:u.value,sidebarStatus:(l=n.layout)==null?void 0:l.sidebarStatus,epThemeColor:(p=n.layout)==null?void 0:p.epThemeColor},s==="default"||s==="light")m(g().EpThemeColor);else{const B=o.value.find(S=>S.themeColor===s);m(B.color)}}function v(s,l,p){document.documentElement.style.setProperty(`--el-color-primary-${s}-${l}`,u.value?Ce(p,l/10):Me(p,l/10))}const m=s=>{C().setEpThemeColor(s),document.documentElement.style.setProperty("--el-color-primary",s);for(let l=1;l<=2;l++)v("dark",l,s);for(let l=1;l<=9;l++)v("light",l,s)};function M(){C().epTheme==="light"&&u.value?f("default"):f(C().epTheme),u.value?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}return{body:r,dataTheme:u,layoutTheme:t,themeColors:o,dataThemeChange:M,setEpThemeColor:m,setLayoutThemeColor:f}}const Se={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},ke=y("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),we=y("path",{d:"M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"},null,-1),Ae=[ke,we];function Le(t,e){return x(),H("svg",Se,Ae)}const Qe={render:Le},xe={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},He=y("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),_e=y("path",{d:"M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"},null,-1),Ee=[He,_e];function Ie(t,e){return x(),H("svg",xe,Ee)}const Ue={render:Ie};export{pe as a,Fe as b,me as c,We as d,Qe as e,Ue as f,Ve as g,fe as h,Be as t,Ge as u};
