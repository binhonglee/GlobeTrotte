var E=Object.defineProperty;var P=(e,s,o)=>s in e?E(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o;var d=(e,s,o)=>(P(e,typeof s!="symbol"?s+"":s,o),o);import{d as v,N as k,g as f,R as m,f as h,aS as C,r as u,o as w,c as _,a as t,h as R,w as l,e as p,p as N,b as S,k as r,_ as V}from"./index.c74f9166.js";import{C as I,E as a}from"./CEditItem.5ac1921b.js";import{C as L}from"./CLink.5b200109.js";import{N as n}from"./NaiveUtils.632d4605.js";import"./Input.a7711bb2.js";class T{constructor(s){d(this,"email","");d(this,"code","");d(this,"password","");s&&(this.email=s.email!==void 0&&s.email!==null?s.email:"",this.code=s.code!==void 0&&s.code!==null?s.code:"",this.password=s.password!==void 0&&s.password!==null?s.password:"")}toJsonKey(s){switch(s){case"email":return"email";case"code":return"code";case"password":return"password";default:return s}}}const $=v({components:{CEditItem:I,CLink:L,NButton:k},data:()=>({email:"",step:0,loginLink:f.Login,loading:!1}),async mounted(){this.$data.step<2?a.get(a.get(this,"email"),"input").focus():a.get(a.get(this,"code"),"input").focus()},async beforeMount(){var s,o;const e=m.getParamMap();this.$data.email=(s=e.get("email"))!=null?s:"",this.$data.step=+((o=e.get("step"))!=null?o:""),n.init()},methods:{async confirmEmail(){await h.genPOST("reset/send_email",C.stringify(a.getVal(this,"email")))?(n.messageSuccess("Password reset code sent!"),await m.genRefreshRedirect(f.password_Reset,new Map(Object.entries({email:a.getVal(this,"email"),step:"2"})))):n.messageError("Account not found with email.")},async confirmReset(){if(a.getVal(this,"password").localeCompare(a.getVal(this,"confPassword"))){n.dialogError({title:"Fail",content:"Password does not match.",positiveText:"OK"}),this.$data.loading=!1;return}const e=new T;e.email=a.getVal(this,"email"),e.code=a.getVal(this,"code"),e.password=a.getVal(this,"password"),await h.genPOST("reset/password",C.stringify(e))?(n.messageSuccess("Password reset is successful."),await m.genRedirectTo(f.Login)):n.messageError("Password reset attempt failed.")},async cancel(){await m.paramToNext()}}}),g=e=>(N("data-v-90ceb23f"),e=e(),S(),e),b={class:"password_reset narrow_content"},B=g(()=>p("h1",{class:"title"},"Reset Password",-1)),K={key:0,class:"resetPasswordStart narrow_display_window"},M=g(()=>p("br",null,null,-1)),O=r("Confirm"),U=r("Cancel"),q={class:"backToLogin"},A=r("Back to Login"),F={key:1,class:"resetPasswordInput narrow_display_window"},H=g(()=>p("br",null,null,-1)),J=r("Confirm"),W=r("Cancel");function z(e,s,o,D,G,Q){const i=u("CEditItem"),c=u("n-button"),y=u("CLink");return w(),_("div",b,[B,e.step<2?(w(),_("form",K,[t(i,{className:"emailInput",label:"Email",ref:"email",val:e.email,onKeydown:R(e.confirmEmail,["enter","native"])},null,8,["val","onKeydown"]),M,t(c,{class:"resetPasswordSave left_col",type:"info",onClick:e.confirmEmail,loading:e.loading},{default:l(()=>[O]),_:1},8,["onClick","loading"]),t(c,{class:"resetPasswordCancel right_col",type:"default",onClick:e.cancel},{default:l(()=>[U]),_:1},8,["onClick"]),p("p",q,[t(y,{url:e.loginLink},{default:l(()=>[A]),_:1},8,["url"])])])):(w(),_("form",F,[t(i,{className:"resetEmail",label:"Email",ref:"email",val:e.email,onEnter:e.confirmReset},null,8,["val","onEnter"]),t(i,{className:"resetCode",label:"Code",ref:"code",onEnter:e.confirmReset},null,8,["onEnter"]),t(i,{className:"resetPassword",label:"Password",ref:"password",type:"password",onEnter:e.confirmReset},null,8,["onEnter"]),t(i,{className:"resetConfPassword",label:"Confirm Password",ref:"confPassword",type:"password",onEnter:e.confirmReset},null,8,["onEnter"]),H,t(c,{class:"resetPasswordSave left_col",type:"info",onClick:e.confirmReset,loading:e.loading},{default:l(()=>[J]),_:1},8,["onClick","loading"]),t(c,{class:"resetPasswordCancel right_col",type:"default",onClick:e.cancel},{default:l(()=>[W]),_:1},8,["onClick"])]))])}const se=V($,[["render",z],["__scopeId","data-v-90ceb23f"]]);export{se as default};