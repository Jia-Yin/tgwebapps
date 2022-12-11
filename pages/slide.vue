<script setup>
// Import and Head
import VuePdfEmbed from "vue-pdf-embed"
import { onMounted, ref } from "vue"
const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
let Script = document.createElement("script")
Script.setAttribute("src", "https://telegram.org/js/telegram-web-app.js")
document.head.insertBefore(Script, document.head.firstChild)
// document.head.appendChild(Script);
let lstr = window.location.hash.toString()
const re = /query_id=(.*)&user/;
const myArray = lstr.match(re);
const qid = myArray ? myArray[1] : "AAEQalw7AAAAABBqXDvw2SVX"
const baseURL = config.app.baseURL
const file = baseURL+(route.query.f ? route.query.f : 'c1.pdf')
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
const page = ref(1)
const pages = ref(1)
const height = ref(200)
const width = ref(300)
const pdfRef = ref()
function pdfRendered() {
    pages.value = pdfRef.value.pageCount
    resize()
}
function resize() {
    console.log("pdfRef", pdfRef.value)
    console.log("Dimens", pdfRef.value.getPageDimensions())
    width.value = window.innerWidth
    height.value = window.innerHeight
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
    setTimeout(() => {
        window.Telegram.WebApp.ready()
        window.Telegram.WebApp.expand()
        window.Telegram.WebApp.MainButton.show()
        window.Telegram.WebApp.MainButton.setText('返回')
        window.Telegram.WebApp.MainButton.onClick(goExit)
        window.addEventListener("orientationchange", resize)
        window.addEventListener("resize", resize)
    }, 500)
})
</script>

<template>
    <div>
        <div class="vertical">
            <vue-pdf-embed ref="pdfRef" :source="file" 
                :page="page" :width="width-50" @rendered="pdfRendered"/>
            <button @click="goExit">TEST</button>
        </div>
    </div>
</template>


<style scoped>
.vertical {
    margin: 18px 15px;
}
</style>