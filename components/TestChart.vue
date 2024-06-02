<template>
  <div>
    <canvas id="myChart" style="height: 360px !important;"></canvas>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
export default {
  mounted() {
    if (this.chartData)
      this.renderChart();
  },
  props: ['chartData'],
  methods: {
    renderChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: '# of Votes',
            data: this.chartData.values,
            backgroundColor: 'white',
            borderRadius: 20,
            borderSkipped: false,
            borderWidth: 1
          }]
        },
        responsive: true,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'white'
              }
            },
            x: {
              ticks: {
                color: 'white'
              }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(50,50,50,0.7)',
              titleColor: 'white',
              bodyColor: 'white',
              callbacks: {
                label: function (context) {
                  // Format date if applicable
                  let date = context.chart.data.labels[context.dataIndex];
                  // if (typeof date === 'string') {
                  //   date = new Date(date).toLocaleDateString();
                  // }
                  return `Date: ${date}<br>Ad Spend: ${context.formattedValue}`;
                }
              }
            }
          }
        }
      });
    }
  }
}
</script>

<style scoped>
canvas {
  height: 360px !important;
  width: 100% !important;
}
/* Optional: Add any styles you need here */
</style>

