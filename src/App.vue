<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  metaInfo() {
    return { 
      title: this.$route.name,
      titleTemplate: (title) => {
        const suffix = 'Data Valorisation'
        return title ? `${title} | ${suffix}` : suffix
      }
    }
  },
}
</script>

<style lang="scss">
#app {}
</style>
