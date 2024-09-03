<template>
  <div class="chart-container relative">
    <!-- Canvas element for the chart -->
    <canvas id="myDoughnutChart"></canvas>
    
    <!-- Overlay with chart details -->
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
    chartInstance: null, // To hold the Chart.js instance
    amtSpend: 0 // To store total amount spent
  };
},

props: ['chartData'], // Props received from parent component

mounted() {
  // Initialize the chart when the component is mounted
  this.renderChart();
},

watch: {
  // Re-render the chart when chartData changes
  chartData() {
    this.renderChart();
  }
},

methods: {
  // Formats numbers with suffixes (e.g., 'k+', 'm+', 'b+')
  formatNumber(value) {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + "b+";
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + "m+";
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + "k+";
    } else {
      return new Intl.NumberFormat('en-US').format(value);
    }
  },

  // Calculates data for the chart and total amount spent
  getData() {
    let res = [];
    this.amtSpend = 0; // Reset amtSpend before calculation
    for (let item of this.chartData) {
      this.amtSpend += item.amount;
      res.push(item.percent); // Collect percentage values
    }
    return res;
  },

  // Renders or updates the chart
  renderChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy previous instance if exists
    }
    const ctx = document.getElementById('myDoughnutChart').getContext('2d');
    this.chartInstance = new Chart(ctx, {
      type: 'doughnut', // Specify the type of chart
      data: {
        datasets: [{
          data: this.getData(), // Data for the doughnut chart
          backgroundColor: [
            '#00060B', // Background color for the first segment
            '#86937F'  // Background color for the second segment
          ],
          borderWidth: 0, // No border
          spacing: 1 // Space between segments
        }]
      },
      options: {
        responsive: true, // Make the chart responsive
        plugins: {
          legend: {
            position: 'center', // Position the legend in the center
          },
          title: {
            display: false, // Hide the chart title
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
