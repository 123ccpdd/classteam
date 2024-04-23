<template>
	<view class="container">
		<uni-section  
		type="line" style="margin-bottom: 3px;">
					<view class="box-bg">
						<uni-nav-bar background-color="#1CB1F6" color="white" left-icon="back" right-icon="redo" title="欢迎来到班级圈" @clickLeft="back" @clickRight="share" />
					</view>
		</uni-section>
	</view>
	<view class="">
		
	</view>
	<image style="width: 100%; height: 200px;" src="../../static/index2.jpg" mode="scaleToFill"></image>
</template>


<script>
	export default{
		data(){
			return{
			}
		},
		methods:{
			back(){
				uni.reLaunch({
					url:'/pages/login/login'
				})
			},
			share(){
				uni.reLaunch({
					url:'/pages/share/share'
				})
			}
		}
	}
</script>

<style>

</style>
