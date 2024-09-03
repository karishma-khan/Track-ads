<template>
    <div class="bg-[#C5D6B6] text-black common-container flex flex-col justify-between">
        <!-- Header section with image and title -->
        <div>
            <div class="flex gap-4">
                <img src="../static/img/trackads.svg" alt="Track Ads">
                <span class="common-heading">
                    {{ title }} <!-- Title from props -->
                </span>
            </div>
            <p class="mt-3 mb-6 common-description">
                {{ description }} <!-- Description from props -->
            </p>
        </div>
        
        <!-- Display chart and data if totalAmount is not zero -->
        <div v-if="totalAmount()">
            <!-- Doughnut chart component with data passed as a prop -->
            <doughnut-chart :chartData="chartData"></doughnut-chart>
            
            <!-- Display data in a list format -->
            <div>
                <div class="flex justify-between common-tile py-5"
                     :class="item?.format!='video' ? 'text-[#86937F]' : ''"
                     v-for="(item, index) in chartData" :key="index">
                     
                    <!-- Label with conditional styling based on 'format' -->
                    <div class="tile-label flex gap-2"
                         :style="item?.format=='video' ? 'color:#000000 !important' : ''">
                        <div class="h-[12px] w-[12px] rounded-[50%]"
                             :class="item?.format=='video' ? 'bg-[black]' : 'bg-[#86937F]'"></div>
                        {{ item?.format }} Format <span>(&#8377; {{ formatNumber(item?.impressions) }})</span>
                    </div>
                    
                    <!-- Value with percentage display -->
                    <div class="text-[20px] md:text-[24px] tile-value">
                        {{ item?.percent }} %
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Display no-data component if totalAmount is zero -->
        <no-data v-else></no-data>
    </div>
</template>

<script>
export default {
    props: ['chartData'], // Props from parent component

    data() {
        return {
            title: 'Ad Format', // Static title
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?', // Static description
        }
    },

    methods: {
        // Formats numbers with suffixes for large values
        formatNumber(value) {
            if (value >= 1e9) {
                return (value / 1e9).toFixed(1) + "b+"; // Format billions
            } else if (value >= 1e6) {
                return (value / 1e6).toFixed(1) + "m+"; // Format millions
            } else if (value >= 1e3) {
                return (value / 1e3).toFixed(1) + "k+"; // Format thousands
            } else {
                return new Intl.NumberFormat('en-US').format(value); // Format as a normal number
            }
        },

        // Calculates the total amount from the chart data
        totalAmount() {
            let res = 0;
            for (let item of this.chartData) {
                console.log(item); // Log each item (for debugging)
                res += item.amount; // Sum the amount
            }
            return res; // Return the total
        }
    }
}
</script>