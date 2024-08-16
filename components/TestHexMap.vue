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
    <div class="flex flex-wrap gap-3 md:justify-between">
          <div v-for="(color, index) in colorArray" :key="index" class="flex mb-4 gap-3 items-center legendActive">
            <div class="h-[16px] w-[16px]" :style="{ backgroundColor: color }"></div> &#8377;{{ formatNumber(rangeArray[index].min) }}{{ index == (colorArray.length -1) ? '+'  : ' - &#8377;' + formatNumber(rangeArray[index].max) }}
          </div>
    </div>
    <div v-if="chartData" ref="chart" style="width: 100%; height: 400px;"></div>
    <no-data v-else></no-data>
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
    formatDate(objDate)
        {
            let date = new Date(objDate)
            const day = date.getDate();
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            const monthIndex = date.getMonth();
            const month = monthNames[monthIndex];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },
    processData() {
      let processedData = this.chartData.map((item, index) => {
        if(!this.flag)
        {
          this.flag = true
          this.dateRange = item.ads.map((ad,idx) => {
          return this.formatDate(ad.date)
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
          seriesName:this.rangeArray[index].min + '-' + this.rangeArray[index].max,
          color: index,
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
        trigger: 'axis',
        formatter: (params) => {
          // console.log(params);
          let tooltipHtml = `<div><div style=\"background-color:black; padding: 10px; border-radius: 5px;\"><p style=\"color:#fff; font-size:14px; font-weight: bold;\">${params[0].name}</p>`;
          params.forEach((item) => {
            // console.log(item);
            tooltipHtml += `
              <p style=\"color:#fff; font-size:12px;\"><span style=\"display:inline-block;margin-right:4px;width:10px;height:10px;background-color:${this.colorArray[item.color] ? this.colorArray[item.color] : '#C5D6B6'};\"></span>Ads( &#8377;${this.rangeArray[item.color]?.min ? this.rangeArray[item.color]?.min : 0} -  &#8377;${this.rangeArray[item.color]?.max ? this.rangeArray[item.color]?.max : 99}) : ${item.data}</p>
              <hr>
            `;
          });
          tooltipHtml += '</div></div>';
          return tooltipHtml;
        },
        extraCssText: 'background-color:black; border:1px solid black; border-radius: 4px;padding:0px',
      },
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
.echarts-tooltip {
    background-color: black !important;
    border: 1px solid black;
    border-radius: 4px;
}
/* Add any necessary styles here */
</style>
