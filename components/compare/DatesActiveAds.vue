<template>
  <div class="bg-[#FFFBEF] text-black common-container">
      <!-- Header with title and image -->
      <div class="flex gap-4">
          <img src="../../static/img/webww.svg" alt="Icon">
          <span class="common-heading">
              {{ title }}
          </span>
      </div>

      <!-- Description text -->
      <p class="mt-3 mb-6 common-description">
          {{ description }}
      </p>

      <!-- Legend for color ranges -->
      <div class="flex flex-wrap gap-3 md:justify-between">
          <div v-for="(color, index) in colorArray" :key="index" class="flex mb-4 gap-3 items-center legendActive">
              <!-- Color swatch and range text -->
              <div class="max-h-[16px] min-h-[16px] max-w-[16px] min-w-[16px]" :style="{ backgroundColor: color }"></div>
              &#8377;{{ formatNumber(rangeArray[index].min) }}
              {{ index == (colorArray.length - 1) ? '+' : ' - &#8377;' + formatNumber(rangeArray[index].max) }}
          </div>
      </div>

      <!-- Slider control for switching between data sets -->
      <div class="flex justify-center items-center gap-6 h-[48px] w-full bg-[#0000001A] border-y border-[#00000033]">
          <div @click="isActive = 1" :class="isActive == 2 ? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center">
              <span class="mdi-18px mdi mdi-chevron-left"></span>
          </div>
          <div class="compareSlider"> {{ isActive == 1 ? compareItems[0] : compareItems[1] }} </div>
          <div @click="isActive = 2" :class="isActive == 1 ? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center">
              <span class="mdi-18px mdi mdi-chevron-right"></span>
          </div>
      </div>

      <!-- Conditional rendering of charts based on `isActive` state -->
      <compare-stream-graph v-if="isActive == 1 && chartData[0]" :chartData="chartData[0]"></compare-stream-graph>
      <compare-stream-second-graph v-else-if="isActive == 2 && chartData[1]" :chartData="chartData[1]"></compare-stream-second-graph>
      <no-data v-else></no-data>
  </div>
</template>

<script>
export default {
  // Component props
  props: ['chartData', 'compareItems'],
  data() {
      return {
          title: 'Active Ads',
          chartInstance: null,
          dateFirstRange: [],
          dateSecondRange: [],
          secondSeriesData: [],
          firstSeriesData: [],
          flag: false,
          isActive: 2, // Determines which data set is currently active
          colorArray: ['#C5D6B6', '#81C2A7', '#4CB2AC', '#326284', '#162C3B'],
          rangeArray: [
              { 'min': 0, 'max': 99 },
              { 'min': 100, 'max': 499 },
              { 'min': 500, 'max': 999 },
              { 'min': 1000, 'max': 4999 },
              { 'min': 5000, 'max': null }
          ],
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur reiciendis dicta nihil dolores fugit neque dolorum ullam voluptatum impedit architecto.'
      }
  },
  methods: {
      // Formats numbers for display
      formatNumber(value) {
          if (value >= 1e9) {
              return (value / 1e9).toFixed(1) + "b+";
          } else if (value >= 1e6) {
              return (value / 1e6).toFixed(1) + "m+";
          } else if (value >= 1e3) {
              return (value / 1e3).toFixed(1) + "k+";
          } else {
              return new Intl.NumberFormat('en-US').format(value);
          }
      },
      // Formats date into a readable format
      formatDate(objDate) {
          let date = new Date(objDate);
          const day = date.getDate();
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const monthIndex = date.getMonth();
          const month = monthNames[monthIndex];
          const year = date.getFullYear();
          return `${day} ${month}`;
      }
  }
};
</script>

<style scoped>
/* Styling for legend items */
.legendActive {
  font-family: "Nunito sans", sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  line-height: 16px;
  letter-spacing: 0.02em;
}
.echarts-tooltip {
  background-color: black !important;
  border: 1px solid black;
  border-radius: 4px;
}
</style>
