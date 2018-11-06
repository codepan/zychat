import Vue from 'vue'
import VueRouter from 'vue-router'

import contactList from '../pages/contact/contact-list.vue'
import register from '../pages/user/register.vue'
import login from '../pages/user/login.vue'
import home from '../pages/home/home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/user/register',
        component: register
    }, {
        path: '/user/login',
        component: login
    }, {
        path: '/',
        redirect: '/user/login'
    }, {
        path: '/home',
        component: home
    }, {
        path: '/contact',
        component: contactList
    }
]

const vueRouter = new VueRouter({
    routes
})

export default vueRouter
