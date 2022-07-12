var k=Object.defineProperty;var _=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var S=(e,o,n)=>o in e?k(e,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[o]=n,h=(e,o)=>{for(var n in o||(o={}))F.call(o,n)&&S(e,n,o[n]);if(_)for(var n of _(o))N.call(o,n)&&S(e,n,o[n]);return e};import{g as $,F as v,K as q,$ as V,h as P,H as R,t as b,O as B,x as l,E as T,A as m,B as x,s as r,k as y,l as A,q as O,D as j}from"./vendor.8327e786.js";import{_ as D,u as E,f as U,S as J,c as z}from"./index.10c62aa1.js";import{i as H,b as K}from"./user.afc1ef84.js";const M=$({name:"loginAccount",setup(){const{t:e}=v(),{proxy:o}=j(),n=E(),i=q(),d=V(),t=P({isShowPassword:!1,ruleForm:{userName:"",password:""},loading:{signIn:!1}}),u=R(()=>U(new Date)),c=async()=>{t.loading.signIn=!0,H({loginName:t.ruleForm.userName,password:t.ruleForm.password}).then(s=>{J.set("token",s.jwt),window.localStorage.setItem("token",s.jwt),window.localStorage.setItem("eqRoles",JSON.stringify(s.roles)),window.localStorage.setItem("oid",s.orgId),p(s.uid)}).catch(s=>{t.loading.signIn=!1,console.log(s)})},p=async s=>{K({userId:s}).then(a=>{window.localStorage.setItem("userName",a.userName),window.localStorage.setItem("userId",a.userId),n.state.themeConfig.themeConfig.isRequestRoutes||(z(),g())}).catch(a=>{console.log(a)})},g=()=>{var a,f,w,I;let s=u.value;((a=i.query)==null?void 0:a.redirect)?d.push({path:(f=i.query)==null?void 0:f.redirect,query:Object.keys((w=i.query)==null?void 0:w.params).length>0?JSON.parse((I=i.query)==null?void 0:I.params):""}):d.push("/"),setTimeout(()=>{t.loading.signIn=!1;const C=e("message.signInText");T.success(`${s}\uFF0C${C}`),o.mittBus.emit("onSignInClick")},300)};return h({currentTime:u,onSignIn:c},b(t))}});function G(e,o,n,i,d,t){const u=m("el-input"),c=m("el-form-item"),p=m("el-button"),g=m("el-form");return x(),B(g,{class:"login-content-form"},{default:l(()=>[r(c,null,{default:l(()=>[r(u,{type:"text",placeholder:e.$t("message.account.accountPlaceholder1"),"prefix-icon":"el-icon-user",modelValue:e.ruleForm.userName,"onUpdate:modelValue":o[0]||(o[0]=s=>e.ruleForm.userName=s),clearable:"",autocomplete:"off"},null,8,["placeholder","modelValue"])]),_:1}),r(c,null,{default:l(()=>[r(u,{type:e.isShowPassword?"text":"password",placeholder:e.$t("message.account.accountPlaceholder2"),"prefix-icon":"el-icon-lock",modelValue:e.ruleForm.password,"onUpdate:modelValue":o[2]||(o[2]=s=>e.ruleForm.password=s),autocomplete:"off"},{suffix:l(()=>[y("i",{class:A(["iconfont el-input__icon login-content-password",e.isShowPassword?"icon-yincangmima":"icon-xianshimima"]),onClick:o[1]||(o[1]=s=>e.isShowPassword=!e.isShowPassword)},null,2)]),_:1},8,["type","placeholder","modelValue"])]),_:1}),r(c,null,{default:l(()=>[r(p,{type:"primary",class:"login-content-submit",round:"",onClick:e.onSignIn,loading:e.loading.signIn},{default:l(()=>[y("span",null,O(e.$t("message.account.accountBtnText")),1)]),_:1},8,["onClick","loading"])]),_:1})]),_:1})}var Y=D(M,[["render",G],["__scopeId","data-v-25dac22e"]]);export{Y as default};