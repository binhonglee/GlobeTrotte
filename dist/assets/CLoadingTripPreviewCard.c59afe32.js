import{C as N}from"./CLink.b96becef.js";import{C as B,N as S}from"./CPlaces.46261685.js";import{N as U,C as H,D as O}from"./DataProps.5928c7a8.js";import{r as s,o as i,c as r,a,w as o,e as t,t as d,l as b,i as w,F as v,g as m,h as V,n as c,p as h,b as C,d as f,m as y,q as g,T as q,G as F,_ as P}from"./index.7468df66.js";const G=e=>(h("data-v-27ef4499"),e=e(),C(),e),j={class:"tripTitleName"},z={class:"tripPreviewInfo"},E={key:0},A={class:"cityTags"},J={class:"daysInTrip"},K={class:"tripDayPreview"},M={class:"tripDayLabel"},Q=G(()=>t("div",{class:"endOfCardPadding"},null,-1));function R(e,$,T,k,D,I){const n=s("n-divider"),p=s("CLink"),_=s("n-tag"),u=s("CPlaces"),L=s("n-card");return i(),r("div",{class:c(["trip_preview_card",{wide_preview_card:e.wide}])},[a(L,{hoverable:"","content-style":"padding: 0",class:c({widePreviewCard:e.wide,tripPreviewCard:!e.wide,limitHeight:e.limitHeight})},{default:o(()=>[a(p,{class:"tripLink",url:"/trip/view/"+e.trip.ID,underline:"never",color:"never"},{default:o(()=>[t("h3",j,d(e.trip.details.name.valueOf()),1),a(n),t("div",z,[e.trip.details.description!==""?(i(),r("p",E,d(e.trip.details.description),1)):b("",!0),t("p",null,[a(p,{class:"tripPreviewUserProfileLink",url:"/user/"+e.trip.user.ID,underline:"hover"},{default:o(()=>[w(d(e.trip.user.name),1)]),_:1},8,["url"])]),t("div",A,[(i(!0),r(v,null,m(e.cities,l=>(i(),V(_,{class:"cityTag",type:"info"},{default:o(()=>[w(d(l),1)]),_:2},1024))),256))]),t("p",null,"Last Updated: "+d(e.lastUpdated),1)]),(i(!0),r(v,null,m(e.days,l=>(i(),r("div",J,[a(n),t("div",K,[t("h3",M,"Day "+d(l.dayOf),1),a(u,{propPlaces:l.propPlaces},null,8,["propPlaces"])])]))),256)),Q]),_:1},8,["url"])]),_:1},8,["class"])],2)}const W=f({name:"CTripPreviewCard",components:{CLink:N,CPlaces:B,NCard:y,NDivider:g,NTag:U},props:{trip:{type:q,required:!0},wide:{type:Boolean,default:!1},limitHeight:{type:Boolean,default:!0}},data:()=>({cities:[""],days:[],lastUpdated:""}),mounted(){this.$data.cities=this.$props.trip.details.cities.map(e=>H.toString(e)),this.$data.days=this.$props.trip.details.days.slice(0).map(e=>new O(e)),this.$data.lastUpdated=F.getDisplayDate(this.$props.trip.lastUpdated)}});var se=P(W,[["render",R],["__scopeId","data-v-27ef4499"]]);const X=e=>(h("data-v-8ce49146"),e=e(),C(),e),Y=X(()=>t("div",{class:"endOfCardPadding"},null,-1));function Z(e,$,T,k,D,I){const n=s("n-skeleton"),p=s("n-divider"),_=s("n-card");return i(),r("div",{class:c(["loading_trip_preview_card",{wide_preview_card:e.wide}])},[a(_,{"content-style":"padding: 0",class:c({widePreviewCard:e.wide,tripPreviewCard:!e.wide,limitHeight:e.limitHeight})},{default:o(()=>[a(n,{class:"skeletonTitle",height:"30px",width:"60%"}),(i(),r(v,null,m(5,u=>t("div",{class:"tripDayPreview",key:u},[a(p),a(n,{class:"daysInTrip",text:"",repeat:3})])),64)),Y]),_:1},8,["class"])],2)}const x=f({name:"CLoadingTripPreviewCard",components:{NCard:y,NDivider:g,NSkeleton:S},props:{wide:{type:Boolean,default:!1},limitHeight:{type:Boolean,default:!0}}});var re=P(x,[["render",Z],["__scopeId","data-v-8ce49146"]]);export{se as C,re as a};