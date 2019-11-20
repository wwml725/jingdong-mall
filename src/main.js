import Vue from 'vue'
import App from './App.vue'
import 'common/stylus/index.styl'

import router from './router'
import store from './store'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

//
let loadimg = require("common/images/loading.png")
import VueLazyload from 'vue-lazyload'
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: loadimg,
  attempt: 1
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
