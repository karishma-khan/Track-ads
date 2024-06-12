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
          text: 'Money Spent (in millions)'
        },
        lineWidth: 1,
        gridLineWidth: 1,
        tickAmount: 5,
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
        { "x": 5.2, "y": 8.7, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 2.9, "y": 9.1, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 7.5, "y": 3.8, "marker": { "radius": 15 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 6.3, "y": 5.4, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 4.1, "y": 7.2, "marker": { "radius": 10 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 9.8, "y": 2.3, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 3.6, "y": 6.9, "marker": { "radius": 5 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 1.7, "y": 10.5, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 10.1, "y": 1.4, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 8.2, "y": 4.9, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },

  { "x": -2.2, "y": 2.7, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": -2.9, "y": 1.1, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": -1.5, "y": 3.8, "marker": { "radius": 15 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 1.3, "y": 5.4, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 0.1, "y": 10.2, "marker": { "radius": 10 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 9.8, "y": 2.3, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": -0.6, "y": 6.9, "marker": { "radius": 5 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 1.7, "y": 10.5, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 3.1, "y": 1.4, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
  { "x": 1.2, "y": 4.9, "marker": { "radius": 30 + Math.floor(Math.random() * 21), "fillColor": this.randomColors[Math.floor(Math.random() * 5)], "fillOpacity":0.5 } },
        ]
      }]
    });
  }
}
</script>

