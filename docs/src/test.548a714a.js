import{a as w,V as b,o as r,b as a,f as n,j as p,t as d,p as c,k as m}from"./entry.fbe0239a.js";const _={components:{VuePdfEmbed:b},head(){return{script:[{src:"https://telegram.org/js/telegram-web-app.js?1"}]}},computed:{query_id(){let s=window.location.hash.toString();const e=/query_id=(.*)&user/;return s.match(e)[1]}},data(){return{dtest:null,source1:"/tgwebapps/Arduino.pdf",page:1,pageCount:1,wH:window.innerHeight-200,wW:window.innerWidth-200,done:!1}},mounted(){window.addEventListener("orientationchange",this.rotate)},methods:{goNext(){this.page<this.pageCount&&(this.page+=1);{let s=window.Telegram;console.log("TG",s);let e=s.WebApp;window.Telegram.WebApp.ready(),window.Telegram.WebApp.expand(),window.Telegram.WebApp.BackButton.show(),window.Telegram.WebApp.MainButton.show(),console.log("initData",e.initData),this.dtest=window.Telegram.WebApp,this.done=!0}},rotate(){window.Telegram.WebApp.expand(),this.wH=window.innerHeight-100,this.wW=window.innerWidth-100,this.$router.go(0)},pdfRendered(){this.pageCount=this.$refs.pdfRef.pageCount},async goTelegram(){let s="https://api.telegram.org/bot1062787587:AAEZkp7S-QrOPHwRmnTtaWfae_9FwFwu3mQ/answerWebAppQuery",e="web_app_query_id="+this.query_id,l="result=%7B%22type%22%3A%22article%22%2C%22id%22%3A%22AID%22%2C%22title%22%3A%22Title%22%2C%22input_message_content%22%3A%7B%22message_text%22%3A%22CONTENT%22%7D%7D";l=l.replace("CONTENT","RESULT");let u="?"+e+"&"+l;console.log("URL",s+u);let t=s+u;console.log("myurl",t),await fetch(t)}}},g=s=>(c("data-v-ef67792a"),s=s(),m(),s),h={key:0,class:"hmode"},v={class:"rbtns"},y={key:1,class:"vmode"},A={class:"bbtns"},f={key:2},T=g(()=>n("br",null,null,-1)),C=g(()=>n("br",null,null,-1)),W=g(()=>n("br",null,null,-1)),k=g(()=>n("br",null,null,-1)),x={key:3};function N(s,e,l,u,t,i){return r(),a("div",null,[t.wW>t.wH?(r(),a("div",h,[n("div",v,[n("button",{class:"vbtn",onClick:e[0]||(e[0]=o=>t.page=1)},"Begin"),n("button",{class:"vbtn",onClick:e[1]||(e[1]=o=>t.page=t.page>1?t.page-1:t.page)},"Prev"),n("button",{class:"vbtn",onClick:e[2]||(e[2]=(...o)=>i.goNext&&i.goNext(...o))},"Next"),n("button",{class:"vbtn",onClick:e[3]||(e[3]=(...o)=>i.goTelegram&&i.goTelegram(...o))},"Exit")])])):(r(),a("div",y,[n("div",A,[n("button",{class:"hbtn",onClick:e[4]||(e[4]=o=>t.page=1)},"Begin"),n("button",{class:"hbtn",onClick:e[5]||(e[5]=o=>t.page=t.page>1?t.page-1:t.page)},"Prev"),n("button",{class:"hbtn",onClick:e[6]||(e[6]=(...o)=>i.goNext&&i.goNext(...o))},"Next"),n("button",{class:"hbtn",onClick:e[7]||(e[7]=(...o)=>i.goTelegram&&i.goTelegram(...o))},"Exit")])])),p(" DEBUG: "),t.dtest?(r(),a("div",f,[p(" queryID = "+d(i.query_id),1),T,p(" WebAppInitData = "+d(t.dtest.initData),1),C,p(" WebAppInitDataUnsafe = "+d(t.dtest.initDataUnsafe),1),W,p(" WebAppChat = "+d(t.dtest.chat),1),k])):(r(),a("div",x," WebApp = None "))])}const B=w(_,[["render",N],["__scopeId","data-v-ef67792a"]]);export{B as default};
