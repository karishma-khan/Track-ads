<template>
  <div>
    <common-search-filter></common-search-filter>
    <div class="text-white" v-if="Object.keys(dashboardData).length == 0">
      <Loader />
    </div>
    <div v-else>
      <div class="block md:flex">
        <overview class="md:w-1/3" :chartData="dashboardData?.overview_chart"></overview>
      <Advertisers class="md:w-2/3" :chartData="dashboardData?.advertiser" />
      </div>
      <spending-over-time :chartData="dashboardData?.spending_over_time" ></spending-over-time>
      <div class="md:flex">
        <audience class="md:w-3/4" :chartData="dashboardData?.audience"></audience>
        <ad-format class="md:w-1/4" :chartData="dashboardData?.ad_format"></ad-format>
      </div>
      <honey-comb></honey-comb>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Advertisers from '../components/Advertisers.vue';
import Loader from '../components/loader.vue';

export default {
  name: 'IndexPage',
  async mounted()
  {
    await this.$store.dispatch("set_dashboard_action");
  },
  computed: {
        ...mapGetters({
            dashboardData: "get_dashboard_data",
        })
    },
}
</script>
