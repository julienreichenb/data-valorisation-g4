<template>
    <div>
        <l-map id="heatmap" ref="map" :zoom="zoom" :center="center" @update:zoom="zoomUpdated">
            <l-control>                
                <b-link id="recenterButton" class="map-button" @click="recenter()">
                    <font-awesome-layers class="fa-3x">
                        <font-awesome-icon icon="circle" :style="{ color: '#546f9f' }" />
                        <font-awesome-icon
                            class="text-white"
                            icon="circle"
                            transform="shrink-1"
                        />
                        <font-awesome-icon
                            icon="crosshairs"
                            transform="shrink-7"
                            :style="{ color: '#546f9f' }"
                        />
                    </font-awesome-layers>
                </b-link>
                <b-link
                    v-if="!playing"
                    id="playButton"
                    class="map-button ml-1"
                    @click="$emit('play')"
                >
                    <font-awesome-layers class="fa-3x">
                        <font-awesome-icon class="text-success" icon="circle" />
                        <font-awesome-icon
                            class="text-white"
                            icon="circle"
                            transform="shrink-1"
                        />
                        <font-awesome-icon
                            icon="play"
                            transform="shrink-7 right-1"
                            class="text-success"
                        />
                    </font-awesome-layers>
                </b-link>
                <b-link
                    v-else
                    id="stopButton"
                    class="map-button ml-1"
                    @click="$emit('stop')"
                >
                    <font-awesome-layers class="fa-3x">
                        <font-awesome-icon class="text-danger" icon="circle" />
                        <font-awesome-icon
                            class="text-white"
                            icon="circle"
                            transform="shrink-1"
                        />
                        <font-awesome-icon
                            icon="stop"
                            transform="shrink-7"
                            class="text-danger"
                        />
                    </font-awesome-layers>
                </b-link>
                <b-link
                    id="hideButton"
                    class="map-button ml-1"
                    @click="showHeat = !showHeat"
                >
                    <font-awesome-layers class="fa-3x">
                        <font-awesome-icon icon="circle" :class="`text-${showHeat ? 'info' : 'muted'}`" />
                        <font-awesome-icon
                            class="text-white"
                            icon="circle"
                            transform="shrink-1"
                        />
                        <font-awesome-icon
                            :icon="showHeat ? 'eye' : 'eye-slash'"
                            :transform="`shrink-7 left-${showHeat ? '1' : '2'}`"
                            :class="`text-${showHeat ? 'info' : 'muted'}`"
                        />
                    </font-awesome-layers>
                </b-link>
            </l-control>
            <l-tile-layer :url="url" :attribution="attribution" />
            <div v-if="showHeat" :key="heatmapKey">
                <LHeatmap :latLng="heatmapFormatted" :max=".1" />
            </div>
        </l-map>
    </div>
</template>

<script>
import { LatLng } from 'leaflet'
import LHeatmap from "tf-vue-leaflet-heatmap"
export default {
    name: 'HeatMap',
    props: {
        densities: { type: Array, default: null },
        tiles: { type: Array, default: null },
        center: { type: Array, required: true },
        playing: { type: Boolean, default: false },
        heatmapKey: { type: Number, default: 0 },
    },
    components: {
        LHeatmap,
    },
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            zoom: 11.5,
            currentZoom: null,
            showHeat: true,
        }
    }, 
    computed: {
        heatmapFormatted() {
            const max = Math.max.apply(Math, this.densities.map((o) => { return o.score }))
            return this.densities.map((d) => {
                const tile = this.tiles.find((t) => t.tileId === d.tileId)
                return [tile.ll.y, tile.ur.x, d.score / max]                    
            })            
        },
    },
    methods: {
        recenter() {
            this.$refs.map.mapObject.setView(
                new LatLng(this.center[0], this.center[1]),
                this.zoom
            )
        },        
        zoomUpdated(zoom) {
            this.currentZoom = zoom
        },        
    },
}
</script>

<style lang="scss">
#heatmap {
    min-height: 70vh;

    .tile {
        border-radius: 0 !important;
    }
}
</style>