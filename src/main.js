import Vue from 'vue'
import Vuesax from 'vuesax'
import axios from 'axios'
import VueAxios from 'vue-axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import App from './App'
import HttpService from './assets/HTTPService'
import router from './router'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'

const plugin = {
  install () {
    Vue.api = HttpService
    Vue.prototype.$api = HttpService
  }
}

Vue.use(Vuesax)
Vue.use(VueAxios, axios)
Vue.use(plugin)
Vue.config.productionTip = false
Vue.prototype.API_URL = 'http://localhost:8080'

/* eslint-disable no-new */
new Vue({
  created () {
    AOS.init({disabled: 'phone'})
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
