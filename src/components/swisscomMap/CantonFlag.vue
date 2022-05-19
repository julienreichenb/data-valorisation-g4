<template>
    <img v-if="canton && !error" :src="require(`@/assets/cantons/${canton.toLowerCase()}.png`)" :height="size" @error="error = true" />
    <font-awesome-layers v-else class="fa-2x">
       <font-awesome-icon class="text-dark" icon="shield-alt" />
       <font-awesome-icon class="text-light" icon="question" color="white" transform="shrink-4" />
    </font-awesome-layers>
</template>

<script>
export default {
    name: 'CantonFlag',
    props: {
        canton: { default: null, },
        size: { default: '40px' },
    },
    data() {
        return {
            error: false,
        }
    },
}
</script>

<style>

</style>