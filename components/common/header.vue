<template>
    <!-- Main container with click event to detect outside clicks -->
    <div @click="handleClickOutside">
      <!-- Container for header and menu -->
      <div ref="menuContainer">
        <!-- Header section with logo and menu toggle -->
        <header class="h-[60px] z-100 bg-[#FFFFFF] border-b border-black px-[5%] items-center flex justify-between">
          <!-- Logo section with clickable area to navigate home -->
          <div @click="goHome()" class="flex h-full items-center cursor-pointer">
            <img src="../../static/img/logo.svg" alt="Logo">
            <span class="logoHead capitalize flex flex-col pl-2">
              <div>political ads</div>
              <div>observatory</div>
            </span>
          </div>
          <!-- Menu toggle button with dynamic icon -->
          <div @click.stop="toggleMenu">
            <!-- Display close icon if menu is open, otherwise show menu icon -->
            <div v-if="isMenuOpen">
              <span class="mdi mdi-close text-xl"></span>
            </div>
            <div v-else>
              <img src="../../static/img/menu.svg" alt="Menu">
            </div>
          </div>
        </header>
        
        <!-- Menu items displayed when menu is open -->
        <div v-if="isMenuOpen" ref="menu" class="menu">
          <div @click="navigate('/')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
            <span>Home</span><span><img src="../../static/img/arrowUpRight.svg" alt="Arrow"></span>
          </div>
          <div @click="navigate('/overview')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
            <span>Dashboard</span><span><img src="../../static/img/arrowUpRight.svg" alt="Arrow"></span>
          </div>
          <div @click="navigate('/compare')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
            <span>Compare</span><span><img src="../../static/img/arrowUpRight.svg" alt="Arrow"></span>
          </div>
          <div @click="navigate('/about')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r border-r-0">
            <span>About</span><span><img src="../../static/img/arrowUpRight.svg" alt="Arrow"></span>
          </div>
          <div @click="navigate('/about#contact')" class="md:w-1/4 menuItem min-h-[135px] border-b md:border-b-0 md:border-r-0">
            <span>Contact Us</span><span><img src="../../static/img/arrowUpRight.svg" alt="Arrow"></span>
          </div>
        </div>
      </div>
      
      <!-- Common search filter component displayed on specific routes -->
      <common-search-filter v-if="$route.path == '/overview' || $route.name == 'advertiser-:id' || $route.path == '/compare/advertisers'"></common-search-filter>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false // State to control menu visibility
      }
    },
    methods: {
      goHome() {
        // Navigate to home page
        window.location.href = '/';
      },
      toggleMenu() {
        // Toggle the menu open/closed state
        this.isMenuOpen = !this.isMenuOpen;
      },
      navigate(path) {
        // Close menu and navigate to specified path
        this.isMenuOpen = false;
        window.location = path;
      },
      handleClickOutside(event) {
        // Close menu if click is outside of the menu and menu container
        if (this.isMenuOpen && !this.$refs?.menu?.contains(event.target) && !this.$refs?.menuContainer?.contains(event.target)) {
          this.isMenuOpen = false;
        }
      }
    },
    mounted() {
      // Add event listener to detect clicks outside of the menu
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
      // Remove event listener before component is destroyed
      document.removeEventListener('click', this.handleClickOutside);
    }
  };
  </script>  