<script setup>
import VuePdfEmbed from "vue-pdf-embed"
import { ref, onMounted, computed } from "vue"
const router = useRouter()
const route = useRoute()
let Script = document.createElement("script")
Script.setAttribute("src", "https://telegram.org/js/telegram-web-app.js")
document.head.insertBefore(Script, document.head.firstChild)
// document.head.appendChild(Script);

let lstr = window.location.hash.toString()
const re = /query_id=(.*)&user/;
const myArray = lstr.match(re);
const qid = myArray ? myArray[1] : "None"
const file = route.query.f ? route.query.f : 'c1.pdf'
let token = route.query.tk ? route.query.tk : 'MTA2Mjc4NzU4NyUzQUFBRVprcDdTLVFyT1BId1JtblR0YVdmYWVfOUZ3Rnd1M21R'
try {
    let qstr = window.atob(token)
    token = window.decodeURIComponent(qstr)
} catch (e) {
    token = ""
    console.log("Error", e)
}
const tk = token

onMounted(() => {
    setTimeout(() => {
        window.Telegram.WebApp.ready()
        window.Telegram.WebApp.expand()
    }, 100)
    
})
</script>

<template>
    <div>
        SLIDE TEST
        <div>QID = {{qid}}</div>
        <div>FILE = {{file}}</div>
        <div>TK = {{tk}}</div>
    </div>
</template>


<style scoped>
</style>