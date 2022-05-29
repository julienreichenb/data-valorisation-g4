<template>
    <div>
        <b-form id="inputs" class="content-bg" @submit="updateMap">
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
                    <b-input-group :state="validateState('location')">
                        <template #prepend>
                            <div class="custom-input-icon">
                                <font-awesome-icon class="text-primary" icon="search-location" />
                            </div>
                        </template>
                        <vue-bootstrap-typeahead v-if="form.locationType === 'municipalities'"
                            ref="typeahead"
                            class="flex-grow"
                            inputClass="custom-input"
                            backgroundVariant="secondaryLighter"
                            textVariant="dark"
                            v-model="locationSearch"
                            :placeholder="'Municipalité ou code postal...'"
                            :data="npaList"          
                            :serializer="s => `${s.npa} ${s.name}`"      
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
                        <vue-bootstrap-typeahead v-else-if="form.locationType === 'districts'"
                            ref="typeahead"
                            class="flex-grow"
                            inputClass="custom-input"
                            backgroundVariant="secondaryLighter"
                            textVariant="dark"
                            v-model="locationSearch"
                            :placeholder="'District...'"
                            :data="districtsList"          
                            :serializer="s => `${s.name}`"      
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
                        <b-form-file v-else class="custom-file"
                            :class="form.location && 'file-filled'"
                            v-model="form.location" 
                            placeholder="Fichier GeoJSON..."
                            accept=".geojson"
                            browseText="..."
                        />
                    </b-input-group>
                </b-col>
                <b-col>
                    <h6 v-text="'Date de début'" />
                    <b-input-group :state="validateState('startDate')">
                        <template #prepend>
                            <div class="custom-input-icon">
                                <font-awesome-icon class="text-primary" icon="calendar-minus" />
                            </div>
                        </template>
                        <b-datepicker class="custom-input" 
                            v-model="form.startDate" 
                            :min="minDate" 
                            :max="form.endDate || maxDate"
                            placeholder="Date de début"
                        />
                    </b-input-group>
                    <b-input-group>
                        <template #prepend>
                            <div class="custom-input-icon">
                                <font-awesome-icon class="text-primary" icon="clock" />
                            </div>
                        </template>
                        <b-select class="custom-input" 
                            v-model="form.startTime"
                            required
                            :options="startHours"
                            :state="validateState('startTime')"
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled selected v-text="'Heure de début'" />
                            </template>                    
                        </b-select>
                    </b-input-group>
                </b-col>    
                <b-col>
                    <h6 v-text="'Date de fin'" />
                    <b-input-group :state="validateState('endDate')">
                        <template #prepend>
                            <div class="custom-input-icon">
                                <font-awesome-icon class="text-primary" icon="calendar-minus" />
                            </div>
                        </template>
                        <b-datepicker class="custom-input"                     
                            v-model="form.endDate" 
                            :min="form.startDate || minDate" 
                            :max="maxDate" 
                            placeholder="Date de fin"
                        />
                    </b-input-group>
                    <b-input-group>
                        <template #prepend>
                            <div class="custom-input-icon">
                                <font-awesome-icon class="text-primary" icon="clock" />
                            </div>
                        </template>
                        <b-select class="custom-input" 
                            v-model="form.endTime"
                            required
                            :options="endHours"
                            :state="validateState('endTime')"
                        >
                            <template #first>
                                <b-form-select-option :value="null" 
                                    disabled 
                                    selected 
                                    v-text="'Heure de fin'"
                                />
                            </template>
                        </b-select>
                    </b-input-group>
                </b-col>                 
            </b-row>
            <div class="d-flex justify-content-between align-items-end mt-2">
                <div>
                    <b-button class="text-primary" type="submit" variant="dark" size="sm">
                        <font-awesome-icon class="mr-2" icon="sync-alt" :spin="loading" />
                        <span v-text="'Rafraîchir la carte'" />
                    </b-button>
                    <b-button class="ml-2" variant="light" size="sm" @click="reset">
                        <font-awesome-icon class="mr-2" icon="trash-alt" />
                        <span v-text="'Réinitialiser'" />
                    </b-button>
                    <b-button class="ml-2" variant="light" size="sm" @click="pinParams">
                        <font-awesome-icon class="mr-2" icon="map-pin" />
                        <span v-text="'Sauver'" />
                    </b-button>
                </div>
                <div class="font-italic">
                    <font-awesome-icon class="mr-1 text-warning" icon="exclamation-circle" size="sm" />
                    <small v-html="`Si plus de 24 heures séparent le début et la fin, les résultats seront toujours <u>journaliers</u>.`" />
                </div>
            </div>
            <b-alert class="mt-2 mb-0 d-flex align-items-center" variant="danger" :show="$v.form.$anyError">
                <font-awesome-icon class="mr-3" size="lg" icon="exclamation-triangle" />
                <span v-text="'Veuillez compléter tous les champs.'" />
            </b-alert>
        </b-form>
        <PinnedToolbar :list="pinnedList" @remove="removePinned" @set="setParams" />
    </div>
