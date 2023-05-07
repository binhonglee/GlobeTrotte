var Z=Object.defineProperty;var T=(r,e,o)=>e in r?Z(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var c=(r,e,o)=>(T(r,typeof e!="symbol"?e+"":e,o),o);import{z as ee,ab as v,ak as k,al as C,y as p,d as oe,D as re,A as te,B as z,aU as ae,aq as ce,E as ne,L as se,M as m,af as i,ag as le,aV as y,x as f,aW as ie,as as de,aX as he,T as be}from"./index-406f6e18.js";import{D as ue,b as fe,c as ge}from"./TripObj-0083e4c4.js";const ve={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},ke=ee("tag",`
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
`,[v("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),v("avatar",`
 display: flex;
 margin-right: 6px;
 `),v("close",`
 font-size: var(--n-close-size);
 margin: var(--n-close-margin);
 transition: color .3s var(--n-bezier);
 cursor: pointer;
 `),k("round",`
 padding: 0 calc(var(--n-height) / 2);
 border-radius: calc(var(--n-height) / 2);
 `,[v("avatar",`
 margin-left: calc((var(--n-height) - 8px) / -2);
 `)]),k("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),k("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[C("disabled",[p("&:hover","background-color: var(--n-color-hover-checkable);",[C("checked","color: var(--n-text-color-hover-checkable);")]),p("&:active","background-color: var(--n-color-pressed-checkable);",[C("checked","color: var(--n-text-color-pressed-checkable);")])]),k("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[C("disabled",[p("&:hover","background-color: var(--n-color-checked-hover);"),p("&:active","background-color: var(--n-color-checked-pressed);")])])])]),Ce=Object.assign(Object.assign(Object.assign({},z.props),ve),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalStopClickPropagation:Boolean,onCheckedChange:{type:Function,validator:()=>!0,default:void 0}}),pe=he("n-tag"),ze=oe({name:"Tag",props:Ce,setup(r){const e=re(null),{mergedBorderedRef:o,mergedClsPrefixRef:t,inlineThemeDisabled:s,mergedRtlRef:l}=te(r),I=z("Tag","-tag",ke,ae,r,t);ce(pe,{roundRef:ne(r,"round")});function g(a){if(!r.disabled&&r.checkable){const{checked:n,onCheckedChange:u,onUpdateChecked:d,"onUpdate:checked":h}=r;d&&d(!n),h&&h(!n),u&&u(!n)}}function O(a){if(r.internalStopClickPropagation&&a.stopPropagation(),!r.disabled){const{onClose:n}=r;n&&be(n,a)}}const R={setTextContent(a){const{value:n}=e;n&&(n.textContent=a)}},M=se("Tag",l,t),D=m(()=>{const{type:a,size:n,color:{color:u,textColor:d}={}}=r,{common:{cubicBezierEaseInOut:h},self:{padding:$,closeMargin:B,closeMarginRtl:w,borderRadius:U,opacityDisabled:_,textColorCheckable:S,textColorHoverCheckable:j,textColorPressedCheckable:L,textColorChecked:E,colorCheckable:F,colorHoverCheckable:H,colorPressedCheckable:N,colorChecked:V,colorCheckedHover:K,colorCheckedPressed:A,[i("closeSize",n)]:W,[i("fontSize",n)]:q,[i("height",n)]:x,[i("color",a)]:X,[i("textColor",a)]:G,[i("border",a)]:J,[i("closeColor",a)]:P,[i("closeColorHover",a)]:Q,[i("closeColorPressed",a)]:Y}}=I.value;return{"--n-avatar-size-override":`calc(${x} - 8px)`,"--n-bezier":h,"--n-border-radius":U,"--n-border":J,"--n-close-color":P,"--n-close-color-hover":Q,"--n-close-color-pressed":Y,"--n-close-color-disabled":P,"--n-close-margin":B,"--n-close-margin-rtl":w,"--n-close-size":W,"--n-color":u||X,"--n-color-checkable":F,"--n-color-checked":V,"--n-color-checked-hover":K,"--n-color-checked-pressed":A,"--n-color-hover-checkable":H,"--n-color-pressed-checkable":N,"--n-font-size":q,"--n-height":x,"--n-opacity-disabled":_,"--n-padding":$,"--n-text-color":d||G,"--n-text-color-checkable":S,"--n-text-color-checked":E,"--n-text-color-hover-checkable":j,"--n-text-color-pressed-checkable":L}}),b=s?le("tag",m(()=>{let a="";const{type:n,size:u,color:{color:d,textColor:h}={}}=r;return a+=n[0],a+=u[0],d&&(a+=`a${y(d)}`),h&&(a+=`b${y(h)}`),a}),D,r):void 0;return Object.assign(Object.assign({},R),{rtlEnabled:M,mergedClsPrefix:t,contentRef:e,mergedBordered:o,handleClick:g,handleCloseClick:O,cssVars:s?void 0:D,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender})},render(){var r,e;const{mergedClsPrefix:o,rtlEnabled:t,color:{borderColor:s}={},onRender:l,$slots:I}=this;return l==null||l(),f("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:t,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:this.round}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},de(I.avatar,g=>g&&f("div",{class:`${o}-tag__avatar`},g)),f("span",{class:`${o}-tag__content`,ref:"contentRef"},(e=(r=this.$slots).default)===null||e===void 0?void 0:e.call(r)),!this.checkable&&this.closable?f(ie,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick}):null,!this.checkable&&this.mergedBordered?f("div",{class:`${o}-tag__border`,style:{borderColor:s}}):null)}});class Ie{constructor(e,o){c(this,"place");c(this,"travelTime");this.place=new De(e),this.travelTime=o===void 0?void 0:new xe(o)}}class De{constructor(e){c(this,"ID");c(this,"label");c(this,"URL");c(this,"description");this.ID=(e==null?void 0:e.ID.valueOf())??-1,this.label=(e==null?void 0:e.label.valueOf())??"",this.URL=(e==null?void 0:e.URL.valueOf())??"",this.description=(e==null?void 0:e.description.valueOf())??""}}class xe{constructor(e){c(this,"ID");c(this,"fromPlaceID");c(this,"toPlaceID");c(this,"toPlaceIndex");c(this,"timeInMinutes");this.ID=(e==null?void 0:e.ID.valueOf())??-1,this.fromPlaceID=(e==null?void 0:e.fromPlaceID.valueOf())??-1,this.toPlaceID=(e==null?void 0:e.toPlaceID.valueOf())??-1,this.toPlaceIndex=(e==null?void 0:e.toPlaceIndex.valueOf())??-1,this.timeInMinutes=(e==null?void 0:e.timeInMinutes.valueOf())??0}}class Oe{constructor(e){c(this,"ID");c(this,"tripID");c(this,"dayOf");c(this,"propPlaces",[]);this.ID=e.ID.valueOf(),this.tripID=e.tripID.valueOf(),this.dayOf=e.dayOf.valueOf(),this.propPlaces=e.places.map((o,t)=>{let s;if(t>0)for(const l of e.travelTime)o.ID===l.toPlaceID&&e.places[t-1].ID===l.fromPlaceID&&(s=l);return new Ie(o,s)})}toDay(){const e=new ue;return e.ID=this.ID,e.tripID=this.tripID,e.dayOf=this.dayOf,e.places=this.propPlaces.map(o=>{const t=new fe;return t.ID=o.place.ID,t.URL=o.place.URL,t.description=o.place.description,t.label=o.place.label,t}),e.travelTime=this.propPlaces.map(o=>{const t=o.travelTime;if(t===void 0)return;const s=new ge;return s.ID=t.ID,s.fromPlaceID=t.fromPlaceID,s.timeInMinutes=t.timeInMinutes,s.toPlaceID=t.toPlaceID,s.toPlaceIndex=t.toPlaceIndex,s}).filter(o=>!!o),e}}export{Oe as D,ze as N,Ie as P,xe as a};
