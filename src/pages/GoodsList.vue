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
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
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
                    <a href="#">
                      <img v-lazy="'/static/'+good.prodcutImg" alt="">
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{good.productName}}</div>
                    <div class="price">{{good.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
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

  import './../assets/css/base.css'
  import './../assets/css/product.css'

  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'

  import goodsData from './../../mock/goods.json'

  import axios from 'axios'

  export default {
    data() {
      return {
        priceActive: 'all',
        filterByShow: false,
        goodsList: [],
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
      openPriceFilter() {
        this.filterByShow = true;
      },
      closePriceFilter() {
        this.filterByShow = false;
      },
      setPriceActive(index) {
        this.priceActive = index;
        this.closePriceFilter();
      },
      _getGoodsList() {
        this.goodsList = goodsData.result;
      }
    }
  }
</script>
<style scoped="">
</style>
