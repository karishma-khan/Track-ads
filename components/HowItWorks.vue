<template>
    <!-- Container for tabbed content with border and rounded corners -->
    <div>
      <div class="bg-[#F4E8C1] border rounded-3xl border-black overflow-hidden">
        <!-- Tab: What? -->
        <div 
          ref="what" 
          @click="selectedTab == 1 ? selectedTab = null : selectedTab = 1" 
          class="h-[68px] flex justify-between px-[5%]"
        >
          <div class="p-2 font-[800] flex items-center text-[20px] md:text-[24px] rounded-lg">What ?</div>
        </div>
  
        <!-- Tab content for "What?" -->
        <div class="px-[5%] tab-content" :class="selectedTab == 1 ? 'active' : ''">
          <div class="flex flex-col justify-center items-center">
            <!-- Responsive images for the "What?" tab -->
            <img class="w-full block md:hidden mb-8 md:h-[160px]" src="../static/img/What.svg" alt="">
            <img class="w-full md:block object-cover hidden mb-8" src="../static/img/whatLong.svg" alt="">
            <!-- Description for the "What?" tab -->
            <p class="aboutDetailDescription py-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
            </p>
          </div>
          <!-- Button to navigate to the detailed section -->
          <div class="knowMore" @click="$router.push('/about#whatDetail')">
            Know More <img src="../static/img/knowmore.svg" alt="">
          </div>
        </div>
  
        <!-- Tab: How? -->
        <div class="bg-[#C5D6B6] border-t rounded-t-3xl border-black">
          <div 
            ref="how" 
            @click="selectedTab == 2 ? selectedTab = null : selectedTab = 2" 
            class="h-[68px] flex items-center justify-between px-[5%]"
          >
            <div class="p-2 font-[800] text-[20px] md:text-[24px] rounded-lg">How ?</div>
          </div>
  
          <!-- Tab content for "How?" -->
          <div class="flex flex-col px-[5%] justify-center tab-content" :class="selectedTab == 2 ? 'active' : ''">
            <!-- Responsive images for the "How?" tab -->
            <img class="w-full block md:hidden mb-8 md:h-[160px]" src="../static/img/Where.svg" alt="">
            <img class="w-full md:block object-cover hidden mb-8" src="../static/img/whereLong.svg" alt="">
            <!-- Description for the "How?" tab -->
            <p class="aboutDetailDescription py-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores porro facilis consectetur ipsam, aut perferendis, vitae amet architecto a incidunt accusamus impedit nesciunt ipsa ad tempora molestias repellat ducimus sed quisquam molestiae nulla corrupti exercitationem adipisci? Incidunt illo ut quasi!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, eveniet?
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur 
            </p>
            <!-- Button to navigate to the detailed section -->
            <div class="knowMore" @click="$router.push('/about#howDetail')">
              Know More <img src="../static/img/knowmore.svg" alt="">
            </div>
          </div>
  
          <!-- Tab: Why? -->
          <div class="bg-[#81C2A7] border-t rounded-t-3xl border-black">
            <div 
              ref="why" 
              @click="selectedTab == 3 ? selectedTab = null : selectedTab = 3" 
              class="h-[68px] flex items-center justify-between px-[5%]"
            >
              <div class="p-2 font-[800] text-[20px] md:text-[24px] rounded-lg">Why ?</div>
            </div>
  
            <!-- Tab content for "Why?" -->
            <div class="flex flex-col px-[5%] justify-center tab-content" :class="selectedTab == 3 ? 'active' : ''">
              <!-- Responsive images for the "Why?" tab -->
              <img class="w-full block md:hidden mb-8 md:h-[160px]" src="../static/img/Why.svg" alt="">
              <img class="w-full md:block object-cover hidden mb-8" src="../static/img/whyLong.svg" alt="">
              <!-- Description for the "Why?" tab -->
              <p class="aboutDetailDescription py-10">
                lorem200
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur 
              </p>
              <!-- Button to navigate to the detailed section -->
              <div class="knowMore" @click="$router.push('/about#whyDetail')">
                Know More <img src="../static/img/knowmore.svg" alt="">
              </div>
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
        selectedTab: 0, // Track the currently selected tab
      }
    },
    mounted() {
      // Add scroll event listener on component mount
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        // Check if the user has scrolled to the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          // Increment the selected tab if it's less than 3
          if (this.selectedTab < 3) {
            this.selectedTab++;
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .tab-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
  }
  
  /* Style for active tab content */
  .tab-content.active {
    max-height: 600px; /* Adjust height as needed */
  }
  .heightReq {
    height: fit-content;
    transition: height 1s; /* Adjust timing and easing as needed */
    transition-delay: 0.5s;
  }
  
  .zeroHeight {
    height: 0px;
    overflow: hidden;
    transition: height 1s; /* Adjust timing and easing as needed */
  }
  </style>