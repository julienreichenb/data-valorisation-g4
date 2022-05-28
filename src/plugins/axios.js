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
api.interceptors.request.use(async (req) => {
    if(!store.getters['auth/accessToken'])
        await getAccessToken()
    req.headers['Authorization'] = `Bearer ${store.getters['auth/accessToken'] || ''}`
    req.headers['SCS-Version'] = req.url.includes('heatmaps') ? 2 : 1
    return req
})

api.interceptors.response.use((res) => { return res }, async (error) => {
    if(error.response.status == 403 && store.getters['auth/attempts'] < 2) {
        store.dispatch('auth/increaseAttempts')
        await getAccessToken()
        // Retry with new token
        return api.request(error.config)
    }
    return error
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