<template>
    <div class="bg-[#FFFBEF] common-container">
        <!-- Container for title and action buttons -->
        <div class="flex justify-between">
            <div class="flex gap-4">
                <!-- Image and title section -->
                <img src="../../static/img/imageGallery.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <div class="md:block hidden">
                <!-- Buttons for switching between comparison items on larger screens -->
                <button class="min-w-[130px] mr-4 px-2" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'" style="width: unset !important;">
                    {{compareItems[0]}}
                </button>
                <button class="min-w-[130px] px-2" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'" style="width: unset !important;">
                    {{compareItems[1]}}
                </button>
            </div>
        </div>
        <div class="block md:hidden flex flex-col gap-4 mt-6">
            <!-- Buttons for switching between comparison items on smaller screens -->
            <button class="min-w-[130px] mr-4 px-2" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'" style="width: unset !important;">
                {{compareItems[0]}}
            </button>
            <button class="min-w-[130px] px-2" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'" style="width: unset !important;">
                {{compareItems[1]}}
            </button>
        </div>
        <!-- Display the word cloud or no-data component based on loading state and data availability -->
        <div v-if="!loading" class="w-full pt-10 flex justify-center">
            <div v-if="getWords.length > 0" class="w-[100%] md-w-[85%]">
                <vue-word-cloud :data="getWords" :rotate="rotate" :color="getColorArray" :options="options" />
            </div>
            <no-data v-else></no-data>
        </div>
    </div>
</template>

<script>
import VueWordCloud from 'vue-wordcloud';  // Import the word cloud component

export default {
    components: {
        VueWordCloud,  // Register the word cloud component
    },
    computed: {
        // Returns the appropriate word data based on the active button
        getWords() {
            return this.isActive == 1 ? this.firstWords : this.secondWords;
        },
        // Returns the appropriate color array based on the active button
        getColorArray() {
            return this.isActive == 1 ? this.colorFirstArray : this.colorSecondArray;
        }
    },
    props: ['chartData', 'compareItems'],  // Props for chart data and comparison items
    data() {
        return {
            isActive: 1,  // Determines which comparison item is active
            title: 'Most Used Phrases',  // Title for the component
            rotate: { from: 0, to: 0 },  // Rotation settings for the word cloud
            maxFirstFreq: 0,  // Maximum frequency for the first data set
            maxSecondFreq: 0,  // Maximum frequency for the second data set
            firstWords: [],  // Array for words from the first data set
            secondWords: [],  // Array for words from the second data set
            colorFirstArray: [],  // Array of colors for the first data set
            colorSecondArray: [],  // Array of colors for the second data set
            options: {},  // Options for the word cloud component
            loading: true  // Loading state
        };
    },
    async mounted() {
        // Fetch and process data when the component is mounted
        this.firstWords = await this.getMAx(this.chartData[0], true);
        this.secondWords = await this.getMAx(this.chartData[1], false);
        this.colorFirstArray = await this.getColors(this.firstWords, true);
        this.colorSecondArray = await this.getColors(this.secondWords, false);
        this.loading = false;  // Update loading state
    },
    methods: {
        // Processes data into a format suitable for the word cloud
        getMAx(data, isFirst) {
            let words = [];
            for (let item in data?.data) {
                words.push({
                    name: data?.data[item]?.word,
                    value: data?.data[item]?.frequency * 10  // Scale frequency
                });
                if (data?.data[item]?.frequency > (isFirst ? this.maxFirstFreq : this.maxSecondFreq)) {
                    if (isFirst)
                        this.maxFirstFreq = (data?.data[item]?.frequency * 10);
                    else
                        this.maxSecondFreq = (data?.data[item]?.frequency * 10);
                }
            }
            return words;
        },
        // Determines colors based on frequency values
        async getColors(data, isFirst) {
            let temp = [];
            const step = Math.floor((isFirst ? this.maxFirstFreq : this.maxSecondFreq) / 4);  // Divide frequency range into steps
            const first = step;
            const second = 2 * step;
            const third = 3 * step;
            for (let i = 0; i < data.length; i++) {
                let tempVal = data[i].value;
                let tempColor = tempVal <= first ? '#4CB2AC' :
                                tempVal <= second ? '#326284' :
                                tempVal <= third ? '#162C3B' : '#041520';
                temp.push(tempColor);
            }
            return temp;
        }
    }
};
</script>

<style>
.tooltip {
    display: none !important;
}
</style>
