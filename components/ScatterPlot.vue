<template>
<div ref="chartContainer" class="chart-container">
    <div ref="chartWrapper" class="chart-wrapper"></div>
  </div>
</template>

<script>
import { color } from 'echarts';

export default {
  props: ['chartData'],
  data() {
    return {
      randomColors: ['#FBE69F99', '#C5D6B699', '#4CB2AC99', '#32628499', '#13375199'],
      maxAmount:0,
      maxCount:0
    }
  },
  methods: {
    processData() {
      let processedData = this.chartData.map((item, index) => {
        let radius = Math.floor(item.amount / (this.maxAmount / 40)); 

        let colorIndex = Math.floor(item.count / (this.maxCount / 5)); 
        let fillColor = this.randomColors[colorIndex];

        return {
          x: item.amount,
          y: item.count,
          name:item.advertiser,
          id:item.advertiser_ad_id,
          marker: {
            radius: radius,
            fillColor: fillColor,
            fillOpacity: 0.5
          }
        }
      });
      return processedData;
    },
  },
  async mounted() {
    if (typeof Highcharts === 'undefined') {
      console.error('Highcharts is not defined');
      return;
    }

    // Find maximum amount for color scaling
    this.maxCount = Math.max(...this.chartData.map(item => item.count));
    this.maxAmount = Math.max(...this.chartData.map(item => item.amount));

    let reqData = await this.processData();
    Highcharts.chart(this.$refs.chartContainer, {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        panning: {
          enabled: true,
          type: 'xy'
        },
        panKey: 'shift',
        backgroundColor: 'transparent',
        scrollablePlotArea: {
          minWidth: 700, // Set a minimum width to trigger horizontal scrolling
          scrollPositionX: 1 // Start with scrollbar at the right (max)
        }
      },
      credits: {
          enabled: false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        enabled: false,
        text: ''
      },
      xAxis: {
        visible: true,
        title: {
          enabled: true,
          text: 'Money Spent (in millions)'
        },
        lineWidth: 1,
        gridLineWidth: 1,
        tickAmount: 5,
      },
      yAxis: {
        visible: true,
        title: {
          enabled: true,
          text: 'No of Ads'
        },
        labels: {
          enabled: false
        },
        lineWidth: 0,
        gridLineWidth: 0
      },
      plotOptions: {
        scatter: {
          point: {
            events: {
              click: function() {
                console.log('si happening');
                window.location.href = '/advertiser/xyz'; 
              }
            }
          },
          marker: {
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b></br>  Money_spend: <b> {point.x}</b></br> Total Ads: <b>{point.y}</b></br>',
            style:{
              backgroundColor:'black',
              color:'white'
            }
          }
        }
      },
      series: [{
        name: 'Customized Points',
        data: reqData
      }]
    });
  }
}
</script>
<style scoped>
.chart-container {
  overflow-x: auto; /* Enable horizontal scrolling */
  max-width: 100%; /* Ensure the chart can expand */
  position: relative; /* Ensure correct scrolling behavior */
  height: 270px;
}

.chart-wrapper {
  width: 100%; /* Ensure the wrapper takes full width */
}
</style>