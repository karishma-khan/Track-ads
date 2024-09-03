<template>
  <!-- DatePicker component with range selection -->
  <DatePicker 
    class="w-full"
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
export default {
  components: {
    DatePicker
  },
  data() {
    return {
      dates: null // Holds the selected date range
    }
  },
  methods: {
    // Emits the selected date range to the parent component
    async updateDate() {
      this.$emit('dateSet', this.dates)
    }
  }
}
</script>

<style scoped>
/* Scoped styles for customizing the DatePicker appearance */

/* Adjusts the position and color of the calendar icon */
::v-deep i.mx-icon-calendar {
  left: 8px !important;
  right: unset !important;
  color: black !important;
}

/* Customizes the appearance of the date picker range component */
::v-deep .mx-datepicker.mx-datepicker-range {
  border-radius: 20px !important;
  overflow: hidden !important;
}

/* Customizes the input field of the date picker */
::v-deep input.mx-input {
  padding-left: 32px !important;
  border-radius: 20px !important;
  overflow: hidden;
  color: black !important;
}
</style>
