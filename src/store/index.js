import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
  dm_show: false,
  sb_show: false,
  breadcrumbRouteList: [],
}

export default new Vuex.Store({
   state,
   actions,
   mutations,
   modules: {

   }
})
