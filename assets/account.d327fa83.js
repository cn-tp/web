var F=Object.defineProperty;var _=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var h=(e,o,n)=>o in e?F(e,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[o]=n,y=(e,o)=>{for(var n in o||(o={}))N.call(o,n)&&h(e,n,o[n]);if(_)for(var n of _(o))v.call(o,n)&&h(e,n,o[n]);return e};import{g as $,F as k,K as V,Z as b,h as j,H as P,t as q,j as m,O as B,y as r,E as R,B as T,x as l,l as S,m as x,s as O,D as A}from"./vendor.a22db959.js";import{_ as D,u as E,e as U,S as J,h as z}from"./index.465eb10d.js";import{f as H,a as K}from"./user.236af893.js";const M=$({name:"loginAccount",setup(){const{t:e}=k(),{proxy:o}=A(),n=E(),u=V(),d=b(),a=j({isShowPassword:!1,ruleForm:{userName:"",password:""},loading:{signIn:!1}}),i=P(()=>U(new Date)),c=async()=>{a.loading.signIn=!0,H({loginName:a.ruleForm.userName,password:a.ruleForm.password}).then(s=>{console.log(s),J.set("token",s.jwt),window.localStorage.setItem("sessionId",s.jwt),window.localStorage.setItem("roles",JSON.stringify(s.roles)),p(s.uid)}).catch(s=>{console.log(s)})},p=async s=>{K({userId:s}).then(t=>{window.localStorage.setItem("userName",t.userName),window.localStorage.setItem("userId",t.userId),n.state.themeConfig.themeConfig.isRequestRoutes||(z(),g())}).catch(t=>{console.log(t)})},g=()=>{var t,f,w,I;let s=i.value;((t=u.query)==null?void 0:t.redirect)?d.push({path:(f=u.query)==null?void 0:f.redirect,query:Object.keys((w=u.query)==null?void 0:w.params).length>0?JSON.parse((I=u.query)==null?void 0:I.params):""}):d.push("/"),setTimeout(()=>{a.loading.signIn=!0;const C=e("message.signInText");R.success(`${s}\uFF0C${C}`),o.mittBus.emit("onSignInClick")},300)};return y({currentTime:i,onSignIn:c},q(a))}});function Z(e,o,n,u,d,a){const i=m("el-input"),c=m("el-form-item"),p=m("el-button"),g=m("el-form");return T(),B(g,{class:"login-content-form"},{default:r(()=>[l(c,null,{default:r(()=>[l(i,{type:"text",placeholder:e.$t("message.account.accountPlaceholder1"),"prefix-icon":"el-icon-user",modelValue:e.ruleForm.userName,"onUpdate:modelValue":o[0]||(o[0]=s=>e.ruleForm.userName=s),clearable:"",autocomplete:"off"},null,8,["placeholder","modelValue"])]),_:1}),l(c,null,{default:r(()=>[l(i,{type:e.isShowPassword?"text":"password",placeholder:e.$t("message.account.accountPlaceholder2"),"prefix-icon":"el-icon-lock",modelValue:e.ruleForm.password,"onUpdate:modelValue":o[2]||(o[2]=s=>e.ruleForm.password=s),autocomplete:"off"},{suffix:r(()=>[S("i",{class:x(["iconfont el-input__icon login-content-password",e.isShowPassword?"icon-yincangmima":"icon-xianshimima"]),onClick:o[1]||(o[1]=s=>e.isShowPassword=!e.isShowPassword)},null,2)]),_:1},8,["type","placeholder","modelValue"])]),_:1}),l(c,null,{default:r(()=>[l(p,{type:"primary",class:"login-content-submit",round:"",onClick:e.onSignIn,loading:e.loading.signIn},{default:r(()=>[S("span",null,O(e.$t("message.account.accountBtnText")),1)]),_:1},8,["onClick","loading"])]),_:1})]),_:1})}var X=D(M,[["render",Z],["__scopeId","data-v-6edd79ec"]]);export{X as default};