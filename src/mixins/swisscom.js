import AuthMixin from '@/mixins/auth'
export default {
    mixins: [AuthMixin],
    methods: {
        loadTiles() {
           //axios.get(`heatmaps/${params.locationType}`) 
        },
    },
}