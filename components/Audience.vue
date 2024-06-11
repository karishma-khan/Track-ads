<template>
    <div class="bg-[#FFFBEF] text-black common-container">
        <div class="flex justify-between">
            <div class="flex gap-4">
                <img src="img/Audience.svg" alt="">
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
                Ads
                <img class="md:block hidden ml-4" src="img/AdsRange.svg" alt="">
                <img class="block md:hidden" src="img/smallAdsRange.svg" alt="">
            </div>
            <hexa-map></hexa-map>
        </div>
        <div v-if="isActive == 2">
            <compare-bar-chart></compare-bar-chart>
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
            title:'Audience',
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