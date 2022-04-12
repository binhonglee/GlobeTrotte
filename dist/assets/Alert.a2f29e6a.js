import{s as f,u as i,b4 as _,v as L,y as S,d as $,A as R,B as b,I as g,ae as B,J as l,K as k,z as H,M as o,b5 as E,b6 as F,at as M,O as N,a6 as O,a4 as j,b7 as V,b8 as W,b9 as K,ba as D,P as J}from"./index.54fcaa4d.js";var q=f("alert",`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
`,[i("icon",{color:"var(--n-icon-color)"}),f("alert-body",{border:"var(--n-border)",padding:"var(--n-padding)"},[i("title",{color:"var(--n-title-text-color)"}),i("content",{color:"var(--n-content-text-color)"})]),_({originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.9)"}}),i("icon",`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),i("close",`
 transition: color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 font-size: var(--n-close-size);
 `),L("show-icon",[f("alert-body",{paddingLeft:"calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))"})]),f("alert-body",`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[i("title",`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[S("& +",[i("content",{marginTop:"9px"})])]),i("content",{transition:"color .3s var(--n-bezier)",fontSize:"var(--n-font-size)"})]),i("icon",{transition:"color .3s var(--n-bezier)"})]);const G=Object.assign(Object.assign({},b.props),{title:{type:String,default:void 0},showIcon:{type:Boolean,default:!0},type:{type:String,default:"default"},closable:{type:Boolean,default:!1},onClose:Function,onAfterLeave:{type:Function,default:void 0},onAfterHide:{type:Function,validator:()=>!0,default:void 0}});var Y=$({name:"Alert",inheritAttrs:!1,props:G,setup(n){const{mergedClsPrefixRef:t,inlineThemeDisabled:c}=R(n),d=b("Alert","-alert",q,F,n,t),u=g(()=>{const{common:{cubicBezierEaseInOut:s},self:e}=d.value,{fontSize:p,borderRadius:C,titleFontWeight:z,lineHeight:y,iconSize:x,iconMargin:h,closeSize:A,closeMargin:I,padding:P}=e,{type:a}=n,{left:w,right:T}=B(h);return{"--n-bezier":s,"--n-color":e[l("color",a)],"--n-close-color":e[l("closeColor",a)],"--n-close-color-hover":e[l("closeColorHover",a)],"--n-close-color-pressed":e[l("closeColorPressed",a)],"--n-icon-color":e[l("iconColor",a)],"--n-border":e[l("border",a)],"--n-title-text-color":e[l("titleTextColor",a)],"--n-content-text-color":e[l("contentTextColor",a)],"--n-line-height":y,"--n-border-radius":C,"--n-font-size":p,"--n-title-font-weight":z,"--n-icon-size":x,"--n-icon-margin":h,"--n-close-size":A,"--n-close-margin":I,"--n-padding":P,"--n-icon-margin-left":w,"--n-icon-margin-right":T}}),r=c?k("alert",g(()=>n.type[0]),u,n):void 0,v=H(!0),m=()=>{const{onAfterLeave:s,onAfterHide:e}=n;s&&s(),e&&e()};return{mergedClsPrefix:t,visible:v,handleCloseClick:()=>{var s;Promise.resolve((s=n.onClose)===null||s===void 0?void 0:s.call(n)).then(e=>{e!==!1&&(v.value=!1)})},handleAfterLeave:()=>{m()},mergedTheme:d,cssVars:c?void 0:u,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender}},render(){var n;return(n=this.onRender)===null||n===void 0||n.call(this),o(E,{onAfterLeave:this.handleAfterLeave},{default:()=>{const{mergedClsPrefix:t,$slots:c}=this,d={class:[`${t}-alert`,this.themeClass,this.showIcon&&`${t}-alert--show-icon`],style:this.cssVars,role:"alert"};return this.visible?o("div",Object.assign({},M(this.$attrs,d)),this.closable&&o(N,{clsPrefix:t,class:`${t}-alert__close`,onClick:this.handleCloseClick}),this.showIcon&&o("div",{class:`${t}-alert__icon`,"aria-hidden":"true"},O(c.icon,()=>[o(j,{clsPrefix:t},{default:()=>{switch(this.type){case"success":return o(D,null);case"info":return o(K,null);case"warning":return o(W,null);case"error":return o(V,null);default:return null}}})])),o("div",{class:`${t}-alert-body`},J(c.header,u=>{const r=u||this.title;return r?o("div",{class:`${t}-alert-body__title`},r):null}),c.default&&o("div",{class:`${t}-alert-body__content`},c))):null}})}});export{Y as N};
