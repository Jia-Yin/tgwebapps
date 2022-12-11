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
const tk = route.query.tk ? route.query.tk : 'None'

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