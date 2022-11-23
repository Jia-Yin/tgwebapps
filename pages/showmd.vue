<script setup>
import hljs from 'highlight.js'
import { marked } from 'marked'
import { ref, computed } from 'vue'
import 'highlight.js/styles/github.css';
const route = useRoute()

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