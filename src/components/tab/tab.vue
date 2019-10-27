<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/home">
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/classify">
      <span class="tab-link">分类</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/vip">
      <span class="tab-link">Vip</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/cart">
      <span class="tab-link">购物车</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/profile">
      <span class="tab-link">个人中心</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    data() {
      return {
        title: 'tab'
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {},
    computed: {},
    components: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height 44px
    font-size: $font-size-medium
    background-color: #ffffff
    .tab-item
      flex: 1
      text-align center
      .tab-link
        /*padding-bottom:5px*/
        color: #60666b
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme

</style>
