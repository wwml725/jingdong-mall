<template>
  <div class="home">
    <div class="nav-header-container" v-show="isNavHeader">
      <div class="nav-header">
        <div class="classify-icon iconfont icon-fenlei1"></div>
        <div class="search-box">
          <span class="jd-logo-search iconfont icon-jingdong"></span>
          <span class="search-logo iconfont icon-sousuo3"></span>
          <input class="search-input" type="text" cleardefault="no" autocomplete="off" placeholder="车载手机支架">
        </div>
        <div class="login-btn">登录</div>
      </div>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="scroller">
        <div class="slider-header">
          <div class="nav-header">
            <div class="classify-icon iconfont icon-fenlei1"></div>
            <div class="search-box">
              <span class="jd-logo-search iconfont icon-jingdong"></span>
              <span class="search-logo iconfont icon-sousuo3"></span>
              <input class="search-input" type="text" cleardefault="no" autocomplete="off" placeholder="车载手机支架">
            </div>
            <div class="login-btn">登录</div>
          </div>
          <div class="swiper-box">
            <swiper v-if="sliders.length" :options="swiperOption" ref="mySwiper">
              <swiper-slide v-for="(item,index) in sliders">
                <img :src="item" alt="">
              </swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination" slot="pagination"></div>

            </swiper>
          </div>
        </div>
        <div class="classify-box">
          <swiper class="classify-swiper" :options="swiperOptionClassify" ref="myClassify">
            <swiper-slide>
              <div class="top">
                <div v-for="(item,index) in classifyOne.slice(0,5)" class="item-classify">
                  <router-link tag="div" to="/jd-supermarket" class="classify-img">
                    <img :src="item.imgSrc" alt="">
                  </router-link>
                  <span class="classify-title">{{item.title}}</span>
                </div>
              </div>
              <div class="bottom">
                <div v-for="(item,index) in classifyOne.slice(5,10)" class="item-classify">
                  <div class="classify-img">
                    <img :src="item.imgSrc" alt="">
                  </div>
                  <span>{{item.title}}</span>
                </div>
              </div>
              <div class="pagedd">

              </div>

            </swiper-slide>
            <swiper-slide>
              <div class="top">
                <div v-for="(item,index) in classifyOne.slice(0,5)" class="item-classify">
                  <div class="classify-img">
                    <img :src="item.imgSrc" alt="">
                  </div>
                  <span class="classify-title">{{item.title}}</span>
                </div>
              </div>
              <div class="bottom">
                <div v-for="(item,index) in classifyOne.slice(5,10)" class="item-classify">
                  <div class="classify-img">
                    <img :src="item.imgSrc" alt="">
                  </div>
                  <span>{{item.title}}</span>
                </div>
              </div>

            </swiper-slide>

            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>

          </swiper>

        </div>
        <div class="floor-box">
          <img src="./floor.webp" alt="">
        </div>
        <div class="seckill-box">
          <div class="seckill-the-container">
            <div class="seckill-title">
              <div class="left">
                <div class="l-t"><img src="./seckill.png" alt=""></div>
                <span class="start">10点场</span>
                <span>01:03:04</span>
              </div>
              <div class="right" :style="{color:'red'}"><span>更多秒杀</span><span
                class="iconfont icon-dibudaohanglan-"></span></div>
            </div>
            <div class="seckill-container"></div>
          </div>

        </div>
        <div class="new-people">
          <div class="item-new"><img src="./new1.png" alt=""></div>
          <div class="item-new"><img src="./new2.png" alt=""></div>
        </div>
        <div class="opas-box">
          <div class="opa-item"><img src="./opa1.png" alt=""></div>
          <div class="opa-item"><img src="./opa2.png" alt=""></div>
          <div class="opa-item"><img src="./opa3.png" alt=""></div>
        </div>
        <div class="selection"><img src="./floor1.png" alt=""></div>
        <div class="selection"><img src="./floor2.png" alt=""></div>
        <div class="tuijian"><img src="./为您推荐.png" alt=""></div>
        <div class="t-list clearfix" >
          <div class="t-list-item" v-for="(item,index) in recommend">
            <div class="img"><img v-lazy ="item.imgSrc" alt=""></div>
            <div class="description">{{item.description}}</div>
            <div class="price">￥:{{item.price}}</div>
          </div>
        </div>

        <div class="loadMore load-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>


      </div>
    </div>
    <div class="zhiding"  v-show="isBackTopBtnShow" @click="bakTop"><span class="iconfont icon-jiantouarrow499"></span></div>
  </div>
