<template>
    <div class="music-list">
        <div class="back">
            <i class="icon-back" @click="goBack"></i>
        </div>
        <h1 class="title" v-html="title" ref="songsTitle"></h1>

        <div class="bg-image" :style="setBgImg" ref='bgImage'>
            <div class="play-wrapper" v-show="songs.length>0" ref="playBtn">
                <div class="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter"></div>
        </div>
       
       <div class="bg-layer" ref="bgLayer"></div> 
       <scroll @scroll="getScrollY" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref='list' >
          <div class="song-list-wrapper">
            <song-list :songs="songs"></song-list>
          </div>

           <div class="loading-container" v-if="!songs.length">
             <loading></loading>
           </div>
      </scroll>
     
    </div>
</template>

<script>
    
    
    import Scroll from '@/base/scroll/scroll'
    import SongList from '@/base/song-list/song-list'
    import Loading from '@/base/loading/loading'
    import {prefixBrowserVersion} from '@/common/js/dom.js'


    const TOP_DISTANCE = 50
    const TRANSFROM = prefixBrowserVersion('transform')
    const FILTER = prefixBrowserVersion('filter')

    export default{
        data(){
            return {
                scrollY : 0
            }
        },
        props:{
            bgImg:{
                type: String,
                default: ''
            },
            songs:{
                type: Array,
                default: function(){
                    return []
                }
            },
            title:{
                type: String,
                default:''
            }
        },
        created(){
           this.listenScroll = true
           this.probeType = 3
           this.getData()
        },
        methods:{
           getScrollY(pos){
             this.scrollY = pos.y
           },
           goBack(){
            this.$router.back()
           },
           getData(){
               // console.log(prefixBrowserVersion('transform'))
           }
        },
        computed: {
            setBgImg(){
                let bgStr = this.bgImg
                let re = /(\d{3}x\d{3})/g
                bgStr = bgStr.replace(re,'500x500')
                return 'background-image:url('+bgStr+')'
            }
        },
        mounted(){
            //图片背景盒子的高度
            this.imageHeight = this.$refs.bgImage.offsetHeight

            //背景层最大往上移动的值 (translateY的值)
            this.minTranslateY = - this.imageHeight + this.$refs.songsTitle.offsetHeight

            //设置滚动列表盒子的偏移距离
            this.$refs.list.$el.style.top  = this.imageHeight + 'px'
        },
        watch:{
            //监听scrollY值 根据scrollY
            scrollY(value){
                
                let zIndex = 0

                 //往上推 模糊加重
                if(value < 0 && value > this.minTranslateY){
                    let bscale = Math.abs(value/this.imageHeight)
                    let blurValue = Math.min(bscale*10,10)
                    this.$refs.bgImage.style[FILTER] = 'blur('+blurValue+'px)'
                }

                //当列表滑动超过顶部的时候 改变背景图片高度且置顶 进而盖住滚动列表形成交互错觉 
                if(value < this.minTranslateY){
                    zIndex = 10
                    this.$refs.bgImage.style.zIndex = zIndex
                    this.$refs.bgImage.style[FILTER] = 'blur(0px)'
                    this.$refs.bgImage.style.paddingTop = '0%'
                    this.$refs.bgImage.style.height = this.$refs.songsTitle.offsetHeight + 'px';
                    //隐藏随机播放按钮
                    this.$refs.playBtn.style.display = 'none'
                }else{
                    zIndex = 0
                    this.$refs.bgImage.style.zIndex = zIndex
                    this.$refs.bgImage.style.paddingTop = '70%'
                    this.$refs.bgImage.style.height = 0;
                    //显示随机播放按钮
                    this.$refs.playBtn.style.display = 'block'
                }

                //当往下拉的时候 实现图片放大效果
                if(value > 0){
                    zIndex = 10
                    let scale = Math.abs(value/this.imageHeight) + 1
                    this.$refs.bgImage.style.zIndex = zIndex
                    this.$refs.bgImage.style[TRANSFROM] = `scale(${scale})`
                }

                //同步设置背景层的运动
                let moveValue = Math.max(this.minTranslateY,value)
                this.$refs.bgLayer.style[TRANSFROM] = `translate3d(0,${moveValue}px,0)`
            }
        },
       
        components:{
            Scroll,
            SongList,
            Loading
        }
    }
</script>

<style scoped lang="stylus" rel='stylesheet/stylus'>
    
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      background-repeat:no-repeat
      filter: blur(0px)
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)   

</style>

