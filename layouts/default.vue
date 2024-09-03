<template>
    <!-- Main layout container -->
    <div>
      <!-- Common header component fixed at the top -->
      <common-header class="fixed top-0 left-0 right-0 z-[20] border-b border-black" />
      
      <!-- Nuxt content area with dynamic top margin -->
      <Nuxt :class="marginTop" />
      
      <!-- Common footer component -->
      <common-footer />
    </div>
  </template>
  <script>
  export default {
    computed: {
      marginTop() {
        // Returns top margin to the main body so that content is not hidden by the header.
        // The margin depends on the screen size and type of header.
        let routeData = this.$route; // Get current route information
        let width = window.innerWidth; // Get window width
  
        if (routeData.name == 'advertiser-:id' || routeData.name == 'overview') {
          // Set margin based on route and screen size
          if (width < 768) {
            return 'mt-[207px]'; // Margin for mobile view
          }
          return 'mt-[134px]'; // Margin for desktop view
        } else if (routeData.path == '/compare/advertisers') {
          return 'mt-[134px]'; // Margin for specific route
        }
        return 'mt-[60px]'; // Default margin
      }
    },
    fetch() {
      // Set the date range in Vuex store for global access
      let today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const day = today.getDate();
      const oneMonthAgo = new Date(year, month, day - 7);
      this.dates = [oneMonthAgo, today];
      this.$store.dispatch('set_date_range', this.dates); // Dispatch action to Vuex store
    }
  }
  </script>