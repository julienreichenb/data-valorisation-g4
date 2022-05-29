<template>
    <b-form-slider
        v-if="data && data[0] !== undefined"
        id="time-slider"
        class="w-100"
        :min="data && 0"
        :max="data && data.length - 1"
        :value="current && currentIndex"
        :ticks="ticks"
        :ticks-labels="ticklabels"
        :enabled="current"
        tooltip="hide"
        @change="update"
    />
</template>

<script>
import moment from 'moment'
export default {
    name: 'TimeLine',
    props: {
        current: { type: Object, default: null },
        currentIndex: { type: Number, default: 0 },
        data: { type: Array, default: null },
    },
    data() {
        return {
            playInterval: null,
        }
    },
    computed: {
        ticks() {
            return this.data.map((d, index) => {
                return index
            })
        },
        ticklabels() {
            return this.data.map((d) => {                
                return moment(d).locale('fr').format(`${Math.abs(this.data[0].diff(this.data[this.data.length - 1], 'hours')) < 24 ? 'HH:mm' : 'D MMM YYYY'}`)
            })
        },
    },
    methods: {
        play() {
            this.playInterval = setInterval(() => {
                if(this.currentIndex < this.data.length - 1)
                    this.$emit('update', this.currentIndex + 1)
                else
                    this.stop()
            }, 1500)
        },
        stop() {            
            clearInterval(this.playInterval)
            this.$emit('over')
        },
        update(i) {
            this.stop()
            this.$emit('update', i.newValue)
        },
    },
}
</script>

<style lang="scss">
#time-slider {
    width: 100%;
    padding: 0;

    .slider.slider-horizontal {
        width: 100% !important;
    }

    .slider-track-high {
        background: theme-color('secondary');
        border: 1px solid theme-color-level('secondary', -2);
        transition: ease-in-out .7s;
    }

    .slider-selection {
        background: theme-color-level('light', 3);
        border: 1px solid theme-color-level('secondary', -2);
    }

    .slider-tick {
        opacity: 1;
        background: theme-color('dark');
        border: 1px solid theme-color-level('secondary', -2);
        transition: ease-in-out .7s;

        &.in-selection {
            background: theme-color('light');
            border: 1px solid theme-color-level('primary', -2);
            transition: ease-in-out .7s;
        }
    }

    .slider-handle {
        background: theme-color('primary');
        border: 1px solid theme-color-level('light', -2);
        transition: ease-in-out .7s;
    }

    .slider-tick-label {
        font-size: .8em;
    }

    .slider-tick-label:first-child:nth-last-child(n+8),
    .slider-tick-label:first-child:nth-last-child(n+8) ~ .slider-tick-label {
        &:nth-child(odd) {
            transform: translateY(15px);
        }
    }
}
</style>