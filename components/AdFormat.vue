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
        <test-doughnut></test-doughnut>
        <div>
            <div class="flex justify-between common-tile py-5" v-for="(item,index) in tileData" :key="index">
                <div class="tile-label">{{ item.name }}</div>
                <div class="tile-value"> {{ item.name == 'Money Spent' ? '&#8377;' : '' }}  {{ item.value }}</div>
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
    data(){
        return{
            title:'Ad Format',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?',
            chartData:{
                label:[]
            },
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