<template>
    <div class="bg-[black]">
      <!-- Header section with filters and search functionality -->
      <div class="h-[72px] bg-white relative px-[5%] flex justify-between items-center overflow-scroll">
        <!-- Filter and selection section -->
        <div class="flex items-center overflow-auto">
          <!-- Filter icon -->
          <span class="mdi mdi-filter text-2xl"></span>
          <!-- Nation selector -->
          <div class="relative ml-4">
            <span class="mdi mdi-map-marker-outline absolute left-[4px] top-[3px] text-xl"></span>
            <select class="chip custom-select" v-model="nation" @input="setNation">
              <option value="IN">India</option>
              <option value="MX">Mexico</option>
            </select>
          </div>
          <!-- Date range picker component -->
          <date-range-picker class="ml-4"></date-range-picker>
        </div>
  
        <!-- Search section for larger screens -->
        <div v-if="$route.path != '/compare/advertisers'" class="hidden md:block" ref="searchSec">
          <div class="relative">
            <!-- Search input field with icon -->
            <input type="text" class="chip searchAdv" v-model="searchText" @input="search()" style="padding-left: 34px;" placeholder="Search for an advertiser here...">
            <span class="mdi mdi-magnify absolute left-2 top-1 text-2xl"></span>
          </div>
          <!-- Search results dropdown -->
          <div v-if="advisersData.length > 0 && !isClickedOutside" class="cursor-pointer fixed w-[335px] bg-[white] rounded-xl max-h-[200px] p-2 border border-[#00000033] overflow-y-auto z-[2]">
            <div @click="searchText='';$router.push(`/advertiser/${item.advertiser_ad_id}`)" v-for="(item,idx) in advisersData" :key="idx" class="border-b border-[#00000033] text-[12px] py-2" style="font-family: 'Nunito Sans', sans-serif;">
              {{ item.advertiser }}
            </div>
          </div>
        </div>
      </div>
  
      <!-- Search section for smaller screens -->
      <div v-if="$route.path != '/compare/advertisers'" class="common-container bg-white block md:hidden" style="padding: 10px;">
        <div class="flex justify-center">
          <div class="w-[90%]" ref="searchSecMobile">
            <div class="relative">
              <!-- Search input field with icon -->
              <input type="text" class="chip w-full text-[14px]" v-model="searchText" @input="search()" style="padding-left: 34px;" placeholder="Search for an advertiser here...">
              <span class="mdi mdi-magnify absolute left-2 top-1 text-2xl"></span>
            </div>
            <!-- Search results dropdown for mobile view -->
            <div v-if="advisersData.length > 0 && !isClickedOutside" class="cursor-pointer absolute w-[80%] bg-[white] rounded-xl max-h-[200px] p-2 border border-[#00000033] overflow-y-auto z-[2]">
              <div @click="searchText='';$router.push(`/advertiser/${item.advertiser_ad_id}`)" v-for="(item,idx) in advisersData" :key="idx" class="border-b border-[#00000033] text-[12px] py-2" style="font-family: 'Nunito Sans', sans-serif;">
                {{ item.advertiser }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    data() {
      return {
        searchText: '', // Holds the text input for search
        nation: 'IN', // Default selected nation
        isClickedOutside: false, // Tracks if a click is outside of the search dropdown
      }
    },
    mounted() {
      // Add event listener to detect clicks outside of the search dropdown
      document.addEventListener("click", this.handleOutsideClick);
    },
    computed: {
      // Map Vuex getters to computed properties
      ...mapGetters({
        advisersData: "get_advertisers_search_data", // Data for search results
        dateRange: "get_date", // Date range for filters
      })
    },
    methods: {
      async setNation(val) {
        // Dispatch action to filter by nation and update relevant data
        await this.$store.dispatch('filter_by_nation', val.target.value);
        if (this.$route.path == '/overview') {
          await this.$store.dispatch("set_dashboard_action", [this.dateRange, val.target.value]);
        } else if (this.$route.name == 'advertiser-:id') {
          this.$router.push('/overview');
        }
      },
      search() {
        // Dispatch search action and reset outside click flag
        this.isClickedOutside = false;
        this.$store.dispatch('search_advertisers', { search: this.searchText, country: this.nation });
      },
      handleOutsideClick(event) {
        // Close search dropdown if click is outside
        if (!this.$refs?.searchSec?.contains(event.target) && !this.$refs?.searchSecMobile?.contains(event.target)) {
          this.isClickedOutside = true;
        }
      },
    }
  }
  </script>
  <style>
  .custom-select {
    -webkit-appearance: none; /* Chrome, Safari, Edge */
    -moz-appearance: none;    /* Firefox */
    appearance: none;
  }
select{
    padding-left: 25px !important;
    padding-right: 15px !important;
  }
.search{
    border-radius: 0px 0px 10px 10px;
    border: 1px 0px 0px 0px;
  }
  </style>