<template>
    <div>
      <canvas id="myDoughnutChart"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = document.getElementById('myDoughnutChart').getContext('2d');
        new Chart(ctx, {
          type: 'doughnut', // Change chart type to 'doughnut'
          data: {
            datasets: [{
              data: [75,25],
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
  