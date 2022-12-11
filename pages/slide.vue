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
const qid = myArray ? myArray[1] : "None"
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
    </div>
</template>


<style scoped>
</style>