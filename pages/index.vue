<template>
    <div class="bggridHome">
        <div class="bg-white flex flex-col rounded-b-[70px] text-center justify-center" style="text-align: -webkit-center;">
          <loading-semi v-if="Object.keys(indexData).length == 0"></loading-semi>
          <!-- <hero-bubbles v-else></hero-bubbles> -->
          <hero-bounce v-else></hero-bounce>
          <div class="my-10 relative">
            <p class="heroHead">Transparency</p>
            <p class="heroHead">For Democracy</p>
            <p class="mt-[6px] md:mt-[10px] heroUnlock">Unlock the insights on political ad</p>
            <button class="bg-black z-[10] redirectionBtn hover:bg-black text-white mt-[24px] md:mt-[39px] font-[500] text-[16px] py-2 flex items-center px-8 rounded-3xl" @click="$router.push('/overview')">
              Enter <span><img class="ml-[4px] relative top-[2px]" style="height: 22px !important;" src="../static/img/arrowUpRight.svg" alt=""></span>
            </button>
            <div class="w-full flex justify-between absolute bottom-[-16px] px-[10%]">
              <div>
                <img src="../static/img/HomeScroll.svg" alt="">
              </div>
              <div>
                <img src="../static/img/HomeScroll.svg" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="min-h-[50vh] howItWorks flex items-center justify-center text-white">
            How It Works?
        </div>
        <div class="md:px-[15%]">

        <how-it-works></how-it-works>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex'
export default {
  async mounted()
  {
    await this.$store.dispatch("get_advertisers",this.dateRange);
  },
  computed: {
        ...mapGetters({
            indexData: "get_index_data",
            dateRange: "get_date",
        })
    },
}
</script>
<style>
.redirectionBtn{
  font-family: "Eurostile Extd Bold";
}
</style>