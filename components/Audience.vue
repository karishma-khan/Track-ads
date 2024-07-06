<template>
    <div class="bg-[#FFFBEF] text-black common-container">
        <div class="flex justify-between">
            <div class="flex gap-4">
                <img src="../static/img/Audience.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <div class="hidden md:block">
                <button class="min-w-[130px] mr-4" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'">
                    Geography
                </button>
                <button class="min-w-[130px]" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'">
                    Age & Gender
                </button>
            </div>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <div class="block md:hidden">
            <button class="min-w-[130px] mr-4" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'">
                Geography
            </button>
            <button class="min-w-[130px]" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'">
                Age & Gender
            </button>
        </div>
        <div v-if="isActive == 1">
            <div class="sm:flex items-center mb-6">
                Ads <scale-range :colors="colorArray" :range="rangeArray" class="grow ml-4"></scale-range>
            </div>
            <hexa-map v-if="hexData" :chartData="hexData"></hexa-map>
            <no-data v-else></no-data>
        </div>
        <div v-if="isActive == 2">
            <compare-bar-chart v-if="ageData?.data?.length > 0" :chartData="ageData"></compare-bar-chart>
            <no-data v-else></no-data>
        </div>
    </div>
</template>
<script>
import containerBox from './common/containerBox.vue'
export default{
    components:{
        containerBox
    },
    watch:{
        chartData()
        {
        this.getSepData()
        }
    },
    methods:{
        getSepData()
        {
            for(let data in this.chartData)
            {
                if(this.chartData[data].mode == 'age_and_gender')
                    this.ageData = this.chartData[data]
                else
                {
                    this.hexData = this.chartData[data]
                    this.hexMAx = this.chartData[data].meta
                }
            }
        }
    },
    async mounted()
    {
        await this.getSepData()
        let meta = this.hexMAx
        console.log(meta);
        const numberOfSegments = 4;
        const step = meta.max / numberOfSegments;
        this.rangeArray =  Array.from({ length: 5 }, (_, i) => step * i);
    },
    updated()
    {
        this.getSepData()
    },
    props:['chartData','metaData'],
    data(){
        return{
            title:'Audience',
            hexData:{},
            ageData:{},
            hexMAx:0,
            colorArray:['#FBE69F', '#C5D6B6', '#4CB2AC', '#326284', '#133751'],
            rangeArray:[],
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?',
            isActive:2,
        }
    }
}
</script>
<style>
.inactive-btn{
    width: 130px;
    height: 34px;
    text-align: center;
    border-radius: 6px;
    border: 1px 0px 0px 0px;
    opacity: 0px;
    border: 1px solid #000000;
}
.active-btn{
    width: 112px;
    height: 34px;
    text-align: center;
    border-radius: 6px;
    border: 1px 0px 0px 0px;
    opacity: 0px;
    color: white;
    background: #000000;
    border: 1px solid #000000;
}
</style>