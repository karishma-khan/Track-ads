<template>
  <div>
      <!-- Container for the ECharts chart -->
      <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
export default {
  props: ['chartData'],  // Receives chartData as a prop
  data() {
      return {
          chartInstance: null,  // Holds the ECharts instance
          dateFirstRange: [],  // Dates for the x-axis
          firstSeriesData: [], // Data for the series
          flag: false,         // Flag to indicate first processing
          colorArray: ['#C5D6B6', '#81C2A7', '#4CB2AC', '#326284', '#162C3B'],  // Color array for series
          rangeArray: [        // Ranges for the data
              { 'min': 0, 'max': 99 },
              { 'min': 100, 'max': 499 },
              { 'min': 500, 'max': 999 },
              { 'min': 1000, 'max': 4999 },
              { 'min': 5000, 'max': null }
          ],
      };
  },
  methods: {
      // Formats numbers with appropriate suffixes (k, m, b)
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
      // Formats date to "day month year" format
      formatDate(objDate) {
          let date = new Date(objDate);
          const day = date.getDate();
          const monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
          const monthIndex = date.getMonth();
          const month = monthNames[monthIndex];
          const year = date.getFullYear();
          return `${day} ${month} ${year}`;
      },
      // Processes the data for ECharts
      processData(dataObj) {
          this.flag = false;
          let range = null;
          let processedData = dataObj.map((item, index) => {
              if (!this.flag) {
                  this.flag = true;
                  range = item?.ads?.map(ad => this.formatDate(ad?.date));
              }
              let count = item?.ads?.map(ad => ad?.count);
              return {
                  type: 'line',
                  stack: 'Total',
                  smooth: true,
                  lineStyle: {
                      width: 1,
                      color: 'white'
                  },
                  showSymbol: false,
                  label: {
                      show: true,
                      position: 'top'
                  },
                  areaStyle: {
                      opacity: 1,
                      color: this.colorArray[index]
                  },
            seriesName:this.rangeArray[index].min + '-' + this.rangeArray[index].max,
                  color: index,
                  emphasis: {
                      focus: 'series'
                  },
                  data: count
              };
          });
          return [processedData, range];
      },
      // Initializes and sets up the ECharts instance
      setChart() {
          const echarts = require('echarts');  // Import ECharts
          if (this.chartInstance) {
              this.chartInstance.dispose();  // Dispose of existing chart instance if present
          }
          this.chartInstance = echarts.init(this.$refs.chart);  // Initialize new ECharts instance

          const option = {
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '10%',
                  containLabel: true
              },
              xAxis: [
                  {
                      type: 'category',
                      name: 'Ads spending range',
                      nameLocation: 'middle',
                      nameTextStyle: {
                          padding: [10, 0, 0, 0], 
                      },
                      boundaryGap: false,
                      data: this.dateFirstRange
                  }
              ],
              yAxis: [
                  {
                      name: 'Number of Ads',
                      type: 'value'
                  }
              ],
              series: this.firstSeriesData
          };

          this.chartInstance.setOption(option);  // Set chart options
          window.addEventListener('resize', () => { this.chartInstance.resize(); });  // Handle window resize
      }
  },
  watch: {
      // Watcher to reload the chart when `chartData` prop changes
      chartData() {
          this.setChart();
      }
  },
  async mounted() {
      [this.firstSeriesData, this.dateFirstRange] = await this.processData(this.chartData);
      this.setChart();  // Load the chart on component mount
  }
};
</script>

<style scoped>
/* Style for legend text */
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
