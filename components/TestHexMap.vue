<template>
  <div class="bg-[#FFFBEF] text-black common-container">
    <div class="flex gap-4">
        <img src="../static/img/webww.svg" alt="">
        <span class="common-heading">
            {{ title }}
        </span>
    </div>
    <p class="mt-3 mb-6 common-description">
        {{ description }}
    </p>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
export default {
  props:['chartData'],
  data(){
    return{
      title:'Active Ads',
      dateRange:[],
      seriesData:[],
      flag:false,
      colorArray:['#C5D6B6','#81C2A7','#4CB2AC','#326284','#162C3B'],
      description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur reiciendis dicta nihil dolores fugit neque dolorum ullam voluptatum impedit architecto.'
    }
  },
  methods: {
    processData() {
      let processedData = this.chartData.map((item, index) => {
        if(!this.flag)
        {
          this.flag = true
          this.dateRange = item.ads.map((ad,idx) => {
          return ad.date
        })
        }
        let count = item.ads.map((ad,idx) => {
          return ad.count
        })
        return {
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 1,
            color:'white'
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
          emphasis: {
            focus: 'series'
          },
          data: count
        }
      });
      this.seriesData =processedData;
    },
  },
  async mounted() {
    await this.processData()
    const echarts = require('echarts');
    const chart = echarts.init(this.$refs.chart);

    const option = {
      tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params);
              var tooltipHtml = '<div style="background-color:black; padding: 10px; border-radius: 5px;">';
              tooltipHtml += '<p style="color:#fff; font-size:12px;">Custom Tooltip</p>';
              tooltipHtml += '<p style="color:#fff; font-size:14px;">X: ' + params.name + ', Y: ' + params.value + '</p>';
              tooltipHtml += '</div>';
              return tooltipHtml;
          }
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.dateRange
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: this.seriesData
    };
    
    chart.setOption(option);
    window.addEventListener('resize', () => {
      chart.resize();
    });
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
