<template>
	<el-upload ref="uploadInput"
			   name="file"
			   class="myBreakpointsUpload"
			   action=""
			   :accept="accept"
			   :before-upload="beforeUpload"
			   :http-request="upload"
			   :multiple="multiple"
			   :disabled="uploadDisabled"
			   :limit="fileNumber"
			   :on-exceed="onExceed"
			   drag>
		<i class="el-icon-upload"></i>
		<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		<div class="el-upload__tip" slot="tip" v-show="tips">{{ tips }}</div>
		<div class="myUploadTips" v-show="myUploadTips">{{ myUploadTips }}</div>
		<div v-show="uploading" class="progress">
			<el-progress type="circle"
						 :width="progressWidth"
						 :percentage="progress"
						 :status="uploadStatus">
			</el-progress>
		</div>
	</el-upload>
</template>

<script>
	import SparkMD5 from 'spark-md5';
	export default {
		name: "myBreakpointsUpload",
		model: {
			prop: 'value',
			event: 'myChange'
		},
		props: {
			// 断点续传的url
			url: {
				type: String,
				default: ''
			},
			// 直接上传的url
			plainUrl: {
				type: String,
				default: ''
			},
			// 文件多大以下直接上传
			plainUploadSize: {
				type: Number,
				default: 5242880
			},
			// 初始值
			value: {

			},
			// 双向绑定所需的字段
			valueKey: {
				type: String,
				default: 'id'
			},
			// 上传提示文字
			tips: {
				type: String,
				default: ''
			},
			// 进度条宽度
			progressWidth: {
				type: Number,
				default: 100
			},
			// 是否可选取多个文件
			multiple: {
				type: Boolean,
				default: false
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
				default: ''
			},
			// 文件类型
			fileType: {
				type: String,
				default: ''
			},
			// 不符合要求的提示
			acceptTips: {
				type: String,
				default: ''
			},
			// 文件大小限制
			limit: {
				type: Number
			},
			// 可文件数
			fileNumber: {
				type: Number,
				default: 1
			},
			// 文件列表样式
			listType: {
				type: String,
				default: 'text'
			}
		},
		computed: {},
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
				imgUrl: '',
				// 自定义上传提示
				myUploadTips : '',
				// 文件列表
				fileList: []
			};
		},
		components: {},
		watch: {},
		methods: {
			/**
			 * 拆分文件并返回MD5
			 *
			 * @param: {file}file 文件
			 * @param: {function}onSliced 文件
			 * @param: {function}onFinished 文件
			 * @return:
			 * @auther: 陈宇驰
			 * @date: 28/6/19 下午5:06
			 */
			sliceFile (file, onSliced, onFinished) {
				var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
					chunkSize = 2097152,// 每块大小
					chunks = Math.ceil(file.size / chunkSize),// 块数
					currentChunk = 0,// 当前块
					spark = new SparkMD5.ArrayBuffer(),
					fileChunks = [],// 装文件块的数组
					fileReader = new FileReader();

				// 文件块加载事件
				fileReader.onload = function (e) {
					spark.append(e.target.result);// 拼接md5
					currentChunk++;// 下一块
					if (currentChunk < chunks) {// 没切完
						loadNext();// 继续切
					} else {// 切完
						var hash = spark.end();
						if (typeof onFinished == 'function') {// 有配回调
							onFinished(hash, fileChunks, chunks);// 全部切完回调（md5, 所有文件块，总块数）
						}
					}
				};

				// 加载失败
				fileReader.onerror = function () {
					console.warn('oops, something went wrong.');
				};

				// 切块
				function loadNext() {
					// 切的开始位置，结束位置
					var start = currentChunk * chunkSize,
						end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
					var chunk = blobSlice.call(file, start, end);// 切出来的文件块
					fileChunks.push(chunk);// 把文件块加到数组中
					if (typeof onSliced == 'function') {
						onSliced(chunk, currentChunk, chunks);//切块回调（所切文件块，当前第几块，总块数）
					}
					// 加载文件块
					fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
				}
				// 开始切块
				loadNext();
			},
			/**
			 * 修改上传提示
			 *
			 * @param: {String}status 状态
			 * @auther: 陈宇驰
			 * @date: 29/8/19 下午6:02
			 */
			changeStatus (status) {
				if (status == 'init') { // 初始化
					this.uploading = false;
					this.progress = 0;
					this.uploadStatus = null;
					this.uploadDisabled = false;
					this.myUploadTips = '';
				} else if (status == 'checking') { // 校验
					this.uploading = true;
					this.uploadStatus = 'warning';
					this.uploadDisabled = true;
					this.myUploadTips = '正在校验MD5...';
				} else if (status == 'uploading') { // 上传中
					this.uploading = true;
					this.progress = 0;
					this.uploadStatus = null;
					this.uploadDisabled = true;
					this.myUploadTips = '正在上传...';
				} else if (status == 'complete') { // 上传完成
					this.uploading = true;
					this.progress = 100;
					this.uploadStatus = 'success';
					this.uploadDisabled = true;
					this.myUploadTips = '上传完成';
				}
			},
			/**
			 * 功能描述
			 *
			 * @param:
			 * @return:
			 * @auther: 陈宇驰
			 * @date: 28/6/19 上午9:38
			 */
			getSize (size) {
				return size > 1024 ? size / 1024 > 1024 ? size / (1024 * 1024) > 1024 ? (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB' : (size / (1024 * 1024)).toFixed(2) + 'MB' : (size / 1024).toFixed(2) + 'KB' : (size).toFixed(2) + 'B';
			},
			/**
			 * 上传
			 *
			 * @param: {Object}options 配置对象
			 * @auther: 陈宇驰
			 * @date: 28/6/19 下午5:26
			 */
			upload (options) {
				const { maxSize, multiUploadSize, getSize, splitUpload, singleUpload } = this;
				const { file, onProgress, onSuccess, onError } = options;
				var size = file.size;
				this.changeStatus('checking');
				// 分割文件（文件，每次切事件，切完事件）
				this.sliceFile(file, (chunk, currentChunk, chunks) => {
					// 修改校验进度
					let progress = (currentChunk + 1) / chunks * 100;
					this.progress = progress.toFixed(2) * 1;
				}, (md5, fileChunks, chunks) => {
					// 文件全部切完
					this.changeStatus('uploading');
					// 检查该文件是否已存在的请求参数
					let param = new FormData();
					for (var x in this.params) {
						param.append(x, this.params[x]);
					}
					param.append("businessId", "");
					param.append("fileMD5", md5);
					param.append("fileName", file.name);
					// 检查该文件是否已存在的请求头配置
					let config = {
						headers: { "Content-Type": "multipart/form-data" },
					};
					// 检查该文件是否已存在
					this.$http.post('file/user/quickUploadFile', param, config).then(res => {
						if (res.data.data.exists) { // 已存在则秒传
							this.changeStatus('complete');
							this.$emit('uploadSuccess', 'quickUpload', res);// 删除成功回调
							this.$emit('myChange', res.data.data.file[this.valueKey]);// 改变事件，返回需要的值
						} else { // 断点续传
							if (size > this.plainUploadSize) { // 大于5兆断点续传
								let currentChunk = 1;
								var uploadChunk = (fileChunk) => {
									let param = new FormData();
									for (var x in this.params) {
										param.append(x, this.params[x]);
									}
									param.append("fileMD5", md5);
									param.append("chunks", chunks);
									param.append("fileName", file.name);
									param.append("currentChunk", currentChunk);
									param.append("transcode", true);
									param.append("file", fileChunk);
									let config = {
										headers: { "Content-Type": "multipart/form-data" },
									};
									this.$http.post('file/user/breakPointUpload', param, config).then(res => {
										let progress = (currentChunk + 1) / chunks * 100;
										this.progress = progress.toFixed(2) * 1;
										currentChunk++;
										if (currentChunk <= chunks) {
											uploadChunk(fileChunks[currentChunk - 1]);
										} else {
											this.changeStatus('complete');
											this.$emit('uploadSuccess', 'breakPointUpload', res);
											this.$emit('myChange', res.data.data.file[this.valueKey]);
										}

									});
								}
								uploadChunk(fileChunks[currentChunk - 1]);
							} else { // 普通上传
								let param = new FormData();
								for (var x in this.params) {
									param.append(x, this.params[x]);
								}
								param.append("file", file);
								let config = {
									headers: { "Content-Type": "multipart/form-data" },
									onUploadProgress: e => {
										var completeProgress = ((e.loaded / e.total * 100) | 0);
										this.progress = completeProgress.toFixed(2) * 1;
										if (completeProgress == 100) { // 上传完毕
											this.changeStatus('complete');
										}
									}
								};
								this.$http.post('file/user/uploadFile', param, config).then(res => {
									this.$emit('uploadSuccess', 'commonUpload', res);
									this.$emit('myChange', res.data.data.file[this.valueKey]);
								}).catch(e => {
									console.log(e);
								});
							}
						}
					});
				});
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
				const isMatchType = !this.fileType || this.fileType.indexOf(file.type);
				// 是否符合大小要求
				const isFitSize = !this.limit || file.size < this.limit;
				if (!isMatchType) {// 验证是否匹配文件类型
					this.$message.error(this.acceptTips);
				}
				if (!isFitSize) {// 文件大小不符合规范
					this.$message.error('上传文件不能超过 ' + this.getSize(this.limit) + '!');
				}
				return isMatchType && isFitSize;
			},
			/**
			 * 功能描述
			 *
			 * @param:
			 * @return:
			 * @auther: 陈宇驰
			 * @date: 18/7/19 上午10:20
			 */
			onExceed (files, fileList) {
				console.log('onExceed');	
			},
			/**
			 * 初始化上传组件
			 *
			 * @auther: 陈宇驰
			 * @date: 2/7/19 下午6:38
			 */
			init () {
				this.changeStatus('init');
				this.imgLoading = false;
				this.imgUrl = null;
				this.$refs.uploadInput.clearFiles();
				this.$emit('myChange', null);
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>
	.myBreakpointsUpload{
		width: 360px;
	}
</style>