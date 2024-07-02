// components/DateRangePicker.vue
<template>
          <DatePicker 
            v-model="dates" 
            range 
            format="YYYY-MM-DD"
            :start-date="new Date()" 
          />
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      dates: null // Holds the selected date range
    }
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
  max-width: 194px !important;
}
::v-deep input.mx-input{
  padding-left: 32px !important;
  border-radius: 20px !important;
  overflow: hidden;
  color: black !important;
  max-width: 194px !important;
}
::v-deep .mx-input-wrapper{
  max-width: 194px !important;
}
::v-deep .ml-4.mx-datepicker.mx-datepicker-range{
  max-width: 194px !important;
}
/* Add any custom styles if needed */
</style>
