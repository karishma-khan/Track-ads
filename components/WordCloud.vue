<template>
    <div class="bg-[#FFFBEF] common-container">
        <div class="flex gap-4">
            <img src="../static/img/imageGallery.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
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
                loading:true
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
