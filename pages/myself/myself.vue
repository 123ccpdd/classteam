<template>
  <view class="container">
	<uni-section  
	type="line" style="margin-bottom: 3px;">
				<view class="box-bg">
					<uni-nav-bar background-color="#1CB1F6" color="white" left-icon="back" right-icon="redo" title="欢迎来到班级圈" @clickLeft="back" @clickRight="share" />
				</view>
	</uni-section>

    <view class="content">
      <view class="item">
        <text class="label">用户名</text>
        <text class="value">用户</text>
        <button class="edit-btn">申请教师权限</button>
      </view>

      <view class="item">
        <text class="label">昵称</text>
		<text class="value">XXX</text>
        <button class="edit-btn">修改昵称</button>
      </view>
	  
	  <view class="item">
	    <text class="label">班级</text>
	    <text class="value">六（1）班</text>
	    <button class="edit-btn">修改班级</button>
	  </view>

      <view class="item">
		<view class="avatar-box">
			<text class="label">头像</text>
			<img src="../../static/logo.png" alt="" class="avatar" />
		</view>
        <button class="edit-btn">修改头像</button>
      </view>

      <view class="item">
        <text class="label">手机号</text>
        <text class="value">未绑定手机号</text>
        <button class="edit-btn">绑定手机号</button>
      </view>

      <view class="item">
        <text class="label">密码</text>
        <text class="value">********</text>
        <button class="reset-btn">重置密码</button>
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
    };
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
.container {
}
.header {
  display: flex;
  align-items: center;
}
.logo {
  width: 50rpx;
  height: 50rpx;
}
.title {
  font-size: 32rpx;
  margin-left: 10rpx;
}
.content {
  margin-top: 20rpx;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.label {
  flex: 1;
  color: #333;
  padding-left: 10rpx;
}
.value {
  flex: 2;
  color: #666;
}
.edit-btn,
.unbind-btn,
.reset-btn {
  color: #1e90ff;
  margin-left: 10rpx;
  font-size: 24rpx;
  padding: 10rpx 20rpx; /* 调整按钮内边距 */
}
.avatar-box{
	display: flex;
	flex-direction: column;
	flex: 1;
}
.avatar {
  width: 150rpx;
  height: 150rpx;
  display: flex;
  position: relative;
  left: 100rpx;
}

</style>
