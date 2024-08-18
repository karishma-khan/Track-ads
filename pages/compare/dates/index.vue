<template>
    <div>
        <div class="bg-[#FFFFFF] text-black common-container">
            <div class="flex gap-4">
                <img src="../../../static/img/compare.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <div class="md:flex justify-between gap-[160px]">
                <div class="">
                    <p class="mt-3 mb-6 common-description">
                        {{ description }}
                    </p>
                    <common-search class="md:my-0 my-8 relative" @selected="(id) => advertiser = id "></common-search>
                </div>
                <div class="flex flex-col justify-center gap-4">
                    <div class="flex gap-4 min-w-[350px] w-full">
                        <div class="w-[70px] text-[16px] font-[800]">
                            Date 1
                        </div>
                        <common-date-picker class="grow" @dateSet="(dateArray) => dateRange1 = dateArray"></common-date-picker>
                    </div>
                    <div class="flex items-center gap-2 w-full">
                        <div class="border grow border-dashed border-[#00000033]"></div>
                        <div class="text-[14px] font-[800] text-[#00000080]">VS</div>
                        <div class="border grow border-dashed border-[#00000033]"></div>
                    </div>
                    <div class="flex gap-4 min-w-[350px] w-full">
                        <div class="w-[70px] text-[16px] font-[800]">
                            Date 2
                        </div>
                        <common-date-picker class="grow" @dateSet="(dateArray) => dateRange2 = dateArray"></common-date-picker>
                    </div>
                    <button @click="fetchAdvData()" :disabled="advertiser=='' || dateRange1.length==0 || dateRange2.length==0 " class="h-[40px] rounded-[41px] w-full disabled:bg-[#32628499] bg-[#326284] flex items-center text-white justify-center">Compare</button>
                </div>
            </div>
        </div>
        <div v-if="loading">
            <Loader />
        </div>
        <!-- <div v-else-if="firstAdvData"> -->
        <div v-else-if="firstAdvData && secondAdvData &&isData" :key="dataKey">
            <div class="block md:flex">
                <compare-overview class="md:w-1/3" :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.overview_chart, secondAdvData?.overview_chart]"></compare-overview>
                <compare-dates-active-ads class="md:w-2/3" :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.active_ads?.data, secondAdvData?.active_ads?.data]" :metaData="[]" />
            </div>
            <compare-dates-spending :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.spending_over_time?.data, secondAdvData?.spending_over_time?.data]" ></compare-dates-spending>
            <div class="md:flex">
                <compare-audience class="md:w-3/4" :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.audience, secondAdvData?.audience]"></compare-audience>
                <compare-ad-format class="md:w-1/4" :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.ad_format, secondAdvData?.ad_format]"></compare-ad-format>
            </div>
            <compare-dates-word-cloud :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.word_cloud, secondAdvData?.word_cloud]" ></compare-dates-word-cloud>
        </div>
        <div v-else-if="noData" class="bg-[#326284] text-white text-black common-container">
            <no-data></no-data>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Loader from '../../../components/loader.vue';
import advData from '../../../data/advertiser.json'
export default{
    data(){
        return{
            noData:false,
            testData:advData,
            loading:false,
            advertiser:'',
            title:'Compare',
            dateRange1:[],
            dateRange2:[],
            firstAdvData:null,
            secondAdvData:null,
            isData:false,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?',
        }
    },
    methods:{
        formatDate(objDate)
        {
            let date = new Date(objDate)
            const day = date.getDate();
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sepr", "Oct", "Nov", "Dec"]
            const monthIndex = date.getMonth();
            const month = monthNames[monthIndex];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },
        getDateString(dateArray)
        {
            let res =''
            for(let i = 0; i < dateArray.length; i++)
            {
                res+= (i==1? '-' : '') + (this.formatDate(dateArray[i]))
            }
            return res
        },
        async fetchAdvData()
        {
            this.loading = true
            this.dataKey++
            this.firstAdvData = await this.$store.dispatch('return_advertisers_action',[this.dateRange1, this.nation,this.advertiser.advertiser_ad_id])
            this.secondAdvData = await this.$store.dispatch('return_advertisers_action',[this.dateRange2, this.nation,this.advertiser.advertiser_ad_id])
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
            // let adsData = res['active_ads']?.data[0]
            // let activeAds = []
            // for(let item in adsData?.ads)
            // {
            //     activeAds.push(adsData?.ads[item])
            // }
            // res['active_ads'] = activeAds
            return res
        }
    },
    computed: {
        ...mapGetters({
            nation:"get_nation"
        })
    },
}
</script>