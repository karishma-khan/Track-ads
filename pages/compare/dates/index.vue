<template>
    <div>
        <!-- Container for the entire component -->
        <div class="bg-[#FFFFFF] text-black common-container">
            <!-- Header section with an image and title -->
            <div class="flex gap-4">
                <img src="../../../static/img/compare.svg" alt="">
                <span class="common-heading">
                    {{ title }} <!-- Display the title from data -->
                </span>
            </div>
            <!-- Main content section with two date pickers and a compare button -->
            <div class="md:flex justify-between gap-[160px]">
                <div class="">
                    <!-- Description paragraph -->
                    <p class="mt-3 mb-6 common-description">
                        {{ description }} <!-- Display the description from data -->
                    </p>
                    <!-- Search component for selecting an advertiser -->
                    <common-search class="md:my-0 my-8 relative" @selected="(id) => advertiser = id "></common-search>
                </div>
                <div class="flex flex-col justify-center gap-4">
                    <!-- Date picker for the first date range -->
                    <div class="flex gap-4 min-w-[350px] w-full">
                        <div class="w-[70px] text-[16px] font-[800]">
                            Date 1
                        </div>
                        <common-date-picker class="grow" @dateSet="(dateArray) => dateRange1 = dateArray"></common-date-picker>
                    </div>
                    <!-- Divider with 'VS' text in the middle -->
                    <div class="flex items-center gap-2 w-full">
                        <div class="border grow border-dashed border-[#00000033]"></div>
                        <div class="text-[14px] font-[800] text-[#00000080]">VS</div>
                        <div class="border grow border-dashed border-[#00000033]"></div>
                    </div>
                    <!-- Date picker for the second date range -->
                    <div class="flex gap-4 min-w-[350px] w-full">
                        <div class="w-[70px] text-[16px] font-[800]">
                            Date 2
                        </div>
                        <common-date-picker class="grow" @dateSet="(dateArray) => dateRange2 = dateArray"></common-date-picker>
                    </div>
                    <!-- Button to trigger the data comparison -->
                    <button @click="fetchAdvData()" :disabled="advertiser=='' || dateRange1.length==0 || dateRange2.length==0 " class="h-[40px] rounded-[41px] w-full disabled:bg-[#32628499] bg-[#326284] flex items-center text-white justify-center">Compare</button>
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
                <compare-overview class="md:w-1/3" :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.overview_chart, secondAdvData?.overview_chart]"></compare-overview>
                <!-- Component showing active ads comparison -->
                <compare-dates-active-ads class="md:w-2/3" :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.active_ads?.data, secondAdvData?.active_ads?.data]" :metaData="[]" />
            </div>
            <!-- Component showing spending over time comparison -->
            <compare-dates-spending :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.spending_over_time?.data, secondAdvData?.spending_over_time?.data]" ></compare-dates-spending>
            <div class="md:flex">
                <!-- Component showing audience comparison -->
                <compare-audience class="md:w-3/4" :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.audience, secondAdvData?.audience]"></compare-audience>
                <!-- Component showing ad format comparison -->
                <compare-ad-format class="md:w-1/4" :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.ad_format, secondAdvData?.ad_format]"></compare-ad-format>
            </div>
            <!-- Component showing a word cloud comparison -->
            <compare-dates-word-cloud :compareItems="[getDateString(dateRange1), getDateString(dateRange2)]" :chartData="[firstAdvData?.word_cloud, secondAdvData?.word_cloud]" ></compare-dates-word-cloud>
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
    data() {
        return {
            noData: false, // Flag to indicate if there is no data
            loading: false, // Flag to indicate if data is being fetched
            advertiser: '', // Selected advertiser ID
            title: 'Compare', // Title of the component
            dateRange1: [], // Date range for the first comparison
            dateRange2: [], // Date range for the second comparison
            firstAdvData: null, // Data for the first advertiser
            secondAdvData: null, // Data for the second advertiser
            isData: false, // Flag to indicate if data has been fetched
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?', // Description text
        }
    },
    methods: {
        // Format a date object into a readable string
        formatDate(objDate) {
            let date = new Date(objDate);
            const day = date.getDate();
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sepr", "Oct", "Nov", "Dec"];
            const monthIndex = date.getMonth();
            const month = monthNames[monthIndex];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },
        // Convert an array of dates into a formatted string
        getDateString(dateArray) {
            let res = '';
            for (let i = 0; i < dateArray.length; i++) {
                res += (i == 1 ? '-' : '') + (this.formatDate(dateArray[i]));
            }
            return res;
        },
        // Fetch data for the selected advertiser and date ranges
        async fetchAdvData() {
            this.loading = true; // Show loader
            this.dataKey++;
            this.firstAdvData = await this.$store.dispatch('return_advertisers_action', [this.dateRange1, this.nation, this.advertiser.advertiser_ad_id]);
            this.secondAdvData = await this.$store.dispatch('return_advertisers_action', [this.dateRange2, this.nation, this.advertiser.advertiser_ad_id]);
            this.firstAdvData = this.firstAdvData ? await this.processData(this.firstAdvData) : false;
            this.secondAdvData = this.secondAdvData ? await this.processData(this.secondAdvData) : false;
            console.log(this.firstAdvData == false, this.secondAdvData == false);
            if (!this.firstAdvData || !this.secondAdvData) {
                this.noData = true; // Set flag if no data is available
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
            return res;
        }
    },
    computed: {
        ...mapGetters({
            nation: "get_nation" // Get the nation from Vuex store
        })
    },
}
</script>