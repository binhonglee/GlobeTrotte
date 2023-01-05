var Z=Object.defineProperty;var T=(t,e,o)=>e in t?Z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var n=(t,e,o)=>(T(t,typeof e!="symbol"?e+"":e,o),o);import{A as ee,C as k,Q as C,S as p,B as I,d as oe,V as re,T as te,U as O,a1 as ae,I as ce,a2 as ne,x as m,a3 as se,y as g,aP as le,a4 as ie,O as de,aa as he,aQ as ue,ad as i,aR as y}from"./index.1e42ab1f.js";import{D as be,P as fe,a as ge}from"./TripObj.1e2926c6.js";const ve={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},ke=ee("tag",`
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
`,[k("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),k("avatar",`
 display: flex;
 margin-right: 6px;
 `),k("close",`
 font-size: var(--n-close-size);
 margin: var(--n-close-margin);
 transition: color .3s var(--n-bezier);
 cursor: pointer;
 `),C("round",`
 padding: 0 calc(var(--n-height) / 2);
 border-radius: calc(var(--n-height) / 2);
 `,[k("avatar",`
 margin-left: calc((var(--n-height) - 8px) / -2);
 `)]),C("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),C("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[p("disabled",[I("&:hover","background-color: var(--n-color-hover-checkable);",[p("checked","color: var(--n-text-color-hover-checkable);")]),I("&:active","background-color: var(--n-color-pressed-checkable);",[p("checked","color: var(--n-text-color-pressed-checkable);")])]),C("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[p("disabled",[I("&:hover","background-color: var(--n-color-checked-hover);"),I("&:active","background-color: var(--n-color-checked-pressed);")])])])]),Ce=Object.assign(Object.assign(Object.assign({},O.props),ve),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalStopClickPropagation:Boolean,onCheckedChange:{type:Function,validator:()=>!0,default:void 0}}),pe=de("n-tag"),Oe=oe({name:"Tag",props:Ce,setup(t){const e=re(null),{mergedBorderedRef:o,mergedClsPrefixRef:r,inlineThemeDisabled:a,mergedRtlRef:s}=te(t),u=O("Tag","-tag",ke,ue,t,r);ae(pe,{roundRef:ce(t,"round")});function v(c){if(!t.disabled&&t.checkable){const{checked:l,onCheckedChange:f,onUpdateChecked:d,"onUpdate:checked":h}=t;d&&d(!l),h&&h(!l),f&&f(!l)}}function z(c){if(t.internalStopClickPropagation&&c.stopPropagation(),!t.disabled){const{onClose:l}=t;l&&he(l,c)}}const R={setTextContent(c){const{value:l}=e;l&&(l.textContent=c)}},M=ne("Tag",s,r),D=m(()=>{const{type:c,size:l,color:{color:f,textColor:d}={}}=t,{common:{cubicBezierEaseInOut:h},self:{padding:$,closeMargin:B,closeMarginRtl:w,borderRadius:U,opacityDisabled:_,textColorCheckable:S,textColorHoverCheckable:j,textColorPressedCheckable:F,textColorChecked:H,colorCheckable:L,colorHoverCheckable:E,colorPressedCheckable:N,colorChecked:V,colorCheckedHover:K,colorCheckedPressed:A,[i("closeSize",l)]:Q,[i("fontSize",l)]:W,[i("height",l)]:x,[i("color",c)]:q,[i("textColor",c)]:G,[i("border",c)]:J,[i("closeColor",c)]:P,[i("closeColorHover",c)]:X,[i("closeColorPressed",c)]:Y}}=u.value;return{"--n-avatar-size-override":`calc(${x} - 8px)`,"--n-bezier":h,"--n-border-radius":U,"--n-border":J,"--n-close-color":P,"--n-close-color-hover":X,"--n-close-color-pressed":Y,"--n-close-color-disabled":P,"--n-close-margin":B,"--n-close-margin-rtl":w,"--n-close-size":Q,"--n-color":f||q,"--n-color-checkable":L,"--n-color-checked":V,"--n-color-checked-hover":K,"--n-color-checked-pressed":A,"--n-color-hover-checkable":E,"--n-color-pressed-checkable":N,"--n-font-size":W,"--n-height":x,"--n-opacity-disabled":_,"--n-padding":$,"--n-text-color":d||G,"--n-text-color-checkable":S,"--n-text-color-checked":H,"--n-text-color-hover-checkable":j,"--n-text-color-pressed-checkable":F}}),b=a?se("tag",m(()=>{let c="";const{type:l,size:f,color:{color:d,textColor:h}={}}=t;return c+=l[0],c+=f[0],d&&(c+=`a${y(d)}`),h&&(c+=`b${y(h)}`),c}),D,t):void 0;return Object.assign(Object.assign({},R),{rtlEnabled:M,mergedClsPrefix:r,contentRef:e,mergedBordered:o,handleClick:v,handleCloseClick:z,cssVars:a?void 0:D,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender})},render(){var t,e;const{mergedClsPrefix:o,rtlEnabled:r,color:{borderColor:a}={},onRender:s,$slots:u}=this;return s==null||s(),g("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:r,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:this.round}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},ie(u.avatar,v=>v&&g("div",{class:`${o}-tag__avatar`},v)),g("span",{class:`${o}-tag__content`,ref:"contentRef"},(e=(t=this.$slots).default)===null||e===void 0?void 0:e.call(t)),!this.checkable&&this.closable?g(le,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick}):null,!this.checkable&&this.mergedBordered?g("div",{class:`${o}-tag__border`,style:{borderColor:a}}):null)}});class Ie{constructor(e,o){n(this,"place");n(this,"travelTime");this.place=new De(e),this.travelTime=o===void 0?void 0:new xe(o)}}class De{constructor(e){n(this,"ID");n(this,"label");n(this,"URL");n(this,"description");var o,r,a,s;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.label=(r=e==null?void 0:e.label.valueOf())!=null?r:"",this.URL=(a=e==null?void 0:e.URL.valueOf())!=null?a:"",this.description=(s=e==null?void 0:e.description.valueOf())!=null?s:""}}class xe{constructor(e){n(this,"ID");n(this,"fromPlaceID");n(this,"toPlaceID");n(this,"toPlaceIndex");n(this,"timeInMinutes");var o,r,a,s,u;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.fromPlaceID=(r=e==null?void 0:e.fromPlaceID.valueOf())!=null?r:-1,this.toPlaceID=(a=e==null?void 0:e.toPlaceID.valueOf())!=null?a:-1,this.toPlaceIndex=(s=e==null?void 0:e.toPlaceIndex.valueOf())!=null?s:-1,this.timeInMinutes=(u=e==null?void 0:e.timeInMinutes.valueOf())!=null?u:0}}class ze{constructor(e){n(this,"ID");n(this,"tripID");n(this,"dayOf");n(this,"propPlaces",[]);this.ID=e.ID.valueOf(),this.tripID=e.tripID.valueOf(),this.dayOf=e.dayOf.valueOf(),this.propPlaces=e.places.map((o,r)=>{let a;if(r>0)for(const s of e.travelTime)o.ID===s.toPlaceID&&e.places[r-1].ID===s.fromPlaceID&&(a=s);return new Ie(o,a)})}toDay(){const e=new be;return e.ID=this.ID,e.tripID=this.tripID,e.dayOf=this.dayOf,e.places=this.propPlaces.map(o=>{const r=new fe;return r.ID=o.place.ID,r.URL=o.place.URL,r.description=o.place.description,r.label=o.place.label,r}),e.travelTime=this.propPlaces.map(o=>{const r=o.travelTime;if(r===void 0)return;const a=new ge;return a.ID=r.ID,a.fromPlaceID=r.fromPlaceID,a.timeInMinutes=r.timeInMinutes,a.toPlaceID=r.toPlaceID,a.toPlaceIndex=r.toPlaceIndex,a}).filter(o=>!!o),e}}export{ze as D,Oe as N,Ie as P,xe as a};
