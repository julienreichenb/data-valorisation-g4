<template>
    <b-form id="inputs" @submit="updateMap">
        <b-row>
            <b-col>
                <h6 v-text="'Lieu'" />
                <b-input-group>
                    <template #prepend>
                        <div class="custom-input-icon">
                            <font-awesome-icon class="text-primary" icon="map-marker-alt" />
                        </div>
                    </template>
                    <b-select class="custom-input" v-model="form.locationType"
                        :options="locationTypes"
                    />
                </b-input-group>
                <b-input-group>
                    <template #prepend>
                        <div class="custom-input-icon">
                            <font-awesome-icon class="text-primary" icon="calendar-minus" />
                        </div>
                    </template>
                    <vue-bootstrap-typeahead v-if="form.locationType === 0"
                        class="flex-grow"
                        inputClass="custom-input"
                        backgroundVariant="secondaryLighter"
                        textVariant="dark"
                        v-model="locationSearch"
                        :placeholder="'Rechercher un nom ou un code postal...'"
                        :data="npaList"          
                        :serializer="s => s.name"      
                        @hit="form.location = $event"        
                    >
                        <template slot="suggestion" slot-scope="{ data }">
                            <div class="d-flex align-items-center">   
                                <CantonFlag :canton="data.canton" /> 
                                <div class="ml-3">
                                    <p class="mb-0" v-html="data.name" />
                                    <p class="mb-0 text-muted" v-html="data.npa" />
                                </div>                                                
                            </div>
                        </template>
                    </vue-bootstrap-typeahead>
                    <vue-bootstrap-typeahead v-if="form.locationType === 1"
                        class="flex-grow"
                        inputClass="custom-input"
                        backgroundVariant="secondaryLighter"
                        textVariant="dark"
                        v-model="locationSearch"
                        :placeholder="'Rechercher un nom ou un code postal...'"
                        :data="districtsList"          
                        :serializer="s => s.name"      
                        @hit="form.location = $event"        
                    >
                        <template slot="suggestion" slot-scope="{ data }">
                            <div class="d-flex align-items-center">   
                                <CantonFlag size="30px" :canton="data.canton"  /> 
                                <div class="ml-3">
                                    <p class="mb-0" v-html="data.name" />
                                </div>                                                
                            </div>
                        </template>
                    </vue-bootstrap-typeahead>
                </b-input-group>
            </b-col>
            <b-col>
                <h6 v-text="'Date de début'" />
                <b-input-group>
                    <template #prepend>
                        <div class="custom-input-icon">
                            <font-awesome-icon class="text-primary" icon="calendar-minus" />
                        </div>
                    </template>
                    <b-datepicker class="custom-input" dark v-model="form.startDate" :min="minDate" :max="form.endDate || maxDate" placeholder="Date de début" />
                </b-input-group>
                <b-input-group>
                    <template #prepend>
                        <div class="custom-input-icon">
                            <font-awesome-icon class="text-primary" icon="clock" />
                        </div>
                    </template>
                    <b-select class="custom-input" v-model="form.startTime"
                        required
                        :options="startHours"
                    >
                        <template #first>
                            <b-form-select-option :value="null" disabled selected v-text="'Heure de début'" />
                        </template>                    
                    </b-select>
                </b-input-group>
            </b-col>    
            <b-col>
                <h6 v-text="'Date de fin'" />
                <b-input-group>
                    <template #prepend>
                        <div class="custom-input-icon">
                            <font-awesome-icon class="text-primary" icon="calendar-minus" />
                        </div>
                    </template>
                    <b-datepicker class="custom-input" v-model="form.endDate" :min="form.startDate || minDate" :max="maxDate" placeholder="Date de fin" />
                </b-input-group>
                <b-input-group>
                    <template #prepend>
                        <div class="custom-input-icon">
                            <font-awesome-icon class="text-primary" icon="clock" />
                        </div>
                    </template>
                    <b-select class="custom-input" v-model="form.endTime"
                        required
                        :options="endHours"
                    >
                        <template #first>
                            <b-form-select-option :value="null" disabled selected v-text="'Heure de fin'" />
                        </template>
                    </b-select>
                </b-input-group>
            </b-col>                 
        </b-row>
        <div>
            <b-button class="text-primary" type="submit" variant="dark">
                <font-awesome-icon class="mr-2" icon="sync-alt" />
                <span v-text="'Rafraîchir la carte'" />
            </b-button>
        </div>
    </b-form>
</template>

<script>
import moment from 'moment'
import BaseDataMixin from '@/mixins/baseData'
import CantonFlag from '@/components/swisscomMap/CantonFlag'
export default {
    name: 'Inputs',
    mixins: [BaseDataMixin],
    components: {
        CantonFlag,
    },
    data() {
        return {
            form: {
                locationType: 0,
                location: null,
                startDate: null,
                startTime: null,
                endDate: null,
                endTime: null,                
            },
            locationSearch: '',
            hours: [
                '00:00',
                '01:00',
                '02:00',
                '03:00',
                '04:00',
                '05:00',
                '06:00',
                '07:00',
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00',
                '23:00',
            ],
        }
    },
    watch: {
        'form.startDate'(oldV, newV) {            
            if(oldV != newV) this.form.startTime = null
        },
        'form.endDate'(oldV, newV) {            
            if(oldV != newV) this.form.endTime = null
        },
    },
    computed: {
        locationTypes() {
            return [
                {
                    value: 0,
                    text: 'Municipalité',
                },
                {
                    value: 1,
                    text: 'District',
                },
                {
                    value: 2,
                    text: 'Personnalisé (GeoJson)',
                },
            ]
        },
        startHours() {
            return moment(this.form.startDate).isSame(moment(this.form.endDate))
                ? (
                    this.form.endTime 
                        ? this.hours.slice(0, this.hours.indexOf(this.form.endTime) + 1)
                        : this.hours
                )
                : this.hours
        },
        endHours() {
            return moment(this.form.startDate).isSame(moment(this.form.endDate))
                ? (
                    this.form.startTime 
                        ? this.hours.slice(this.hours.indexOf(this.form.startTime))
                        : this.hours
                )
                : this.hours
        },
        minDate() {
            return moment('2020-01-01').toDate()
        },
        maxDate() {
            return moment().subtract(1, 'days').toDate()
        },
    },
    methods: {
        updateMap(e) {
            e.preventDefault()            
            this.$emit('update', this.form)
        },
    },
}
</script>

<style lang="scss">
#inputs {
    h6 {
        font-weight: bold;
    }

    .custom-input-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.2em;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-color: theme-color('dark');
    }

    .custom-input {
        background-color: theme-color-level('secondary', -2);
        color: theme-color('light');
        border-color: theme-color('dark');
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;

        &::placeholder,
        label.text-muted,
        &:required:invalid {
            color: theme-color-level('light', 4) !important;
        }

        option[value=""][disabled] {
            display: none;
        }

        button {
            opacity: 0;
        }

        label {
            margin-left: -36px;
            color: theme-color('light');
        }
    }

    .input-group[role="group"] {
        margin-bottom: 10px;
    }
}

</style>