<template>
    <div>
        this is Hexamap
        <div id="map" class="z-10" style="height: 400px;background-color: white;"></div>
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
        this.map = await L.map('map').setView([28.5937, 78.9629], 4);
        this.loadIndianBoundary();
    }
}
</script>

        var map = L.map('map').setView([20.5937, 78.9629], 4); // Centered on India

        function newIsPointInPolygon(polygonLayer, point) {
            var pointLatLng = L.latLng(point[0], point[1]);
            var isInside = leafletPip.pointInLayer(pointLatLng, polygonLayer, true);
            return isInside.length != 0;
        }

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(map);

        // Load Indian boundary GeoJSON data
        fetch('india_boundary.geojson')
            .then(response => response.json())
            .then(geojson => {
                // Create a Leaflet layer for the Indian boundary
                var indianBoundary = L.geoJSON(geojson);

                // Add the Indian boundary to the map
                indianBoundary.addTo(map);

                // Example grid dimensions
                var rows = 20;
                var cols = 20;

                // Get the bounding box of India
                var bounds = indianBoundary.getBounds();
                var southWest = bounds.getSouthWest();
                var northEast = bounds.getNorthEast();
                console.log(bounds,southWest,northEast);

                // Calculate grid size within Indian boundary
                var latStep = (northEast.lat - southWest.lat) / rows;
                var lonStep = (northEast.lng - southWest.lng) / cols;

                // Create grid within Indian boundary
                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        // Calculate coordinates of the grid cell
                        var cellBounds = [
                            [southWest.lat + i * latStep, southWest.lng + j * lonStep],
                            [southWest.lat + (i + 1) * latStep, southWest.lng + (j + 1) * lonStep]
                        ];

                        // Check if the center of the grid cell is inside the Indian boundary
                        var cellCenter = [southWest.lat + (i + 0.5) * latStep, southWest.lng + (j + 0.5) * lonStep];

                        let temp = newIsPointInPolygon(indianBoundary, cellCenter)
                        console.log(temp);
                        if (temp) {
                            // If the grid cell is inside, create a Leaflet rectangle representing the grid cell
                            var cellRectangle = L.rectangle(cellBounds);
                            // Add the rectangle to the map
                            cellRectangle.addTo(map);
                        }
                    }
                }
            });
    </script> -->