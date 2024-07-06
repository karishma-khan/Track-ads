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
          minWidth: 700,
          scrollPositionX: 1
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
        startOnTick: true,
        endOnTick: true,
        min: 0
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
        gridLineWidth: 0,
        min: 0
      },
      plotOptions: {
        scatter: {
          point: {
            events: {
              click: function(data) {
                window.location.href = `/advertiser/${data.point.id}`; 
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
          // tooltip: { 
          //   useHTML:true, 
          //   backgroundColor: 'black', 
          //   borderRadius: 16, 
          //   padding:15,
          //   style: { color:'white', width:'300px', borderRadius: '16px' },
          //   headerFormat: '<div class="tooltip-header text-[15px] mb-2" style="color:#FFFFFF80"> <span class="mdi mdi-account-multiple"></span> Demographics </div>',
          //   pointFormat: '<div  style="color:#FFFFFF90" class="block">On average, <b class="text-white">he% yee</b> audience between the age of <b class="text-white"> okayys </b> were targeted for the ads during <b class="text-white"> 12 March 2022 to 16 March 2022. </b></div>'
          // },
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b></br>  Money_spend: <b> {point.x}</b></br> Total Ads: <b>{point.y}</b></br>',

            // color: '#FFFFFF', // White text color
            backgroundColor: '#000000', // Black background
            // opacity: 1 
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
.tooltip-header{
  font-size: 30px;
}
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