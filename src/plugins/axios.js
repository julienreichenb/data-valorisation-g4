import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
})

Vue.use(VueAxios, api)