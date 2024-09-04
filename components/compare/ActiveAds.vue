<template>
  <div class="bg-[#FFFBEF] text-black common-container">
      <!-- Header section with logo and title -->
      <div class="flex gap-4">
          <img src="../../static/img/webww.svg" alt="">
          <span class="common-heading">
              {{ title }}
          </span>
      </div>
      <!-- Description paragraph -->
      <p class="mt-3 mb-6 common-description">
          {{ description }}
      </p>
      <!-- Comparison legends -->
      <div class="flex items-center mb-4">
          <div class="flex gap-2 md:items-center compareLegends">
              <div class="max-h-[16px] min-h-[16px] max-w-[16px] min-w-[16px]" :style="{ backgroundColor: '#4CB2AC' }"></div> {{ compareItems[0] }}
          </div>
          <div class="flex gap-2 md:items-center compareLegends ml-4">
              <div class="max-h-[16px] min-h-[16px] max-w-[16px] min-w-[16px]" :style="{ backgroundColor: '#326284' }"></div> {{ compareItems[1] }}
          </div>
      </div>
      <!-- Chart container -->
      <div class="chart-container">
          <canvas ref="lineChartCanvas" :key="'ads'+mapidx"></canvas>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  // Define component props
  props: ['compareItems', 'chartData'],

  // Lifecycle hook to clean up the chart instance
  beforeDestroy() {
      if (this.chart) {
          this.chart.destroy(); // Destroy chart to avoid memory leaks
      }
  },

  methods: {
      // Format date for chart labels
      formatDate(dateObj) {
          const date = new Date(dateObj);
          const day = date.getDate();
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const monthIndex = date.getMonth();
          const month = monthNames[monthIndex];
          const year = date.getFullYear();
          console.log(dateObj, `${day} ${month}`);
          return `${day} ${month}`;
      },

      // Load and render the chart
      loadChart() {
          const data = this.computeData; // Get computed chart data
          const ctx = this.$refs.lineChartCanvas.getContext('2d'); // Get canvas context
          
          // Destroy previous chart instance if exists
          if (this.chart) {
              this.chart.destroy();
          }

          // Create new chart instance
          this.chart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: data.labels, // X-axis labels
                  datasets: [
                      {
                          label: 'Female',
                          data: data.femaleData, // Data for female category
                          borderColor: '#4CB2AC', // Line color
                          pointBackgroundColor: '#4CB2AC', // Point color
                          fill: false,
                          cubicInterpolationMode: 'monotone',
                          borderWidth: 5,
                      },
                      {
                          label: 'Unknown',
                          data: data.unKnownData, // Data for unknown category
                          borderColor: '#326284', // Line color
                          pointBackgroundColor: '#326284', // Point color
                          fill: false,
                          cubicInterpolationMode: 'monotone',
                          pointRadius: 3,
                          borderWidth: 5,
                          pointHoverRadius: 5,
                      }
                  ]
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                      legend: {
                          display: false // Hide legend
                      },
                      tooltip: {
                          enabled: false, // Disable default tooltip
                          external: this.customTooltip // Use custom tooltip
                      }
                  },
                  scales: {
                      x: {
                          title: {
                              display: true,
                              text: 'Age (in years)' // X-axis title
                          },
                      },
                      y: {
                          title: {
                              display: true,
                              position: 'top',
                              text: 'Audience Demographics (in%)' // Y-axis title
                          },
                          grid: {
                              display: false // Hide grid lines
                          },
                          min: 0, // Set minimum Y-axis value
                          max: Math.max(...data.femaleData.concat(data.unKnownData).map(d => d)) + 10 // Set maximum Y-axis value with buffer
                      }
                  }
              }
          });
      },
  },

  // Lifecycle hook to load chart after component mounts
  mounted() {
      if (this.chartData.length > 0) {
          this.loadChart();
      }
  },

  // Lifecycle hook to update chart when component updates
  updated() {
      this.mapidx++;
      // Clear previous chart drawing
      this.$refs.lineChartCanvas?.getContext('2d')?.clearRect(0, 0, this.$refs.lineChartCanvas.width, this.$refs.lineChartCanvas.height);
      this.loadChart(); // Load updated chart
  },

  computed: {
      ...mapGetters({
          dateRange: "get_date", // Map Vuex getter to computed property
      }),

      // Compute chart data from props
      computeData() {
          const data = this.chartData || [];
          const labels = [];
          const femaleData = [];
          const unKnownData = [];
          for (let i = 0; i < data[0]?.length; i++) {
              labels.push(this.formatDate(data[0]?.[i]?.date));
              femaleData.push(data[0]?.[i]?.count);
              unKnownData.push(data[1]?.[i]?.count);
          }
          return { labels, femaleData, unKnownData };
      }
  },

  data() {
      return {
          title: 'Active Ads', // Default title
          chart: null, // Chart instance
          mapidx: 0, // Key index for chart re-rendering
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur reiciendis dicta nihil dolores fugit neque dolorum ullam voluptatum impedit architecto.', // Default description
          barColors: ['#C5D6B6', '#81C2A7', '#4CB2AC', '#326284', '#162C3B', '#00060B'] // Colors for bars (not used in this chart)
      };
  }
};
</script>

<style scoped>
.tooltip {
  border-radius: 16px;
  padding: 15px;
  width: 300px;
}
.tooltip-header {
  font-size: 30px;
}
.chart-container {
  width: 100%;
  height: 510px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
