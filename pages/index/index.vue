<template>
	<view class="container">
		<uni-section  
		type="line" style="margin-bottom: 3px;">
					<view class="box-bg">
						<uni-nav-bar background-color="#1CB1F6" color="white" left-icon="back" right-icon="redo" title="班级圈" @clickLeft="back" @clickRight="share" />
					</view>
		</uni-section>
	</view>
    <view class="avatar-box">
      <image class="avatar" :src="avatarUrl" @click="Tomyself"/>
	  <view class="username" @click="Tomyself">
	  	{{identity}}（{{subject}}）
	  </view>
    </view>
	<view class="out">
		<view class="row" v-for="item in listArr" :key="item.id" @click="clickItem(item.id)">
			<view class="title">
				{{item.title}}
			</view>
			<view class="content">
				{{item.body}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				identity:'',
				subject:'',
				avatarUrl:"",
				listArr:[]
			}
		},
		onLoad(){
			this.getPicUrl();
			this.getData();
			const token = uni.getStorageSync('token');
			uni.request({
				url:'http://121.199.172.221:8080/api/publics/userInfo',
				method:'POST',
				header:{
						'token' : token,
				},
				success:res=>{
					console.log('先看看结果',res.data);
					if(res.data.user_type === 'teacher'){
						this.identity = res.data.teacher.name;
						this.subject = res.data.teacher.subject;
					}
					if(res.data.user_type === 'parent'){
						this.identity = res.data.parent.name;
						this.subject = res.data.student.name + '家长';
					}
				}
			});
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
			},
			getPicUrl(){
				uni.request({
					url:"https://api.vvhan.com/api/avatar/rand?type=json",
					success:res=>{
						console.log(res)
						this.avatarUrl = res.data.url
					},
				})
			},
			getData(){
				uni.request({
					url:"https://jsonplaceholder.typicode.com/posts",
					success:res=>{
						console.log(res)
						this.listArr=res.data
					}
				})
			},
			clickItem(e){
				console.log(e)
				uni.navigateTo({
					url:"/pages/detail/detail?id="+e,
				})
			},
			Tomyself(){
				uni.navigateTo({
					url:"/pages/myself/myself"
				})
			},
		},
	}
</script>

<style lang="scss">
.avatar-box{
	background-image: url('/static/index.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	height: 200px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover; /* 确保图片适应容器 */
  top: 90px;
  left: 10px;
}
.username{
	font-family: 'MyFont';
	font-size: 24px;
	font-weight: 600;
	color: antiquewhite;
	position: absolute;
	left: 140px;
	top: 170px;
}
.out{
	padding: 50rpx 30rpx;
	.row{
		padding: 20rpx 0;
		border: 1px dotted #e4e4e4;
		.title{
			font-size: 30rpx;
			padding-bottom: 15rpx;
			color: #333;
		}
		.content{
			font-size: 28rpx;
			color: #888;
		}
	}
}
</style>
