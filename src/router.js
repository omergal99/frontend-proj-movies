import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import MovieApp from './views/MovieApp.vue' // all
import MovieDetails from './views/MovieDetails.vue' //all
import UserDetails from './views/UserDetails.vue' //all


import UserEnter from './views/User.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: MovieApp
    },
    {
      path: '/movies/details/:movieId',
      name: 'movieDetails',
      component: MovieDetails
    },
    {
      path: '/login',
      name: 'login',
      component: UserEnter
    },
    {
      path: '/user/details/:userId',
      name: 'UserDetails',
      component: UserDetails
     
    }    
  ]
})