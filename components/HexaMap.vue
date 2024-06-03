<template>
    <div>
        this is Hexamap
        <div id="map" class="z-10" style="height: 490px;background-color: #FFFBEF;"></div>
    </div>
</template>

<script>
import IndiaBoundary from "../data/india_boundary.geojson";
import IndiaHexBoundary from "../data/india_state_hex.geojson"
export default {
    data(){
        return{
            map:null,
            geojson:IndiaBoundary,
            hexGeoJson:IndiaHexBoundary,
            hexLayer:null,
            indianBoundary:null
        }
    },
    methods:{
        
        loadIndianBoundary()
        {
            this.indianBoundary = L.geoJSON(this.geojson);
            this.hexLayer = L.geoJSON(this.hexGeoJson);
            this.hexLayer.addTo(this.map);
            var rows = 20;
            var cols = 20;
        }
    },
    async mounted()
    {
        this.map = await L.map('map').setView([29.1937, 78.9629], 5);
        this.loadIndianBoundary();
    }
}
</script>