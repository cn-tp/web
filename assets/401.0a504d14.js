import{$ as i,j as r,k as t,q as s,s as _,x as l,y as d,z as m,A as p,B as u,p as h}from"./vendor.8327e786.js";import{_ as f,S as v}from"./index.10c62aa1.js";const g={name:"401",setup(){const e=i();return{onSetAuth:()=>{v.clear(),e.push("/login")}}}},o=e=>(d("data-v-40983673"),e=e(),m(),e),S={class:"error"},x={class:"error-flex"},y={class:"left"},A={class:"left-item"},$=o(()=>t("div",{class:"left-item-animation left-item-num"},"401",-1)),k={class:"left-item-animation left-item-title"},B={class:"left-item-animation left-item-btn"},C=o(()=>t("div",{class:"right"},[t("img",{src:"https://gitee.com/lyt-top/vue-next-admin-images/raw/master/error/401.png"})],-1));function I(e,a,b,n,w,N){const c=p("el-button");return u(),r("div",S,[t("div",x,[t("div",y,[t("div",A,[$,t("div",k,s(e.$t("message.noAccess.accessTitle")),1),t("div",B,[_(c,{type:"primary",round:"",onClick:n.onSetAuth},{default:l(()=>[h(s(e.$t("message.noAccess.accessBtn")),1)]),_:1},8,["onClick"])])])]),C])])}var j=f(g,[["render",I],["__scopeId","data-v-40983673"]]);export{j as default};