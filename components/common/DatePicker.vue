<template>
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
    props:[],
    components: {
        DatePicker
    },
    data() {
        return {
        dates: null
        }
    },
    methods:{
        async updateDate(){
            this.$emit('dateSet',this.dates)
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
}
::v-deep input.mx-input{
  padding-left: 32px !important;
  border-radius: 20px !important;
  overflow: hidden;
  color: black !important;
}
</style>
