<script setup>
import VuePdfEmbed from "vue-pdf-embed"
import { ref, onMounted, computed } from "vue"
const router = useRouter()
let Script = document.createElement("script")
Script.setAttribute("src", "https://telegram.org/js/telegram-web-app.js")
document.head.insertBefore(Script, document.head.firstChild)
// document.head.appendChild(Script);

let lstr = window.location.hash.toString()
const re = /query_id=(.*)&user/;
const myArray = lstr.match(re);
console.log("MA", myArray)
const qid = myArray ? myArray[1] : "None"

onMounted(() => {
    // router.go(0)
    setTimeout(() => {
        console.log("TG", window.Telegram)
        console.log("QID", qid)
    }, 100)
    
})
</script>

<template>
    <div>
        SLIDE TEST
        <div>{{qid}}</div>
    </div>
</template>


<style scoped>
</style>