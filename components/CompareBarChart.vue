<template>
  <div class="highcharts-figure">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const categories = [
      '18-24', '25-34', '35-44', '45-54', '55-64', '65+'
    ];

    const maleData = [
      -28, -35, -31, -42, -31, -12
    ];

    const femaleData = [
      34, 18, 25, 32, 24, 17
    ];

    Highcharts.chart('container', {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent'
      },
      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
        }
      },
      legend: {
        enabled: false // Hide legend
      },
      navigation: {
        buttonOptions: {
          enabled: false // Hide option menu
        }
      },
      title: {
        text: null // Hide chart title
      },
      xAxis: [{
        categories: categories,
        reversed: false,
        labels: {
          step: 1
        }
      }, {
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
          step: 1
        }
      }],
      yAxis: {
        title: {
          text: null
        },
        labels: {
          format: '{value}%'
        }
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          pointWidth: 58,
          borderRadius: '12px'
        }
      },
      tooltip: {
        pointFormat: '<b>{series.name}, age {point.category}</b><br/>Population: {point.y:.1f}%'
      },
      series: [{
        name: 'Male',
        data: maleData.map((value, index) => ({
          y: value,
          color: this.barColors[index] || '#7cb5ec'
        }))
      }, {
        name: 'Female',
        data: femaleData.map((value, index) => ({
          y: value,
          color: this.barColors[index] || '#434348'
        }))
      }]
    });
  },
  data() {
    return {
      barColors: ['#C5D6B6', '#81C2A7', '#4CB2AC', '#326284', '#162C3B', '#00060B']
    };
  }
}
</script>

<style scoped>
#container {
  height: 400px;
}

.highcharts-figure,
.highcharts-data-table table {
  min-width: 310px;
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}

.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8
}
</style>
