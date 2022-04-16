import{s as ee,u as k,v as S,x as p,y as U,d as oe,z as te,A as ne,B as m,C as ae,D as re,E as se,I as x,J as d,K as ce,L as D,M as C,O as le,P as ie,Q as de,S as he,U as ue,V as t,W as ge,X as be,Y as fe}from"./index.7468df66.js";var Ce={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},ve=ee("tag",`
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
 `),S("round",`
 padding: 0 calc(var(--n-height) / 2);
 border-radius: calc(var(--n-height) / 2);
 `,[k("avatar",`
 margin-left: calc((var(--n-height) - 8px) / -2);
 `)]),S("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),S("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[p("disabled",[U("&:hover","background-color: var(--n-color-hover-checkable);",[p("checked","color: var(--n-text-color-hover-checkable);")]),U("&:active","background-color: var(--n-color-pressed-checkable);",[p("checked","color: var(--n-text-color-pressed-checkable);")])]),S("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[p("disabled",[U("&:hover","background-color: var(--n-color-checked-hover);"),U("&:active","background-color: var(--n-color-checked-pressed);")])])])]);const ke=Object.assign(Object.assign(Object.assign({},m.props),Ce),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalStopClickPropagation:Boolean,onCheckedChange:{type:Function,validator:()=>!0,default:void 0}}),Se=de("n-tag");var Ie=oe({name:"Tag",props:ke,setup(r){const e=te(null),{mergedBorderedRef:o,mergedClsPrefixRef:n,inlineThemeDisabled:a,mergedRtlRef:l}=ne(r),g=m("Tag","-tag",ve,he,r,n);ae(Se,{roundRef:re(r,"round")});function v(s){if(!r.disabled&&r.checkable){const{checked:i,onCheckedChange:f,onUpdateChecked:h,"onUpdate:checked":u}=r;h&&h(!i),u&&u(!i),f&&f(!i)}}function z(s){if(r.internalStopClickPropagation&&s.stopPropagation(),!r.disabled){const{onClose:i}=r;i&&ue(i,s)}}const O={setTextContent(s){const{value:i}=e;i&&(i.textContent=s)}},A=se("Tag",l,n),P=x(()=>{const{type:s,size:i,color:{color:f,textColor:h}={}}=r,{common:{cubicBezierEaseInOut:u},self:{padding:M,closeMargin:R,closeMarginRtl:N,borderRadius:B,opacityDisabled:L,textColorCheckable:H,textColorHoverCheckable:$,textColorPressedCheckable:Y,textColorChecked:F,colorCheckable:K,colorHoverCheckable:W,colorPressedCheckable:_,colorChecked:V,colorCheckedHover:j,colorCheckedPressed:E,[d("closeSize",i)]:G,[d("fontSize",i)]:J,[d("height",i)]:y,[d("color",s)]:Z,[d("textColor",s)]:Q,[d("border",s)]:X,[d("closeColor",s)]:I,[d("closeColorHover",s)]:q,[d("closeColorPressed",s)]:T}}=g.value;return{"--n-avatar-size-override":`calc(${y} - 8px)`,"--n-bezier":u,"--n-border-radius":B,"--n-border":X,"--n-close-color":I,"--n-close-color-hover":q,"--n-close-color-pressed":T,"--n-close-color-disabled":I,"--n-close-margin":R,"--n-close-margin-rtl":N,"--n-close-size":G,"--n-color":f||Z,"--n-color-checkable":K,"--n-color-checked":V,"--n-color-checked-hover":j,"--n-color-checked-pressed":E,"--n-color-hover-checkable":W,"--n-color-pressed-checkable":_,"--n-font-size":J,"--n-height":y,"--n-opacity-disabled":L,"--n-padding":M,"--n-text-color":h||Q,"--n-text-color-checkable":H,"--n-text-color-checked":F,"--n-text-color-hover-checkable":$,"--n-text-color-pressed-checkable":Y}}),b=a?ce("tag",x(()=>{let s="";const{type:i,size:f,color:{color:h,textColor:u}={}}=r;return s+=i[0],s+=f[0],h&&(s+=`a${D(h)}`),u&&(s+=`b${D(u)}`),s}),P,r):void 0;return Object.assign(Object.assign({},O),{rtlEnabled:A,mergedClsPrefix:n,contentRef:e,mergedBordered:o,handleClick:v,handleCloseClick:z,cssVars:a?void 0:P,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender})},render(){var r,e;const{mergedClsPrefix:o,rtlEnabled:n,color:{borderColor:a}={},onRender:l,$slots:g}=this;return l==null||l(),C("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:n,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:this.round}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},ie(g.avatar,v=>v&&C("div",{class:`${o}-tag__avatar`},v)),C("span",{class:`${o}-tag__content`,ref:"contentRef"},(e=(r=this.$slots).default)===null||e===void 0?void 0:e.call(r)),!this.checkable&&this.closable?C(le,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick}):null,!this.checkable&&this.mergedBordered?C("div",{class:`${o}-tag__border`,style:{borderColor:a}}):null)}});class c{constructor(e){this.key=t.UNKNOWN,this.label=w.toString(this.key),this.key=e,this.label=w.toString(this.key)}}class w{static sortedCityList(){return[new c(t.UNKNOWN),new c(t.AnchorageAKUS),new c(t.BostonMAUS),new c(t.GeorgeTownPGMY),new c(t.HonoluluHIUS),new c(t.KualaLumpurMY),new c(t.LasVegasNVUS),new c(t.LosAngelesCAUS),new c(t.MauiHIUS),new c(t.NewYorkNYUS),new c(t.PageAZUS),new c(t.ParisFR),new c(t.PhoneixAZUS),new c(t.SanFranciscoCAUS),new c(t.SanJoseCAUS),new c(t.SantaCruzCAUS),new c(t.SeattleWAUS),new c(t.WashingtonDCUS)]}static sortedCityOptions(){return this.sortedCityList().map(e=>({label:e.label,value:e.key.toString()}))}static toString(e){var a;const o="Others";return(a={[t.UNKNOWN]:"Others",[t.AnchorageAKUS]:"Anchorage, Alaska, US",[t.BostonMAUS]:"Boston, Massachusetts, US",[t.GeorgeTownPGMY]:"George Town, Penang, MY",[t.HonoluluHIUS]:"Honolulu, Hawaii, US",[t.KualaLumpurMY]:"Kuala Lumpur, MY",[t.LasVegasNVUS]:"Las Vegas, Nevada, US",[t.LosAngelesCAUS]:"Los Angeles, California, US",[t.MauiHIUS]:"Maui, Hawaii, US",[t.NewYorkNYUS]:"New York, New York, US",[t.PageAZUS]:"Page, Arizona, US",[t.ParisFR]:"Paris, FR",[t.PhoneixAZUS]:"Phoenix, Arizona, US",[t.SanFranciscoCAUS]:"San Francisco, California, US",[t.SanJoseCAUS]:"San Jose, California, US",[t.SantaCruzCAUS]:"Santa Cruz, California, US",[t.SeattleWAUS]:"Seattle, Washington, US",[t.WashingtonDCUS]:"Washington, D.C., US"}[e])!=null?a:o}static citiesToString(e){let o="";for(const n of e)o+=n+",";return o}static stringToCityStringArray(e){const o=[],n=e.split(",");for(const a of n)a.length>0&&a!=="0"&&o.push(a.toString());return o}static stringToCities(e){const o=[],n=e.split(",");for(const a of n)a.length>0&&a!=="0"&&o.push(+a);return o}}class pe{constructor(e,o){this.place=new Ue(e),this.travelTime=o===void 0?void 0:new Pe(o)}}class Ue{constructor(e){var o,n,a,l;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.label=(n=e==null?void 0:e.label.valueOf())!=null?n:"",this.URL=(a=e==null?void 0:e.URL.valueOf())!=null?a:"",this.description=(l=e==null?void 0:e.description.valueOf())!=null?l:""}}class Pe{constructor(e){var o,n,a,l,g;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.fromPlaceID=(n=e==null?void 0:e.fromPlaceID.valueOf())!=null?n:-1,this.toPlaceID=(a=e==null?void 0:e.toPlaceID.valueOf())!=null?a:-1,this.toPlaceIndex=(l=e==null?void 0:e.toPlaceIndex.valueOf())!=null?l:-1,this.timeInMinutes=(g=e==null?void 0:e.timeInMinutes.valueOf())!=null?g:0}}class xe{constructor(e){this.propPlaces=[],this.ID=e.ID.valueOf(),this.tripID=e.tripID.valueOf(),this.dayOf=e.dayOf.valueOf(),this.propPlaces=e.places.map((o,n)=>{let a;if(n>0)for(const l of e.travelTime)o.ID===l.toPlaceID&&e.places[n-1].ID===l.fromPlaceID&&(a=l);return new pe(o,a)})}toDay(){const e=new ge;return e.ID=this.ID,e.tripID=this.tripID,e.dayOf=this.dayOf,e.places=this.propPlaces.map(o=>{const n=new be;return n.ID=o.place.ID,n.URL=o.place.URL,n.description=o.place.description,n.label=o.place.label,n}),e.travelTime=this.propPlaces.map(o=>{const n=o.travelTime;if(n===void 0)return;const a=new fe;return a.ID=n.ID,a.fromPlaceID=n.fromPlaceID,a.timeInMinutes=n.timeInMinutes,a.toPlaceID=n.toPlaceID,a.toPlaceIndex=n.toPlaceIndex,a}).filter(o=>!!o),e}}export{w as C,xe as D,Ie as N,pe as P,Pe as a};
