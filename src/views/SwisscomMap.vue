<template>
    <div id="swisscom-data-aggregation-component">
         <b-alert variant="warning" dismissible :show="isDevMode">
            <p v-text="`Attention ! En développement, vous devez lancer votre navigateur en mode 'no-cors' pour accéder aux données.`" />
            <div class="bg-dark p-3 rounded">
                <code >
                    <div>
                        > cd "C:\Program Files\Google\Chrome\Application"
                    </div>
                    <div>
                        > chrome.exe --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
                    </div>
                </code>
            </div>
        </b-alert>
        <Inputs :loading="loading" @update="loadDashboard" />
        <div v-if="loading" class="mt-4 text-center">
            <font-awesome-icon class="fa-4x" icon="spinner" spin />
            <div class="mt-2" v-text="`Chargement des données...`" />
        </div>
        <div v-else>
            <div class="mt-4 mb-5">
                <TimeLine ref="timeline" :data="datetimes" :current="datetimes[currentIndex]" :currentIndex="currentIndex" @update="updateIndex" @over="playing = false" />
            </div>
            <div v-if="heatmaps && heatmaps.length">
                <KPIs :data="heatmaps[currentIndex]" />
            </div>
            <div v-if="tiles && tiles.length" class="content-bg">
                <HeatMap
                    :center="mapCenter" 
                    :tiles="tiles" 
                    :densities="heatmaps[currentIndex].density" 
                    :playing="playing"
                    :heatmapKey="currentIndex"
                    @play="play"
                    @stop="stop"
                />
            </div>
        </div>        
    </div>
</template>

<script>
import Inputs from '@/components/swisscomMap/Inputs'
import TimeLine from '@/components/swisscomMap/TimeLine'
import KPIs from '@/components/swisscomMap/KPIs'
import HeatMap from '@/components/swisscomMap/HeatMap'
import SwisscomMixin from '@/mixins/swisscom'
export default {
    name: 'SwisscomMap',
    mixins: [SwisscomMixin],
    components: {
        Inputs,
        TimeLine,
        KPIs,
        HeatMap,
    },
    data() {
        return {
            params: null,
            currentIndex: 0,
            playing: false,
        }
    },
    computed: {
        isDevMode() {
            return window.location.hostname.includes('localhost')
        },
        datetimes() {
            return this.heatmaps.map((h) => h.datetime)
        },
        mapCenter() {
            const midIndex = Math.round((this.tiles.length - 1) / 2)
            return [this.tiles[midIndex].ll.y, this.tiles[midIndex].ur.x]
        },
    },
    methods: {
        async loadDashboard(newParams) {
            this.currentIndex = 0
            this.params = newParams
            await this.loadData()
        },
        updateIndex(i) {
            this.currentIndex = i
        },
        play() {
            this.currentIndex = 0
            this.$refs.timeline.play()
            this.playing = true
        },
        stop() {
            this.$refs.timeline.stop()
        },
    },
}
</script>

<style lang="scss">
</style>