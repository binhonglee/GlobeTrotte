import{C as f}from"./CLink.4660e600.js";import{C as y}from"./CPlaces.146de6de.js";import{C as w,D as g}from"./DataProps.69095fa3.js";import{T as P,G as D,_ as T}from"./index.4937790b.js";import{r,o as a,d as o,e as s,w as n,i as t,C as i,g as $,h as c,F as _,y as u,f as k,D as m,t as I,v as L,j as N,E as U,G as B,H as S}from"./vendor.bef68fa6.js";const H=e=>(I("data-v-27ef4499"),e=e(),L(),e),O={class:"tripTitleName"},V={class:"tripPreviewInfo"},b={key:0},G={class:"cityTags"},j={class:"daysInTrip"},E={class:"tripDayPreview"},F={class:"tripDayLabel"},q=H(()=>t("div",{class:"endOfCardPadding"},null,-1));function z(e,J,K,M,Q,R){const p=r("n-divider"),l=r("CLink"),v=r("n-tag"),C=r("CPlaces"),h=r("n-card");return a(),o("div",{class:m(["trip_preview_card",{wide_preview_card:e.wide}])},[s(h,{hoverable:"","content-style":"padding: 0",class:m({widePreviewCard:e.wide,tripPreviewCard:!e.wide,limitHeight:e.limitHeight})},{default:n(()=>[s(l,{class:"tripLink",url:"/trip/view/"+e.trip.ID,underline:"never",color:"never"},{default:n(()=>[t("h3",O,i(e.trip.details.name.valueOf()),1),s(p),t("div",V,[e.trip.details.description!==""?(a(),o("p",b,i(e.trip.details.description),1)):$("",!0),t("p",null,[s(l,{class:"tripPreviewUserProfileLink",url:"/user/"+e.trip.user.ID,underline:"hover"},{default:n(()=>[c(i(e.trip.user.name),1)]),_:1},8,["url"])]),t("div",G,[(a(!0),o(_,null,u(e.cities,d=>(a(),k(v,{class:"cityTag",type:"info"},{default:n(()=>[c(i(d),1)]),_:2},1024))),256))]),t("p",null,"Last Updated: "+i(e.lastUpdated),1)]),(a(!0),o(_,null,u(e.days,d=>(a(),o("div",j,[s(p),t("div",E,[t("h3",F,"Day "+i(d.dayOf),1),s(C,{propPlaces:d.propPlaces},null,8,["propPlaces"])])]))),256)),q]),_:1},8,["url"])]),_:1},8,["class"])],2)}const A=N({name:"CTripPreviewCard",components:{CLink:f,CPlaces:y,NCard:U,NDivider:B,NTag:S},props:{trip:{type:P,required:!0},wide:{type:Boolean,default:!1},limitHeight:{type:Boolean,default:!0}},data:()=>({cities:[""],days:[],lastUpdated:""}),mounted(){this.$data.cities=this.$props.trip.details.cities.map(e=>w.toString(e)),this.$data.days=this.$props.trip.details.days.slice(0).map(e=>new g(e)),this.$data.lastUpdated=D.getDisplayDate(this.$props.trip.lastUpdated)}});var ee=T(A,[["render",z],["__scopeId","data-v-27ef4499"]]);export{ee as C};