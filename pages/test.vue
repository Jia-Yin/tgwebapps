<template>
    <div>
        <div v-if="wW>wH" class="hmode">
            <vue-pdf-embed ref="pdfRef" :source="source1" 
                :page="page" :height="wH" @rendered="pdfRendered"/>
            <div class="rbtns">
                <button class=vbtn @click="page=1">Begin</button>
                <button class=vbtn @click="page=(page>1)?page-1:page">Prev</button>
                <button class=vbtn @click="goNext">Next</button>
                <button class=vbtn @click="goTelegram">Exit</button>
            </div>
        </div>
        <div v-else class="vmode">
            <vue-pdf-embed ref="pdfRef" :source="source1"
                :page="page" :width="wW" @rendered="pdfRendered"/>
            <div class="bbtns">
                <button class=hbtn @click="page=1">Begin</button>
                <button class=hbtn @click="page=(page>1)?page-1:page">Prev</button>
                <button class=hbtn @click="page=(page<pageCount)?page+1:page">Next</button>
                <button class=hbtn @click="goTelegram">Exit</button>
            </div>
        </div>
        initData = {{dtest}}
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
            dtest: null,
            source1: "/tgwebapps/Arduino.pdf",
            page: 1,
            pageCount: 1,
            wH: window.innerHeight-200,
            wW: window.innerWidth-200,
            done: false,
        };
    },
    mounted() {
        window.addEventListener("orientationchange", this.rotate)
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
        goNext() {
            if (this.page<this.pageCount) this.page += 1
            if (!this.done) {
                let tg = window.Telegram
                console.log("TG", tg)
                let webapp = tg.WebApp
                webapp.ready();
                webapp.expand()
                webapp.BackButton.show()
                webapp.MainButton.show()
                console.log("initData", webapp.initData)
                this.dtest = webapp.initData
                this.done = true
            }
        },
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
            console.log("Telegram", window.Telegram)
            // window.Telegram
            // window.Telegram.WebApp.sendData('OK');
            // window.Telegram.WebApp.close();
        },
    }
};
</script>

<style scoped>
.hmode {
    display: flex;
    justify-content: space-around;    
}
.rbtns {
    width: 100px;
    z-index: 100;
}
.bbtns {
    margin-top: 12px;
    display: flex;
    justify-content: space-around;    
}
.hbtn {
    width: 70px;
}
.vbtn {
    margin: 12px auto;
    width: 80px;
}
</style>