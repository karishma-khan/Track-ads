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
            <div class="compareSlider">{{ isActive == 1 ? compareItems[0] : compareItems[1] }}</div>
            <div @click="isActive = 2" :class="isActive == 1? 'bg-[black] text-[white]' : 'bg-[#0000001A] text-[#FFFFFF]'" class="h-[24px] w-[24px] rounded-[5px] flex justify-center items-center "> <span class="mdi-18px mdi mdi-chevron-right"></span> </div>
        </div>
        <div v-if="!loading" class="w-full pt-10 flex justify-center">
            <div v-if="getWords.length > 0" class="w-[100%] md-w-[85%]">
                <vue-word-cloud :data="getWords" :rotate="rotate" :color="getColorArray" :options="options" />
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
        computed:{
            getWords()
            {
                return this.isActive == 1 ? this.firstWords : this.secondWords
            },
            getColorArray()
            {
                return this.isActive == 1 ? this.colorFirstArray : this.colorSecondArray
            }
        },
        props:['chartData','compareItems'],
        data() {
            return {
                title:'Most Used Phrases',
                rotate: { from: 0, to: 0 },
                maxFirstFreq:0,
                maxSecondFreq:0,
                firstWords:{},
                secondWords: [],
                colorFirstArray:[],
                colorSecondArray:[],
                options: {},
                loading:true,
                isActive:1,
                randomColor:['#4CB2AC', '#326284', '#162C3B', '#041520' ]
            };
        },
        async mounted(){
            this.firstWords = await this.getMAx(this.chartData[0],true);
            this.secondWords = await this.getMAx(this.chartData[1],false);
            this.colorFirstArray = await this.getColors(this.firstWords,true);
            this.colorSecondArray = await this.getColors(this.secondWords,false);
            this.loading = false
        },
        methods:{
            getMAx(data,isFirst)
            {
                let words = []
                for(let item in data?.data)
                {
                    words.push({
                        name:data?.data[item]?.word,
                        value:data?.data[item]?.frequency * 10
                    })
                    if(data?.data[item]?.frequency > (isFirst ? this.maxFirstFreq : this.maxSecondFreq))
                    {
                        if(isFirst)
                            this.maxFirstFreq = (data?.data[item]?.frequency * 10)
                        else
                            this.maxSecondFreq = (data?.data[item]?.frequency * 10)
                    }
                }
                return words
            },
            async getColors(data,isFirst) {
                let temp = []
                const step = Math.floor((isFirst ? this.maxFirstFreq : this.maxSecondFreq)/4);  // Calculate the size of each part
                const first = step;
                const second = 2 * step;
                const third = 3 * step;
                for (let i = 0; i < data.length; i++) {
                    let tempVal = data[i].value
                    let tempColor = tempVal <= first ? '#4CB2AC' : tempVal <= second ? '#326284' : tempVal <= third ? '#162C3B' : '#041520'
                    temp.push(tempColor);
                }
                return temp
            }
        },
        };
</script>

<style>
.tooltip {
    display: none !important;
}
</style>
