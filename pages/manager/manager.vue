<template>
  <view class="container">
	  <!-- 顶部栏 -->
	<uni-section  
	type="line" style="margin-bottom: 3px;">
				<view class="box-bg">
					<uni-nav-bar background-color="#1CB1F6" color="white" left-icon="back" right-icon="redo" title="欢迎来到班级圈" @clickLeft="back" @clickRight="share" />
				</view>
	</uni-section>
	
    <view class="header">
      <text class="title">管理员界面</text>
    </view>
    <view class="content">

      <view class="input-group">
        <input type="text" v-model="className" placeholder="输入班级名称" />
        <button @click="addClass">增加班级</button>
      </view>
      <view class="class-list">
        <view v-for="(item, index) in classes" :key="index" class="class-item">
          <text>{{ item }}</text>
          <button @click="removeClass(index)">删除</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      className: '',
      classes: [],
	  profile:[]
    }
  },
  methods: {
    addClass() {
	  uni.request({   
	          url: 'http://localhost:8080/api/classes/addClass', // 替换为你的实际 API 端点
	          method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
	          data: {
				  school:1,
				  name: this.className.trim(),
			  },
	          success: (response) => {
	            console.log('成功:', response.data);
				this.classes.push(this.className.trim());
				this.className = '';
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
    },
    removeClass(index) {
      this.classes.splice(index, 1);
    },
	// 无用代码
	// submitData() {
	//       axios.post('/api/resource', this.postData)
	//       .then(response => {
	//         console.log(response.data);
	//       })
	//       .catch(error => {
	//         console.error(error);
	//       });
	//     }
	
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
