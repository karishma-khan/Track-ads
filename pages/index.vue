<template>
  <!-- Main container for the homepage -->
  <div class="bggridHome">
    <!-- White background section with rounded bottom and centered content -->
    <div class="bg-white flex flex-col rounded-b-[70px] text-center justify-center" style="text-align: -webkit-center;">
      <!-- Conditional rendering: Show loading component if indexData is empty, otherwise show hero component -->
      <loading-home v-if="Object.keys(indexData).length == 0"></loading-home>
      <hero-bounce v-else></hero-bounce>
      <!-- Section containing the main heading and button -->
      <div class="my-10 relative">
        <!-- Main heading -->
        <p class="heroHead">Transparency</p>
        <p class="heroHead">For Democracy</p>
        <p class="mt-[6px] md:mt-[10px] heroUnlock">Unlock the insights on political ad</p>
        <!-- Button to navigate to overview page -->
        <button class="bg-black z-[10] redirectionBtn hover:bg-black text-white mt-[24px] md:mt-[39px] font-[500] text-[16px] py-2 flex items-center px-8 rounded-3xl" @click="$router.push('/overview')">
          Enter <span><img class="ml-[4px] relative top-[2px]" style="height: 22px !important;" src="../static/img/arrowUpRight.svg" alt=""></span>
        </button>
        <!-- scroll indication at the bottom of the section -->
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
    <!-- Section describing how the platform works -->
    <div class="min-h-[50vh] howItWorks flex items-center justify-center text-white">
      How It Works?
    </div>
    <!-- Component to explain the working details -->
    <div class="md:px-[15%]">
      <how-it-works></how-it-works>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async mounted() {
    // Dispatches an action to fetch advertisers' data based on the selected date range
    await this.$store.dispatch("get_advertisers", this.dateRange);
  },
  computed: {
    // Mapping Vuex getters to local computed properties
    ...mapGetters({
      indexData: "get_index_data", // Get index data from the Vuex store
      dateRange: "get_date",       // Get date range from the Vuex store
    })
  },
}
</script>
<style scoped>
.redirectionBtn {
  font-family: "Eurostile Extd Bold";
}
</style>