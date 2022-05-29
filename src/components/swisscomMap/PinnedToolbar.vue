<template>
    <div id="pinned-toolbar" :class="show && 'show'">
        <div id="pinned-button" class="d-flex align-items-center justify-content-center" @click="show = !show">
            <font-awesome-layers>
                <font-awesome-icon class="fa-2x text-primary" icon="map-pin" transform="left-2" />
                <font-awesome-layers-text v-if="list && list.length" 
                    class="small font-weight-bold text-secondary bg-primary rounded-circle px-1" 
                    transform="down-11 right-12" 
                    :value="list.length" />
            </font-awesome-layers>
        </div>
        <div id="pinned-content" class="pb-1 pt-3 px-3">
            <h5 class="text-primary mb-3" v-text="`Recherches épinglées`" />
            <p class="mb-1 font-italic" v-if="!list || !list.length" v-text="`Aucune recherche épinglée.`" />
            <div v-else>
                <div v-for="(pinned, index) in list" 
                    :key="pinned.id" 
                    class="small py-2 border-light d-flex justify-content-between align-items-center"
                    :class="index > 0 && 'border-top'"                    
                >
                    <span class="pinned-item" v-html="`<b>${pinned.locationType === 'municipalities' ? `${pinned.location.npa} ${pinned.location.name}` : pinned.location.name}</b> de <b>${formatDate(pinned.startDate, pinned.startTime)}</b> à <b>${formatDate(pinned.endDate, pinned.endTime)}</b>`"
                        @click="$emit('set', pinned)"
                    />
                    <font-awesome-icon class="text-danger" icon="times" @click="$emit('remove', index)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'PinnedToolbar',
    props: {
        list: { type: Array, default: null },
    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        formatDate(date, time) {
            return moment(`${date} ${time}`, 'YYYY-MM-DD hh:mm').format('DD MMM YY hh:mm')
        },
    },
}
</script>

<style lang="scss">
#pinned-toolbar {
    z-index: 1000;
    position: fixed;
    right: 0;
    top: 150px;
    background: theme-color('secondary');
    width: 400px;
    transform: translateX(401px);
    transition: ease-in-out .3s;

    &.show {
        transform: translateX(0);
    }

   & #pinned-button {
        position: relative;
        z-index: 50;
        top: 0px;
        left: -50px;
        height: 50px;
        max-width: 50px;
        cursor: pointer;
        background: theme-color('secondary');
        border-radius: 20px 0 0 20px;
        border: 1px solid theme-color('primary');
        border-right: none;
   }

   & #pinned-content {
        position: absolute;
        z-index: 40;
        top: 0;
        left: -1px;
        width: 100%;
        max-height: 400px !important;
        overflow-y: scroll;
        background: theme-color('secondary');
        border: 1px solid theme-color('primary');
        border-right: none;
        border-radius: 0 0 0 5px;
    }

    .pinned-item {
        cursor: pointer;

        &:hover {
            color: theme-color('primary');
        }
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px theme-color('light'); 
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: theme-color('primary');
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: theme-color('primary'); 
    }
}
</style>