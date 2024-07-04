<template>
    <div>
        <div class="color-strip">
          <div v-for="(color, index) in colors" :key="index" :style="{ backgroundColor: color }" class="color-block">
          </div>
        </div>
        <div class="flex w-full justify-between">
            <div v-for="(text, index) in range" :key="index" class="color-number">
             {{index == (range.length - 1) ? '+' : '' }} {{ text.toFixed(0) }}
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
  
  