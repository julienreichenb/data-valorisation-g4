import Vue from 'vue'
import App from './App.vue'
// Plugins
import router from "@/plugins/router"
import store from "@/plugins/store"
import '@/plugins/vue-meta'
import '@/plugins/bootstrap-vue'
import '@/plugins/axios'
import '@/plugins/leaflet'
import '@/plugins/fontawesome'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
