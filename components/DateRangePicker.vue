// components/DateRangePicker.vue
<template>
  <DatePicker 
    v-model="dateRange" 
    range 
    format="DD-MM-YYYY"
    :start-date="new Date()" 
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
    })
  },
  mounted()
  {
    let today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const oneMonthAgo = new Date(year, month - 1, day);
    this.dates = [oneMonthAgo, today]
    this.$store.dispatch('set_date_range', this.dates)
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
  max-width: 245px !important;
  width: 245px !important;
}
::v-deep input.mx-input{
  padding-left: 32px !important;
  border-radius: 20px !important;
  overflow: hidden;
  color: black !important;
  max-width: 245px !important;
  width: 245px !important;
}
::v-deep .mx-input-wrapper{
  max-width: 245px !important;
  width: 245px !important;
}
::v-deep .mx-datepicker{
  max-width: 245px !important;
  width: 245px !important;
}
.mx-datepicker-range{
  max-width: 245px !important;
  width: 245px !important;
}
::v-deep .mx-datepicker.mx-datepicker-range{
  max-width: 245px !important;
  width: 245px !important;
}
</style>
