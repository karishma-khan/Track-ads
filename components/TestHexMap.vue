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
    <div class="flex justify-between">
          <div v-for="(color, index) in colorArray" :key="index" class="flex gap-3 items-center legendActive">
            <div class="h-[16px] w-[16px]" :style="{ backgroundColor: color }"></div> &#8377;{{ rangeArray[index].min }}{{ index == (colorArray.length -1) ? '+'  : ' - &#8377;'+rangeArray[index].max }}
          </div>
    </div>
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
      rangeArray:[{ 'min' : 0, 'max' : 99 }, { 'min' : 100, 'max' : 499 }, { 'min' : 500, 'max' : 999 }, { 'min' : 1000, 'max' : 4999 }, { 'min' : 5000, 'max' : null }],
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
          name: 'Ads spending range',
          nameLocation: 'middle',
          nameTextStyle: {
            padding: [4, 0, 0, 0], 
          },
          boundaryGap: false,
          data: this.dateRange
        }
      ],
      yAxis: [
        {
          name: 'Number of Ads',
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
.legendActive{
  font-family: "Nunito sans", sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
  line-height: 16px;
  letter-spacing: 0.02em;
}
/* Add any necessary styles here */
</style>
