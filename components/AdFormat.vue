<template>
    <div class="bg-[#C5D6B6] text-black common-container flex flex-col justify-between">
        <div>
            <div class="flex gap-4">
                <img src="img/trackads.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <p class="mt-3 mb-6 common-description">
                {{ description }}
            </p>
        </div>
        <test-doughnut :chartData="chartData"></test-doughnut>
        <div>
            <div class="flex justify-between common-tile py-5" :class="item.format=='video' ? 'text-[#86937F]' : ''" v-for="(item,index) in chartData" :key="index">
                <div class="tile-label" :class="item.format=='video' ? 'text-[#86937F]' : ''">{{ item.format }} Format
                    <span>(${{ (item.impressions / 1000000) }}B)</span>
                </div>
                <div class="tile-value">{{ item.percent }}</div>
            </div>
        </div>
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
    }
}
</script>