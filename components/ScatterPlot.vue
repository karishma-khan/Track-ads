<template>
  <div class="overflow-auto">
    <!-- Container for the chart, centered and scrollable if necessary -->
    <div ref="chartContainer" class="chart-container flex justify-center">
      <!-- Canvas element for Chart.js -->
      <canvas id="chartCanvas" ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  props: ['chartData'], // Props to receive chart data
  data() {
    return {
      // Array of colors for different ranges
      randomColors: ['#FBE69F', '#C5D6B6', '#4CB2AC', '#326284', '#133751'],
      maxAmount: 0, // Maximum amount for scaling
      maxCount: 0,  // Maximum count for scaling
      rangeArray: [] // Array to define the range for color coding
    }
  },
  methods: {
    // Format numbers into human-readable format (e.g., 1k, 1m, 1b)
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
    
    // Custom tooltip function for Chart.js
    customTooltip(context) {
      let tooltipEl = document.getElementById('chartjs-tooltip');
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.className = 'tooltip';
        tooltipEl.innerHTML = '<table></table>';
        document.body.appendChild(tooltipEl);
      }

      // Hide the tooltip if there's no content
      if (context.tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }
      if (context.tooltip.body) {
        const titleLines = context.tooltip.title || [];
        const bodyLines = context.tooltip.body.map(b => b.lines);
        let innerHtml = '';
        bodyLines.forEach((body, i) => {
          innerHtml += `<div class="w-[300px] p-[8px]"><div class="tooltip-header border-b border-[#FFFFFF52] flex items-center gap-4 text-[15px] pb-2 mb-2"> 
            <div class="h-[12px] w-[12px] rounded-[50%] bg-[${context.tooltip.dataPoints[0].raw.backgroundColor}]"></div> 
            ${context.tooltip.dataPoints[0].raw.advertiser} 
          </div>`;
          const first = `<div class="tooltext flex justify-between items-center"><div class="text-[#FFFFFF80] flex items-start gap-2"><img src="/img/announce.svg" /><div> Total Ads
            <div class="text-white">${context.tooltip.dataPoints[0].raw.y}</div></div></div></div>`;
          const second = `<div><div class="text-[#FFFFFF80] flex items-start gap-2"><img src="/img/Money.svg" /><div> Spend Amount 
            <div class="text-white">${this.formatNumber(context.tooltip.dataPoints[0].raw.x)}</div></div></div></div>`;
          innerHtml += `${first}${second}`;
        });
        innerHtml += '</div></div>';

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
      const positionX = context.chart.canvas.offsetLeft + 40;
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + (context.tooltip.caretX + 400) + 'px';
      tooltipEl.style.top = positionY + (context.tooltip.caretY + 280) + 'px';
    },

    // Process chart data for visualization
    processData() {
      let processedData = this.chartData.map((item) => {
        let radius = Math.floor(item.amount / (this.maxAmount / 40)); 
        const numberOfSegments = 5;
        const step = this.maxCount / numberOfSegments;
        this.rangeArray = Array.from({ length: 5 }, (_, i) => step * i);
        let colorIndex = 0;
        for (let i = 0; i < 5; i++) {
          if (item.count >= this.rangeArray[i])
            colorIndex = i;
        }
        if (colorIndex >= 5)
          colorIndex = 4;
        let fillColor = this.randomColors[colorIndex];

        return {
          x: item.amount,
          y: item.count,
          r: radius,
          title: item.advertiser,
          backgroundColor: fillColor,
          borderColor: '#a9b3a0',
          borderWidth: 2,
          hoverBackgroundColor: fillColor,
          hoverBorderColor: fillColor,
          advertiser: item.advertiser,
          id: item.advertiser_ad_id
        }
      });
      return processedData;
    },

    // Create the Chart.js chart
    createChart(data) {
      new Chart(this.$refs.chartCanvas, {
        type: 'bubble',
        data: {
          datasets: [{
            label: 'Customized Points',
            data: data,
            backgroundColor: data.map(point => point.backgroundColor),
            borderColor: data.map(point => point.borderColor),
            borderWidth: 1
          }]
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Money Spent (in rupees)'
              },
              ticks: {
                callback: this.formatNumber, // Format x-axis labels
              },
              min: 0
            },
            y: {
              title: {
                display: true,
                text: 'No of Ads'
              },
              ticks: {
                callback: this.formatNumber, // Format y-axis labels
              },
              grid: {
                display: false
              },
              min: 0
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false,
              external: this.customTooltip // Use custom tooltip
            }
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const element = elements[0];
              const point = element.element.$context.raw;
              window.location.href = `/advertiser/${point.id}`; // Navigate to advertiser detail on click
            }
          }
        }
      });
    }
  },
  mounted() {
    // Initialize max values for scaling
    this.maxCount = Math.max(...this.chartData.map(item => item.count));
    this.maxAmount = Math.max(...this.chartData.map(item => item.amount));

    // Process and create the chart
    let reqData = this.processData();
    this.createChart(reqData);
  }
}
</script>

<style scoped>
/* Styles for the chart container */
.chart-container {
  overflow-x: auto;
  max-width: 100%;
  position: relative;
  min-height: 300px;
  width: 100%;
}

#chartCanvas {
  width: 100% !important;
  min-width: 750px;
}

/* Responsive styles for smaller screens */
@media (max-width: 780px) {
  .chart-container {
    min-width: 750px;
    min-height: 400px;
  }
}

/* Tooltip styles */
.tooltip-header {
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-align: left;
  color: white;
}

.tooltext {
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0.02em;
  text-align: left;
}
</style>
