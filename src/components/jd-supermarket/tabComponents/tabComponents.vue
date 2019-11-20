<template>
  <div class="tabComponents">
      <div class="tabs-wrapper" ref="tabsWrapper">
        <div class="tabs" ref="tabs">
          <div class="item" ref="tabItems" :class="{active:currentIndex==index}" @click="changeIndex(index)"
               v-for="(item,index) in contentData" :key="index">{{item.title}}
          </div>
          <div class="line" ref="line"></div>
        </div>
      </div>
      <div class="tab-components">

        <div v-if="!pageData" class="loading" style="height:700px;backgroundColor:blue ">
          loading
        </div>
        <div v-else>
          <components class="content-com" :is="currentComponent" :data="pageData"></components>

        </div>
      </div>
  </div>


</template>

<script>


  import BScroll from '@better-scroll/core'

  import Cartoon from './Cartoon/Cartoon.vue'
  import Recommend from './Recommend/Recommend.vue'
  import Film from './Film/Film.vue'

  export default {
    name: "tabComponents",
    props:{
      data:{
        type:Array,
        default:function () {
          return []
        }
      },
    },
    data() {
      return {
        title: 'tabComponents',
        // tabs: ['推荐', '动画', '电影', '综艺', '电视剧', '视频', '明日之子', '大主宰', '土豪'],
        currentIndex: 0,
        tabOffsets: [],
        contentData: [
          {title: '超市精选', component: Recommend},
          {title: '宠物生活', component: Cartoon},
          {title: '家居日用', component: Cartoon},
          {title: '时令生鲜', component: Recommend},
          {title: '中外名酒', component: Cartoon},
          {title: '视频', component: Cartoon},
          {title: '母婴玩具', component: Recommend},
          {title: '个人护理', component: Cartoon},
          // {title: '食品饮料', component: Film},
        ],
        currentComponent: Recommend
      }
    },
    created() {
      let bscroll = null
    },
    mounted() {

      this.$nextTick(() => {
        this.initScroll()
        this._calculateTabOffsets()
        this._scrollToElement()
      })
    },
    methods: {
      initScroll() {
        this.bscroll = new BScroll(this.$refs.tabsWrapper, {
          scrollX: true,
          scrollY: false,
          click: true
        })
        this.initLine()
      },
      initLine() {
        let currentTab = this.$refs.tabItems[this.currentIndex]
        let currentTabWidth = currentTab.clientWidth
        this.$refs.line.style.width = currentTabWidth + 'px'
        // this.$refs.line.style.heigth = '3px'
      },
      changeIndex(index) {
        this.currentIndex = index
        this._scrollToElement()
        this.currentComponent = this.contentData[this.currentIndex].component
        this.$emit('select',index)
      },
      _calculateTabOffsets() {
        let tabItemGroup = this.$refs.tabItems
        let _offset = 0
        this.tabOffsets.push(_offset)
        for (let i = 0; i < tabItemGroup.length; i++) {
          let current = tabItemGroup[i]
          _offset += current.clientWidth
          this.tabOffsets.push(_offset)
        }
      },
      _lineTranslate(Offset, time) {
        this.$refs.line.style.transform = `translateX(${Offset}px)`
        this.$refs.line.style.transition = time + 's'
      },
      _scrollToElement() {
        let wrapperWidth = this.$refs.tabsWrapper.clientWidth;        //获取wrapper宽度
        let middle = wrapperWidth / 2        //中间
        let tabsWidth = this.$refs.tabs.clientWidth;//获取tabs宽度
        let currentTabWidth = this.$refs.tabItems[this.currentIndex].clientWidth;//获取当前索引项宽度
        let currentTabOffset = this.tabOffsets[this.currentIndex]//每一个的偏移量
        this.initLine()

        if (currentTabOffset < middle) {
          console.log(1);
          this.bscroll.scrollTo(0, 0, 200)
          this._lineTranslate(currentTabOffset, 0.2)
        } else if (currentTabOffset + currentTabWidth / 2 > middle && tabsWidth - currentTabOffset - currentTabWidth / 2 > middle) {
          console.log(2);
          let scroll = currentTabOffset - middle + currentTabWidth / 2
          this.bscroll.scrollTo(-scroll, 0, 200)
          this._lineTranslate(currentTabOffset, 0.2)
        } else {
          console.log(3);
          let scroll = tabsWidth - wrapperWidth
          this.bscroll.scrollTo(-scroll, 0, 200)
          this._lineTranslate(currentTabOffset, 0.2)
        }
      },
    },
    computed: {
      pageData(){
        return this.data[this.currentIndex]
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus">
  .active
    color: red
.tabComponents
  /*height:100%*/
  .tabs-wrapper
    width: 100%
    height: 40px
    /*height:100%*/
    white-space: nowrap
    background-color: white
    overflow: hidden

    .tabs
      display: inline-block
      line-height: 40px
      position: relative

      .item
        display: inline-block
        padding: 0 10px

      .line
        background-color: red
        height: 3px
        /*width:10px*/
        position: absolute
        bottom: 0
        left: 0
  .tab-components
    height:100%


</style>
