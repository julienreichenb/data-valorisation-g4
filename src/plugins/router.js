import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const load = (component, isView = true) => {
    if(isView)
        return () => import(`@/views/${component}.vue`)
    return () => import(`@/components/${component}.vue`)
}

const routes = [
    {
        path: '/',
        component: load('Layout'),
        children: [
            {
                path: '/',
                name: 'Dashboard',
                component: load('Home'),
            },
            {
                path: 'about',
                name: 'À propos',
                component: load('About'),
            },
            {
                path: '*',
                redirect: { name: 'Dashboard' },
            },
        ]
    },
]

export default new VueRouter({
    mode: 'history',
    routes,
})