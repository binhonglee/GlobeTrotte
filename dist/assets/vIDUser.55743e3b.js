import{C}from"./CViewUser.3a860fa1.js";import{r as t,o as r,c,a as s,e as _,F as $,g as U,p as I,b as N,d as l,m as y,q as k,_ as m,h as L,t as V,bf as b,G as i,R as n,k as d}from"./index.7468df66.js";import{C as D}from"./CHead.6815b5d8.js";import{a as T}from"./CLoadingTripPreviewCard.c59afe32.js";import{N as R}from"./CPlaces.46261685.js";import"./CShare.bd7282d6.js";import"./NaiveUtils.4ae151f9.js";import"./Input.1981449a.js";import"./TripUtil.cf3da4e6.js";import"./Alert.97d966d1.js";import"./CLink.b96becef.js";import"./DataProps.5928c7a8.js";const x=e=>(I("data-v-3dcf093c"),e=e(),N(),e),B={class:"loading_view_user"},O={class:"narrow_content"},S=x(()=>_("h2",null,"Trips",-1));function F(e,a,f,v,g,h){const o=t("n-skeleton"),p=t("n-divider"),u=t("CLoadingTripPreviewCard");return r(),c("div",B,[s(o,{class:"loading_user_name",height:"40px",width:"100px"}),_("div",O,[s(o,{text:"",repeat:5})]),s(p),S,(r(),c($,null,U(5,w=>s(u,{key:w,wide:!0,"limit-height":!1})),64))])}const H=l({name:"CLoadingViewUser",components:{NCard:y,NDivider:k,NSkeleton:R,CLoadingTripPreviewCard:T}});var P=m(H,[["render",F],["__scopeId","data-v-3dcf093c"]]);const A={class:"get_user"},E={key:1,class:"userinfo"},G={class:"title"},M={class:"profile_info"};function j(e,a,f,v,g,h){const o=t("CHead"),p=t("CLoadingViewUser"),u=t("CViewUser");return r(),c("div",A,[s(o,{title:e.user.details.name.valueOf(),description:e.user.details.bio.valueOf(),type:"profile"},null,8,["title","description"]),e.user.ID===-1?(r(),L(p,{key:0})):(r(),c("div",E,[_("h1",G,V(e.user.details.name),1),_("div",M,[s(u,{user:e.user,showName:!1},null,8,["user"])])]))])}const q=l({components:{CViewUser:C,CHead:D,CLoadingViewUser:P},data:()=>({user:new b}),async beforeMount(){const e=i.paramID();if(e===void 0){await n.genRedirectTo(d.NotFound);return}if(isNaN(Number(e)))this.$data.user=await i.genFromUsername(e);else{const a=await i.genUser(Number(e));this.$data.user=a,a.details.username!==""&&await n.genRedirectTo(d.User+"/"+a.details.username)}if(this.$data.user.ID===-1){await this.$alert("User not found.","Error",{confirmButtonText:"OK"}),await n.genRedirectTo(d.Landing);return}i.getIsCurrentUser(this.$data.user.ID.valueOf())&&await n.genRedirectTo(d.MyAccount),this.$data.user.details.bio=this.$data.user.details.bio.replaceAll("\\\\n",`
`)}});var re=m(q,[["render",j],["__scopeId","data-v-787a5d7e"]]);export{re as default};