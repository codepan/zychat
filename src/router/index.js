import Vue from 'vue'
import VueRouter from 'vue-router'

import contactList from '../pages/contact/contact-list.vue'
import register from '../pages/user/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/contact',
    component: contactList
  },
  {
    path: '/user/register',
    component: register
  }
]

const vueRouter = new VueRouter({
  routes
})

export default vueRouter
