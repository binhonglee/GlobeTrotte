var ee=Object.defineProperty;var te=(e,s,t)=>s in e?ee(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var b=(e,s,t)=>(te(e,typeof s!="symbol"?s+"":s,t),t);import{C as se,E as T}from"./CEditItem.5ac1921b.js";import{C as ae}from"./CHead.e9fd289b.js";import{C as ie}from"./CLink.5b200109.js";import{a as W,C as oe}from"./CLoadingTripPreviewCard.cc4eb6e9.js";import{d as R,l as ne,m as M,r as n,o as a,c as r,a as i,e as c,F as N,i as B,p as q,b as J,_ as A,aX as K,N as Y,R as C,g as m,f as g,t as S,q as u,j as y,w as l,k as p,aS as D,G as E}from"./index.c74f9166.js";import{N as re,a as le}from"./CPlaces.6fb33973.js";import{C as de}from"./CShare.4282a0c5.js";import{a as ue}from"./TripUtil.4654fe47.js";import{U}from"./UserObj.f15546c4.js";import{N as f}from"./NaiveUtils.632d4605.js";import{U as ce}from"./TripObj.7f17e106.js";import{C as z,a as X,P as Q,b as Z,F as x,s as pe,p as fe}from"./UserUtil.6b2dcc59.js";import"./Input.a7711bb2.js";import"./DataProps.44ae130e.js";const me=R({name:"CLoadingViewUser",components:{NCard:ne,NDivider:M,NSkeleton:re,CLoadingTripPreviewCard:W}}),he=e=>(q("data-v-0521177c"),e=e(),J(),e),ge={class:"loading_view_user"},_e={class:"narrow_content"},ve=he(()=>c("h2",null,"Trips",-1));function we(e,s,t,o,d,F){const _=n("n-skeleton"),v=n("n-divider"),h=n("CLoadingTripPreviewCard");return a(),r("div",ge,[i(_,{class:"loading_user_name",height:"40px",width:"100px"}),c("div",_e,[i(_,{text:"",repeat:5})]),i(v),ve,(a(),r(N,null,B(5,$=>i(h,{key:$,wide:!0,"limit-height":!1})),64))])}const Ce=A(me,[["render",we],["__scopeId","data-v-0521177c"]]),ye=R({name:"CViewUser",components:{CExternalLink:le,CShare:de,CTripPreviewCard:oe,NAlert:K,NButton:Y,NDivider:M,CLoadingTripPreviewCard:W},props:{user:{type:U,required:!0},showName:{type:Boolean,default:!0},self:{type:Boolean,default:!1},confirmed:{type:Boolean,default:!1}},emits:{logout(){return!0},toggleEdit(){return!0}},data:()=>({trips:[],tripsEmpty:!0,loading:!0,shareURL:""}),async beforeMount(){await this.genPopulateTrips()},async beforeUpdate(){await this.genPopulateTrips()},methods:{async genPopulateTrips(){this.$data.loading=!0,this.$data.trips=this.$props.user.trips,ue(this.$data.trips),this.$data.tripsEmpty=this.$data.trips.length<=0,this.$data.loading=!1},logout(){this.$emit("logout")},toggleEdit(){this.$emit("toggleEdit")},async newTrip(){await C.genRedirectTo(m.trip_New)},onShare(){let e=this.$props.user.details.username.valueOf();e===""&&(e=this.$props.user.details.ID.toString()),this.$data.shareURL=g.getAbsoluteURL(m.User,e)}}}),$e=e=>(q("data-v-47654203"),e=e(),J(),e),ke={class:"view_user"},be={class:"userInfo narrow_content"},Te={key:0},Ee={class:"username left_col"},Ue={key:1,class:"userBio"},Se={class:"externalLink"},Le={key:3,class:"userInfoButtonGroups"},Ie=p("Logout"),Oe=p("Edit"),Pe={key:0,class:"viewUserTrips"},Ne=$e(()=>c("h2",null,"Trips",-1)),Be={key:2,class:"createTripAlertDiv"},De=p("Seems like you have not shared any of your own trips."),Re=p("Create New Trip");function Ae(e,s,t,o,d,F){const _=n("CExternalLink"),v=n("CShare"),h=n("n-button"),$=n("n-divider"),O=n("CLoadingTripPreviewCard"),w=n("CTripPreviewCard"),k=n("n-alert");return a(),r("div",ke,[c("div",be,[e.user.details.username!==""?(a(),r("h3",Te,[c("code",Ee,"@"+S(e.user.details.username),1)])):u("",!0),e.user.details.bio!==""?(a(),r("p",Ue,S(e.user.details.bio),1)):u("",!0),c("div",Se,[e.user.details.link!==""?(a(),y(_,{key:0,underline:"hover",url:e.user.details.link.valueOf()},{default:l(()=>[p(S(e.user.details.link),1)]),_:1},8,["url"])):u("",!0)]),e.self?(a(),y(v,{key:2,shareURL:e.shareURL,onClick:e.onShare},null,8,["shareURL","onClick"])):u("",!0),e.self?(a(),r("div",Le,[i(h,{class:"myAccountLogout left_col",type:"error",onClick:e.logout},{default:l(()=>[Ie]),_:1},8,["onClick"]),i(h,{class:"myAccountEdit right_col",type:"default",ref:"edit",onClick:e.toggleEdit},{default:l(()=>[Oe]),_:1},8,["onClick"])])):u("",!0)]),i($,{class:"viewUserDivider"}),e.loading||e.self||!e.tripsEmpty?(a(),r("div",Pe,[Ne,e.loading?(a(),r(N,{key:0},B(5,P=>i(O,{key:P,wide:!0,"limit-height":!1})),64)):(a(!0),r(N,{key:1},B(e.trips,P=>(a(),y(w,{trip:P,wide:!0,"limit-height":!1},null,8,["trip"]))),256)),e.self&&e.tripsEmpty?(a(),r("div",Be,[i(k,{class:"createTripAlert",type:"default","show-icon":!1},{default:l(()=>[De,e.confirmed?(a(),y(h,{key:0,class:"createTripButton",type:"info",onClick:e.newTrip,size:"large"},{default:l(()=>[Re]),_:1},8,["onClick"])):u("",!0)]),_:1})])):u("",!0)])):u("",!0)])}const Ve=A(ye,[["render",Ae],["__scopeId","data-v-47654203"]]);class L extends Z{static fromJSON(s){return new L(s)}getObjImpl(s){return new U(JSON.parse(s))}}class G extends x{}class V extends z{constructor(){super(...arguments);b(this,"storage",X.USER);b(this,"storeCount",10)}async genFetch(t){const o=await g.genGET("username/"+t),d=new U(o);return Q.isPWA()?o!==""?(this.storeObj(G,L,d.details.username.valueOf(),D.stringify(d,!0)),d):null:d}static genObj(t){return new V().genObjImpl(G,L,t)}}class I extends Z{static fromJSON(s){return new I(s)}getObjImpl(s){return this.obj}}class H extends x{}class j extends z{constructor(){super(...arguments);b(this,"storage",X.USERNAME);b(this,"storeCount",20)}async genFetch(t){const o=await g.genGET("v2/username/"+t);return Q.isPWA()?o!==""?(this.storeObj(H,I,o,t),o):null:o}static genObj(t){return new j().genObjImpl(H,I,t)}}const je=R({components:{CEditItem:se,CHead:ae,CLink:ie,CLoadingViewUser:Ce,CViewUser:Ve,NAlert:K,NButton:Y},data:()=>({user:new U,edit:!1,self:!1,unconfirmedLink:m.unconfirmed_Email,updated:null,loadingBar:E.loadingBar()}),async beforeMount(){await this.init()},methods:{async init(){f.init();const e=E.paramID();if(e===void 0){await C.genRedirectTo(m.NotFound);return}if(isNaN(Number(e))){const s=await V.genObj(e);if(s.completed!==null&&(this.$data.user=s.completed,this.dataProcessing(s.fromStorage)),s.promise!==null){const t=await s.promise;t!==null&&!pe(t,this.$data.user)&&(this.$data.user=t,this.dataProcessing(!1))}}else{const t=(await j.genObj(e)).completed;if(t!==null&&t!=="")return await C.genRedirectTo(m.User+"/"+t),await this.init();{const o=await g.genGET("v2/user/"+e);o!==null&&(this.$data.user=new U(o))}}this.$data.user.ID===-1&&(E.paramID()===E.getCurrentUsername()&&await this.logout(),f.dialogError({title:"User not found",content:"The user you are looking for does not exist.",positiveText:"OK",onPositiveClick:async()=>{await C.genRedirectTo(m.Landing)}}))},dataProcessing(e){this.$data.user.ID!==-1&&(this.$data.self=E.getIsCurrentUser(this.$data.user.ID.valueOf()),e?this.$data.user.details.bio=this.$data.user.details.bio.valueOf():this.$data.user.details.bio=this.$data.user.details.bio.valueOf())},update(){this.$data.updated!==null&&(this.$data.user=this.$data.updated,this.dataProcessing(!1)),this.$data.updated=null},confirmDelete(){f.dialogWarning({title:"Delete account",content:"Are you sure you want to delete this account? All trips owned by this account will also be deleted. THIS PROCESS IS IRREVERSIBLE.",positiveText:"Confirm",negativeText:"Cancel",onPositiveClick:async()=>{await this.deleteAccount()}})},async deleteAccount(){var s,t,o;(s=this.$data.loadingBar)==null||s.start(),await g.genDELETE("v2/user/"+this.$data.user.ID,D.stringify(this.$data.user.details))?(localStorage.clear(),(t=this.$data.loadingBar)==null||t.finish(),f.messageInfo("Your account is now deleted."),await C.genRedirectTo(m.Landing)):((o=this.$data.loadingBar)==null||o.error(),f.messageError("Account deletion attempt failed."))},async save(){var t,o,d;(t=this.$data.loadingBar)==null||t.start();const e=new ce({id:this.$data.user.ID,name:T.getVal(this,"name"),email:T.getVal(this,"email"),bio:fe(T.getVal(this,"bio")),link:T.getVal(this,"link"),username:T.getVal(this,"username"),confirmed:this.$data.user.details.confirmed});await g.genPOST("v2/user/"+this.$data.user.ID,D.stringify(e))!==!1?(this.toggleEdit(),(o=this.$data.loadingBar)==null||o.finish(),f.messageSuccess("Profile updated successfully!"),await this.init()):((d=this.$data.loadingBar)==null||d.error(),f.dialogError({title:"Fail",content:"Save was unsuccessful. Please try again later.",positiveText:"OK"}))},async logout(){await g.genGET("logout"),localStorage.clear(),f.messageSuccess("You are now logged out."),await C.genRedirectTo(m.Landing)},toggleEdit(){this.$data.edit=!this.$data.edit}}}),Fe={class:"get_user"},Ge={key:0,class:"narrow_content accountUnconfirmedAlertBar"},He=p("Please confirm you email address to access the full site."),We={key:1,class:"narrow_content tapToUpdate"},Me=p("Press here to view latest version of this profile."),qe={key:3,class:"userinfo"},Je={class:"title"},Ke={class:"profile_info"},Ye={key:1,class:"narrow_content"},ze={class:"myAccountButtonGroups"},Xe=p("Save"),Qe=p("Cancel"),Ze={class:"myAccountDeletion"},xe=p("Delete Account");function et(e,s,t,o,d,F){const _=n("CHead"),v=n("n-alert"),h=n("CLink"),$=n("CLoadingViewUser"),O=n("CViewUser"),w=n("CEditItem"),k=n("n-button");return a(),r("div",Fe,[i(_,{title:e.user.details.name.valueOf(),description:e.user.details.bio.valueOf(),type:"profile"},null,8,["title","description"]),e.self&&!e.user.details.confirmed?(a(),r("div",Ge,[i(h,{class:"unconfirmedEmailLink",url:e.unconfirmedLink,underline:"never"},{default:l(()=>[i(v,{title:"Unconfirmed",type:"error"},{default:l(()=>[He]),_:1})]),_:1},8,["url"])])):u("",!0),e.updated!==null?(a(),r("div",We,[i(v,{title:"There's an update!",type:"warning",onClick:e.update},{default:l(()=>[Me]),_:1},8,["onClick"])])):u("",!0),e.user.ID===-1?(a(),y($,{key:2})):(a(),r("div",qe,[c("h1",Je,S(e.user.details.name),1),c("div",Ke,[e.edit?(a(),r("div",Ye,[i(w,{label:"Name",ref:"name",val:e.user.details.name.valueOf()},null,8,["val"]),i(w,{label:"Username",ref:"username",val:e.user.details.username.valueOf(),placeholder:"Set a username"},null,8,["val"]),i(w,{label:"Link",ref:"link",val:e.user.details.link.valueOf()},null,8,["val"]),i(w,{label:"Bio",type:"textarea",ref:"bio",val:e.user.details.bio.valueOf(),"row-min-count":3,"val-max-count":1e3},null,8,["val"]),c("div",ze,[i(k,{class:"myAccountSave left_col",type:"info",onClick:e.save},{default:l(()=>[Xe]),_:1},8,["onClick"]),i(k,{class:"myAccountCancel right_col",type:"default",ref:"cancel",onClick:e.toggleEdit},{default:l(()=>[Qe]),_:1},8,["onClick"])]),c("div",Ze,[i(k,{class:"myAccountDelete",type:"error",onClick:e.confirmDelete},{default:l(()=>[xe]),_:1},8,["onClick"])])])):(a(),y(O,{key:0,user:e.user,showName:!1,self:e.self,onLogout:e.logout,onToggleEdit:e.toggleEdit},null,8,["user","self","onLogout","onToggleEdit"]))])]))])}const gt=A(je,[["render",et],["__scopeId","data-v-fb8ebffc"]]);export{gt as default};