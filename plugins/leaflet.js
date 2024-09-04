// plugins/leaflet.js

import Vue from 'vue';  // Import Vue to use for component registration.
import { 
  LMap,        // Map component to create a Leaflet map.
  LTileLayer,  // Component to add tile layers to the map.
  LMarker,     // Component for placing markers on the map.
  LGeoJson,    // Component for displaying GeoJSON data on the map.
  LIcon        // Component to define custom icons for markers.
} from 'vue2-leaflet';  // Import the necessary components from vue2-leaflet.

// Register the Leaflet components globally so they can be used anywhere in the app without further imports.
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-geo-json', LGeoJson);
Vue.component('l-icon', LIcon);
