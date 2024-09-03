<template>
    <div>
        <!-- Container for the map with a specific background color and height -->
        <div v-if="computeData" id="map" class="z-10" style="height: 473px;background-color: #FFFBEF;"></div>
    </div>
</template>

<script>
import IndiaHexBoundary from "../data/india_state_hex.geojson"
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            geoData: {}, // Holds processed geo data
            maxUsers: 0, // Tracks the maximum number of users for scaling colors
            map: null, // Leaflet map instance
            hexGeoJson: IndiaHexBoundary, // GeoJSON data for the hex boundaries
            hexLayer: null, // Layer for displaying hex boundaries
            indianBoundary: null, // Boundary layer (not used in this code)
            randomColors: ['#C5D6B6','#81C2A7','#4CB2AC','#326284','#162C3B'] // Colors for different ranges of users
        }
    },
    props: ['chartData'], // Data received from the parent component
    computed: {
        ...mapGetters({
            dateRange: "get_date", // Getter for date range from Vuex store
        }),
        computeData() {
            this.geoData = {}; // Reset geoData
            let data = this.chartData?.data;
            for (let item in data) {
                if (data[item]) {
                    this.geoData[data[item].state] = data[item].users;
                    if (data[item].users > this.maxUsers) {
                        this.maxUsers = data[item].users;
                    }
                }
            }
            return this.geoData; // Return processed geo data
        }
    },
    methods: {
        // Formats numbers with appropriate suffixes
        formatNumber(value) {
            if (value) {
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
            return 0;
        },
        // Formats a date into a readable string
        formatDate(date) {
            const day = date.getDate();
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            const monthIndex = date.getMonth();
            const month = monthNames[monthIndex];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },
        // Determines color based on the number of users
        getColor(users) {
            if (users <= (this.maxUsers / 5))
                return this.randomColors[0];
            if (users <= (this.maxUsers * (2 / 5)))
                return this.randomColors[1];
            if (users <= (this.maxUsers * (3 / 5)))
                return this.randomColors[2];
            if (users <= (this.maxUsers * (4 / 5)))
                return this.randomColors[3];
            if (users <= (this.maxUsers))
                return this.randomColors[4];
            return '#ebe7e7'; // Default color if no match
        },
        // Styles each feature on the map based on the number of users
        styleFeature(feature) {
            return {
                color: 'white',
                weight: 3,
                opacity: 1,
                fillOpacity: 1,
                fillColor: this.getColor(this.geoData[feature?.properties['State/UT']])
            };
        },
        // Loads the Indian boundary map and styles it
        loadIndianBoundary() {
            this.hexLayer = L.geoJSON(this.hexGeoJson, {
                onEachFeature: (feature, layer) => {
                    layer.setStyle(this.styleFeature(feature)); // Apply style to each feature
                    let innerHtml = `<div><div class="text-[15px] flex gap-2 mb-2" style="color:#FFFFFF80"> <img src="/img/announce.svg" /> Total Ads </div>`;
                    innerHtml += `<div class="w-full break-all" style="color:#FFFFFF90;word-break: keep-all;">On average, <b class="text-white"> ${this.geoData[feature?.properties['State/UT']] ? this.formatNumber(this.geoData[feature?.properties['State/UT']]) : 0} </b> ads were run in the <b class="text-white">${feature?.properties['State/UT']} </b> during <b class="text-white"> ${this.formatDate(this.dateRange[0])} to ${this.formatDate(this.dateRange[1])}.</b></div>`;
                    innerHtml += `</div>`;
                    const tooltipContent = innerHtml;
                    layer.bindTooltip(tooltipContent); // Bind tooltip to layer
                }
            });
            this.hexLayer.addTo(this.map); // Add layer to map
        }
    },
    async mounted() {
        // Initialize the Leaflet map
        this.map = await L.map('map', {
            center: [29.4737, 78.9629],
            zoom: 5,
            scrollWheelZoom: false, 
            doubleClickZoom: false, 
            zoomControl: false 
        });
        this.loadIndianBoundary(); // Load map data
    }
}
</script>

<style>
/* Styles for Leaflet tooltips */
.leaflet-tooltip {
    background: black;
    border: 0px solid;
    color: white;
    padding: 10px 15px;
    border-radius: 16px;
    width: 300px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-word;
}

/* Styles for tooltips on small screens */
@media screen and (max-width: 460px) {
    .leaflet-tooltip {
        left: 16px !important; /* Ensure the tooltip is 16px from the left */
        transform: none !important; /* Reset any transform applied by Leaflet */
    }
}
</style>
