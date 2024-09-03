<template>
  <div>
    <!-- Loader displayed when there is no dashboard data -->
    <div class="text-white" v-if="Object.keys(dashboardData).length == 0">
      <Loader />
    </div>
    
    <!-- Main content displayed when dashboard data is available -->
    <div v-else>
      <!-- Container for overview and advertiser components -->
      <div class="block md:flex">
        <!-- Overview component with chart data -->
        <overview class="md:w-1/3" :chartData="dashboardData?.overview_chart?.data"></overview>
        
        <!-- Advertisers component with chart data and meta data -->
        <Advertisers class="md:w-2/3" :chartData="dashboardData?.advertiser?.data" :metaData="dashboardData?.advertiser.meta" />
      </div>
      
      <!-- Spending over time component with chart data -->
      <spending-over-time :chartData="dashboardData?.spending_over_time?.data"></spending-over-time>
      
      <!-- Container for audience and ad format components -->
      <div class="md:flex">
        <!-- Audience component with chart data -->
        <audience class="md:w-3/4" :chartData="dashboardData?.audience?.data"></audience>
        
        <!-- Ad format component with chart data -->
        <ad-format class="md:w-1/4" :chartData="dashboardData?.ad_format?.data"></ad-format>
      </div>
      
      <!-- Honey comb component with chart data -->
      <honey-comb :chartData="dashboardData?.advertiser?.data"></honey-comb>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  async mounted() {
    // Fetches dashboard data when the component is mounted
    await this.$store.dispatch("set_dashboard_action", [this.dateRange, this.nation]);
  },
  computed: {
    // Maps Vuex store getters to component computed properties
    ...mapGetters({
      dashboardData: "get_dashboard_data", // Retrieves dashboard data from Vuex store
      dateRange: "get_date",              // Retrieves date range from Vuex store
      nation: "get_nation"                // Retrieves nation from Vuex store
    })
  },
}
</script>
