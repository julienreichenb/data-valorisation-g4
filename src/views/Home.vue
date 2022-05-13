<template>
    <div>
        Home
        <router-link :to="{ path: 'about' }">
            about
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {
    },
}
</script>

<style lang="scss">
</style>