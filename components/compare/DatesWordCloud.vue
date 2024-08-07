<template>
    <div class="bg-[#FFFBEF] common-container">
        <div class="flex gap-4">
            <img src="../../static/img/imageGallery.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <div class=" my-4 flex justify-center items-center gap-6 h-[48px] w-full bg-[#0000001A] border-y border-[#00000033]">
            <div @click="isActive = 1" :class="isActive == 2? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center "> <span class="mdi-18px mdi mdi-chevron-left"></span> </div>
            <div class="compareSlider">12 Mar 2022 - 16 Mar 2022</div>
            <div @click="isActive = 2" :class="isActive == 1? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center "> <span class="mdi-18px mdi mdi-chevron-right"></span> </div>
        </div>
        <div v-if="!loading" class="w-full pt-10 flex justify-center">
            <div v-if="words.length > 0" class="w-[100%] md-w-[85%]">
                <vue-word-cloud :data="words" :rotate="rotate" :color="colorArray" :options="options" />
            </div>
            <no-data v-else></no-data>
        </div>
    </div>
</template>

<script>
    import VueWordCloud from 'vue-wordcloud';
    export default {
        components: {
            VueWordCloud,
        },
        props:['chartData'],
        data() {
            return {
                title:'Most Used Phrases',
                rotate: { from: 0, to: 0 },
                maxFreq:0,
                words: [],
                colorArray:[],
                options: {},
                loading:true,
                isActive:1
            };
        },
        async mounted(){
            await this.getMAx();
            await this.getColors();
            this.loading = false
        },
        methods:{
            getMAx()
            {
                this.words = []
                for(let item in this.chartData)
                {
                    this.words.push({
                        name:this.chartData[item].word,
                        value:this.chartData[item].frequency * 10
                    })
                    if(this.chartData[item].frequency > this.maxFreq)
                    {
                        this.maxFreq = (this.chartData[item].frequency * 10)
                    }
                }
            },
            async getColors() {
                await this.getMAx()
                let temp = []
                let first = Math.floor(this.maxFreq/4)
                let second = Math.floor(this.maxFreq/2)
                let third = Math.floor(this.maxFreq * (3/4))
                let forth = Math.floor(this.maxFreq)
                for (let i = 0; i < this.words.length; i++) {
                    let tempVal = this.words[i].value
                    let tempColor = tempVal <= first ? '#4CB2AC' : tempVal <= second ? '#326284' : tempVal <= third ? '#162C3B' : '#041520'
                    temp.push(tempColor);
                }
                this.colorArray =  temp
            }
        },
        };
</script>

<style>
.tooltip {
    display: none !important;
}
</style>
