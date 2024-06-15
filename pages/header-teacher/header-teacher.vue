<template>
  <view class="container">
	  <!-- 顶部栏 -->
	  <uni-section
	  type="line" style="margin-bottom: 3px;">
	  			<view class="box-bg">
	  				<uni-nav-bar background-color="#1CB1F6" color="white" left-icon="back" right-icon="redo" title="班主任管理界面" @clickLeft="back"/>
	  			</view>
	  </uni-section>
	  
    <view class="header">
      <text class="title">请班主任添加学生</text>
    </view>
    <view class="content">

      <view class="input-group">
        <input type="text" v-model="className" placeholder="输入学生名称" />
		<input type="text" v-model="Sex" placeholder="输入学生性别" />
        <button @click="addClass">增加学生</button>
      </view>
      <view class="class-list">
        <view v-for="(item, index) in classes" :key="index" class="class-item">
          <text>{{ item.name }}</text>
		  <text>{{ item.sex }}</text>
          <button @click="removeClass(index)">删除</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	
function getCookie(c_name){
	if (document.cookie.length>0){
		var c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1;
			var c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1){ 
				c_end=document.cookie.length;
			}

			return unescape(document.cookie.substring(c_start,c_end));
		}
	 }
	return "";
}
var uname= getCookie('name');

export default {
  data() {
    return {
      className: '',
	  Sex:'',
      classes: [],
	  profile:[],
    }
  },
  onLoad() {
  	console.log(this.uname);
  },
  methods: {
    addClass() {
		console.log(uname);
		if(this.className.trim() && this.Sex.trim()){
			// const formData = {
			// 		  name : this.className.trim(),
			// 		  sex : this.Sex.trim(),
			// 		  master : 	uname,
			// };
			// this.classes.push(formData);
			// this.className = '';
			// this.Sex = '';
			// console.log(this.classes)
			// console.log(formData)
			uni.request({   
			        url: 'http://localhost:8080/api/students/addStudent', // 替换为你的实际 API 端点
			        method: 'POST',
						header: {
							'Content-Type': 'application/json'
						},
			        data: {
							name : this.className,
							sex : this.Sex,
							master : 4,
						  },
			        success: (response) => {
			          console.log('成功:', response.data);
						// this.classes.push(formData);
						// this.className = '';
						// this.Sex = '';
			          uni.showToast({
			            title: '注册成功',
			            icon: 'success'
			          });
			          // 处理成功的响应
			        },
			        fail: (error) => {
			          console.error('错误:', error);
			          uni.showToast({
			            title: '注册失败',
			            icon: 'none'
			          });
			          // 处理错误的响应
			        }
			      });
		} else{
			alert('请输入班级名和性别！');
		}

    },
    removeClass(index) {
      this.classes.splice(index, 1);
    },
	submitData() {
	      axios.post('/api/resource', this.postData)
	      .then(response => {
	        console.log(response.data);
	      })
	      .catch(error => {
	        console.error(error);
	      });
	    },
	back(){
		uni.reLaunch({
			url:'/pages/register/register'
		})
	}
	
  }
}
</script>

<style>
.container {
  padding: 20px;
}
.header {
  text-align: center;
  margin-bottom: 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
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
</style>
