<template>
    <div class="bg-[#FFFBEF] common-container">
        <!-- Container for the word cloud with title -->
        <div class="flex gap-4">
            <img src="../static/img/imageGallery.svg" alt="Image Gallery">
            <span class="common-heading">
                {{ title }} <!-- Displays the title passed from props or default value -->
            </span>
        </div>
        <!-- Conditional rendering based on loading state -->
        <div v-if="!loading" class="w-full pt-10 flex justify-center">
            <!-- Displays the word cloud if words array has data, otherwise shows no-data component -->
            <div v-if="words.length > 0" class="w-[100%] md-w-[85%]">
                <vue-word-cloud :data="words" :rotate="rotate" :color="colorArray" :options="options" />
            </div>
            <no-data v-else></no-data>
        </div>
    </div>
</template>

<script>
    import VueWordCloud from 'vue-wordcloud'; // Import VueWordCloud component

    export default {
        components: {
            VueWordCloud, // Register VueWordCloud component
        },
        props: ['chartData'], // Receive chartData as a prop
        data() {
            return {
                title: 'Most Used Phrases', // Default title
                rotate: { from: 0, to: 0 }, // Word rotation settings
                maxFreq: 0, // Max frequency of words for color scaling
                words: [], // Array to hold word data for the word cloud
                colorArray: [], // Array to hold colors for the words
                options: {}, // Options for VueWordCloud (can be customized)
                loading: true // Loading state to show or hide content
            };
        },
        async mounted() {
            // Lifecycle hook to fetch and process data when component mounts
            await this.getMAx(); // Compute max frequency
            await this.getColors(); // Compute colors based on frequency
            this.loading = false; // Set loading to false once data is processed
        },
        methods: {
            getMAx() {
                // Processes chartData to populate words and determine max frequency
                this.words = [];
                for (let item in this.chartData) {
                    this.words.push({
                        name: this.chartData[item].word, // Word text
                        value: this.chartData[item].frequency * 10 // Frequency scaled for visualization
                    });
                    if (this.chartData[item].frequency > this.maxFreq) {
                        this.maxFreq = (this.chartData[item].frequency * 10); // Update max frequency
                    }
                }
            },
            async getColors() {
                // Computes color array based on word frequencies
                await this.getMAx(); // Ensure max frequency is up-to-date
                let temp = [];
                let first = Math.floor(this.maxFreq / 4);
                let second = Math.floor(this.maxFreq / 2);
                let third = Math.floor(this.maxFreq * (3 / 4));
                let forth = Math.floor(this.maxFreq);

                // Assign colors based on frequency ranges
                for (let i = 0; i < this.words.length; i++) {
                    let tempVal = this.words[i].value;
                    let tempColor = tempVal <= first ? '#4CB2AC' : tempVal <= second ? '#326284' : tempVal <= third ? '#162C3B' : '#041520';
                    temp.push(tempColor);
                }
                this.colorArray = temp; // Update color array
            }
        },
    };
</script>

<style>
.tooltip {
    display: none !important; /* Hides tooltips */
}
</style>
