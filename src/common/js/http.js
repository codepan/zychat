import axios from 'axios'
import {Loading} from 'kiwi-vui'

/* eslint-disable no-undef */
console.dir(process.env)
/* eslint-disable no-undef */
console.log(process.env.NODE_ENV)

const baseURL = process.env.NODE_ENV === 'development' ? window.config.baseURL.development : process.env.NODE_ENV === 'production' ? window.config.baseURL.production : window.config.baseURL.test

const $http = axios.create({
  baseURL,
  timeout: 30000
})

$http.interceptors.request.use(request => {
  Loading.open()
    // if (request.url.indexOf('/user/') !== -1){
    //     let user = localStorage.getItem('user')
    //     if (!user && user.length === 0){
    //         this.$router.push('/user/login')
    //     }
    // }
  return request
}, error => {
  return Promise.reject(error)
})

$http.interceptors.response.use(response => {
  Loading.close()
  return response && response.data
}, error => {
  return Promise.reject(error)
})

export default $http
