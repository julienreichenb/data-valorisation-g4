import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const requireContext = require.context("./modules", false, /.*\.js$/)

const modules = requireContext
  .keys()
  .map(file => [file.replace(/(^.\/)|(\.js$)/g, ""), requireContext(file)])
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true
    }
    return { ...modules, [name]: module }
  }, {})

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState({
    paths: [
      'base.npaList',
      'base.districtsList',
      'base.pinnedList',
      'auth.accessToken',
    ]
  })],
})
