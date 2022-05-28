export const state = {
    accessToken: null,
    attempts: 0,
}

export const mutations = {
    set_access_token(state, accessToken) {   
        state.accessToken = accessToken
    },
    increase_attempts(state) {
        state.attempts += 1
    },
    reset_attempts(state) {
        state.attempts = 0
    },
}

export const actions = {
    setAccessToken({ commit }, accessToken) {
        commit('set_access_token', accessToken)
    },
    increaseAttempts({ commit }) {
        commit('increase_attempts')
    },
    resetAttempts({ commit }) {
        commit('reset_attempts')
    },
}

export const getters = {
    accessToken: (state) => {
        return state.accessToken
    },
    attempts: (state) => {
        return state.attempts
    },
}