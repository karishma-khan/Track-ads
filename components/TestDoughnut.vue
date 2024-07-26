<template>
    <div class="chart-container relative">
      <canvas id="myDoughnutChart"></canvas>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="adFormatSpent">Money Spent</div>
        <div class="adFormatAmt pt-2"> &#8377; {{ formatNumber((amtSpend).toFixed(1)) }} </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      chartInstance: null ,
      amtSpend:0
    };
  },
    mounted() {
      this.renderChart();
    },
    watch:{
      chartData()
      {
        this.renderChart()
      }
    },
    props:['chartData'],
    methods: {
      formatNumber(value) {
        return new Intl.NumberFormat('en-US').format(value);
      },
      getData()
      {
        let res = []
        for(let item in this.chartData){
          this.amtSpend += this.chartData[item].amount
          res.push(this.chartData[item]?.percent)
        }
        return res;
      },
      renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
        const ctx = document.getElementById('myDoughnutChart').getContext('2d');
        this.chartInstance = new Chart(ctx, {
          type: 'doughnut', // Change chart type to 'doughnut'
          data: {
            datasets: [{
              data: this.getData(),
              backgroundColor: [
                '#00060B',
                '#86937F'
              ],
            borderWidth: 0,
            spacing:1

            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                text:'legend',
                position: 'center',
              },
              title: {
                display: false,
                text: 'Doughnut Chart Example'
              }
            }
          }
        });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Optional: Add any styles you need here */
  .chart-container {
  display: flex;
  justify-content: center; /* Aligns content horizontally to center */
  align-items: center; /* Aligns content vertically to center */
  height: 363px;
  /* height: 400px; Adjust as needed */
}
  </style>
  