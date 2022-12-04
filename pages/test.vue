<template>
    <div>
        <div v-if="wW>wH" class="hmode">
            <div class="rbtns">
                <button class=vbtn @click="page=1">Begin</button>
                <button class=vbtn @click="page=(page>1)?page-1:page">Prev</button>
                <button class=vbtn @click="goNext">Next</button>
                <button class=vbtn @click="goTelegram">Exit</button>
            </div>
        </div>
        <div v-else class="vmode">
            <div class="bbtns">
                <button class=hbtn @click="page=1">Begin</button>
                <button class=hbtn @click="page=(page>1)?page-1:page">Prev</button>
                <button class=hbtn @click="goNext">Next</button>
                <button class=hbtn @click="goTelegram">Exit</button>
            </div>
        </div>
        DEBUG:
        <div v-if="dtest">
            queryID = {{query_id}}<br>
            WebAppInitData = {{dtest.initData}}<br>
            WebAppInitDataUnsafe = {{dtest.initDataUnsafe}}<br>
            WebAppChat = {{dtest.chat}}<br>
        </div>
        <div v-else>
            WebApp = None
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
            src: "https://telegram.org/js/telegram-web-app.js?1"
        }],
      }
    },
    computed: {
        query_id() {
            let lstr = window.location.hash.toString()
            const re = /query_id=(.*)&user/;
            const myArray = lstr.match(re);
            if (myArray) return myArray[1]
            else return "None"
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
            if (true) {
                let tg = window.Telegram
                let webapp = tg.WebApp
                window.Telegram.WebApp.ready();
                window.Telegram.WebApp.expand()
                // window.Telegram.WebApp.BackButton.show()
                const mainButton = window.Telegram.WebApp.MainButton;
                mainButton.show();
                mainButton.setText('回聊天室');
                mainButton.onClick(this.goTelegram);
                this.dtest = window.Telegram.WebApp
                this.done = true
            }
        },
        rotate() {
            window.Telegram.WebApp.expand()
            this.wH = window.innerHeight-100
            this.wW = window.innerWidth-100
            this.$router.go(0)
        },
        pdfRendered() {
            this.pageCount = this.$refs.pdfRef.pageCount
        },
        async goTelegram() {
            let url = 'https://api.telegram.org/bot1062787587:AAEZkp7S-QrOPHwRmnTtaWfae_9FwFwu3mQ/answerWebAppQuery'
            let sid = 'web_app_query_id=' + this.query_id
            // let sid = 'web_app_query_id=AAEQalw7AAAAABBqXDu4On2u'
            let res = 'result=%7B%22type%22%3A%22article%22%2C%22id%22%3A%22AID%22%2C%22title%22%3A%22Title%22%2C%22input_message_content%22%3A%7B%22message_text%22%3A%22CONTENT%22%7D%7D'
            res = res.replace('CONTENT', 'RESULT')
            let all = '?' + sid + '&' + res
            console.log("URL", url+all)
            let myurl = url + all
            // myurl = "https://api.telegram.org/bot1062787587:AAEZkp7S-QrOPHwRmnTtaWfae_9FwFwu3mQ/answerWebAppQuery?web_app_query_id=AAEQalw7AAAAABBqXDuwFrF8&result=%7B%22type%22%3A%22article%22%2C%22id%22%3A%22test12345%22%2C%22title%22%3A%22Test12345%22%2C%22input_message_content%22%3A%7B%22message_text%22%3A%22TEST%22%7D%7D"
            console.log("myurl", myurl)
            await fetch(myurl)
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