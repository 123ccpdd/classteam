<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="t-b2">班级圈，家长老师的最好陪伴！</view>
		<form class="cl">
			<!-- 教师家长选择框 -->
			<radio-group @change="rolechange" name="radio" class="label-flex" v-model="role">
				<label>
					<radio value="student"/><text>家长</text>
				</label>
				<label>
					<radio value="teacher"/><text>教师</text>
				</label>
			</radio-group>
			
			<view class="t-a">
				<image src="https://zhoukaiwen.com/img/loginImg/sj.png"></image>
				<view class="line"></view>
				<input name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
			</view>
			<view class="t-a">
				<image src="https://zhoukaiwen.com/img/loginImg/yz.png"></image>
				<view class="line"></view>
				<input name="code" maxlength="6" placeholder="请输入密码" v-model="password" />
			</view>
			<button @tap="login()">登 录</button>
			<br />
			<button @tap="register()">注册</button>
		</form>
		<view class="t-f"><text>————— 第三方账号登录 —————</text></view>
		<view class="t-e cl">
			<view class="t-g" @tap="wxLogin()"><image src="https://zhoukaiwen.com/img/loginImg/wx.png"></image></view>
			<view class="t-g" @tap="zfbLogin()"><image src="https://zhoukaiwen.com/img/loginImg/qq.png"></image></view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			title: '欢迎回到班级！', //填写logo或者app名称，也可以用：欢迎回来，看您需求
			role:'',
			phone: 'root',
			password:'root',
		};
	},
	onLoad() {
		this.getLoading();
		console.log(this.role);
	},
	methods: {
		//当前登录按钮操作
		login() {
			//admin1 11111
			//admin2 22222
			//admin3 33333
			if(this.phone == 'admin1' && this.password=='11111'){
				uni.showToast({
					title:'管理员账号登录成功！'
				})
				uni.reLaunch({
					url:'/pages/manager/manager'
				})
			}
			if(this.phone == 'root' && this.password == 'root'){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
			// uni.showToast({ title: '登录成功！', icon: 'none' });
			// uni.reLaunch({
			// 	url:'/pages/index/index'
			// })
		},
		register(){
			uni.reLaunch({
				url:'/pages/register/register'
			})
		},
		//等三方微信登录
		wxLogin() {
			uni.showToast({ title: '微信登录', icon: 'none' });
		},
		//第三方支付宝登录
		zfbLogin() {
			uni.showToast({ title: 'qq登录', icon: 'none' });
		},
		//登录验证（未开发）
		login(){
			uni.request({
			        url: 'http://localhost:8080/api/teachers/login', // 替换为你的实际 API 端点
			        method: 'POST',
						header: {
							'Content-Type': 'application/json'
						},
					// withCredentials:true,
					// 允许发送
			        data: {
						phone:this.phone,
						password:this.password,
						  },
			        success: (response) => {
			          console.log('成功:', response.data);
			          uni.showToast({
			            title: '登录成功',
			            icon: 'success'
			          });
					  uni.reLaunch({
					  	url:'/pages/index/index'
					  })
			          // 处理成功的响应
			        },
			        fail: (error) => {
			          console.error('错误:', error);
			          uni.showToast({
			            title: '登录失败',
			            icon: 'none'
			          });
			          // 处理错误的响应
			        }
			      });
		},
		getLoading(){
			uni.request({
				url: 'http://localhost:8080/', 
				success: (res) => {
					console.log(res);
				}
			});
		},
	}
};
</script>
<style>
.img-a {
	position: absolute;
	width: 100%;
	top: -150rpx;
	right: 0;
}
.img-b {
	position: absolute;
	width: 50%;
	bottom: 0;
	left: -50rpx;
	/* margin-bottom: -200rpx; */
}
.t-login {
	width: 650rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}

.t-login button {
	font-size: 28rpx;
	background: #5677fc;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	background: #f8f7fc;
	border: 1px solid #e9e9e9;
	font-size: 28rpx;
	border-radius: 50rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
	/* border-right: 2rpx solid #dedede; */
	margin-right: 20rpx;
}
.t-login .t-a .line{
	width: 2rpx;
	height: 40rpx;
	background-color: #dedede;
	position: absolute;
	top: 28rpx;
	left: 98rpx;
}

.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #000;
	padding: 300rpx 0 30rpx 0;
	font-weight: bold;
}
.t-login .t-b2 {
	text-align: left;
	font-size: 32rpx;
	color: #aaaaaa;
	padding: 0rpx 0 120rpx 0;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 200rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #000;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
.label-flex {
  display: flex;
  gap: 100px; /* 使用 gap 属性设置水平间距 */
  margin-bottom: 20px;
}
</style>
