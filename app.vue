<template>
    <div>
        <button @click="page -= 1">Prev</button>
        <button @click="page = 1">Home</button>
        <button @click="page += 1">Next</button>
        <button @click="goTelegram">Exit</button>
        <vue-pdf-embed :source="source1" :page="page" />
    </div>
</template>

<script>
import VuePdfEmbed from "vue-pdf-embed";

// OR THE FOLLOWING IMPORT FOR VUE 2
// import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

export default {
    components: {
        VuePdfEmbed,
    },
    head() {
      return {
        script: [{
            src: "https://telegram.org/js/telegram-web-app.js"
        }],
      }
    },
    data() {
        return {
            source1: "c1.pdf",
            page: 1,
            done: false,
        };
    },
    updated() {
        // this.$nextTick(() => {
        if (!this.done) {
            console.log("Updated!")
            window.Telegram.WebApp.ready();
            console.log("initData", window.Telegram.WebApp.initData)
            // window.Telegram.WebApp.expand();
            this.done = true
        }
        // })
    },
    methods: {
        goTelegram() {
            window.Telegram.WebApp.sendData('OK');
            window.Telegram.WebApp.close();
        },
    }
};
</script>
