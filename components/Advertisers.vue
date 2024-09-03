<template>
    <div class="bg-[#FFFBEF] text-black common-container">
        <!-- Header with image and title -->
        <div class="flex gap-4">
            <!-- Image for Audience section -->
            <img src="../static/img/Audience.svg" alt="Audience Icon">
            
            <!-- Title for the component -->
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        
        <!-- Description text for the component -->
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        
        <!-- Range display for ads with color scaling -->
        <div class="sm:flex items-start text-[14px] md:text-[16px]">
            Ads 
            <!-- Scale range component to display the color gradient and ranges -->
            <scale-range :colors="colorArray" :range="rangeArray" class="grow ml-4"></scale-range>
        </div>
        
        <!-- Scatter plot to display chart data if available -->
        <scatter-plot v-if="chartData" :chartData="chartData"></scatter-plot>
        
        <!-- No data component to show when chartData is not available -->
        <no-data v-else></no-data>
    </div>
</template>

<script>
export default {
    // Props passed from the parent component
    props: ['chartData', 'metaData'],
    
    data() {
        return {
            // Default title and description for the component
            title: 'Advertisers',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lor.',
            // Arrays for colors and range to be used in the scale-range component
            colorArray: ['#FBE69F', '#C5D6B6', '#4CB2AC', '#326284', '#133751'],
            rangeArray: []
        }
    },

    mounted() {
        // Calculate the rangeArray based on metaData when the component is mounted
        // Define the number of segments for the range
        // Calculate the step size for each segment based on the maximum amount
        // Generate the rangeArray dynamically based on the step size
        let meta = this.metaData;
        const numberOfSegments = 4;
        const step = meta?.amount?.max / numberOfSegments;
        this.rangeArray = Array.from({ length: 5 }, (_, i) => step * i);
    }
}
</script>
