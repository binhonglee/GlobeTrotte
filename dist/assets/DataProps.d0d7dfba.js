var oe=Object.defineProperty;var te=(r,e,o)=>e in r?oe(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var c=(r,e,o)=>(te(r,typeof e!="symbol"?e+"":e,o),o);import{s as ae,u as S,v as p,x as U,y as I,d as ne,z as re,A as se,B as O,C as ce,D as le,E as ie,I as x,J as h,K as de,L as w,M as v,O as he,P as ue,Q as ge,S as be,U as fe,V as t,W as Ce,X as ve,Y as ke}from"./index.54fcaa4d.js";var Se={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},pe=ae("tag",`
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
`,[S("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),S("avatar",`
 display: flex;
 margin-right: 6px;
 `),S("close",`
 font-size: var(--n-close-size);
 margin: var(--n-close-margin);
 transition: color .3s var(--n-bezier);
 cursor: pointer;
 `),p("round",`
 padding: 0 calc(var(--n-height) / 2);
 border-radius: calc(var(--n-height) / 2);
 `,[S("avatar",`
 margin-left: calc((var(--n-height) - 8px) / -2);
 `)]),p("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),p("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[U("disabled",[I("&:hover","background-color: var(--n-color-hover-checkable);",[U("checked","color: var(--n-text-color-hover-checkable);")]),I("&:active","background-color: var(--n-color-pressed-checkable);",[U("checked","color: var(--n-text-color-pressed-checkable);")])]),p("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[U("disabled",[I("&:hover","background-color: var(--n-color-checked-hover);"),I("&:active","background-color: var(--n-color-checked-pressed);")])])])]);const Ue=Object.assign(Object.assign(Object.assign({},O.props),Se),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalStopClickPropagation:Boolean,onCheckedChange:{type:Function,validator:()=>!0,default:void 0}}),Ie=ge("n-tag");var me=ne({name:"Tag",props:Ue,setup(r){const e=re(null),{mergedBorderedRef:o,mergedClsPrefixRef:a,inlineThemeDisabled:n,mergedRtlRef:i}=se(r),b=O("Tag","-tag",pe,be,r,a);ce(Ie,{roundRef:le(r,"round")});function k(s){if(!r.disabled&&r.checkable){const{checked:d,onCheckedChange:C,onUpdateChecked:u,"onUpdate:checked":g}=r;u&&u(!d),g&&g(!d),C&&C(!d)}}function z(s){if(r.internalStopClickPropagation&&s.stopPropagation(),!r.disabled){const{onClose:d}=r;d&&fe(d,s)}}const A={setTextContent(s){const{value:d}=e;d&&(d.textContent=s)}},M=ie("Tag",i,a),P=x(()=>{const{type:s,size:d,color:{color:C,textColor:u}={}}=r,{common:{cubicBezierEaseInOut:g},self:{padding:R,closeMargin:N,closeMarginRtl:L,borderRadius:B,opacityDisabled:H,textColorCheckable:$,textColorHoverCheckable:Y,textColorPressedCheckable:F,textColorChecked:K,colorCheckable:W,colorHoverCheckable:_,colorPressedCheckable:V,colorChecked:j,colorCheckedHover:E,colorCheckedPressed:G,[h("closeSize",d)]:J,[h("fontSize",d)]:Z,[h("height",d)]:D,[h("color",s)]:Q,[h("textColor",s)]:T,[h("border",s)]:X,[h("closeColor",s)]:y,[h("closeColorHover",s)]:q,[h("closeColorPressed",s)]:ee}}=b.value;return{"--n-avatar-size-override":`calc(${D} - 8px)`,"--n-bezier":g,"--n-border-radius":B,"--n-border":X,"--n-close-color":y,"--n-close-color-hover":q,"--n-close-color-pressed":ee,"--n-close-color-disabled":y,"--n-close-margin":N,"--n-close-margin-rtl":L,"--n-close-size":J,"--n-color":C||Q,"--n-color-checkable":W,"--n-color-checked":j,"--n-color-checked-hover":E,"--n-color-checked-pressed":G,"--n-color-hover-checkable":_,"--n-color-pressed-checkable":V,"--n-font-size":Z,"--n-height":D,"--n-opacity-disabled":H,"--n-padding":R,"--n-text-color":u||T,"--n-text-color-checkable":$,"--n-text-color-checked":K,"--n-text-color-hover-checkable":Y,"--n-text-color-pressed-checkable":F}}),f=n?de("tag",x(()=>{let s="";const{type:d,size:C,color:{color:u,textColor:g}={}}=r;return s+=d[0],s+=C[0],u&&(s+=`a${w(u)}`),g&&(s+=`b${w(g)}`),s}),P,r):void 0;return Object.assign(Object.assign({},A),{rtlEnabled:M,mergedClsPrefix:a,contentRef:e,mergedBordered:o,handleClick:k,handleCloseClick:z,cssVars:n?void 0:P,themeClass:f==null?void 0:f.themeClass,onRender:f==null?void 0:f.onRender})},render(){var r,e;const{mergedClsPrefix:o,rtlEnabled:a,color:{borderColor:n}={},onRender:i,$slots:b}=this;return i==null||i(),v("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:a,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:this.round}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},ue(b.avatar,k=>k&&v("div",{class:`${o}-tag__avatar`},k)),v("span",{class:`${o}-tag__content`,ref:"contentRef"},(e=(r=this.$slots).default)===null||e===void 0?void 0:e.call(r)),!this.checkable&&this.closable?v(he,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick}):null,!this.checkable&&this.mergedBordered?v("div",{class:`${o}-tag__border`,style:{borderColor:n}}):null)}});class l{constructor(e){c(this,"key",t.UNKNOWN);c(this,"label",m.toString(this.key));this.key=e,this.label=m.toString(this.key)}}class m{static sortedCityList(){return[new l(t.UNKNOWN),new l(t.AnchorageAKUS),new l(t.BostonMAUS),new l(t.GeorgeTownPGMY),new l(t.HonoluluHIUS),new l(t.KualaLumpurMY),new l(t.LasVegasNVUS),new l(t.LosAngelesCAUS),new l(t.MauiHIUS),new l(t.NewYorkNYUS),new l(t.PageAZUS),new l(t.ParisFR),new l(t.PhoneixAZUS),new l(t.SanFranciscoCAUS),new l(t.SanJoseCAUS),new l(t.SantaCruzCAUS),new l(t.SeattleWAUS),new l(t.WashingtonDCUS)]}static sortedCityOptions(){return this.sortedCityList().map(e=>({label:e.label,value:e.key.toString()}))}static toString(e){var n;const o="Others";return(n={[t.UNKNOWN]:"Others",[t.AnchorageAKUS]:"Anchorage, Alaska, US",[t.BostonMAUS]:"Boston, Massachusetts, US",[t.GeorgeTownPGMY]:"George Town, Penang, MY",[t.HonoluluHIUS]:"Honolulu, Hawaii, US",[t.KualaLumpurMY]:"Kuala Lumpur, MY",[t.LasVegasNVUS]:"Las Vegas, Nevada, US",[t.LosAngelesCAUS]:"Los Angeles, California, US",[t.MauiHIUS]:"Maui, Hawaii, US",[t.NewYorkNYUS]:"New York, New York, US",[t.PageAZUS]:"Page, Arizona, US",[t.ParisFR]:"Paris, FR",[t.PhoneixAZUS]:"Phoenix, Arizona, US",[t.SanFranciscoCAUS]:"San Francisco, California, US",[t.SanJoseCAUS]:"San Jose, California, US",[t.SantaCruzCAUS]:"Santa Cruz, California, US",[t.SeattleWAUS]:"Seattle, Washington, US",[t.WashingtonDCUS]:"Washington, D.C., US"}[e])!=null?n:o}static citiesToString(e){let o="";for(const a of e)o+=a+",";return o}static stringToCityStringArray(e){const o=[],a=e.split(",");for(const n of a)n.length>0&&n!=="0"&&o.push(n.toString());return o}static stringToCities(e){const o=[],a=e.split(",");for(const n of a)n.length>0&&n!=="0"&&o.push(+n);return o}}class Pe{constructor(e,o){c(this,"place");c(this,"travelTime");this.place=new De(e),this.travelTime=o===void 0?void 0:new ye(o)}}class De{constructor(e){c(this,"ID");c(this,"label");c(this,"URL");c(this,"description");var o,a,n,i;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.label=(a=e==null?void 0:e.label.valueOf())!=null?a:"",this.URL=(n=e==null?void 0:e.URL.valueOf())!=null?n:"",this.description=(i=e==null?void 0:e.description.valueOf())!=null?i:""}}class ye{constructor(e){c(this,"ID");c(this,"fromPlaceID");c(this,"toPlaceID");c(this,"toPlaceIndex");c(this,"timeInMinutes");var o,a,n,i,b;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.fromPlaceID=(a=e==null?void 0:e.fromPlaceID.valueOf())!=null?a:-1,this.toPlaceID=(n=e==null?void 0:e.toPlaceID.valueOf())!=null?n:-1,this.toPlaceIndex=(i=e==null?void 0:e.toPlaceIndex.valueOf())!=null?i:-1,this.timeInMinutes=(b=e==null?void 0:e.timeInMinutes.valueOf())!=null?b:0}}class Oe{constructor(e){c(this,"ID");c(this,"tripID");c(this,"dayOf");c(this,"propPlaces",[]);this.ID=e.ID.valueOf(),this.tripID=e.tripID.valueOf(),this.dayOf=e.dayOf.valueOf(),this.propPlaces=e.places.map((o,a)=>{let n;if(a>0)for(const i of e.travelTime)o.ID===i.toPlaceID&&e.places[a-1].ID===i.fromPlaceID&&(n=i);return new Pe(o,n)})}toDay(){const e=new Ce;return e.ID=this.ID,e.tripID=this.tripID,e.dayOf=this.dayOf,e.places=this.propPlaces.map(o=>{const a=new ve;return a.ID=o.place.ID,a.URL=o.place.URL,a.description=o.place.description,a.label=o.place.label,a}),e.travelTime=this.propPlaces.map(o=>{const a=o.travelTime;if(a===void 0)return;const n=new ke;return n.ID=a.ID,n.fromPlaceID=a.fromPlaceID,n.timeInMinutes=a.timeInMinutes,n.toPlaceID=a.toPlaceID,n.toPlaceIndex=a.toPlaceIndex,n}).filter(o=>!!o),e}}export{m as C,Oe as D,me as N,Pe as P,ye as a};
