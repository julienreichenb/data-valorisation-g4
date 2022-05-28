<template>
    <b-card-group class="my-3" deck>
        <b-card bg-variant="dark" 
            header-bg-variant="secondary"
            no-body
        >
            <template #header>
                <h5 class="mb-0" v-text="`Total de visiteurs`" />
            </template>
            <b-card-body>
                <div v-if="uniqueCount">
                    <div class="lead font-weight-bold" v-text="uniqueCount.toLocaleString('fr')" />
                    <p v-text="`Visiteurs uniques`" />
                </div>
                <div v-else class="font-italic text-light" v-text="`Données démographiques indisponibles avec ces paramètres.`" />
            </b-card-body>
        </b-card>
        <b-card bg-variant="dark" 
            header-bg-variant="secondary"
            no-body
        >
            <template #header>
                <div class="d-flex">
                    <h5 class="mb-0" v-text="`Genres des visiteurs`" />
                    <QuestionTooltip :id="`gender`" text="Attention, pour des raisons de confidentialité, le genre est estimé selon la <b>distribution de la commune de résidence des visiteurs</b> et ne correspond donc pas à la réalité." />
                </div>
            </template>
            <b-card-body>
                <div v-if="maleProportion">
                    <div class="d-flex align-items-center">
                        <font-awesome-icon class="fa-2x" icon="male" color="skyblue" />
                        <div class="ml-4">
                            <div class="small" v-text="`Hommes`" />
                            <div v-html="`<b>${maleProportion.toLocaleString('en', {style: 'percent', minimumFractionDigits: 2})}</b>`" />
                        </div>
                    </div>
                    <div class="d-flex align-items-center mt-2">
                        <font-awesome-icon class="fa-2x" icon="female" color="lightpink" />
                        <div class="ml-4">
                            <div class="small" v-text="`Femmes`" />
                            <div v-html="`<b>${(1 - maleProportion).toLocaleString('en', {style: 'percent', minimumFractionDigits: 2})}</b>`" />
                        </div>
                    </div>
                </div>
                <div v-else class="font-italic text-light" v-text="`Données démographiques indisponibles avec ces paramètres.`" />
            </b-card-body>
        </b-card>
        <b-card bg-variant="dark" 
            header-bg-variant="secondary"
            no-body
        >
            <template #header>
                <div class="d-flex">
                    <h5 class="mb-0" v-text="`Âges des visiteurs`" />
                    <QuestionTooltip :id="`age`" text="Attention, pour des raisons de confidentialité, l'âge est estimé selon la <b>distribution de la commune de résidence des visiteurs</b> et ne correspond donc pas à la réalité." />
                </div>
            </template>
            <b-card-body>
                <b-row v-if="ageProportion[0]" cols="2" >
                    <b-col class="mb-2" v-for="(age, index) in ageProportion" :key="index">
                        <div class="small" v-text="getAgeLabel(index)" />
                        <div v-html="`<b>${age.toLocaleString('en', {style: 'percent', minimumFractionDigits: 2})}</b>`" />
                    </b-col>
                </b-row>
                <div v-else class="font-italic text-light" v-text="`Données démographiques indisponibles avec ces paramètres.`" />
            </b-card-body>
        </b-card>
    </b-card-group>
</template>

<script>
import QuestionTooltip from '@/components/swisscomMap/QuestionTooltip'
export default {
    name: 'KPIs',
    props: {
        data: { type: Object, default: null },
    },
    components: {
        QuestionTooltip,
    },
    computed: {
        maleProportion() {
            return this.data.demographic.reduce((total, next) => total + next.maleProportion, 0) / this.data.demographic.filter((d) => !!d.maleProportion).length
        },
        ageProportion() {
            return [
                    this.data.demographic.reduce((total, next) => total + (next.ageDistribution ? next.ageDistribution[0] : 0), 0) / this.data.demographic.filter((d) => d.ageDistribution && d.ageDistribution[0]).length,
                    this.data.demographic.reduce((total, next) => total + (next.ageDistribution ? next.ageDistribution[1] : 0), 0) / this.data.demographic.filter((d) => d.ageDistribution && d.ageDistribution[1]).length,
                    this.data.demographic.reduce((total, next) => total + (next.ageDistribution ? next.ageDistribution[2] : 0), 0) / this.data.demographic.filter((d) => d.ageDistribution && d.ageDistribution[2]).length,
                    this.data.demographic.reduce((total, next) => total + (next.ageDistribution ? next.ageDistribution[3] : 0), 0) / this.data.demographic.filter((d) => d.ageDistribution && d.ageDistribution[3]).length,
                ]
        },
        uniqueCount() {
            return this.data.uniqueCount.reduce((total, next) => total + next.count, 0)
        },
    },
    methods: {
        getAgeLabel(index) {
            switch(index) {
                case 0: return 'Moins de 20 ans'
                case 1: return 'Entre 20 et 39 ans'
                case 2: return 'Entre 40 et 64 ans'
                case 3: return 'Plus de 64 ans'
            }
        },
    },
}
</script>

<style>

</style>