<script setup>
import VuePdfEmbed from "vue-pdf-embed"
import { ref, onMounted } from "vue"
const router = useRouter()
let Script = document.createElement("script")
Script.setAttribute("src", "https://telegram.org/js/telegram-web-app.js")
document.head.insertBefore(Script, document.head.firstChild)
// document.head.appendChild(Script);

onMounted(() => {
    // router.go(0)
    setTimeout(() => {
        console.log("TG", window.Telegram)
    }, 100)
    
})
</script>

<template>
    <div>
        SLIDE TEST
        <div ref="el">GGG</div>
        <div ref="gg">KKK</div>
    </div>
</template>


<style scoped>
</style>