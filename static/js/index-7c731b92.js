import{i as Q,k as $,n as q,t as C,l as A,m as F,o as R,p as B,q as L}from"./index-079d1153.js";import{w as y,r as m,a as W,g as j}from"./runtime-core.esm-bundler-f67957fc.js";function g(e){var t;const n=F(e);return(t=n==null?void 0:n.$el)!=null?t:n}const w=Q?window:void 0,V=Q?window.document:void 0;function h(...e){let t,n,s,o;if($(e[0])||Array.isArray(e[0])?([n,s,o]=e,t=w):[t,n,s,o]=e,!t)return q;Array.isArray(n)||(n=[n]),Array.isArray(s)||(s=[s]);const a=[],r=()=>{a.forEach(d=>d()),a.length=0},l=(d,b,c)=>(d.addEventListener(b,c,o),()=>d.removeEventListener(b,c,o)),f=y(()=>g(t),d=>{r(),d&&a.push(...n.flatMap(b=>s.map(c=>l(d,b,c))))},{immediate:!0,flush:"post"}),p=()=>{f(),r()};return C(p),p}function se(e,t,n={}){const{window:s=w,ignore:o,capture:a=!0,detectIframe:r=!1}=n;if(!s)return;let l=!0,f;const p=u=>{s.clearTimeout(f);const i=g(e);if(!(!i||i===u.target||u.composedPath().includes(i))){if(!l){l=!0;return}t(u)}},d=u=>o&&o.some(i=>{const v=g(i);return v&&(u.target===v||u.composedPath().includes(v))}),b=[h(s,"click",p,{passive:!0,capture:a}),h(s,"pointerdown",u=>{const i=g(e);i&&(l=!u.composedPath().includes(i)&&!d(u))},{passive:!0}),h(s,"pointerup",u=>{if(u.button===0){const i=u.composedPath();u.composedPath=()=>i,f=s.setTimeout(()=>p(u),50)}},{passive:!0}),r&&h(s,"blur",u=>{var i;const v=g(e);((i=s.document.activeElement)==null?void 0:i.tagName)==="IFRAME"&&!(v!=null&&v.contains(s.document.activeElement))&&t(u)})].filter(Boolean);return()=>b.forEach(u=>u())}function M(e,t=!1){const n=m(),s=()=>n.value=Boolean(e());return s(),R(s,t),n}function H(e){return JSON.parse(JSON.stringify(e))}const I=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},P="__vueuse_ssr_handlers__";I[P]=I[P]||{};I[P];function re(e,t,{window:n=w,initialValue:s=""}={}){const o=m(s),a=W(()=>{var r;return g(t)||((r=n==null?void 0:n.document)==null?void 0:r.documentElement)});return y([a,()=>F(e)],([r,l])=>{var f;if(r&&n){const p=(f=n.getComputedStyle(r).getPropertyValue(l))==null?void 0:f.trim();o.value=p||s}},{immediate:!0}),y(o,r=>{var l;(l=a.value)!=null&&l.style&&a.value.style.setProperty(F(e),r)}),o}function le({document:e=V}={}){if(!e)return m("visible");const t=m(e.visibilityState);return h(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var x=Object.getOwnPropertySymbols,U=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable,J=(e,t)=>{var n={};for(var s in e)U.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(e!=null&&x)for(var s of x(e))t.indexOf(s)<0&&D.call(e,s)&&(n[s]=e[s]);return n};function G(e,t,n={}){const s=n,{window:o=w}=s,a=J(s,["window"]);let r;const l=M(()=>o&&"ResizeObserver"in o),f=()=>{r&&(r.disconnect(),r=void 0)},p=y(()=>g(e),b=>{f(),l.value&&o&&b&&(r=new ResizeObserver(t),r.observe(b,a))},{immediate:!0,flush:"post"}),d=()=>{f(),p()};return C(d),{isSupported:l,stop:d}}function ue(e,t={}){const{reset:n=!0,windowResize:s=!0,windowScroll:o=!0,immediate:a=!0}=t,r=m(0),l=m(0),f=m(0),p=m(0),d=m(0),b=m(0),c=m(0),u=m(0);function i(){const v=g(e);if(!v){n&&(r.value=0,l.value=0,f.value=0,p.value=0,d.value=0,b.value=0,c.value=0,u.value=0);return}const O=v.getBoundingClientRect();r.value=O.height,l.value=O.bottom,f.value=O.left,p.value=O.right,d.value=O.top,b.value=O.width,c.value=O.x,u.value=O.y}return G(e,i),y(()=>g(e),v=>!v&&i()),o&&h("scroll",i,{passive:!0}),s&&h("resize",i,{passive:!0}),R(()=>{a&&i()}),{height:r,bottom:l,left:f,right:p,top:d,width:b,x:c,y:u,update:i}}const N=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]];function ie(e,t={}){const{document:n=V,autoExit:s=!1}=t,o=e||(n==null?void 0:n.querySelector("html")),a=m(!1);let r=N[0];const l=M(()=>{if(n){for(const v of N)if(v[1]in n)return r=v,!0}else return!1;return!1}),[f,p,d,,b]=r;async function c(){l.value&&(n!=null&&n[d]&&await n[p](),a.value=!1)}async function u(){if(!l.value)return;await c();const v=g(o);v&&(await v[f](),a.value=!0)}async function i(){a.value?await c():await u()}return n&&h(n,b,()=>{a.value=!!(n!=null&&n[d])},!1),s&&C(c),{isSupported:l,isFullscreen:a,enter:u,exit:c,toggle:i}}var z;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(z||(z={}));var K=Object.defineProperty,T=Object.getOwnPropertySymbols,X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable,k=(e,t,n)=>t in e?K(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Z=(e,t)=>{for(var n in t||(t={}))X.call(t,n)&&k(e,n,t[n]);if(T)for(var n of T(t))Y.call(t,n)&&k(e,n,t[n]);return e};const ee={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};Z({linear:A},ee);function oe(e,t,n,s={}){var o,a,r;const{clone:l=!1,passive:f=!1,eventName:p,deep:d=!1,defaultValue:b}=s,c=j(),u=n||(c==null?void 0:c.emit)||((o=c==null?void 0:c.$emit)==null?void 0:o.bind(c))||((r=(a=c==null?void 0:c.proxy)==null?void 0:a.$emit)==null?void 0:r.bind(c==null?void 0:c.proxy));let i=p;t||(t="modelValue"),i=p||i||`update:${t.toString()}`;const v=E=>l?B(l)?l(E):H(E):E,O=()=>L(e[t])?v(e[t]):b;if(f){const E=O(),S=m(E);return y(()=>e[t],_=>S.value=v(_)),y(S,_=>{(_!==e[t]||d)&&u(i,_)},{deep:d}),S}else return W({get(){return O()},set(E){u(i,E)}})}function ae({window:e=w}={}){if(!e)return m(!1);const t=m(e.document.hasFocus());return h(e,"blur",()=>{t.value=!1}),h(e,"focus",()=>{t.value=!0}),t}function ce(e={}){const{window:t=w,initialWidth:n=1/0,initialHeight:s=1/0,listenOrientation:o=!0,includeScrollbar:a=!0}=e,r=m(n),l=m(s),f=()=>{t&&(a?(r.value=t.innerWidth,l.value=t.innerHeight):(r.value=t.document.documentElement.clientWidth,l.value=t.document.documentElement.clientHeight))};return f(),R(f),h("resize",f,{passive:!0}),o&&h("orientationchange",f,{passive:!0}),{width:r,height:l}}export{ce as a,ue as b,h as c,G as d,re as e,le as f,ae as g,oe as h,ie as i,se as o,g as u};
