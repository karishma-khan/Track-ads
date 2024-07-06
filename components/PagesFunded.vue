<template>
    <div class="bg-[#326284] text-white common-container">
        <div class="flex gap-4">
            <img src="../static/img/pages.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(item,index) in chartData" :key="index">
                <div class="fundTile relative box-border overflow-hidden" :class=" selectedTile == index ? 'border-2 border-black' : '' ">
                    <div v-if="selectedTile == index" class="absolute rounded-bl-xl top-0 right-0 h-6 w-6 items-center flex font-black justify-center text-white bg-black">
                        <span class="mdi mdi-check"></span>
                    </div>
                    <div class="fundHead">{{ item.pageName }}</div>
                    <div class="flex items-center text-[#808080]">
                        <div>
                            <div class="fundSubHead">Ads</div>
                            <div class="fundSpend">{{ formatNumber(item.amount) }}</div>
                        </div>
                        <div class="grow flex justify-center">
                            <div>
                                <div class="fundSubHead">Money Spent</div>
                                <div class="fundSpend"> {{ formatNumber(item.spending?.min) }}m - {{ formatNumber(item.spending?.max) }}m </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    props:['chartData'],
    methods:{
        formatNumber(value) {
            return new Intl.NumberFormat('en-US').format(value);
        },
    },
    data(){
        return{
            title:'Pages Funded',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? dolor sit amet consectetur adipisicing elit. Nemo, molestiae?',
            selectedTile:0,
        }
    }
}
</script>