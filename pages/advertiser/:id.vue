<template>
  <div>
      <!-- Loader displayed when data is being fetched -->
      <div class="text-white" v-if="Object.keys(advisersData).length == 0">
        <Loader />
      </div>
      
      <!-- Main content displayed when data is available -->
      <div v-else>
        <!-- Advertiser Title Section -->
        <div class="bg-[#FFFBEF] min-h-[88px] flex items-center text-center justify-center advTitle common-container uppercase">
            {{ advisersData?.advertiser?.data[0] ? advisersData.advertiser?.data[0].advertiser : '' }}
        </div>
        
        <!-- Pages Funded Chart -->
        <pages-funded :chartData="advisersData?.pages_funded?.data"></pages-funded>
        
        <!-- Overview and Active Ads Section -->
        <div class="md:flex">
            <advertiser-overview class="md:w-1/4" :chartData="advisersData?.overview_chart?.data"></advertiser-overview>
            <stream-graph class="md:w-3/4" :chartData="advisersData?.active_ads?.data"></stream-graph>
        </div>
        
        <!-- Spending Over Time Chart -->
        <spending-over-time :chartData="advisersData?.spending_over_time?.data"></spending-over-time>
        
        <!-- Audience and Ad Format Section -->
        <div class="md:flex">
          <audience class="md:w-3/4" :chartData="advisersData?.audience?.data"></audience>
          <ad-format class="md:w-1/4" :chartData="advisersData?.ad_format?.data"></ad-format>
        </div>
        
        <!-- Word Cloud Chart -->
        <word-cloud :chartData="advisersData?.word_cloud?.data"></word-cloud>
      </div>
  </div>
</template>

<script>
import WordCloud from '@/components/WordCloud';
import { mapGetters } from 'vuex'
import Loader from '../../components/loader.vue';

export default {
name: 'IndexPage',

// Lifecycle hook to fetch data when the component is mounted
async mounted() {
  // Dispatch Vuex action to fetch advertiser data
  await this.$store.dispatch("set_advertisers_action", [
    this.dateRange, 
    this.nation, 
    this.$route.params.id,
    this.$route?.query?.pageId ? this.$route.query.pageId : false
  ]);
},

components: {
  WordCloud,
  Loader
},

computed: {
  ...mapGetters({
    advisersData: "get_adviser_data",
    dateRange: "get_date",
    nation: "get_nation"
  })
}
}
</script>
