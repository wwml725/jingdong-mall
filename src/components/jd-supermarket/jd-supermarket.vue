<template>
  <div class="jd-supermarket">
    <div class="super-header">
      <span class="iconfont icon-jiantou2 goback" @click="goBack"></span>
      <span class="iconfont icon-qiandao"></span>
      <div class="title">京东超市</div>
      <span class="iconfont icon-chakantieziguanzhu
"></span>
      <span class="iconfont icon-gengduo-copy more"></span>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <div class="jd-top">


          <div class="search-box">
            <span class="iconfont icon-sousuo3 search-font"></span>
            <input type="text" placeholder="逛超市 上京东">
          </div>

          <div class="swiper-box">
            <swiper v-if='sliders.length' :options="headerSwiperOption" ref="headerSwiper">
              <swiper-slide v-for="(item,index) in sliders">
                <img :src="item" alt="">
              </swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>

          <div class="serverImg">
            <img :src="serverImg" alt="">
          </div>
          <div class="superjie">
            <img :src="superjie" alt="">
          </div>

          <div class="classify-box">
            <swiper class="classify-swiper" :options="classifySwiperOption" ref="myClassify">
              <swiper-slide>
                <div class="top">
                  <div v-for="(item,index) in classify.slice(0,5)" class="item-classify">
                    <router-link tag="div" to="/jd-supermarket" class="classify-img">
                      <img :src="item.srcImg" alt="">
                    </router-link>
                    <span class="classify-title">{{item.title}}</span>
                  </div>
                </div>
                <div class="bottom">
                  <div v-for="(item,index) in classify.slice(5,10)" class="item-classify">
                    <div class="classify-img">
                      <img :src="item.srcImg" alt="">
                    </div>
                    <span>{{item.title}}</span>
                  </div>
                </div>
                <div class="pagedd">

                </div>

              </swiper-slide>
              <swiper-slide>
                <div class="top">
                  <div v-for="(item,index) in classify.slice(0,5)" class="item-classify">
                    <div class="classify-img">
                      <img :src="item.srcImg" alt="">
                    </div>
                    <span class="classify-title">{{item.title}}</span>
                  </div>
                </div>
                <div class="bottom">
                  <div v-for="(item,index) in classify.slice(5,10)" class="item-classify">
                    <div class="classify-img">
                      <img :src="item.srcImg" alt="">
                    </div>
                    <span>{{item.title}}</span>
                  </div>
                </div>
              </swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

          </div>

          <div class="shoppingRush">
            <div class="rush-title">
              超市抢购
            </div>
            <div class="rush-time">
              <div class="time-item active">
                12:00
              </div>
              <div class="time-item">
                12:00
              </div>
              <div class="time-item">
                12:00
              </div>
              <div class="time-item">
                12:00
              </div>
            </div>
            <div class="rush-wrapper">
              <div class="rush-content">
                <div class="rush-item" v-for="(item,index) in shoppingRush">
                  <div class="img">
                    <img :src="item.imgSrc" alt="">
                  </div>
                  <div class="description">{{item.descript}}</div>
                  <s class="oriPrice">{{item.oriPrice}}</s>
                  <div class="price">￥：{{item.price}}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="dis-sale" v-if="DiscountSale">
          </div>
          <div class="overflow-volume" v-if="OverflowVolume">
            <div class="title-img">
              <img :src="OverflowVolume.titleImg" alt="">
            </div>
            <div class="content">
              <div class="left">
                <img :src="OverflowVolume.hotDataImg" alt="">
              </div>
              <div class="right">
                <div class="item" v-for="(item,index) in OverflowVolume.rightDatas">
                  <img :src="item.imgSrc" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="super-recommend">
          <tab-components @select="changeIndex" :data="recommend"></tab-components>
        </div>
        <div class="load-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import {getSupermarket, getRecomendMarket} from 'api/jdsupermarket'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import tabComponents from './tabComponents/tabComponents'

  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  import ScrollBar from '@better-scroll/scroll-bar'

  BScroll.use(ScrollBar)
  BScroll.use(Pullup)

  export default {
    name: 'jd-supermarket',
    data() {
      return {
        title: 'jd-supermarket',
        scrollY: 0,
        isPullUpLoad: false,//判断是否正在加载中
        superData: null,
        headerSwiperOption: {
          loop: true,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
          },
        },
        classifySwiperOption: {
          // loop: true,
          // autoplay: true,
          pagination: {
            el: '.swiper-pagination',
          },
        },
        classify: [],
        sliders: [],
        serverImg: '',
        superjie: '',
        shoppingRush: null,
        DiscountSale: null,
        OverflowVolume: null,
        recommend: [],
        currentRecIndex: 0,
        offsets: [0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    created() {
      this.getSuperData()
      this.getRecomendMarket(this.id, this.offsets[this.currentRecIndex], 9)
      let bscroll = null
      let rushScroll = null
      // let imgScroll = null

    },
    mounted() {
      // this.$nextTick(() => {
      //   this.initScroll()
      // })

      setTimeout(() => {
        this.initScroll()
      }, 20)
    },

    methods: {
      initScroll() {
        this.bscroll = new BScroll('.content-wrapper', {
          click: true, //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
          scrollY: true,
          scrollX: false,
          pullUpLoad: true
        });
        this.bscroll.on('pullingUp', this.pullingUpHandler)
        this.bscroll.on('scroll', (pos) => {
          this.scrollY = pos.y;
          console.log(pos);//就是横纵轴的坐标    {x: 0, y: -27}  滚出去多少就是-多少
        })
        this.rushScroll = new BScroll('.rush-wrapper', {
          // ...... 详见配置项
          click: true, //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
          scrollY: false,
          scrollX: true,
          scrollbar: true
        })

        /*
                this.imgScroll = new BScroll('.img-wrapper', {
                  click: true, //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
                  scrollY: false,
                  scrollX: true,
                  scrollbar: true,
                  fade: false
                })
        */

      },

      initSuperRec() {
        new BScroll('.content-wrapper', {
          click: true, //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
          scrollY: true,
          scrollX: false,
          // pullUpLoad: true
        });
      },

      goBack() {
        this.$router.go(-1)
      },

      async pullingUpHandler() {
        console.log("上拉事件触发");
        this.isPullUpLoad = true
        await this.more(this.id, this.offsets[this.currentRecIndex], 9)//这个函数的执行结果还没有到来，就开始执行下面的代码了，（如果不想用async-await，就加一个if限制条件，获取）
        this.bscroll.finishPullUp()//完成一次上拉动作
        this.bscroll.refresh()//重新计算scroll的高度
        this.isPullUpLoad = false
      },

      async getSuperData() {
        this.superData = await getSupermarket()
        // console.log(this.superData.sliders)
        let {sliders, classify, serverImg, superjie, shoppingRush, DiscountSale, OverflowVolume} = await getSupermarket()
        this.sliders = sliders
        this.classify = classify
        this.serverImg = serverImg
        this.superjie = superjie
        this.shoppingRush = shoppingRush
        this.DiscountSale = DiscountSale
        this.OverflowVolume = OverflowVolume
        console.log(typeof this.superData)
      },

      changeIndex(index) {
        this.currentRecIndex = index
      },

      async getRecomendMarket(id, offset, limit) {
        let res = await getRecomendMarket(id, offset, limit)
        let rec = this.recommend

        let current = rec.find((item, index) => {
          return item.id == this.id
        });

        if (current) {

        } else {
          this.offsets[this.currentRecIndex] = this.offsets[this.currentRecIndex] + limit

          rec.push(res)
        }
      },

      async more(id, offset, limit) {
        let res = await getRecomendMarket(id, offset, limit)
        res = res.products;
        let current = this.recommend.find((item, index) => {
          return item.id == this.id
        });
        console.log(current);
        let products = current.products
        this.offsets[this.currentRecIndex] = this.offsets[this.currentRecIndex] + res.length
        let data = [...products, ...res]
        current.products = data
      }
    },
    computed: {
      id() {
        return this.currentRecIndex + 1
      },
      titleImg() {
        return this.DiscountSale.titleImg
      }
    },
    watch: {
      id(value) {
        this.getRecomendMarket(value, 0, 9)
      },
      // recommend(value) {
      //   this.bscroll.refresh()//重新计算scroll的高度
      // }
      currentRecIndex() {
        setTimeout(() => {
          this.bscroll.refresh()//重新计算scroll的高度
        }, 20)

      },

      scrollY(value) {
        let scroller = -value
        console.log(scroller);
      }
    },
    components: {tabComponents}
  }
</script>

<style scoped lang="stylus">
  img
    width: 100%
    height: 100%

  .jd-supermarket
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 50px
    background-color: red
    /*overflow-y: scroll*/
    overflow: hidden

    .super-header
      position: fixed
      top: 0
      left: 0
      height: 44px
      width: 100%
      z-index 100
      display flex
      line-height 40px
      text-align center
      color: white

      .goback
        width: 40px
        font-size: 30px

      .title
        flex: 1
        text-align center

      .more
        width: 40px
        font-size: 18px


    .content-wrapper
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0

      .content
        .search-box
          position: absolute
          top: 40px
          left: 0
          right: 0
          width: 90%
          margin: 0 auto
          height: 26px
          z-index: 10
          border-radius: 13px 13px
          overflow hidden
          background white
          display flex

          .search-font
            width: 40px
            text-align center
            line-height: 26px
            font-weight: 700
            font-size: 14px
            transform: translate3d(0, 2px, 0)
            color: #cccccc

          input
            flex 1
            height: 100%
            font-size: 12px

        .swiper-box
          /*width: 100%*/
          transform: translate3d(0, -40px, 0)
          height: 200px
          background: red

          img
            height: 100%
            width: 100%

          .swiper-pagination
            >>> .swiper-pagination-bullet
              width: 10px
              height: 3px
              background: #cccccc

              >>> &.swiper-pagination-bullet-active
                background #ffffff


        .serverImg
          width: 100%
          height: 26px
          transform: translate3d(0, -3px, 0)

        .superjie
          height: 94px
          width: 100%

        /*padding: 5px 10px*/
        /*box-sizing :border-box*/

        .classify-box
          background white
          width: 100%
          height: 155px
          /*background-color #ffffff*/

          .classify-swiper
            width: 100%
            height: 100%

            .swiper-slide
              display: flex
              flex-direction: column
              font-size 12px

              .top
                flex: 1
                /*background red;*/
                display flex;

                .item-classify
                  flex 1
                  text-align center

                  .classify-img
                    width: 38px
                    height: 38px
                    margin: 10px auto 5px auto

              .bottom
                flex: 1
                /*background blue*/
                display flex;

                .item-classify
                  flex 1
                  text-align center

                  .classify-img
                    width: 38px
                    height: 38px
                    margin: 10px auto 5px auto

              .pagedd
                height: 10px

            .swiper-pagination.swiper-pagination-bullets
              bottom: 1px
              /*background red*/

              >>> .swiper-pagination-bullet
                background-color orangered
                width: 10px;
                height: 2px;
                border-radius: 20%;


        .shoppingRush
          width: 100%
          /*height:226px*/
          background-color: white
          margin-top: 5px

          .rush-title
            width: 100%
            height: 28px
            line-height: 28px
            font-weight: 700
            padding-left: 15px

          .rush-time
            width: 100%
            height: 30px
            display: flex

            .time-item
              flex: 1
              text-align center
              line-height: 20px
              border-radius: 10px
              background-color: pink
              color: white
              margin: 5px

              &.active
                color: red

          .rush-wrapper
            /*height:170px*/
            width: 100%
            position: relative

            .rush-content
              height: 170px
              width: 900px
              margin-top: 10px

              .rush-item
                width: 124px
                height: 168px
                margin: 0 5px
                /*border:1px solid black*/
                display inline-block
                overflow: hidden
                font-size: 12px

                .img
                  width: 105px
                  height: 105px
                  margin: 0 auto

                .description
                  width: 100%
                  height: 16px
                  line-height: 16px
                  overflow: hidden
                  color: #7b7b7b
                  margin: 5px

                .oriPrice
                  height: 14px
                  margin: 5px

                .price
                  font-size: 14px
                  height: 14px
                  margin: 5px


        .dis-sale
          width: 100%
          background-color: white

          .hot-img
            width: 100%

            img
              display: block
              width: 90%
              margin: 0 auto

          .img-wrapper
            position: relative
            width: 100%
            overflow-x: hidden

            .img-content
              display: inline-block
              white-space nowrap

              .item
                width: 96px
                height: 96px
                margin-right: 5px
                display: inline-block

              .more
                width: 28px
                height: 72px
                display: inline-block

                img
                  margin: 10px
                  width: 100%
                  height: 100%


        .overflow-volume
          width: 100%
          background-color: white

          .content
            width: 100%
            display: flex
            padding: 0 3.5%
            box-sizing: border-box

            .left
              flex: 1

            .right
              /*background-color :green*/
              flex: 2

              .item
                height: 50%
                width: 45%
                display: inline-block
                margin-left: 5%
                text-align: center

                img
                  width: 64px
                  height: 64px
                  margin-top: 10px


        .super-recommend
          width: 100%
          height: 100%
          /*height: 1000px*/
          /*background-color: #cccccc*/
          padding: 5px 0px
          box-sizing: border-box


</style>
