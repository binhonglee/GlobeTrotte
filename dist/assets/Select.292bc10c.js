import{d as Q,y as i,af as ht,ag as vt,Z as Le,ah as Ht,x as I,V as O,Y as Ee,ai as Ze,a6 as tt,aj as Ne,ak as Kt,al as Ut,am as Ae,a8 as Ie,an as qt,A as F,C as B,B as he,T as gt,U as ae,u as Qe,v as Gt,a3 as De,K as pt,ao as Zt,ad as oe,ap as et,aq as bt,ar as ye,Q as J,S as Ye,as as mt,I as G,at as Yt,ac as ve,a1 as nt,au as Xt,a4 as Jt,L as Qt,a5 as en,M as tn,av as nn,aw as Xe,ax as on,ae as ot,ay as ln,a0 as rn,az as it,F as lt,W as rt,aA as an,X as sn,aB as dn,aC as Je,aD as un,aE as cn,aF as fn,aG as hn,aH as vn,aI as at,aJ as gn,aa as ee,aK as pn}from"./index.d5b430d6.js";import{u as wt,a as bn}from"./Input.54579554.js";import{N as Ge}from"./DataProps.2de129e3.js";function mn(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}const wn=Q({name:"Checkmark",render(){return i("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},i("g",{fill:"none"},i("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),yn=Q({name:"Empty",render(){return i("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),i("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),xn=Q({props:{onFocus:Function,onBlur:Function},setup(e){return()=>i("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}});function st(e){return e&-e}class Cn{constructor(n,o){this.l=n,this.min=o;const r=new Array(n+1);for(let d=0;d<n+1;++d)r[d]=0;this.ft=r}add(n,o){if(o===0)return;const{l:r,ft:d}=this;for(n+=1;n<=r;)d[n]+=o,n+=st(n)}get(n){return this.sum(n+1)-this.sum(n)}sum(n){if(n===0)return 0;const{ft:o,min:r,l:d}=this;if(n===void 0&&(n=d),n>d)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let p=n*r;for(;n>0;)p+=o[n],n-=st(n);return p}getBound(n){let o=0,r=this.l;for(;r>o;){const d=Math.floor((o+r)/2),p=this.sum(d);if(p>n){r=d;continue}else if(p<n){if(o===d)return this.sum(o+1)<=n?o+1:d;o=d}else return d}return o}}const Sn=Ne(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[Ne("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[Ne("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),Rn=Q({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const n=ht();Sn.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:vt,ssr:n}),Le(()=>{const{defaultScrollIndex:g,defaultScrollKey:f}=e;g!=null?S({index:g}):f!=null&&S({key:f})}),Ht(()=>{S({top:M.value})});const o=I(()=>{const g=new Map,{keyField:f}=e;return e.items.forEach((k,_)=>{g.set(k[f],_)}),g}),r=O(null),d=O(void 0),p=new Map,v=I(()=>{const{items:g,itemSize:f,keyField:k}=e,_=new Cn(g.length,f);return g.forEach(($,x)=>{const A=$[k],H=p.get(A);H!==void 0&&_.add(x,H)}),_}),s=O(0),M=O(0),b=Ee(()=>Math.max(v.value.getBound(M.value-Ze(e.paddingTop))-1,0)),w=I(()=>{const{value:g}=d;if(g===void 0)return[];const{items:f,itemSize:k}=e,_=b.value,$=Math.min(_+Math.ceil(g/k+1),f.length-1),x=[];for(let A=_;A<=$;++A)x.push(f[A]);return x}),S=g=>{const{left:f,top:k,index:_,key:$,position:x,behavior:A,debounce:H=!0}=g;if(f!==void 0||k!==void 0)y(f,k,A);else if(_!==void 0)z(_,A,H);else if($!==void 0){const X=o.value.get($);X!==void 0&&z(X,A,H)}else x==="bottom"?y(0,Number.MAX_SAFE_INTEGER,A):x==="top"&&y(0,0,A)};function z(g,f,k){const{value:_}=v,$=_.sum(g)+Ze(e.paddingTop);if(!k)r.value.scrollTo({left:0,top:$,behavior:f});else{const{scrollTop:x,offsetHeight:A}=r.value;if($>x){const H=_.get(g);$+H<=x+A||r.value.scrollTo({left:0,top:$+H-A,behavior:f})}else r.value.scrollTo({left:0,top:$,behavior:f})}P=g}function y(g,f,k){r.value.scrollTo({left:g,top:f,behavior:k})}function m(g,f){var k,_,$,x;if(e.ignoreItemResize||q(f.target))return;const{value:A}=v,H=o.value.get(g),X=A.get(H),Z=($=(_=(k=f.borderBoxSize)===null||k===void 0?void 0:k[0])===null||_===void 0?void 0:_.blockSize)!==null&&$!==void 0?$:f.contentRect.height;if(Z===X)return;Z-e.itemSize===0?p.delete(g):p.set(g,Z-e.itemSize);const U=Z-X;U!==0&&(N!==void 0&&H<=N&&((x=r.value)===null||x===void 0||x.scrollBy(0,U)),A.add(H,U),s.value++)}function T(g){Kt(K);const{onScroll:f}=e;f!==void 0&&f(g)}function E(g){if(q(g.target)||g.contentRect.height===d.value)return;d.value=g.contentRect.height;const{onResize:f}=e;f!==void 0&&f(g)}let P,N;function K(){const{value:g}=r;g!=null&&(N=P!=null?P:b.value,P=void 0,M.value=r.value.scrollTop)}function q(g){let f=g;for(;f!==null;){if(f.style.display==="none")return!0;f=f.parentElement}return!1}return{listHeight:d,listStyle:{overflow:"auto"},keyToIndex:o,itemsStyle:I(()=>{const{itemResizable:g}=e,f=Ae(v.value.sum());return s.value,[e.itemsStyle,{boxSizing:"content-box",height:g?"":f,minHeight:g?f:"",paddingTop:Ae(e.paddingTop),paddingBottom:Ae(e.paddingBottom)}]}),visibleItemsStyle:I(()=>(s.value,{transform:`translateY(${Ae(v.value.sum(b.value))})`})),viewportItems:w,listElRef:r,itemsElRef:O(null),scrollTo:S,handleListResize:E,handleListScroll:T,handleItemResize:m}},render(){const{itemResizable:e,keyField:n,keyToIndex:o,visibleItemsTag:r}=this;return i(tt,{onResize:this.handleListResize},{default:()=>{var d,p;return i("div",Ut(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.onWheel,ref:"listElRef"}),[this.items.length!==0?i("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[i(r,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>this.viewportItems.map(v=>{const s=v[n],M=o.get(s),b=this.$slots.default({item:v,index:M})[0];return e?i(tt,{key:s,onResize:w=>this.handleItemResize(s,w)},{default:()=>b}):(b.key=s,b)})})]):(p=(d=this.$slots).empty)===null||p===void 0?void 0:p.call(d)])}})}}),fe="v-hidden",On=Ne("[v-hidden]",{display:"none!important"}),dt=Q({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateOverflow:Function},setup(e,{slots:n}){const o=O(null),r=O(null);function d(){const{value:v}=o,{getCounter:s,getTail:M}=e;let b;if(s!==void 0?b=s():b=r.value,!v||!b)return;b.hasAttribute(fe)&&b.removeAttribute(fe);const{children:w}=v,S=v.offsetWidth,z=[],y=n.tail?M==null?void 0:M():null;let m=y?y.offsetWidth:0,T=!1;const E=v.children.length-(n.tail?1:0);for(let N=0;N<E-1;++N){if(N<0)continue;const K=w[N];if(T){K.hasAttribute(fe)||K.setAttribute(fe,"");continue}else K.hasAttribute(fe)&&K.removeAttribute(fe);const q=K.offsetWidth;if(m+=q,z[N]=q,m>S){const{updateCounter:g}=e;for(let f=N;f>=0;--f){const k=E-1-f;g!==void 0?g(k):b.textContent=`${k}`;const _=b.offsetWidth;if(m-=z[f],m+_<=S||f===0){T=!0,N=f-1,y&&(N===-1?(y.style.maxWidth=`${S-_}px`,y.style.boxSizing="border-box"):y.style.maxWidth="");break}}}}const{onUpdateOverflow:P}=e;T?P!==void 0&&P(!0):(P!==void 0&&P(!1),b.setAttribute(fe,""))}const p=ht();return On.mount({id:"vueuc/overflow",head:!0,anchorMetaName:vt,ssr:p}),Le(d),{selfRef:o,counterRef:r,sync:d}},render(){const{$slots:e}=this;return Ie(this.sync),i("div",{class:"v-overflow",ref:"selfRef"},[qt(e,"default"),e.counter?e.counter():i("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}}),Tn=F("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[B("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[he("+",[B("description",`
 margin-top: 8px;
 `)])]),B("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),B("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Mn=Object.assign(Object.assign({},ae.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),zn=Q({name:"Empty",props:Mn,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:o}=gt(e),r=ae("Empty","-empty",Tn,Zt,e,n),{localeRef:d}=wt("Empty"),p=Qe(Gt,null),v=I(()=>{var w,S,z;return(w=e.description)!==null&&w!==void 0?w:(z=(S=p==null?void 0:p.mergedComponentPropsRef.value)===null||S===void 0?void 0:S.Empty)===null||z===void 0?void 0:z.description}),s=I(()=>{var w,S;return((S=(w=p==null?void 0:p.mergedComponentPropsRef.value)===null||w===void 0?void 0:w.Empty)===null||S===void 0?void 0:S.renderIcon)||(()=>i(yn,null))}),M=I(()=>{const{size:w}=e,{common:{cubicBezierEaseInOut:S},self:{[oe("iconSize",w)]:z,[oe("fontSize",w)]:y,textColor:m,iconColor:T,extraTextColor:E}}=r.value;return{"--n-icon-size":z,"--n-font-size":y,"--n-bezier":S,"--n-text-color":m,"--n-icon-color":T,"--n-extra-text-color":E}}),b=o?De("empty",I(()=>{let w="";const{size:S}=e;return w+=S[0],w}),M,e):void 0;return{mergedClsPrefix:n,mergedRenderIcon:s,localizedDescription:I(()=>v.value||d.value.description),cssVars:o?void 0:M,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender}},render(){const{$slots:e,mergedClsPrefix:n,onRender:o}=this;return o==null||o(),i("div",{class:[`${n}-empty`,this.themeClass],style:this.cssVars},this.showIcon?i("div",{class:`${n}-empty__icon`},e.icon?e.icon():i(pt,{clsPrefix:n},{default:this.mergedRenderIcon})):null,this.showDescription?i("div",{class:`${n}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?i("div",{class:`${n}-empty__extra`},e.extra()):null)}}),Fn=i(wn);function In(e,n){return i(bt,{name:"fade-in-scale-up-transition"},{default:()=>e?i(pt,{clsPrefix:n,class:`${n}-base-select-option__check`},{default:()=>Fn}):null})}const ut=Q({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:n,pendingTmNodeRef:o,multipleRef:r,valueSetRef:d,renderLabelRef:p,renderOptionRef:v,handleOptionClick:s,handleOptionMouseEnter:M}=Qe(et),b=Ee(()=>{const{value:y}=o;return y?e.tmNode.key===y.key:!1});function w(y){const{tmNode:m}=e;m.disabled||s(y,m)}function S(y){const{tmNode:m}=e;m.disabled||M(y,m)}function z(y){const{tmNode:m}=e,{value:T}=b;m.disabled||T||M(y,m)}return{multiple:r,isGrouped:Ee(()=>{const{tmNode:y}=e,{parent:m}=y;return m&&m.rawNode.type==="group"}),isPending:b,isSelected:Ee(()=>{const{value:y}=n,{value:m}=r;if(y===null)return!1;const T=e.tmNode.rawNode.value;if(m){const{value:E}=d;return E.has(T)}else return y===T}),renderLabel:p,renderOption:v,handleMouseMove:z,handleMouseEnter:S,handleClick:w}},render(){const{clsPrefix:e,tmNode:{rawNode:n},isSelected:o,isPending:r,isGrouped:d,multiple:p,renderOption:v,renderLabel:s,handleClick:M,handleMouseEnter:b,handleMouseMove:w}=this,z=In(p&&o,e),y=s?[s(n,o),z]:[ye(n.label,n,o),z],m=i("div",{class:[`${e}-base-select-option`,n.class,{[`${e}-base-select-option--disabled`]:n.disabled,[`${e}-base-select-option--selected`]:o,[`${e}-base-select-option--grouped`]:d,[`${e}-base-select-option--pending`]:r}],style:n.style,onClick:M,onMouseenter:b,onMousemove:w},i("div",{class:`${e}-base-select-option__content`},y));return n.render?n.render({node:m,option:n,selected:o}):v?v({node:m,option:n,selected:o}):m}}),ct=Q({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:n}=Qe(et);return{renderLabel:e,renderOption:n}},render(){const{clsPrefix:e,renderLabel:n,renderOption:o,tmNode:{rawNode:r}}=this,d=n?n(r,!1):ye(r.label,r,!1),p=i("div",{class:`${e}-base-select-group-header`},d);return r.render?r.render({node:p,option:r}):o?o({node:p,option:r,selected:!1}):p}}),Pn=F("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[J("multiple",[F("base-select-option",`
 padding-right: 28px;
 `)]),F("scrollbar",`
 max-height: var(--n-height);
 `),F("virtual-list",`
 max-height: var(--n-height);
 `),F("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[B("content",`
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),F("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),F("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),B("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),B("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),B("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier);
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),F("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),F("base-select-option",`
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
 `,[he("&:active",`
 color: var(--n-option-text-color-pressed);
 `),J("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),J("pending",`
 background-color: var(--n-option-color-pending);
 `),J("selected",`
 color: var(--n-option-text-color-active);
 background-color: var(--n-option-color-active);
 `),J("disabled",`
 cursor: not-allowed;
 `,[Ye("selected",`
 color: var(--n-option-text-color-disabled);
 `),J("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),B("check",`
 font-size: 16px;
 position: absolute;
 right: 8px;
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[mt({enterScale:"0.5"})])])]),kn=Q({name:"InternalSelectMenu",props:Object.assign(Object.assign({},ae.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},width:[Number,String],autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,onToggle:Function}),setup(e){const n=ae("InternalSelectMenu","-internal-select-menu",Pn,Yt,e,G(e,"clsPrefix")),o=O(null),r=O(null),d=O(null),p=I(()=>e.treeMate.getFlattenedNodes()),v=I(()=>on(p.value)),s=O(null);function M(){const{treeMate:a}=e;let u=null;if(e.autoPending){const{value:L}=e;L===null?u=a.getFirstAvailableNode():(e.multiple?u=a.getNode((L||[])[(L||[]).length-1]):u=a.getNode(L),(!u||u.disabled)&&(u=a.getFirstAvailableNode())),u&&x(u)}}let b;ve(G(e,"show"),a=>{a?b=ve(e.resetMenuOnOptionsChange?[G(e,"treeMate"),G(e,"multiple")]:[G(e,"multiple")],()=>{M(),Ie(A)},{immediate:!0}):b==null||b()},{immediate:!0});const w=I(()=>Ze(n.value.self[oe("optionHeight",e.size)])),S=I(()=>ot(n.value.self[oe("padding",e.size)])),z=I(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),y=I(()=>{const a=p.value;return a&&a.length===0});function m(a){const{onToggle:u}=e;u&&u(a)}function T(a){const{onScroll:u}=e;u&&u(a)}function E(a){var u;(u=d.value)===null||u===void 0||u.sync(),T(a)}function P(){var a;(a=d.value)===null||a===void 0||a.sync()}function N(){const{value:a}=s;return a||null}function K(a,u){u.disabled||x(u,!1)}function q(a,u){u.disabled||m(u)}function g(a){var u;Xe(a,"action")||(u=e.onKeyup)===null||u===void 0||u.call(e,a)}function f(a){var u;Xe(a,"action")||(u=e.onKeydown)===null||u===void 0||u.call(e,a)}function k(a){var u;(u=e.onMousedown)===null||u===void 0||u.call(e,a),!e.focusable&&a.preventDefault()}function _(){const{value:a}=s;a&&x(a.getNext({loop:!0}),!0)}function $(){const{value:a}=s;a&&x(a.getPrev({loop:!0}),!0)}function x(a,u=!1){s.value=a,u&&A()}function A(){var a,u;const L=s.value;if(!L)return;const te=v.value(L.key);te!==null&&(e.virtualScroll?(a=r.value)===null||a===void 0||a.scrollTo({index:te}):(u=d.value)===null||u===void 0||u.scrollTo({index:te,elSize:w.value}))}function H(a){var u,L;!((u=o.value)===null||u===void 0)&&u.contains(a.target)&&((L=e.onFocus)===null||L===void 0||L.call(e,a))}function X(a){var u,L;!((u=o.value)===null||u===void 0)&&u.contains(a.relatedTarget)||(L=e.onBlur)===null||L===void 0||L.call(e,a)}nt(et,{handleOptionMouseEnter:K,handleOptionClick:q,valueSetRef:z,multipleRef:G(e,"multiple"),valueRef:G(e,"value"),renderLabelRef:G(e,"renderLabel"),renderOptionRef:G(e,"renderOption"),pendingTmNodeRef:s}),nt(Xt,o),Le(()=>{const{value:a}=d;a&&a.sync()});const Z=I(()=>{const{size:a}=e,{common:{cubicBezierEaseInOut:u},self:{height:L,borderRadius:te,color:xe,groupHeaderTextColor:Ce,actionDividerColor:pe,optionTextColorPressed:be,optionTextColor:ie,optionTextColorDisabled:Y,optionTextColorActive:me,optionOpacityDisabled:le,optionCheckColor:Se,actionTextColor:Re,optionColorPending:Oe,optionColorActive:de,loadingColor:ue,loadingSize:Te,[oe("optionFontSize",a)]:Me,[oe("optionHeight",a)]:ze,[oe("optionPadding",a)]:ce}}=n.value;return{"--n-height":L,"--n-action-divider-color":pe,"--n-action-text-color":Re,"--n-bezier":u,"--n-border-radius":te,"--n-color":xe,"--n-option-font-size":Me,"--n-group-header-text-color":Ce,"--n-option-check-color":Se,"--n-option-color-pending":Oe,"--n-option-color-active":de,"--n-option-height":ze,"--n-option-opacity-disabled":le,"--n-option-text-color":ie,"--n-option-text-color-active":me,"--n-option-text-color-disabled":Y,"--n-option-text-color-pressed":be,"--n-option-padding":ce,"--n-option-padding-left":ot(ce,"left"),"--n-loading-color":ue,"--n-loading-size":Te}}),{inlineThemeDisabled:se}=e,U=se?De("internal-select-menu",I(()=>e.size[0]),Z,e):void 0,ge={selfRef:o,next:_,prev:$,getPendingTmNode:N};return Object.assign({mergedTheme:n,virtualListRef:r,scrollbarRef:d,itemSize:w,padding:S,flattenedNodes:p,empty:y,virtualListContainer(){const{value:a}=r;return a==null?void 0:a.listElRef},virtualListContent(){const{value:a}=r;return a==null?void 0:a.itemsElRef},doScroll:T,handleFocusin:H,handleFocusout:X,handleKeyUp:g,handleKeyDown:f,handleMouseDown:k,handleVirtualListResize:P,handleVirtualListScroll:E,cssVars:se?void 0:Z,themeClass:U==null?void 0:U.themeClass,onRender:U==null?void 0:U.onRender},ge)},render(){const{$slots:e,virtualScroll:n,clsPrefix:o,mergedTheme:r,themeClass:d,onRender:p}=this;return p==null||p(),i("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${o}-base-select-menu`,d,this.multiple&&`${o}-base-select-menu--multiple`],style:[{width:nn(this.width)},this.cssVars],onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},this.loading?i("div",{class:`${o}-base-select-menu__loading`},i(Qt,{clsPrefix:o,strokeWidth:20})):this.empty?i("div",{class:`${o}-base-select-menu__empty`},tn(e.empty,()=>[i(zn,{theme:r.peers.Empty,themeOverrides:r.peerOverrides.Empty})])):i(en,{ref:"scrollbarRef",theme:r.peers.Scrollbar,themeOverrides:r.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},{default:()=>n?i(Rn,{ref:"virtualListRef",class:`${o}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:v})=>v.isGroup?i(ct,{key:v.key,clsPrefix:o,tmNode:v}):v.ignored?null:i(ut,{clsPrefix:o,key:v.key,tmNode:v})}):i("div",{class:`${o}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(v=>v.isGroup?i(ct,{key:v.key,clsPrefix:o,tmNode:v}):i(ut,{clsPrefix:o,key:v.key,tmNode:v})))}),Jt(e.action,v=>v&&[i("div",{class:`${o}-base-select-menu__action`,"data-action":!0,key:"action"},v),i(xn,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),_n=he([F("base-selection",`
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
 `,[F("base-loading",`
 color: var(--n-loading-color);
 `),F("base-selection-tags","min-height: var(--n-height);"),B("border, state-border",`
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
 `),B("state-border",`
 z-index: 1;
 border-color: #0000;
 `),F("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[B("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),F("base-selection-overlay",`
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
 `,[B("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),F("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `),F("base-selection-tags",`
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
 `),F("base-selection-label",`
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
 `,[F("base-selection-input",`
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
 `,[B("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),B("render-label",`
 color: var(--n-text-color);
 `)]),Ye("disabled",[he("&:hover",[B("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),J("focus",[B("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),J("active",[B("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),F("base-selection-label","background-color: var(--n-color-active);"),F("base-selection-tags","background-color: var(--n-color-active);")])]),J("disabled","cursor: not-allowed;",[B("arrow",`
 color: var(--n-arrow-color-disabled);
 `),F("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[F("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),B("render-label",`
 color: var(--n-text-color-disabled);
 `)]),F("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),F("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),F("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[B("input",`
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
 `),B("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>J(`${e}-status`,[B("state-border",`border: var(--n-border-${e});`),Ye("disabled",[he("&:hover",[B("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),J("active",[B("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),F("base-selection-label",`background-color: var(--n-color-active-${e});`),F("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),J("focus",[B("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),F("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 `),F("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[he("&:last-child","padding-right: 0;"),F("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[B("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Bn=Q({name:"InternalSelection",props:Object.assign(Object.assign({},ae.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeyup:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean}),setup(e){const n=O(null),o=O(null),r=O(null),d=O(null),p=O(null),v=O(null),s=O(null),M=O(null),b=O(null),w=O(null),S=O(!1),z=O(!1),y=O(!1),m=ae("InternalSelection","-internal-selection",_n,ln,e,G(e,"clsPrefix")),T=I(()=>e.clearable&&!e.disabled&&(y.value||e.active)),E=I(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):ye(e.selectedOption.label,e.selectedOption,!0):e.placeholder),P=I(()=>{const l=e.selectedOption;if(!!l)return l.label}),N=I(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function K(){var l;const{value:h}=n;if(h){const{value:j}=o;j&&(j.style.width=`${h.offsetWidth}px`,e.maxTagCount!=="responsive"&&((l=b.value)===null||l===void 0||l.sync()))}}function q(){const{value:l}=w;l&&(l.style.display="none")}function g(){const{value:l}=w;l&&(l.style.display="inline-block")}ve(G(e,"active"),l=>{l||q()}),ve(G(e,"pattern"),()=>{e.multiple&&Ie(K)});function f(l){const{onFocus:h}=e;h&&h(l)}function k(l){const{onBlur:h}=e;h&&h(l)}function _(l){const{onDeleteOption:h}=e;h&&h(l)}function $(l){const{onClear:h}=e;h&&h(l)}function x(l){const{onPatternInput:h}=e;h&&h(l)}function A(l){var h;(!l.relatedTarget||!(!((h=r.value)===null||h===void 0)&&h.contains(l.relatedTarget)))&&f(l)}function H(l){var h;!((h=r.value)===null||h===void 0)&&h.contains(l.relatedTarget)||k(l)}function X(l){$(l)}function Z(){y.value=!0}function se(){y.value=!1}function U(l){!e.active||!e.filterable||l.target!==o.value&&l.preventDefault()}function ge(l){_(l)}function a(l){if(l.code==="Backspace"&&!u.value&&!e.pattern.length){const{selectedOptions:h}=e;h!=null&&h.length&&ge(h[h.length-1])}}const u=O(!1);let L=null;function te(l){const{value:h}=n;if(h){const j=l.target.value;h.textContent=j,K()}u.value?L=l:x(l)}function xe(){u.value=!0}function Ce(){u.value=!1,x(L),L=null}function pe(l){var h;z.value=!0,(h=e.onPatternFocus)===null||h===void 0||h.call(e,l)}function be(l){var h;z.value=!1,(h=e.onPatternBlur)===null||h===void 0||h.call(e,l)}function ie(){var l,h;if(e.filterable)z.value=!1,(l=v.value)===null||l===void 0||l.blur(),(h=o.value)===null||h===void 0||h.blur();else if(e.multiple){const{value:j}=d;j==null||j.blur()}else{const{value:j}=p;j==null||j.blur()}}function Y(){var l,h,j;e.filterable?(z.value=!1,(l=v.value)===null||l===void 0||l.focus()):e.multiple?(h=d.value)===null||h===void 0||h.focus():(j=p.value)===null||j===void 0||j.focus()}function me(){const{value:l}=o;l&&(g(),l.focus())}function le(){const{value:l}=o;l&&l.blur()}function Se(l){const{value:h}=s;h&&h.setTextContent(`+${l}`)}function Re(){const{value:l}=M;return l}function Oe(){return o.value}let de=null;function ue(){de!==null&&window.clearTimeout(de)}function Te(){e.disabled||e.active||(ue(),de=window.setTimeout(()=>{S.value=!0},100))}function Me(){ue()}function ze(l){l||(ue(),S.value=!1)}Le(()=>{rn(()=>{const l=v.value;!l||(l.tabIndex=e.disabled||z.value?-1:0)})});const{inlineThemeDisabled:ce}=e,Pe=I(()=>{const{size:l}=e,{common:{cubicBezierEaseInOut:h},self:{borderRadius:j,color:We,placeholderColor:je,textColor:He,paddingSingle:ke,paddingMultiple:_e,caretColor:Ke,colorDisabled:Fe,textColorDisabled:Ue,placeholderColorDisabled:Be,colorActive:re,boxShadowFocus:t,boxShadowActive:c,boxShadowHover:C,border:D,borderFocus:R,borderHover:V,borderActive:W,arrowColor:we,arrowColorDisabled:$e,loadingColor:qe,colorActiveWarning:xt,boxShadowFocusWarning:Ct,boxShadowActiveWarning:St,boxShadowHoverWarning:Rt,borderWarning:Ot,borderFocusWarning:Tt,borderHoverWarning:Mt,borderActiveWarning:zt,colorActiveError:Ft,boxShadowFocusError:It,boxShadowActiveError:Pt,boxShadowHoverError:kt,borderError:_t,borderFocusError:Bt,borderHoverError:$t,borderActiveError:At,clearColor:Et,clearColorHover:Nt,clearColorPressed:Lt,clearSize:Dt,arrowSize:Vt,[oe("height",l)]:Wt,[oe("fontSize",l)]:jt}}=m.value;return{"--n-bezier":h,"--n-border":D,"--n-border-active":W,"--n-border-focus":R,"--n-border-hover":V,"--n-border-radius":j,"--n-box-shadow-active":c,"--n-box-shadow-focus":t,"--n-box-shadow-hover":C,"--n-caret-color":Ke,"--n-color":We,"--n-color-active":re,"--n-color-disabled":Fe,"--n-font-size":jt,"--n-height":Wt,"--n-padding-single":ke,"--n-padding-multiple":_e,"--n-placeholder-color":je,"--n-placeholder-color-disabled":Be,"--n-text-color":He,"--n-text-color-disabled":Ue,"--n-arrow-color":we,"--n-arrow-color-disabled":$e,"--n-loading-color":qe,"--n-color-active-warning":xt,"--n-box-shadow-focus-warning":Ct,"--n-box-shadow-active-warning":St,"--n-box-shadow-hover-warning":Rt,"--n-border-warning":Ot,"--n-border-focus-warning":Tt,"--n-border-hover-warning":Mt,"--n-border-active-warning":zt,"--n-color-active-error":Ft,"--n-box-shadow-focus-error":It,"--n-box-shadow-active-error":Pt,"--n-box-shadow-hover-error":kt,"--n-border-error":_t,"--n-border-focus-error":Bt,"--n-border-hover-error":$t,"--n-border-active-error":At,"--n-clear-size":Dt,"--n-clear-color":Et,"--n-clear-color-hover":Nt,"--n-clear-color-pressed":Lt,"--n-arrow-size":Vt}}),ne=ce?De("internal-selection",I(()=>e.size[0]),Pe,e):void 0;return{mergedTheme:m,mergedClearable:T,patternInputFocused:z,filterablePlaceholder:E,label:P,selected:N,showTagsPanel:S,isCompositing:u,counterRef:s,counterWrapperRef:M,patternInputMirrorRef:n,patternInputRef:o,selfRef:r,multipleElRef:d,singleElRef:p,patternInputWrapperRef:v,overflowRef:b,inputTagElRef:w,handleMouseDown:U,handleFocusin:A,handleClear:X,handleMouseEnter:Z,handleMouseLeave:se,handleDeleteOption:ge,handlePatternKeyDown:a,handlePatternInputInput:te,handlePatternInputBlur:be,handlePatternInputFocus:pe,handleMouseEnterCounter:Te,handleMouseLeaveCounter:Me,handleFocusout:H,handleCompositionEnd:Ce,handleCompositionStart:xe,onPopoverUpdateShow:ze,focus:Y,focusInput:me,blur:ie,blurInput:le,updateCounter:Se,getCounter:Re,getTail:Oe,renderLabel:e.renderLabel,cssVars:ce?void 0:Pe,themeClass:ne==null?void 0:ne.themeClass,onRender:ne==null?void 0:ne.onRender}},render(){const{status:e,multiple:n,size:o,disabled:r,filterable:d,maxTagCount:p,bordered:v,clsPrefix:s,onRender:M,renderTag:b,renderLabel:w}=this;M==null||M();const S=p==="responsive",z=typeof p=="number",y=S||z,m=i(bn,{clsPrefix:s,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var E,P;return(P=(E=this.$slots).arrow)===null||P===void 0?void 0:P.call(E)}});let T;if(n){const E=x=>i("div",{class:`${s}-base-selection-tag-wrapper`,key:x.value},b?b({option:x,handleClose:()=>this.handleDeleteOption(x)}):i(Ge,{size:o,closable:!x.disabled,disabled:r,internalStopClickPropagation:!0,onClose:()=>this.handleDeleteOption(x)},{default:()=>w?w(x,!0):ye(x.label,x,!0)})),P=(z?this.selectedOptions.slice(0,p):this.selectedOptions).map(E),N=d?i("div",{class:`${s}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},i("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:r,value:this.pattern,autofocus:this.autofocus,class:`${s}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),i("span",{ref:"patternInputMirrorRef",class:`${s}-base-selection-input-tag__mirror`},this.pattern)):null,K=S?()=>i("div",{class:`${s}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},i(Ge,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:r})):void 0;let q;if(z){const x=this.selectedOptions.length-p;x>0&&(q=i("div",{class:`${s}-base-selection-tag-wrapper`,key:"__counter__"},i(Ge,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:r},{default:()=>`+${x}`})))}const g=S?d?i(dt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:()=>P,counter:K,tail:()=>N}):i(dt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:()=>P,counter:K}):z?P.concat(q):P,f=y?()=>i("div",{class:`${s}-base-selection-popover`},S?P:this.selectedOptions.map(E)):void 0,k=y?{show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover}:null,$=(this.selected?!1:this.active?!this.pattern&&!this.isCompositing:!0)?i("div",{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`},this.placeholder):null;if(d){const x=i("div",{ref:"patternInputWrapperRef",class:`${s}-base-selection-tags`},g,S?null:N,m);T=i(lt,null,y?i(it,Object.assign({},k),{trigger:()=>x,default:f}):x,$)}else{const x=i("div",{ref:"multipleElRef",class:`${s}-base-selection-tags`,tabindex:r?void 0:0},g,m);T=i(lt,null,y?i(it,Object.assign({},k),{trigger:()=>x,default:f}):x,$)}}else if(d){const E=this.pattern||this.isCompositing,P=this.active?!E:!this.selected,N=this.active?!1:this.selected;T=i("div",{ref:"patternInputWrapperRef",class:`${s}-base-selection-label`},i("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${s}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:r,disabled:r,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),N?i("div",{class:`${s}-base-selection-label__render-label ${s}-base-selection-overlay`,key:"input"},i("div",{class:`${s}-base-selection-overlay__wrapper`},b?b({option:this.selectedOption,handleClose:()=>{}}):w?w(this.selectedOption,!0):ye(this.label,this.selectedOption,!0))):null,P?i("div",{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`,key:"placeholder"},i("div",{class:`${s}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,m)}else T=i("div",{ref:"singleElRef",class:`${s}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?i("div",{class:`${s}-base-selection-input`,title:mn(this.label),key:"input"},i("div",{class:`${s}-base-selection-input__content`},b?b({option:this.selectedOption,handleClose:()=>{}}):w?w(this.selectedOption,!0):ye(this.label,this.selectedOption,!0))):i("div",{class:`${s}-base-selection-placeholder ${s}-base-selection-overlay`,key:"placeholder"},this.placeholder),m);return i("div",{ref:"selfRef",class:[`${s}-base-selection`,this.themeClass,e&&`${s}-base-selection--${e}-status`,{[`${s}-base-selection--active`]:this.active,[`${s}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${s}-base-selection--disabled`]:this.disabled,[`${s}-base-selection--multiple`]:this.multiple,[`${s}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeyup:this.onKeyup,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},T,v?i("div",{class:`${s}-base-selection__border`}):null,v?i("div",{class:`${s}-base-selection__state-border`}):null)}});function $n(e){return Ve(e)?e.name||e.key||"key-required":e.value}function Ve(e){return e.type==="group"}function yt(e){return e.type==="ignored"}const An={getKey:$n,getIsGroup:Ve,getIgnored:yt};function ft(e,n){try{return!!(1+n.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function En(e,n,o){if(!n)return e;function r(d){if(!Array.isArray(d))return[];const p=[];for(const v of d)if(Ve(v)){const s=r(v.children);s.length&&p.push(Object.assign({},v,{children:s}))}else{if(yt(v))continue;n(o,v)&&p.push(v)}return p}return r(e)}function Nn(e){const n=new Map;return e.forEach(o=>{Ve(o)?o.children.forEach(r=>{n.set(r.value,r)}):n.set(o.value,o)}),n}function Ln(e,n){return n?typeof n.label=="string"?ft(e,n.label):n.value!==void 0?ft(e,String(n.value)):!1:!1}const Dn=he([F("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `),F("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[mt()])]),Vn=Object.assign(Object.assign({},ae.props),{to:Je.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:{type:Function,default:Ln},placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:{type:Function,default:e=>({label:e,value:e})},fallbackOption:{type:[Function,Boolean],default:()=>e=>({label:String(e),value:e})},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,onChange:[Function,Array],items:Array}),Kn=Q({name:"Select",props:Vn,setup(e){const{mergedClsPrefixRef:n,mergedBorderedRef:o,namespaceRef:r,inlineThemeDisabled:d}=gt(e),p=ae("Select","-select",Dn,gn,e,n),v=O(e.defaultValue),s=G(e,"value"),M=rt(s,v),b=O(!1),w=O(""),S=I(()=>pn(x.value,An)),z=I(()=>Nn($.value)),y=O(!1),m=rt(G(e,"show"),y),T=O(null),E=O(null),P=O(null),{localeRef:N}=wt("Select"),K=I(()=>{var t;return(t=e.placeholder)!==null&&t!==void 0?t:N.value.placeholder}),q=an(e,["items","options"]),g=O([]),f=O([]),k=O(new Map),_=I(()=>{const{fallbackOption:t}=e;return t?c=>Object.assign(t(c),{value:c}):!1}),$=I(()=>f.value.concat(g.value).concat(q.value)),x=I(()=>{if(e.remote)return q.value;{const{value:t}=$,{value:c}=w;if(!c.length||!e.filterable)return t;{const{filter:C}=e;return En(t,C,c)}}});function A(t){const c=e.remote,{value:C}=k,{value:D}=z,{value:R}=_,V=[];return t.forEach(W=>{if(D.has(W))V.push(D.get(W));else if(c&&C.has(W))V.push(C.get(W));else if(R){const we=R(W);we&&V.push(we)}}),V}const H=I(()=>{if(e.multiple){const{value:t}=M;return Array.isArray(t)?A(t):[]}return null}),X=I(()=>{const{value:t}=M;return!e.multiple&&!Array.isArray(t)?t===null?null:A([t])[0]||null:null}),Z=sn(e),{mergedSizeRef:se,mergedDisabledRef:U,mergedStatusRef:ge}=Z;function a(t,c){const{onChange:C,"onUpdate:value":D,onUpdateValue:R}=e,{nTriggerFormChange:V,nTriggerFormInput:W}=Z;C&&ee(C,t,c),R&&ee(R,t,c),D&&ee(D,t,c),v.value=t,V(),W()}function u(t){const{onBlur:c}=e,{nTriggerFormBlur:C}=Z;c&&ee(c,t),C()}function L(){const{onClear:t}=e;t&&ee(t)}function te(t){const{onFocus:c}=e,{nTriggerFormFocus:C}=Z;c&&ee(c,t),C()}function xe(t){const{onSearch:c}=e;c&&ee(c,t)}function Ce(t){const{onScroll:c}=e;c&&ee(c,t)}function pe(){var t;const{remote:c,multiple:C}=e;if(c){const{value:D}=k;if(C)(t=H.value)===null||t===void 0||t.forEach(R=>{D.set(R.value,R)});else{const R=X.value;R&&D.set(R.value,R)}}}function be(t){const{onUpdateShow:c,"onUpdate:show":C}=e;c&&ee(c,t),C&&ee(C,t),y.value=t}function ie(){U.value||(be(!0),y.value=!0,e.filterable&&Ke())}function Y(){be(!1)}function me(){w.value="",f.value=[]}const le=O(!1);function Se(){e.filterable&&(le.value=!0)}function Re(){e.filterable&&(le.value=!1,m.value||me())}function Oe(){U.value||(m.value?e.filterable||Y():ie())}function de(t){var c,C;!((C=(c=P.value)===null||c===void 0?void 0:c.selfRef)===null||C===void 0)&&C.contains(t.relatedTarget)||(b.value=!1,u(t),Y())}function ue(t){te(t),b.value=!0}function Te(t){b.value=!0}function Me(t){var c;!((c=T.value)===null||c===void 0)&&c.$el.contains(t.relatedTarget)||(b.value=!1,u(t),Y())}function ze(){var t;(t=T.value)===null||t===void 0||t.focus(),Y()}function ce(t){var c;m.value&&(!((c=T.value)===null||c===void 0)&&c.$el.contains(t.target)||Y())}function Pe(t){if(!Array.isArray(t))return[];if(_.value)return Array.from(t);{const{remote:c}=e,{value:C}=z;if(c){const{value:D}=k;return t.filter(R=>C.has(R)||D.has(R))}else return t.filter(D=>C.has(D))}}function ne(t){l(t.rawNode)}function l(t){if(U.value)return;const{tag:c,remote:C,clearFilterAfterSelect:D}=e;if(c&&!C){const{value:R}=f,V=R[0]||null;V&&(g.value.push(V),f.value=[])}if(C&&k.value.set(t.value,t),e.multiple){const R=Pe(M.value),V=R.findIndex(W=>W===t.value);if(~V){if(R.splice(V,1),c&&!C){const W=h(t.value);~W&&(g.value.splice(W,1),D&&(w.value=""))}}else R.push(t.value),D&&(w.value="");a(R,A(R))}else{if(c&&!C){const R=h(t.value);~R?g.value=[g.value[R]]:g.value=[]}_e(),Y(),a(t.value,t)}}function h(t){return g.value.findIndex(C=>C.value===t)}function j(t){m.value||ie();const{value:c}=t.target;w.value=c;const{tag:C,remote:D}=e;if(xe(c),C&&!D){if(!c){f.value=[];return}const R=e.onCreate(c);q.value.some(V=>V.value===R.value)||g.value.some(V=>V.value===R.value)?f.value=[]:f.value=[R]}}function We(t){t.stopPropagation();const{multiple:c}=e;!c&&e.filterable&&Y(),L(),c?a([],[]):a(null,null)}function je(t){Xe(t,"action")||t.preventDefault()}function He(t){Ce(t)}function ke(t){var c,C,D,R,V;switch(t.code){case"Space":if(e.filterable)break;t.preventDefault();case"Enter":case"NumpadEnter":if(!(!((c=T.value)===null||c===void 0)&&c.isCompositing)){if(m.value){const W=(C=P.value)===null||C===void 0?void 0:C.getPendingTmNode();W?ne(W):e.filterable||(Y(),_e())}else if(ie(),e.tag&&le.value){const W=f.value[0];if(W){const we=W.value,{value:$e}=M;e.multiple&&Array.isArray($e)&&$e.some(qe=>qe===we)||l(W)}}}t.preventDefault();break;case"ArrowUp":if(t.preventDefault(),e.loading)return;m.value&&((D=P.value)===null||D===void 0||D.prev());break;case"ArrowDown":if(t.preventDefault(),e.loading)return;m.value?(R=P.value)===null||R===void 0||R.next():ie();break;case"Escape":Y(),(V=T.value)===null||V===void 0||V.focus();break}}function _e(){var t;(t=T.value)===null||t===void 0||t.focus()}function Ke(){var t;(t=T.value)===null||t===void 0||t.focusInput()}function Fe(){var t;(t=E.value)===null||t===void 0||t.syncPosition()}pe(),ve(G(e,"options"),pe),ve(x,()=>{!m.value||Ie(Fe)}),ve(M,()=>{!m.value||Ie(Fe)});const Ue={focus:()=>{var t;(t=T.value)===null||t===void 0||t.focus()},blur:()=>{var t;(t=T.value)===null||t===void 0||t.blur()}},Be=I(()=>{const{self:{menuBoxShadow:t}}=p.value;return{"--n-menu-box-shadow":t}}),re=d?De("select",void 0,Be,e):void 0;return Object.assign(Object.assign({},Ue),{mergedStatus:ge,mergedClsPrefix:n,mergedBordered:o,namespace:r,treeMate:S,isMounted:dn(),triggerRef:T,menuRef:P,pattern:w,uncontrolledShow:y,mergedShow:m,adjustedTo:Je(e),uncontrolledValue:v,mergedValue:M,followerRef:E,localizedPlaceholder:K,selectedOption:X,selectedOptions:H,mergedSize:se,mergedDisabled:U,focused:b,activeWithoutMenuOpen:le,inlineThemeDisabled:d,onTriggerInputFocus:Se,onTriggerInputBlur:Re,handleMenuFocus:Te,handleMenuBlur:Me,handleMenuTabOut:ze,handleTriggerClick:Oe,handleToggle:ne,handleDeleteOption:l,handlePatternInput:j,handleClear:We,handleTriggerBlur:de,handleTriggerFocus:ue,handleKeydown:ke,syncPosition:Fe,handleMenuAfterLeave:me,handleMenuClickOutside:ce,handleMenuScroll:He,handleMenuKeydown:ke,handleMenuMousedown:je,mergedTheme:p,cssVars:d?void 0:Be,themeClass:re==null?void 0:re.themeClass,onRender:re==null?void 0:re.onRender})},render(){return i("div",{class:`${this.mergedClsPrefix}-select`},i(un,null,{default:()=>[i(cn,null,{default:()=>i(Bn,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus},{arrow:()=>{var e,n;return[(n=(e=this.$slots).arrow)===null||n===void 0?void 0:n.call(e)]}})}),i(fn,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===Je.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>i(bt,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,n,o;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),hn(i(kn,Object.assign({},this.menuProps,{ref:"menuRef",inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(n=this.menuProps)===null||n===void 0?void 0:n.class],clsPrefix:this.mergedClsPrefix,focusable:!0,autoPending:!0,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:"medium",renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(o=this.menuProps)===null||o===void 0?void 0:o.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange}),{empty:()=>{var r,d;return[(d=(r=this.$slots).empty)===null||d===void 0?void 0:d.call(r)]},action:()=>{var r,d;return[(d=(r=this.$slots).action)===null||d===void 0?void 0:d.call(r)]}}),this.displayDirective==="show"?[[vn,this.mergedShow],[at,this.handleMenuClickOutside]]:[[at,this.handleMenuClickOutside]])):null}})})]}))}});export{Kn as N};
