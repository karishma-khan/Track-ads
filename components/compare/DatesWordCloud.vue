<template>
    <div class="bg-[#FFFBEF] common-container">
        <!-- Header with title and image -->
        <div class="flex gap-4">
            <img src="../../static/img/imageGallery.svg" alt="Image Gallery">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>

        <!-- Slider control for toggling between word cloud data sets -->
        <div class="my-4 flex justify-center items-center gap-6 h-[48px] w-full bg-[#0000001A] border-y border-[#00000033]">
            <!-- Button for the first data set -->
            <div @click="isActive = 1" :class="isActive == 2 ? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center">
                <span class="mdi-18px mdi mdi-chevron-left"></span>
            </div>
            <!-- Display the active compare item -->
            <div class="compareSlider">{{ isActive == 1 ? compareItems[0] : compareItems[1] }}</div>
            <!-- Button for the second data set -->
            <div @click="isActive = 2" :class="isActive == 1 ? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center">
                <span class="mdi-18px mdi mdi-chevron-right"></span>
            </div>
        </div>

        <!-- Word cloud display based on active state -->
        <div v-if="!loading" class="w-full pt-10 flex justify-center">
            <div v-if="getWords.length > 0" class="w-[100%] md:w-[85%]">
                <!-- Word cloud component with data binding -->
                <vue-word-cloud :data="getWords" :rotate="rotate" :color="getColorArray" :options="options" />
            </div>
            <!-- No data component if no words are available -->
            <no-data v-else></no-data>
        </div>
    </div>
</template>

<script>
import VueWordCloud from 'vue-wordcloud'; // Importing VueWordCloud component

export default {
    components: {
        VueWordCloud, // Registering VueWordCloud component
    },
    computed: {
        // Compute the words based on the active state
        getWords() {
            return this.isActive == 1 ? this.firstWords : this.secondWords;
        },
        // Compute the color array based on the active state
        getColorArray() {
            return this.isActive == 1 ? this.colorFirstArray : this.colorSecondArray;
        }
    },
    props: ['chartData', 'compareItems'],
    data() {
        return {
            title: 'Most Used Phrases',
            rotate: { from: 0, to: 0 }, // Rotation settings for the word cloud
            maxFirstFreq: 0, // Maximum frequency for the first data set
            maxSecondFreq: 0, // Maximum frequency for the second data set
            firstWords: [], // Words data for the first data set
            secondWords: [], // Words data for the second data set
            colorFirstArray: [], // Color array for the first data set
            colorSecondArray: [], // Color array for the second data set
            options: {}, // Options for the word cloud
            loading: true, // Loading state
            isActive: 1, // Active data set indicator
            randomColor: ['#4CB2AC', '#326284', '#162C3B', '#041520'] // Array of random colors
        };
    },
    async mounted() {
        // Initialize data after component mounts
        this.firstWords = await this.getMAx(this.chartData[0], true);
        this.secondWords = await this.getMAx(this.chartData[1], false);
        this.colorFirstArray = await this.getColors(this.firstWords, true);
        this.colorSecondArray = await this.getColors(this.secondWords, false);
        this.loading = false; // Update loading state
    },
    methods: {
        // Process data to extract words and their frequencies
        getMAx(data, isFirst) {
            let words = [];
            for (let item in data?.data) {
                words.push({
                    name: data?.data[item]?.word,
                    value: data?.data[item]?.frequency * 10 // Adjust value for visibility
                });
                // Update maximum frequency value
                if (data?.data[item]?.frequency > (isFirst ? this.maxFirstFreq : this.maxSecondFreq)) {
                    if (isFirst) {
                        this.maxFirstFreq = (data?.data[item]?.frequency * 10);
                    } else {
                        this.maxSecondFreq = (data?.data[item]?.frequency * 10);
                    }
                }
            }
            return words;
        },
        // Generate color array based on frequency values
        async getColors(data, isFirst) {
            let temp = [];
            const step = Math.floor((isFirst ? this.maxFirstFreq : this.maxSecondFreq) / 4); // Size of each color range
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
/* Hide tooltips globally */
.tooltip {
    display: none !important;
}
</style>
