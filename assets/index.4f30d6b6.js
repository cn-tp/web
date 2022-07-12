import{a1 as U,a as P,b as T}from"./index.70831d5c.js";import{_ as Y}from"./index.465eb10d.js";import{h as B,o as H,j as i,a4 as M,k as g,l as m,x as o,y as s,a5 as l,w as j,O as u,J as q,B as d,W as A,U as E,s as R,q as J}from"./vendor.a22db959.js";const O=J("\u641C\u7D22"),W={setup($){const e=B({drawer:!1,seachField:{containerNo:"",status:"",operatorId:"",operationTime:"",date:[]},tableData:{loading:!1,pagination:{pageSize:10,pageNum:1,totalPage:0,more:0},rows:[]},formData:{userId:parseInt(window.localStorage.getItem("userId")||""),sessionId:window.localStorage.getItem("sessionId"),applyNo:"",applyName:"",auditor:0,expectReturnTime:"",memo:""},rules:{locationNo:[{required:!0,message:"\u8BF7\u8F93\u5165SPU\u7F16\u53F7",trigger:"blur"}],locationName:[{required:!0,message:"\u8BF7\u8F93\u5165SPU\u540D\u79F0",trigger:"blur"}]},canDialogDetail:!1,status:[],userList:[]});function _(a){e.tableData.pagination.pageSize=a,p()}function b(a){e.tableData.pagination.pageNum=a,p()}function h(){e.tableData.pagination.pageNum=1,p()}function p(){e.tableData.loading=!0,U({userId:parseInt(window.localStorage.getItem("userId")||""),sessionId:window.localStorage.getItem("sessionId"),containerNo:e.seachField.containerNo,coperatorId:e.seachField.operatorId,status:e.seachField.status,pickingTimeBegin:e.seachField.date[0]?e.seachField.date[0]:"",pickingTimeEnd:e.seachField.date[1]?e.seachField.date[1]:"",pageSize:e.tableData.pagination.pageSize,pageNum:e.tableData.pagination.pageNum}).then(a=>{console.log(a),e.tableData.rows=a.items?a.items:[],e.tableData.pagination.totalPage=a.totalPage,e.tableData.loading=!1}).catch(a=>{console.log(a)})}function f(){return"padding:3px;"}function w(){return"padding:3px;"}function D(a){P({groupId:a}).then(t=>{if(t.code==200&&t.items.length>0)switch(a){case 9:e.status=t.items;break}}).catch(t=>{console.log(t)})}function N(a){for(var t=0;t<e.userList.length;t++)if(a==e.userList[t].id)return e.userList[t].userName;return""}function v(){T({id:4}).then(a=>{a&&a.code===200&&(e.userList=a.items)})}return H(()=>{D(9),p(),v()}),(a,t)=>{const I=i("el-date-picker"),c=i("el-col"),y=i("el-input"),k=i("el-option"),S=i("el-select"),x=i("el-button"),F=i("el-row"),r=i("el-table-column"),z=i("el-table"),V=i("el-empty"),C=i("el-pagination"),L=M("loading");return d(),g("div",null,[m("div",null,[o(F,{gutter:20},{default:s(()=>[o(c,{span:8},{default:s(()=>[o(I,{modelValue:l(e).seachField.date,"onUpdate:modelValue":t[0]||(t[0]=n=>l(e).seachField.date=n),type:"datetimerange",format:"YYYY-MM-DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss",shortcuts:a.shortcuts,"range-separator":"To",size:"small","start-placeholder":"\u5F00\u59CB\u65F6\u95F4","end-placeholder":"\u7ED3\u675F\u65F6\u95F4"},null,8,["modelValue","shortcuts"])]),_:1}),o(c,{span:4},{default:s(()=>[o(y,{modelValue:l(e).seachField.containerNo,"onUpdate:modelValue":t[1]||(t[1]=n=>l(e).seachField.containerNo=n),placeholder:"\u6807\u7B7E\u53F7",size:"small",clearable:!0},null,8,["modelValue"])]),_:1}),o(c,{span:4},{default:s(()=>[o(S,{modelValue:l(e).seachField.operatorId,"onUpdate:modelValue":t[2]||(t[2]=n=>l(e).seachField.operatorId=n),placeholder:"\u64CD\u4F5C\u4EBA",size:"small",clearable:""},{default:s(()=>[(d(!0),g(A,null,E(l(e).userList,n=>(d(),u(k,{label:n.userName,value:n.id,key:n.itemId},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),o(c,{span:2},{default:s(()=>[o(x,{type:"primary",onClick:t[3]||(t[3]=n=>h()),size:"small"},{default:s(()=>[O]),_:1})]),_:1})]),_:1}),l(e).tableData.rows.length>0?j((d(),u(z,{key:0,data:l(e).tableData.rows,stripe:"","cell-style":f,"header-cell-style":w,border:"",class:"container_table"},{default:s(()=>[o(r,{label:"#",prop:"id",width:"50"}),o(r,{label:"\u7269\u6599\u53F7",prop:"skuNo",width:"180","show-overflow-tooltip":""}),o(r,{label:"\u7269\u6599\u540D\u79F0",prop:"skuName",width:"180","show-overflow-tooltip":""}),o(r,{label:"\u6807\u7B7E\u53F7",prop:"containerNo",width:"120","show-overflow-tooltip":""}),o(r,{label:"\u5E93\u4F4D\u7F16\u53F7",prop:"locationNo",width:"180","show-overflow-tooltip":""}),o(r,{label:"\u64CD\u4F5C\u4EBA",prop:"coperationId",width:"80"},{default:s(n=>[m("div",null,R(N(n.row.coperationId)),1)]),_:1}),o(r,{label:"\u6D88\u8017\u65F6\u95F4",prop:"operationTime","show-overflow-tooltip":""})]),_:1},8,["data"])),[[L,l(e).tableData.loading]]):(d(),u(V,{key:1,description:"\u6682\u65E0\u6570\u636E"})),l(e).tableData.rows.length>0?(d(),u(C,{key:2,currentPage:l(e).tableData.pagination.pageNum,"onUpdate:currentPage":t[4]||(t[4]=n=>l(e).tableData.pagination.pageNum=n),"page-size":l(e).tableData.pagination.pageSize,layout:"prev, pager, next",onCurrentChange:b,onSizeChange:_,"page-count":l(e).tableData.pagination.totalPage},null,8,["currentPage","page-size","page-count"])):q("",!0)])])}}};var X=Y(W,[["__scopeId","data-v-f82a1756"]]);export{X as default};
