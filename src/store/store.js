import Vue from 'vue'
import Vuex from 'vuex'

import moviesModule from './MovieStore'
import usersModule from './UserStore'
import reviewsModule from './ReviewStore'

Vue.use(Vuex)

// Main store
export default new Vuex.Store({
  modules: {
    moviesModule: moviesModule,
    usersModule : usersModule,
    reviewsModule: reviewsModule
  }
})