import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import bFormSlider from 'vue-bootstrap-slider'
import 'bootstrap-slider/dist/css/bootstrap-slider.css'

Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.use(bFormSlider)
Vue.use(BootstrapVue)
