<template>
    <div class="bg-[#C5D6B6] flex flex-col justify-between text-black common-container">
        <!-- Header section with title and description -->
        <div>
            <div class="flex gap-4">
                <!-- Image logo -->
                <img src="../static/img/overviewLogo.svg" alt="Overview Logo">
                
                <!-- Title from props -->
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <!-- Description from props -->
            <p class="mt-3 mb-6 common-description">
                {{ description }}
            </p>
        </div>
        
        <!-- Data section displayed if chartData is available -->
        <div class="grow flex flex-col justify-between" v-if="chartData">
            <div class="flex justify-between common-tile py-5 grow items-center" v-for="(item, index) in chartData" :key="index">
                <!-- Label for each data item -->
                <div class="tile-label capitalize">{{ item.param }}</div>
                
                <!-- Value with currency formatting if applicable -->
                <div class="tile-value">
                    {{ item.param == 'Money Spent' ? '&#8377;' : '' }}  {{ formatNumber(item.value) }}
                </div>
            </div>
        </div>
        
        <!-- No data component displayed if chartData is not available -->
        <no-data v-else></no-data>
    </div>
</template>

<script>
export default {
    // Props passed to the component
    props: ['chartData'],
    
    // Computed properties
    computed: {
        getChartData() {
            // Returns the chartData prop
            return this.chartData;
        }
    },
    methods: {
        formatNumber(value) {
            // Formats numbers into a more readable format (e.g., '1.2m', '3.4b')
            if (value >= 1e9) {
                return (value / 1e9).toFixed(1) + "b+";
            } else if (value >= 1e6) {
                return (value / 1e6).toFixed(1) + "m+";
            } else if (value >= 1e3) {
                return (value / 1e3).toFixed(1) + "k+";
            } else {
                return new Intl.NumberFormat('en-US').format(value);
            }
        }
    },
    data() {
        return {
            // Default title and description
            title: 'Overview',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?',
        }
    }
}
</script>