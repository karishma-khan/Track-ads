<template>
    <div class="bg-[#C5D6B6] text-black common-container flex flex-col justify-between">
        <!-- Header section with logo and title -->
        <div>
            <div class="flex gap-4">
                <img src="../../static/img/trackads.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <!-- Description paragraph -->
            <p class="mt-3 mb-6 common-description">
                {{ description }}
            </p>
        </div>
        <!-- Comparison legends -->
        <div class="flex items-center">
            <div class="flex gap-2 md:items-center compareLegends">
                <div class="max-h-[16px] min-h-[16px] max-w-[16px] min-w-[16px]" :style="{ backgroundColor: '#748762' }"></div> image
            </div>
            <div class="flex gap-2 md:items-center compareLegends ml-4">
                <div class="max-h-[16px] min-h-[16px] max-w-[16px] min-w-[16px]" :style="{ backgroundColor: '#1D2713' }"></div> video
            </div>
        </div>
        <!-- Conditional rendering of chart or no data component -->
        <compare-bar-group-chart v-if="totalAmount() > 0" :chartData="chartData" :compareItems="compareItems" class="my-6"></compare-bar-group-chart>
        <no-data v-else></no-data>
    </div>
</template>

<script>
export default {
    // Define component props
    props: ['chartData', 'compareItems'],

    // Define component data
    data() {
        return {
            title: 'Ad Format', // Default title
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?', // Default description
        }
    },

    methods: {
        // Format numbers with suffixes (k, m, b)
        formatNumber(value) {
            if (value >= 1e9) {
                return (value / 1e9).toFixed(1) + "b+";
            } else if (value >= 1e6) {
                return (value / 1e6).toFixed(1) + "m+";
            } else if (value >= 1e3) {
                return (value / 1e3).toFixed(1) + "k+";
            } else {
                return new Intl.NumberFormat('en-US').format(value); // Format number with commas
            }
        },

        // Calculate the total amount from chartData
        totalAmount() {
            let res = 0;
            for (let item of this.chartData) {
                for (let i in item) {
                    res += item[i]; // Sum up all values in chartData
                }
            }
            return res;
        }
    }
}
</script>