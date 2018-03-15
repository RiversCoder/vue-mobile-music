<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active: index===currentPageIndex}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import { addClass,hasClass } from 'common/js/dom.js'
    export default {
        name:'silder',
        data(){
          return {
            dots: [],
            currentPageIndex: 0
          }
        },
        props:{
          loop:{
            type: Boolean,
            default: true
          },
          autoPlay:{
            type: Boolean,
            default: true
          },
          interval:{
            type: Number,
            default: 4000
          }
        },
        mounted(){
          setTimeout(()=>{
            this._setSliderWidth();
            this._initDots();
            this._initSlider();
            this._play();
          },500)

          //判断浏览器是否发生缩放 如果发生，就重新计算轮播组件的宽度
          window.addEventListener('resize',()=>{
              if(!!this.slider)
              {
                 this._setSliderWidth();
                 this.slider.refresh();
              }
          })
        },
        deactivated() {
          clearTimeout(this.timer)
        },
        beforeDestroy() {
          clearTimeout(this.timer)
        },
        methods:{
          _setSliderWidth(){
            this.children = this.$refs.sliderGroup.children;
            
            let width = 0;
            let sliderWidth = this.$refs.slider.clientWidth;
            
            for(let i=0;i<this.children.length;i++)
            {
              let child = this.children[i];
              addClass(child,'slider-item');

              child.style.width = sliderWidth + 'px';
              width += sliderWidth;

            }
          
            //判断是否循环
            if(this.loop)
            {
              width += 2*sliderWidth;
            }
            
            //设置包裹盒子的宽度
            this.$refs.sliderGroup.style.width = width + 'px';

          },
          _initDots(){
              this.dots = new Array(this.children.length);
          },
          _initSlider(){

              //注册轮播组件
              this.slider = new BScroll(this.$refs.slider,{
                  scrollX: true,
                  scrollY: false,
                  momentum: false,
                  snap: {
                   loop: true,
                   threshold: 0.3,
                   easing: {
                       style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                       fn: function(t) {
                         return t * (2 - t)
                       }
                    }
                  },
                  bounce: true
              })

              //监控滚动结束后触发事件
              this.slider.on('scrollEnd',()=>{
                  
                  this.currentPageIndex = this.slider.getCurrentPage().pageX;

                  if(this.autoPlay){
                    clearTimeout(this.timer);
                    this._play();
                  }
              })

              
              //滚动开始之前 (手指拉动轮播图的时候)
              this.slider.on('beforeScrollStart',()=>{
                  if(this.autoPlay){
                    clearTimeout(this.timer);
                  }
              });
          },
          _play(){

            //清除上次的定时器
            clearTimeout(this.timer);

            this.timer = setTimeout(()=>{
                this.slider.next();
            },this.interval)  

          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>