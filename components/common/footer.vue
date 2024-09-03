<template>
    <div class="px-[5%] footer text-white">
      <!-- Main footer section with title and scroll-to-top button -->
      <div class="md:h-[109px] border-b border-[#FFFFFF4D] py-[17px] md:py-[0px] md:flex justify-between items-center">
        <div class="footerTitle w-full md:w-fit justify-between flex items-center">
          Political Ads Observatory
          <!-- Scroll to top button -->
          <span @click="scrollToTop()" class="mdi mdi-arrow-up ml-6 text-2xl cursor-pointer"></span>
        </div>
        <div>
          <img src="../../static/img/uni.svg" alt="University Logo">
        </div>
      </div>
      <!-- Copyright text section -->
      <div class="flex justify-center items-center h-[60px] copyrightText">
        Political Ad Observatory © 2024
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Function to scroll to the top of the page smoothly
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  </script>