import Vue from 'vue'
import App from './App.vue'

// 路由
import router from './router/index.js'

// ajax请求
import $http from './common/js/http.js'
Vue.prototype.$http = $http

// md5工具
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// kiwi-vui组件库
import 'kiwi-vui/lib/style.css'
import KiwiUI from 'kiwi-vui'
Vue.use(KiwiUI)

new Vue ({
  el: '#app',
  render: h => h(App),
  router
})
