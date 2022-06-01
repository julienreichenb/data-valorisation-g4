<template>
    <div id="swisscom-data-aggregation-component">
         <b-alert variant="warning" dismissible show>
            <p class="font-weight-bold" v-html="`Attention ! Sur ce prototype, vous devez utiliser <u>Google Chrome</u> en mode 'no-cors' pour accéder aux données.`" />
            <p v-text="`Pour ce faire, lancez l'<b>invite de commande en mode administrateur</b> : Touche Windows, tapez 'cmd', clique droit puis 'Exécuter en tant qu'Administrateur' et enfin cliquez sur 'Oui'.`" />
            <p v-text="`Faites ensuite les 2 commandes suivantes, dans l'ordre. Une nouvelle fenêtre Chrome va s'ouvrir.`" />
            <div class="bg-dark p-3 rounded mb-3">
                <code>
                    <div>
                        > cd "C:\Program Files\Google\Chrome\Application"
                    </div>
                    <div class="font-italic text-white">
                        S'il y a une erreur "Chemin d'accès introuvable", essayez :
                    </div>
                    <div>
                        > cd "C:\Program Files (x86)\Google\Chrome\Application"
                    </div>
                    <div>
                        > chrome.exe --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
                    </div>
                </code>
            </div>
            <p v-text="`Une fois la nouvelle fenêtre Chrome ouverte, vous pouvez fermer l'invite de commande et aller sur le llien du prototype sur la nouvelle fenêtre.`" />
        </b-alert>
        <Inputs :loading="loading" @update="loadDashboard" />
        <div v-if="loading" class="mt-4 text-center">
            <font-awesome-icon class="fa-4x" icon="spinner" spin />
            <div class="mt-2" v-text="`Chargement des données...`" />
        </div>
        <div v-else>
            <div v-if="heatmaps && heatmaps.length">
                <KPIs :data="heatmaps[currentIndex]" />
            </div>
            <div class="mb-3" :class="datetimes.length > 7 && 'mt-5'">
                <TimeLine ref="timeline" :data="datetimes" :current="datetimes[currentIndex]" :currentIndex="currentIndex" @update="updateIndex" @over="playing = false" />
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