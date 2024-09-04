<template>
    <div class="bg-[#FFFBEF] text-black common-container">
        <!-- Header section with logo and title -->
        <div class="flex justify-between">
            <div class="flex gap-4">
                <img src="../../static/img/Audience.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <!-- Toggle buttons for different views -->
            <div class="hidden md:block">
                <button class="min-w-[130px] mr-4" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'">
                    Geography
                </button>
                <button class="min-w-[130px]" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'">
                    Age & Gender
                </button>
            </div>
        </div>
        <!-- Description paragraph -->
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <!-- Mobile view toggle buttons -->
        <div class="block md:hidden">
            <button class="min-w-[130px] mr-4" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'">
                Geography
            </button>
            <button class="min-w-[130px]" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'">
                Age & Gender
            </button>
        </div>
        <!-- Slider control for comparing data -->
        <div class="my-4 flex justify-center items-center gap-6 h-[48px] w-full bg-[#0000001A] border-y border-[#00000033]">
            <div @click="whichParty = 1" :class="whichParty == 2 ? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center">
                <span class="mdi-18px mdi mdi-chevron-left"></span>
            </div>
            <div class="compareSlider">{{ whichParty == 1 ? compareItems[0] : compareItems[1] }}</div>
            <div @click="whichParty = 2" :class="whichParty == 1 ? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center">
                <span class="mdi-18px mdi mdi-chevron-right"></span>
            </div>
        </div>
        <!-- Conditional rendering of content based on selected view -->
        <div v-if="isActive == 1">
            <!-- Display scale range and hex map if data is available -->
            <div class="sm:flex items-center mb-6">
                Ads <scale-range :colors="colorArray" :range="rangeArray" class="grow ml-4"></scale-range>
            </div>
            <hexa-map :key="hexKey" v-if="getHexData" :chartData="{data : getHexData}"></hexa-map>
            <no-data v-else></no-data>
        </div>
        <div v-if="isActive == 2">
            <!-- Display line chart if data is available -->
            <compare-line-chart :key="ageKey" v-if="(getAgeData).length > 0" :chartData="{data : getAgeData}"></compare-line-chart>
            <no-data v-else></no-data>
        </div>
    </div>
</template>

<script>
export default {
    // Watch for changes in chartData and call getSepData method
    watch: {
        chartData() {
            this.getSepData();
        }
    },

    // Computed properties to get data for charts based on the selected party
    computed: {
        getAgeData() {
            this.ageKey++;
            return this.whichParty == 1 ? this.ageFirstData : this.ageSecondData;
        },
        getHexData() {
            this.hexKey++;
            return this.whichParty == 1 ? this.hexFirstData : this.hexSecondData;
        }
    },

    methods: {
        // Method to separate data into different categories based on mode
        getSepData() {
            if (this.chartData && this.chartData?.length == 2) {
                for (let data in this.chartData[0]?.data) {
                    if (this.chartData[0]?.data[data]) {
                        if (this.chartData[0]?.data[data]?.mode == 'age_and_gender')
                            this.ageFirstData = this.chartData[0]?.data[data]?.data;
                        else {
                            this.hexFirstData = this.chartData[0]?.data[data]?.data;
                            this.hexFirstMAx = this.chartData[0]?.data[data]?.meta;
                        }
                    }
                }
                for (let data in this.chartData[1]?.data) {
                    if (this.chartData[1]?.data[data]) {
                        if (this.chartData[1]?.data[data]?.mode == 'age_and_gender')
                            this.ageSecondData = this.chartData[1]?.data[data]?.data;
                        else {
                            this.hexSecondData = this.chartData[1]?.data[data]?.data;
                            this.hexSecondMAx = this.chartData[1]?.data[data]?.meta;
                        }
                    }
                }
            }
        }
    },

    // Lifecycle hooks
    async mounted() {
        await this.getSepData();
        let meta = this.whichParty == 1 ? this.hexFirstMAx : this.hexSecondMAx;
        // Initialize range array for scale based on meta data
        const numberOfSegments = 4;
        const step = meta.max / numberOfSegments;
        this.rangeArray = Array.from({ length: 5 }, (_, i) => step * i);
    },

    updated() {
        this.getSepData();
    },

    // Component properties
    props: ['chartData', 'metaData', 'compareItems'],

    // Component data
    data() {
        return {
            title: 'Audience', // Default title
            hexKey: 0,
            ageKey: 0,
            hexFirstData: {}, // Data for the first party's hex map
            hexSecondData: {}, // Data for the second party's hex map
            ageFirstData: {}, // Data for the first party's age & gender chart
            ageSecondData: {}, // Data for the second party's age & gender chart
            hexFirstMAx: 0, // Meta data for the first party's hex map
            hexSecondMAx: 0, // Meta data for the second party's hex map
            colorArray: ['#FBE69F', '#C5D6B6', '#4CB2AC', '#326284', '#133751'], // Color array for scale
            rangeArray: [], // Range array for scale
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?', // Default description
            isActive: 2, // Active tab (1 for Geography, 2 for Age & Gender)
            whichParty: 1 // Selected party for comparison
        }
    }
}
</script>

<style>
/* Button styles for active and inactive states */
.inactive-btn {
    width: 130px;
    min-height: 34px;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #000000;
}
.active-btn {
    width: 112px;
    min-height: 34px;
    text-align: center;
    border-radius: 6px;
    color: white;
    background: #000000;
    border: 1px solid #000000;
}
</style>
