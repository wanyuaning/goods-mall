<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" :class="{'sort-up':!sortFlag}" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
              <dd v-for="(item,index) in priceFilter" :key="index">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item, index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">￥{{item.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    <modal
      :mdShow="mdShow"
      @close="closeModal"
      >
      <p solt="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
      </p>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/login.css'
import './../assets/css/product.css'
import NavHeader from '@/components/header'
import NavBread from '@/components/bread'
import NavFooter from '@/components/footer'
import Modal from '@/components/modal'
import axios from 'axios'
export default {
  name: 'GoodsList',
  data () {
    return {
      goodsList: [],
      sortFlag: true, // 排序：1升 -1降
      page: 1,
      pageSize: 2,
      busy: true, // 是否禁用滚动加载
      loading: false,
      mdShow: false,
      mdMessage: '',
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '5000.00'
        }
      ],
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false
    }
  },
  // 注删局部组件
  components: {
    NavHeader,
    NavBread,
    NavFooter,
    Modal
  },
  // 初始化
  mounted: function () {
    this.getGoodsList()
  },
  // 方法集
  methods: {
    getGoodsList (flag) {
      var root = this
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1
      }
      if (this.priceChecked !== 'all') {
        param.priceLevelStart = this.priceFilter[this.priceChecked].startPrice
        param.priceLevelEnd = this.priceFilter[this.priceChecked].endPrice
      }
      this.loading = true
      axios.get('/goods/list', {params: param}).then(result => {
        this.loading = false
        let res = result.data
        if (res.status === '0') {
          if (flag) { // 分页需要累加
            root.goodsList = root.goodsList.concat(res.result.list)
            if (res.result.count === 0) {
              root.busy = true
            } else {
              root.busy = false
            }
          } else {
            root.goodsList = res.result.list
            root.busy = false
          }
        } else {
          root.goodsList = []
        }
      }).catch(error => {
        this.msg = error
      })
    },
    sortGoods () {
      this.sortFlag = !this.sortFlag
      this.page = 1
      this.getGoodsList()
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 1000)
    },
    addCart (productId) {
      axios.post('/goods/addCart', {
        productId: productId
      }).then((result) => {
        let res = result.data
        if (res.status === '0') {
          alert('加入成功')
        } else {
          alert(res.msg)
          // this.mdShow = true
        }
      })
    },
    setPriceFilter (index) {
      this.priceChecked = index
      this.closePop()
      this.page = 1
      this.getGoodsList()
    },
    showFilterPop () {
      this.filterBy = true
      this.overLayFlag = true
    },
    closePop () {
      this.filterBy = false
      this.overLayFlag = false
    },
    closeModal () {
      this.mdShow = false
    }
  },
  // 过滤器
  filters: {},
  // 计算属性
  computed: {},
  // 帧听器
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .load-more{ height: 100px; line-height: 100px; text-align: center }
</style>
