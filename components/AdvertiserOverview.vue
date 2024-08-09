<template>
    <div class="bg-[#C5D6B6] text-black common-container flex flex-col justify-between">
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
        <div>
            <div class="flex justify-evenly mb-10 items-baseline">
                <div class="circle-first w-[40%]"></div>
                <div class="circle-second w-[25%]"></div>
                <div class="circle-third w-[15%]"></div>
            </div>
        </div>
        <div v-if="chartData">
            <div v-for="(item,index) in chartData" :key="index">
                <div v-if="item.param !== 'advertisers'" class="flex justify-between common-tile py-5">
                    <div class="flex items-center gap-2">
                        <div v-if="item.param != 'cost_per_ad'" class="h-[14px] w-[14px] rounded-[50%] capitalize" :class="item.param == 'impressions' ? 'bg-[#1D2713]' : item.param == 'money_spent' ? 'bg-[#748762]' : 'bg-[#A3BB8F]'"></div>
                        <div class="text-[14px] md:text-[16px] font-[500] capitalize text-[#808080]">{{ item.param == 'cost_per_ad' ? 'Per Ad Cost' : item.param }}</div>
                    </div>
                    <div class="text-[16px] md:text-[20px] font-[900]"> {{ item.param == 'money_spent' ? '&#8377;' : '' }}  {{ formatNumber(item.value) }}</div>
                </div>
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
    methods:{
        formatNumber(value) {
            return new Intl.NumberFormat('en-US').format(value);
        },
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