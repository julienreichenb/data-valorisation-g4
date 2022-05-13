<template>
    <div id="footer" class="px-5 d-flex align-items-center justify-content-between">
        <a href="https://digital.swisscom.com" target="_blank">
            <b-img height="50" :src="require('@/assets/logo/LKCXj.webp')" />
        </a>
        <span class="small font-italic" v-text="'Ce prototype a été réalisé dans le cadre du MScBA orientation MSI de la HES-SO Master.'" />
        <a href="https://www.hes-so.ch/master" target="_blank">
            <b-img height="50" :src="require('@/assets/logo/HES_SO_Logo_RGB_page.png')" />
        </a>
    </div>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style lang="scss">
#footer {
    background-color: theme-color-level('dark');
    height: 80px !important;
}
</style>