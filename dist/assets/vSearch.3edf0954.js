var N=Object.defineProperty;var k=(e,t,s)=>t in e?N(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var p=(e,t,s)=>(k(e,typeof t!="symbol"?t+"":t,s),s);import{d as f,o as r,c as n,e as d,s as P,aX as I,N as B,a$ as M,R,f as U,aS as A,r as i,a,h as F,w as l,F as L,i as H,q as K,j as u,k as V,p as z,b as O,_ as Q}from"./index.a0d4298f.js";import{C as W}from"./CHead.6501239b.js";import{C as E,a as J}from"./CLoadingTripPreviewCard.5e4336c4.js";import{a as X,C as _}from"./CityUtil.a9590bd6.js";import{a as b}from"./TripUtil.74a7676d.js";import{T as m}from"./TripObj.c035d3f9.js";import{N as D}from"./Input.63c32693.js";import{N as G}from"./Select.cd4f028b.js";import"./CLink.d840ae25.js";import"./CPlaces.18dc33cb.js";import"./DataProps.640a7f72.js";const Y={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Z=d("path",{d:"M456.69 421.39L362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8z",fill:"currentColor"},null,-1),x=[Z],j=f({name:"Search",render:function(t,s){return r(),n("svg",Y,x)}});class ee{constructor(t){p(this,"cities",[]);p(this,"length",0);p(this,"query","");t&&(this.cities=t.cities!==void 0&&t.cities!==null?P(X,t.cities):[],this.length=t.length!==void 0&&t.length!==null?t.length:0,this.query=t.query!==void 0&&t.query!==null?t.query:"")}toJsonKey(t){switch(t){case"cities":return"cities";case"length":return"length";case"query":return"query";default:return t}}}const te=f({components:{Search:j,NAlert:I,NButton:B,NIcon:M,NInput:D,NSelect:G,CTripPreviewCard:E,CHead:W,CLoadingTripPreviewCard:J},data:()=>({length:0,possibleCities:[],query:"",searching:!1,selectedCities:[],trips:[],init:!1}),async beforeMount(){var s,o,h;this.$data.searching=!0,this.$data.possibleCities=_.sortedCityOptions();const e=R.getParamMap();if(e.size===0){this.$data.init=!0,this.$data.searching=!1;return}const t=+((s=e.get("length"))!=null?s:"");this.$data.length=isNaN(t)?0:t,this.$data.query=(o=e.get("query"))!=null?o:"",this.$data.selectedCities=_.stringToCityStringArray((h=e.get("cities"))!=null?h:""),await this.search(),this.$data.searching=!1},methods:{async search(){if(this.$data.init=!1,this.$data.selectedCities.length<1&&this.$data.query.length<1)return;const e=_.stringToCities(this.$data.selectedCities.join(",")),t=new ee({cities:e,length:this.$data.length,query:this.$data.query});this.$data.searching=!0;const s=await U.genPOST("trip/search",A.stringify(t));if(this.$data.trips=[],s===null){this.$data.searching=!1;return}for(const o of s)new m(o).details.days.length>0&&this.$data.trips.push(new m(o));b(this.$data.trips),this.$data.searching=!1}}}),se=e=>(z("data-v-6ad4228e"),e=e(),O(),e),ie={class:"search_trip"},ae=se(()=>d("h1",{class:"title"},"Search Trip",-1)),re={class:"tripSearchForm"},ne={key:0,class:"tripSearchResultCarousel"},oe={key:1,class:"tripSearching"},ce={key:2,class:"tripSearchInitialMessage"},le={class:"narrow_content"},de={key:3,class:"tripSearchNoResultFound"},he={class:"narrow_content accountUnconfirmedAlertBar"};function pe(e,t,s,o,h,ue){const y=i("CHead"),C=i("n-input"),w=i("n-select"),v=i("n-button"),$=i("CTripPreviewCard"),S=i("CLoadingTripPreviewCard"),T=i("search"),q=i("n-icon"),g=i("n-alert");return r(),n("div",ie,[a(y,{title:"Search Trip",description:"Search for a trip"}),ae,d("form",re,[a(C,{class:"tripSearchQueryInput",placeholder:"weekend",value:e.query,"onUpdate:value":t[0]||(t[0]=c=>e.query=c),onKeyup:F(e.search,["enter","native"])},null,8,["value","onKeyup"]),a(w,{class:"tripSearchCityInput",value:e.selectedCities,"onUpdate:value":t[1]||(t[1]=c=>e.selectedCities=c),options:e.possibleCities,filterable:"",multiple:"",placeholder:"City"},null,8,["value","options"]),a(v,{class:"tripSearchButton",onClick:e.search},{default:l(()=>[u("Find")]),_:1},8,["onClick"])]),e.trips.length>0?(r(),n("div",ne,[(r(!0),n(L,null,H(e.trips,c=>(r(),V($,{trip:c,"limit-height":e.trips.length!==1,wide:e.trips.length===1},null,8,["trip","limit-height","wide"]))),256))])):e.searching?(r(),n("div",oe,[a(S,{"limit-height":!1,wide:!0})])):e.init?(r(),n("div",ce,[d("div",le,[a(g,{title:"Search for a trip!",type:"default"},{icon:l(()=>[a(q,null,{default:l(()=>[a(T)]),_:1})]),default:l(()=>[u('Try searching for "weekend"')]),_:1})])])):!e.searching&&!e.init?(r(),n("div",de,[d("div",he,[a(g,{title:"No results",type:"error"},{default:l(()=>[u("We could not find any trips that matches your search parameters. Please try again.")]),_:1})])])):K("",!0)])}const Ne=Q(te,[["render",pe],["__scopeId","data-v-6ad4228e"]]);export{Ne as default};