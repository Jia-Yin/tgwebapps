import{a as p,V as a,r as l,o as d,b as g,e as n,f as i}from"./entry.cfe629f7.js";const m={components:{VuePdfEmbed:a},head(){return{script:[{src:"https://telegram.org/js/telegram-web-app.js"}]}},data(){return{source1:"c1.pdf",page:1,done:!1}},updated(){this.done||(console.log("Updated!"),window.Telegram.WebApp.ready(),console.log("initData",window.Telegram.WebApp.initData),this.done=!0)},methods:{goTelegram(){window.Telegram.WebApp.sendData("OK"),window.Telegram.WebApp.close()}}};function u(c,e,b,f,o,r){const s=l("vue-pdf-embed");return d(),g("div",null,[n("button",{onClick:e[0]||(e[0]=t=>o.page-=1)},"Prev"),n("button",{onClick:e[1]||(e[1]=t=>o.page=1)},"Home"),n("button",{onClick:e[2]||(e[2]=t=>o.page+=1)},"Next"),n("button",{onClick:e[3]||(e[3]=(...t)=>r.goTelegram&&r.goTelegram(...t))},"Exit"),i(s,{source:o.source1,page:o.page},null,8,["source","page"])])}const v=p(m,[["render",u]]);export{v as default};
