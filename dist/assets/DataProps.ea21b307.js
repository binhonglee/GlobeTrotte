import{A as Y,C as v,Q as k,S as C,B as p,d as Z,V as T,T as ee,U as y,a1 as oe,I as re,a2 as te,x as P,a3 as ae,y as f,aP as ce,a4 as ne,O as se,aa as le,aQ as ie,ad as l,aR as m}from"./index.0e628a00.js";import{D as de,P as he,a as ue}from"./TripObj.c656b151.js";const be={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},fe=Y("tag",`
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
 `,[C("disabled",[p("&:hover","background-color: var(--n-color-checked-hover);"),p("&:active","background-color: var(--n-color-checked-pressed);")])])])]),ge=Object.assign(Object.assign(Object.assign({},y.props),be),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalStopClickPropagation:Boolean,onCheckedChange:{type:Function,validator:()=>!0,default:void 0}}),ve=se("n-tag"),De=Z({name:"Tag",props:ge,setup(a){const e=T(null),{mergedBorderedRef:o,mergedClsPrefixRef:r,inlineThemeDisabled:t,mergedRtlRef:n}=ee(a),h=y("Tag","-tag",fe,ie,a,r);oe(ve,{roundRef:re(a,"round")});function g(c){if(!a.disabled&&a.checkable){const{checked:s,onCheckedChange:b,onUpdateChecked:i,"onUpdate:checked":d}=a;i&&i(!s),d&&d(!s),b&&b(!s)}}function z(c){if(a.internalStopClickPropagation&&c.stopPropagation(),!a.disabled){const{onClose:s}=a;s&&le(s,c)}}const O={setTextContent(c){const{value:s}=e;s&&(s.textContent=c)}},R=te("Tag",n,r),I=P(()=>{const{type:c,size:s,color:{color:b,textColor:i}={}}=a,{common:{cubicBezierEaseInOut:d},self:{padding:M,closeMargin:$,closeMarginRtl:B,borderRadius:w,opacityDisabled:_,textColorCheckable:S,textColorHoverCheckable:U,textColorPressedCheckable:j,textColorChecked:F,colorCheckable:H,colorHoverCheckable:E,colorPressedCheckable:L,colorChecked:N,colorCheckedHover:V,colorCheckedPressed:K,[l("closeSize",s)]:A,[l("fontSize",s)]:Q,[l("height",s)]:x,[l("color",c)]:W,[l("textColor",c)]:q,[l("border",c)]:G,[l("closeColor",c)]:D,[l("closeColorHover",c)]:J,[l("closeColorPressed",c)]:X}}=h.value;return{"--n-avatar-size-override":`calc(${x} - 8px)`,"--n-bezier":d,"--n-border-radius":w,"--n-border":G,"--n-close-color":D,"--n-close-color-hover":J,"--n-close-color-pressed":X,"--n-close-color-disabled":D,"--n-close-margin":$,"--n-close-margin-rtl":B,"--n-close-size":A,"--n-color":b||W,"--n-color-checkable":H,"--n-color-checked":N,"--n-color-checked-hover":V,"--n-color-checked-pressed":K,"--n-color-hover-checkable":E,"--n-color-pressed-checkable":L,"--n-font-size":Q,"--n-height":x,"--n-opacity-disabled":_,"--n-padding":M,"--n-text-color":i||q,"--n-text-color-checkable":S,"--n-text-color-checked":F,"--n-text-color-hover-checkable":U,"--n-text-color-pressed-checkable":j}}),u=t?ae("tag",P(()=>{let c="";const{type:s,size:b,color:{color:i,textColor:d}={}}=a;return c+=s[0],c+=b[0],i&&(c+=`a${m(i)}`),d&&(c+=`b${m(d)}`),c}),I,a):void 0;return Object.assign(Object.assign({},O),{rtlEnabled:R,mergedClsPrefix:r,contentRef:e,mergedBordered:o,handleClick:g,handleCloseClick:z,cssVars:t?void 0:I,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender})},render(){var a,e;const{mergedClsPrefix:o,rtlEnabled:r,color:{borderColor:t}={},onRender:n,$slots:h}=this;return n==null||n(),f("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:r,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:this.round}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},ne(h.avatar,g=>g&&f("div",{class:`${o}-tag__avatar`},g)),f("span",{class:`${o}-tag__content`,ref:"contentRef"},(e=(a=this.$slots).default)===null||e===void 0?void 0:e.call(a)),!this.checkable&&this.closable?f(ce,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick}):null,!this.checkable&&this.mergedBordered?f("div",{class:`${o}-tag__border`,style:{borderColor:t}}):null)}});class ke{constructor(e,o){this.place=new Ce(e),this.travelTime=o===void 0?void 0:new pe(o)}}class Ce{constructor(e){var o,r,t,n;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.label=(r=e==null?void 0:e.label.valueOf())!=null?r:"",this.URL=(t=e==null?void 0:e.URL.valueOf())!=null?t:"",this.description=(n=e==null?void 0:e.description.valueOf())!=null?n:""}}class pe{constructor(e){var o,r,t,n,h;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.fromPlaceID=(r=e==null?void 0:e.fromPlaceID.valueOf())!=null?r:-1,this.toPlaceID=(t=e==null?void 0:e.toPlaceID.valueOf())!=null?t:-1,this.toPlaceIndex=(n=e==null?void 0:e.toPlaceIndex.valueOf())!=null?n:-1,this.timeInMinutes=(h=e==null?void 0:e.timeInMinutes.valueOf())!=null?h:0}}class Pe{constructor(e){this.propPlaces=[],this.ID=e.ID.valueOf(),this.tripID=e.tripID.valueOf(),this.dayOf=e.dayOf.valueOf(),this.propPlaces=e.places.map((o,r)=>{let t;if(r>0)for(const n of e.travelTime)o.ID===n.toPlaceID&&e.places[r-1].ID===n.fromPlaceID&&(t=n);return new ke(o,t)})}toDay(){const e=new de;return e.ID=this.ID,e.tripID=this.tripID,e.dayOf=this.dayOf,e.places=this.propPlaces.map(o=>{const r=new he;return r.ID=o.place.ID,r.URL=o.place.URL,r.description=o.place.description,r.label=o.place.label,r}),e.travelTime=this.propPlaces.map(o=>{const r=o.travelTime;if(r===void 0)return;const t=new ue;return t.ID=r.ID,t.fromPlaceID=r.fromPlaceID,t.timeInMinutes=r.timeInMinutes,t.toPlaceID=r.toPlaceID,t.toPlaceIndex=r.toPlaceIndex,t}).filter(o=>!!o),e}}export{Pe as D,De as N,ke as P,pe as a};
