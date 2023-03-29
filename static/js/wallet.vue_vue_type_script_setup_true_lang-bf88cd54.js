import{t as p,w as ae,v as K}from"./i18n-c677edf9.js";import ne from"./Card-975b48cd.js";import{c as oe,i as re}from"./addresses-c9475005.js";import{u as Q}from"./web3Modal-7484dbf1.js";import{g as q,u as N,M as se}from"./web3-ed59ec2e.js";import{a as X}from"./chains-54826113.js";import{x as G,r as v,o as Z,w as M,a7 as u,y as w,H as z,I as a,P as t,M as h,O as V,u as f,z as x,a0 as J,F as B,L as ee,aa as ue,A as ie,J as $,S as Y}from"./runtime-core.esm-bundler-c80a0204.js";import{u as de}from"./hooks-51d06512.js";const te={[X.localhost]:"0x31B48B6484c7D93f43a3838652A86b18740E37C6",[X.bnbt]:"0x28A98E363D777c943EBA7bBc384046332643f908"},le=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"sender",type:"address"},{indexed:!1,internalType:"string",name:"name",type:"string"}],name:"eventCreateWallet",type:"event"},{inputs:[{internalType:"string",name:"_name",type:"string"},{internalType:"address[]",name:"_owners",type:"address[]"},{internalType:"uint256",name:"_required",type:"uint256"}],name:"createWallet",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"getAllWallet",outputs:[{internalType:"address[]",name:"",type:"address[]"}],stateMutability:"view",type:"function"},{inputs:[],name:"getWalletList",outputs:[{components:[{internalType:"string",name:"name",type:"string"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"ownerCount",type:"uint256"},{internalType:"uint256",name:"threshold",type:"uint256"},{internalType:"address[]",name:"owners",type:"address[]"}],internalType:"struct Wallet.WalletItem[]",name:"walletList",type:"tuple[]"}],stateMutability:"nonpayable",type:"function"}],ce=G({__name:"AddWallet",props:{visible:{type:Boolean,default:!1},data:{type:Object,default:()=>null}},emits:["update:visible"],setup(D,{emit:S}){const L=D,n=v(!1),_=v(!1),g=v(null),b=v(null),W=v(!0),C={name:"1rens",owners:[],confirmNumber:1},A=v(),e=v(C);Z(()=>{n.value=!0,g.value=Q().getWallet,b.value=Q().getWeb3,e.value.owners.push({address:g.value.address,error:""}),n.value=!1});const T=async()=>{const l=await A.value.validate(r=>!!r);let o=0;return e.value.owners.map(r=>{if(r.address){if(r.address&&(r.address=oe(r.address),!re(r.address))){o++,r.error=p("wallet.invalid wallet address");return}const s=e.value.owners.filter(d=>d.address===r.address);if(s.length>1){const d=p("wallet.owner is already added");o++,r.error=d,s.map(y=>{y.error=d});return}else{o=o===0?0:o--,r.error="";return}}else{o++,r.error=p("wallet.please add owners");return}}),o<=0&&l},O=async()=>{if(await T()){n.value=!0;const o=[];if(e.value.owners.map(r=>{o.push(r.address)}),W.value)q(le,te[g.value.chainId],b.value).methods.createWallet(e.value.name,o,e.value.confirmNumber).send({from:g.value.address}).then(s=>{console.info(s)}).catch(s=>{console.error(s)}).finally(()=>{n.value=!1,i()});else{const r=N().getWallet;q(se,r,b.value).methods.createWallet(e.value.name,o,e.value.confirmNumber).send({from:g.value.address}).then(d=>{console.info(d)}).catch(d=>{console.error(d)}).finally(()=>{n.value=!1,i()})}}},I=l=>{const o=e.value.owners.indexOf(l);o!==-1&&e.value.owners.splice(o,1)},F=()=>{const l={name:"",address:"",error:""};e.value.owners.push(l)},i=()=>{_.value=!1};return M(()=>_.value,l=>{S("update:visible",l)}),M(()=>L.visible,l=>{_.value=l}),M(()=>L.data,l=>{n.value=!0,l?(W.value=!1,e.value.name=l.name,e.value.confirmNumber=l.threshold,e.value.owners=[],l.owners.map(o=>{e.value.owners.push({address:o,error:""})})):(W.value=!0,e.value=C),n.value=!1}),M(()=>e.value.owners.length,l=>{e.value.confirmNumber>e.value.owners.length&&(e.value.confirmNumber=l)}),(l,o)=>{const r=u("el-input"),s=u("el-col"),d=u("el-row"),y=u("el-form-item"),k=u("el-button"),R=u("el-divider"),U=u("el-option"),E=u("el-select"),c=u("el-form"),j=u("el-dialog");return w(),z(j,{modelValue:_.value,"onUpdate:modelValue":o[3]||(o[3]=m=>_.value=m),title:f(p)(W.value?"wallet.createWallet":"wallet.modifyWallet"),width:"90%",draggable:"","close-on-click-modal":!1,"before-close":i},{footer:a(()=>[t(k,{onClick:i},{default:a(()=>[h(V(f(p)("wallet.btnCancel")),1)]),_:1}),t(k,{type:"primary",onClick:O},{default:a(()=>[h(V(f(p)("wallet.btnSubmit")),1)]),_:1})]),default:a(()=>[t(c,{ref_key:"walletFormRef",ref:A,model:e.value,"label-width":"100px",class:"demo-ruleForm","hide-required-asterisk":!0},{default:a(()=>[t(y,{prop:"name",label:f(p)("wallet.name"),style:{width:"100%"},rules:[{required:!0,message:f(p)("wallet.please input wallet name"),trigger:"blur"}]},{default:a(()=>[t(d,{gutter:20,style:{width:"100%"}},{default:a(()=>[t(s,{span:24},{default:a(()=>[t(r,{modelValue:e.value.name,"onUpdate:modelValue":o[0]||(o[0]=m=>e.value.name=m)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["label","rules"]),t(y,{prop:"owners",label:f(p)("wallet.owners"),style:{width:"100%"}},{default:a(()=>[(w(!0),x(B,null,J(e.value.owners,(m,H)=>(w(),z(y,{style:{width:"100%","margin-bottom":"1.2rem"},key:H,error:m.error},{default:a(()=>[t(d,{gutter:10,style:{width:"100%"}},{default:a(()=>[t(s,{xs:4,md:1},{default:a(()=>[h(V(H+1),1)]),_:2},1024),t(s,{xs:14,md:19},{default:a(()=>[t(r,{modelValue:m.address,"onUpdate:modelValue":P=>m.address=P,onBlur:o[1]||(o[1]=P=>T())},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(s,{xs:6,md:4},{default:a(()=>[H!==0?(w(),z(k,{key:0,onClick:ae(P=>I(m),["prevent"])},{default:a(()=>[h("删除")]),_:2},1032,["onClick"])):ee("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1032,["error"]))),128))]),_:1},8,["label"]),t(y,null,{default:a(()=>[t(k,{type:"primary",onClick:F},{default:a(()=>[h(V(f(p)("wallet.btnAddOwner")),1)]),_:1})]),_:1}),t(R),t(y,{prop:"confirmNumber",label:f(p)("wallet.confirmNumber"),style:{width:"100%"},rules:[{required:!0,message:f(p)("wallet.please select confirm number"),trigger:"change"}]},{default:a(()=>[t(d,{gutter:20,style:{width:"100%"}},{default:a(()=>[t(s,{span:2},{default:a(()=>[t(E,{modelValue:e.value.confirmNumber,"onUpdate:modelValue":o[2]||(o[2]=m=>e.value.confirmNumber=m)},{default:a(()=>[(w(!0),x(B,null,J(e.value.owners.length,m=>(w(),z(U,{key:m,label:m,value:m},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(s,{span:1},{default:a(()=>[h("/")]),_:1}),t(s,{span:2},{default:a(()=>[h(V(e.value.owners.length),1)]),_:1}),t(s,{span:19})]),_:1})]),_:1},8,["label","rules"])]),_:1},8,["model"])]),_:1},8,["modelValue","title"])}}}),me={width:1024,height:1024,body:'<path fill="currentColor" d="m795.904 750.72l124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704a352 352 0 0 0 0 704z"/>'},pe=me,fe={width:24,height:24,body:'<path fill="currentColor" d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16z"/>'},ve=fe,_e={class:"main"},we={class:"w-full flex justify-between mb-4"},ge=G({name:"HomeWallet"}),Se=G({...ge,props:{connectedWallet:{type:Object,default:null},web3:{type:Object,default:null}},setup(D){const S=D,L=`
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `,n=v({current:1,pageSize:12,total:0}),_=v([]),g=v(!0),b=v(null),W=async()=>{b.value=N().getWallet;try{const l=await q(le,te[S.connectedWallet.chainId],S.web3).methods.getWalletList().call({from:S.connectedWallet.address});_.value=l,!b.value&&_.value.length>0&&(N().setDefaultWallet(_.value[0].token),b.value=_.value[0].token),n.value={...n.value,total:_.value.length}}catch{}finally{setTimeout(()=>{g.value=!1},500)}};Z(()=>{W()});const C=v(!1),A=v(null),e=v(""),T=i=>{n.value.pageSize=i,n.value.current=1},O=i=>{n.value.current=i},I=i=>{C.value=!0,Y(()=>{A.value=i??null})},F=i=>{Y(()=>{g.value=!0,N().setDefaultWallet(i.token),n.value.total=0,W()})};return(i,l)=>{const o=u("el-button"),r=u("IconifyIconOffline"),s=u("el-icon"),d=u("el-input"),y=u("el-empty"),k=u("el-col"),R=u("el-row"),U=u("el-pagination"),E=ue("loading");return w(),x("div",_e,[ie("div",we,[t(o,{icon:f(de)(f(ve)),onClick:l[0]||(l[0]=c=>I())},{default:a(()=>[h(V(f(p)("wallet.btnAdd")),1)]),_:1},8,["icon"]),t(d,{style:{width:"300px"},modelValue:e.value,"onUpdate:modelValue":l[1]||(l[1]=c=>e.value=c),placeholder:f(p)("wallet.address"),clearable:""},{suffix:a(()=>[t(s,{class:"el-input__icon"},{default:a(()=>[$(t(r,{icon:f(pe)},null,8,["icon"]),[[K,e.value.length===0]])]),_:1})]),_:1},8,["modelValue","placeholder"])]),$((w(),x("div",{"element-loading-svg":L,"element-loading-svg-view-box":"-10, -10, 50, 50"},[$(t(y,{description:"暂无数据"},null,512),[[K,_.value.slice(n.value.pageSize*(n.value.current-1),n.value.pageSize*n.value.current).filter(c=>c.name.toLowerCase().includes(e.value.toLowerCase())).length===0]]),n.value.total>0?(w(),x(B,{key:0},[t(R,{gutter:16},{default:a(()=>[(w(!0),x(B,null,J(_.value.slice(n.value.pageSize*(n.value.current-1),n.value.pageSize*n.value.current).filter(c=>c.name.toLowerCase().includes(e.value.toLowerCase())),(c,j)=>(w(),z(k,{key:j,xs:24,sm:12,md:8,lg:6,xl:4},{default:a(()=>[t(ne,{wallet:c,"default-wallet":b.value,onManageWallet:I,onChangeWallet:F},null,8,["wallet","default-wallet"])]),_:2},1024))),128))]),_:1}),t(U,{class:"float-right",currentPage:n.value.current,"onUpdate:currentPage":l[2]||(l[2]=c=>n.value.current=c),"page-size":n.value.pageSize,total:n.value.total,"page-sizes":[12,24,36],background:!0,layout:"total, sizes, prev, pager, next, jumper",onSizeChange:T,onCurrentChange:O},null,8,["currentPage","page-size","total"])],64)):ee("",!0)])),[[E,g.value]]),t(ce,{visible:C.value,"onUpdate:visible":l[3]||(l[3]=c=>C.value=c),data:A.value},null,8,["visible","data"])])}}});export{Se as _};
