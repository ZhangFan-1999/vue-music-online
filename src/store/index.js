import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from '@/store/actions'
import * as getters from '@/store/getters'
import state from '@/store/state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})