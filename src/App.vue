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
    color: $color-theme

  .tab
    position: fixed
    bottom: 0
    width: 100%
</style>
