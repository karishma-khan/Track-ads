<template>
    <div class="bg-[#C5D6B6] flex flex-col justify-between text-black common-container">
        <!-- Header with title and image -->
        <div>
            <div class="flex gap-4">
                <img src="../../static/img/overviewLogo.svg" alt="Overview Logo">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <p class="mt-3 mb-6 common-description">
                {{ description }}
            </p>
            <!-- Legends for comparison items -->
            <div>
                <div class="flex gap-2 md:items-center compareLegends">
                    <!-- Color box and label for the first comparison item -->
                    <div class="max-h-[16px] min-h-[16px] max-w-[16px] min-w-[16px]" :style="{ backgroundColor: '#748762' }"></div>
                    {{ compareItems[0] }}
                </div>
                <div class="flex gap-2 md:items-center compareLegends mt-2">
                    <!-- Color box and label for the second comparison item -->
                    <div class="max-h-[16px] min-h-[16px] max-w-[16px] min-w-[16px]" :style="{ backgroundColor: '#1D2713' }"></div>
                    {{ compareItems[1] }}
                </div>
            </div>
        </div>

        <!-- Conditional rendering based on availability of chartData -->
        <div v-if="chartData">
            <!-- Impressions section -->
            <div>
                <div class="overviewHeading mt-6 mb-3">Impressions</div>
                <div class="overviewCompare">
                    <!-- Bar for the first comparison item -->
                    <div :style="'width:'+parseInt((chartData[0]?.impressions / (chartData[0]?.impressions + chartData[1]?.impressions)) * 100)+'%'" class="h-[53px] bg-[#748762] rounded-r-[40px] px-6 flex items-center text-white">
                        {{ formatNumber(chartData[0]?.impressions) }}
                    </div>
                </div>
                <div class="overviewCompare mt-1">
                    <!-- Bar for the second comparison item -->
                    <div :style="'width:'+parseInt((chartData[1]?.impressions / (chartData[0]?.impressions + chartData[1]?.impressions)) * 100)+'%'" class="h-[53px] w-[60%] bg-[#1D2713] rounded-r-[40px] px-6 flex items-center text-white">
                        {{ formatNumber(chartData[1]?.impressions) }}
                    </div>
                </div>
            </div>

            <!-- Money Spent section -->
            <div>
                <div class="overviewHeading mt-6 mb-3">Money Spent</div>
                <div class="overviewCompare">
                    <!-- Bar for the first comparison item -->
                    <div :style="'width:'+parseInt((chartData[0]?.money_spent / (chartData[0]?.money_spent + chartData[1]?.money_spent)) * 100)+'%'" class="h-[53px] bg-[#748762] rounded-r-[40px] px-6 flex items-center text-white">
                        {{ formatNumber(chartData[0]?.money_spent) }}
                    </div>
                </div>
                <div class="overviewCompare mt-1">
                    <!-- Bar for the second comparison item -->
                    <div :style="'width:'+parseInt((chartData[1]?.money_spent / (chartData[0]?.money_spent + chartData[1]?.money_spent)) * 100)+'%'" class="h-[53px] w-[60%] bg-[#1D2713] rounded-r-[40px] px-6 flex items-center text-white">
                        {{ formatNumber(chartData[1]?.money_spent) }}
                    </div>
                </div>
            </div>

            <!-- Ads section -->
            <div>
                <div class="overviewHeading mt-6 mb-3">Ads</div>
                <div class="overviewCompare">
                    <!-- Bar for the first comparison item -->
                    <div :style="'width:'+parseInt((chartData[0]?.ads / (chartData[0]?.ads + chartData[1]?.ads)) * 100)+'%'" class="h-[53px] bg-[#748762] rounded-r-[40px] px-6 flex items-center text-white">
                        {{ formatNumber(chartData[0]?.ads) }}
                    </div>
                </div>
                <div class="overviewCompare mt-1">
                    <!-- Bar for the second comparison item -->
                    <div :style="'width:'+parseInt((chartData[1]?.ads / (chartData[0]?.ads + chartData[1]?.ads)) * 100)+'%'" class="h-[53px] w-[60%] bg-[#1D2713] rounded-r-[40px] px-6 flex items-center text-white">
                        {{ formatNumber(chartData[1]?.ads) }}
                    </div>
                </div>
            </div>
        </div>
        <!-- No data component if no chartData is available -->
        <no-data v-else></no-data>
    </div>
</template>

<script>
export default {
    props: ['compareItems', 'chartData'],
    methods: {
        // Format numbers with appropriate suffixes (k, m, b)
        formatNumber(value) {
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
            title: 'Overview',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?'
        }
    }
}
</script>
