import{d as h,N as k,R as c,r as u,o as l,c as d,e as o,t as b,a as _,w as p,k as s,p as f,b as m,_ as g}from"./index.c74f9166.js";const v=h({components:{NButton:k},data(){return{link:"",broken:!1}},async beforeMount(){var a,i;const t=c.getParamMap();if(t.size===0||!t.has("link")){this.$data.broken=!0;return}if(this.$data.link=decodeURIComponent(((i=(a=t.get("link"))==null?void 0:a.trim())!=null?i:"").split("&dots&").join(".").split(".pct.").join("%")),!this.$data.link.startsWith("https://")){this.$data.broken=!0;return}let e=this.$data.link;e.startsWith("https://")&&(e=e.substring(8)),e.startsWith("globetrotte.com")?await c.genRedirectTo(e.substring(15)):e.startsWith("www.globetrotte.com")&&await c.genRedirectTo(e.substring(19))},methods:{close(){window.close()}}}),n=t=>(f("data-v-45802eb1"),t=t(),m(),t),w={class:"leaving_confirm narrow_content"},C={key:0,class:"nonBrokenLink"},y=n(()=>o("h1",{class:"title"},"You are leaving GlobeTrotte...",-1)),B={class:"content"},$=s("Make sure you want to proceed to"),R=n(()=>o("br",null,null,-1)),T=["href"],I=s("Back to GlobeTrotte"),N=s("Proceed"),S={key:1,class:"brokenLink"},M=n(()=>o("h1",{class:"title"},"Broken link",-1)),W=n(()=>o("p",{class:"content"},"Seems like this link is broken. \u{1F625}",-1)),G=s("Back to GlobeTrotte");function L(t,e,a,i,V,j){const r=u("n-button");return l(),d("div",w,[t.broken?(l(),d("div",S,[M,W,_(r,{onClick:t.close},{default:p(()=>[G]),_:1},8,["onClick"])])):(l(),d("div",C,[y,o("p",B,[$,R,o("a",{class:"externalURL",href:t.link},b(t.link),9,T)]),_(r,{class:"backButton",onClick:t.close},{default:p(()=>[I]),_:1},8,["onClick"]),_(r,{type:"primary",tag:"a",href:t.link},{default:p(()=>[N]),_:1},8,["href"])]))])}const U=g(v,[["render",L],["__scopeId","data-v-45802eb1"]]);export{U as default};