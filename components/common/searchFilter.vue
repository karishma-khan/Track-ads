<template>
    <div>
        <div class="h-[72px] bg-white search px-[5%] mb-[2px] flex justify-between items-center overflow-scroll">
            <div class="flex items-center">
                <span class="mdi mdi-filter text-2xl"></span>
                <div class="chip ml-4 text-[14px]"> <span class="mdi mdi-map-marker-outline mr-2.5 text-xl"></span> India</div>
                <div class="chip ml-4 text-[14px]"> <span class="mdi mdi-calendar-blank mr-2.5 text-xl"></span> 12 Mar 2022 - 16 Mar 2022</div>
            </div>
            <div class="hidden md:block relative">
                <input type="text" name="" id="" class="chip searchAdv" style="padding-left: 34px;" placeholder="Search for an advertiser here...">
                <span class="mdi mdi-magnify absolute left-2 top-1 text-2xl"></span>
            </div>
        </div>
        <div class="common-container bg-white block md:hidden" style="padding: 10px;">
            <div class="flex justify-center">
                <div class="relative w-[90%]">
                    <input type="text" name="" id="" v-model="searchText" v-on:input="search()" class="chip w-full text-[14px]" style="padding-left: 34px;" placeholder="Search for an advertiser here...">
                    <span class="mdi mdi-magnify absolute left-2 top-1 text-2xl"></span>
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
            console.log('helo================================================================');
            this.$store.dispatch('search_advertisers',this.searchText)
        }
    }
}
</script>
<style>
.search{
border-radius: 0px 0px 10px 10px;
border: 1px 0px 0px 0px;
}
</style>