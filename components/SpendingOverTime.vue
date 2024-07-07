<template>
    <div class="bg-[#326284] text-white text-black common-container">
        <div class="flex gap-4">
            <img src="../static/img/SOTLogo.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <div>
            <test-chart v-if="chartData.length > 0" :chartData="getChartData"></test-chart>
            <no-data v-else></no-data>
        </div>
    </div>
</template>
<script>
import containerBox from './common/containerBox.vue'
export default{
    props:['chartData'],
    components:{
        containerBox
    },
    computed:{
        getChartData(){
            let labels = []
            let values= []
            for( let item in this.chartData)
            {
                let newDate = new Date(this.chartData[item].date)
                labels.push(newDate.getDate() + ' ' + this.monthNames[newDate.getMonth()])
                values.push(this.chartData[item]?.spending)
            }
            return { labels, values }
        }
    },
    data(){
        return{
            title:'Spending Over Time',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?',
            chartBarData:{},
            ylabel:'(in million rupees)',
            monthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sepr", "Oct", "Nov", "Dec"]
        }
    }
}
</script>