</template>

<script>
import { validationMixin } from "vuelidate"  
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'
import BaseDataMixin from '@/mixins/baseData'
import CantonFlag from '@/components/swisscomMap/CantonFlag'
import PinnedToolbar from '@/components/swisscomMap/PinnedToolbar'
export default {
    name: 'Inputs',
    mixins: [
        BaseDataMixin,
        validationMixin,
    ],
    components: {
        CantonFlag,
        PinnedToolbar,
    },
    props: {
        loading: { type: Boolean, default: false },
    },
    data() {
        return {
            form: {
                locationType: 'municipalities',
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
        'form.locationType'(oldV, newV) {
            if(oldV != newV) {
                this.form.location = null
                this.locationSearch = null
            }
        },
    },
    computed: {
        locationTypes() {
            return [
                {
                    value: 'municipalities',
                    text: 'Municipalité',
                },
                {
                    value: 'districts',
                    text: 'District',
                },
                {
                    value: 'geojson',
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
            this.$v.form.$touch()
            if (this.$v.form.$anyError) return
            this.$emit('update', this.form)
        },
        pinParams() {
            this.$v.form.$touch()
            if (this.$v.form.$anyError) return
            this.addPinned({...this.form})
        },
        async setParams(params) {
            await this.setPrimaryParams(params.locationType, params.startDate, params.endDate)
            this.form.startTime = params.startTime
            this.form.endTime = params.endTime
            this.form.location = params.location
            this.locationSearch = params.locationType === 'municipalities' ? `${params.location.npa} ${params.location.name}` : params.location.name
            this.$refs.typeahead.inputValue = params.locationType === 'municipalities' ? `${params.location.npa} ${params.location.name}` : params.location.name
        },
        async setPrimaryParams(locationType, startDate, endDate) {
            this.form.startDate = startDate
            this.form.endDate = endDate
            this.form.locationType = locationType
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name]
            return $dirty ? !$error : null
        },
        reset() {
            this.locationSearch = ''
            this.$refs.typeahead.inputValue = ''
            this.form = {
                locationType: 'municipalities',
                location: null,
                startDate: null,
                startTime: null,
                endDate: null,
                endTime: null,                
            }
        },
    },
    validations() {
        return {
            form: {
                location: {
                    required,
                },
                startDate: {
                    required,
                },
                startTime: {
                    required,
                },
                endDate: {
                    required,
                },
                endTime: {
                    required,
                },
            },
        }
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

        & > button {
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

    .custom-file {
        & label {
            border: none;
            background-color: theme-color-level('secondary', -2);  
            color: theme-color-level('light', 4);
            cursor: pointer;
        }

        &.file-filled label {
            color: theme-color('light') !important;
        }

        & label::after {
            background-color: theme-color('dark');
            color: theme-color('primary');
            height: 100%;
        }
    }
}

</style>