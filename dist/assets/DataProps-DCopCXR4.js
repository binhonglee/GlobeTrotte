var ce=Object.defineProperty;var ne=(r,e,o)=>e in r?ce(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var c=(r,e,o)=>ne(r,typeof e!="symbol"?e+"":e,o);import{x as se,ak as d,ad as v,al as P,v as y,d as le,y as B,u as f,aW as ie,D as de,z as he,A as M,Z as ge,E as be,L as ue,M as R,af as l,ar as ve,ag as fe,aX as $,aY as ke,T as Ce,aZ as pe}from"./index-CVwEz7sZ.js";import{D as Ie,b as me,c as xe}from"./TripObj-B2zgwhZc.js";const De={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},Pe=se("tag",`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
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
`,[d("strong",`
 font-weight: var(--n-font-weight-strong);
 `),v("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),v("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),v("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),v("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),d("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[v("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),v("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),d("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),d("icon, avatar",[d("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),d("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),d("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[P("disabled",[y("&:hover","background-color: var(--n-color-hover-checkable);",[P("checked","color: var(--n-text-color-hover-checkable);")]),y("&:active","background-color: var(--n-color-pressed-checkable);",[P("checked","color: var(--n-text-color-pressed-checkable);")])]),d("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[P("disabled",[y("&:hover","background-color: var(--n-color-checked-hover);"),y("&:active","background-color: var(--n-color-checked-pressed);")])])])]),ye=Object.assign(Object.assign(Object.assign({},M.props),De),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),ze=pe("n-tag"),_e=le({name:"Tag",props:ye,slots:Object,setup(r){const e=de(null),{mergedBorderedRef:o,mergedClsPrefixRef:t,inlineThemeDisabled:n,mergedRtlRef:h}=he(r),C=M("Tag","-tag",Pe,ke,r,t);ge(ze,{roundRef:be(r,"round")});function k(){if(!r.disabled&&r.checkable){const{checked:a,onCheckedChange:s,onUpdateChecked:u,"onUpdate:checked":g}=r;u&&u(!a),g&&g(!a),s&&s(!a)}}function p(a){if(r.triggerClickOnClose||a.stopPropagation(),!r.disabled){const{onClose:s}=r;s&&Ce(s,a)}}const I={setTextContent(a){const{value:s}=e;s&&(s.textContent=a)}},m=ue("Tag",h,t),i=R(()=>{const{type:a,size:s,color:{color:u,textColor:g}={}}=r,{common:{cubicBezierEaseInOut:x},self:{padding:w,closeMargin:_,borderRadius:S,opacityDisabled:U,textColorCheckable:j,textColorHoverCheckable:F,textColorPressedCheckable:H,textColorChecked:L,colorCheckable:E,colorHoverCheckable:N,colorPressedCheckable:K,colorChecked:V,colorCheckedHover:W,colorCheckedPressed:A,closeBorderRadius:Z,fontWeightStrong:X,[l("colorBordered",a)]:Y,[l("closeSize",s)]:q,[l("closeIconSize",s)]:G,[l("fontSize",s)]:J,[l("height",s)]:z,[l("color",a)]:Q,[l("textColor",a)]:T,[l("border",a)]:ee,[l("closeIconColor",a)]:O,[l("closeIconColorHover",a)]:oe,[l("closeIconColorPressed",a)]:re,[l("closeColorHover",a)]:ae,[l("closeColorPressed",a)]:te}}=C.value,D=ve(_);return{"--n-font-weight-strong":X,"--n-avatar-size-override":`calc(${z} - 8px)`,"--n-bezier":x,"--n-border-radius":S,"--n-border":ee,"--n-close-icon-size":G,"--n-close-color-pressed":te,"--n-close-color-hover":ae,"--n-close-border-radius":Z,"--n-close-icon-color":O,"--n-close-icon-color-hover":oe,"--n-close-icon-color-pressed":re,"--n-close-icon-color-disabled":O,"--n-close-margin-top":D.top,"--n-close-margin-right":D.right,"--n-close-margin-bottom":D.bottom,"--n-close-margin-left":D.left,"--n-close-size":q,"--n-color":u||(o.value?Y:Q),"--n-color-checkable":E,"--n-color-checked":V,"--n-color-checked-hover":W,"--n-color-checked-pressed":A,"--n-color-hover-checkable":N,"--n-color-pressed-checkable":K,"--n-font-size":J,"--n-height":z,"--n-opacity-disabled":U,"--n-padding":w,"--n-text-color":g||T,"--n-text-color-checkable":j,"--n-text-color-checked":L,"--n-text-color-hover-checkable":F,"--n-text-color-pressed-checkable":H}}),b=n?fe("tag",R(()=>{let a="";const{type:s,size:u,color:{color:g,textColor:x}={}}=r;return a+=s[0],a+=u[0],g&&(a+=`a${$(g)}`),x&&(a+=`b${$(x)}`),o.value&&(a+="c"),a}),i,r):void 0;return Object.assign(Object.assign({},I),{rtlEnabled:m,mergedClsPrefix:t,contentRef:e,mergedBordered:o,handleClick:k,handleCloseClick:p,cssVars:n?void 0:i,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender})},render(){var r,e;const{mergedClsPrefix:o,rtlEnabled:t,closable:n,color:{borderColor:h}={},round:C,onRender:k,$slots:p}=this;k==null||k();const I=B(p.avatar,i=>i&&f("div",{class:`${o}-tag__avatar`},i)),m=B(p.icon,i=>i&&f("div",{class:`${o}-tag__icon`},i));return f("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:t,[`${o}-tag--strong`]:this.strong,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:C,[`${o}-tag--avatar`]:I,[`${o}-tag--icon`]:m,[`${o}-tag--closable`]:n}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},m||I,f("span",{class:`${o}-tag__content`,ref:"contentRef"},(e=(r=this.$slots).default)===null||e===void 0?void 0:e.call(r)),!this.checkable&&n?f(ie,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:C,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?f("div",{class:`${o}-tag__border`,style:{borderColor:h}}):null)}});class Oe{constructor(e,o){c(this,"place");c(this,"travelTime");this.place=new Be(e),this.travelTime=o===void 0?void 0:new Re(o)}}class Be{constructor(e){c(this,"ID");c(this,"label");c(this,"URL");c(this,"description");this.ID=(e==null?void 0:e.ID.valueOf())??-1,this.label=(e==null?void 0:e.label.valueOf())??"",this.URL=(e==null?void 0:e.URL.valueOf())??"",this.description=(e==null?void 0:e.description.valueOf())??""}}class Re{constructor(e){c(this,"ID");c(this,"fromPlaceID");c(this,"toPlaceID");c(this,"toPlaceIndex");c(this,"timeInMinutes");this.ID=(e==null?void 0:e.ID.valueOf())??-1,this.fromPlaceID=(e==null?void 0:e.fromPlaceID.valueOf())??-1,this.toPlaceID=(e==null?void 0:e.toPlaceID.valueOf())??-1,this.toPlaceIndex=(e==null?void 0:e.toPlaceIndex.valueOf())??-1,this.timeInMinutes=(e==null?void 0:e.timeInMinutes.valueOf())??0}}class Se{constructor(e){c(this,"ID");c(this,"tripID");c(this,"dayOf");c(this,"propPlaces",[]);this.ID=e.ID.valueOf(),this.tripID=e.tripID.valueOf(),this.dayOf=e.dayOf.valueOf(),this.propPlaces=e.places.map((o,t)=>{let n;if(t>0)for(const h of e.travelTime)o.ID===h.toPlaceID&&e.places[t-1].ID===h.fromPlaceID&&(n=h);return new Oe(o,n)})}toDay(){const e=new Ie;return e.ID=this.ID,e.tripID=this.tripID,e.dayOf=this.dayOf,e.places=this.propPlaces.map(o=>{const t=new me;return t.ID=o.place.ID,t.URL=o.place.URL,t.description=o.place.description,t.label=o.place.label,t}),e.travelTime=this.propPlaces.map(o=>{const t=o.travelTime;if(t===void 0)return;const n=new xe;return n.ID=t.ID,n.fromPlaceID=t.fromPlaceID,n.timeInMinutes=t.timeInMinutes,n.toPlaceID=t.toPlaceID,n.toPlaceIndex=t.toPlaceIndex,n}).filter(o=>!!o),e}}export{Se as D,_e as N,Oe as P,Re as a};
