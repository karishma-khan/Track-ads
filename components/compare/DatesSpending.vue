<template>
    <div class="bg-[#326284] text-white text-black common-container">
        <!-- Header with title and image -->
        <div class="flex gap-4">
            <img src="../../static/img/SOTLogo.svg" alt="SOT Logo">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>

        <!-- Description text -->
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>

        <!-- Slider control for toggling between data sets -->
        <div class="flex justify-center items-center gap-6 h-[48px] w-full bg-[#0000001A] border-y border-[#00000033]">
            <!-- Button for the first data set -->
            <div @click="isActive = 1" :class="isActive == 2 ? 'bg-[white] text-[black]' : 'bg-[#FFFFFF1A] text-[#0000001A]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center">
                <span class="mdi-18px mdi mdi-chevron-left"></span>
            </div>
            <!-- Display the active compare item -->
            <div class="compareSlider text-[white]">
                {{ isActive == 1 ? compareItems[0] : compareItems[1] }}
            </div>
            <!-- Button for the second data set -->
            <div @click="isActive = 2" :class="isActive == 1 ? 'bg-[white] text-[black]' : 'bg-[#FFFFFF1A] text-[#0000001A]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center">
                <span class="mdi-18px mdi mdi-chevron-right"></span>
            </div>
        </div>

        <!-- Chart display based on active state -->
        <div>
            <test-chart v-if="(isActive == 1 ? getFirstChartData?.values : getSecondChartData?.values).length > 0" :chartData="isActive == 1 ? getFirstChartData : getSecondChartData"></test-chart>
            <no-data v-else></no-data>
        </div>
    </div>
</template>

<script>
export default {
    props: ['chartData', 'compareItems'],
    computed: {
        // Process data for the first chart
        getFirstChartData() {
            let labels = [];
            let values = [];
            for (let item in this.chartData[0]) {
                let newDate = new Date(this.chartData[0][item].date);
                labels.push(newDate.getDate() + ' ' + this.monthNames[newDate.getMonth()]);
                values.push(this.chartData[0][item]?.spending);
            }
            return { labels, values };
        },
        // Process data for the second chart
        getSecondChartData() {
            let labels = [];
            let values = [];
            for (let item in this.chartData[1]) {
                let newDate = new Date(this.chartData[1][item].date);
                labels.push(newDate.getDate() + ' ' + this.monthNames[newDate.getMonth()]);
                values.push(this.chartData[1][item]?.spending);
            }
            return { labels, values };
        }
    },
    data() {
        return {
            title: 'Spending Over Time',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?',
            chartBarData: {},
            isActive: 1, // Determines which data set is currently active
            ylabel: '(in million rupees)',
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] // Array of month names
        }
    }
}
</script>