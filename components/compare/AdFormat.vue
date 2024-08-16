<template>
    <div class="bg-[#C5D6B6] text-black common-container flex flex-col justify-between">
        <div>
            <div class="flex gap-4">
                <img src="../../static/img/trackads.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <p class="mt-3 mb-6 common-description">
                {{ description }}
            </p>
        </div>
        <div class="flex items-center">
            <div class="flex gap-2 items-center compareLegends">
                <div class="h-[16px] w-[16px]" :style="{ backgroundColor: '#748762' }"></div> image
            </div>
            <div class="flex gap-2 items-center compareLegends ml-4">
                <div class="h-[16px] w-[16px]" :style="{ backgroundColor: '#1D2713' }"></div> video
            </div>
        </div>
        <compare-bar-group-chart v-if="totalAmount() > 0" :chartData="chartData" :compareItems="compareItems" class="my-6"></compare-bar-group-chart>
        <no-data v-else></no-data>
    </div>
</template>
<script>
export default{
    props:['chartData','compareItems'],
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
                for( let i in item)
                {
                    res += item[i]
                }
            }
            return res
        }
    }
}
</script>