var o=Object.defineProperty;var u=(i,s,t)=>s in i?o(i,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[s]=t;var e=(i,s,t)=>(u(i,typeof s!="symbol"?s+"":s,t),t);import{R as n,S as r}from"./vendor.bef68fa6.js";class a{static shouldRun(){return!0}static init(){this.shouldRun()&&(this.dialog=n(),this.message=r())}static dialogWarning(s){this.shouldRun()?this.dialog.warning(s):s.onPositiveClick!==void 0&&s.onPositiveClick(new MouseEvent("click"))}static messageError(s){if(this.shouldRun())return this.message.error(s)}static messageInfo(s){if(this.shouldRun())return this.message.info(s)}static messageLoading(s){if(this.shouldRun())return this.message.loading(s)}static messageSuccess(s){if(this.shouldRun())return this.message.success(s)}}e(a,"dialog"),e(a,"message");export{a as N};