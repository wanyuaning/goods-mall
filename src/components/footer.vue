<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div class="footer__secondary">
        <div class="footer__inner">
          <div class="footer__region">
            <span>Region</span>
            <select class="footer__region__select">
              <option value="en-US">USA</option>
              <option value="zh-CN">China</option>
              <option value="in">India</option>
            </select>
          </div>
          <div class="footer__secondary__nav">
            <span>Copyright © 2017 IMooc All Rights Reserved.</span>
            <a href="http://us.lemall.com/us/aboutUs.html">
              About Us
            </a>
            <a href="http://us.lemall.com/us/termsofUse.html">
              Terms &amp; Conditions
            </a>
            <a href="http://us.lemall.com/us/privacyPolicy.html">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  // 注删局部组件
  components: {},
  // 方法集
  methods: {},
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

</style>
