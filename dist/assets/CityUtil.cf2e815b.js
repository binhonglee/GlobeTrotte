var U=Object.defineProperty;var c=(o,n,t)=>n in o?U(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t;var S=(o,n,t)=>(c(o,typeof n!="symbol"?n+"":n,t),t);import{C as e}from"./index.a4de7a58.js";class a{constructor(n){S(this,"key",e.UNKNOWN);S(this,"label",r.toString(this.key));this.key=n,this.label=r.toString(this.key)}}class r{static sortedCityList(){return[new a(e.AnchorageAKUS),new a(e.BostonMAUS),new a(e.GeorgeTownPGMY),new a(e.KualaLumpurMY),new a(e.LasVegasNVUS),new a(e.LosAngelesCAUS),new a(e.NewYorkNYUS),new a(e.PageAZUS),new a(e.ParisFR),new a(e.PhoneixAZUS),new a(e.SanFranciscoCAUS),new a(e.SanJoseCAUS),new a(e.SantaCruzCAUS),new a(e.SeattleWAUS),new a(e.WashingtonDCUS)]}static toString(n){var s;const t="unrecognized city";return(s={[e.UNKNOWN]:t,[e.AnchorageAKUS]:"Anchorage, Alaska, US",[e.BostonMAUS]:"Boston, Massachusetts, US",[e.GeorgeTownPGMY]:"George Town, Penang, MY",[e.KualaLumpurMY]:"Kuala Lumpur, MY",[e.LasVegasNVUS]:"Las Vegas, Nevada, US",[e.LosAngelesCAUS]:"Los Angeles, California, US",[e.NewYorkNYUS]:"New York, New York, US",[e.PageAZUS]:"Page, Arizona, US",[e.ParisFR]:"Paris, FR",[e.PhoneixAZUS]:"Phoenix, Arizona, US",[e.SanFranciscoCAUS]:"San Francisco, California, US",[e.SanJoseCAUS]:"San Jose, California, US",[e.SantaCruzCAUS]:"Santa Cruz, California, US",[e.SeattleWAUS]:"Seattle, Washington, US",[e.WashingtonDCUS]:"Washington, D.C., US"}[n])!=null?s:t}static citiesToString(n){let t="";for(const i of n)t+=i+",";return t}static stringToCities(n){const t=[],i=n.split(",");for(const s of i)s.length>0&&s!=="0"&&t.push(+s);return t}}export{r as C};