<template>
  <view class="container">
	  <!-- 顶部栏 -->
	  <uni-section
	  type="line" style="margin-bottom: 3px;">
	  			<view class="box-bg">
	  				<uni-nav-bar background-color="#1CB1F6" color="white" left-icon="back" right-text="完成" title="请班主任添加新学生!" @clickLeft="back" @clickRight="nextPage"/>
	  			</view>
	  </uni-section>
	
    <view class="content">
		<view class="text1">
			现有学生名单
		</view>
	  <!-- 新添加学生 -->
	  <view class="form">
	    <view v-for="(student, index) in Presentstudents" :key="index" class="form-row">
	      <input class="show" placeholder="姓名" v-model="student.name" disabled/>
		  <input class="show" placeholder="性别" v-model="student.sex" disabled/>
	    </view>
		<view v-for="(student, index) in Pendingstudents" :key="index" class="form-row">
		  <input class="show" placeholder="姓名" v-model="student.name" disabled/>
		  <input class="show" placeholder="性别" v-model="student.sex" disabled/>
		</view>

	  </view>
	  
	  <view class="form-row">
	    <input class="input-name" placeholder="姓名" v-model="newStudent.name" />
	    <picker mode="selector" :range="sexOptions" class="input-sex" @change="updateNewStudentSex($event)">
	      <view class="picker">{{ newStudent.sex }}</view>
	    </picker>
	    <button class="add-btn" @tap="addStudent">添加学生</button>
	  </view>
	  <button class="submit-btn" @tap="submitStudents">提交</button>
	  
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      className: '',
	  Sex:'',
      classes: [],
	  profile:[],
	  Presentstudents: [],
	  Pendingstudents:[],
	  newStudent: { name: '', sex: '点击选择性别' },
	  sexOptions: ['男', '女'],
    }
  },
  onLoad() {
	this.getStudents();
  },
  methods: {
	  getStudents() {
		const token = uni.getStorageSync('token');
	    // 假设通过接口获取学生数据
	    uni.request({
	      url: 'http://121.199.172.221:8080/api/students/showStudent',
		  method:'POST',
		  header:{
		  		'token' : token,
		  },
	      success: (res) => {
			console.log('返回结果',res);
	        this.Presentstudents = res.data.students;
	      },
	    });
	  },
	  updateNewStudentSex(event) {
	    const value = event.detail.value;
	    this.newStudent.sex = this.sexOptions[value];
	  },
	  addStudent() {
	    if (!this.newStudent.name || this.newStudent.sex === '性别') {
	      uni.showToast({ title: '请填写完整信息', icon: 'none' });
	      return;
	    }
	    this.Pendingstudents.push({ ...this.newStudent });
	    this.newStudent = { name: '', sex: '性别' }; 
	  },
    submitStudents() {
		for(var i = 0;i<this.Pendingstudents.length;i++){
			console.log('这是第',i+1,'个学生的姓名：',this.Pendingstudents[i].name);
			console.log('这是第',i+1,'个学生的性别：',this.Pendingstudents[i].sex);
			uni.request({
				url:'http://121.199.172.221:8080/api/students/addStudent',
				method:'POST',
				header:{
					'Content-Type':'application/json',
					'token': 'token'
				},
				withCredentials:true,
				data: {
					name:this.Pendingstudents[i].name,
					sex:this.Pendingstudents[i].sex,
				},
				success:(response) =>{
					console.log('学生提交成功',response.data);
					this.Pendingstudents = [];
					uni.showToast({
						title:'提交成功，请重新加载页面',
						icon:'none'
					});
				}
			})
		}
    },
	
	//上边栏返回下一步功能 
	back(){
		uni.reLaunch({
			url:'/pages/login/login'
		})
	},
	nextPage(){
		uni.showToast({
			icon:'success',
			title:'新学生添加完成'
		}),
		uni.reLaunch({
			url:'/pages/index/index'
		})
	},
	
  }
}
</script>

<style>
.container {
}
.header {
  text-align: center;
  margin-bottom: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.text1{
	text-align: center;
	font-size: 40rpx;
	margin: 15rpx 0;
}
.input-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.input-group input {
  flex: 1;
  margin-right: 10px;
}
.class-list {
  margin-top: 20px;
}
.class-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
/* 新css */
.container {
  padding: 20rpx;
}
.form {
  width: 100%;
  margin: 10rpx 0;
  margin-bottom: 10rpx;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  animation: fadeIn 1s ease-in-out;
}

.show {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(42, 188, 255, 0.3);
  border-radius: 5%;
  padding: 10px;
  width: 48%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.input-name{
  flex: 1;
  padding: 15rpx;
  margin-right: 10rpx;
  border: 1px solid #ccc;
  border-radius: 10rpx;
  font-size: 30rpx;
}
.picker {
	flex: 1;
	padding: 15rpx;
	border: 1px solid #ccc;
	border-radius: 10rpx;
	font-size: 30rpx;
}
.input-sex {
  flex: 1;
  margin-right: 10rpx;
  border: 1px solid #ccc;
  border-radius: 10rpx;
  font-size: 30rpx;
}
.add-btn {
  background-color: #5677fc;
  color: #fff;
  border: none;
  border-radius: 10rpx;
  font-size: 30rpx;
}
</style>
