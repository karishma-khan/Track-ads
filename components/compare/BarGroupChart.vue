<template>
  <div>
      <!-- Chart container for the bar chart -->
      <div class="chart-container h-[400px] border-b border-[#000000B2] relative">
          <!-- Background grid with horizontal lines -->
          <div class="absolute h-full w-full flex flex-col justify-between z-[0]">
              <hr class="border-[#0000001A]">
              <hr class="border-[#0000001A]">
              <hr class="border-[#0000001A]">
              <hr class="border-[#0000001A]">
              <hr class="border-[#0000001A]">
          </div>
          
          <!-- Bars for first data set -->
          <div class="bar relative h-full z-[10]">
              <!-- Segments of the bar with heights based on data -->
              <div class="bar-segment top-segment" :style="'height:'+parseInt((firstData?.image/(firstData?.image+secondData?.image))*100)+'%'"></div>
              <div class="bar-segment bottom-segment" :style="'height:'+parseInt((firstData?.video/(firstData?.video+secondData?.video))*100)+'%'"></div>
          </div>
          
          <!-- Bars for second data set -->
          <div class="bar h-full z-[10]">
              <div class="bar-segment top-segment" :style="'height:'+parseInt((secondData?.image/(firstData?.image+secondData?.image))*100)+'%'"></div>
              <div class="bar-segment bottom-segment" :style="'height:'+parseInt((secondData?.video/(firstData?.video+secondData?.video))*100)+'%'"></div>
          </div>
      </div>
      
      <!-- Labels for the bars -->
      <div class="chart-container relative">
          <div class="bar text-center relative h-full z-[10]"> {{ compareItems[0] }} </div>
          <div class="bar text-center h-full z-[10]"> {{ compareItems[1] }} </div>
      </div>
  </div>
</template>

<script>
export default {
  // Component properties
  props: ['chartData', 'compareItems'],
  data() {
      return {
          firstData: {}, // Data for the first bar set
          secondData: {} // Data for the second bar set
      }
  },
  mounted() {
      // Process data when component is mounted
      this.processedData();
  },
  methods: {
      // Method to separate data into first and second datasets
      processedData() {
          this.firstData = this.chartData[0];
          this.secondData = this.chartData[1];
      }
  }
}
</script>

<style scoped>
/* Container for the chart */
.chart-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
}

/* Bar styling */
.bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 113px;
}

/* Individual segments of the bar */
.bar-segment {
  width: 100%;
}

/* Top segment styling */
.top-segment {
  background-color: #1D2713;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

/* Bottom segment styling */
.bottom-segment {
  background-color: #748762;
}
</style>
