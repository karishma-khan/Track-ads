<template>
  <div class="highcharts-figure">
    <div v-if="computeData" id="container"></div>
  </div>
</template>

<script>
import { color } from 'echarts';

export default {
  props:['chartData'],
  methods:{
    loadChart()
    {
      const categories = this.labels
      const maleData = this.maleData
      const femaleData = this.femaleData

      Highcharts.chart('container', {
        chart: { type: 'bar', backgroundColor: 'transparent' },
        accessibility: { point: { valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.' } },
        legend: { enabled: false },
        navigation: { buttonOptions: { enabled: false } },
        title: { text: null },
        credits: {
        enabled: false
    },
        xAxis: [
          { categories: categories, reversed: false, labels: { step: 1 }},
          { opposite: true, reversed: false, categories: categories, linkedTo: 0, labels: { step: 1 } }],
        yAxis: { title: { text: null }, labels: { format: '{value}%' } },
        plotOptions: { series: { stacking: 'normal', pointWidth: 57, borderRadius: '12px' } },
        tooltip: { useHTML:true, backgroundColor: 'black', borderRadius: 16, padding:15,
          style: { color:'white', width:'300px', borderRadius: '16px', },
          headerFormat: '<div class="tooltip-header text-[15px] mb-2" style="color:#FFFFFF80"> <span class="mdi mdi-account-multiple"></span> Demographics </div>',
          pointFormat: '<div  style="color:#FFFFFF90" class="block">On average, <b class="text-white">{point.y:.1f}% {series.name}</b> audience between the age of <b class="text-white"> {point.category} </b> were targeted for the ads during <b class="text-white"> 12 March 2022 to 16 March 2022. </b></div>'
        },
        series: [{ name: 'Male', data: maleData.map((value, index) => ({ y: value, color: this.barColors[index] || '#7cb5ec' }))}, {
          name: 'Female', data: femaleData.map((value, index) => ({ y: value, color: this.barColors[index] || '#434348'}))
        }]
      });
    }
  },
  mounted() {
    this.loadChart()
  },
  updated()
  {
    this.loadChart()
  },
  computed:{
    computeData(){
        let data = this.chartData.data
        this.labels = []
        this.femaleData = []
        this.maleData = []
        for( let item in data ){
            if( data[item].gender == 'female' )
            {
              for( let value in data[item].distribution )
              {
                this.labels.push(data[item].distribution[value].age_range)
                this.femaleData.push(data[item].distribution[value].percent * 100)
              }
            }
            else
              if( data[item].gender == 'male' )
              {
                for( let value in data[item].distribution )
                {
                  this.maleData.push(data[item].distribution[value].percent * -100)
                }
              }
        }
        return this.femaleData
    }
  },
  data() {
    return {
      femaleData:[],
      maleData:[],
      labels:[],
      barColors: ['#C5D6B6', '#81C2A7', '#4CB2AC', '#326284', '#162C3B', '#00060B']
    };
  }
}
</script>

<style scoped>
.tooltip-header{
  font-size: 30px;
}

#container {
  height: 510px;
}

.highcharts-figure,
.highcharts-data-table table {
  min-width: 310px;
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}

.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8
}
</style>
