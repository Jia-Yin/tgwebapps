<template>
    <div>
        <div v-if="wW>wH">
            <div class="rbtns">
                <button class=vbtn @click="page=1">Begin</button>
                <button class=vbtn @click="page=(page>1)?page-1:page">Prev</button>
                <button class=vbtn @click="page=(page<pageCount)?page+1:page">Next</button>
                <button class=vbtn @click="goTelegram">Exit</button>
            </div>
            <vue-pdf-embed ref="pdfRef" :source="source1" 
                :page="page" :height="wH" @rendered="pdfRendered"/>
        </div>
        <div v-else>
            <vue-pdf-embed ref="pdfRef" :source="source1"
                :page="page" :width="wW" @rendered="pdfRendered"/>
            <div class="bbtns">
                <button class=hbtn @click="page=1">Begin</button>
                <button class=hbtn @click="page=(page>1)?page-1:page">Prev</button>
                <button class=hbtn @click="page=(page<pageCount)?page+1:page">Next</button>
                <button class=hbtn @click="goTelegram">Exit</button>
            </div>
        </div>
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
            pageCount: 1,
            wH: window.innerHeight-20,
            wW: window.innerWidth-20,
            done: false,
        };
    },
    mounted() {
        window.addEventListener("orientationchange", this.rotate)
        this.$nextTick(() => {
            if (!this.done) {
                window.Telegram.WebApp.ready();
                window.Telegram.WebApp.expand()
                console.log("initData", window.Telegram.WebApp.initData)
            this.done = true
        }
        })
    },
    // updated() {
    //     // this.$nextTick(() => {
    //     if (!this.done) {
    //         window.Telegram.WebApp.ready();
    //         window.Telegram.WebApp.expand()
    //         console.log("initData", window.Telegram.WebApp.initData)
    //         // window.Telegram.WebApp.expand();
    //         this.done = true
    //     }
    //     // })
    // },
    methods: {
        rotate() {
            window.Telegram.WebApp.expand()
            this.wH = window.innerHeight-20
            this.wW = window.innerWidth-20
            this.$router.go(0)
        },
        pdfRendered() {
            this.pageCount = this.$refs.pdfRef.pageCount
        },
        goTelegram() {
            window.Telegram.WebApp.sendData('OK');
            window.Telegram.WebApp.close();
        },
    }
};
</script>

<style scoped>
.rbtns {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 100px;
    z-index: 100;
}
.bbtns {
    margin-top: 12px;
}
.hbtn {
    margin-left: 18px;
    width: 68px;
}
.vbtn {
    margin: 12px auto;
    width: 80px;
}
</style>