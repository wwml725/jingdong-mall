<template>
  <div id="app">
    <router-view></router-view>
    <Tab></Tab>
  </div>
</template>
<script>
  import Tab from 'components/tab/tab'

  export default {
    components: {
      Tab
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl";
  #app
    color: blue

    position:absolute
    top:0
    bottom:0
    left:0
    right:0

  .tab
    position: fixed
    bottom: 0
    width: 100%
</style>
