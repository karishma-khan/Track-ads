<template>
    <div class="bg-[#326284] text-white text-black common-container">
        <div class="flex gap-4">
            <img src="img/SOTLogo.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <div>
            <test-chart :chartData="getChartData"></test-chart>
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
                
                labels.push(this.chartData[item]?.date)
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
            ylabel:'(in million rupees)'
        }
    }
}
</script>