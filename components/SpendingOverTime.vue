<template>
    <div class="bg-[#326284] text-white text-black common-container">
      <!-- Container for the component with background color and text styling -->
      <div class="flex gap-4">
        <!-- Logo image and title -->
        <img src="../static/img/SOTLogo.svg" alt="Spending Over Time Logo">
        <span class="common-heading">
          {{ title }}
        </span>
      </div>
      <p class="mt-3 mb-6 common-description">
        {{ description }}
      </p>
      <div>
        <!-- Display the chart if chartData is available, otherwise show no-data component -->
        <area-chart v-if="chartData.length > 0" :chartData="getChartData"></area-chart>
        <no-data v-else></no-data>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['chartData'], // Prop to receive chart data from parent component
  
    computed: {
      // Computed property to transform chartData into the format required by the chart component
      getChartData() {
        let labels = [];
        let values = [];
        
        // Iterate over chartData to generate labels and values
        for (let item in this.chartData) {
          let newDate = new Date(this.chartData[item].date);
          labels.push(newDate.getDate() + ' ' + this.monthNames[newDate.getMonth()]);
          values.push(this.chartData[item]?.spending);
        }
        return { labels, values };
      }
    },
  
    data() {
      return {
        title: 'Spending Over Time', // Title for the component
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?', // Description text
        ylabel: '(in million rupees)', // Y-axis label
        monthNames: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ] // Array of month names for formatting dates
      }
    }
  }
  </script>