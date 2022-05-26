import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import ClientOAuth2 from 'client-oauth2'
import store from '@/plugins/store'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
})

/** 
 * 
 *  Interceptor to manage OAuth token & SCS-Versioning
 *  
 **/
api.interceptors.request.use(async (cfg) => {
    console.log(cfg)
    if(!store.getters['auth/accessToken'])
        await getAccessToken()
    cfg.headers['Authorization'] = `Bearer ${store.getters['auth/accessToken']}`
    cfg.headers['SCS-Version'] = cfg.url.includes('heatmaps') ? 2 : 1
    return cfg
})

const getAccessToken = async () => {
    const swisscomAuth = new ClientOAuth2({
        clientId: process.env.VUE_APP_SWISSCOM_CUSTOMER_KEY,
        clientSecret: process.env.VUE_APP_SWISSCOM_SECRET,
        accessTokenUri: process.env.VUE_APP_OAUTH_URL,
    })
    await swisscomAuth.credentials.getToken().then((res) => {
        store.dispatch('auth/setAccessToken', res.accessToken)
    })
}

Vue.use(VueAxios, api)