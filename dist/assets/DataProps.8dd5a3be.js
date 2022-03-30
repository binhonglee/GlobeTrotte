var ie=Object.defineProperty;var se=(r,e,o)=>e in r?ie(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var c=(r,e,o)=>(se(r,typeof e!="symbol"?e+"":e,o),o);import{m as A,q as g,s as u,u as p,v as x,i as M,x as le,y as N,z as P,A as ce,B as de,C as he,D as I,E as f,I as _,J as R,K as b,L as ue,M as ge,O as be,P as fe,Q as ve,F as Ce,S as pe,U as a,V as ke,W as Se,X as me}from"./index.aaf24c90.js";const xe=/^(\d|\.)+$/,O=/(\d|\.)+/;function Me(r,{c:e=1,offset:o=0,attachPx:n=!0}={}){if(typeof r=="number"){const t=(r+o)*e;return t===0?"0":`${t}px`}else if(typeof r=="string")if(xe.test(r)){const t=(Number(r)+o)*e;return n?t===0?"0":`${t}px`:`${t}`}else{const t=O.exec(r);return t?r.replace(O,String((Number(t[0])+o)*e)):r}return r}var Pe={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},Ue=A("tag",`
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[g("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),g("avatar",`
 display: flex;
 margin-right: 6px;
 `),g("close",`
 font-size: var(--n-close-size);
 margin: var(--n-close-margin);
 transition: color .3s var(--n-bezier);
 cursor: pointer;
 `),u("round",`
 padding: 0 calc(var(--n-height) / 2);
 border-radius: calc(var(--n-height) / 2);
 `,[g("avatar",`
 margin-left: calc((var(--n-height) - 8px) / -2);
 `)]),u("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),u("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[p("disabled",[x("&:hover","background-color: var(--n-color-hover-checkable);",[p("checked","color: var(--n-text-color-hover-checkable);")]),x("&:active","background-color: var(--n-color-pressed-checkable);",[p("checked","color: var(--n-text-color-pressed-checkable);")])]),u("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[p("disabled",[x("&:hover","background-color: var(--n-color-checked-hover);"),x("&:active","background-color: var(--n-color-checked-pressed);")])])])]);const ye=Object.assign(Object.assign(Object.assign({},P.props),Pe),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalStopClickPropagation:Boolean,onCheckedChange:{type:Function,validator:()=>!0,default:void 0}}),Ie=be("n-tag");var Ne=M({name:"Tag",props:ye,setup(r){const e=le(null),{mergedBorderedRef:o,mergedClsPrefixRef:n,inlineThemeDisabled:t,mergedRtlRef:i}=N(r),s=P("Tag","-tag",Ue,fe,r,n);ce(Ie,{roundRef:de(r,"round")});function k(l){if(!r.disabled&&r.checkable){const{checked:h,onCheckedChange:m,onUpdateChecked:v,"onUpdate:checked":C}=r;v&&v(!h),C&&C(!h),m&&m(!h)}}function U(l){if(r.internalStopClickPropagation&&l.stopPropagation(),!r.disabled){const{onClose:h}=r;h&&ve(h,l)}}const y={setTextContent(l){const{value:h}=e;h&&(h.textContent=l)}},B=he("Tag",i,n),w=I(()=>{const{type:l,size:h,color:{color:m,textColor:v}={}}=r,{common:{cubicBezierEaseInOut:C},self:{padding:L,closeMargin:H,closeMarginRtl:F,borderRadius:K,opacityDisabled:V,textColorCheckable:W,textColorHoverCheckable:Y,textColorPressedCheckable:j,textColorChecked:E,colorCheckable:G,colorHoverCheckable:J,colorPressedCheckable:Z,colorChecked:T,colorCheckedHover:q,colorCheckedPressed:Q,[f("closeSize",h)]:X,[f("fontSize",h)]:ee,[f("height",h)]:D,[f("color",l)]:oe,[f("textColor",l)]:te,[f("border",l)]:re,[f("closeColor",l)]:z,[f("closeColorHover",l)]:ne,[f("closeColorPressed",l)]:ae}}=s.value;return{"--n-avatar-size-override":`calc(${D} - 8px)`,"--n-bezier":C,"--n-border-radius":K,"--n-border":re,"--n-close-color":z,"--n-close-color-hover":ne,"--n-close-color-pressed":ae,"--n-close-color-disabled":z,"--n-close-margin":H,"--n-close-margin-rtl":F,"--n-close-size":X,"--n-color":m||oe,"--n-color-checkable":G,"--n-color-checked":T,"--n-color-checked-hover":q,"--n-color-checked-pressed":Q,"--n-color-hover-checkable":J,"--n-color-pressed-checkable":Z,"--n-font-size":ee,"--n-height":D,"--n-opacity-disabled":V,"--n-padding":L,"--n-text-color":v||te,"--n-text-color-checkable":W,"--n-text-color-checked":E,"--n-text-color-hover-checkable":Y,"--n-text-color-pressed-checkable":j}}),S=t?_("tag",I(()=>{let l="";const{type:h,size:m,color:{color:v,textColor:C}={}}=r;return l+=h[0],l+=m[0],v&&(l+=`a${R(v)}`),C&&(l+=`b${R(C)}`),l}),w,r):void 0;return Object.assign(Object.assign({},y),{rtlEnabled:B,mergedClsPrefix:n,contentRef:e,mergedBordered:o,handleClick:k,handleCloseClick:U,cssVars:t?void 0:w,themeClass:S==null?void 0:S.themeClass,onRender:S==null?void 0:S.onRender})},render(){var r,e;const{mergedClsPrefix:o,rtlEnabled:n,color:{borderColor:t}={},onRender:i,$slots:s}=this;return i==null||i(),b("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:n,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:this.round}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},ge(s.avatar,k=>k&&b("div",{class:`${o}-tag__avatar`},k)),b("span",{class:`${o}-tag__content`,ref:"contentRef"},(e=(r=this.$slots).default)===null||e===void 0?void 0:e.call(r)),!this.checkable&&this.closable?b(ue,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick}):null,!this.checkable&&this.mergedBordered?b("div",{class:`${o}-tag__border`,style:{borderColor:t}}):null)}}),we=A("divider",`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[p("vertical",`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[p("no-title",`
 display: flex;
 align-items: center;
 `)]),g("title",`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),u("title-position-left",[g("line",[u("left",{width:"28px"})])]),u("title-position-right",[g("line",[u("right",{width:"28px"})])]),u("dashed",[g("line",`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),u("vertical",`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),g("line",`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),p("dashed",[g("line",{backgroundColor:"var(--n-color)"})]),u("dashed",[g("line",{borderColor:"var(--n-color)"})]),u("vertical",{backgroundColor:"var(--n-color)"})]);const De=Object.assign(Object.assign({},P.props),{titlePlacement:{type:String,default:"center"},dashed:Boolean,vertical:Boolean});var _e=M({name:"Divider",props:De,setup(r){const{mergedClsPrefixRef:e,inlineThemeDisabled:o}=N(r),n=P("Divider","-divider",we,pe,r,e),t=I(()=>{const{common:{cubicBezierEaseInOut:s},self:{color:k,textColor:U,fontWeight:y}}=n.value;return{"--n-bezier":s,"--n-color":k,"--n-text-color":U,"--n-font-weight":y}}),i=o?_("divider",void 0,t,r):void 0;return{mergedClsPrefix:e,cssVars:o?void 0:t,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var r;const{$slots:e,titlePlacement:o,vertical:n,dashed:t,cssVars:i,mergedClsPrefix:s}=this;return(r=this.onRender)===null||r===void 0||r.call(this),b("div",{role:"separator",class:[`${s}-divider`,this.themeClass,{[`${s}-divider--vertical`]:n,[`${s}-divider--no-title`]:!e.default,[`${s}-divider--dashed`]:t,[`${s}-divider--title-position-${o}`]:e.default&&o}],style:i},n?null:b("div",{class:`${s}-divider__line ${s}-divider__line--left`}),!n&&e.default?b(Ce,null,b("div",{class:`${s}-divider__title`},this.$slots),b("div",{class:`${s}-divider__line ${s}-divider__line--right`})):null)}});class d{constructor(e){c(this,"key",a.UNKNOWN);c(this,"label",$.toString(this.key));this.key=e,this.label=$.toString(this.key)}}class ${static sortedCityList(){return[new d(a.UNKNOWN),new d(a.AnchorageAKUS),new d(a.BostonMAUS),new d(a.GeorgeTownPGMY),new d(a.HonoluluHIUS),new d(a.KualaLumpurMY),new d(a.LasVegasNVUS),new d(a.LosAngelesCAUS),new d(a.MauiHIUS),new d(a.NewYorkNYUS),new d(a.PageAZUS),new d(a.ParisFR),new d(a.PhoneixAZUS),new d(a.SanFranciscoCAUS),new d(a.SanJoseCAUS),new d(a.SantaCruzCAUS),new d(a.SeattleWAUS),new d(a.WashingtonDCUS)]}static sortedCityOptions(){return this.sortedCityList().map(e=>({label:e.label,value:e.key.toString()}))}static toString(e){var t;const o="Others";return(t={[a.UNKNOWN]:"Others",[a.AnchorageAKUS]:"Anchorage, Alaska, US",[a.BostonMAUS]:"Boston, Massachusetts, US",[a.GeorgeTownPGMY]:"George Town, Penang, MY",[a.HonoluluHIUS]:"Honolulu, Hawaii, US",[a.KualaLumpurMY]:"Kuala Lumpur, MY",[a.LasVegasNVUS]:"Las Vegas, Nevada, US",[a.LosAngelesCAUS]:"Los Angeles, California, US",[a.MauiHIUS]:"Maui, Hawaii, US",[a.NewYorkNYUS]:"New York, New York, US",[a.PageAZUS]:"Page, Arizona, US",[a.ParisFR]:"Paris, FR",[a.PhoneixAZUS]:"Phoenix, Arizona, US",[a.SanFranciscoCAUS]:"San Francisco, California, US",[a.SanJoseCAUS]:"San Jose, California, US",[a.SantaCruzCAUS]:"Santa Cruz, California, US",[a.SeattleWAUS]:"Seattle, Washington, US",[a.WashingtonDCUS]:"Washington, D.C., US"}[e])!=null?t:o}static citiesToString(e){let o="";for(const n of e)o+=n+",";return o}static stringToCityStringArray(e){const o=[],n=e.split(",");for(const t of n)t.length>0&&t!=="0"&&o.push(t.toString());return o}static stringToCities(e){const o=[],n=e.split(",");for(const t of n)t.length>0&&t!=="0"&&o.push(+t);return o}}class ze{constructor(e,o){c(this,"place");c(this,"travelTime");this.place=new Re(e),this.travelTime=o===void 0?void 0:new Oe(o)}}class Re{constructor(e){c(this,"ID");c(this,"label");c(this,"URL");c(this,"description");var o,n,t,i;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.label=(n=e==null?void 0:e.label.valueOf())!=null?n:"",this.URL=(t=e==null?void 0:e.URL.valueOf())!=null?t:"",this.description=(i=e==null?void 0:e.description.valueOf())!=null?i:""}}class Oe{constructor(e){c(this,"ID");c(this,"fromPlaceID");c(this,"toPlaceID");c(this,"toPlaceIndex");c(this,"timeInMinutes");var o,n,t,i,s;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.fromPlaceID=(n=e==null?void 0:e.fromPlaceID.valueOf())!=null?n:-1,this.toPlaceID=(t=e==null?void 0:e.toPlaceID.valueOf())!=null?t:-1,this.toPlaceIndex=(i=e==null?void 0:e.toPlaceIndex.valueOf())!=null?i:-1,this.timeInMinutes=(s=e==null?void 0:e.timeInMinutes.valueOf())!=null?s:0}}class Be{constructor(e){c(this,"ID");c(this,"tripID");c(this,"dayOf");c(this,"propPlaces",[]);this.ID=e.ID.valueOf(),this.tripID=e.tripID.valueOf(),this.dayOf=e.dayOf.valueOf(),this.propPlaces=e.places.map((o,n)=>{let t;if(n>0)for(const i of e.travelTime)o.ID===i.toPlaceID&&e.places[n-1].ID===i.fromPlaceID&&(t=i);return new ze(o,t)})}toDay(){const e=new ke;return e.ID=this.ID,e.tripID=this.tripID,e.dayOf=this.dayOf,e.places=this.propPlaces.map(o=>{const n=new Se;return n.ID=o.place.ID,n.URL=o.place.URL,n.description=o.place.description,n.label=o.place.label,n}),e.travelTime=this.propPlaces.map(o=>{const n=o.travelTime;if(n===void 0)return;const t=new me;return t.ID=n.ID,t.fromPlaceID=n.fromPlaceID,t.timeInMinutes=n.timeInMinutes,t.toPlaceID=n.toPlaceID,t.toPlaceIndex=n.toPlaceIndex,t}).filter(o=>!!o),e}}export{$ as C,Be as D,_e as N,ze as P,Ne as a,Oe as b,Me as f};
