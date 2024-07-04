<template>
    <div>
        <div v-if="computeData" id="map" class="z-10" style="height: 473px;background-color: #FFFBEF;"></div>
    </div>
</template>

<script>
import IndiaHexBoundary from "../data/india_state_hex.geojson"
export default {
    data(){
        return{
            geoData:{},
            maxUsers:0,
            map:null,
            hexGeoJson:IndiaHexBoundary,
            hexLayer:null,
            indianBoundary:null,
            randomColors:['#C5D6B6','#81C2A7','#4CB2AC','#326284','#162C3B'] 
        }
    },
    props:['chartData'],
    computed:{
        computeData(){
            this.geoData = {}
            let data = this.chartData.data
            for( let item in data ){
                if( data[item] )
                {
                    this.geoData[data[item].state] = data[item].users
                    if( data[item].users > this.maxUsers )
                    {
                        this.maxUsers = data[item].users
                    }
                }
            }
            return this.geoData
        }
    },
    methods:{
        getColor(users)
        {
            if(users <= (this.maxUsers / 5))
                return this.randomColors[0]
            if(users <= (this.maxUsers * (2/5)))
                return this.randomColors[1]
            if(users <= (this.maxUsers / (3/5)))
                return this.randomColors[2]
            if(users <= (this.maxUsers / (4/5)))
                return this.randomColors[3]
            if(users <= (this.maxUsers))
                return this.randomColors[4]
            return '#ebe7e7'
        },
        styleFeature(feature) {
            return {
                color: 'white',
                weight: 3,
                opacity: 1,
                fillOpacity: 1,
                fillColor: this.getColor(this.geoData[feature?.properties['State/UT']])
            };
        },
        loadIndianBoundary()
        {
            this.hexLayer = L.geoJSON(this.hexGeoJson,{
                onEachFeature: (feature, layer) => {
                    layer.setStyle(this.styleFeature(feature));
                    let innerHtml = '<div><div class="text-[15px] flex gap-2 mb-2" style="color:#FFFFFF80"> <img src="../static/img/announce.svg" /> Total Ads </div>'
                    innerHtml += '<div class="w-full break-all" style="color:#FFFFFF90">On average, <b class="text-white"> 8,000 </b> ads were run in the <b class="text-white">Uttar Pradesh </b> during <b class="text-white"> 12 March 2022 to 16 March 2022.</b></div>'
                    innerHtml += '</div>'
                    const tooltipContent = innerHtml;
                    layer.bindTooltip(tooltipContent);
                }
            });
            this.hexLayer.addTo(this.map);
        }
    },
    async mounted()
    {
        this.map = await L.map('map').setView([29.4737, 78.9629], 5);
        this.loadIndianBoundary();
    }
}
</script>

<style>
.leaflet-tooltip {
    background: black; /* Removes default background */
    border: 0px solid; /* Removes default border */
    color: white; /* Ensures text is visible */
    padding: 10px 15px; /* Adjusts padding if necessary */
    border-radius: 16px;
    width: 300px;white-space: normal; /* Allows text to wrap */
    word-wrap: break-word; /* Break long words to fit within the width */
    word-break: break-word;
}
</style>