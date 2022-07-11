import{N as _}from"./NaiveUtils.ee524410.js";import{z as r,A as e,B as l,d as p,S as $,D as C,x as y,o as s,c as h,e as d,r as i,h as g,w as a,a as n,i as c,N as L,b2 as S,_ as R}from"./index.0600a43b.js";import{N as U}from"./Input.17d88401.js";var N=r("input-group",`
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
 `)])])])])])]);const B={};var O=p({name:"InputGroup",props:B,setup(t){const{mergedClsPrefixRef:o}=$(t);return C("-input-group",N,o),{mergedClsPrefix:o}},render(){const{mergedClsPrefix:t}=this;return y("div",{class:`${t}-input-group`},this.$slots)}});const P={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},j=d("rect",{x:"128",y:"128",width:"336",height:"336",rx:"57",ry:"57",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),I=d("path",{d:"M383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),M=[j,I];var V=p({name:"CopyOutline",render:function(o,m){return s(),h("svg",P,M)}});const A={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},G=d("path",{d:"M336 192h40a40 40 0 0 1 40 40v192a40 40 0 0 1-40 40H136a40 40 0 0 1-40-40V232a40 40 0 0 1 40-40h40",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),H=d("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M336 128l-80-80l-80 80"},null,-1),E=d("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 321V48"},null,-1),T=[G,H,E];var q=p({name:"ShareOutline",render:function(o,m){return s(),h("svg",A,T)}});const z={class:"share_component"},D=c("Share"),F=c("Copy"),J=c("Hide");function K(t,o,m,W,X,Y){const w=i("share-outline"),b=i("n-icon"),u=i("n-button"),k=i("n-input"),x=i("copy-outline"),v=i("n-input-group");return s(),h("div",z,[t.showShareURL?(s(),g(v,{key:1,class:"tripLink"},{default:a(()=>[n(k,{autofocus:!0,readonly:!0,"default-value":t.shareURL},null,8,["default-value"]),n(u,{onClick:o[1]||(o[1]=f=>t.copyLink())},{default:a(()=>[n(b,null,{default:a(()=>[n(x)]),_:1}),F]),_:1}),n(u,{onClick:o[2]||(o[2]=f=>t.hideShareURL()),type:"error"},{default:a(()=>[J]),_:1})]),_:1})):(s(),g(u,{key:0,onClick:o[0]||(o[0]=f=>t.share())},{default:a(()=>[n(b,null,{default:a(()=>[n(w)]),_:1}),D]),_:1}))])}const Q=p({name:"CShare",components:{NButton:L,NIcon:S,NInput:U,NInputGroup:O,CopyOutline:V,ShareOutline:q},props:{shareURL:{type:String,required:!0},onClick:{type:Function,default:()=>{}}},data:()=>({showShareURL:!1}),beforeMount(){_.init()},methods:{share(){if(this.$props.onClick(),this.$data.showShareURL){this.$data.showShareURL=!1;return}const t=navigator.userAgent;(t.indexOf("iPad")!==-1||t.indexOf("iPhone")!==-1||t.indexOf("Android")!==-1)&&navigator.share?navigator.share({title:document.title,text:"",url:this.$props.shareURL}):this.$data.showShareURL=!0},hideShareURL(){this.$data.showShareURL=!1},async copyLink(){await navigator.clipboard.writeText(this.$props.shareURL),_.messageInfo("Link copied to clipboard!")}}});var rt=R(Q,[["render",K]]);export{rt as C};
