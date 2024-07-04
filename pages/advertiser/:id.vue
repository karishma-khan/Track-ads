<template>
    <div>
        <common-search-filter></common-search-filter>
        <div class="text-white" v-if="Object.keys(advisersData).length == 0">
          <Loader />
        </div>
        <div v-else>
          <div class="bg-[#FFFBEF] min-h-[88px] flex items-center text-center justify-center advTitle common-container uppercase">
              {{ advisersData?.advertiser[0] ? advisersData.advertiser[0].advertiser : '' }}
          </div>
          <pages-funded :chartData="advisersData?.pages_funded"></pages-funded>
          <div class="md:flex">
              <advertiser-overview class="md:w-1/4" :chartData="advisersData?.overview_chart"></advertiser-overview>
              <test-hex-map class="md:w-3/4" :chartData="advisersData?.active_ads"></test-hex-map>
          </div>
          <spending-over-time :chartData="advisersData?.spending_over_time"></spending-over-time>
          <div class="md:flex">
            <audience class="md:w-3/4" :chartData="advisersData?.audience"></audience>
            <ad-format class="md:w-1/4" :chartData="advisersData?.ad_format"></ad-format>
          </div>
          <word-cloud :chartData="advisersData?.word_cloud" ></word-cloud>
        </div>
    </div>
  </template>
  
  <script>
  import WordCloud from '@/components/WordCloud';
  import { mapGetters } from 'vuex'
  import Loader from '../../components/loader.vue';
  export default {
    name: 'IndexPage',
    async mounted()
    {
      await this.$store.dispatch("set_advertisers_action");
    },
    components: {
      WordCloud,
    },
    computed: {
          ...mapGetters({
              advisersData: "get_adviser_data",
          })
      },
  }
  </script>
  