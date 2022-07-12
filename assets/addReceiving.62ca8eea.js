import{h as L,Z as U,o as P,j as n,k as u,x as l,y as r,a5 as o,B as m,W as f,U as _,l as w,q as B,E as v,O as D,D as R}from"./vendor.a22db959.js";import{a as j,b as T,w as h}from"./index.70831d5c.js";import{g as A}from"./random.88429220.js";import{_ as C}from"./index.465eb10d.js";const M={class:"container"},Y={class:"buttonclass"},q=B("\u786E \u5B9A"),z={setup(E){const{proxy:g}=R(),a=L({formData:{userId:parseInt(window.localStorage.getItem("userId")||""),receiveNo:A("R"),receiveName:"",memo:"",receivePriority:"",receiveTime:"",receiverId:""},rules:{receiveNo:[{required:!0,message:"\u6536\u6599\u5355\u7F16\u53F7",trigger:"blur"}],receiveName:[{required:!0,message:"\u6536\u6599\u5355\u540D\u79F0",trigger:"blur"}]},canDialogDetail:!1,statusList:[],receivePriorityList:[],userList:[]});U();function b(i){j({groupId:i}).then(e=>{if(e.code==200&&e.items.length>0)switch(i){case 7:a.receivePriorityList=e.items;break}}).catch(e=>{console.log(e)})}function V(){g.$refs.ruleForm.validate().then(i=>{i&&h(a.formData).then(e=>{v.success("\u521B\u5EFA\u6210\u529F"),a.canDialogDetail=!1}).catch(e=>{v.error("\u64CD\u4F5C\u5931\u8D25")})})}function y(i){T({id:i}).then(e=>{e&&e.code===200&&(a.userList=e.items?e.items:[])})}return P(()=>{b(7),y(2)}),(i,e)=>{const d=n("el-input"),s=n("el-form-item"),N=n("el-date-picker"),c=n("el-option"),p=n("el-select"),I=n("el-button"),x=n("el-form");return m(),u("div",M,[l(x,{ref:(t,k)=>{k.ruleForm=t},model:o(a).formData,rules:o(a).rules,size:"mini","label-width":"100px"},{default:r(()=>[l(s,{label:"\u6536\u6599\u5355\u7F16\u53F7",prop:"receiveNo"},{default:r(()=>[l(d,{modelValue:o(a).formData.receiveNo,"onUpdate:modelValue":e[0]||(e[0]=t=>o(a).formData.receiveNo=t)},null,8,["modelValue"])]),_:1}),l(s,{label:"\u6536\u6599\u5355\u540D\u79F0",prop:"receiveName"},{default:r(()=>[l(d,{modelValue:o(a).formData.receiveName,"onUpdate:modelValue":e[1]||(e[1]=t=>o(a).formData.receiveName=t)},null,8,["modelValue"])]),_:1}),l(s,{label:"\u5907\u6CE8",prop:"memo"},{default:r(()=>[l(d,{modelValue:o(a).formData.memo,"onUpdate:modelValue":e[2]||(e[2]=t=>o(a).formData.memo=t)},null,8,["modelValue"])]),_:1}),l(s,{label:"\u6536\u6599\u65F6\u95F4",prop:"receiveTime"},{default:r(()=>[l(N,{modelValue:o(a).formData.receiveTime,"onUpdate:modelValue":e[3]||(e[3]=t=>o(a).formData.receiveTime=t),type:"datetime",format:"YYYY-MM-DD:HH:mm:ss",placeholder:"\u6536\u6599\u65F6\u95F4"},null,8,["modelValue"])]),_:1}),l(s,{label:"\u64CD\u4F5C\u4EBA\u5458",prop:"receiverId"},{default:r(()=>[l(p,{modelValue:o(a).formData.receiverId,"onUpdate:modelValue":e[4]||(e[4]=t=>o(a).formData.receiverId=t),placeholder:"\u64CD\u4F5C\u4EBA\u5458",size:"small",clearable:""},{default:r(()=>[(m(!0),u(f,null,_(o(a).userList,t=>(m(),D(c,{label:t.userName,value:t.id,key:t.itemId},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(s,{label:"\u4F18\u5148\u7EA7",prop:"receivePriority"},{default:r(()=>[l(p,{modelValue:o(a).formData.receivePriority,"onUpdate:modelValue":e[5]||(e[5]=t=>o(a).formData.receivePriority=t),placeholder:"\u4F18\u5148\u7EA7",size:"small",clearable:""},{default:r(()=>[(m(!0),u(f,null,_(o(a).receivePriorityList,t=>(m(),D(c,{label:t.itemName,value:t.itemId,key:t.itemId},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(s,null,{default:r(()=>[w("div",Y,[l(I,{class:"subButton",type:"primary",onClick:e[6]||(e[6]=t=>V())},{default:r(()=>[q]),_:1})])]),_:1})]),_:1},8,["model","rules"])])}}};var $=C(z,[["__scopeId","data-v-138277fe"]]);export{$ as default};