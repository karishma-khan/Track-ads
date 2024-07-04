<template>
    <div>
        <div class="h-[72px] bg-white  relativesearch px-[5%] mb-[2px] flex justify-between items-center overflow-scroll">
            <div class="flex items-center">
                <span class="mdi mdi-filter text-2xl"></span>
                <div class="relative ml-4">
                    <span class="mdi mdi-map-marker-outline absolute left-[4px] top-[3px] text-xl"></span>
                    <select class="chip custom-select" name="" id="">
                        <option value="india">India</option>
                        <option value="india">Mexico</option>
                    </select>
                </div>
                <date-range-picker class="ml-4"></date-range-picker>
            </div>
            <div class="hidden md:block relative">
                <input type="text" class="chip searchAdv" v-model="searchText" @input="search()" style="padding-left: 34px;" placeholder="Search for an advertiser here...">
                <span class="mdi mdi-magnify absolute left-2 top-1 text-2xl"></span>
                <select name="" id="" class="absolute right-2 top-[8px] w-[5px]">
                    <option :value="item.advertiser_ad_id" v-for="(item,idx) in advisersData" :key="idx">
                        {{ item.advertiser }}
                    </option>
                </select>
            </div>
        </div>
        <div class="common-container bg-white block md:hidden" style="padding: 10px;">
            <div class="flex justify-center">
                <div class="relative w-[90%] relative">
                    <input type="text" name="" id="" :v-model="searchText" @input="search()" class="chip w-full text-[14px]" style="padding-left: 34px;" placeholder="Search for an advertiser here...">
                    <span class="mdi mdi-magnify absolute left-2 top-1 text-2xl"></span>
                    <select name="" id="" class="absolute right-2 top-[8px] w-[5px]">
                        <option :value="item.advertiser_ad_id" v-for="(item,idx) in advisersData" :key="idx">
                            {{ item.advertiser }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default{
    data(){
        return {
            searchText: '',
        }
    },
    computed: {
        ...mapGetters({
            advisersData: "get_advertisers_search_data",
        })
    },
    methods:{
        search(){
            this.$store.dispatch('search_advertisers',this.searchText)
        }
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