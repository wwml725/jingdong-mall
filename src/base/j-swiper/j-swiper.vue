<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <img :src="slide" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'j-swiper',
    props:{
      swiperSlides:{
        type:Array,
        default:[11, 22, 33, 44, 55]
      },
    },
    data() {
      return {
        swiperOption: {
          loop : true,
          autoplay:true,
          pagination: {
            el: '.swiper-pagination',
          }
        },
      }
    },
    mounted() {

    }
  }
</script>
<style lang="stylus" scoped>
  img
    width:100%
    height:100%
</style>
