<template>
  <div class="chart-wrapper">
    <canvas id="myChart" height="360px"></canvas>
    <div id="chartjs-tooltip" class="custom-tooltip" style="opacity: 0;"></div>
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
            label: '',
            data: this.chartData.values,
            backgroundColor: 'white',
            borderRadius: 20,
            borderSkipped: false,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio:false,
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
              enabled: false, // Disable default tooltip
              external: this.customTooltip // Custom tooltip function
            }
          }
        }
      });
    },
    customTooltip(context) {
      let tooltipEl = document.getElementById('chartjs-tooltip');

      if (context.tooltip.body) {
        const titleLines = context.tooltip.title || [];
        const bodyLines = context.tooltip.body.map(b => b.lines);
        let innerHtml = '<div class="flex justify-between rounded-3xl">';
        let titles = []
        titleLines.forEach(title => {
          titles.push(title)
        });
        bodyLines.forEach((body, i) => {
          const firstStyle = `font-family: SF Pro;font-size: 12px;font-weight: 200;color:rgb(255,255,255,0.7)`
          const secondStyle = `font-family: SF Pro Bold;font-size: 12px;font-weight: 800;`
          const first  = `<div class="border-r border-[#FFFFFF4A] px-4 pr-6"><div style="${firstStyle}">Date</div><div style="${secondStyle}">${titles[i]}</div></div>`
          const second  = `<div class="px-4 pl-6"><div style="${firstStyle}">Ad Spend</div><div style="${secondStyle}">${body}</div></div>`
          innerHtml += `${first} ${second}`;
        });
        innerHtml += '</div>';

        let tableRoot = tooltipEl.querySelector('table');
        if (!tableRoot) {
          tableRoot = document.createElement('table');
          tooltipEl.appendChild(tableRoot);
          tooltipEl.classList.add('rounded-3xl')
        }
        tableRoot.innerHTML = innerHtml;
      }
      const positionY = context.chart.canvas.offsetTop;
      const positionX = context.chart.canvas.offsetLeft;
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = positionX + context.tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + (context.tooltip.caretY - 40) + 'px';
    }
  }
}
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

.canvas{
  height: 300px !important;
}

.head{
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 200;
  line-height: 20px;
  text-align: left;
}

.tooltipValue{
  font-family: SF Pro Bold;
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

