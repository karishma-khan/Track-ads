<template>
    <div>
      <canvas id="scatter-plot"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = document.getElementById('scatter-plot').getContext('2d');
        const radius = 20; // Adjust radius as needed
        const data = [];
  
        // Generate sample data points with natural numbers and spaced correctly
        for (let i = 0; i < 20; i++) {
          data.push({
            x: (i + 1) * 2 * radius,
            y: (Math.floor(Math.random() * 10) + 1) * 2 * radius,
          });
        }
  
        new Chart(ctx, {
          type: 'scatter',
          data: {
            datasets: [{
              data: data,
              pointRadius: radius, // Set point radius to desired size
              pointBackgroundColor: 'red', // Set point color to red
            }]
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                  stepSize: 0.5 * radius,
                  callback: function(value) {
                    return value / (2 * radius);
                  },
                  minRotation: 0,
                  maxRotation: 0
                }
              },
              y: {
                type: 'linear',
                ticks: {
                  stepSize: 2 * radius,
                  callback: function(value) {
                    return value / (2 * radius);
                  }
                }
              }
            },
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
              }
            },
            maintainAspectRatio: false,
            responsive: true,
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
  