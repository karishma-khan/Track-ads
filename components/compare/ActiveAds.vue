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
        </p>
        <div class="flex items-center mb-4">
            <div class="flex gap-2 items-center compareLegends">
                <div class="h-[16px] w-[16px]" :style="{ backgroundColor: '#4CB2AC' }"></div> {{ compareItems[0] }}
            </div>
            <div class="flex gap-2 items-center compareLegends ml-4">
                <div class="h-[16px] w-[16px]" :style="{ backgroundColor: '#326284' }"></div> {{ compareItems[1] }}
            </div>
        </div>
      <div class="chart-container">
        <canvas ref="lineChartCanvas" :key="'ads'+mapidx"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    props: ['compareItems','chartData'],
    beforeDestroy() {
      // Ensure the chart instance is destroyed when the component is destroyed
      if (this.chart) {
        this.chart.destroy();
      }
    },
    methods: {
      formatDate(dateObj)
          {
            const date = new Date(dateObj);
              const day = date.getDate();
              const monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
              const monthIndex = date.getMonth();
              const month = monthNames[monthIndex];
              const year = date.getFullYear();
              return `${day} ${month} ${year}`;
          },
      loadChart() {
        const data = this.computeData;
        const ctx = this.$refs.lineChartCanvas.getContext('2d');
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
                borderColor: '#4CB2AC',
                pointBackgroundColor: '#4CB2AC',
                fill: false,
                cubicInterpolationMode: 'monotone',
                // pointRadius: 3,
                borderWidth: 5,
                // pointHoverRadius: 5
              },
              {
                label: 'Unknown',
                data: data.unKnownData,
                borderColor: '#326284',
                pointBackgroundColor: '#326284',
                fill: false,
                cubicInterpolationMode: 'monotone',
                pointRadius: 3,
                borderWidth: 5,
                pointHoverRadius: 5
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
              tooltip: {
                enabled: false,
                external: this.customTooltip
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Age (in years)'
                }
              },
              y: {
                title: {
                  display: true,
                  position:top,
                  text: 'Audience Demographics (in%)'
                },
                grid: {
                  display: false
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
    updated() {
      this.mapidx++;
      this.$refs.lineChartCanvas?.getContext('2d')?.clearRect(0, 0, this.$refs.lineChartCanvas.width, this.$refs.lineChartCanvas.height); // Clear previous chart
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
        for(let i = 0; i < data[0]?.length; i++)
        {
            labels.push(this.formatDate(data[0]?.[i]?.date))
            femaleData.push(data[0]?.[i]?.count)
            unKnownData.push(data[1]?.[i]?.count)
        }
        return { labels, femaleData, unKnownData };
      }
    },
    data() {
      return {
        title:'Active Ads',
        chart:null,
        mapidx:0,
        description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur reiciendis dicta nihil dolores fugit neque dolorum ullam voluptatum impedit architecto.',
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
  