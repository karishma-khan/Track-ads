<template>
    <div class="bg-[#326284] text-white common-container">
        <!-- Header section with logo and title -->
        <div class="flex gap-4">
            <img src="../static/img/pages.svg" alt="Pages Logo">
            <span class="common-heading">
                {{ title }} <!-- Displays the title from data or prop -->
            </span>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }} <!-- Displays the description from data or prop -->
        </p>
        <!-- Data display section with grid layout -->
        <div v-if="chartData" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(item, index) in chartData" :key="index">
                <!-- Fund tile component -->
                <div 
                    class="fundTile relative box-border overflow-hidden" 
                    @click="getPageData(item.pageId)" 
                    :class="selectedTile == item.pageId ? 'border-2 border-black' : ''"
                >
                    <!-- Checkmark indicator for selected tile -->
                    <div v-if="selectedTile == item.pageId" class="absolute rounded-bl-xl top-0 right-0 h-6 w-6 items-center flex font-black justify-center text-white bg-black">
                        <span class="mdi mdi-check"></span>
                    </div>
                    <!-- Tile header -->
                    <div class="fundHead">{{ item.pageName }}</div>
                    <div class="flex items-center text-[#808080]">
                        <!-- Ads information -->
                        <div>
                            <div class="fundSubHead">Ads</div>
                            <div class="fundSpend">{{ formatNumber(item.amount) }}</div>
                        </div>
                        <div class="grow flex justify-center">
                            <!-- Money spent information -->
                            <div>
                                <div class="fundSubHead">Money Spent</div>
                                <div class="fundSpend">
                                    {{ formatNumber(item.spending?.min) }} - {{ formatNumber(item.spending?.max) }}
                                </div>
                            </div>
                        </div>
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
        // Navigates to a new URL with the pageId as a query parameter
        async getPageData(pageId) {
            window.location.href = this.$route.path + '?pageId=' + pageId;
        }
    },
    data() {
        return {
            title: 'Pages Funded', // Default title
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? dolor sit amet consectetur adipisicing elit. Nemo, molestiae?', // Default description
            selectedTile: null // Stores the ID of the selected tile
        }
    },
    mounted() {
        // Sets the selectedTile based on the pageId query parameter from the route
        this.selectedTile = this.$route?.query?.pageId;
    }
}
</script>