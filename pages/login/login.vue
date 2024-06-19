<template>
	<view class="t-login">
		<image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image>
		<view class="t-b">{{ title }}</view>
		<view class="t-b2">班级圈，家长老师的最好陪伴！</view>
		<form class="cl">
			<!-- 教师家长选择框 -->
			<radio-group name="radio" class="label-flex" :value="role" @change="radioChange">
				<label>
					<radio value="parents"/><text>家长</text>
				</label>
				<label>
					<radio value="teacher"/><text>教师</text>
				</label>
				<label>
					<radio value="manager"/><text>管理员</text>
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
			<button @tap="Toregister()">注册</button>
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
			title: '欢迎回到班级！', 
			role:'',
			phone: '',
			password:'',
		};
	},
	onLoad() {
		this.getLoading();
	},
	methods: {
		radioChange(e){
			this.role = e.detail.value;
		},
		Toregister(){
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
		//登录验证
		login(){
			let chooselogin;
			let choosereLaunch;
			if(this.role === 'teacher'){
				chooselogin = 'http://localhost:8080/api/teachers/login';
				choosereLaunch = '/pages/index/index';
			}
			if(this.role === 'parents'){
				chooselogin = 'http://localhost:8080/api/parents/login';
				choosereLaunch = '/pages/index/index';
			}
			if(this.role === 'manager'){
				chooselogin =  'http://localhost:8080/api/admins/login';
				choosereLaunch = '/pages/manager/manager';
			}
			console.log('即将跳转至:',chooselogin);
			console.log('页面路径为:',choosereLaunch);
			uni.request({
			        url: chooselogin, // 替换为你的实际 API 端点
			        method: 'POST',
						header: {
							'Content-Type': 'application/json'
						},
					withCredentials:true,
					// 允许发送
			        data: {
						phone:this.phone,
						password:this.password,
						  },
			        success: (response) => {						  
					  if(response.data.message != 'login success'){
						  uni.showToast({
							title: response.data.message,
							icon:'error',
						  });
					  }
					  // 此处识别是否班主任
					  if(response.data.ismaster){
						  	choosereLaunch = '/pages/header-teacher/header-teacher';
					  }
					  if(response.data.message === 'login success'){
						  uni.showToast({
						    title: response.data.message,
						  	icon:'success',
						  });
						  uni.reLaunch({
						  	url:choosereLaunch,
						  });
					  }
			          // 处理成功的响应
			        },
			        fail: (error) => {
			          console.error('请求错误:', error);
			          uni.showToast({
			            title: '登录请求失败',
			            icon: 'none'
			          });
			          // 处理错误的响应
			        }
			      });
		},
		// 页面加载时调用
		getLoading(){ 
			uni.request({
				url: 'http://localhost:8080', 
				success: (res) => {
					console.log('当前登陆状态:',res.errMsg);
				},
				fail:(error) =>{
					if(error.errMsg == 'request:fail'){
						console.log('连接错误：后端连接失败');
					}
					else{
						console.log('连接错误：其他错误');
					}
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
  gap: 120rpx; /* 使用 gap 属性设置水平间距 */
  margin-bottom: 20px;
}
</style>
