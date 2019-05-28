import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import {
  securedAxiosInstance,
  plainAxiosInstance
} from './backend/axios'

Vue.config.productionTip = false

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

new Vue({
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  render: h => h(App)
}).$mount('#app')