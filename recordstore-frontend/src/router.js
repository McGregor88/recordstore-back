import Vue from 'vue'
import Router from 'vue-router'
import Signin from './views/Signin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Signin
  }]
})