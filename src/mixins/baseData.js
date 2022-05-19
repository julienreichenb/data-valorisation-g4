import { mapActions, mapGetters } from 'vuex'
import { dsv } from 'd3'
export default {
    computed: {
        ...mapGetters('base', ['npaList', 'districtsList']),
    },
    mounted() {
        this.loadNpaList()
        this.loadDistrictsList()
    },
    methods: {
        ...mapActions('base', ['setNpaList', 'setDistrictsList']),
        loadNpaList() {
            dsv(';', '/data/CodesPostaux.csv').then((data) => {
                this.setNpaList(data)
            })
        },
        loadDistrictsList() {
            dsv(';', '/data/Districts.csv').then((data) => {
                this.setDistrictsList(data)
            })
        },
    },
}