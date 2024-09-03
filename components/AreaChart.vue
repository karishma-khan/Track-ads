<template>
  <div class="chart-wrapper">
    <!-- Container for the chart and custom tooltip -->
    <canvas id="myChart" height="360px" width="800px"></canvas>
    <div id="chartjs-tooltip" class="custom-tooltip" style="opacity: 0;"></div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
export default {
  data() {
    return {
      chartInstance: null // Reference to the Chart.js instance
    };
  },

  // Lifecycle hook that triggers when the component is mounted
  mounted() {
    if (this.chartData) {
      this.renderChart();
    }
  },

  // Watcher that triggers re-rendering of the chart when chartData changes
  watch: {
    chartData() {
      this.renderChart();
    }
  },

  // Props to receive chart data from the parent component
  props: ['chartData'],

  methods: {
    // Method to format numbers for better readability
    formatNumber(value) {
      if (value >= 1e9) {
        return (value / 1e9).toFixed(1) + "b";
      } else if (value >= 1e6) {
        return (value / 1e6).toFixed(1) + "m";
      } else if (value >= 1e3) {
        return (value / 1e3).toFixed(1) + "k";
      } else {
        return new Intl.NumberFormat('en-US').format(value);
      }
    },

    // Method to render or re-render the chart
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy(); // Destroy the previous instance if it exists
      }
      const ctx = document.getElementById('myChart').getContext('2d'); // Get the canvas context
      this.chartInstance = new Chart(ctx, {
        type: 'line', // Chart type
        data: {
          labels: this.chartData.labels, // X-axis labels
          datasets: [{
            label: '', // Data label
            data: this.chartData.values, // Data values
            backgroundColor: 'rgba(255, 255, 255, 1)', // Background color for the chart area
            fill: true, // Enable area fill under the line
            lineTension: 0.2, // Line tension for a smooth curve
            borderColor: 'white', // Border color for the line
            borderWidth: 1 // Border width of the line
          }]
        },
        options: {
          responsive: true, // Make the chart responsive
          maintainAspectRatio: false, // Allow the chart to change aspect ratio
          scales: {
            y: {
              beginAtZero: true, // Start Y-axis at zero
              ticks: {
                color: 'white', // Color of Y-axis labels
                callback: this.formatNumber // Format Y-axis labels
              },
              title: {
                display: true, // Display the title of Y-axis
                text: '(in rupees)', // Title text
                color: 'white' // Title color
              }
            },
            x: {
              ticks: {
                color: 'white' // Color of X-axis labels
              }
            }
          },
          plugins: {
            legend: {
              display: false // Hide the legend
            },
            tooltip: {
              enabled: false, // Disable default tooltip
              external: this.customTooltip // Use custom tooltip function
            }
          }
        }
      });
    },

    // Custom tooltip function
    customTooltip(context) {
      let tooltipEl = document.getElementById('chartjs-tooltip');
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.className = 'tooltip';
        tooltipEl.innerHTML = '<table></table>';
        document.body.appendChild(tooltipEl);
      }

      // Hide the tooltip if there is no content
      if (context.tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Populate the custom tooltip
      if (context.tooltip.body) {
        const titleLines = context.tooltip.title || [];
        const bodyLines = context.tooltip.body.map(b => b.lines);
        let innerHtml = '<div class="flex justify-between rounded-3xl">';
        let titles = [];
        titleLines.forEach(title => {
          titles.push(title);
        });
        bodyLines.forEach((body, i) => {
          const firstStyle = `font-family: "Nunito Sans", sans-serif; font-size: 12px; font-weight: 200; color: rgb(255, 255, 255, 0.7)`;
          const secondStyle = `font-family: "Nunito Sans", sans-serif; font-size: 12px; font-weight: 800;`;
          const first = `<div class="border-r border-[#FFFFFF4A] px-4 pr-6"><div style="${firstStyle}">Date</div><div style="${secondStyle}">${titles[i]}</div></div>`;
          const second = `<div class="px-4 pl-6"><div style="${firstStyle}">Ad Spend</div><div style="${secondStyle}">${body}</div></div>`;
          innerHtml += `${first} ${second}`;
        });
        innerHtml += '</div>';

        let tableRoot = tooltipEl.querySelector('table');
        if (!tableRoot) {
          tableRoot = document.createElement('table');
          tooltipEl.appendChild(tableRoot);
          tooltipEl.classList.add('rounded-3xl');
        }
        tableRoot.innerHTML = innerHtml;
      }

      // Position the tooltip
      const positionY = context.chart.canvas.offsetTop;
      const positionX = context.chart.canvas.offsetLeft;
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = (window.innerWidth < 460 ? 160 : (positionX + context.tooltip.caretX)) + 'px';
      tooltipEl.style.top = positionY + (context.tooltip.caretY - 40) + 'px';
    }
  }
};
</script>

<style scoped>
.custom-tooltip {
  position: absolute;
  background: rgba(0, 0, 0);
  color: white;
  border-radius: 16px;
  pointer-events: none;
  transition: all 0.1s ease;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 10px;
}

.canvas {
  height: 300px !important;
  width: 800px !important;
}

.head {
  font-family: "Nunito Sans", sans-serif;
  font-size: 14px;
  font-weight: 200;
  line-height: 20px;
  text-align: left;
}

.tooltipValue {
  font-family: "Nunito Sans", sans-serif;
  font-size: 14px;
  font-weight: 800;
  line-height: 20px;
}

.chartjs-tooltip-key {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
}
</style>
