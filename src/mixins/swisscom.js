export default {
    data() {
        return {
            HEATMAPS_URI: 'heatmaps/standard',
            OD_URI: 'origin-destination/standard',
        }
    },
    methods: {
        loadTiles() {
            console.log(this.params.location)
            this.axios.get(`${this.HEATMAPS_URI}/grids/${this.params.locationType}/${this.params.location.numDistrict}`)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    },
}