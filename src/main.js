import Vue from 'vue'
import App from './App.vue'
import 'common/stylus/index.styl'

import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
