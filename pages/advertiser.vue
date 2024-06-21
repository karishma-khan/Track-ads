<template>
    <div>
        <common-search-filter></common-search-filter>
        <div class="bg-[#FFFBEF] min-h-[88px] flex items-center text-center justify-center advTitle common-container capitalize">
            BHARTIYA JANTA PARTY (BJP)
        </div>
        <pages-funded :chartData="advisersData?.pages_funded"></pages-funded>
        <div class="md:flex">
            <advertiser-overview class="md:w-1/4" :chartData="advisersData?.overview_chart"></advertiser-overview>
            <test-hex-map class="md:w-3/4"></test-hex-map>
            <!-- <Advertisers class="md:w-3/4" /> -->
        </div>

    <spending-over-time :chartData="advisersData?.spending_over_time"></spending-over-time>
    <div class="md:flex">
      <audience class="md:w-3/4" :chartData="advisersData?.audience"></audience>
      <ad-format class="md:w-1/4" :chartData="advisersData?.ad_format"></ad-format>
    </div>
    <word-cloud :chartData="advisersData?.word_cloud" ></word-cloud>
    </div>
    <!-- <div class="text-white p-[10%] bg-white">
      <WordCloud />
    <test-hex-map></test-hex-map>
      HEllo
    </div> -->
  </template>
  
  <script>
  import WordCloud from '@/components/WordCloud';
  import { mapGetters } from 'vuex'
  
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