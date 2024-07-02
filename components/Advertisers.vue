<template>
    <div class="bg-[#FFFBEF] text-black common-container">
        <div class="flex gap-4">
            <img src="img/Audience.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <div class="sm:flex items-start mb-6 text-[14px] md:text-[16px]">
            Ads <img class="w-[90%] ml-4" src="img/advRange.svg" alt="">
        </div>
        <scatter-plot :chartData="chartData"></scatter-plot>
    </div>
</template>
<script>
import containerBox from './common/containerBox.vue'
export default{
    props:['chartData'],
    data(){
        return {
            title: 'Advertisers',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lor.'
        }
    }
}
</script>