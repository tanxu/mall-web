<template>
  <div class="container">
    <nav-header></nav-header>
    <nav-bread>
      <span slot="break">Cart</span>
    </nav-bread>
    <div class="container">
      <div class="checkout-order">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li><span>Make</span> payment</li>
            <li><span>Order</span> confirmation</li>
          </ul>
        </div>

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>Order content</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>Order contents</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="(cart, cartIndex) in cartList" v-if="cart.checked">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img :src="/static/+cart.productImage" :alt="cart.productName">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{cart.productName}}</div>

                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{cart.salePrice | currency('¥')}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">×{{cart.productNum}}</span>
                      </div>
                    </div>
                    <div class="item-stock item-stock-no">In Stock</div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{(cart.salePrice * cart.productNum) | currency('¥')}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li>
                <span>Item subtotal:</span>
                <span>{{subtotal | currency('¥')}}</span>
              </li>
              <li>
                <span>Shipping:</span>
                <span>{{shipping | currency('¥')}}</span>
              </li>
              <li>
                <span>Discount:</span>
                <span>{{discount | currency('¥')}}</span>
              </li>
              <li>
                <span>Tax:</span>
                <span>{{tax | currency('¥')}}</span>
              </li>
              <li class="order-total-price">
                <span>Order total:</span>
                <span>{{total | currency('¥')}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
            <button @click="previosHandle()" class="btn btn--m" tag="button">Previous</button>
          </div>
          <div class="next-btn-wrap">
            <button @click="toPayment()" class="btn btn--m btn--red">Proceed to payment</button>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import {MessageBox, Message} from 'element-ui';
  import {Users} from '@/api/index'
  import {currency} from '@/utils/currency'


  export default {
    data() {
      return {
        cartList: [],
        subtotal: 0, //总价
        shipping: 600, // 配送费
        discount: 200, // 优惠金额
        tax: 300, // 税费
        total: 0, // 计算后总价
      }
    },
    mounted() {
      this._getCartList();
    },
    // 局部过滤器
    filters: {
      currency: currency
    },
    computed: {},
    methods: {
      previosHandle() {
        this.$router.back();
      },
      toPayment() {
        let addressId = this.$route.query.addressId;
        let that = this;
        Users.createOrder({
          addressId: addressId,
          subtotal: that.subtotal,
          shipping: that.shipping,
          discount: that.discount,
          tax: that.tax,
          total: that.total,
        }).then(success => {
          that.$router.push({
            path: '/orderSuccess',
            query: {
              orderId: success.result.orderId
            }
          })
        })
      },
      _getCartList() {
        let that = this;
        Users.cartList().then(success => {
          that.cartList = success.result;
          that.cartList.forEach(item => {
            if (item.checked) {
              that.subtotal += (item.productNum * item.salePrice)
            }
          })
          that.total = that.subtotal + that.shipping + that.tax - that.discount;
        })
      }
    },
    components: {
      NavHeader, NavFooter, NavBread
    }
  }
</script>
<style>
</style>
