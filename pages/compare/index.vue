<!-- components/Compare.vue -->
<template>
    <div class="bg-[#FFFFFF] text-black common-container">
      <!-- Container for title and description -->
      <div class="flex gap-4">
        <img src="../../static/img/compare.svg" alt="">
        <span class="common-heading">
          {{ title }}
        </span>
      </div>
      <div class="md:flex gap-6">
        <!-- Description section -->
        <p class="mt-3 mb-6 common-description">
          {{ description }}
        </p>
        <!-- Container for comparison options -->
        <div class="flex flex-wrap md:flex-nowrap justify-center gap-4">
          <!-- Option for comparing advertisers -->
          <div 
            @click="routeTo('/compare/advertisers')" 
            class="bg-[#326284] w-[299px] h-[150px] common-container cursor-pointer flex flex-col justify-between"
            style="border: 0px !important; padding: 20px 20px">
            <div class="flex justify-between">
              <div class="flex gap-2 items-center">
                <img src="../../static/img/compare-guest.svg" alt="">
                <span class="text-white compare-heading"> Advertisers </span>
              </div>
              <div>
                <img src="../../static/img/compare-share.svg" alt="">
              </div>
            </div>
            <div class="common-description text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, saepe?
            </div>
          </div>
          <!-- Option for comparing dates -->
          <div 
            @click="routeTo('/compare/dates')" 
            class="bg-[#326284] w-[299px] h-[150px] common-container cursor-pointer flex flex-col justify-between"
            style="border: 0px !important; padding: 20px 20px">
            <div class="flex justify-between">
              <div class="flex gap-2 items-center">
                <img src="../../static/img/compare-dates.svg" alt="">
                <span class="text-white compare-heading"> Dates </span>
              </div>
              <div>
                <img src="../../static/img/compare-share.svg" alt="">
              </div>
            </div>
            <div class="common-description text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, saepe?
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: 'Compare',  // Title for the page
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?',  // Description text
      }
    },
    methods: {
      // Method to navigate to a specific URL
      routeTo(url) {
        window.location.href = url;
      }
    }
  }
  </script>