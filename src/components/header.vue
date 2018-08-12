<template>
  <header class="header">
    <icon-cart></icon-cart>
    <div class="navbar">
      <!--左则Logo-->
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="/static/logo.png">
        </a>
      </div>
      <!--右则登录-->
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <span class="navbar-link" v-text="nickName" v-if="nickName"></span>
          <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true" v-if="!nickName">Login</a>
          <a href="javascript:void(0)" class="navbar-link" @click="logOut" v-else>Logout</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-text="cartCount" v-if="cartCount"></span>
            <a class="navbar-link navbar-cart-link" href="/#/cart">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">Login in</div>
          <button class="md-close" @click="loginModalFlag=false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登  录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
  </header>
</template>

<script>
import './../assets/css/login.css'
import IconCart from '@/components/icon/cart'
import axios from 'axios'
import Qs from 'qs'
export default {
  name: 'NavHeader',
  data () {
    return {
      userName: '',
      userPwd: '',
      loginModalFlag: false,
      errorTip: false,
      cartCount: 1,
      nickName: ''
    }
  },
  // 注删局部组件
  components: {
    IconCart
  },
  // 初始化
  mounted: function () {
    axios.get('/users/checkLogin').then((result) => {
      console.log(result.data)
      let res = result.data
      if (res.status === '0') {
        this.nickName = res.result.userName
      }
    })
  },
  // 方法集
  methods: {
    login () {
      if (!this.userName || !this.userPwd) {
        this.errorTip = true
        return
      }
      let data = {
        userName: this.userName,
        userPwd: this.userPwd
      }
      axios.post('/users/login', Qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((result) => {
        let res = result.data
        if (res.status === '0') {
          this.errorTip = false
          this.loginModalFlag = false
          this.nickName = res.result.userName
        } else {
          this.errorTip = true
        }
      })
    },
    logOut () {
      axios.post('/users/logout').then((result) => {
        let res = result.data
        if (res.status === '0') {
          this.nickName = ''
        }
      })
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

</style>
