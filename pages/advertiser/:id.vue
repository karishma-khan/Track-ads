<template>
    <div>
        <div class="text-white" v-if="Object.keys(advisersData).length == 0">
          <Loader />
        </div>
        <div v-else>
          <div class="bg-[#FFFBEF] min-h-[88px] flex items-center text-center justify-center advTitle common-container uppercase">
              {{ advisersData?.advertiser?.data[0] ? advisersData.advertiser?.data[0].advertiser : '' }}
          </div>
          <pages-funded :chartData="advisersData?.pages_funded?.data"></pages-funded>
          <div class="md:flex">
              <advertiser-overview class="md:w-1/4" :chartData="advisersData?.overview_chart?.data"></advertiser-overview>
              <test-hex-map class="md:w-3/4" :chartData="advisersData?.active_ads?.data"></test-hex-map>
          </div>
          <spending-over-time :chartData="advisersData?.spending_over_time?.data"></spending-over-time>
          <div class="md:flex">
            <audience class="md:w-3/4" :chartData="advisersData?.audience?.data"></audience>
            <ad-format class="md:w-1/4" :chartData="advisersData?.ad_format?.data"></ad-format>
          </div>
          <word-cloud :chartData="advisersData?.word_cloud?.data" ></word-cloud>
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
      console.log(this.$route);
      await this.$store.dispatch("set_advertisers_action", [this.dateRange, this.nation, this.$route.params.id,this.$route?.query?.pageId ? this.$route.query.pageId : false]);
    },
    components: {
      WordCloud,
    },
    computed: {
          ...mapGetters({
              advisersData: "get_adviser_data",
            dateRange: "get_date",
            nation:"get_nation"
          })
      },
  }
  </script>
  