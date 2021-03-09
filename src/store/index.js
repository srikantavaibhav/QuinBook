import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: true
  },
  getters: {
    login (state) {
      return state.isLogin
    }
  },
  mutations: {
    setLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {
    setLoginAction ({ commit }, value) {
      commit('setLogin', value)
    }
  }
})
