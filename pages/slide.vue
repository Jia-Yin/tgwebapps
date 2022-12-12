<script setup>
// Import and Head
import VuePdfEmbed from "vue-pdf-embed"
import { onMounted, ref } from "vue"
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
// WebApp
let Script = document.createElement("script")
Script.setAttribute("src", "https://telegram.org/js/telegram-web-app.js")
document.head.insertBefore(Script, document.head.firstChild)
// document.head.appendChild(Script);
let lstr = window.location.hash.toString()
const re = /query_id=(.*)&user/;
const myArray = lstr.match(re);
const qid = myArray ? myArray[1] : "AAEQalw7AAAAABBqXDvw2SVX"
const baseURL = config.app.baseURL
const pfile = baseURL+(route.query.f ? route.query.f : 'c1.pdf')
let token = route.query.tk ? route.query.tk : 'MTA2Mjc4NzU4NyUzQUFBRVprcDdTLVFyT1BId1JtblR0YVdmYWVfOUZ3Rnd1M21R'
try {
    let qstr = window.atob(token)
    token = window.decodeURIComponent(qstr)
} catch (e) {
    token = ""
    console.log("Error", e)
}
const tk = token

// Slide
const hmargin = 50
const vmargin = 20
const page = ref(1)
const pages = ref(1)
const pheight = ref(600)
const pwidth = ref(300)
const pdfRef = ref()
const pdone = ref(false)
function pdfRendered() {
    if (!pdone.value) {
        pages.value = pdfRef.value.pageCount
        pdone.value = true
    }
}
function rotate() {
    pwidth.value = window.innerWidth
    pheight.value = window.innerHeight
    if (pwidth.value > pheight.value) {
        window.Telegram.WebApp.MainButton.show()
    } else {
        window.Telegram.WebApp.MainButton.hide()
    }
    router.go(0)
}

const goExit = (async () => {
    let url = 'https://api.telegram.org/bot' + tk + '/answerWebAppQuery' //1062787587:AAEZkp7S-QrOPHwRmnTtaWfae_9FwFwu3mQ/answerWebAppQuery'
    let sid = 'web_app_query_id=' + qid
    let res = 'result=%7B%22type%22%3A%22article%22%2C%22id%22%3A%22AID%22%2C%22title%22%3A%22Title%22%2C%22input_message_content%22%3A%7B%22message_text%22%3A%22CONTENT%22%7D%7D'
    res = res.replace('CONTENT', 'RESULT')
    let all = '?' + sid + '&' + res
    let myurl = url + all
    await fetch(myurl)
})

onMounted(() => {
    pwidth.value = window.innerWidth
    pheight.value = window.innerHeight
    setTimeout(() => {
        window.Telegram.WebApp.ready()
        window.Telegram.WebApp.expand()
        window.Telegram.WebApp.MainButton.show()
        window.Telegram.WebApp.MainButton.setText('返回')
        window.Telegram.WebApp.MainButton.onClick(goExit)
        window.addEventListener("orientationchange", rotate)
    }, 500)
})
</script>

<template>
    <div>
        <div v-if="pwidth > pheight" class="hmode">
            <vue-pdf-embed :source="pfile"
                :page="page" :height="pheight-hmargin"/>
            <div align="center">
                <div class="rbtns">
                    <button class=vbtn @click="page=1">Begin</button>
                    <button class=vbtn @click="page=(page>1)?page-1:page">Prev</button>
                    <button class=vbtn @click="page=(page<pages)?page+1:page">Next</button>
                    <button class=vbtn @click="page=pages">End</button>
                </div>
                <button class=ebtn @click="goExit">Exit</button>
            </div>
        </div>
        <div v-else class="vmode">
            <vue-pdf-embed ref="pdfRef" :source="pfile" :page="page" 
                :width="pwidth-vmargin" @rendered="pdfRendered"/>
            <div class="bbtns">
                <button class=hbtn @click="page=1">Begin</button>
                <button class=hbtn @click="page=(page>1)?page-1:page">Prev</button>
                <button class=hbtn @click="page=(page<pageCount)?page+1:page">Next</button>
                <button class=hbtn @click="goTelegram">Exit</button>
            </div>
            <p align="center">
                <button class=ebtn @click="goExit">Exit</button>
            </p>
        </div>
    </div>
</template>


<style scoped>
.vmode {
    height: 500px;
    margin-left: 0px;
    border: 1px solid green;
}
.hmode {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;    
}
.rbtns {
    width: 100px;
    z-index: 100;
}
.bbtns {
    margin-top: 12px;
    display: flex;
    justify-content: space-around;    
}
.ebtn {
    margin-top: 18px;
    background: blue;
    color: white;
    width: 100px;
}
.hbtn {
    width: 70px;
}
.vbtn {
    margin: 12px auto;
    width: 80px;
}
</style>