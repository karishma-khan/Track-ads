<template>
    <div class="bg-[#FFFBEF] text-black common-container">
        <!-- Header section with title and buttons -->
        <div class="flex justify-between">
            <div class="flex gap-4">
                <img src="../static/img/Audience.svg" alt="Audience Icon">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <!-- Buttons for switching between Geography and Age & Gender views, visible on medium screens and larger -->
            <div class="hidden md:block">
                <button class="min-w-[130px] mr-4" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'">
                    Geography
                </button>
                <button class="min-w-[130px]" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'">
                    Age & Gender
                </button>
            </div>
        </div>
        <!-- Description text -->
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <!-- Buttons for switching between Geography and Age & Gender views, visible on small screens -->
        <div class="block md:hidden">
            <button class="min-w-[130px] mr-4" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'">
                Geography
            </button>
            <button class="min-w-[130px]" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'">
                Age & Gender
            </button>
        </div>
        <!-- Conditional rendering based on the active tab -->
        <div v-if="isActive == 1">
            <!-- Section for Geography view -->
            <div class="sm:flex items-center mb-6">
                Ads <scale-range :colors="colorArray" :range="rangeArray" class="grow ml-4"></scale-range>
            </div>
            <hexa-map v-if="hexData" :chartData="hexData"></hexa-map>
            <no-data v-else></no-data>
        </div>
        <div v-if="isActive == 2">
            <!-- Section for Age & Gender view -->
            <compare-line-chart v-if="ageData?.data?.length > 0" :chartData="ageData"></compare-line-chart>
            <no-data v-else></no-data>
        </div>
    </div>
</template>

<script>
export default {
    // Watcher to call getSepData when chartData changes
    watch: {
        chartData() {
            this.getSepData();
        }
    },
    methods: {
        // Method to process chartData and separate it into ageData and hexData
        getSepData() {
            for (let data in this.chartData) {
                if (this.chartData[data].mode == 'age_and_gender') {
                    this.ageData = this.chartData[data];
                } else {
                    this.hexData = this.chartData[data];
                    this.hexMAx = this.chartData[data].meta;
                }
            }
        }
    },
    // Lifecycle hook called after the component is mounted
    async mounted() {
        await this.getSepData(); // Process chartData
        let meta = this.hexMAx; // Maximum value for scaling
        const numberOfSegments = 4; // Number of segments for scaling
        const step = meta.max / numberOfSegments;
        // Create an array of range values for scaling
        this.rangeArray = Array.from({ length: 5 }, (_, i) => step * i);
    },
    // Lifecycle hook called after the component is updated
    updated() {
        this.getSepData(); // Re-process chartData
    },
    // Props to receive data from the parent component
    props: ['chartData', 'metaData'],
    data() {
        return {
            title: 'Audience', // Component title
            hexData: {}, // Data for the HexaMap chart
            ageData: {}, // Data for the CompareBarChart chart
            hexMAx: 0, // Maximum value for scaling
            colorArray: ['#FBE69F', '#C5D6B6', '#4CB2AC', '#326284', '#133751'], // Colors for the scale range
            rangeArray: [], // Array of range values for scaling
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?', // Component description
            isActive: 2, // Default active tab (Age & Gender)
        };
    }
}
</script>
<style>
/* Styles for inactive and active buttons */
.inactive-btn {
    width: 130px;
    min-height: 34px;
    text-align: center;
    border-radius: 6px;
    border: 1px 0px 0px 0px;
    border: 1px solid #000000;
}

.active-btn {
    width: 112px;
    min-height: 34px;
    text-align: center;
    border-radius: 6px;
    border: 1px 0px 0px 0px;
    color: white;
    background: #000000;
    border: 1px solid #000000;
}
</style>