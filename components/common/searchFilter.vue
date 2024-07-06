<template>
    <div class="bg-[black]">
        <div class="h-[72px] bg-white  relative px-[5%] flex justify-between items-center overflow-scroll">
            <div class="flex items-center overflow-auto">
                <span class="mdi mdi-filter text-2xl"></span>
                <div class="relative ml-4">
                    <span class="mdi mdi-map-marker-outline absolute left-[4px] top-[3px] text-xl"></span>
                    <select class="chip custom-select" v-model="nation" @input="setNation">
                        <option value="IN">India</option>
                        <option value="MX">Mexico</option>
                    </select>
                </div>
                <date-range-picker class="ml-4"></date-range-picker>
            </div>
            <div class="hidden md:block" ref="searchSec">
                <div class="relative">
                    <input type="text" class="chip searchAdv" v-model="searchText" @input="search()" style="padding-left: 34px;" placeholder="Search for an advertiser here...">
                    <span class="mdi mdi-magnify absolute left-2 top-1 text-2xl"></span>
                </div>
                <div v-if="advisersData.length > 0 && !isClickedOutside" name="" id="" class="cursor-pointer fixed w-[335px] bg-[white] rounded-xl max-h-[200px] p-2 border border-[#00000033] overflow-y-auto z-[2]">
                    <div @click="searchText='';$router.push(`/advertiser/${item.advertiser_ad_id}`)" v-for="(item,idx) in advisersData" :key="idx" class="border-b border-[#00000033] text-[12px] py-2" style="font-family: 'Eurostile Extd';">
                        {{ item.advertiser }}
                    </div>
                </div>
            </div>
        </div>
        <div class="common-container bg-white block md:hidden" style="padding: 10px;">
            <div class="flex justify-center">
                <div class=" w-[90%]" ref="searchSecMobile">
                    <div class="relative">
                        <input type="text" class="chip w-full text-[14px]" v-model="searchText" @input="search()" style="padding-left: 34px;" placeholder="Search for an advertiser here...">
                        <span class="mdi mdi-magnify absolute left-2 top-1 text-2xl"></span>
                    </div>
                    <div v-if="advisersData.length > 0 && !isClickedOutside" name="" id="" class="cursor-pointer absolute w-[80%] bg-[white] rounded-xl max-h-[200px] p-2 border border-[#00000033] overflow-y-auto z-[2]">
                        <div @click="searchText='';$router.push(`/advertiser/${item.advertiser_ad_id}`)" v-for="(item,idx) in advisersData" :key="idx" class="border-b border-[#00000033] text-[12px] py-2" style="font-family: 'Eurostile Extd';">
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
export default{
    data(){
        return {
            searchText: '',
            nation:'IN',
            isClickedOutside: false,
        }
    },
    mounted(){
        document.addEventListener("click", this.handleOutsideClick);
    },
    computed: {
        ...mapGetters({
            advisersData: "get_advertisers_search_data",
            dateRange: "get_date",
        })
    },
    methods:{
        async setNation(val){
            await this.$store.dispatch('filter_by_nation',val.target.value)
            // if(this.$route.path == 'overview')
            //     await this.$store.dispatch("set_dashboard_action", [this.dateRange, val.target.value]);
            // else{
            //     if(this.$route.name == 'advertiser-:id')
            //     {
            //         await this.$store.dispatch("set_advertisers_action", [this.dateRange, val.target.value, this.$route.params.id]);
            //     }
            // }
        },
        search(){
            this.isClickedOutside = false
            this.$store.dispatch('search_advertisers',this.searchText)
        },
        handleOutsideClick(event) {
            if (!this.$refs.searchSec.contains(event.target) || !this.$refs.searchSecMobile.contains(event.target)) {
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