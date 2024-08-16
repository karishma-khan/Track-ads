<template>
    <div class="bg-[#FFFBEF] common-container">
        <div  class="flex justify-between">
            <div class="flex gap-4">
                <img src="../../static/img/imageGallery.svg" alt="">
                <span class="common-heading">
                    {{ title }}
                </span>
            </div>
            <div class="md:block hidden">
                <button class="min-w-[130px] mr-4 px-2" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'" style="width: unset !important;">
                    {{compareItems[0]}}
                </button>
                <button class="min-w-[130px] px-2" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'" style="width: unset !important;">
                    {{compareItems[1]}}
                </button>
            </div>
        </div>
        <div class="block md:hidden mt-6">
                <button class="min-w-[130px] mr-4 px-2" @click="isActive = 1" :class="isActive == 1 ? 'active-btn' : 'inactive-btn'" style="width: unset !important;">
                    {{compareItems[0]}}
                </button>
                <button class="min-w-[130px] px-2" @click="isActive = 2" :class="isActive == 2 ? 'active-btn' : 'inactive-btn'" style="width: unset !important;">
                    {{compareItems[1]}}
                </button>
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
                isActive:1,
                title:'Most Used Phrases',
                rotate: { from: 0, to: 0 },
                maxFirstFreq:0,
                maxSecondFreq:0,
                firstWords:{},
                secondWords: [],
                colorFirstArray:[],
                colorSecondArray:[],
                options: {},
                loading:true
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
            getMAx(data, isFirst)
            {
                let words = []
                for(let item in data?.data)
                {
                    // console.log('word cloud',item,data.data[item]);
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
            async getColors(data, isFirst) {
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
