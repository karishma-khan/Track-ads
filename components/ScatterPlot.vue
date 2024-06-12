<template>
  <div ref="chartContainer" class="h-[270px]"></div>
</template>

<script>
export default {
  data(){
    return{
      randomColors:['#FBE69F99','#C5D6B699','#4CB2AC99','#32628499','#13375199']
    }
  },
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
        min:0,
        max:11,
        title: {
          enabled: true,
          text: 'Money Spent'
        },
        lineWidth: 1,
        gridLineWidth: 1
      },
      yAxis: {
        min:0,
        max:11,
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
          { "x": 5, "y": 8, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 2, "y": 9, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 7, "y": 3, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 6, "y": 5, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 4, "y": 7, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 9, "y": 2, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 3, "y": 6, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 1, "y": 10, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 10, "y": 1, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 8, "y": 4, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 5, "y": 5, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 2, "y": 3, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 7, "y": 10, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 4, "y": 8, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 9, "y": 9, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 1, "y": 2, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 10, "y": 5, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 8, "y": 7, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 6, "y": 10, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
          { "x": 3, "y": 4, "marker": { "radius": Math.floor(Math.random() * 30), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } }
        ]
      }]
    });
  }
}
</script>

