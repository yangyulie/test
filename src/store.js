import Vue from 'vue'
import Vuex from 'vuex'
// import app from '@/store/modules/app'
// import getters from './store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    setUserInfo (context, data) {
      context.commit('setUserInfo', data)
    }
  }
})

export default store
