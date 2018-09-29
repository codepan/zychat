import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'

import $http from './common/js/http.js'

Vue.prototype.$http = $http

new Vue ({
  el: '#app',
  render: h => h(App),
  router
})
