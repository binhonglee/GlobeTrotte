import{ao as r}from"./index.18ba2282.js";function a(t){return t.sort((e,s)=>s.lastUpdated.getTime()-e.lastUpdated.getTime())}function n(t,e){return t.user.bio="",e.user.bio="",r.stringify(t)===r.stringify(e)}export{a,n as s};