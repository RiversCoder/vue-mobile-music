<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :bgImg="bgImg" :songs="songs" :title="title"></music-list>
    </div>
  </transition>
</template>


<script>
   
  import {mapGetters} from 'vuex'
  import {getSingerSongs} from '@/api/singer'
  import {ERROR_OK} from '@/api/config'
  import {createSong} from '@/common/js/song'
  import musicList from '@/components/music-list/music-list'

	export default{
    data(){
      return {
        songs: []
      }
    },
    computed:{
      ...mapGetters([
        'singer']
      ),
      title(){
        return this.singer.name
      },
      bgImg(){
        return this.singer.cover
      }
    },
    methods:{
      //初始化歌曲数据
      _innitialSongs(){

       //如果在歌手详情页面进行刷新操作，就回退到上一个路由操作(歌手列表页面)   
       if(!this.singer.id){
        this.$router.push('/singer')
        return
       } 

       //获取对应歌手的歌曲数据
       getSingerSongs(this.singer.id).then((res)=>{

            //如果响应正确就赋值操作
            if(res.code === ERROR_OK){
              //根据自身的需求格式化数据
              this.songs = this._normalizeLists(res.data.list);
            
            }

        });
        
      },
      //二次封装歌手详情的数据
      _normalizeLists(list){
        let format = [];
        list.forEach((item)=>{
          
          //结构赋值给muiscData变量
          let {musicData} = item

          //如果存在歌曲id以及专辑id 就就对数据进行二次封装
          if(musicData.songid && musicData.albummid){
            format.push(createSong(musicData))
          }
        })

        return format
        //console.log(format)
      },
      getSongsData(){
        //console.log(this.songs)
      }
    },
    created(){
      this._innitialSongs();
      this.getSongsData();
      //console.log(this.singer)
    },
    components:{
      musicList
    }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0 
  bottom: 0
  background: $color-background
.slide-enter-active, .slide-leave-active
  transition: all 0.5s
.slide-enter, .slide-leave-to
  transform:translate3d(100%,0,0)
</style>
