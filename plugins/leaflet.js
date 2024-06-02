// plugins/leaflet.js
import Vue from 'vue';
import { LMap, LTileLayer, LMarker, LGeoJson, LIcon } from 'vue2-leaflet';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-geo-json', LGeoJson);
Vue.component('l-icon', LIcon);