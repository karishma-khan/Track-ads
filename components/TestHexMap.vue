<template>
  <div class="bg-[#FFFBEF] text-black common-container">
    <div class="flex gap-4">
        <img src="img/overviewLogo.svg" alt="">
        <span class="common-heading">
            {{ title }}
        </span>
    </div>
    <p class="mt-3 mb-6 common-description">
        {{ description }}
    </p>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:'Active Ads',
      description:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur reiciendis dicta nihil dolores fugit neque dolorum ullam voluptatum impedit architecto.'
    }
  },
  mounted() {
    const echarts = require('echarts');
    const chart = echarts.init(this.$refs.chart);

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            var index = params[0].dataIndex; // Get the index of the data point
            var tooltipHtml = '<div style="background-color:rgba(50,50,50,0.7); padding: 10px; border-radius: 5px;">';
            tooltipHtml += '<p style="color:#fff; font-size:12px;">Custom Tooltip</p>';
            tooltipHtml += '<p style="color:#fff; font-size:14px;">Index: ' + index + '</p>'; // Add index to tooltip
            tooltipHtml += '<p style="color:#fff; font-size:14px;">' + params[index].name + ': ' + params[index].value + '</p>';
            tooltipHtml += '</div>';
            return tooltipHtml;
        }
    },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 1,
            color:'white'
          },
          showSymbol: false,
          areaStyle: {
            opacity: 1,
            color: '#C5D6B6'
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 1,
            color:'white'
          },
          showSymbol: false,
          areaStyle: {
            opacity: 1,
            color: '#81C2A7'
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 1,
            color:'white'
          },
          showSymbol: false,
          areaStyle: {
            opacity: 1,
            color: '#4CB2AC'
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 1,
            color:'white'
          },
          showSymbol: false,
          areaStyle: {
            opacity: 1,
            color: '#326284'
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 1,
            color:'white'
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 1,
            color: '#162C3B'
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
        // Repeat the same structure for other series
      ]
    };
    
    // Set option and resize chart with window
    chart.setOption(option);
    window.addEventListener('resize', () => {
      chart.resize();
    });
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
