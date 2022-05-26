<template>
    <div>
        <Navbar />
        <div>
            <b-container class="content">
                <b-alert variant="warning" dismissible :show="isDevMode">
                    <p v-text="`Attention ! En développement, vous devez lancer votre navigateur en mode 'no-cors' pour accéder aux données.`" />
                    <div class="bg-dark p-3 rounded">
                        <code >
                            "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
                        </code>
                    </div>
                </b-alert>
                <router-view />
            </b-container>
            <Footer />
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
export default {
    name: 'Layout',
    components: {
        Navbar,
        Footer,
    },
    computed: {
        isDevMode() {
            return window.location.hostname.includes('localhost')
        },
    },
}
</script>

<style>

</style>