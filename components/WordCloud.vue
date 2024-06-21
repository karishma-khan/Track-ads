<template>
    <div class="bg-[#FFFBEF] common-container">
        <div class="flex gap-4">
            <img src="img/imageGallery.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <div class="w-full pt-10 flex justify-center">
            <div v-if="getColors.length > 0" class="w-[100%] md-w-[85%]">
                <vue-word-cloud :data="words" :rotate="rotate" :color="getColors" :options="options" />
            </div>
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
                words: [

                ],
               colorArray:[],
                options: {
                },
            };
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
                        this.maxFreq = this.chartData[item].frequency
                    }
                }
            }
        },
        computed:{
            getColors() {
                this.getMAx()
                let temp = []
                for (let i = 0; i < this.words.length; i++) {
                    let tempColor = this.words[i].value <= (this.maxFreq/4) ? '#4CB2AC' : this.words[i].value <= (this.maxFreq/2) ? '#326284' : this.words[i].value <= (this.maxFreq * (3/4)) ? '#162C3B' : '#041520'
                    temp.push(tempColor);
                }
                return temp
            }
        }
        };
</script>

<style>
.tooltip {
    display: none !important;
}
</style>
