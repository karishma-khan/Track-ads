<template>
  <div ref="chartContainer" class="h-[300px]"></div>
</template>

<script>
export default {
  mounted() {
    if (typeof Highcharts === 'undefined') {
      console.error('Highcharts is not defined');
      return;
    }

    Highcharts.chart(this.$refs.chartContainer, {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        panning: {
        enabled: true, 
        type: 'xy'
      },
      panKey: 'shift',
        backgroundColor: 'transparent'
      },
      legend:{
          enabled: false
      },
      exporting: {
          enabled: false
      },
      title: {
        enabled: false,
        text: ''
      },
      xAxis: {
        visible: true,
        title: {
          enabled: true,
          text: 'Money Spent'
        },
        lineWidth: 1,
        gridLineWidth: 1
      },
      yAxis: {
        visible: true,
        title: {
          enabled: true,
          text: 'No of Ads'
        },
        labels: {
          enabled: false
        },
        lineWidth: 0,
        gridLineWidth: 0
      },
      plotOptions: {
        scatter: {
          marker: {
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'X: {point.x}, Y: {point.y}, Size: {point.marker.radius}, Color: {point.color}'
          }
        }
      },
      series: [{
        name: 'Customized Points',
        data: [
          { x: 1, y: 3, marker: { radius: 10, fillColor: 'red' } },
          { x: 2, y: 5, marker: { radius: 15, fillColor: 'blue' } },
          { x: 3, y: 7, marker: { radius: 8, fillColor: 'green' } },
          { x: 4, y: 2, marker: { radius: 12, fillColor: 'yellow' } },
          { x: 5, y: 4, marker: { radius: 14, fillColor: 'purple' } },
          { x: 6, y: 6, marker: { radius: 11, fillColor: 'orange' } },
          { x: 7, y: 1, marker: { radius: 9, fillColor: 'pink' } },
          { x: 8, y: 8, marker: { radius: 13, fillColor: 'cyan' } },
          { x: 9, y: 10, marker: { radius: 16, fillColor: 'magenta' } },
          { x: 10, y: 9, marker: { radius: 7, fillColor: 'brown' } },
          { x: 11, y: 11, marker: { radius: 17, fillColor: 'lime' } },
          { x: 10, y: 10, marker: { radius: 6, fillColor: 'aqua' } },
          { x: 13, y: 12, marker: { radius: 18, fillColor: 'teal' } },
          { x: 14, y: 15, marker: { radius: 5, fillColor: 'gold' } },
          { x: 15, y: 14, marker: { radius: 20, fillColor: 'silver' } },
          { x: 16, y: 16, marker: { radius: 4, fillColor: 'maroon' } },
          { x: 17, y: 18, marker: { radius: 19, fillColor: 'navy' } },
          { x: 18, y: 17, marker: { radius: 3, fillColor: 'olive' } },
          { x: 19, y: 19, marker: { radius: 22, fillColor: 'violet' } },
          { x: 20, y: 20, marker: { radius: 2, fillColor: 'indigo' } }
        ]
      }]
    });
  }
}
</script>

