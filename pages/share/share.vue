<template>
	<view class="container">
		<uni-section
		type="line" style="margin-bottom: 3px;">
					<view class="box-bg">
						<uni-nav-bar background-color="#1CB1F6" color="white" left-icon="back"  title="分享这一刻" @clickLeft="back"  />
					</view>
		</uni-section>
	</view>
	<view class="content">
		<view class="container">
			<!-- 输入框 -->
			<textarea placeholder="想说什么就说什么叭- -" @blur="inputBlur" :focus="inputFocus" :auto-height="true"
				:show-confirm-bar="false" maxlength="1500" v-model="form.content" class="post-txt"></textarea>

			<!-- 上传图片or视频 -->
			<view class="img-list">
				<view v-for="(item,index) in form.imageList" :key='index' class="img-list-box">
					<image v-if="!form.video" :src="item" class="img-item" @tap="imgTypeSelect(item)"></image>
					<video v-else :src="item" @longpress="videoTypeSelect(item)"></video>
				</view>
				<view v-if="form.imageList.length < 9 && !form.video" class="icon-camera" @tap="selectType">
					<uni-icons type="camera-filled" size="27" color=#D3D4D6></uni-icons>
				</view>
			</view>

			<!-- 选择位置 -->
			<view @click="chooseLocation" class="choose-location">
				<u-icon name="map" size="30rpx"></u-icon>
				<text class="txt">{{ form.address || '开启定位' }}</text>
			</view>
		</view>
		<!-- 选择板块 -->

		<!-- 底部确定按钮 -->
		<view @click="clickCreate" class="yue-base-button">
			<view>确定发布~</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				// 默认输入框获得焦点
				inputFocus: true,
				form: {
					content: '',
					address: '',
					imageList: [],
					video: '',
				},	
				picture:'',
				content:'',
			}
		},

		methods: {
			// 选择媒体类型
			selectType() {
				let that = this
				let itemL = that.form.imageList.length!=0 ? !that.form.imageList.video ? ['拍照', '从相册选择照片']: '' : ['拍照', '从相册选择照片', '从相册选择视频']
				uni.showActionSheet({
					itemList: itemL,
					success: function(res) {
						if (res.tapIndex == 0) {
							uni.chooseImage({
								sourceType: ['camera'], // 拍照选择
								success: function(res) {
									that.form.imageList.push(res.tempFilePaths)
								}
							});
						}
						if (res.tapIndex == 1) {
							uni.chooseImage({
								count: 9 - that.form.imageList.length,
								sourceType: ['album'], //从相册选择
								success: function(res) {
									res.tempFilePaths.forEach(path => {
										that.form.imageList.push(path);
										// 发给oss 待写
									})
								}
							});
						}
						if (res.tapIndex == 2) {
							uni.chooseVideo({
								sourceType: ['album'], // 从相册选择视频
								success: function(res) {
									if (res.size > 20971520) {
										uni.showToast({
											title: "视频文件过大",
											duration: 2000
										});
										return;
									}
									that.form.video = true;
									that.form.imageList.push(res.tempFilePath)
								}
							});
						}
					}
				});
			},

			// 图片状态选择
			imgTypeSelect(item) {
				let that = this
				uni.showActionSheet({
					itemList: ['预览', '删除'],
					success: function(res) {
						if (res.tapIndex == 0) {
							uni.previewImage({
								current: item,
								urls: that.form.imageList
							})
						}
						if (res.tapIndex == 1) {
							let index = that.form.imageList.findIndex(url => url === item);
							if (index !== -1) {
								that.form.imageList.splice(index, 1);
							}
						}
					}
				});
			},
			
			// 视频状态选择
			videoTypeSelect(){
				uni.showActionSheet({
					itemList: ['删除'],
					success: function(res) {
						if (res.tapIndex == 0) {
							let index = that.form.imageList.findIndex(url => url === item);
							if (index !== -1) {
								that.form.imageList.splice(index, 1);
							}
						}
					}
				});
			},

			// 文字内容
			inputBlur(event) {
				this.inputCursor = event.detail.cursor;
				this.inputFocus = false;
			},

			// 位置选择
			chooseLocation() {
				let that = this;
				uni.chooseLocation({
					success: function(res) {
						that.form.address = res.name;
					}
				});
			},

			// 发布
			clickCreate() {
				console.log(this.form);
				console.log(this.form.imageList)
				console.log(this.form.content)
				// 提交代码，暂时封存
				// uni.request({
				// 	url:'http://localhost:8080/api/posts/addPost',
				// 	method:'POST',
				// 	data:{
				// 		picture:this.picture,
				// 		content:this.content,
				// 	},
				// 	success(res) {
				// 		console.log('看看都有什么返回:',res.data);
				// 		console.log(res.data.message);
				// 		uni.showToast({
				// 			title:res.data.message
				// 		})
				// 	}
				// })
			},
			
			back(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
		}
	}
</script>


<style lang="scss" scoped>
	.content {
		height: 100vh;
		background-color: #FFFFFF;
		border-radius: 30upx 30upx 0upx 0upx;
	}

	.container {
		// padding: 20rpx 40rpx;
		overflow: hidden;
	}

	.post-txt {
		width: 100%;
		min-height: 300rpx;
		line-height: 1rpx;
	}

	/* 选择位置 */
	.choose-location {
		display: inline-flex;
		align-items: center;
		background-color: #eee;
		font-size: 28rpx;
		border-radius: 100rpx;
		padding: 10rpx 20rpx;
		margin-left: 5rpx;
		line-height: 1;
		color: #616161;

		.txt {
			margin-left: 10rpx;
		}
	}

	.yue-base-button {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 0;
		width: 100%;
		padding: 40rpx 0;
		z-index: 3;
	}

	.yue-base-button view {
		width: 560rpx;
		text-align: center;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 96rpx;
		font-size: 32rpx;
		font-weight: 400;
		color: #FFFFFF;
		background: #1CB1F6;
	}

	// 相机icon
	.icon-camera {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 210rpx;
		height: 210rpx;
		border-radius: 6rpx;
		margin: 5rpx 0rpx 0rpx 5rpx;
		background-color: #f4f5f7;
	}

	// 媒体列表
	.img-list {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
	}

	.img-list-box {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.img-item {
		width: 210rpx;
		height: 210rpx;
		margin: 5rpx;
		border-radius: 6rpx
	}
</style>