<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot></slot>
        <slot name="aa"></slot>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBread',
  data () {
    return {
      msg: '面包屑导航'
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
