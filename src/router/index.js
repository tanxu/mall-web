import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/pages/GoodsList'
import Cart from '@/pages/cart'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
