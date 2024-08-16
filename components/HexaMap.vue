<template>
    <div>
        <div v-if="computeData" id="map" class="z-10" style="height: 473px;background-color: #FFFBEF;"></div>
    </div>
</template>

<script>
import IndiaHexBoundary from "../data/india_state_hex.geojson"
import { mapGetters } from 'vuex'
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
        ...mapGetters({
            dateRange: "get_date",
        }),
        computeData(){
            this.geoData = {}
            let data = this.chartData?.data
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
        formatNumber(value) {
            // console.log(value);
            if(value)
            {
                if (value >= 1e9) {
                    return (value / 1e9).toFixed(1) + "b+";
                } else if (value >= 1e6) {
                    return (value / 1e6).toFixed(1) + "m+";
                } else if (value >= 1e3) {
                    return (value / 1e3).toFixed(1) + "k+";
                } else {
                    return new Intl.NumberFormat('en-US').format(value);
                }
            }
            return 0
        },
        formatDate(date)
        {
            const day = date.getDate();
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            const monthIndex = date.getMonth();
            const month = monthNames[monthIndex];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },
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
                    let innerHtml = `<div><div class="text-[15px] flex gap-2 mb-2" style="color:#FFFFFF80"> <img src="/img/announce.svg" /> Total Ads </div>`
                    innerHtml += `<div class="w-full break-all" style="color:#FFFFFF90;word-break: keep-all;">On average, <b class="text-white"> ${this.geoData[feature?.properties['State/UT']] ? this.formatNumber(this.geoData[feature?.properties['State/UT']]) : 0} </b> ads were run in the <b class="text-white">${feature?.properties['State/UT']} </b> during <b class="text-white"> ${this.formatDate(this.dateRange[0])} to ${this.formatDate(this.dateRange[1])}.</b></div>`
                    innerHtml += `</div>`
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
    background: black;
    border: 0px solid;
    color: white;
    padding: 10px 15px;
    border-radius: 16px;
    width: 300px;white-space: normal;
    word-wrap: break-word;
    word-break: break-word;
}
</style>