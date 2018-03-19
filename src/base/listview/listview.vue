<template>
   <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
      <ul>
          <li v-for="group in data" class="list-group" ref="listgroup">
              <h2 class="list-group-title">{{group.title}}</h2>
              <ul>
                  <li v-for="(item,index) in group.items" class="list-group-item" @click="selectItem(item)">
                      <img class="avatar" v-lazy="item.cover" />
                      <span class="name">{{item.name}}</span>
                  </li>
              </ul>
          </li>
      </ul>

      <div class="list-shortcut">
         <ul>
            <li v-for="(item,index) in shortcutList" class="item" @touchstart.stop.prevent="onShortcutTouchStart"  @touchmove.stop.prevent="onShortcutTouchMove"  :data-index="index" :class="{'current': index === currentIndex}">
                {{item}}
            </li>
         </ul>
      </div>

      <div class="list-fixed" v-show="fixedTitle" ref="fixedBar">
          <h1 class="fixed-title">{{fixedTitle}}</h1>
      </div>

       <div class="loading-container" v-show="isloading">
         <loading></loading>
      </div>

   </scroll>
</template>

<script type="text/ecmascript-6">
    
    import Scroll from '@/base/scroll/scroll'
    import { getsetData } from '@/common/js/dom'
    import Loading from '@/base/loading/loading'
    //每个锚点的高度 根据css
    const ANCHOR_HEIGHT = 18

    export default {
      data(){
        return{
          scrollY: -1,   //向上( Y轴 )滚动隐藏的部分的高度
          currentIndex: 0,  //当前所到的列表组索引
          diff: -1,
          isloading: true    
        }
      },
      created(){
        this.touch = {}
        this.listenScroll = true
        this.probeType = 3
      },
      props:{
        data:{
          type:Array,
          default: []
        }
      },
      methods:{

        //鼠标触控 -> 歌手列表滚动到指定位置
        onShortcutTouchStart(e){
            let perIndex = getsetData(e.target,'index')
            this.touch.y1 = e.touches[0].pageY
            this.touch.perIndex = perIndex*1
            this._scroll(perIndex)
        },
        //鼠标拖动 -> 歌手列表跟着实时滚动
        onShortcutTouchMove(e){
            this.touch.y2 = e.touches[0].pageY
            let delta =  Math.floor((this.touch.y2 -  this.touch.y1)/ANCHOR_HEIGHT)
            let anchor = delta +  this.touch.perIndex
            this._scroll(anchor)
        },
        _scroll(index){

          //当index为null
          if(!index && index !== 0){
              return
          }

          /* 边界处理 */

          //当index < 0
          if(index < 0){
            index  = 0
          }

          //当index > this.listHeight.length-2
          if(index > this.listHeight.length-2){
              index = this.listHeight.length-2
          }

          this.scrollY = - this.listHeight[index]
          this.$refs.listview.scrollToElement(this.$refs.listgroup[index],500)
        },
        scroll(pos){
          this.scrollY = pos.y;
          //console.log(pos)
        },
        _calculateHeight(){
          let iHeight = 0;
          this.listHeight = [0];
          const lists = this.$refs.listgroup
          
          for(let i=0;i<lists.length;i++){
              iHeight += lists[i].clientHeight
              this.listHeight.push(iHeight)
          }
          this.isloading = false;
          //console.log(this.listHeight)
        },
        //点击歌手列表项，派发事件
        selectItem(item){
            this.$emit('select',item)
        }
      },
      watch:{
        data(){
          setTimeout(()=>{
            this._calculateHeight()
          },20)
        },
        scrollY(newY){

          //获取每组列表组元素的距离scroll盒子顶部的的偏移量数组
          const listHeight = this.listHeight

          //鼠标往上拉 滚动到顶部 newY大于0的情况
          if(newY > 0){
            this.currentIndex = 0
          }

          //滚动在中部 Math.abs(newY)大于上一个元素的上限，小于下一个元素的下限
          for(let i=0;i<listHeight.length - 1;i++){
            
            let height1 = listHeight[i]
            let height2 = listHeight[i+1]

            //滑动距离处于两个列表之间
            if((Math.abs(newY) >= height1 && Math.abs(newY) < height2)){
                this.currentIndex = i
                this.diff = height2 + newY
                return
            } 
          }

           //滚动到底部 Math.abs(newY)大于最后一个元素的上限
           this.currentIndex = listHeight.length - 2
          
        },
        diff(val){  

            /* 核心:
                1. 使用上次记录与这次做对比，如果相同则不处于顶到bar的位置，所以 translate3d(0,0,0) 
                2. 如果处于顶到bar的位置，则 fixTop 是变化的 ，则上次的fixTop与这次的fixTop不同 所以 translate3d(0,${fixTop}px,0)
            */

            let fixedBar = this.$refs.fixedBar
            let fixTop = (val <= 30 && val > 0) ? (val-30) : 0
            
            if(this.fixTop === fixTop){
                return
            }  

            this.fixTop = fixTop
            fixedBar.style.transform = `translate3d(0,${fixTop}px,0)`
        }
      },
      computed:{
        shortcutList(){
          return this.data.map((group)=>(group.title.substr(0,1)))
        },
        fixedTitle(){
          if(this.scrollY > 0){
              return false
          } 
          return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
      },
      components:{
        Scroll,
        Loading
      }
    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
