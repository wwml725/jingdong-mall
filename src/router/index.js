import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'components/home/home.vue'
import Classify from 'components/classify/classify.vue'
import Vip from 'components/vip/vip.vue'
import Cart from 'components/cart/cart.vue'
import Profile from 'components/profile/profile.vue'

console.log(Home)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/classify',
    name: 'classify',
    component: Classify
  },
  {
    path: '/vip',
    name: 'vip',
    component: Vip
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
  // {
  //   // path: '/about',
  //   // name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
