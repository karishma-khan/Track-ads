<template>
    <div class="bg-black bggridLogin min-h-[90vh] text-white px-[5%] py-[25px] md:py-[80px]">
        {{ $route.fullPath }}
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ContactPage',
  data(){
    return{
        token:null,
    }
  },
  methods:{
    getQueryParamValue(url) {
        const encodedEquals = '%3D';
        const index = url.indexOf(encodedEquals);
        if (index !== -1) {
            this.token = url.substring(index + encodedEquals.length);
        }
    }
  },
  async mounted(){
    await this.getQueryParamValue(this.$route.fullPath)
    if(this.token)
        this.$store.dispatch('verifyLogin',this.token)
  }
}
</script>