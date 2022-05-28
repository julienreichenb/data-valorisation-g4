<template>
    <div>
        <Navbar />
        <div>
            <b-container class="content">               
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
}
</script>

<style>

</style>