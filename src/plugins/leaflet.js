import Vue from 'vue'
import { LMap, LTileLayer, LCircleMarker, LControl } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-circle-marker', LCircleMarker)
Vue.component('l-control', LControl)
