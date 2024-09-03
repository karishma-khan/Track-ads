<template>
  <div>
    <!-- Color strip to display color blocks based on the colors array -->
    <div class="color-strip">
      <!-- Loop through the colors array to create a color block for each color -->
      <div
        v-for="(color, index) in colors"
        :key="index"
        :style="{ backgroundColor: color }"
        class="color-block"
      ></div>
    </div>

    <!-- Range labels beneath the color strip, spaced evenly -->
    <div class="flex w-full justify-between">
      <!-- Loop through the range array to display formatted number labels -->
      <div
        v-for="(text, index) in range"
        :key="index"
        class="w-1/5 color-number relative left-[-10px]"
      >
        {{ formatNumber(text.toFixed(0)) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Props passed from parent component to receive colors and range data
  props: ['colors', 'range'],

  methods: {
    // Method to format numbers into a more readable format (e.g., 1k, 1m, 1b)
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
    }
  }
}
</script>

<style scoped>
/* Styles for the color strip and color blocks */
.color-strip {
  display: flex;
  border-radius: 20px; /* Rounded corners for the color strip */
  overflow: hidden; /* Ensures color blocks are contained within the strip */
}
.color-block {
  flex: 1; /* Each color block takes equal width */
  position: relative;
  height: 12px; /* Height for the color blocks */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Styles for the range numbers below the color strip */
.color-number {
  color: black;
  font-weight: 300;
  font-size: 12px;
}

/* Responsive styling for smaller screens */
@media screen and (max-width:780px) {
  .color-number {
    font-size: 12px !important;
    font-weight: 200 !important;
  }
}
</style>
