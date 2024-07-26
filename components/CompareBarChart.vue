<template>
  <div>
    <div class="flex my-6 md:my-2 justify-start md:justify-end gap-4 text-[14px] text-[#7e7a6f]">
      <div class="flex gap-2 items-center">
        <div class="flex items-center gap-[1px]">
          <div class="w-[12px] bg-[#4b95c9] border border-[#4b95c9] h-[4px] rounded-l-[40%] "></div>
          <div class="w-[8px] h-[8px] rounded-[50%] bg-[#4b95c9]"></div>
          <div class="w-[12px] bg-[#4b95c9] border border-[#4b95c9] h-[4px] rounded-r-[40%]"></div>
        </div>
        Male
      </div>
      <div class="flex gap-2 items-center">
        <div class="flex items-center gap-[1px]">
          <div class="w-[12px] bg-[#d86c86] border border-[#d86c86] h-[4px] rounded-l-[40%] "></div>
          <div class="w-[8px] h-[8px] rounded-[50%] bg-[#d86c86]"></div>
          <div class="w-[12px] bg-[#d86c86] border border-[#d86c86] h-[4px] rounded-r-[40%]"></div>
        </div>
        Female
      </div>
      <div class="flex gap-2 items-center">
        <div class="flex items-center gap-[1px]">
          <div class="w-[12px] bg-[#878582] border border-[#878582] h-[4px] rounded-l-[40%] "></div>
          <div class="w-[8px] h-[8px] rounded-[50%] bg-[#878582]"></div>
          <div class="w-[12px] bg-[#878582] border border-[#878582] h-[4px] rounded-r-[40%]"></div>
        </div>
        Unknown
      </div>
    </div>
    <div class="chart-container">
      <canvas ref="lineChartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['chartData'],
  methods: {
    formatDate(date)
        {
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
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Male',
              data: data.maleData.map(d => d?.percent),
              borderColor: '#4b95c9',
              pointBackgroundColor: '#4b95c9',
              fill: false,
              cubicInterpolationMode: 'monotone',
              pointRadius: 3,
              borderWidth: 5,
              pointHoverRadius: 5
            },
            {
              label: 'Female',
              data: data.femaleData.map(d => d?.percent),
              borderColor: '#d86c86',
              pointBackgroundColor: '#d86c86',
              fill: false,
              cubicInterpolationMode: 'monotone',
              pointRadius: 3,
              borderWidth: 5,
              pointHoverRadius: 5
            },
            {
              label: 'Unknown',
              data: data.unKnownData.map(d => d?.percent),
              borderColor: '#878582',
              pointBackgroundColor: '#878582',
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
              max: (Math.max(...data.maleData.concat(data.femaleData).concat(data.unKnownData).map(d => d?.percent)) + 2)
            }
          }
        }
      });
    },
    customTooltip(context) {
      let tooltipEl = document.getElementById('chartjs-tooltip');
      console.log(context.tooltip);
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.className = 'tooltip';
        tooltipEl.innerHTML = '<table></table>';
        document.body.appendChild(tooltipEl);
      }

      // Hide the tooltip if there is no tooltip body content
      if (context.tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }
      if (context.tooltip.body) {
        const titleLines = context.tooltip.title || [];
        const bodyLines = context.tooltip.body.map(b => b.lines);
        let innerHtml = '<div class="w-[300px] p-[8px]"><div class="tooltip-header text-[15px] mb-2" style="color:#FFFFFF80"> <span class="mdi mdi-account-multiple"></span> Demographics </div>';
        let titles = []
        titleLines.forEach(title => {
          titles.push(title)
        });
        bodyLines.forEach((body, i) => {
          const first  = `<div style="color:#FFFFFF90 ;word-wrap: break-word;width:200px" class="text-[12px]"><div>On average, <b class="text-white">${body}%</b> audience between the</div> `;
          const second  = `<div>age of <b class="text-white"> ${titles[i]} </b> were targeted for the ads during</div>`;
          const third  = `<div><b class="text-white"> ${this.formatDate(this.dateRange[0])} to ${this.formatDate(this.dateRange[1])}. </b></div>`;
          innerHtml += `${first}${second}${third}`;
        });
        innerHtml += '</div></div>';

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
  },
  mounted() {
    this.loadChart();
  },
  updated() {
    this.$refs.lineChartCanvas?.getContext('2d')?.clearRect(0, 0, this.$refs.lineChartCanvas.width, this.$refs.lineChartCanvas.height); // Clear previous chart
    this.loadChart();
  },
  computed: {
    ...mapGetters({
      dateRange: "get_date",
    }),
    computeData() {
      const data = this.chartData?.data || [];
      const labels = [];
      const femaleData = [];
      const unKnownData = [];
      const maleData = [];
      for (const value of data[0].distribution) {
          labels.push(value.age_range);
      }
      for (const item of data) {
        if (item.gender === 'female') {
          for (const value of labels) {
            femaleData.push({age_range: value , percent : (item.distribution.filter((val) => {return val.age_range == value})[0])?.percent * 100})
          }
        } else if (item.gender === 'male') {
          for (const value of labels) {
            maleData.push({age_range: value , percent : (item.distribution.filter((val) => {return val.age_range == value})[0])?.percent * 100})
          }
        } else if (item.gender === 'unknown') {
          for (const value of labels) {
            unKnownData.push({age_range: value , percent : (item.distribution.filter((val) => {return val.age_range == value})[0])?.percent * 100})
          }
        }
      }

      return { labels, femaleData, maleData, unKnownData };
    }
  },
  data() {
    return {
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
