<template>
    <div>
      <canvas id="myDoughnutChart"></canvas>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      chartInstance: null 
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
      getData()
      {
        let res = []
        for(let item in this.chartData){
          res.push(this.chartData[item].percent)
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
  </style>
  