</template>

<script>
  import { getSliders, getClassify, getRecommend } from 'api/homeList'

  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'

  BScroll.use(Pullup)

  export default {
    name: 'home',
    data () {
      return {
        title: 'home',
        sliders: [],
        classify: [],
        recommend: [],
        isPullUpLoad:false,
        recommendOffset: 0,
        isBackTopBtnShow:false,
        isNavHeader:false,
        scrollY:0,
        limit: 12,
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
          loop: true,
          autoplay: true,
          pagination: {
            el: '.swiper-pagination',
          },
        },
        swiperOptionClassify: {
          pagination: {
            el: '.swiper-pagination',
          },
        },
        classifyTitle: [
          '京东超市', '数码电器', '京东服饰', '京东生鲜',
          '京东到家',
          '充值缴费',
          '9.9元拼',
          '领劵',
          '赚钱',
          'Plus会员',
          '海囤全球',
          '京东拍卖',
          '唯品会',
          '玩3C',
          '沃尔玛',
          '美妆馆',
          '京东旅行',
          '拍拍二手',
          '物流查询',
          '全部',
        ],
      }
    },
    beforeCreated () {

    },
    created () {
      this.getSliders()
      this.getClassify()
      this.getRecommend()
      // this.getRecommend()
    },
    mounted () {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    methods: {
      initScroll () {
        console.log(this.$refs.wrapper)
        if (!this.$refs.wrapper) {
          return
        }
        this.bscroll = new BScroll(this.$refs.wrapper, {
          click: true, //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
          scrollY: true,
          pullUpLoad: true,
          probeType: 3,
          bounce: {
            top: false,
            bottom: true,
            left: true,
            right: true
          }
        })

        this.bscroll.on('pullingUp', this.pullingUpHandler)
        this.bscroll.on('scroll', (pos) => {
          this.scrollY = pos.y;
          // console.log(pos);//就是横纵轴的坐标    {x: 0, y: -27}  滚出去多少就是-多少
        })

      },
      async getSliders () {
        this.sliders = await getSliders()
      },
      async getClassify () {
        this.classify = await getClassify()
      },

      async getRecommend () {
        // console.log(111)
        let datas = await getRecommend(this.recommendOffset, this.limit)
        this.recommend = [...this.recommend, ...datas]
        console.log(this.recommend.length)
        console.log(this.recommend)
        this.recommendOffset = this.recommend.length
        this.bscroll.refresh()

      },
      async pullingUpHandler(){
        console.log(1)
        this.isPullUpLoad = true
        await this.getRecommend()
        this.bscroll.finishPullUp()//完成一次上拉动作
        this.isPullUpLoad = false
      },
      bakTop(){
        console.log(this.bscroll)
        this.bscroll.scrollTo(this.$refs.wrapper,0)
        // this.bscroll.scrollToElement(this.$refs.wrapper,100)
      }
    },

    //刷新页面，better-scroll会失效，在这里设置一下就好了
    updated () {
      if (this.bscroll) {
        this.bscroll.refresh()
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      },
      classifyOne () {
        return this.classify.slice(0, 10)
      },
      classifyTwo () {
        return this.classify.slice(0, 10)
      }
    },
    watch:{
      scrollY(value){
        if(value<-600){
          // console.log()
          this.isBackTopBtnShow = true
        }else{
          this.isBackTopBtnShow = false
        }

        if(value<0){
          this.isNavHeader=true
        }else{
          this.isNavHeader=false
        }
      }
    },
    components: { swiper, swiperSlide }
  }
</script>

