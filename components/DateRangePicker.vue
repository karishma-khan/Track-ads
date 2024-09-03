<!-- components/DateRangePicker.vue -->
<template>
  <!-- DatePicker component for selecting a date range -->
  <DatePicker 
    v-model="dates" 
    range 
    format="DD/MM/YY"
    :start-date="new Date()" 
    @input="updateDate"
  />
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { mapGetters } from 'vuex'
export default {
  components: {
    DatePicker
  },
  data() {
    return {
      dates: null
    }
  },
  computed: {
    ...mapGetters({
        dateRange: "get_date",
        nation:"get_nation"
    })
  },
  methods: {
    // Method to handle date range updates
    async updateDate() {
      // Dispatch Vuex action to update date range
      this.$store.dispatch('set_date_range', this.dates);
      
      // Perform different actions based on the current route
      if (this.$route.path == 'overview') {
        // Dispatch action for dashboard with new date range and nation
        await this.$store.dispatch("set_dashboard_action", [this.dateRange, this.nation]);
      } else {
        if (this.$route.name == 'advertiser-:id') {
          // Dispatch action for advertiser with new date range, nation, and route params
          await this.$store.dispatch("set_advertisers_action", [this.dateRange, this.nation, this.$route.params.id, this.$route?.query?.pageId ? this.$route.query.pageId : false]);
        }
      }
    }
  },
  mounted() {
    // Initialize dates with the current date range from Vuex store
    this.dates = this.dateRange;
  }
}
</script>

<style scoped>
::v-deep i.mx-icon-calendar{
  left: 8px !important;
  right: unset !important;
  color: black !important;
}
::v-deep .mx-datepicker.mx-datepicker-range{
  border-radius: 20px !important;
  overflow: hidden !important;
  max-width: 199px !important;
  width: 199px !important;
}
::v-deep input.mx-input{
  padding-left: 32px !important;
  border-radius: 20px !important;
  overflow: hidden;
  color: black !important;
  max-width: 199px !important;
  width: 199px !important;
}
::v-deep .mx-input-wrapper{
  max-width: 199px !important;
  width: 199px !important;
}
::v-deep .mx-datepicker{
  max-width: 199px !important;
  width: 199px !important;
}
.mx-datepicker-range{
  max-width: 199px !important;
  width: 199px !important;
}
::v-deep .mx-datepicker.mx-datepicker-range{
  max-width: 199px !important;
  width: 199px !important;
}
</style>
