import{r as t,o as g,c as E,a,h as N,l as y,e as n,w as c,p as B,b as L,i as p,_ as $,d as I,N as b,k as P,G as S,R as f,j as T,aW as h,be as V,bc as R}from"./index.5f0fdee2.js";import{C as U,E as s}from"./E.82ea76c2.js";import{C as H}from"./CLink.e8f0f034.js";import{N as m}from"./NaiveUtils.935bf156.js";import{C as G}from"./CHead.7def4d32.js";import{N as W}from"./Alert.eb46a4fb.js";import"./Input.68144e49.js";class A{constructor(o){this.email="",this.password="",o&&(this.email=o.email!==void 0&&o.email!==null?o.email:"",this.password=o.password!==void 0&&o.password!==null?o.password:"")}toJsonKey(o){switch(o){case"email":return"email";case"password":return"password";default:return o}}}const w=e=>(B("data-v-db068dfa"),e=e(),L(),e),M={class:"login narrow_content"},O=w(()=>n("h1",{class:"title"},"Login",-1)),q={class:"narrow_display_window"},x=w(()=>n("br",null,null,-1)),D=p("Confirm"),F=p("Cancel"),J={class:"forgotPassword"},K=p("Forgot Password?");function Y(e,o,r,i,l,d){const C=t("CHead"),k=t("n-alert"),_=t("CEditItem"),u=t("n-button"),v=t("CLink");return g(),E("div",M,[a(C,{title:"Login",description:"Login to your GlobeTrotte account."}),O,e.showError?(g(),N(k,{key:0,class:"tripPrivateAlertBar",title:"Please login to continue.",type:"error"})):y("",!0),n("form",q,[a(_,{class:"loginUsernameItem",label:"Email",ref:"email",className:"loginUsername",onEnter:e.confirm},null,8,["onEnter"]),a(_,{label:"Password",ref:"password",className:"loginPassword",type:"password",onEnter:e.confirm},null,8,["onEnter"]),x,a(u,{class:"loginConfirm left_col",type:"info",onClick:e.confirm,loading:e.loading},{default:c(()=>[D]),_:1},8,["onClick","loading"]),a(u,{class:"loginCancel right_col",type:"default",onClick:e.cancel},{default:c(()=>[F]),_:1},8,["onClick"])]),n("p",J,[a(v,{url:e.resetLink},{default:c(()=>[K]),_:1},8,["url"])])])}const z=I({components:{CEditItem:U,CLink:H,NAlert:W,NButton:b,CHead:G},data(){return{loading:!1,showError:!1,resetLink:P.password_Reset,loadingBar:S.loadingBar()}},beforeMount(){f.hasNext()&&(this.$data.showError=!0),m.init()},mounted(){s.get(s.get(this,"email"),"input").focus()},methods:{async confirm(){var i,l,d;this.$data.loading=!0,(i=this.$data.loadingBar)==null||i.start();const e=new A({email:s.getVal(this,"email"),password:s.getVal(this,"password")}),o=await T.genPOST("login",h.stringify(e)),r=new V(o);if(r.ID===-1){(l=this.$data.loadingBar)==null||l.error(),this.$data.loading=!1,m.messageError("Wrong email or password. Please try again.");return}(d=this.$data.loadingBar)==null||d.finish(),localStorage.setItem("userobj",h.stringify(r)),this.$data.loading=!1,m.messageSuccess("You are now logged in."),await f.paramToNext(new Map,!0)},cancel(){R.back()}}});var te=$(z,[["render",Y],["__scopeId","data-v-db068dfa"]]);export{te as default};