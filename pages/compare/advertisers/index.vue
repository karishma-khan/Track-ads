<template>
    <div>
        <!-- Container for the comparison component -->
        <div class="bg-[#FFFFFF] text-black common-container">
            <!-- Header with an image and title -->
            <div class="flex gap-4">
                <img src="../../../static/img/compare.svg" alt="">
                <span class="common-heading">
                    {{ title }} <!-- Display the title from data -->
                </span>
            </div>
            <!-- Main section with search inputs and comparison button -->
            <div class="md:flex gap-6">
                <div>
                    <!-- Description text -->
                    <p class="mt-3 mb-6 common-description">
                        {{ description }} <!-- Display the description from data -->
                    </p>
                </div>
                <div class="flex flex-col justify-center gap-4">
                    <!-- First search component for selecting the first advertiser -->
                    <common-search @selected="(id) => adv1 = id "></common-search>
                    <!-- Divider with 'VS' text in the middle -->
                    <div class="flex items-center gap-2 w-full">
                        <div class="border grow border-dashed border-[#00000033]"></div>
                        <div class="text-[14px] font-[800] text-[#00000080]">VS</div>
                        <div class="border grow border-dashed border-[#00000033]"></div>
                    </div>
                    <!-- Second search component for selecting the second advertiser -->
                    <common-search @selected="(id) => adv2 = id "></common-search>
                    <!-- Button to trigger the data comparison -->
                    <button @click="fetchAdvData()" :disabled="adv1=='' || adv2==''" class="h-[40px] rounded-[41px] w-full disabled:bg-[#32628499] bg-[#326284] flex items-center text-white justify-center">Compare</button>
                </div>
            </div>
        </div>
        <!-- Loader displayed while data is being fetched -->
        <div v-if="loading">
            <Loader />
        </div>
        <!-- Content displayed when data is available -->
        <div v-else-if="firstAdvData && secondAdvData && isData" :key="dataKey">
            <div class="block md:flex">
                <!-- Component showing an overview of the comparison -->
                <compare-overview class="md:w-1/3" :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.overview_chart, secondAdvData?.overview_chart]"></compare-overview>
                <!-- Component showing active ads comparison -->
                <compare-active-ads class="md:w-2/3" :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.active_ads, secondAdvData?.active_ads]" :metaData="[]" />
            </div>
            <!-- Component showing spending over time comparison -->
            <compare-spending-over-time :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.spending_over_time, secondAdvData?.spending_over_time]" ></compare-spending-over-time>
            <div class="md:flex">
                <!-- Component showing audience comparison -->
                <compare-audience class="md:w-3/4" :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.audience, secondAdvData?.audience]"></compare-audience>
                <!-- Component showing ad format comparison -->
                <compare-ad-format class="md:w-1/4" :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.ad_format, secondAdvData?.ad_format]"></compare-ad-format>
            </div>
            <!-- Component showing a word cloud comparison -->
            <compare-word-cloud :compareItems="[adv1.advertiser, adv2.advertiser]" :chartData="[firstAdvData?.word_cloud, secondAdvData?.word_cloud]" ></compare-word-cloud>
        </div>
        <!-- Message displayed when no data is available -->
        <div v-else-if="noData" class="bg-[#326284] text-white text-black common-container">
            <no-data></no-data>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '../../../components/loader.vue';

export default {
    methods: {
        // Fetch data for the selected advertisers and date range
        async fetchAdvData() {
            this.loading = true; // Show loader while fetching data
            this.dataKey++; // Increment data key for reactivity
            // Fetch data for the first and second advertisers
            this.firstAdvData = await this.$store.dispatch('return_advertisers_action', [this.dateRange, this.nation, this.adv1.advertiser_ad_id]);
            this.secondAdvData = await this.$store.dispatch('return_advertisers_action', [this.dateRange, this.nation, this.adv2.advertiser_ad_id]);
            // Process the fetched data
            this.firstAdvData = this.firstAdvData ? await this.processData(this.firstAdvData) : false;
            this.secondAdvData = this.secondAdvData ? await this.processData(this.secondAdvData) : false;
            console.log(this.firstAdvData == false, this.secondAdvData == false);
            // Set flag if no data is available
            if (!this.firstAdvData || !this.secondAdvData) {
                this.noData = true;
            }
            this.isData = true; // Set flag indicating data is available
            this.loading = false; // Hide loader
        },
        // Process raw data into a structured format
        processData(data) {
            let res = {};
            for (let item in data) {
                res[data[item]?.chart_id] = { data: data[item]?.data, meta: data[item]?.meta };
            }
            // Format overview data
            let overviewData = res['overview_chart']?.data;
            let response = {};
            for (let item in overviewData) {
                response[overviewData[item]?.param] = overviewData[item]?.value;
            }
            res['overview_chart'] = response;
            // Format ad format data
            let formatData = res['ad_format']?.data;
            let responseFormat = {};
            for (let item in formatData) {
                responseFormat[formatData[item]?.format] = formatData[item]?.impressions;
            }
            res['ad_format'] = responseFormat;
            // Process active ads data
            let adsData = res['active_ads']?.data[0];
            let activeAds = [];
            for (let item in adsData?.ads) {
                activeAds.push(adsData?.ads[item]);
            }
            res['active_ads'] = activeAds;
            return res;
        }
    },
    computed: {
        // Map Vuex getters to component computed properties
        ...mapGetters({
            dateRange: "get_date", // Get the date range from Vuex store
            nation: "get_nation" // Get the nation from Vuex store
        })
    },
    data() {
        return {
            noData: false, // Flag to indicate if there is no data
            loading: false, // Flag to indicate if data is being fetched
            dataKey: 0, // Key for data reactivity
            adv1: '', // Selected first advertiser
            adv2: '', // Selected second advertiser
            firstAdvData: null, // Data for the first advertiser
            secondAdvData: null, // Data for the second advertiser
            isData: false, // Flag to indicate if data has been fetched
            title: 'Compare', // Title of the component
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?', // Description text
        }
    }
}
</script>