<template>
    <div ref="chart" class="echarts-chart" style="height: 400px;"></div>
  </template>
  
  <script>
  export default {
    name: 'Chart',
    props: ['chartData'],
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        // Initialize ECharts instance
        const echarts = require('echarts');
        this.chart = echarts.init(this.$refs.chart);
  
        // Define chart options
        const options = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: this.chartData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
  
        // Set chart options
        this.chart.setOption(options);
      }
    },
    beforeDestroy() {
      // Dispose of chart instance when component is destroyed
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .echarts-chart {
    width: 100%;
  }
  </style>
  