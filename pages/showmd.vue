<script setup>
import hljs from 'highlight.js'
import { marked } from 'marked'
import { ref, computed } from 'vue'
import 'highlight.js/styles/github.css';
const route = useRoute()

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

// Marked Options
marked.setOptions({
  highlight: function(code, lang) {
    return hljs.highlight(code, {language:lang, ignoreIllegals: true }).value;
  }
})

let code = route.query.code
console.log(code)
if (!code) code = 'No code to show'
else {
  try {
    code = window.atob(code);
    code = window.decodeURIComponent(code)
  } catch (e) {
    code = 'Parse error'
  }
}

const output = computed(() => marked(code))

</script>

<template>
  <div>
    <div class="output" v-html="output"></div>
  </div>
</template>

<style scoped>
body {
    background: white;
}
.output {
  overflow: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
</style>