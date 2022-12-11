<script setup>
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
console.log("baseURL", baseURL)
const file = baseURL+(route.query.f ? route.query.f : 'c1.pdf')
console.log("FILE", file)
let token = route.query.tk ? route.query.tk : 'MTA2Mjc4NzU4NyUzQUFBRVprcDdTLVFyT1BId1JtblR0YVdmYWVfOUZ3Rnd1M21R'
try {
    let qstr = window.atob(token)
    token = window.decodeURIComponent(qstr)
} catch (e) {
    token = ""
    console.log("Error", e)
}
const tk = token
const page = ref(1)
const wH = ref(200)

const pdfRendered = (() => {console.log("rendered")})

const goExit = (async () => {
    let url = 'https://api.telegram.org/bot1062787587:AAEZkp7S-QrOPHwRmnTtaWfae_9FwFwu3mQ/answerWebAppQuery'
    let sid = 'web_app_query_id=' + qid
    // let sid = 'web_app_query_id=AAEQalw7AAAAABBqXDu4On2u'
    let res = 'result=%7B%22type%22%3A%22article%22%2C%22id%22%3A%22AID%22%2C%22title%22%3A%22Title%22%2C%22input_message_content%22%3A%7B%22message_text%22%3A%22CONTENT%22%7D%7D'
    res = res.replace('CONTENT', 'RESULT')
    let all = '?' + sid + '&' + res
    console.log("URL", url+all)
    let myurl = url + all
    // myurl = "https://api.telegram.org/bot1062787587:AAEZkp7S-QrOPHwRmnTtaWfae_9FwFwu3mQ/answerWebAppQuery?web_app_query_id=AAEQalw7AAAAABBqXDuwFrF8&result=%7B%22type%22%3A%22article%22%2C%22id%22%3A%22test12345%22%2C%22title%22%3A%22Test12345%22%2C%22input_message_content%22%3A%7B%22message_text%22%3A%22TEST%22%7D%7D"
    console.log("myurl", myurl)
    await fetch(myurl)
})

onMounted(() => {
    setTimeout(() => {
        window.Telegram.WebApp.ready()
        window.Telegram.WebApp.expand()
    }, 500)
})
</script>

<template>
    <div>
        SLIDE TEST
        <div>QID = {{qid}}</div>
        <div>FILE = {{file}}</div>
        <div>TK = {{tk}}</div>
        <vue-pdf-embed ref="pdfRef" :source="file" 
                :page="page" :height="wH" @rendered="pdfRendered"/>
        <button @click="goExit">TEST</button>
    </div>
</template>


<style scoped>
</style>