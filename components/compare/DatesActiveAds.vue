<template>
    <div class="bg-[#FFFBEF] text-black common-container">
      <div class="flex gap-4">
          <img src="../../static/img/webww.svg" alt="">
          <span class="common-heading">
              {{ title }}
          </span>
      </div>
      <p class="mt-3 mb-6 common-description">
          {{ description }}
          <!-- {{ firstSeriesData  }}
          <hr>
          {{ secondSeriesData }} -->
      </p>
      <div class="flex flex-wrap gap-3 md:justify-between">
            <div v-for="(color, index) in colorArray" :key="index" class="flex mb-4 gap-3 items-center legendActive">
              <div class="h-[16px] w-[16px]" :style="{ backgroundColor: color }"></div> &#8377;{{ formatNumber(rangeArray[index].min) }}{{ index == (colorArray.length -1) ? '+'  : ' - &#8377;' + formatNumber(rangeArray[index].max) }}
            </div>
      </div>
      <div class="flex justify-center items-center gap-6 h-[48px] w-full bg-[#0000001A] border-y border-[#00000033]">
        <div @click="isActive = 1" :class="isActive == 2? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center "> <span class="mdi-18px mdi mdi-chevron-left"></span> </div>
        <div class="compareSlider"> {{ isActive == 1 ? compareItems[0] : compareItems[1] }} </div>
        <div @click="isActive = 2" :class="isActive == 1? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center "> <span class="mdi-18px mdi mdi-chevron-right"></span> </div>
      </div>
      <div v-if="chartData" ref="chart" style="width: 100%; height: 400px;"></div>
      <no-data v-else></no-data>
    </div>
  </template>
  
  <script>
  export default {
    props:['chartData','compareItems'],
    data(){
      return{
        title:'Active Ads',
        chartInstance:null,
        dateFirstRange:[],
        dateSecondRange:[],
        secondSeriesData:[],
        firstSeriesData:[],
        flag:false,
        isActive:2,
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
      processData(dataObj) {
        this.flag = false
        let range = null
        let processedData = dataObj.map((item, index) => {
          if(!this.flag)
          {
            this.flag = true
            range = item?.ads?.map((ad,idx) => {
            return this.formatDate(ad?.date)
          })
          }
          let count = item?.ads?.map((ad,idx) => {
            return ad?.count
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
        return [processedData,range];
      },
      setChart()
      {
        const echarts = require('echarts');
        if (this.chartInstance) {
          this.chartInstance.dispose();
        }
        this.chartInstance = echarts.init(this.$refs.chart);
        // const chart = echarts.init(this.$refs.chart);
    
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
              data: this.isActive ? this.dateFirstRange : this.dateSecondRange
            }
          ],
          yAxis: [
            {
              name: 'Number of Ads',
              type: 'value'
            }
          ],
          series: this.isActive ? this.firstSeriesData : this.secondSeriesData
        };
      
        this.chartInstance.setOption(option);
        window.addEventListener('resize', () => { this.chartInstance.resize(); });
      }
    },
    watch:
    {
      isActive()
      {
        this.setChart()
      }
    },
    async mounted() {
      [this.firstSeriesData,this.dateFirstRange] = await this.processData(this.chartData[0]);
      [this.secondSeriesData,this.dateSecondRange] = await this.processData(this.chartData[1])
      this.setChart()
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
  