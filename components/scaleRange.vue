<template>
    <div>
        <div class="color-strip">
          <div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }" class="color-block">
          </div>
        </div>
        <div class="flex w-full justify-between">
            <div v-for="(text, index) in range" :key="index" class="w-1/5 color-number relative left-[-10px]">
              {{ formatNumber(text.toFixed(0)) }}
            </div>
        </div>
    </div>
  </template>
  
  
  <script>
  export default {
    props:['colors','range'],
    data() {
      return {
      }
    },
    methods:{
      formatNumber(value) {
        if (value >= 1e9) {
            return (value / 1e9).toFixed(1) + "b";
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(1) + "m";
        } else if (value >= 1e3) {
            return (value / 1e3).toFixed(1) + "k";
        } else {
            return new Intl.NumberFormat('en-US').format(value)+ "+";
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .color-strip {
    display: flex;
    border-radius: 20px;
    overflow: hidden;
  }
  .color-block {
    flex: 1;
    position: relative;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .color-number {
    color: black; 
    font-weight: 300;
    font-size: 12px;
  }
  @media screen and (max-width:780px) {
    .colo-number {
        font-size:12px !important;
        font-weight: 200 !important;
    }
  }
  </style>
  
  