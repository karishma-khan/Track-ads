<template>
    <div class="bg-[#C5D6B6] text-black common-container flex flex-col justify-between">
        <div>
            <div class="flex gap-4">
                <img src="img/overviewLogo.svg" alt="">
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