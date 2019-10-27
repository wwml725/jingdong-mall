<template>
  <div class="home">
    {{title}}
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        title: 'home'
      }
    },
    created () {

    },
    mounted () {

    },
    methods: {},
    computed: {},
    components: {}
  }
</script>

<style scoped lang="stylus">
.home
  position :absolute
  top:0
  right:0
  left:0
  bottom:0
  background #cccccc
  color: #000
</style>
