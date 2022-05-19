<template>
    <div id="swisscom-data-aggregation-component">
        <Inputs @update="loadMap" />
    </div>
</template>

<script>
import Inputs from '@/components/swisscomMap/Inputs'
export default {
    name: 'SwisscomMap',
    components: {
        Inputs,
    },
    methods: {
        loadMap(params) {
            console.log(params)
        },
    },
}
</script>

<style lang="scss">
</style>