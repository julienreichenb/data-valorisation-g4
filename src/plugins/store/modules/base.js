export const state = {
    npaList: [],
    districtsList: [],
    pinnedList: [],
}

export const mutations = {
    set_npa_list(state, npaList) {   
        state.npaList = npaList
    },
    set_districts_list(state, districtsList) {   
        state.districtsList = districtsList
    },
    add_pinned(state, newPinned) {
        state.pinnedList.push(newPinned)
    },
    remove_pinned(state, id) {
        state.pinnedList.splice(id, 1)
    },
}

export const actions = {
    setNpaList({ commit }, npaList) {
        commit('set_npa_list', npaList)
    },
    setDistrictsList({ commit }, districtsList) {
        commit('set_districts_list', districtsList)
    },
    addPinned({ commit }, newPinned) {
        commit('add_pinned', newPinned)
    },
    removePinned({ commit }, id) {
        commit('remove_pinned', id)
    },
}

export const getters = {
    npaList: (state) => {
        return state.npaList
    },
    districtsList: (state) => {
        return state.districtsList
    },
    pinnedList: (state) => {
        return state.pinnedList
    },
}