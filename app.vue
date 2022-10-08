<template>
  <div>
    <button @click="page+=1">3</button>
    <vue-pdf-embed :source="source1" :page='page'/>    
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed'

// OR THE FOLLOWING IMPORT FOR VUE 2
// import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

export default {
  components: {
    VuePdfEmbed,
  },
  data() {
    return {
      source1: 'c1.pdf',
      page: 1,
    }
  }
}
</script>
