import{d as oe,x as l,Z as pt,$ as bt,a0 as De,a1 as qt,a2 as Gt,M as F,D as R,J as Ne,a3 as Xe,a4 as Ae,a5 as Yt,a6 as ot,a7 as Le,a8 as Zt,a9 as Ie,aa as Xt,z,ab as A,y as pe,A as mt,B as ce,ac as Jt,ad as tt,ae as Qt,af as ae,ag as Ve,O as wt,ah as nt,ai as Ce,aj as yt,ak as ne,al as Je,am as xt,E as X,an as en,ao as tn,K as be,ap as it,aq as lt,ar as nn,as as on,at as ln,au as rn,av as an,aw as sn,ax as Qe,ay as un,az as dn,aA as rt,F as at,aB as cn,I as st,aC as fn,aD as hn,C as vn,aE as gn,aF as et,aG as pn,aH as bn,aI as mn,aJ as wn,aK as yn,aL as ut,T as ie}from"./index-147973cf.js";import{u as Ct,a as xn}from"./Input-c3c5bdea.js";import{N as Ye}from"./DataProps-e6fa7ddf.js";function Cn(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}const Sn=oe({name:"Checkmark",render(){return l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},l("g",{fill:"none"},l("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),Tn=oe({name:"Empty",render(){return l("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),l("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),Rn=oe({props:{onFocus:Function,onBlur:Function},setup(e){return()=>l("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}});function dt(e){return e&-e}class On{constructor(n,i){this.l=n,this.min=i;const a=new Array(n+1);for(let d=0;d<n+1;++d)a[d]=0;this.ft=a}add(n,i){if(i===0)return;const{l:a,ft:d}=this;for(n+=1;n<=a;)d[n]+=i,n+=dt(n)}get(n){return this.sum(n+1)-this.sum(n)}sum(n){if(n===void 0&&(n=this.l),n<=0)return 0;const{ft:i,min:a,l:d}=this;if(n>d)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let f=n*a;for(;n>0;)f+=i[n],n-=dt(n);return f}getBound(n){let i=0,a=this.l;for(;a>i;){const d=Math.floor((i+a)/2),f=this.sum(d);if(f>n){a=d;continue}else if(f<n){if(i===d)return this.sum(i+1)<=n?i+1:d;i=d}else return d}return i}}let Ee;function Mn(){return Ee===void 0&&("matchMedia"in window?Ee=window.matchMedia("(pointer:coarse)").matches:Ee=!1),Ee}let Ze;function ct(){return Ze===void 0&&(Ze="chrome"in window?window.devicePixelRatio:1),Ze}const zn=Le(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[Le("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[Le("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),Fn=oe({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const n=pt();zn.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:bt,ssr:n}),De(()=>{const{defaultScrollIndex:h,defaultScrollKey:m}=e;h!=null?p({index:h}):m!=null&&p({key:m})});let i=!1,a=!1;qt(()=>{if(i=!1,!a){a=!0;return}p({top:S.value,left:w})}),Gt(()=>{i=!0,a||(a=!0)});const d=F(()=>{const h=new Map,{keyField:m}=e;return e.items.forEach((P,B)=>{h.set(P[m],B)}),h}),f=R(null),g=R(void 0),u=new Map,O=F(()=>{const{items:h,itemSize:m,keyField:P}=e,B=new On(h.length,m);return h.forEach((V,_)=>{const N=V[P],o=u.get(N);o!==void 0&&B.add(_,o)}),B}),b=R(0);let w=0;const S=R(0),M=Ne(()=>Math.max(O.value.getBound(S.value-Xe(e.paddingTop))-1,0)),y=F(()=>{const{value:h}=g;if(h===void 0)return[];const{items:m,itemSize:P}=e,B=M.value,V=Math.min(B+Math.ceil(h/P+1),m.length-1),_=[];for(let N=B;N<=V;++N)_.push(m[N]);return _}),p=(h,m)=>{if(typeof h=="number"){L(h,m,"auto");return}const{left:P,top:B,index:V,key:_,position:N,behavior:o,debounce:s=!0}=h;if(P!==void 0||B!==void 0)L(P,B,o);else if(V!==void 0)k(V,o,s);else if(_!==void 0){const $=d.value.get(_);$!==void 0&&k($,o,s)}else N==="bottom"?L(0,Number.MAX_SAFE_INTEGER,o):N==="top"&&L(0,0,o)};let x,E=null;function k(h,m,P){const{value:B}=O,V=B.sum(h)+Xe(e.paddingTop);if(!P)f.value.scrollTo({left:0,top:V,behavior:m});else{x=h,E!==null&&window.clearTimeout(E),E=window.setTimeout(()=>{x=void 0,E=null},16);const{scrollTop:_,offsetHeight:N}=f.value;if(V>_){const o=B.get(h);V+o<=_+N||f.value.scrollTo({left:0,top:V+o-N,behavior:m})}else f.value.scrollTo({left:0,top:V,behavior:m})}}function L(h,m,P){f.value.scrollTo({left:h,top:m,behavior:P})}function q(h,m){var P,B,V;if(i||e.ignoreItemResize||I(m.target))return;const{value:_}=O,N=d.value.get(h),o=_.get(N),s=(V=(B=(P=m.borderBoxSize)===null||P===void 0?void 0:P[0])===null||B===void 0?void 0:B.blockSize)!==null&&V!==void 0?V:m.contentRect.height;if(s===o)return;s-e.itemSize===0?u.delete(h):u.set(h,s-e.itemSize);const Z=s-o;if(Z===0)return;_.add(N,Z);const Q=f.value;if(Q!=null){if(x===void 0){const le=_.sum(N);Q.scrollTop>le&&Q.scrollBy(0,Z)}else if(N<x)Q.scrollBy(0,Z);else if(N===x){const le=_.sum(N);s+le>Q.scrollTop+Q.offsetHeight&&Q.scrollBy(0,Z)}J()}b.value++}const G=!Mn();let H=!1;function D(h){var m;(m=e.onScroll)===null||m===void 0||m.call(e,h),(!G||!H)&&J()}function Y(h){var m;if((m=e.onWheel)===null||m===void 0||m.call(e,h),G){const P=f.value;if(P!=null){if(h.deltaX===0&&(P.scrollTop===0&&h.deltaY<=0||P.scrollTop+P.offsetHeight>=P.scrollHeight&&h.deltaY>=0))return;h.preventDefault(),P.scrollTop+=h.deltaY/ct(),P.scrollLeft+=h.deltaX/ct(),J(),H=!0,Zt(()=>{H=!1})}}}function te(h){if(i||I(h.target)||h.contentRect.height===g.value)return;g.value=h.contentRect.height;const{onResize:m}=e;m!==void 0&&m(h)}function J(){const{value:h}=f;h!=null&&(S.value=h.scrollTop,w=h.scrollLeft)}function I(h){let m=h;for(;m!==null;){if(m.style.display==="none")return!0;m=m.parentElement}return!1}return{listHeight:g,listStyle:{overflow:"auto"},keyToIndex:d,itemsStyle:F(()=>{const{itemResizable:h}=e,m=Ae(O.value.sum());return b.value,[e.itemsStyle,{boxSizing:"content-box",height:h?"":m,minHeight:h?m:"",paddingTop:Ae(e.paddingTop),paddingBottom:Ae(e.paddingBottom)}]}),visibleItemsStyle:F(()=>(b.value,{transform:`translateY(${Ae(O.value.sum(M.value))})`})),viewportItems:y,listElRef:f,itemsElRef:R(null),scrollTo:p,handleListResize:te,handleListScroll:D,handleListWheel:Y,handleItemResize:q}},render(){const{itemResizable:e,keyField:n,keyToIndex:i,visibleItemsTag:a}=this;return l(ot,{onResize:this.handleListResize},{default:()=>{var d,f;return l("div",Yt(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?l("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[l(a,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>this.viewportItems.map(g=>{const u=g[n],O=i.get(u),b=this.$slots.default({item:g,index:O})[0];return e?l(ot,{key:u,onResize:w=>this.handleItemResize(u,w)},{default:()=>b}):(b.key=u,b)})})]):(f=(d=this.$slots).empty)===null||f===void 0?void 0:f.call(d)])}})}}),ge="v-hidden",In=Le("[v-hidden]",{display:"none!important"}),ft=oe({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateOverflow:Function},setup(e,{slots:n}){const i=R(null),a=R(null);function d(){const{value:g}=i,{getCounter:u,getTail:O}=e;let b;if(u!==void 0?b=u():b=a.value,!g||!b)return;b.hasAttribute(ge)&&b.removeAttribute(ge);const{children:w}=g,S=g.offsetWidth,M=[],y=n.tail?O==null?void 0:O():null;let p=y?y.offsetWidth:0,x=!1;const E=g.children.length-(n.tail?1:0);for(let L=0;L<E-1;++L){if(L<0)continue;const q=w[L];if(x){q.hasAttribute(ge)||q.setAttribute(ge,"");continue}else q.hasAttribute(ge)&&q.removeAttribute(ge);const G=q.offsetWidth;if(p+=G,M[L]=G,p>S){const{updateCounter:H}=e;for(let D=L;D>=0;--D){const Y=E-1-D;H!==void 0?H(Y):b.textContent=`${Y}`;const te=b.offsetWidth;if(p-=M[D],p+te<=S||D===0){x=!0,L=D-1,y&&(L===-1?(y.style.maxWidth=`${S-te}px`,y.style.boxSizing="border-box"):y.style.maxWidth="");break}}}}const{onUpdateOverflow:k}=e;x?k!==void 0&&k(!0):(k!==void 0&&k(!1),b.setAttribute(ge,""))}const f=pt();return In.mount({id:"vueuc/overflow",head:!0,anchorMetaName:bt,ssr:f}),De(d),{selfRef:i,counterRef:a,sync:d}},render(){const{$slots:e}=this;return Ie(this.sync),l("div",{class:"v-overflow",ref:"selfRef"},[Xt(e,"default"),e.counter?e.counter():l("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}}),Pn=z("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[A("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[pe("+",[A("description",`
 margin-top: 8px;
 `)])]),A("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),A("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),kn=Object.assign(Object.assign({},ce.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),_n=oe({name:"Empty",props:kn,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:i}=mt(e),a=ce("Empty","-empty",Pn,Jt,e,n),{localeRef:d}=Ct("Empty"),f=tt(Qt,null),g=F(()=>{var w,S,M;return(w=e.description)!==null&&w!==void 0?w:(M=(S=f==null?void 0:f.mergedComponentPropsRef.value)===null||S===void 0?void 0:S.Empty)===null||M===void 0?void 0:M.description}),u=F(()=>{var w,S;return((S=(w=f==null?void 0:f.mergedComponentPropsRef.value)===null||w===void 0?void 0:w.Empty)===null||S===void 0?void 0:S.renderIcon)||(()=>l(Tn,null))}),O=F(()=>{const{size:w}=e,{common:{cubicBezierEaseInOut:S},self:{[ae("iconSize",w)]:M,[ae("fontSize",w)]:y,textColor:p,iconColor:x,extraTextColor:E}}=a.value;return{"--n-icon-size":M,"--n-font-size":y,"--n-bezier":S,"--n-text-color":p,"--n-icon-color":x,"--n-extra-text-color":E}}),b=i?Ve("empty",F(()=>{let w="";const{size:S}=e;return w+=S[0],w}),O,e):void 0;return{mergedClsPrefix:n,mergedRenderIcon:u,localizedDescription:F(()=>g.value||d.value.description),cssVars:i?void 0:O,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender}},render(){const{$slots:e,mergedClsPrefix:n,onRender:i}=this;return i==null||i(),l("div",{class:[`${n}-empty`,this.themeClass],style:this.cssVars},this.showIcon?l("div",{class:`${n}-empty__icon`},e.icon?e.icon():l(wt,{clsPrefix:n},{default:this.mergedRenderIcon})):null,this.showDescription?l("div",{class:`${n}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?l("div",{class:`${n}-empty__extra`},e.extra()):null)}}),Bn=l(Sn);function $n(e,n){return l(yt,{name:"fade-in-scale-up-transition"},{default:()=>e?l(wt,{clsPrefix:n,class:`${n}-base-select-option__check`},{default:()=>Bn}):null})}const ht=oe({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:n,pendingTmNodeRef:i,multipleRef:a,valueSetRef:d,renderLabelRef:f,renderOptionRef:g,handleOptionClick:u,handleOptionMouseEnter:O}=tt(nt),b=Ne(()=>{const{value:y}=i;return y?e.tmNode.key===y.key:!1});function w(y){const{tmNode:p}=e;p.disabled||u(y,p)}function S(y){const{tmNode:p}=e;p.disabled||O(y,p)}function M(y){const{tmNode:p}=e,{value:x}=b;p.disabled||x||O(y,p)}return{multiple:a,isGrouped:Ne(()=>{const{tmNode:y}=e,{parent:p}=y;return p&&p.rawNode.type==="group"}),isPending:b,isSelected:Ne(()=>{const{value:y}=n,{value:p}=a;if(y===null)return!1;const x=e.tmNode.rawNode.value;if(p){const{value:E}=d;return E.has(x)}else return y===x}),renderLabel:f,renderOption:g,handleMouseMove:M,handleMouseEnter:S,handleClick:w}},render(){const{clsPrefix:e,tmNode:{rawNode:n},isSelected:i,isPending:a,isGrouped:d,multiple:f,renderOption:g,renderLabel:u,handleClick:O,handleMouseEnter:b,handleMouseMove:w}=this,M=$n(f&&i,e),y=u?[u(n,i),M]:[Ce(n.label,n,i),M],p=l("div",{class:[`${e}-base-select-option`,n.class,{[`${e}-base-select-option--disabled`]:n.disabled,[`${e}-base-select-option--selected`]:i,[`${e}-base-select-option--grouped`]:d,[`${e}-base-select-option--pending`]:a}],style:n.style,onClick:O,onMouseenter:b,onMousemove:w},l("div",{class:`${e}-base-select-option__content`},y));return n.render?n.render({node:p,option:n,selected:i}):g?g({node:p,option:n,selected:i}):p}}),vt=oe({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:n}=tt(nt);return{renderLabel:e,renderOption:n}},render(){const{clsPrefix:e,renderLabel:n,renderOption:i,tmNode:{rawNode:a}}=this,d=n?n(a,!1):Ce(a.label,a,!1),f=l("div",{class:`${e}-base-select-group-header`},d);return a.render?a.render({node:f,option:a}):i?i({node:f,option:a,selected:!1}):f}}),An=z("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[ne("multiple",[z("base-select-option",`
 padding-right: 28px;
 `)]),z("scrollbar",`
 max-height: var(--n-height);
 `),z("virtual-list",`
 max-height: var(--n-height);
 `),z("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[A("content",`
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),z("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),z("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),A("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),A("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),A("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier);
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),z("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),z("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[pe("&:active",`
 color: var(--n-option-text-color-pressed);
 `),ne("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),ne("pending",`
 background-color: var(--n-option-color-pending);
 `),ne("selected",`
 color: var(--n-option-text-color-active);
 background-color: var(--n-option-color-active);
 `),ne("disabled",`
 cursor: not-allowed;
 `,[Je("selected",`
 color: var(--n-option-text-color-disabled);
 `),ne("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),A("check",`
 font-size: 16px;
 position: absolute;
 right: 8px;
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[xt({enterScale:"0.5"})])])]),En=oe({name:"InternalSelectMenu",props:Object.assign(Object.assign({},ce.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},width:[Number,String],autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,onToggle:Function}),setup(e){const n=ce("InternalSelectMenu","-internal-select-menu",An,en,e,X(e,"clsPrefix")),i=R(null),a=R(null),d=R(null),f=F(()=>e.treeMate.getFlattenedNodes()),g=F(()=>tn(f.value)),u=R(null);function O(){const{treeMate:o}=e;let s=null;if(e.autoPending){const{value:$}=e;$===null?s=o.getFirstAvailableNode():(e.multiple?s=o.getNode(($||[])[($||[]).length-1]):s=o.getNode($),(!s||s.disabled)&&(s=o.getFirstAvailableNode())),s&&I(s)}}let b;be(X(e,"show"),o=>{o?b=be(e.resetMenuOnOptionsChange?[X(e,"treeMate"),X(e,"multiple")]:[X(e,"multiple")],()=>{O(),Ie(h)},{immediate:!0}):b==null||b()},{immediate:!0});const w=F(()=>Xe(n.value.self[ae("optionHeight",e.size)])),S=F(()=>it(n.value.self[ae("padding",e.size)])),M=F(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),y=F(()=>{const o=f.value;return o&&o.length===0});function p(o){const{onToggle:s}=e;s&&s(o)}function x(o){const{onScroll:s}=e;s&&s(o)}function E(o){var s;(s=d.value)===null||s===void 0||s.sync(),x(o)}function k(){var o;(o=d.value)===null||o===void 0||o.sync()}function L(){const{value:o}=u;return o||null}function q(o,s){s.disabled||I(s,!1)}function G(o,s){s.disabled||p(s)}function H(o){var s;Qe(o,"action")||(s=e.onKeyup)===null||s===void 0||s.call(e,o)}function D(o){var s;Qe(o,"action")||(s=e.onKeydown)===null||s===void 0||s.call(e,o)}function Y(o){var s;(s=e.onMousedown)===null||s===void 0||s.call(e,o),!e.focusable&&o.preventDefault()}function te(){const{value:o}=u;o&&I(o.getNext({loop:!0}),!0)}function J(){const{value:o}=u;o&&I(o.getPrev({loop:!0}),!0)}function I(o,s=!1){u.value=o,s&&h()}function h(){var o,s;const $=u.value;if(!$)return;const Z=g.value($.key);Z!==null&&(e.virtualScroll?(o=a.value)===null||o===void 0||o.scrollTo({index:Z}):(s=d.value)===null||s===void 0||s.scrollTo({index:Z,elSize:w.value}))}function m(o){var s,$;!((s=i.value)===null||s===void 0)&&s.contains(o.target)&&(($=e.onFocus)===null||$===void 0||$.call(e,o))}function P(o){var s,$;!((s=i.value)===null||s===void 0)&&s.contains(o.relatedTarget)||($=e.onBlur)===null||$===void 0||$.call(e,o)}lt(nt,{handleOptionMouseEnter:q,handleOptionClick:G,valueSetRef:M,multipleRef:X(e,"multiple"),valueRef:X(e,"value"),renderLabelRef:X(e,"renderLabel"),renderOptionRef:X(e,"renderOption"),pendingTmNodeRef:u}),lt(nn,i),De(()=>{const{value:o}=d;o&&o.sync()});const B=F(()=>{const{size:o}=e,{common:{cubicBezierEaseInOut:s},self:{height:$,borderRadius:Z,color:Q,groupHeaderTextColor:le,actionDividerColor:me,optionTextColorPressed:we,optionTextColor:se,optionTextColorDisabled:ee,optionTextColorActive:ye,optionOpacityDisabled:ue,optionCheckColor:Se,actionTextColor:Te,optionColorPending:Re,optionColorActive:fe,loadingColor:he,loadingSize:Oe,[ae("optionFontSize",o)]:Me,[ae("optionHeight",o)]:ze,[ae("optionPadding",o)]:ve}}=n.value;return{"--n-height":$,"--n-action-divider-color":me,"--n-action-text-color":Te,"--n-bezier":s,"--n-border-radius":Z,"--n-color":Q,"--n-option-font-size":Me,"--n-group-header-text-color":le,"--n-option-check-color":Se,"--n-option-color-pending":Re,"--n-option-color-active":fe,"--n-option-height":ze,"--n-option-opacity-disabled":ue,"--n-option-text-color":se,"--n-option-text-color-active":ye,"--n-option-text-color-disabled":ee,"--n-option-text-color-pressed":we,"--n-option-padding":ve,"--n-option-padding-left":it(ve,"left"),"--n-loading-color":he,"--n-loading-size":Oe}}),{inlineThemeDisabled:V}=e,_=V?Ve("internal-select-menu",F(()=>e.size[0]),B,e):void 0,N={selfRef:i,next:te,prev:J,getPendingTmNode:L};return Object.assign({mergedTheme:n,virtualListRef:a,scrollbarRef:d,itemSize:w,padding:S,flattenedNodes:f,empty:y,virtualListContainer(){const{value:o}=a;return o==null?void 0:o.listElRef},virtualListContent(){const{value:o}=a;return o==null?void 0:o.itemsElRef},doScroll:x,handleFocusin:m,handleFocusout:P,handleKeyUp:H,handleKeyDown:D,handleMouseDown:Y,handleVirtualListResize:k,handleVirtualListScroll:E,cssVars:V?void 0:B,themeClass:_==null?void 0:_.themeClass,onRender:_==null?void 0:_.onRender},N)},render(){const{$slots:e,virtualScroll:n,clsPrefix:i,mergedTheme:a,themeClass:d,onRender:f}=this;return f==null||f(),l("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${i}-base-select-menu`,d,this.multiple&&`${i}-base-select-menu--multiple`],style:[{width:sn(this.width)},this.cssVars],onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},this.loading?l("div",{class:`${i}-base-select-menu__loading`},l(ln,{clsPrefix:i,strokeWidth:20})):this.empty?l("div",{class:`${i}-base-select-menu__empty`},an(e.empty,()=>[l(_n,{theme:a.peers.Empty,themeOverrides:a.peerOverrides.Empty})])):l(rn,{ref:"scrollbarRef",theme:a.peers.Scrollbar,themeOverrides:a.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},{default:()=>n?l(Fn,{ref:"virtualListRef",class:`${i}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:g})=>g.isGroup?l(vt,{key:g.key,clsPrefix:i,tmNode:g}):g.ignored?null:l(ht,{clsPrefix:i,key:g.key,tmNode:g})}):l("div",{class:`${i}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(g=>g.isGroup?l(vt,{key:g.key,clsPrefix:i,tmNode:g}):l(ht,{clsPrefix:i,key:g.key,tmNode:g})))}),on(e.action,g=>g&&[l("div",{class:`${i}-base-select-menu__action`,"data-action":!0,key:"action"},g),l(Rn,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),Nn=pe([z("base-selection",`
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[z("base-loading",`
 color: var(--n-loading-color);
 `),z("base-selection-tags","min-height: var(--n-height);"),A("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),A("state-border",`
 z-index: 1;
 border-color: #0000;
 `),z("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[A("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),z("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[A("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),z("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `),z("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),z("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[z("base-selection-input",`
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[A("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),A("render-label",`
 color: var(--n-text-color);
 `)]),Je("disabled",[pe("&:hover",[A("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),ne("focus",[A("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),ne("active",[A("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),z("base-selection-label","background-color: var(--n-color-active);"),z("base-selection-tags","background-color: var(--n-color-active);")])]),ne("disabled","cursor: not-allowed;",[A("arrow",`
 color: var(--n-arrow-color-disabled);
 `),z("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[z("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),A("render-label",`
 color: var(--n-text-color-disabled);
 `)]),z("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),z("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),z("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[A("input",`
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),A("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>ne(`${e}-status`,[A("state-border",`border: var(--n-border-${e});`),Je("disabled",[pe("&:hover",[A("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),ne("active",[A("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),z("base-selection-label",`background-color: var(--n-color-active-${e});`),z("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),ne("focus",[A("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),z("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 `),z("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[pe("&:last-child","padding-right: 0;"),z("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[A("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Ln=oe({name:"InternalSelection",props:Object.assign(Object.assign({},ce.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeyup:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean}),setup(e){const n=R(null),i=R(null),a=R(null),d=R(null),f=R(null),g=R(null),u=R(null),O=R(null),b=R(null),w=R(null),S=R(!1),M=R(!1),y=R(!1),p=ce("InternalSelection","-internal-selection",Nn,un,e,X(e,"clsPrefix")),x=F(()=>e.clearable&&!e.disabled&&(y.value||e.active)),E=F(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Ce(e.selectedOption.label,e.selectedOption,!0):e.placeholder),k=F(()=>{const r=e.selectedOption;if(r)return r.label}),L=F(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function q(){var r;const{value:v}=n;if(v){const{value:U}=i;U&&(U.style.width=`${v.offsetWidth}px`,e.maxTagCount!=="responsive"&&((r=b.value)===null||r===void 0||r.sync()))}}function G(){const{value:r}=w;r&&(r.style.display="none")}function H(){const{value:r}=w;r&&(r.style.display="inline-block")}be(X(e,"active"),r=>{r||G()}),be(X(e,"pattern"),()=>{e.multiple&&Ie(q)});function D(r){const{onFocus:v}=e;v&&v(r)}function Y(r){const{onBlur:v}=e;v&&v(r)}function te(r){const{onDeleteOption:v}=e;v&&v(r)}function J(r){const{onClear:v}=e;v&&v(r)}function I(r){const{onPatternInput:v}=e;v&&v(r)}function h(r){var v;(!r.relatedTarget||!(!((v=a.value)===null||v===void 0)&&v.contains(r.relatedTarget)))&&D(r)}function m(r){var v;!((v=a.value)===null||v===void 0)&&v.contains(r.relatedTarget)||Y(r)}function P(r){J(r)}function B(){y.value=!0}function V(){y.value=!1}function _(r){!e.active||!e.filterable||r.target!==i.value&&r.preventDefault()}function N(r){te(r)}function o(r){if(r.code==="Backspace"&&!s.value&&!e.pattern.length){const{selectedOptions:v}=e;v!=null&&v.length&&N(v[v.length-1])}}const s=R(!1);let $=null;function Z(r){const{value:v}=n;if(v){const U=r.target.value;v.textContent=U,q()}s.value?$=r:I(r)}function Q(){s.value=!0}function le(){s.value=!1,I($),$=null}function me(r){var v;M.value=!0,(v=e.onPatternFocus)===null||v===void 0||v.call(e,r)}function we(r){var v;M.value=!1,(v=e.onPatternBlur)===null||v===void 0||v.call(e,r)}function se(){var r,v;if(e.filterable)M.value=!1,(r=g.value)===null||r===void 0||r.blur(),(v=i.value)===null||v===void 0||v.blur();else if(e.multiple){const{value:U}=d;U==null||U.blur()}else{const{value:U}=f;U==null||U.blur()}}function ee(){var r,v,U;e.filterable?(M.value=!1,(r=g.value)===null||r===void 0||r.focus()):e.multiple?(v=d.value)===null||v===void 0||v.focus():(U=f.value)===null||U===void 0||U.focus()}function ye(){const{value:r}=i;r&&(H(),r.focus())}function ue(){const{value:r}=i;r&&r.blur()}function Se(r){const{value:v}=u;v&&v.setTextContent(`+${r}`)}function Te(){const{value:r}=O;return r}function Re(){return i.value}let fe=null;function he(){fe!==null&&window.clearTimeout(fe)}function Oe(){e.disabled||e.active||(he(),fe=window.setTimeout(()=>{S.value=!0},100))}function Me(){he()}function ze(r){r||(he(),S.value=!1)}De(()=>{dn(()=>{const r=g.value;r&&(r.tabIndex=e.disabled||M.value?-1:0)})});const{inlineThemeDisabled:ve}=e,Pe=F(()=>{const{size:r}=e,{common:{cubicBezierEaseInOut:v},self:{borderRadius:U,color:He,placeholderColor:je,textColor:Ke,paddingSingle:ke,paddingMultiple:_e,caretColor:Ue,colorDisabled:Fe,textColorDisabled:qe,placeholderColorDisabled:Be,colorActive:de,boxShadowFocus:t,boxShadowActive:c,boxShadowHover:C,border:W,borderFocus:T,borderHover:j,borderActive:K,arrowColor:xe,arrowColorDisabled:$e,loadingColor:Ge,colorActiveWarning:Tt,boxShadowFocusWarning:Rt,boxShadowActiveWarning:Ot,boxShadowHoverWarning:Mt,borderWarning:zt,borderFocusWarning:Ft,borderHoverWarning:It,borderActiveWarning:Pt,colorActiveError:kt,boxShadowFocusError:_t,boxShadowActiveError:Bt,boxShadowHoverError:$t,borderError:At,borderFocusError:Et,borderHoverError:Nt,borderActiveError:Lt,clearColor:Dt,clearColorHover:Vt,clearColorPressed:Wt,clearSize:Ht,arrowSize:jt,[ae("height",r)]:Kt,[ae("fontSize",r)]:Ut}}=p.value;return{"--n-bezier":v,"--n-border":W,"--n-border-active":K,"--n-border-focus":T,"--n-border-hover":j,"--n-border-radius":U,"--n-box-shadow-active":c,"--n-box-shadow-focus":t,"--n-box-shadow-hover":C,"--n-caret-color":Ue,"--n-color":He,"--n-color-active":de,"--n-color-disabled":Fe,"--n-font-size":Ut,"--n-height":Kt,"--n-padding-single":ke,"--n-padding-multiple":_e,"--n-placeholder-color":je,"--n-placeholder-color-disabled":Be,"--n-text-color":Ke,"--n-text-color-disabled":qe,"--n-arrow-color":xe,"--n-arrow-color-disabled":$e,"--n-loading-color":Ge,"--n-color-active-warning":Tt,"--n-box-shadow-focus-warning":Rt,"--n-box-shadow-active-warning":Ot,"--n-box-shadow-hover-warning":Mt,"--n-border-warning":zt,"--n-border-focus-warning":Ft,"--n-border-hover-warning":It,"--n-border-active-warning":Pt,"--n-color-active-error":kt,"--n-box-shadow-focus-error":_t,"--n-box-shadow-active-error":Bt,"--n-box-shadow-hover-error":$t,"--n-border-error":At,"--n-border-focus-error":Et,"--n-border-hover-error":Nt,"--n-border-active-error":Lt,"--n-clear-size":Ht,"--n-clear-color":Dt,"--n-clear-color-hover":Vt,"--n-clear-color-pressed":Wt,"--n-arrow-size":jt}}),re=ve?Ve("internal-selection",F(()=>e.size[0]),Pe,e):void 0;return{mergedTheme:p,mergedClearable:x,patternInputFocused:M,filterablePlaceholder:E,label:k,selected:L,showTagsPanel:S,isCompositing:s,counterRef:u,counterWrapperRef:O,patternInputMirrorRef:n,patternInputRef:i,selfRef:a,multipleElRef:d,singleElRef:f,patternInputWrapperRef:g,overflowRef:b,inputTagElRef:w,handleMouseDown:_,handleFocusin:h,handleClear:P,handleMouseEnter:B,handleMouseLeave:V,handleDeleteOption:N,handlePatternKeyDown:o,handlePatternInputInput:Z,handlePatternInputBlur:we,handlePatternInputFocus:me,handleMouseEnterCounter:Oe,handleMouseLeaveCounter:Me,handleFocusout:m,handleCompositionEnd:le,handleCompositionStart:Q,onPopoverUpdateShow:ze,focus:ee,focusInput:ye,blur:se,blurInput:ue,updateCounter:Se,getCounter:Te,getTail:Re,renderLabel:e.renderLabel,cssVars:ve?void 0:Pe,themeClass:re==null?void 0:re.themeClass,onRender:re==null?void 0:re.onRender}},render(){const{status:e,multiple:n,size:i,disabled:a,filterable:d,maxTagCount:f,bordered:g,clsPrefix:u,onRender:O,renderTag:b,renderLabel:w}=this;O==null||O();const S=f==="responsive",M=typeof f=="number",y=S||M,p=l(xn,{clsPrefix:u,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var E,k;return(k=(E=this.$slots).arrow)===null||k===void 0?void 0:k.call(E)}});let x;if(n){const E=I=>l("div",{class:`${u}-base-selection-tag-wrapper`,key:I.value},b?b({option:I,handleClose:()=>this.handleDeleteOption(I)}):l(Ye,{size:i,closable:!I.disabled,disabled:a,internalStopClickPropagation:!0,onClose:()=>this.handleDeleteOption(I)},{default:()=>w?w(I,!0):Ce(I.label,I,!0)})),k=(M?this.selectedOptions.slice(0,f):this.selectedOptions).map(E),L=d?l("div",{class:`${u}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},l("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:a,value:this.pattern,autofocus:this.autofocus,class:`${u}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),l("span",{ref:"patternInputMirrorRef",class:`${u}-base-selection-input-tag__mirror`},this.pattern)):null,q=S?()=>l("div",{class:`${u}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},l(Ye,{size:i,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:a})):void 0;let G;if(M){const I=this.selectedOptions.length-f;I>0&&(G=l("div",{class:`${u}-base-selection-tag-wrapper`,key:"__counter__"},l(Ye,{size:i,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:a},{default:()=>`+${I}`})))}const H=S?d?l(ft,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:()=>k,counter:q,tail:()=>L}):l(ft,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:()=>k,counter:q}):M?k.concat(G):k,D=y?()=>l("div",{class:`${u}-base-selection-popover`},S?k:this.selectedOptions.map(E)):void 0,Y=y?{show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover}:null,J=(this.selected?!1:this.active?!this.pattern&&!this.isCompositing:!0)?l("div",{class:`${u}-base-selection-placeholder ${u}-base-selection-overlay`},this.placeholder):null;if(d){const I=l("div",{ref:"patternInputWrapperRef",class:`${u}-base-selection-tags`},H,S?null:L,p);x=l(at,null,y?l(rt,Object.assign({},Y),{trigger:()=>I,default:D}):I,J)}else{const I=l("div",{ref:"multipleElRef",class:`${u}-base-selection-tags`,tabindex:a?void 0:0},H,p);x=l(at,null,y?l(rt,Object.assign({},Y),{trigger:()=>I,default:D}):I,J)}}else if(d){const E=this.pattern||this.isCompositing,k=this.active?!E:!this.selected,L=this.active?!1:this.selected;x=l("div",{ref:"patternInputWrapperRef",class:`${u}-base-selection-label`},l("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${u}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:a,disabled:a,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),L?l("div",{class:`${u}-base-selection-label__render-label ${u}-base-selection-overlay`,key:"input"},l("div",{class:`${u}-base-selection-overlay__wrapper`},b?b({option:this.selectedOption,handleClose:()=>{}}):w?w(this.selectedOption,!0):Ce(this.label,this.selectedOption,!0))):null,k?l("div",{class:`${u}-base-selection-placeholder ${u}-base-selection-overlay`,key:"placeholder"},l("div",{class:`${u}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,p)}else x=l("div",{ref:"singleElRef",class:`${u}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?l("div",{class:`${u}-base-selection-input`,title:Cn(this.label),key:"input"},l("div",{class:`${u}-base-selection-input__content`},b?b({option:this.selectedOption,handleClose:()=>{}}):w?w(this.selectedOption,!0):Ce(this.label,this.selectedOption,!0))):l("div",{class:`${u}-base-selection-placeholder ${u}-base-selection-overlay`,key:"placeholder"},this.placeholder),p);return l("div",{ref:"selfRef",class:[`${u}-base-selection`,this.themeClass,e&&`${u}-base-selection--${e}-status`,{[`${u}-base-selection--active`]:this.active,[`${u}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${u}-base-selection--disabled`]:this.disabled,[`${u}-base-selection--multiple`]:this.multiple,[`${u}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeyup:this.onKeyup,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},x,g?l("div",{class:`${u}-base-selection__border`}):null,g?l("div",{class:`${u}-base-selection__state-border`}):null)}});function Dn(e){return We(e)?e.name||e.key||"key-required":e.value}function We(e){return e.type==="group"}function St(e){return e.type==="ignored"}const Vn={getKey:Dn,getIsGroup:We,getIgnored:St};function gt(e,n){try{return!!(1+n.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function Wn(e,n,i){if(!n)return e;function a(d){if(!Array.isArray(d))return[];const f=[];for(const g of d)if(We(g)){const u=a(g.children);u.length&&f.push(Object.assign({},g,{children:u}))}else{if(St(g))continue;n(i,g)&&f.push(g)}return f}return a(e)}function Hn(e){const n=new Map;return e.forEach(i=>{We(i)?i.children.forEach(a=>{n.set(a.value,a)}):n.set(i.value,i)}),n}function jn(e,n){return n?typeof n.label=="string"?gt(e,n.label):n.value!==void 0?gt(e,String(n.value)):!1:!1}const Kn=pe([z("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `),z("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[xt()])]),Un=Object.assign(Object.assign({},ce.props),{to:et.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:{type:Function,default:jn},placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:{type:Function,default:e=>({label:e,value:e})},fallbackOption:{type:[Function,Boolean],default:()=>e=>({label:String(e),value:e})},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,onChange:[Function,Array],items:Array}),Zn=oe({name:"Select",props:Un,setup(e){const{mergedClsPrefixRef:n,mergedBorderedRef:i,namespaceRef:a,inlineThemeDisabled:d}=mt(e),f=ce("Select","-select",Kn,cn,e,n),g=R(e.defaultValue),u=X(e,"value"),O=st(u,g),b=R(!1),w=R(""),S=F(()=>fn(I.value,Vn)),M=F(()=>Hn(J.value)),y=R(!1),p=st(X(e,"show"),y),x=R(null),E=R(null),k=R(null),{localeRef:L}=Ct("Select"),q=F(()=>{var t;return(t=e.placeholder)!==null&&t!==void 0?t:L.value.placeholder}),G=hn(e,["items","options"]),H=R([]),D=R([]),Y=R(new Map),te=F(()=>{const{fallbackOption:t}=e;return t?c=>Object.assign(t(c),{value:c}):!1}),J=F(()=>D.value.concat(H.value).concat(G.value)),I=F(()=>{if(e.remote)return G.value;{const{value:t}=J,{value:c}=w;if(!c.length||!e.filterable)return t;{const{filter:C}=e;return Wn(t,C,c)}}});function h(t){const c=e.remote,{value:C}=Y,{value:W}=M,{value:T}=te,j=[];return t.forEach(K=>{if(W.has(K))j.push(W.get(K));else if(c&&C.has(K))j.push(C.get(K));else if(T){const xe=T(K);xe&&j.push(xe)}}),j}const m=F(()=>{if(e.multiple){const{value:t}=O;return Array.isArray(t)?h(t):[]}return null}),P=F(()=>{const{value:t}=O;return!e.multiple&&!Array.isArray(t)?t===null?null:h([t])[0]||null:null}),B=vn(e),{mergedSizeRef:V,mergedDisabledRef:_,mergedStatusRef:N}=B;function o(t,c){const{onChange:C,"onUpdate:value":W,onUpdateValue:T}=e,{nTriggerFormChange:j,nTriggerFormInput:K}=B;C&&ie(C,t,c),T&&ie(T,t,c),W&&ie(W,t,c),g.value=t,j(),K()}function s(t){const{onBlur:c}=e,{nTriggerFormBlur:C}=B;c&&ie(c,t),C()}function $(){const{onClear:t}=e;t&&ie(t)}function Z(t){const{onFocus:c}=e,{nTriggerFormFocus:C}=B;c&&ie(c,t),C()}function Q(t){const{onSearch:c}=e;c&&ie(c,t)}function le(t){const{onScroll:c}=e;c&&ie(c,t)}function me(){var t;const{remote:c,multiple:C}=e;if(c){const{value:W}=Y;if(C)(t=m.value)===null||t===void 0||t.forEach(T=>{W.set(T.value,T)});else{const T=P.value;T&&W.set(T.value,T)}}}function we(t){const{onUpdateShow:c,"onUpdate:show":C}=e;c&&ie(c,t),C&&ie(C,t),y.value=t}function se(){_.value||(we(!0),y.value=!0,e.filterable&&Ue())}function ee(){we(!1)}function ye(){w.value="",D.value=[]}const ue=R(!1);function Se(){e.filterable&&(ue.value=!0)}function Te(){e.filterable&&(ue.value=!1,p.value||ye())}function Re(){_.value||(p.value?e.filterable||ee():se())}function fe(t){var c,C;!((C=(c=k.value)===null||c===void 0?void 0:c.selfRef)===null||C===void 0)&&C.contains(t.relatedTarget)||(b.value=!1,s(t),ee())}function he(t){Z(t),b.value=!0}function Oe(t){b.value=!0}function Me(t){var c;!((c=x.value)===null||c===void 0)&&c.$el.contains(t.relatedTarget)||(b.value=!1,s(t),ee())}function ze(){var t;(t=x.value)===null||t===void 0||t.focus(),ee()}function ve(t){var c;p.value&&(!((c=x.value)===null||c===void 0)&&c.$el.contains(t.target)||ee())}function Pe(t){if(!Array.isArray(t))return[];if(te.value)return Array.from(t);{const{remote:c}=e,{value:C}=M;if(c){const{value:W}=Y;return t.filter(T=>C.has(T)||W.has(T))}else return t.filter(W=>C.has(W))}}function re(t){r(t.rawNode)}function r(t){if(_.value)return;const{tag:c,remote:C,clearFilterAfterSelect:W}=e;if(c&&!C){const{value:T}=D,j=T[0]||null;j&&(H.value.push(j),D.value=[])}if(C&&Y.value.set(t.value,t),e.multiple){const T=Pe(O.value),j=T.findIndex(K=>K===t.value);if(~j){if(T.splice(j,1),c&&!C){const K=v(t.value);~K&&(H.value.splice(K,1),W&&(w.value=""))}}else T.push(t.value),W&&(w.value="");o(T,h(T))}else{if(c&&!C){const T=v(t.value);~T?H.value=[H.value[T]]:H.value=[]}_e(),ee(),o(t.value,t)}}function v(t){return H.value.findIndex(C=>C.value===t)}function U(t){p.value||se();const{value:c}=t.target;w.value=c;const{tag:C,remote:W}=e;if(Q(c),C&&!W){if(!c){D.value=[];return}const T=e.onCreate(c);G.value.some(j=>j.value===T.value)||H.value.some(j=>j.value===T.value)?D.value=[]:D.value=[T]}}function He(t){t.stopPropagation();const{multiple:c}=e;!c&&e.filterable&&ee(),$(),c?o([],[]):o(null,null)}function je(t){Qe(t,"action")||t.preventDefault()}function Ke(t){le(t)}function ke(t){var c,C,W,T,j;switch(t.code){case"Space":if(e.filterable)break;t.preventDefault();case"Enter":case"NumpadEnter":if(!(!((c=x.value)===null||c===void 0)&&c.isCompositing)){if(p.value){const K=(C=k.value)===null||C===void 0?void 0:C.getPendingTmNode();K?re(K):e.filterable||(ee(),_e())}else if(se(),e.tag&&ue.value){const K=D.value[0];if(K){const xe=K.value,{value:$e}=O;e.multiple&&Array.isArray($e)&&$e.some(Ge=>Ge===xe)||r(K)}}}t.preventDefault();break;case"ArrowUp":if(t.preventDefault(),e.loading)return;p.value&&((W=k.value)===null||W===void 0||W.prev());break;case"ArrowDown":if(t.preventDefault(),e.loading)return;p.value?(T=k.value)===null||T===void 0||T.next():se();break;case"Escape":ee(),(j=x.value)===null||j===void 0||j.focus();break}}function _e(){var t;(t=x.value)===null||t===void 0||t.focus()}function Ue(){var t;(t=x.value)===null||t===void 0||t.focusInput()}function Fe(){var t;(t=E.value)===null||t===void 0||t.syncPosition()}me(),be(X(e,"options"),me),be(I,()=>{p.value&&Ie(Fe)}),be(O,()=>{p.value&&Ie(Fe)});const qe={focus:()=>{var t;(t=x.value)===null||t===void 0||t.focus()},blur:()=>{var t;(t=x.value)===null||t===void 0||t.blur()}},Be=F(()=>{const{self:{menuBoxShadow:t}}=f.value;return{"--n-menu-box-shadow":t}}),de=d?Ve("select",void 0,Be,e):void 0;return Object.assign(Object.assign({},qe),{mergedStatus:N,mergedClsPrefix:n,mergedBordered:i,namespace:a,treeMate:S,isMounted:gn(),triggerRef:x,menuRef:k,pattern:w,uncontrolledShow:y,mergedShow:p,adjustedTo:et(e),uncontrolledValue:g,mergedValue:O,followerRef:E,localizedPlaceholder:q,selectedOption:P,selectedOptions:m,mergedSize:V,mergedDisabled:_,focused:b,activeWithoutMenuOpen:ue,inlineThemeDisabled:d,onTriggerInputFocus:Se,onTriggerInputBlur:Te,handleMenuFocus:Oe,handleMenuBlur:Me,handleMenuTabOut:ze,handleTriggerClick:Re,handleToggle:re,handleDeleteOption:r,handlePatternInput:U,handleClear:He,handleTriggerBlur:fe,handleTriggerFocus:he,handleKeydown:ke,syncPosition:Fe,handleMenuAfterLeave:ye,handleMenuClickOutside:ve,handleMenuScroll:Ke,handleMenuKeydown:ke,handleMenuMousedown:je,mergedTheme:f,cssVars:d?void 0:Be,themeClass:de==null?void 0:de.themeClass,onRender:de==null?void 0:de.onRender})},render(){return l("div",{class:`${this.mergedClsPrefix}-select`},l(pn,null,{default:()=>[l(bn,null,{default:()=>l(Ln,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus},{arrow:()=>{var e,n;return[(n=(e=this.$slots).arrow)===null||n===void 0?void 0:n.call(e)]}})}),l(mn,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===et.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>l(yt,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,n,i;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),wn(l(En,Object.assign({},this.menuProps,{ref:"menuRef",inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(n=this.menuProps)===null||n===void 0?void 0:n.class],clsPrefix:this.mergedClsPrefix,focusable:!0,autoPending:!0,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:"medium",renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(i=this.menuProps)===null||i===void 0?void 0:i.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange}),{empty:()=>{var a,d;return[(d=(a=this.$slots).empty)===null||d===void 0?void 0:d.call(a)]},action:()=>{var a,d;return[(d=(a=this.$slots).action)===null||d===void 0?void 0:d.call(a)]}}),this.displayDirective==="show"?[[yn,this.mergedShow],[ut,this.handleMenuClickOutside]]:[[ut,this.handleMenuClickOutside]])):null}})})]}))}});export{Zn as N};
