import { mapGetters, mapActions } from "vuex"
export default {
    computed: {
        ...mapGetters('auth', ['accessToken']),
    },
    mounted() {
        if(!this.accessToken)
            this.getAccessToken()
    },
    methods: {
        ...mapActions('auth', ['setAccessToken']),
        async getAccessToken() {
            const headers = {
                'Access-Control-Allow-Origin': 'http://localhost:8080'
            }
            await this.axios.post(process.env.VUE_APP_OAUTH_URL, {
                user: `${process.env.VUE_APP_SWISSCOM_CUSTOMER_KEY}:${process.env.VUE_APP_SWISSCOM_SECRET}`
            },
            {
                headers,
            }).then((data) => {
                console.log(data)
            }).catch((err) => {
                console.log(err)
            })
        },
    },
}