<template>
	<view class="t-login">
		<image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image>
		<view class="t-b">
			{{title}}
		</view>
		<view class="t-b2">
			请按照提示填写信息，1分钟即可加入班级！
		</view>
		<form class="c1">
			<radio-group name="radio" class="label-flex" v-model="role">
				<label>
					<radio value="student" /><text>学生/家长</text>
				</label>
				<label>
					<radio value="teacher" /><text>老师</text>
				</label>
			</radio-group>
			<view class="t-a">
				<input type="number" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
			</view>
			<view class="t-a">
				<input type="number" name="password" placeholder="请输入密码" maxlength="11" v-model="password" />
			</view>
			<view class="t-a">
				<input type="number" name="phone" placeholder="请再次输入密码" maxlength="11" v-model="comfirmpassword" />
			</view>

			<button @tap="register()">注册</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'欢迎加入班级！',
				second:60,
				showText:true,
				role:'',
				phone:'',
				password:'',
				comfirmpassword:'',
			}
		},
		methods: {
			register(){
				uni.showToast({
					title:'注册成功！'
				})
				uni.reLaunch({
					url:'/pages/login/login'
				})
			},
			submitForm() {
			  // 表单验证，例如检查密码是否一致
			  if (this.password !== this.confirmpassword) {
				uni.showToast({
				  title: '密码不一致',
				  icon: 'none'
				});
				return;
			  }

			  const formData = {
				role: this.role,
				phone: this.phone,
				password: this.password
			  };
			uni.request({
			        url: 'http://localhost:8080/', // 替换为你的实际 API 端点
			        method: 'POST',
			        data: formData,
			        success: (response) => {
			          console.log('成功:', response.data);
			          uni.showToast({
			            title: '提交成功',
			            icon: 'success'
			          });
			          // 处理成功的响应
			        },
			        fail: (error) => {
			          console.error('错误:', error);
			          uni.showToast({
			            title: '提交失败',
			            icon: 'none'
			          });
			          // 处理错误的响应
			        }
			      });
		}
	},
	}
	
</script>

<style>
.label-flex {
  display: flex;
  gap: 100px; /* 使用 gap 属性设置水平间距 */
  margin-bottom: 20px;
}
/* 以下是login.css样式 */
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
</style>
