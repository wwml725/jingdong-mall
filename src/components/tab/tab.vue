<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/home">
      <i class="iconfont icon-shouye"></i>
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/classify">
      <i class="iconfont icon-fenlei"></i>
      <span class="tab-link">分类</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/vip">
      <i class="iconfont icon-VIP"></i>
      <span class="tab-link">Vip</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/cart">
      <i class="iconfont icon-cart1"></i>
      <span class="tab-link">购物车</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/profile">
      <i class="iconfont icon-profile1
"></i>
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
    height: 50px
    line-height 22px
    font-size: $font-size-medium
    background-color: #ffffff
    .tab-item
      flex: 1
      text-align center
      display flex;
      flex-direction column;
      .iconfont
        flex:2
        line-height:30px
        font-size:20px
      .tab-link
        flex:1 ;
        line-height:20px
        font-size:6px

        /*padding-bottom:5px*/
        /*color: #60666b*/
      &.router-link-active
          color: red
          /*background:#cccccc*/
          .iconfont
            font-weight :700
          .tab-link
            font-weight :700

</style>
