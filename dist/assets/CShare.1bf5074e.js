import{N as g}from"./NaiveUtils.595b3db6.js";import{A as r,B as e,C as l,d as p,T as v,E as $,y,o as a,c,e as d,N as L,a$ as S,r as i,k as _,w as s,a as n,j as h,_ as R}from"./index.4453a21d.js";import{N as U}from"./Input.20700df6.js";const N=r("input-group",`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[e(">",[r("input",[e("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),e("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),r("button",[e("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[l("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),e("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[l("state-border, border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),e("*",[e("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[e(">",[r("input",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),r("base-selection",[r("base-selection-label",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),r("base-selection-tags",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),l("box-shadow, border, state-border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),e("&:not(:first-child)",`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[e(">",[r("input",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),r("base-selection",[r("base-selection-label",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),r("base-selection-tags",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),l("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),B={},O=p({name:"InputGroup",props:B,setup(t){const{mergedClsPrefixRef:o}=v(t);return $("-input-group",N,o),{mergedClsPrefix:o}},render(){const{mergedClsPrefix:t}=this;return y("div",{class:`${t}-input-group`},this.$slots)}}),j={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},P=d("rect",{x:"128",y:"128",width:"336",height:"336",rx:"57",ry:"57",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),I=d("path",{d:"M383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),M=[P,I],V=p({name:"CopyOutline",render:function(o,m){return a(),c("svg",j,M)}}),A={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},E=d("path",{d:"M336 192h40a40 40 0 0 1 40 40v192a40 40 0 0 1-40 40H136a40 40 0 0 1-40-40V232a40 40 0 0 1 40-40h40",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),G=d("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M336 128l-80-80l-80 80"},null,-1),H=d("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 321V48"},null,-1),T=[E,G,H],q=p({name:"ShareOutline",render:function(o,m){return a(),c("svg",A,T)}}),F=p({name:"CShare",components:{NButton:L,NIcon:S,NInput:U,NInputGroup:O,CopyOutline:V,ShareOutline:q},props:{shareURL:{type:String,required:!0},onClick:{type:Function,default:()=>{}}},data:()=>({showShareURL:!1}),beforeMount(){g.init()},methods:{share(){if(this.$props.onClick(),this.$data.showShareURL){this.$data.showShareURL=!1;return}const t=navigator.userAgent;(t.indexOf("iPad")!==-1||t.indexOf("iPhone")!==-1||t.indexOf("Android")!==-1)&&navigator.share?navigator.share({title:document.title,text:"",url:this.$props.shareURL}):this.$data.showShareURL=!0},hideShareURL(){this.$data.showShareURL=!1},async copyLink(){await navigator.clipboard.writeText(this.$props.shareURL),g.messageInfo("Link copied to clipboard!")}}}),z={class:"share_component"};function D(t,o,m,J,K,Q){const w=i("share-outline"),b=i("n-icon"),u=i("n-button"),k=i("n-input"),x=i("copy-outline"),C=i("n-input-group");return a(),c("div",z,[t.showShareURL?(a(),_(C,{key:1,class:"tripLink"},{default:s(()=>[n(k,{autofocus:!0,readonly:!0,"default-value":t.shareURL},null,8,["default-value"]),n(u,{onClick:o[1]||(o[1]=f=>t.copyLink())},{default:s(()=>[n(b,null,{default:s(()=>[n(x)]),_:1}),h("Copy")]),_:1}),n(u,{onClick:o[2]||(o[2]=f=>t.hideShareURL()),type:"error"},{default:s(()=>[h("Hide")]),_:1})]),_:1})):(a(),_(u,{key:0,onClick:o[0]||(o[0]=f=>t.share())},{default:s(()=>[n(b,null,{default:s(()=>[n(w)]),_:1}),h("Share")]),_:1}))])}const Z=R(F,[["render",D]]);export{Z as C};
