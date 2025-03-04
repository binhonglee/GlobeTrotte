import{N as g}from"./NaiveUtils-CaBEIltk.js";import{x as o,v as e,ad as p,d as u,u as _,z as y,aM as $,c as b,b as d,o as l,n as L,B as S,i as w,f as a,r as s,a as n,h,_ as R}from"./index-CVwEz7sZ.js";import{N as U}from"./Input-B0b2FwEY.js";const B=o("input-group",`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[e(">",[o("input",[e("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),e("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),o("button",[e("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[p("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),e("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[p("state-border, border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),e("*",[e("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[e(">",[o("input",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),o("base-selection",[o("base-selection-label",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),o("base-selection-tags",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),p("box-shadow, border, state-border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),e("&:not(:first-child)",`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[e(">",[o("input",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),o("base-selection",[o("base-selection-label",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),o("base-selection-tags",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),p("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),N={},O=u({name:"InputGroup",props:N,setup(r){const{mergedClsPrefixRef:t}=y(r);return $("-input-group",B,t),{mergedClsPrefix:t}},render(){const{mergedClsPrefix:r}=this;return _("div",{class:`${r}-input-group`},this.$slots)}}),M={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},P=u({name:"CopyOutline",render:function(t,i){return l(),b("svg",M,i[0]||(i[0]=[d("rect",{x:"128",y:"128",width:"336",height:"336",rx:"57",ry:"57",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),d("path",{d:"M383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1)]))}}),j={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},I=u({name:"ShareOutline",render:function(t,i){return l(),b("svg",j,i[0]||(i[0]=[d("path",{d:"M336 192h40a40 40 0 0 1 40 40v192a40 40 0 0 1-40 40H136a40 40 0 0 1-40-40V232a40 40 0 0 1 40-40h40",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),d("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M336 128l-80-80l-80 80"},null,-1),d("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 321V48"},null,-1)]))}}),V=u({name:"CShare",components:{NButton:S,NIcon:L,NInput:U,NInputGroup:O,CopyOutline:P,ShareOutline:I},props:{shareURL:{type:String,required:!0},onClick:{type:Function,default:()=>{}}},data:()=>({showShareURL:!1}),beforeMount(){g.init()},methods:{share(){if(this.$props.onClick(),this.$data.showShareURL){this.$data.showShareURL=!1;return}const r=navigator.userAgent;(r.indexOf("iPad")!==-1||r.indexOf("iPhone")!==-1||r.indexOf("Android")!==-1)&&navigator.share?navigator.share({title:document.title,text:"",url:this.$props.shareURL}):this.$data.showShareURL=!0},hideShareURL(){this.$data.showShareURL=!1},async copyLink(){await navigator.clipboard.writeText(this.$props.shareURL),g.messageInfo("Link copied to clipboard!")}}}),A={class:"share_component"};function G(r,t,i,H,E,T){const k=s("share-outline"),f=s("n-icon"),m=s("n-button"),x=s("n-input"),v=s("copy-outline"),C=s("n-input-group");return l(),b("div",A,[r.showShareURL?(l(),w(C,{key:1,class:"tripLink"},{default:a(()=>[n(x,{autofocus:!0,readonly:!0,"default-value":r.shareURL},null,8,["default-value"]),n(m,{onClick:t[1]||(t[1]=c=>r.copyLink())},{default:a(()=>[n(f,null,{default:a(()=>[n(v)]),_:1}),t[4]||(t[4]=h("Copy"))]),_:1}),n(m,{onClick:t[2]||(t[2]=c=>r.hideShareURL()),type:"error"},{default:a(()=>t[5]||(t[5]=[h("Hide")])),_:1})]),_:1})):(l(),w(m,{key:0,onClick:t[0]||(t[0]=c=>r.share())},{default:a(()=>[n(f,null,{default:a(()=>[n(k)]),_:1}),t[3]||(t[3]=h("Share"))]),_:1}))])}const D=R(V,[["render",G]]);export{D as C};
