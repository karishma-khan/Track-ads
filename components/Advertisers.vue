<template>
    <div class="bg-[#FFFBEF] text-black common-container">
        <div class="flex gap-4">
            <img src="../static/img/Audience.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <div class="sm:flex items-start mb-6 text-[14px] md:text-[16px]">
            Ads <scale-range :colors="colorArray" :range="rangeArray" class="grow ml-4"></scale-range>
        </div>
        <scatter-plot v-if="chartData" :chartData="chartData"></scatter-plot>
        <no-data v-else></no-data>
    </div>
</template>
<script>
import containerBox from './common/containerBox.vue'
export default{
    props:['chartData','metaData'],
    data(){
        return {
            title: 'Advertisers',
            colorArray:['#FBE69F', '#C5D6B6', '#4CB2AC', '#326284', '#133751'],
            rangeArray:[],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lor.'
        }
    },
    mounted(){
        let meta = this.metaData
        const numberOfSegments = 4;
        const step = meta?.amount?.max / numberOfSegments;
        this.rangeArray =  Array.from({ length: 5 }, (_, i) => step * i);
    }
}
</script>