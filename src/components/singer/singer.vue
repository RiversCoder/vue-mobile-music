<template>
  <div class="singer" ref="singer">
  	<list-view :data="singers"></list-view>
  </div>
</template>


<script>

	import ListView from '@/base/listview/listview'
	import { getSingerList } from '@/api/singer'
	import { Singer } from '@/common/js/singer'
	
	const HOT_NAME = '热门'
	const HOT_LEN = 10
	
	export default {
		data(){
			return{
				singers:[]
			}
		},
		props:{
			hot:{
				type: Array,
				default: null
			}
		},
		created(){
			//获取歌手数据内容
			this._getSingerLists();
		},
		methods:{
			_getSingerLists(){			
				getSingerList().then((res)=>{
					this.singers = res.data.list
					//console.log(this.singers);

					//重新组合所需要的数据结构和数据内容
					this.singers = this._innitialHotSingers(this.singers)
					console.log(this.singers)
				});
			},
			_innitialHotSingers(list){


				/*
					* 这里用到了用类来封装公共数据对象
				*/

				//创建hot数据结构
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				};

				list.forEach((item,index,arr)=>{
					
					//创建hot数据
					if(index < HOT_LEN){
						map.hot.items.push(new Singer({
							id: item.Fsinger_mid,
							name: item.Fsinger_name
						}));
					}

					//创建A-Z数据 (结构)
					const key = item['Findex'];
					if(!map[key]){
						map[key] = {
							title: key,
							items: []
						}
					}

					//创建A-Z数据
					map[key].items.push(new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}));


				})

				

				//对获取的数据根据设计图进行排序处理
				let hot = [];
				let ret = [];

				for(let key in map){
					let value = map[key];
					if(value.title.match(/[A-Za-z]/)){
						ret.push(map[key])
					}else if(value.title == HOT_NAME){
						hot.push(map[key])
					}
				}

				//对A-Z序列进行排序
				ret.sort((a,b)=>( a.title.charCodeAt(0) - b.title.charCodeAt(0) ))

				return hot.concat(ret);
			}
		},
		components:{
			ListView
		}
	}


</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
