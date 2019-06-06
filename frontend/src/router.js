import Vue from 'vue'
import Router from 'vue-router'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'
import Artists from './views/Artists.vue'
import Records from './views/Records.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/artists',
      name: 'artists',
      component: Artists
    },
    {
      path: '/records',
      name: 'records',
      component: Records
    }
  ]
})