<template>
  <view class="container">
    <uni-section type="line" style="margin-bottom: 3px;">
      <view class="box-bg">
        <uni-nav-bar background-color="#1CB1F6" color="white" left-icon="back"  title="个人中心" @clickLeft="back" />
      </view>
    </uni-section>

    <view class="content">
      <view class="item">
        <text class="label">学校</text>
        <text class="value">{{school}}</text>
        <!-- <button class="edit-btn">申请教师权限</button> -->
      </view>
	  
	  <view class="item">
		  <text class="label">学校介绍：</text>
	  	<text class='value'>{{schoolprofile}}</text>
	  </view>
	  
      <view class="item">
        <text class="label">称呼</text>
        <text class="value">{{name}}</text>
        <!-- <button class="edit-btn">修改昵称</button> -->
      </view>
      
      <view class="item">
        <text class="label">班级</text>
        <text class="value">{{class}}</text>
        <!-- <button class="edit-btn">修改班级</button> -->
      </view>

	  <view class="item">
		<text class="label">班级介绍</text>
	  	<text class='value'>{{classprofile}}</text>
	  </view>
	  
      <view class="item">
        <text class="label">手机号</text>
        <text class="value">{{phone}}</text>
      </view>

      <view class="item">
        <text class="label">密码</text>
        <text class="value">{{password}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      // 这里可以放置相关的数据
	  school:'',
	  name:'',
	  class:'',
	  phone:'',
	  password:'',
	  schoolprofile:'',
	  classprofile:'',
    };
  },
  onLoad() {
	const token = uni.getStorageSync('token');
  	uni.request({
  		url:'http://121.199.172.221:8080/api/publics/userInfo',
		method:'POST',
		header:{
			'token':token,
		},
  		success:res=>{
  			console.log('先看看结果',res.data);
  			console.log('teacher',res.data.teacher);
  			console.log('class:',res.data.class);
  			console.log('school',res.data.school);
  			console.log('user_type',res.data.user_type);
			const response = res.data;
			this.school = response.school.name;
			this.class = response.class.name;
			this.schoolprofile = response.school.profile;
			this.classprofile = response.class.profile;
			if(res.data.user_type === 'teacher'){
				this.name = res.data.teacher.name;
				this.phone = response.teacher.phone;
				this.password = response.teacher.password;
			}
			if(res.data.user_type === 'parent'){
				this.name = res.data.parent.name;
				this.phone = response.parent.phone;
				this.password = response.parent.password;
			}
  		}
  	});
  },
  methods: {
	  back(){
		  uni.reLaunch({
		  	url:'/pages/index/index'
		  })
	  }
    // 这里可以放置相关的处理方法
  }
};
</script>

<style scoped>
<style>
.container {
  background: linear-gradient(135deg, #1CB1F6, #6A82FB);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: white;
}

.box-bg {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.content {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 2px solid rgba(135, 255, 98, 0.3);
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  font-size: 16px;
  animation: fadeIn 1s ease-in-out;
}

.value {
  font-size: 16px;
  color: #e05050;
  animation: fadeIn 1s ease-in-out;
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
</style>
