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
			<radio-group name="radio" class="label-flex" :value="role" @change="radioChange">
				<label>
					<radio value="student"/><text>家长</text>
				</label>
				<label>
					<radio value="teacher"/><text>教师</text>
				</label>
			</radio-group>
			<!-- 此处是家长注册界面 -->
			<view class="student-register" v-if="role === 'student'">
				<view class="t-a">
					<input name="name" placeholder="请输入姓名" v-model="name" />
				</view>
				<view class="t-a">
					<input name="sex" placeholder="请输入性别" v-model="sex"/>
				</view>
				<view class="t-a">
					<input type="number" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
				</view>
				<view class="t-a">
					<input type="number" name="password" placeholder="请输入密码" maxlength="11" v-model="password" />
				</view>
				<view class="t-a">
					<input type="number" name="password" placeholder="请再次输入密码" maxlength="11" v-model="confirmpassword" />
				</view>
				<button @tap="stsubmitForm()">注册</button>
			</view>
			<!-- 此处是教师注册页面 -->
			<view class="student-register" v-if="role === 'teacher'">
				<view class="t-b3">
					尊敬的教师您好,您是否为班主任？
				</view>
				<checkbox-group name="headermaster" class="checkbox1" @change="checkbox1">
					<label>
						<checkbox value="1" /><text>是的</text>
					</label>
				</checkbox-group>
				<view class="uni-list">
					<view class="t-a">
						<view class="t-b3">
							当前选择科目
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="t-a">
					<input name="name" placeholder="请输入姓名" v-model="name" />
				</view>
				<view class="t-a">
					<input name="sex" placeholder="请输入性别" v-model="sex"/>
				</view>
				<view class="t-a">
					<input name="school" placeholder="请输入学校" v-model="school"/>
				</view>
				<view class="t-a">
					<input name="class" placeholder="请输入班级" v-model="class"/>
				</view>
				<view class="t-a">
					<input type="number" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
				</view>
				<view class="t-a">
					<input type="number" name="password" placeholder="请输入密码" maxlength="11" v-model="password" />
				</view>
				<view class="t-a">
					<input type="number" name="password" placeholder="请再次输入密码" maxlength="11" v-model="confirmpassword" />
				</view>
				<button @tap="tcsubmitForm()">注册</button>
			</view>
		</form>
	</view>
</template>

<script>
	// 设置cookie函数，未经过调用，纯属娱乐
	function setCookie(c_name,value,expireseconds){
	    var exdate=new Date();
	    exdate.setTime(exdate.getTime()+expireseconds * 1000);
	    document.cookie=c_name+ "=" +escape(value)+
	    ((expireseconds==null) ? "" : ";expires="+exdate.toGMTString())
	}
	
	export default {
		data() {
			return {
				title:'欢迎加入班级！',
				second:60,
				showText:true,
				role:'',
				name:'',
				sex:'',
				school:'',
				class:'',
				phone:'',
				password:'',
				confirmpassword:'',
				index:0,
				array:['语文','数学','英语','物理','化学','生物','政治','历史','地理'],
				ismaster:0,
			}
		},
		methods: {
			stsubmitForm(){
				if (!this.name) {
					uni.showToast({ title: '姓名不能为空', icon: 'none' });
					return;
				}
				if (!this.sex) {
					uni.showToast({ title: '性别不能为空', icon: 'none' });
					return;
				}
				if (!this.phone) {
					uni.showToast({ title: '手机号不能为空', icon: 'none' });
					return;
				}
				if (!this.password) {
					uni.showToast({ title: '密码不能为空', icon: 'none' });
					return;
				}
				if (!this.confirmpassword) {
					uni.showToast({ title: '确认密码不能为空', icon: 'none' });
					return;
				}
				if (this.password !== this.confirmpassword) {
					uni.showToast({ title: '两次输入的密码不一致', icon: 'none' });
					return;
				}
				uni.request({
				        url: 'http://localhost:8080/api/parents/register', // 替换为你的实际 API 端点
				        method: 'POST',
				        data: {
							name:this.name,
							sex:this.sex,
							phone: this.phone,
							password: this.password,
						  },
				        success: (response) => {
							console.log('后端响应结果:', response.data.message);
							uni.showToast({
								title:response.data.message,
								icon:'none'
							})
							console.log('后端id:',response.data.id);			
				          // 处理成功的响应
				        },
				        fail: (error) => {
				          console.error('请求错误:', error);
				          uni.showToast({
				            title: '登录失败',
				            icon: 'error'
				          });
				          // 处理错误的响应
				        }
				      });
			},
			tcsubmitForm() {
			// 检查是否为空
			if (!this.name) {
				uni.showToast({ title: '姓名不能为空', icon: 'none' });
				return;
			}
			if (!this.sex) {
				uni.showToast({ title: '性别不能为空', icon: 'none' });
				return;
			}
			if (!this.school) {
				uni.showToast({ title: '学校不能为空', icon: 'none' });
				return;
			}
			if (!this.class) {
				uni.showToast({ title: '班级不能为空', icon: 'none' });
				return;
			}
			if (!this.phone) {
				uni.showToast({ title: '手机号不能为空', icon: 'none' });
				return;
			}
			if (!this.password) {
				uni.showToast({ title: '密码不能为空', icon: 'none' });
				return;
			}
			if (!this.confirmpassword) {
				uni.showToast({ title: '确认密码不能为空', icon: 'none' });
				return;
			}
			if (this.password !== this.confirmpassword) {
				uni.showToast({ title: '两次输入的密码不一致', icon: 'none' });
				return;
			}
			console.log(role);
			uni.request({
			        url: 'http://localhost:8080/api/teachers/register', // 替换为你的实际 API 端点
			        method: 'POST',
			        data: {
						name:this.name,
						sex:this.sex,
						school:this.school,
						class:this.class,
						phone: this.phone,
						password: this.password,
						subject:this.array[this.index],
						ismaster:this.ismaster
					  },
			        success: (response) => {
						console.log('后端响应结果:', response.data.message);
						alert(response.data.message);
						console.log('后端id:',response.data.id);	
						uni.showToast({
							title:response.data.message,
							icon:'none'
						})
			          // 处理成功的响应
			        },
			        fail: (error) => {
			          console.error('请求错误:', error);
			          uni.showToast({
			            title: '登录失败',
			            icon: 'none'
			          });
			          // 处理错误的响应
			        }
			      });
		},
		radioChange(e){
			this.role = e.detail.value;
		},
		bindPickerChange: function(e) {
			console.log('是否班主任，携带值为', e.detail.value)
			this.index = e.detail.value
		},
		checkbox1(e){
			if(e.detail.value == 1){
				this.ismaster = 1;
			}else(this.ismaster = 0)
		},
	},
};
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

.t-login picker {
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
.t-b3{
	text-align: left;
	font-size: 32rpx;
	color: #aaaaaa;
	padding: 0rpx 0 30rpx 0;
    position: relative;
    z-index: 999;
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

.checkbox1{
	position: relative;
	padding-bottom: 20rpx;
}


</style>
