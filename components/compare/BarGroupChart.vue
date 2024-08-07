<template>
    <div>
        <div class="chart-container h-[400px] border-b border-[#000000B2] relative">
            <div class="absolute h-full w-full flex flex-col justify-between z-[0]">
                <hr class="border-[#0000001A]">
                <hr class="border-[#0000001A]">
                <hr class="border-[#0000001A]">
                <hr class="border-[#0000001A]">
                <hr class="border-[#0000001A]">
            </div>
          <div class="bar relative h-full z-[10]">
            <div class="bar-segment top-segment" :style="'height:'+parseInt((firstData?.image/(firstData?.image+secondData?.image))*100)+'%'"></div>
            <div class="bar-segment bottom-segment" :style="'height:'+parseInt((firstData?.video/(firstData?.video+secondData?.video))*100)+'%'"></div>
          </div>
          <div class="bar h-full z-[10]">
            <div class="bar-segment top-segment" :style="'height:'+parseInt((secondData?.image/(firstData?.image+secondData?.image))*100)+'%'"></div>
            <div class="bar-segment bottom-segment" :style="'height:'+parseInt((secondData?.video/(firstData?.video+secondData?.video))*100)+'%'"></div>
          </div>
        </div>
        <div class="chart-container relative">
          <div class="bar text-center relative h-full z-[10]"> {{ compareItems[0] }} </div>
          <div class="bar text-center h-full z-[10]"> {{ compareItems[1] }} </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['chartData','compareItems'],
    data(){
      return{
        firstData :{},
        secondData:{}
      }
    },
    mounted(){
      this.processedData()
    },
    methods: {
      processedData() {
        this.firstData = this.chartData[0]
        this.secondData = this.chartData[1]
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    width: 100%;
  }
  
  .bar {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 113px;
  }
  
  .bar-segment {
    width: 100%;
  }
  
  .top-segment {
    background-color: #1D2713;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  
  .bottom-segment {
    background-color: #748762;
  }
  </style>
  