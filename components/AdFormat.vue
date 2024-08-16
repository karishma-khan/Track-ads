<template>
    <div class="bg-[#C5D6B6] text-black common-container flex flex-col justify-between">
        <div>
            <div class="flex gap-4">
                <img src="../static/img/trackads.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <p class="mt-3 mb-6 common-description">
                {{ description }}
            </p>
        </div>
        <div v-if="totalAmount()">
            <test-doughnut :chartData="chartData"></test-doughnut>
            <div>
                <div class="flex justify-between common-tile py-5" :class="item?.format!='video' ? 'text-[#86937F]' : ''" v-for="(item,index) in chartData" :key="index">
                    <div class="tile-label flex gap-2" :style="item?.format=='video' ? 'color:#000000 !important' : ''">
                        <div class="h-[12px] w-[12px] rounded-[50%]" :class="item?.format=='video' ? 'bg-[black]' : 'bg-[#86937F]'"></div>
                        {{ item?.format }} Format <span>(&#8377; {{ formatNumber(item?.impressions) }})</span>
                    </div>
                    <div class="text-[20px] md:text-[24px] tile-value">{{ item?.percent }} %</div>
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
    data(){
        return{
            title:'Ad Format',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?',
            tileData:[
                {
                    name:'Placeholder',
                    value:'25%'
                },
                {
                    name:'Placeholder',
                    value:'75%'
                }
            ]
        }
    },
    methods:{
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
        totalAmount()
        {
            let res = 0
            for(let item of this.chartData)
            {
                console.log(item);
                res += item.amount
            }
            return res
        }
    }
}
</script>