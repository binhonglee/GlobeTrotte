import{C as N}from"./CLink.d840ae25.js";import{C as b,N as B}from"./CPlaces.18dc33cb.js";import{N as O,D as S}from"./DataProps.640a7f72.js";import{T as H}from"./TripObj.c035d3f9.js";import{d as f,l as h,m as C,G as U,r as i,o as s,c as r,a,w as o,n as c,e as t,t as d,q as V,j as w,F as v,i as m,k as j,p as y,b as g,_ as P}from"./index.a0d4298f.js";const q=f({name:"CTripPreviewCard",components:{CLink:N,CPlaces:b,NCard:h,NDivider:C,NTag:O},props:{trip:{type:H,required:!0},wide:{type:Boolean,default:!1},limitHeight:{type:Boolean,default:!0}},data:()=>({cities:[""],days:[],lastUpdated:""}),mounted(){this.$data.cities=this.$props.trip.details.cities.map(e=>e.display.valueOf()+", "+e.iso2.valueOf()),this.$data.days=this.$props.trip.details.days.slice(0).map(e=>new S(e)),this.$data.lastUpdated=U.getDisplayDate(this.$props.trip.lastUpdated)}}),F=e=>(y("data-v-b9f87632"),e=e(),g(),e),G={class:"tripTitleName"},z={class:"tripPreviewInfo"},E={key:0},A={class:"cityTags"},J={class:"daysInTrip"},K={class:"tripDayPreview"},M={class:"tripDayLabel"},Q=F(()=>t("div",{class:"endOfCardPadding"},null,-1));function R(e,$,T,k,D,I){const n=i("n-divider"),p=i("CLink"),_=i("n-tag"),u=i("CPlaces"),L=i("n-card");return s(),r("div",{class:c(["trip_preview_card",{wide_preview_card:e.wide}])},[a(L,{hoverable:"","content-style":"padding: 0",class:c({widePreviewCard:e.wide,tripPreviewCard:!e.wide,limitHeight:e.limitHeight})},{default:o(()=>[a(p,{class:"tripLink",url:"/trip/view/"+e.trip.ID,underline:"never",color:"never"},{default:o(()=>[t("h3",G,d(e.trip.details.name.valueOf()),1),a(n),t("div",z,[e.trip.details.description!==""?(s(),r("p",E,d(e.trip.details.description),1)):V("",!0),t("p",null,[a(p,{class:"tripPreviewUserProfileLink",url:"/user/"+(e.trip.user.username.valueOf()===""?e.trip.user.ID.toString():e.trip.user.username.toString()),underline:"hover"},{default:o(()=>[w(d(e.trip.user.name),1)]),_:1},8,["url"])]),t("div",A,[(s(!0),r(v,null,m(e.cities,l=>(s(),j(_,{class:"cityTag",type:"info"},{default:o(()=>[w(d(l),1)]),_:2},1024))),256))]),t("p",null,"Last Updated: "+d(e.lastUpdated),1)]),(s(!0),r(v,null,m(e.days,l=>(s(),r("div",J,[a(n),t("div",K,[t("h3",M,"Day "+d(l.dayOf),1),a(u,{propPlaces:l.propPlaces},null,8,["propPlaces"])])]))),256)),Q]),_:1},8,["url"])]),_:1},8,["class"])],2)}const ie=P(q,[["render",R],["__scopeId","data-v-b9f87632"]]),W=f({name:"CLoadingTripPreviewCard",components:{NCard:h,NDivider:C,NSkeleton:B},props:{wide:{type:Boolean,default:!1},limitHeight:{type:Boolean,default:!0}}}),X=e=>(y("data-v-5d7bc893"),e=e(),g(),e),Y=X(()=>t("div",{class:"endOfCardPadding"},null,-1));function Z(e,$,T,k,D,I){const n=i("n-skeleton"),p=i("n-divider"),_=i("n-card");return s(),r("div",{class:c(["loading_trip_preview_card",{wide_preview_card:e.wide}])},[a(_,{"content-style":"padding: 0",class:c({widePreviewCard:e.wide,tripPreviewCard:!e.wide,limitHeight:e.limitHeight})},{default:o(()=>[a(n,{class:"skeletonTitle",height:"30px",width:"60%"}),(s(),r(v,null,m(5,u=>t("div",{class:"tripDayPreview",key:u},[a(p),a(n,{class:"daysInTrip",text:"",repeat:3})])),64)),Y]),_:1},8,["class"])],2)}const re=P(W,[["render",Z],["__scopeId","data-v-5d7bc893"]]);export{ie as C,re as a};