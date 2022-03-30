import{m as p,s as r,v as s,i as g,z as c,y as f,ba as u,D as a,bb as b,K as l,aA as v}from"./index.aaf24c90.js";import{f as y}from"./DataProps.8dd5a3be.js";var z=p("icon",`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,[r("color-transition",{transition:"color .3s var(--n-bezier)"}),r("depth",{color:"var(--n-color)"},[s("svg",{opacity:"var(--n-opacity)",transition:"opacity .3s var(--n-bezier)"})]),s("svg",{height:"1em",width:"1em"})]);const C=g({_n_icon__:!0,name:"Icon",inheritAttrs:!1,props:Object.assign(Object.assign({},c.props),{depth:[String,Number],size:[Number,String],color:String,component:Object}),setup(e){const{mergedClsPrefixRef:i}=f(e),o=c("Icon","-icon",z,u,e,i);return{mergedClsPrefix:i,mergedStyle:a(()=>{const{size:n,color:t}=e;return{fontSize:y(n),color:t}}),cssVars:a(()=>{const{depth:n}=e,{common:{cubicBezierEaseInOut:t},self:m}=o.value;if(n!==void 0){const{color:d,[`opacity${n}Depth`]:h}=m;return{"--n-bezier":t,"--n-color":d,"--n-opacity":h}}return{"--n-bezier":t}})}},render(){var e;const{$parent:i,depth:o,mergedClsPrefix:n,component:t}=this;return!((e=i==null?void 0:i.$options)===null||e===void 0)&&e._n_icon__&&b("icon","don't wrap `n-icon` inside `n-icon`"),l("i",v(this.$attrs,{role:"img",class:[`${n}-icon`,{[`${n}-icon--depth`]:o,[`${n}-icon--color-transition`]:o!==void 0}],style:Object.assign(this.cssVars,this.mergedStyle)}),t?l(t):this.$slots)}});export{C as N};
