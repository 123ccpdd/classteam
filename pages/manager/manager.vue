<template>
  <view class="container">
	  <!-- 顶部栏 -->
	  <uni-section
	  type="line" style="margin-bottom: 3px;">
	  			<view class="box-bg">
	  				<uni-nav-bar background-color="#1CB1F6" color="white" left-icon="back" right-text="完成" title="请管理员添加新的班级!" @clickLeft="back" @clickRight="nextPage"/>
	  			</view>
	  </uni-section>
	
    <view class="content">
		<view class="text1">
			现有班级名单
		</view>
	  <!-- 新添加班级 -->
	  <view class="form">
	    <view v-for="(classes, index) in Presentclasses" :key="index" class="form-row">
	      <input class="show" placeholder="班级" v-model="classes.name" disabled/>
		  <input class="show" placeholder="描述" v-model="classes.profile" disabled/>
	    </view>
		<view v-for="(classes, index) in Pendingclasses" :key="index" class="form-row">
		  <input class="show" placeholder="班级" v-model="classes.name" disabled/>
		  <input class="show" placeholder="描述" v-model="classes.profile" disabled/>
		</view>

	  </view>
	  
	  <view class="form-row">
	    <picker mode="selector" :range="classOptions" class="input-sex" @change="updateNewclass($event)">
		  <view class="picker">{{ newClass.name }}</view>
	    </picker>
		<input class="input-name" placeholder="描述" v-model="newClass.profile" />
	    <button class="add-btn" @tap="addStudent">添加班级</button>
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
      classes: [],
	  profile:[],
	  Presentclasses: [],
	  Pendingclasses:[],
	  newClass: { name: '点击选择班级', profile:'' },
	  classOptions: ['高三1班', '高三2班','高三3班','高三4班','高二1班','高二2班','高二3班','高二4班','高一1班','高一2班','高一3班','高一4班'],
    }
  },
  onLoad() {
	  this.getClass();
  },
  methods: {
	  getClass() {
	    // 假设通过接口获取班级数据
	    uni.request({
	      url: 'http://localhost:8080/api/classes/showClass',
		  method:'POST',
	      success: (res) => {
			  if(res.statusCode == '200'){
				console.log('返回结果',res);
				this.Presentclasses = response.data.classes;
			  }else{
				  console.log('连接showClass端口失败');
			  }
	      },
	    });
	  },
	  updateNewclass(event) {
	    const value = event.detail.value;
	    this.newClass.name = this.classOptions[value];
	  },
	  addStudent() {
	    if (!this.newClass.name || this.newClass.profile === '点击选择班级') {
	      uni.showToast({ title: '请填写完整信息', icon: 'none' });
	      return;
	    }
	    this.Pendingclasses.push({ ...this.newClass });
	    this.newClass = { name: '点击选择班级', profile:'' }; 
	  },
    submitStudents() {
		for(var i = 0;i<this.Pendingclasses.length;i++){
			console.log('这是第',i+1,'个班级的名称：',this.Pendingclasses[i].name);
			console.log('这是第',i+1,'个班级的描述：',this.Pendingclasses[i].profile);
			uni.request({
				url:'http://localhost:8080/api/classes/addClass',
				method:'POST',
				header:{
					'Content-Type':'application/json'
				},
				data: {
					name:this.Pendingclasses[i].name,
					profile:this.Pendingclasses[i].profile,
				},
				success:(response) =>{
					console.log('发送成功',response.data);
					console.log('message:',response.data.message);
					if(response.data.message){
						this.Pendingclasses = [],
						uni.showToast({
							title:`提交失败: ${response.data.message}`,
							icon:'error',
						});
					}else{
						this.Pendingclasses = [],
						uni.showToast({
							title:('提交成功'),
							icon:'success',
						})
					}
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
			title:'班级添加完成'
		}),
		uni.reLaunch({
			url:'/pages/login/login'
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
  align-items: center;
  margin: 10rpx 0;
}
.show{
	flex: 1;
	padding: 15rpx;
	border: 1px solid #ccc;
	font-size: 30rpx;
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
