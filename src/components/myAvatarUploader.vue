<template>
	<el-upload ref="uploadInput"
			   class="avatar-uploader"
			   action=""
			   :style="avatarStyles"
			   :show-file-list="false"
			   :http-request="upload"
			   accept="image/*"
			   :disabled="uploadDisabled"
			   :before-upload="beforeUpload">
		<i v-if="!imgUrl && !imgLoading" class="el-icon-plus avatar-uploader-icon"></i>
		<img v-if="imgUrl" :src="_ROOT_PATH + imgUrl" class="avatar" @load="imgLoading = false" @error="_imgLoadFail($event.target)">
		<i v-if="imgLoading" class="el-icon-loading"></i>
		<el-progress v-show="uploading"
					 :width="progressWidth || width * 0.5"
					 type="circle"
					 :percentage="progress"
					 :status="uploadStatus">
		</el-progress>
		<input type="hidden" v-model="imgUrl">
	</el-upload>
</template>

<script>
	export default {
		name: "myAvatarUploader",
		model: {
			prop: 'value',
			event: 'myChange'
		},
		props: {
			// 上传的url
			url: {
				type: String,
				default: ''
			},
			// 初始值
			value: {

			},
			// 宽度
			width: {
				type: Number,
				default: 150
			},
			progressWidth: {
				type: Number
			},
			// 高度
			height: {
				type: Number,
				default: 150
			},
			// 上传参数
			params: {
				type: Object,
				default () {
					return {}
				}
			},
			// 文件要求格式
			accept: {
				type: String,
				default: 'image/'
			},
			// 不符合要求的提示
			acceptTips: {
				type: String,
				default: '只能上传图片格式的文件!'
			},
			// 文件大小限制
			limit: {
				type: Number,
				default: 2097152
			}
		},
		computed: {
			// 上传组件样式
			avatarStyles () {
				return {
					'width': this.width + 'px',
					'height': this.height + 'px'
				}
			}
		},
		data() {
			return {
				// 上传中标识
				uploading: false,
				// 图片加载中标识
				imgLoading: false,
				// 上传进度
				progress: 0,
				// 上传状态
				uploadStatus: null,
				// 上传控件禁用标识
				uploadDisabled: false,
				// 图片路径
				imgUrl: this.value
			};
		},
		components: {},
		watch: {
			// 初始值变化从而加载相应的图片
			value (val, oldVal) {
				if (val) { // 有初始值
					this.imgLoading = true;
					this.imgUrl = val;
				}
			}
		},
		methods: {
			/**
			 * 上传事件
			 *
			 * @param: {Object}options 上传配置参数
			 * @auther: 陈宇驰
			 * @date: 2/7/19 下午6:35
			 */
			upload (options) {
				const { maxSize, multiUploadSize, getSize, splitUpload, singleUpload } = this;
				const { file, onProgress, onSuccess, onError } = options;
				// 上传中
				this.uploading = true;
				// 上传参数
				var param = new FormData();
				for (var x in this.params) {
					param.append(x, this.params[x]);
				}
				param.append("file", file);
				this.uploadDisabled = true;
				// 请求配置
				var config = {
					headers: { "Content-Type": "multipart/form-data" },
					onUploadProgress: e => {
						// 上传进度
						var completeProgress = ((e.loaded / e.total * 100) | 0);
						this.progress = completeProgress;
						if (completeProgress == 100) { // 上传完毕
							this.uploadStatus = 'success';
						}
					}
				};
				this.$http.post(this.url, param, config).then(res => {
					let file = res.data.data.file;
					this.$emit('myChange', file.downloadUrl);
					this.uploading = false;
					this.imgUrl = file.downloadUrl;
					this.imgLoading = true;
					this.uploadDisabled = false;
					this.progress = 0;
					this.uploadStatus = null;
				}).catch(e => {
					this.init();
					this.uploadStatus = 'exception';
				});
			},
			/**
			 * 获取文件大小
			 *
			 * @param: {Number}size 文件字节数
			 * @return: {String}文件大小描述
			 * @auther: 陈宇驰
			 * @date: 2/7/19 下午6:37
			 */
			getSize (size) {
				return size > 1024 ? size / 1024 > 1024 ? size / (1024 * 1024) > 1024 ? (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB' : (size / (1024 * 1024)).toFixed(2) + 'MB' : (size / 1024).toFixed(2) + 'KB' : (size).toFixed(2) + 'B';
			},
			/**
			 * 上传前事件
			 *
			 * @param: {Object}file 文件对象
			 * @return: {Boolean}是否允许上传
			 * @auther: 陈宇驰
			 * @date: 2/7/19 下午6:37
			 */
			beforeUpload (file) {
				// 是否符合格式要求
				const isImage = this.accept.indexOf(file.type);
				// 是否符合大小要求
				const isFitSize = file.size < this.limit;
				if (!isImage) {
					this.$message.error(this.acceptTips);
				}
				if (!isFitSize) {
					this.$message.error('上传头像图片大小不能超过 ' + this.getSize(this.limit) + '!');
				}
				return isImage && isFitSize;
			},
			/**
			 * 初始化上传组件
			 *
			 * @auther: 陈宇驰
			 * @date: 2/7/19 下午6:38
			 */
			init () {
				this.uploading = false;
				this.imgLoading = false;
				this.imgUrl = null;
				this.progress = 0;
				this.uploadStatus = null;
				this.uploadDisabled = false;
				this.$refs.uploadInput.clearFiles();
				this.$emit('myChange', null);
			}
		},
		mounted() {
			// 监听弹框关闭事件
			this.$parent.$parent.$parent.$on('closed', () => {
				this.init();
			});
		}
	}
</script>

<style lang="less">
.avatar-uploader{
	.el-upload{
		width: 100%;
		height: 100%;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		&:hover{
			border-color: #4E69EA;
		}
		.avatar-uploader-icon{
			font-size: 28px;
			color: #888;
			text-align: center;
		}
		.avatar {
			max-width: 100%;
			max-height: 100%;
			display: block;
		}
		.el-icon-loading{
			font-size: 24px;
		}
	}
	.el-progress{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0,0.5);
	}
}
</style>