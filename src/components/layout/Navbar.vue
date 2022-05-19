<template>
    <b-navbar id="navbar" class="px-4 py-3" sticky>
        <b-navbar-brand :to="{ name: 'Dashboard' }">
            <font-awesome-icon :icon="['fas', 'map-marked-alt']" size="lg" class="mr-2 fa-2x text-primary" />
        </b-navbar-brand>
        <b-navbar-nav class="align-items-center ml-auto">
            <div v-for="i in menu"
                :key="i.key"
            >
                <b-nav-item class="mr-3 h4 mb-0 small-caps"
                    :to="{ name: i.route }" 
                    active-class=""
                    :active="isActive(i.route)"
                >
                {{ i.key }}
                </b-nav-item>     
            </div>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            menu: [
                {
                    key: 'Carte',
                    route: 'Dashboard',
                },                
                {
                    key: 'À propos',
                    route: 'À propos',
                },
            ]
        }
    },
    methods: {
        isActive(name) {
            return name === this.$route.name
        },
    },
}
</script>

<style lang="scss">
#navbar {
    background-color: theme-color('dark');

    a {
        color: theme-color('light');

        &:hover, &.active {
            color: theme-color('primary') !important;
        }
    }
}
</style>