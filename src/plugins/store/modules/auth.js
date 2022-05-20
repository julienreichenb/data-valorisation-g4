export const state = {
    accessToken: null,
}

export const mutations = {
    set_access_token(state, accessToken) {   
        state.accessToken = accessToken
    },
}

export const actions = {
    setAccessToken({ commit }, accessToken) {
        commit('set_access_token', accessToken)
    },
}

export const getters = {
    accessToken: (state) => {
        return state.accessToken
    },
}