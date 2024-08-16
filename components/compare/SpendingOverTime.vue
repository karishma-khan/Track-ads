<template>
    <div class="bg-[#326284] text-white text-black common-container">
        <div class="flex gap-4">
            <img src="../../static/img/SOTLogo.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <div class="flex items-center">
            <div class="flex gap-2 items-center compareLegends">
                <div class="h-[16px] w-[16px]" :style="{ backgroundColor: '#B1D5EF' }"></div> {{ compareItems[0] }}
            </div>
            <div class="flex gap-2 items-center compareLegends ml-4">
                <div class="h-[16px] w-[16px]" :style="{ backgroundColor: '#0B2E48' }"></div> {{ compareItems[1] }}
            </div>
        </div>
        <div class="mt-6">
            <div v-if="chartData.length > 0" class="chart-container">
                <canvas ref="lineChartCanvasSOT" :key="'sot'+mapidx"></canvas>
            </div>
            <no-data v-else></no-data>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: ['compareItems','chartData'],
  methods: {
    formatDate(dateObj)
        {
          const date = new Date(dateObj);
            const day = date.getDate();
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sepr", "Oct", "Nov", "Dec"];
            const monthIndex = date.getMonth();
            const month = monthNames[monthIndex];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },
    loadChart() {
      const data = this.computeData;
      const ctx = this.$refs.lineChartCanvasSOT.getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Female',
              data: data.femaleData,
              borderColor: '#B1D5EF',
              backgroundColor:'#B1D5EF19',
              pointBackgroundColor: '#B1D5EF',
              fill: true,
              cubicInterpolationMode: 'monotone',
              pointRadius: 0,
              borderWidth: 5,
              // pointHoverRadius: 5
            },
            {
              label: 'Unknown',
              data: data.unKnownData,
              borderColor: '#0B2E48',
              backgroundColor:'#0B2E4899',
              pointBackgroundColor: '#0B2E48',
              fill: true,
              cubicInterpolationMode: 'monotone',
              pointRadius: 0,
              borderWidth: 5,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            x: {
                grid: {
                  display: false,
                },
                ticks: {
                color: 'white'
              }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white'
                },
                title: {
                    display: true,
                    text: '(in million rupees)',
                    color: 'white',
                },
                min: 0,
                max: Math.max(...data.femaleData.concat(data.unKnownData).map(d => d)) + 10
            }
          }
        }
      });
    },
  },
  mounted() {
    if(this.chartData.length > 0)
    this.loadChart();
  },
  beforeDestroy() {
    // Ensure the chart instance is destroyed when the component is destroyed
    if (this.chart) {
      this.chart.destroy();
    }
  },
  updated() {
    this.mapidx++;
    this.$refs.lineChartCanvasSOT?.getContext('2d')?.clearRect(0, 0, this.$refs.lineChartCanvasSOT.width, this.$refs.lineChartCanvasSOT.height); // Clear previous chart
    this.loadChart();
  },
  computed: {
  ...mapGetters({
    dateRange: "get_date",
  }),
    computeData() {
      const data =  this.chartData || [];
      const labels = [];
      const femaleData = [] ;
      const unKnownData = [];
      for(let i = 0; i < data[0]?.data?.length; i++)
      {
          labels.push(this.formatDate(data[0]?.data?.[i]?.date))
          femaleData.push(data[0]?.data?.[i]?.spending)
          unKnownData.push(data[1]?.data?.[i]?.spending)
      }
      return { labels, femaleData, unKnownData };
    }
  },
  data() {
    return {
        mapidx:0,
        chart:null,
        title:'Spending Over Time',
        description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?',
        chartBarData:{},
        ylabel:'(in million rupees)',
      barColors: ['#C5D6B6', '#81C2A7', '#4CB2AC', '#326284', '#162C3B', '#00060B']
    };
  }
};
</script>

<style scoped>
.tooltip{
  border-radius: 16;
  padding:15;
  width: 300px;
}
.tooltip-header{
  font-size: 30px;
}
.chart-container {
  width: 100%;
  height: 510px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>