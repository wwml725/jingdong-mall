<template>
  <div class="Recommend">
    <div class="products">
      <div class="item" v-if="products" v-for="(item,index) in products">
        <div class="img"><img :src="item.productImg" alt=""></div>
        <div class="description">{{item.description}}</div>
        <div class="price">￥：{{item.price}}</div>
        <div class="cart-icon"><span class="iconfont icon-cart1"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        types: Object,
        default:function () {
          return {}
        }
      }
    },
    name: "Recommend",
    data() {
      return {
        title: 'Recommend',
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {},
    computed: {
      products() {
        if (this.data) {
          return this.data.products
        }
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus">
  .Recommend
    position: relative

    .products
      background-color: white
      position :relative

      .item
        position: relative
        height: 187px
        border: 1px solid black
        box-sizing: border-box
        width: 33.33%
        background-color: white
        /*float: left*/
        display :inline-block

        .img
          width: 100px
          height: 100px
          margin: 5px auto

          img
            width: 100%
            height: 100%

        .description
          height: 28px
          line-height: 14px
          font-size: 12px
          text-align: center
          overflow: hidden
          width: 100px
          margin: 10px 5px
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;

        .price
          margin-left: 5px

        .cart-icon
          position: absolute
          bottom: 10px
          right: 10px
          width: 20px
          height: 20px
          z-index: 40
          text-align: center
          line-height: 20px
          background-color: orangered
          border-radius: 50%

          span
            font-size: 16px
            color: white
</style>
