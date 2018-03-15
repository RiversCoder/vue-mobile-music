<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discLists">
      <div>
          <div class="slider-wrapper" ref="sliderWrapper">
             <slider>
                <div v-for="(item,index) in recommends.slider">
                    <a :href="item.linkUrl">
                        <img :src="item.picUrl" @load="loadImage"  class="neddsclick"/>
                    </a>
                </div>
              </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li class="item" v-for="(item,index) in discLists">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.cover"/>
                </div>
                <div class="text">
                  <h2 class="name" v-text="item.username"></h2>
                  <p class="desc" v-text="item.rcmdcontent"></p>
                </div>
              </li>
            </ul>
          </div>
      </div>
      <div class="loading-container" v-show="!discLists.length">
         <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>



<script type="text/ecmascript-6">
  
  import Loading from '@/base/loading/loading'
  import Slider from '@/base/slider/slider'
  import Scroll from '@/base/scroll/scroll'
  import { getRecommend,getDiscList } from '@/api/recommend'
  import { ERROR_OK } from '@/api/config'
  


  export default {
    data(){
      return {
        recommends: [],
        discLists: []
      }
    },
    created() {
      this._getRecommend()

      setTimeout(()=>{
         this._getDiscList()
      },300)
     
    },
    methods: {
      _getRecommend(){
          getRecommend().then((res) => {
            let recommendData = JSON.parse(res);
            if( ERROR_OK === recommendData.code){
                 console.log(recommendData);
                 this.recommends = recommendData.data;
            }
          })
      },
      _getDiscList(){
          getDiscList().then((res) => {
             if( ERROR_OK === res.code )
             {
                this.discLists = res.recomPlaylist.data.v_hot;
                console.log(this.discLists);
             }
          })
      },
      loadImage(){
          if(!this.checkLoaded)
          {
              this.$refs.scroll.refresh();
              this.checkLoaded = true;
          }
      }
    },
    components:{
      Slider,
      Scroll,
      Loading
    }
  }

</script>



<style scoped lang="stylus" rel="stylesheet/stylus">
  
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>