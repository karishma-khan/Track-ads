<template>
    <div class="bg-[#C5D6B6] text-black common-container flex flex-col justify-between">
        <!-- Header section with logo and title -->
        <div>
            <div class="flex gap-4">
                <img src="../static/img/overviewLogo.svg" alt="Overview Logo">
                <span class="common-heading">
                    {{ title }} <!-- Displays the title from data or prop -->
                </span>
            </div>
            <p class="mt-3 mb-6 common-description">
                {{ description }} <!-- Displays the description from data or prop -->
            </p>
        </div>
        <!-- Circle indicators section -->
        <div>
            <div class="flex justify-evenly mb-10 items-baseline">
                <div class="circle-first w-[40%]"></div>
                <div class="circle-second w-[25%]"></div>
                <div class="circle-third w-[15%]"></div>
            </div>
        </div>
        <!-- Chart data display section -->
        <div v-if="chartData">
            <div v-for="(item, index) in chartData" :key="index">
                <!-- Display for items where param is not 'advertisers' -->
                <div v-if="item.param !== 'advertisers'" class="flex justify-between common-tile py-5">
                    <div class="flex items-center gap-2">
                        <!-- Circle color based on param value -->
                        <div v-if="item.param != 'cost_per_ad'" class="h-[14px] w-[14px] rounded-[50%] capitalize" :class="item.param == 'impressions' ? 'bg-[#1D2713]' : item.param == 'money_spent' ? 'bg-[#748762]' : 'bg-[#A3BB8F]'"></div>
                        <div class="text-[14px] md:text-[16px] font-[500] capitalize text-[#808080]">
                            <!-- Display label for the item -->
                            {{ item.param == 'cost_per_ad' ? 'Per Ad Cost' : item.param }}
                        </div>
                    </div>
                    <div class="text-[16px] md:text-[20px] font-[900]">
                        <!-- Display value with optional currency symbol -->
                        {{ item.param == 'money_spent' ? '&#8377;' : '' }} {{ formatNumber(item.value) }}
                    </div>
                </div>
            </div>
        </div>
        <!-- Fallback for when chartData is not available -->
        <no-data v-else></no-data>
    </div>
</template>

<script>
export default {
    props: ['chartData'], // Receives chartData as a prop
    methods: {
        // Formats numbers with suffixes for large values
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
        },
    },
    data() {
        return {
            title: 'Overview', // Default title
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?', // Default description
        }
    }
}
</script>