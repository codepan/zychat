import Vue from 'vue'
import VueRouter from 'vue-router'

import contactList from '../pages/contact/contact-list.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/contact',
    component: contactList
  }
]

const vueRouter = new VueRouter({
  routes
})

export default vueRouter
