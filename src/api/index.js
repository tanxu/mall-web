import * as host from './config'
import './axiosConfig'
import {get, post} from './fetch'

// 商品
export const Goods = {
  /**
   * 获取商品列表
   */
  getList(params) {
    // let data = Object.assign({}, params, {
    //   where: http.PREVIEW_NEW_WHERE_TEST
    // })
    return get(host.GET_GOODS_LIST, params)
  },
  /**
   * 加入购物车
   * @param params
   * @returns {*}
   */
  addCart(params) {
    // let data = Object.assign({}, params, {
    //   where: http.PREVIEW_NEW_WHERE_TEST
    // })
    return post(host.ADD_CART, params)
  },
};

export const Users = {
  /**
   * 用户登录
   */
  login(params) {
    return post(host.USERS_LOGIN, params)
  },
  logout(params) {
    return post(host.USERS_LOGOUT, params)
  },
  check(params) {
    return get(host.CHECK_LOGIN, params)
  },
  cartList(params) {
    return get(host.CART_LIST, params)
  },
  cartDelOne(params) {
    return post(host.CART_DEL_ONE, params)
  },
  editCart(params) {
    return post(host.EDIT_CART, params)
  },
  editCheckAll(params) {
    return post(host.EDIT_CHECK_ALL, params)
  },
  addressList(params) {
    return get(host.GET_ADDRESS_LIST, params)
  },
  addressDelOne(params) {
    return post(host.DEL_ADDRESS_ONE, params)
  },
  addressSetDfault(params) {
    return post(host.ADDRESS_SET_DEFAULT, params)
  },
  createOrder(params) {
    return post(host.CREATE_ORDER, params)
  },
  getOrderDetails(params) {
    return get(host.GET_ORDER_DETAILS, params)
  },
  getCartCount(params) {
    return get(host.GET_CART_COUNT, params)
  }
}
