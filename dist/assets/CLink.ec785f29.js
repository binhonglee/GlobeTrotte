import{openBlock as r,createElementBlock as n,normalizeClass as t,renderSlot as o,defineComponent as a}from"vue";import{_ as l}from"./index.18ba2282.js";const s=["href","rel","target"];function d(e,p,u,_,f,c){return r(),n("a",{class:t("underline_"+e.underline+" color_"+e.color),href:e.url,rel:e.external?"noopener noreferrer":"",target:e.external?"_blank":""},[o(e.$slots,"default",{},void 0,!0)],10,s)}const i=a({name:"CLink",props:{url:{type:String,required:!0},underline:{type:String,default:"always"},color:{type:String,default:"always"},external:{type:Boolean,default:!1}}});var g=l(i,[["render",d],["__scopeId","data-v-180e991f"]]);export{g as C};