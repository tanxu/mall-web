<template>
  <div class="container">
    <nav-header></nav-header>
    <nav-bread>
      <span slot="break">Address</span>
    </nav-bread>

    <div class="container">
      <div class="checkout-addr">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li><span>View your</span> order</li>
            <li><span>Make</span> payment</li>
            <li><span>Order</span> confirmation</li>
          </ul>
        </div>

        <!-- address list -->
        <div class="page-title-normal checkout-title">
          <h2><span>Shipping address</span></h2>
        </div>
        <div class="addr-list-wrap">
          <div class="addr-list">
            <ul>
              <li v-for="(address,addressIndex) in addressListFilter"
                  :class="{'check':addressCheckedIndex===addressIndex}"
                  @click="confirmAddress(address,addressIndex)">
                <dl>
                  <dt>{{address.userName}}</dt>
                  <dd class="address">{{address.streetName}}</dd>
                  <dd class="tel">{{address.tel}}</dd>
                </dl>
                <div class="addr-opration addr-del">
                  <a href="javascript:;" class="addr-del-btn" @click="delAddressOne(address)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                </div>
                <div class="addr-opration addr-set-default">
                  <a href="javascript:;" class="addr-set-default-btn" v-show="address.isDefault===false"
                     @click="setDefault(address)"><i>Set default</i></a>
                </div>
                <div class="addr-opration addr-default" v-show="address.isDefault===true">Default address</div>
              </li>
              <li class="addr-new">
                <div class="add-new-inner">
                  <i class="icon-add">
                    <svg class="icon icon-add">
                      <use xlink:href="#icon-add"></use>
                    </svg>
                  </i>
                  <p>Add new address</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="shipping-addr-more" v-if="addressList.length>3">
            <a class="addr-more-btn up-down-btn" href="javascript:;" @click="expand()" :class="{'open':limit>3}">
              more
              <i class="i-up-down">
                <i class="i-up-down-l"></i>
                <i class="i-up-down-r"></i>
              </i>
            </a>
          </div>
        </div>

        <!-- shipping method-->
        <div class="page-title-normal checkout-title">
          <h2><span>Shipping method</span></h2>
        </div>
        <div class="lemall-msg-info hidden">
          <span>The region you selected is not within our delivery area. Please select another shipping address within our delivery areas.</span>
        </div>
        <div class="shipping-method-wrap">
          <div class="shipping-method">
            <ul>
              <li class="check">
                <div class="name">Standard shipping</div>
                <div class="price">Free</div>
                <div class="shipping-tips">
                  <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="next-btn-wrap">
          <router-link class="btn btn--m btn--red" :to="{path:'/orderConfirm',query:{addressId:addressId}}">Next</router-link>
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

  const DEFAULT_SHOW_LIST = 3;

  export default {
    data() {
      return {
        addressList: [],
        limit: DEFAULT_SHOW_LIST,
        addressCheckedIndex: 0,
        addressId: '',
      }
    },
    mounted() {
      this._getAddressList();
    },
    computed: {
      addressListFilter() {
        return this.addressList.slice(0, this.limit)
      }
    },
    methods: {

      confirmAddress(item, index) {
        this.addressCheckedIndex = index;
        this.addressId = item.addressId;
      },

      setDefault(item) {
        Users.addressSetDfault({
          addressId: item.addressId
        }).then(success => {
          Message({
            type: 'success',
            message: '设置成功!'
          });
        })
      },

      expand() {
        if (this.limit === 3) {
          this.limit = this.addressList.length;
        } else {
          this.limit = DEFAULT_SHOW_LIST;
        }
      },

      delAddressOne(item) {
        let that = this;
        MessageBox.confirm('确认删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          Users.addressDelOne({
            addressId: item.addressId
          }).then(success => {
            Message({
              type: 'success',
              message: '删除成功!'
            });
            that._getAddressList();
          })

        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      _getAddressList() {
        let that = this;
        Users.addressList({}).then(success => {
          that.addressList = success.result;

          // 设置默认选中
          that.addressList.forEach((item, index) => {
            if (item.isDefault) {
              that.addressCheckedIndex = index;
            }
          })
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