<style scoped lang="stylus">
  .zhiding
    position: fixed
    bottom:70px
    right:30px
    color red
    width:30px
    height:30px
    border-radius :15px
    border :1px solid black
    line-height 30px
    text-align center
    background rgba(255, 255, 255, 0.58)

  .nav-header-container
    position:fixed
    top: 0
    width: 100%
    z-index:20
    background :blue
    .nav-header
      height: 44px;
      padding: 0 10px
      box-sizing: border-box
      width: 100%;
      line-height: 44px
      display: flex;

      .classify-icon
        width: 28px;
        color: white
        font-size 24px

      .login-btn
        width: 28px;
        color: white;
        font-size 14px

      .search-box
        flex: 1
        margin: 6px 8px 6px 6px
        height: 30px
        line-height 30px
        background-color white
        border-radius 15px
        overflow hidden

        .jd-logo-search
          color: red
          font-size 20px
          /*display inline-block*/
          /*margin :0 15px*/
          padding: 0 7px 0 16px
          border-right: 1px solid #e2e2e2

        .search-logo
          width: 18px
          margin: 0 5px
          /*font-weight :700*/
          font-size: 16px
          color: #d6d6d6
          line-height 30px
          display inline-block
          transform: translate3d(0, -1px, 0)

        .search-input
          height: 26px;
          outline: none
          -webkit-appearance: none;
          -moz-appearance: none
          transform: translate3d(0, -3px, 0)
          font-size: 12px
          line-height 30px
          color: black

        input:

        :-webkit-input-placeholder
          color: #000000;
          font-size: 12px;
          font-weight: 300;

  .home
    overflow scroll
    img
      width: 100%
      height: 100%
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom: 50px
    background #f3f3f3
    color: #000


    .wrapper
      position: absolute
      top: 0
      right: 0
      left: 0
      bottom: 0

      .slider-header
        width: 100%
        height: 170px
        /*padding 0 10px*/
        background-image: url("./h-bg.jpg")

        .nav-header
          height: 44px;
          padding: 0 10px
          box-sizing: border-box


          width: 100%;
          line-height: 44px
          display: flex;

          .classify-icon
            width: 28px;
            color: white
            font-size 24px

          .login-btn
            width: 28px;
            color: white;
            font-size 14px

          .search-box
            flex: 1
            margin: 6px 8px 6px 6px
            height: 30px
            line-height 30px
            background-color white
            border-radius 15px
            overflow hidden

            .jd-logo-search
              color: red
              font-size 20px
              /*display inline-block*/
              /*margin :0 15px*/
              padding: 0 7px 0 16px
              border-right: 1px solid #e2e2e2

            .search-logo
              width: 18px
              margin: 0 5px
              /*font-weight :700*/
              font-size: 16px
              color: #d6d6d6
              line-height 30px
              display inline-block
              transform: translate3d(0, -1px, 0)

            .search-input
              height: 26px;
              outline: none
              -webkit-appearance: none;
              -moz-appearance: none
              transform: translate3d(0, -3px, 0)
              font-size: 12px
              line-height 30px
              color: black

            input:

            :-webkit-input-placeholder
              color: #000000;
              font-size: 12px;
              font-weight: 300;

        .swiper-box
          width: 300px;
          /*height: 134px;*/
          margin: 0 auto
          border-radius: 20px
          overflow hidden

      .classify-box
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


      .floor-box
        width: 100%

      .seckill-box
        width: 100%
        height: 170px
        padding: 10px
        /*box-sizing:padding-box*/
        box-sizing border-box
        background-origin: content-box

        .seckill-the-container
          height: 100%
          background: white
          display flex
          flex-direction: column

          .seckill-title
            height: 33px
            display: flex
            justify-content: space-between
            line-height: 30px
            font-size: 12px

            .left
              display: flex

              .l-t
                width: 66px
                height: 20px
                margin: 7px 5px 0 5px

                img
                  width: 100%
                  height: 100%

              .start
                color: black
                font-weight: 700
                margin-right: 5px

            .right
              color: red

          .seckill-container
            flex 1
            background-color white

      .new-people
        display flex
        width: 100%
        height: 115px
        padding: 0 10px 5px 10px
        box-sizing border-box
        border-radius: 10px
        overflow hidden

        .item-new
          flex: 1

      .opas-box
        padding: 5px 10px 5px 10px
        display flex
        box-sizing border-box
        width: 100%

        .opa-item
          flex: 1


      .selection
        width: 100%
        padding: 0 10px 5px 10px
        box-sizing border-box

      .tuijian
        width: 100%

      .t-list
        width: 100%
        padding:10px
        box-sizing :border-box
        .t-list-item
          text-align center
          width: 47%
          /*height: 256px*/
          float: left
          background :white
          overflow: hidden
          /*padding:1px*/
          padding:0 5px 5px 0
          border :1px solid black
          .img
            width: 144px
            height: 149px
            margin:0 auto
            img
              width:100%
              height:100%


          .description
            overflow hidden
            height:30px
            font-size 14px
            line-height 15px
            margin-top:5px
            margin-bottom:5px

          .price
            color: red

      .clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }


    .loadMore
        width: 100%
        height: 40px
        /*background: red*/
        text-align: center
        line-height 40px

</style>
