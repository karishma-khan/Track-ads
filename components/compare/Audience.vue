<template>
    <div class="bg-[#FFFBEF] text-black common-container">
        <div class="flex justify-between">
            <div class="flex gap-4">
                <img src="../../static/img/Audience.svg" alt="">
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
        <div class=" my-4 flex justify-center items-center gap-6 h-[48px] w-full bg-[#0000001A] border-y border-[#00000033]">
            <div @click="whichParty = 1" :class="whichParty == 2? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center "> <span class="mdi-18px mdi mdi-chevron-left"></span> </div>
            <div class="compareSlider">{{ whichParty == 1 ? compareItems[0] : compareItems[1] }}</div>
            <div @click="whichParty = 2" :class="whichParty == 1? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center "> <span class="mdi-18px mdi mdi-chevron-right"></span> </div>
        </div>
        <div v-if="isActive == 1">
            <div class="sm:flex items-center mb-6">
                Ads <scale-range :colors="colorArray" :range="rangeArray" class="grow ml-4"></scale-range>
            </div>
            <hexa-map :key="hexKey" v-if="getHexData" :chartData="{data : getHexData}"></hexa-map>
            <no-data v-else></no-data>
        </div>
        <div v-if="isActive == 2">
            <compare-line-chart :key="ageKey" v-if="(getAgeData).length > 0" :chartData="{data : getAgeData}"></compare-line-chart>
            <no-data v-else></no-data>
        </div>
    </div>
</template>
<script>
export default{
    watch:{
        chartData()
        {
        this.getSepData()
        }
    },
    computed:{
        getAgeData(){
            this.ageKey++
            return this.whichParty == 1 ? this.ageFirstData : this.ageSecondData
        },
        getHexData(){
            this.hexKey++
            return this.whichParty == 1 ? this.hexFirstData : this.hexSecondData
        }
    },
    methods:{
        getSepData()
        {
            if(this.chartData && this.chartData?.length == 2)
            {
                for(let data in this.chartData[0]?.data)
                {
                    if(this.chartData[0]?.data[data])
                    {
                        if(this.chartData[0]?.data[data]?.mode == 'age_and_gender')
                            this.ageFirstData = this.chartData[0]?.data[data]?.data
                        else
                        {
                            this.hexFirstData = this.chartData[0]?.data[data]?.data
                            this.hexFirstMAx = this.chartData[0]?.data[data]?.meta
                        }
                    }
                }
                for(let data in this.chartData[1]?.data)
                {
                    // console.log('data',data);
                    if(this.chartData[1]?.data[data])
                    {
                        if(this.chartData[1]?.data[data]?.mode == 'age_and_gender')
                            this.ageSecondData = this.chartData[1]?.data[data]?.data
                        else
                        {
                            this.hexSecondData = this.chartData[1]?.data[data]?.data
                            this.hexSecondMAx = this.chartData[1]?.data[data]?.meta
                        }
                    }
                }
                
            }
        }
    },
    async mounted()
    {
        await this.getSepData()
        let meta = this.whichParty == 1 ? this.hexFirstMAx : this.hexSecondMAx
        // console.log('audience meta',meta);
        const numberOfSegments = 4;
        const step = meta.max / numberOfSegments;
        this.rangeArray =  Array.from({ length: 5 }, (_, i) => step * i);
    },
    updated()
    {
        this.getSepData()
    },
    props:['chartData','metaData','compareItems'],
    data(){
        return{
            title:'Audience',
            hexKey:0,
            ageKey:0,
            hexFirstData:{},
            hexSecondData:{},
            ageFirstData:{},
            ageSecondData:{},
            hexFirstMAx:0,
            hexSecondMAx:0,
            colorArray:['#FBE69F', '#C5D6B6', '#4CB2AC', '#326284', '#133751'],
            rangeArray:[],
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae?',
            isActive:2,
            whichParty:1
        }
    }
}
</script>
<style>
.inactive-btn{
    width: 130px;
    min-height: 34px;
    text-align: center;
    border-radius: 6px;
    border: 1px 0px 0px 0px;
    border: 1px solid #000000;
}
.active-btn{
    width: 112px;
    min-height: 34px;
    text-align: center;
    border-radius: 6px;
    border: 1px 0px 0px 0px;
    color: white;
    background: #000000;
    border: 1px solid #000000;
}
</style>