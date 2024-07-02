<template>
    <div class="loader-container" v-if="loading">
      <div class="loader"></div>
      <div class="mt-6">
          Fetching Data...
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: true 
      };
    }
  };
  </script>
  
  <style scoped>
  .loader-container {
    border-radius: 20px;
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
    z-index: 9999;
  }
  
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  