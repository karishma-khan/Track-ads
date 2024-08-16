<template>
    <div>
        <div class="bg-[#FFFFFF] text-black common-container">
            <div class="flex gap-4">
                <img src="../../../static/img/compare.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <div class="md:flex gap-6">
                <div>
                    <p class="mt-3 mb-6 common-description">
                        {{ description }}
                    </p>
                    <common-date-picker class="grow" @dateSet="(dateArray) => dateRange1 = dateArray"></common-date-picker>
                </div>
                <div class="flex flex-col  justify-center gap-4">
                    <common-search @selected="(id) => adv1 = id "></common-search>
                    <div class="flex items-center gap-2 w-full">
                        <div class="border grow border-dashed border-[#00000033]"></div>
                        <div class="text-[14px] font-[800] text-[#00000080]">VS</div>
                        <div class="border grow border-dashed border-[#00000033]"></div>
                    </div>
                    <common-search @selected="(id) => adv2 = id "></common-search>
                    <button @click="fetchAdvData()" :disabled="adv1=='' || adv2=='' || dateRange1.length==0" class="h-[40px] rounded-[41px] w-full disabled:bg-[#32628499] bg-[#326284] flex items-center text-white justify-center">Compare</button>
                </div>
            </div>
        </div>
        <!-- <div v-if="firstAdvData"> -->
        <div v-if="loading">
            <Loader />
        </div>
        <div v-else-if="firstAdvData && secondAdvData &&isData" :key="dataKey">
            <div class="block md:flex">
                <compare-overview class="md:w-1/3" :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.overview_chart, secondAdvData?.overview_chart]"></compare-overview>
                <compare-active-ads class="md:w-2/3" :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.active_ads, secondAdvData?.active_ads]" :metaData="[]" />
            </div>
            <compare-spending-over-time :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.spending_over_time, secondAdvData?.spending_over_time]" ></compare-spending-over-time>
            <div class="md:flex">
                <compare-audience class="md:w-3/4" :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.audience, secondAdvData?.audience]"></compare-audience>
                <compare-ad-format class="md:w-1/4" :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.ad_format, secondAdvData?.ad_format]"></compare-ad-format>
            </div>
            <compare-word-cloud :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.word_cloud, secondAdvData?.word_cloud]" ></compare-word-cloud>
        </div>
        <div v-else-if="noData" class="bg-[#326284] text-white text-black common-container">
            <no-data></no-data>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Loader from '../../../components/loader.vue';
// import advData from '../../../data/advertiser.json'
export default{
    methods:{
        async fetchAdvData()
        {
            this.loading = true
            this.dataKey++
            this.firstAdvData = await this.$store.dispatch('return_advertisers_action',[this.dateRange1, this.nation,this.adv1.advertiser_ad_id])
            this.secondAdvData = await this.$store.dispatch('return_advertisers_action',[this.dateRange1, this.nation,this.adv2.advertiser_ad_id])
            this.firstAdvData =  this.firstAdvData ? await this.processData( this.firstAdvData) : false
            this.secondAdvData = this.secondAdvData ? await this.processData(this.secondAdvData) : false
            console.log(this.firstAdvData == false,this.secondAdvData == false);
            if(!this.firstAdvData ||!this.secondAdvData)
            {
                this.noData = true
            }
            this.isData = true
            this.loading = false
        },
        processData( data )
        {
            let res = {}
            for(let item in data)
            {
                res[data[item]?.chart_id] = { data: data[item]?.data, meta : data[item]?.meta }
            }
            let overviewData = res['overview_chart']?.data
            let response = {}
            for(let item in overviewData)
            {
                response[overviewData[item]?.param] = overviewData[item]?.value
            }
            res['overview_chart'] = response
            let formatData = res['ad_format']?.data
            let responseFormat = {}
            for(let item in formatData)
            {
                responseFormat[formatData[item]?.format] = formatData[item]?.impressions
            }
            res['ad_format'] = responseFormat
            let adsData = res['active_ads']?.data[0]
            let activeAds = []
            for(let item in adsData?.ads)
            {
                activeAds.push(adsData?.ads[item])
            }
            res['active_ads'] = activeAds
            return res
        }
    },
    computed: {
        ...mapGetters({
            dateRange: "get_date",
            nation:"get_nation"
        })
    },
    data(){
        return{
            noData:false,
            // testData:advData,
            dateRange1:[],
            loading:false,
            dataKey:0,
            adv1:'',
            adv2:'',
            firstAdvData:null,
            secondAdvData:null,
            isData:false,
            title:'Compare',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?',
        }
    }
}
</script>