// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: '/static/loading-svg/loading-spinning-bubbles.svg',
  error: './static/no-image.png'
  // loading-bars.svg loading-balls.svg loading-bubbles.svg loading-cubes.svg loading-cylon.svg loading-spin.svg
  // loading-spinning-bubbles.svg loading-spokes.svg
})
Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
