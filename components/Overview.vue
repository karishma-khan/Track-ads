<template>
    <div class="bg-[#C5D6B6] flex flex-col justify-between text-black common-container">
        <div>
            <div class="flex gap-4">
                <img src="../static/img/overviewLogo.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <p class="mt-3 mb-6 common-description">
                {{ description }}
            </p>
        </div>
        <div v-if="chartData">
            <div class="flex justify-between common-tile py-5" v-for="(item,index) in chartData" :key="index">
                <div class="tile-label capitalize">{{ item.param }}</div>
                <div class="tile-value"> {{ item.param == 'Money Spent' ? '&#8377;' : '' }}  {{ formatNumber(item.value) }}</div>
            </div>
        </div>
        <no-data v-else></no-data>
    </div>
</template>
<script>
import containerBox from './common/containerBox.vue'
export default{
    components:{
        containerBox
    },
    props:['chartData'],
    computed:{
        getChartData()
        {
            return this.chartData;
        }
    },
    methods:{
        formatNumber(value) {
            return new Intl.NumberFormat('en-US').format(value);
        }
    },
    data(){
        return{
            title:'Overview',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?',
            tileData:[
                {
                    name:'Ads',
                    value:'48721'
                },
                {
                    name:'Advertisers',
                    value:'3349'
                },
                {
                    name:'Money Spent',
                    value:'16.08m - 19.14m'
                },
                {
                    name:'Impressions',
                    value:'333.2m+'
                }
            ]
        }
    }
}
</script>