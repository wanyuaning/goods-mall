import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/goods-list'
import Cart from '@/views/cart'
import Address from '@/views/address'
import OrderConfirm from '@/views/order-confirm'
import OrderSuccess from '@/views/order-success'
Vue.use(Router)

export default new Router({
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
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/order-confirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/order-success',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
