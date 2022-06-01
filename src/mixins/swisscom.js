import moment from 'moment'
import axios from 'axios'
export default {
    data() {
        return {
            loading: false,
            HEATMAPS_URI: 'heatmaps/standard',
            OD_URI: 'origin-destination/standard',
            tiles: null,
            heatmaps: [],
        }
    },
    methods: {
        async loadData() {
            this.loading = true
            await this.loadAllWrapper().then(() => this.loading = false)
        },
        async loadAllWrapper() {
            return new Promise((resolve) => {
                resolve(this.loadHeatmapData())
            })
        },
        async loadHeatmapData() {
            this.heatmaps = [] // Reset data
            if(this.params.locationType === 'geojson') {
                const data = await this.readGeoJSONFile(this.params.location)
                await this.axios.post(`${this.HEATMAPS_URI}/grids/${this.params.locationType}/WGS84`, data.features[0].geometry)
                    .then(async (res) => {
                        this.tiles = res.data.tiles
                        const formattedStart = moment(`${this.params.startDate} ${this.params.startTime}`, 'YYYY-MM-DD hh:mm')
                        const formattedEnd = moment(`${this.params.endDate} ${this.params.endTime}`, 'YYYY-MM-DD hh:mm')
                        await this.heatmapQueriesWrapper(this.tiles, formattedStart, formattedEnd)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    .finally(async () => {
                        await this.arrangeHeatmapsData()
                    })
            }
            else
                await this.axios.get(`${this.HEATMAPS_URI}/grids/${this.params.locationType}/${this.params.locationType === 'municipalities' ? this.params.location.ofsNumber : this.params.location.numDistrict}`)
                    .then(async (res) => {
                        this.tiles = res.data.tiles
                        const formattedStart = moment(`${this.params.startDate} ${this.params.startTime}`, 'YYYY-MM-DD hh:mm')
                        const formattedEnd = moment(`${this.params.endDate} ${this.params.endTime}`, 'YYYY-MM-DD hh:mm')
                        await this.heatmapQueriesWrapper(this.tiles, formattedStart, formattedEnd)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    .finally(async () => {
                        await this.arrangeHeatmapsData()
                    })
        },
        async readGeoJSONFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => {
                    resolve(JSON.parse(reader.result))
                }
                reader.onerror = reject
                reader.readAsText(file)
            })
        },
        async heatmapQueriesWrapper(tiles, start, end) {
            const queries = await this.prepareQueries(tiles, start, end) 
            for(let i = 0; i < queries.length; i++) {                
                this.heatmaps.push({
                    datetime: queries[i].datetime,
                    data: [],
                })                
                await axios.all(queries[i].tilesQueries.map((q) => this.axios.get(q)))
                    .then(axios.spread((...responses) => {
                        responses.map((res) => {
                            if(res.status && res.status < 300)
                                this.heatmaps[i].data = [...this.heatmaps[i].data, ...res.data.tiles]
                        })
                    })
                )                  
            }  
        },
        async arrangeHeatmapsData() {
            let arrangedHeatmaps = []
            this.heatmaps.map((h, index) => {
                arrangedHeatmaps.push({
                    datetime: h.datetime,
                    demographic: [],
                    density: [],
                    uniqueCount: [],
                })
                h.data.map((tile) => {
                    if(tile.maleProportion || tile.ageDistribution)
                        arrangedHeatmaps[index].demographic.push(tile)
                    else if(tile.score)
                        arrangedHeatmaps[index].density.push(tile)
                    else if(tile.count)
                        arrangedHeatmaps[index].uniqueCount.push(tile)
                })
            })
            this.heatmaps = arrangedHeatmaps
        },
        async prepareQueries(tiles, start, end) {
            const queries = []
            const currentDate = start.clone() // Init date clone            
            if(this.getHourlyOrDailyMode(start, end) === 'hourly')
                while (end.isSameOrAfter(currentDate, 'hour')) {
                    const tempDate = currentDate.clone()
                    const tempTiles = [...tiles]
                    queries.push({
                        datetime: tempDate,
                        tilesQueries: await this.performTilesLoop(tempTiles, tempDate, 'hourly')
                    }) 
                    currentDate.add(1, 'hours')
                }            
            else
                while (end.isSameOrAfter(currentDate, 'day')) {
                    const tempDate = currentDate.clone()
                    const tempTiles = [...tiles]
                    queries.push({
                        datetime: tempDate,
                        tilesQueries: await this.performTilesLoop(tempTiles, tempDate, 'daily')
                    })    
                    currentDate.add(1, 'days')
                }
            return queries
        },
        async performTilesLoop(tiles, date, mode) {
            let tilesQueries = []
            while(tiles.length) {
                const tempTiles = tiles.splice(0, 100)
                tilesQueries = tilesQueries.concat(await this.queriesCollection(tempTiles, date, mode))
            }
            return tilesQueries
        },
        async queriesCollection(tiles, date, mode) {
            return [
                this.demographicsQuery(tiles, date, mode),
                this.densityQuery(tiles, date, mode),
                this.uniqueCountQuery(tiles, date, mode)
            ]
        },
        getHourlyOrDailyMode(start, end) {
            return Math.abs(start.diff(end, 'hours')) > 24 ? 'daily' : 'hourly'
        },
        demographicsQuery(tiles, date, mode) {
            return `${this.axios.defaults.baseURL}/${this.HEATMAPS_URI}/heatmaps/dwell-demographics/${this.getHourlyOrDailyParams(date, mode)}?${this.getTilesParams(tiles)}`
        },
        densityQuery(tiles, date, mode) {
            return `${this.axios.defaults.baseURL}/${this.HEATMAPS_URI}/heatmaps/dwell-density/${this.getHourlyOrDailyParams(date, mode)}?${this.getTilesParams(tiles)}`
        },
        uniqueCountQuery(tiles, date, mode) {
            return `${this.axios.defaults.baseURL}/${this.HEATMAPS_URI}/heatmaps/unique-counts/${this.getHourlyOrDailyParams(date, mode)}?${this.getTilesParams(tiles)}`
        },
        getHourlyOrDailyParams(date, mode) {
            return mode === 'daily' ? `daily/${date.format('yyyy-MM-DD')}` : `hourly/${date.format('yyyy-MM-DDTHH:mm')}`
        },
        getTilesParams(tiles) {
            let tilesQuery = ''
            for(let i = 0; i < tiles.slice(0, 70).length; i++)
                tilesQuery += `tiles=${tiles[i].tileId}&`            
            return tilesQuery.slice(0, -1) // Remove last '&' char
        },
    },
}