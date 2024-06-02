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
        // newIsPointInPolygon(polygonLayer, point) {
        //     var pointLatLng = L.latLng(point[0], point[1]);
        //     var isInside = leafletPip.pointInLayer(pointLatLng, polygonLayer, true);
        //     return isInside.length != 0;
        // },
        
        loadIndianBoundary()
        {
            
            this.indianBoundary = L.geoJSON(this.geojson);
            this.hexLayer = L.geoJSON(this.hexGeoJson);

            // Add the Indian boundary to the map
            // this.indianBoundary.addTo(this.map);
            this.hexLayer.addTo(this.map);

            // Example grid dimensions
            var rows = 20;
            var cols = 20;

            // Get the bounding box of India
            // var bounds = this.indianBoundary.getBounds();
            // var southWest = bounds.getSouthWest();
            // var northEast = bounds.getNorthEast();
            // console.log(bounds,southWest,northEast);

            // // Calculate grid size within Indian boundary
            // var latStep = (northEast.lat - southWest.lat) / rows;
            // var lonStep = (northEast.lng - southWest.lng) / cols;

            // // Create grid within Indian boundary
            // for (var i = 0; i < rows; i++) {
            //         for (var j = 0; j < cols; j++) {
            //             // Calculate coordinates of the hexagon center
            //             var centerX = southWest.lat + (i + 0.25) * latStep;
            //             var centerY = southWest.lng + (j + 0.25) * lonStep;
                        
            //             // Approximate hexagon using a series of polygons
            //             var hexagon = [];
            //             for (var k = 0; k <= 6; k++) {
            //                 var angleRad = (Math.PI / 3) * k;
            //                 var x = centerX + (latStep / 2) * Math.cos(angleRad);
            //                 var y = centerY + (lonStep / 2) * Math.sin(angleRad);
            //                 hexagon.push([x, y]);
            //             }
                        
            //             // Check if the center of the hexagon is inside the Indian boundary
            //             let temp = this.newIsPointInPolygon(this.indianBoundary, [centerX, centerY]);
                        
            //             if (temp) {
            //                 // If the hexagon center is inside, create a Leaflet polygon representing the hexagon
            //                 var hexagonPolygon = L.polygon(hexagon);
            //                 // Add the polygon to the map
            //                 hexagonPolygon.addTo(this.map);
            //             }
            //         }
            //     }
            
        }
    },
    async mounted()
    {
        this.map = await L.map('map').setView([28.5937, 78.9629], 4);
        // await L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     maxZoom: 18,
        // }).addTo(this.map);
        this.loadIndianBoundary();
    }
}
</script>

<!-- <script>
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