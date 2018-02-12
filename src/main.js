// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.use(infiniteScroll);
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: '/static/loading/loading-balls.svg'
})

const store = new Vuex.Store({
  state: {
    userInfo: {},
    cartCount: ''
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo.nickName = userInfo.nickName
    },
    initCartCount(state, cartCount) {
      state.cartCount = cartCount;
    },
    incrementCartCount(state, cartCount) {
      state.cartCount += cartCount;
    },
    decrementCartCount(state, cartCount) {
      state.cartCount -= cartCount;
    }
  }
})


// 全局过滤器
// import {currency} from "@/utils/currency";
// Vue.filter('currency', currency)

import './assets/css/base.css'
import './assets/css/product.css'
import './assets/css/login.css'
import './assets/css/checkout.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
