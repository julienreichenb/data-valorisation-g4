export const state = {
    npaList: [],
    districtsList: [],
}

export const mutations = {
    set_npa_list(state, npaList) {   
        state.npaList = npaList
    },
    set_districts_list(state, districtsList) {   
        state.districtsList = districtsList
    },
}

export const actions = {
    setNpaList({ commit }, npaList) {
        commit('set_npa_list', npaList)
    },
    setDistrictsList({ commit }, districtsList) {
        commit('set_districts_list', districtsList)
    },
}

export const getters = {
    npaList: (state) => {
        return state.npaList
    },
    districtsList: (state) => {
        return state.districtsList
    },
}