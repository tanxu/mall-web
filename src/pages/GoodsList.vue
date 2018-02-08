<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="break">Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default" :class="{'cur':sortType==='default'}" @click="sortHandle('default')">Default</a>
          <a href="javascript:void(0)" :class="{'sort-up':sortFlag,'sort-down':!sortFlag,'cur':sortType==='price'}" class="price"
             @click="sortHandle('price')">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="openPriceFilter()">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" :class="{'filterby-show':filterByShow}" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceActive==='all'}"
                     @click="setPriceActive('all')">All</a></dd>
              <dd v-for="(price,index) in priceFilter" @click="setPriceActive(index)">
                <a href="javascript:void(0)" :class="{'cur':priceActive==index}">{{price.start}} - {{price.end}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(good,goodIndex) in goodsList">
                  <div class="pic">
                    <a href="javascript:;">
                      <img v-lazy="'/static/'+good.productImage" alt="">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{good.productName}}</div>
                    <div class="price">{{good.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" @click="addCart(good.productId)" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
                <div style="clear: both;height: 100px;text-align: center;" v-infinite-scroll="loadMore"
                     infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  <img v-show="isLoading" style="height: 100%;vertical-align: middle;"
                       src="./../../static/loading/loading-balls.svg"
                       alt="">
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="filterByShow" @click="closePriceFilter"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>


  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'

  import {Goods} from '@/api/index'


  export default {
    data() {
      return {
        priceActive: 'all',
        filterByShow: false,
        sortType: 'default',
        sortFlag: false,
        page: 1,
        pageSize: 8,
        goodsList: [],
        busy: false,
        isLoading: false,
        priceFilter: [
          {
            start: '0.00',
            end: '500.00'
          },
          {
            start: '500.00',
            end: '1000.00'
          },
          {
            start: '1000.00',
            end: '2000.00'
          },
          {
            start: '2000.00',
            end: '8000.00'
          },
        ]
      }
    },
    created() {
    },
    mounted() {
      this._getGoodsList();
    },
    components: {
      NavHeader, NavFooter, NavBread
    },
    methods: {
      sortHandle(sort) {
        this.sortType = sort;
        this.page = 1;
        if (sort === 'default') {

        }
        if (sort === 'price') {
          this.sortFlag = !this.sortFlag;
        }
        this._getGoodsList();
      },
      openPriceFilter() {
        this.filterByShow = true;
      },
      closePriceFilter() {
        this.filterByShow = false;
      },
      setPriceActive(index) {
        this.page = 1;
        this.priceActive = index;
        this.closePriceFilter();
        this._getGoodsList();
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this._getGoodsList(true);
        }, 1000)
      },
      _getGoodsList(flag) {
        let that = this;
        that.isLoading = true;
        Goods.getList({
          page: that.page,
          pageSize: that.pageSize,
          sort: that.sortFlag === true ? '1' : -1,
          priceLevel: that.priceActive
        }).then(function (success) {
          if (flag) {
            that.goodsList = that.goodsList.concat(success.result.data);
            if (success.result.data.length < 8) {
              that.busy = true;
            } else {
              that.busy = false;
            }
          } else {
            that.goodsList = success.result.data;
            that.busy = false;
          }
        }, error => {
          console.log('err', error)
        })
      },
      addCart(id) {
        Goods.addCart({
          productId: id
        }).then((res) => {
          console.log(res)
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped="">
</style>
