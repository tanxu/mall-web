<template>
  <div class="container">
    <nav-header></nav-header>
    <nav-bread>
      <span slot="break">Cart</span>
    </nav-bread>
    <div class="cart">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>My Cart</span></h2>
      </div>
      <div class="item-list-wrap">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>Items</li>
              <li>Price</li>
              <li>Quantity</li>
              <li>Subtotal</li>
              <li>Edit</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="item in cartList">
              <div class="cart-tab-1">
                <div class="cart-item-check">
                  <a href="javascipt:;" class="checkbox-btn item-check-btn"
                     v-bind:class="{'check':item.checked==='true'}"
                     @click="editCart('check',item)">
                    <svg class="icon icon-ok">
                      <use xlink:href="#icon-ok"></use>
                    </svg>
                  </a>
                </div>
                <div class="cart-item-pic">
                  <img :src="'/static/'+item.productImage">
                </div>
                <div class="cart-item-title">
                  <div class="item-name">{{item.productName}}</div>
                </div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price">{{item.salePrice | currency('￥')}}</div>
              </div>
              <div class="cart-tab-3">
                <div class="item-quantity">
                  <div class="select-self select-self-open">
                    <div class="select-self-area">
                      <a class="input-sub" @click="editCart('de',item)">-</a>
                      <span class="select-ipt">{{item.productNum}}</span>
                      <a class="input-add" @click="editCart('in',item)">+</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total">{{item.productNum * item.salePrice | currency('￥')}}</div>
              </div>
              <div class="cart-tab-5">
                <div class="cart-item-opration">
                  <a href="javascript:;" class="item-edit-btn" @click="delGood(item)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-foot-wrap">
        <div class="cart-foot-inner">
          <div class="cart-foot-l">
            <div class="item-all-check">
              <a href="javascipt:;" @click="checkAllHandle()">
                  <span class="checkbox-btn item-check-btn" :class="{'check':checkAllFlag}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                <span>Select all</span>
              </a>
            </div>
          </div>
          <div class="cart-foot-r">
            <div class="item-total">
              Item total: <span class="total-price">{{totalPrice | currency('￥')}}</span>
            </div>
            <div class="btn-wrap">
              <a class="btn btn--red" :class="{'btn--dis':cartListCheckLength===0}" @click="checkOut()">Checkout</a>
            </div>
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
      }
    },
    mounted() {
      this._getCartList();
    },
    // 局部过滤器
    filters: {
      currency: currency
    },
    computed: {
      totalPrice() {
        let price = 0;
        this.cartList.forEach(item => {
          if (item.checked === 'true') {
            price += (item.salePrice * item.productNum)
          }
        })
        return price;
      },
      checkAllFlag() {
        return this.cartListCheckLength === this.cartList.length
      },
      cartListCheckLength() {
        let i = 0;
        this.cartList.forEach(item => {
          if (item.checked === 'true') {
            i++
          }
        })
        return i;
      }
    },
    methods: {

      checkOut() {
        if (this.cartListCheckLength === 0) {
          Message({
            message: '您还没有选择商品',
            type: 'warning'
          });
          return;
        }
        this.$router.push({
          path: '/address'
        })
      },

      checkAllHandle() {
        let flag = !this.checkAllFlag;
        this.cartList.forEach((item) => {
          item.checked = flag ? 'true' : 'false';
        })

        Users.editCheckAll({
          checkAll: flag
        }).then(success => {
        })

      },

      editCart(flag, item) {
        let that = this;
        if (flag === 'in') {
          // 加1
          item.productNum++;
          item.checked = 'true'
        }
        if (flag === 'de') {
          // 减1
          if (item.productNum >= 2) {
            item.productNum--;
            item.checked = 'true'
          } else {
            this.delGood(item);
          }
        }
        if (flag === 'check') {
          item.checked = item.checked === 'true' ? 'false' : 'true'
        }

        Users.editCart({
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked
        }).then(success => {
          if (flag === 'de') {
            // 减1
            that.$store.commit('decrementCartCount', 1);
          } else if (flag === 'in') {
            // 加1
            that.$store.commit('incrementCartCount', 1);
          }
        });

      },

      delGood(item) {
        let that = this;
        MessageBox.confirm('确认删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Users.cartDelOne({productId: item.productId}).then(success => {
            Message({
              type: 'success',
              message: '删除成功!'
            });
            that.$store.commit('decrementCartCount', item.productNum)
            that._getCartList();
          })
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      _getCartList() {
        let that = this;
        Users.cartList().then(success => {
          if (success.status === '0') {
            that.cartList = success.result;
          }
        })
      }
    },
    components: {
      NavHeader, NavFooter, NavBread
    }
  }
</script>
<style>
  .input-sub, .input-add {
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }

  .item-quantity .select-self-area {
    background: none;
    border: 1px solid #f0f0f0;
  }

  .item-quantity .select-self-area .select-ipt {
    display: inline-block;
    padding: 0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
