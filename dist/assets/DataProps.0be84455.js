import{defineComponent as ee,ref as oe,provide as te,toRef as ne,computed as x,h as C}from"vue";import{e as re,f as v,g as S,h as p,i as U,u as ae,j as m,k as se,l as d,m as ce,n as D,r as ie,o as le,p as de,t as he,q as ue,C as t,D as ge,P as be,s as fe}from"./index.18ba2282.js";var Ce={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},ke=re("tag",`
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
 `),S("round",`
 padding: 0 calc(var(--n-height) / 2);
 border-radius: calc(var(--n-height) / 2);
 `,[v("avatar",`
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
 `,[p("disabled",[U("&:hover","background-color: var(--n-color-checked-hover);"),U("&:active","background-color: var(--n-color-checked-pressed);")])])])]);const ve=Object.assign(Object.assign(Object.assign({},m.props),Ce),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalStopClickPropagation:Boolean,onCheckedChange:{type:Function,validator:()=>!0,default:void 0}}),Se=de("n-tag");var xe=ee({name:"Tag",props:ve,setup(a){const e=oe(null),{mergedBorderedRef:o,mergedClsPrefixRef:n,inlineThemeDisabled:r,mergedRtlRef:i}=ae(a),g=m("Tag","-tag",ke,he,a,n);te(Se,{roundRef:ne(a,"round")});function k(s){if(!a.disabled&&a.checkable){const{checked:l,onCheckedChange:f,onUpdateChecked:h,"onUpdate:checked":u}=a;h&&h(!l),u&&u(!l),f&&f(!l)}}function z(s){if(a.internalStopClickPropagation&&s.stopPropagation(),!a.disabled){const{onClose:l}=a;l&&ue(l,s)}}const O={setTextContent(s){const{value:l}=e;l&&(l.textContent=s)}},A=se("Tag",i,n),P=x(()=>{const{type:s,size:l,color:{color:f,textColor:h}={}}=a,{common:{cubicBezierEaseInOut:u},self:{padding:M,closeMargin:R,closeMarginRtl:N,borderRadius:B,opacityDisabled:L,textColorCheckable:H,textColorHoverCheckable:$,textColorPressedCheckable:F,textColorChecked:Y,colorCheckable:K,colorHoverCheckable:_,colorPressedCheckable:W,colorChecked:j,colorCheckedHover:V,colorCheckedPressed:E,[d("closeSize",l)]:G,[d("fontSize",l)]:Z,[d("height",l)]:y,[d("color",s)]:J,[d("textColor",s)]:q,[d("border",s)]:Q,[d("closeColor",s)]:I,[d("closeColorHover",s)]:T,[d("closeColorPressed",s)]:X}}=g.value;return{"--n-avatar-size-override":`calc(${y} - 8px)`,"--n-bezier":u,"--n-border-radius":B,"--n-border":Q,"--n-close-color":I,"--n-close-color-hover":T,"--n-close-color-pressed":X,"--n-close-color-disabled":I,"--n-close-margin":R,"--n-close-margin-rtl":N,"--n-close-size":G,"--n-color":f||J,"--n-color-checkable":K,"--n-color-checked":j,"--n-color-checked-hover":V,"--n-color-checked-pressed":E,"--n-color-hover-checkable":_,"--n-color-pressed-checkable":W,"--n-font-size":Z,"--n-height":y,"--n-opacity-disabled":L,"--n-padding":M,"--n-text-color":h||q,"--n-text-color-checkable":H,"--n-text-color-checked":Y,"--n-text-color-hover-checkable":$,"--n-text-color-pressed-checkable":F}}),b=r?ce("tag",x(()=>{let s="";const{type:l,size:f,color:{color:h,textColor:u}={}}=a;return s+=l[0],s+=f[0],h&&(s+=`a${D(h)}`),u&&(s+=`b${D(u)}`),s}),P,a):void 0;return Object.assign(Object.assign({},O),{rtlEnabled:A,mergedClsPrefix:n,contentRef:e,mergedBordered:o,handleClick:k,handleCloseClick:z,cssVars:r?void 0:P,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender})},render(){var a,e;const{mergedClsPrefix:o,rtlEnabled:n,color:{borderColor:r}={},onRender:i,$slots:g}=this;return i==null||i(),C("div",{class:[`${o}-tag`,this.themeClass,{[`${o}-tag--rtl`]:n,[`${o}-tag--disabled`]:this.disabled,[`${o}-tag--checkable`]:this.checkable,[`${o}-tag--checked`]:this.checkable&&this.checked,[`${o}-tag--round`]:this.round}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},ie(g.avatar,k=>k&&C("div",{class:`${o}-tag__avatar`},k)),C("span",{class:`${o}-tag__content`,ref:"contentRef"},(e=(a=this.$slots).default)===null||e===void 0?void 0:e.call(a)),!this.checkable&&this.closable?C(le,{clsPrefix:o,class:`${o}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick}):null,!this.checkable&&this.mergedBordered?C("div",{class:`${o}-tag__border`,style:{borderColor:r}}):null)}});class c{constructor(e){this.key=t.UNKNOWN,this.label=w.toString(this.key),this.key=e,this.label=w.toString(this.key)}}class w{static sortedCityList(){return[new c(t.UNKNOWN),new c(t.AnchorageAKUS),new c(t.BostonMAUS),new c(t.GeorgeTownPGMY),new c(t.HonoluluHIUS),new c(t.KualaLumpurMY),new c(t.LasVegasNVUS),new c(t.LosAngelesCAUS),new c(t.MauiHIUS),new c(t.NewYorkNYUS),new c(t.PageAZUS),new c(t.ParisFR),new c(t.PhoneixAZUS),new c(t.SanFranciscoCAUS),new c(t.SanJoseCAUS),new c(t.SantaCruzCAUS),new c(t.SeattleWAUS),new c(t.WashingtonDCUS)]}static sortedCityOptions(){return this.sortedCityList().map(e=>({label:e.label,value:e.key.toString()}))}static toString(e){var r;const o="Others";return(r={[t.UNKNOWN]:"Others",[t.AnchorageAKUS]:"Anchorage, Alaska, US",[t.BostonMAUS]:"Boston, Massachusetts, US",[t.GeorgeTownPGMY]:"George Town, Penang, MY",[t.HonoluluHIUS]:"Honolulu, Hawaii, US",[t.KualaLumpurMY]:"Kuala Lumpur, MY",[t.LasVegasNVUS]:"Las Vegas, Nevada, US",[t.LosAngelesCAUS]:"Los Angeles, California, US",[t.MauiHIUS]:"Maui, Hawaii, US",[t.NewYorkNYUS]:"New York, New York, US",[t.PageAZUS]:"Page, Arizona, US",[t.ParisFR]:"Paris, FR",[t.PhoneixAZUS]:"Phoenix, Arizona, US",[t.SanFranciscoCAUS]:"San Francisco, California, US",[t.SanJoseCAUS]:"San Jose, California, US",[t.SantaCruzCAUS]:"Santa Cruz, California, US",[t.SeattleWAUS]:"Seattle, Washington, US",[t.WashingtonDCUS]:"Washington, D.C., US"}[e])!=null?r:o}static citiesToString(e){let o="";for(const n of e)o+=n+",";return o}static stringToCityStringArray(e){const o=[],n=e.split(",");for(const r of n)r.length>0&&r!=="0"&&o.push(r.toString());return o}static stringToCities(e){const o=[],n=e.split(",");for(const r of n)r.length>0&&r!=="0"&&o.push(+r);return o}}class pe{constructor(e,o){this.place=new Ue(e),this.travelTime=o===void 0?void 0:new Pe(o)}}class Ue{constructor(e){var o,n,r,i;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.label=(n=e==null?void 0:e.label.valueOf())!=null?n:"",this.URL=(r=e==null?void 0:e.URL.valueOf())!=null?r:"",this.description=(i=e==null?void 0:e.description.valueOf())!=null?i:""}}class Pe{constructor(e){var o,n,r,i,g;this.ID=(o=e==null?void 0:e.ID.valueOf())!=null?o:-1,this.fromPlaceID=(n=e==null?void 0:e.fromPlaceID.valueOf())!=null?n:-1,this.toPlaceID=(r=e==null?void 0:e.toPlaceID.valueOf())!=null?r:-1,this.toPlaceIndex=(i=e==null?void 0:e.toPlaceIndex.valueOf())!=null?i:-1,this.timeInMinutes=(g=e==null?void 0:e.timeInMinutes.valueOf())!=null?g:0}}class De{constructor(e){this.propPlaces=[],this.ID=e.ID.valueOf(),this.tripID=e.tripID.valueOf(),this.dayOf=e.dayOf.valueOf(),this.propPlaces=e.places.map((o,n)=>{let r;if(n>0)for(const i of e.travelTime)o.ID===i.toPlaceID&&e.places[n-1].ID===i.fromPlaceID&&(r=i);return new pe(o,r)})}toDay(){const e=new ge;return e.ID=this.ID,e.tripID=this.tripID,e.dayOf=this.dayOf,e.places=this.propPlaces.map(o=>{const n=new be;return n.ID=o.place.ID,n.URL=o.place.URL,n.description=o.place.description,n.label=o.place.label,n}),e.travelTime=this.propPlaces.map(o=>{const n=o.travelTime;if(n===void 0)return;const r=new fe;return r.ID=n.ID,r.fromPlaceID=n.fromPlaceID,r.timeInMinutes=n.timeInMinutes,r.toPlaceID=n.toPlaceID,r.toPlaceIndex=n.toPlaceIndex,r}).filter(o=>!!o),e}}export{w as C,De as D,xe as N,pe as P,Pe as a};
