<template>
    <div class="bg-[#FFFBEF] common-container">
        <div class="flex gap-4">
            <img src="img/imageGallery.svg" alt="">
            <span class="common-heading">
                {{ title }}
            </span>
        </div>
        <div class="w-full pt-10 flex justify-center">
            <div class="w-[100%] md-w-[85%]">
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
        data() {
            return {
                title:'Most Used Phrases',
                rotate: { from: 0, to: 0 },
                words: [
                    { "name": "political", "value": 8 },
                    { "name": "development", "value": 9 },
                    { "name": "technology", "value": 6 },
                    { "name": "transport", "value": 5 },
                    { "name": "economy", "value": 10 },
                    { "name": "society", "value": 2 },
                    { "name": "transport", "value": 7 },
                    { "name": "finance", "value": 10 },
                    { "name": "transport", "value": 2 },
                    { "name": "transport", "value": 9 },
                    { "name": "party", "value": 8 },
                    { "name": "society", "value": 1 },
                    { "name": "sports", "value": 8 },
                    { "name": "security", "value": 1 },
                    { "name": "development", "value": 5 },
                    { "name": "party", "value": 6 },
                    { "name": "economy", "value": 8 },
                    { "name": "culture", "value": 3 },
                    { "name": "innovation", "value": 7 },
                    { "name": "education", "value": 1 },
                    { "name": "finance", "value": 5 },
                    { "name": "energy", "value": 2 },
                    { "name": "energy", "value": 10 },
                    { "name": "austria", "value": 10 },
                    { "name": "economy", "value": 1 },
                    { "name": "government", "value": 4 },
                    { "name": "austria", "value": 7 },
                    { "name": "education", "value": 10 },
                    { "name": "environment", "value": 6 },
                    { "name": "party", "value": 7 },
                    { "name": "environment", "value": 2 },
                    { "name": "government", "value": 1 },
                    { "name": "society", "value": 3 },
                    { "name": "culture", "value": 9 },
                    { "name": "environment", "value": 8 },
                    { "name": "industry", "value": 5 },
                    { "name": "development", "value": 7 },
                    { "name": "environment", "value": 2 },
                    { "name": "health", "value": 2 },
                    { "name": "environment", "value": 10 },
                    { "name": "government", "value": 9 },
                    { "name": "innovation", "value": 2 },
                    { "name": "innovation", "value": 4 },
                    { "name": "sports", "value": 10 },
                    { "name": "sports", "value": 7 },
                    { "name": "technology", "value": 8 },
                    { "name": "industry", "value": 1 },
                    { "name": "society", "value": 2 },
                    { "name": "energy", "value": 3 },
                    { "name": "society", "value": 8 },
                    { "name": "education", "value": 8 },
                    { "name": "transport", "value": 9 },
                    { "name": "industry", "value": 5 },
                    { "name": "industry", "value": 4 },
                    { "name": "culture", "value": 5 },
                    { "name": "party", "value": 5 },
                    { "name": "sports", "value": 9 },
                    { "name": "environment", "value": 7 },
                    { "name": "society", "value": 8 },
                    { "name": "health", "value": 3 }
                ],
                options: {
                    // colors: this.getColors(),
                },
            };
        },
        computed:{
            getColors() {
                let temp = []
                for (let i = 0; i < this.words.length; i++) {
                    let tempColor = this.words[i].value > 8 ? '#041520' : this.words[i].value > 5 ? '#162C3B' : this.words[i].value > 2 ? '#326284' : '#4CB2AC'
                    temp.push(tempColor);
                }
                return temp
            }
        },
        methods: {
            
            colorizeWords(words) {
                const getColor = (value) => {
                    if (value >= 8) return "#041520";
                    if (value >= 6) return "#162C3B";
                    if (value >= 3) return "#326284";
                    return "#4CB2AC";
                };

                return words.map(word => ({
                    ...word,
                    color: getColor(word.value)
                }));
            }
        }
        };
</script>

<style>
.tooltip {
    display: none !important;
}
</style>
