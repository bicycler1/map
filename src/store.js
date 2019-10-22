import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    height1: '',
    height2: ''
  },
  mutations: {
    mountedHeight: function (state, data) {
      switch (data.name) {
        case 'trip':
          state.height1 = data.height
          break
        case 'eat':
          state.height2 = data.height
          break
      }
    }
  },
  actions: {

  }
})
