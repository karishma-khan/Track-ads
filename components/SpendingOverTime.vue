<template>
    <div class="bg-[#326284] text-white text-black common-container">
        <div class="flex gap-4">
            <img src="img/SOTLogo.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <p class="mt-3 mb-6 common-description">
            {{ description }}
        </p>
        <div>
            <test-chart :chartData="chartData"></test-chart>
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
            title:'Spending Over Time',
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae? lorem ipsum dolor sit amet lorem. Lorem ipsum dolor sit sit amet consectetur adipisicing elit. Nemo, molestiae?',
            chartData:{
                labels:['12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar', '17 Mar', '18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar'],
                values:[18, 21, 31, 24, 38, 41, 18, 44, 31, 24, 38, 41, 24, 38, 41,18]
            },
            ylabel:'(in million rupees)'
        }
    }
}
</script>