<template>
    <div id="swisscom-data-aggregation-component">
        <Inputs @update="loadDashboard" />
        <div v-if="params">
        
        </div>
    </div>
</template>

<script>
import Inputs from '@/components/swisscomMap/Inputs'
import SwisscomMixin from '@/mixins/swisscom'
export default {
    name: 'SwisscomMap',
    mixins: [SwisscomMixin],
    components: {
        Inputs,
    },
    data() {
        return {
            params: null,
        }
    },
    methods: {
        loadDashboard(newParams) {
            this.params = newParams
            this.loadTiles()
        },
    },
}
</script>

<style lang="scss">
</style>