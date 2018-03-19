<template>
	<div ref='wrapper'>
		<slot></slot>
	</div>
</template>


<script>

	import BScroll from 'better-scroll'
	
	export default {
		data(){
			return {

			}
		},
		props:{
			probeType:{
				type: Number,
				default: 1
			},
			click:{
				type:Boolean,
				default: true
			},
			data: {
				type: Array,
				default: null
			},
			listenScroll:{
				type: Boolean,
				default: false
			}
		},
		mounted(){
			setTimeout(()=>{
				this._initScroll();
			},200)
		},
		methods:{

			//初始化滚动
			_initScroll(){
				//console.log(this.$refs.wrapper)
				if(!!this.$refs.wrapper)
				{
					this.scroll = new BScroll(this.$refs.wrapper,{
						  probeType:this.probeType,
						  click: this.click
					})
				}

				//监听滚动事件
				if(this.listenScroll){
					let This = this;
					This.scroll.on('scroll',(pos)=>{
						This.$emit('scroll',pos)
					}) 
				}
			},
			enable(){
				this.scroll && this.scroll.enable()
			},
			disable(){
				this.scroll && this.scroll.disable()
			},
			refresh(){
				this.scroll && this.scroll.refresh()
			},
			scrollTo(){
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			}
		},
		watch: {
			data(){
				setTimeout(()=>{
					this.refresh()
				},200)
			}
		}
	}

</script>

