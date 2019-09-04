<template>
	<el-upload
			v-if="!value"
			:action="url"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:before-remove="beforeRemove"
			:multiple="multiple"
			:http-request="upload"
			:data="params"
			:limit="limit"
			:on-exceed="handleExceed"
			:file-list="fileList">
		<el-button size="small" type="primary">点击上传</el-button>
		<div v-if="uploadTips" slot="tip" class="el-upload__tip">{{uploadTips}}</div>
		<el-progress v-if="uploading" :percentage="progress" :status="uploadStatus"></el-progress>
	</el-upload>
	<div v-else>
		<el-link icon="el-icon-paperclip"
				 :underline="false"
				 target="_blank"
				 :href="_ROOT_PATH + _file_prefix + '?attachmentId=' + value">{{filename}}</el-link>
		<el-button size="mini" @click="clear" icon="el-icon-delete" circle></el-button>
	</div>
</template>

<script>
	export default {
		name: "myFileUploader",
		model: {
			prop: 'value',
			event: 'myChange'
		},
		props: {
			value: {

			},
			url: {
				type: String,
				default: 'file/user/uploadFile'
			},
			params: {
				type: Object,
				default () {
					return {};
				}
			},
			multiple: {
				type: Boolean,
				default: false
			},
			limit: {
				type: Number,
				default: 1
			},
			uploadTips: {
				type: String,
				default: ''
			},
			filename: {
				type: String,
				default: ''
			}
		},
		computed: {},
		data() {
			return {
				fileList: [],
				uploading: false,
				progress: 0,
				uploadStatus: null
			};
		},
		components: {},
		watch: {},
		methods: {
			upload (options) {
				const { maxSize, multiUploadSize, getSize, splitUpload, singleUpload } = this;
				const { file, onProgress, onSuccess, onError } = options;
				// 上传中
				this.uploading = true;
				// 上传参数
				let param = new FormData();
				for (let x in this.params) {
					param.append(x, this.params[x]);
				}
				param.append("file", file);
				// 请求配置
				let config = {
					headers: { "Content-Type": "multipart/form-data" },
					onUploadProgress: e => {
						// 上传进度
						let completeProgress = ((e.loaded / e.total * 100) | 0);
						this.progress = completeProgress;
						if (completeProgress == 100) { // 上传完毕
							this.uploadStatus = 'success';
						}
					}
				};
				this.$http.post(this.url, param, config).then(res => {
					let file = res.data.data.file;
					console.log(file);
					this.$emit('myChange', file.id);
					this.init();
					this.fileList.push({
						name: file.name,
						url: file.downloadUrl
					})
				}).catch(e => {
					this.init();
					this.uploadStatus = 'exception';
				});
			},
			init () {
				this.fileList = [];
				this.uploading = false;
				this.progress = 0;
				this.uploadStatus = null;
			},
			handlePreview () {

			},
			handleRemove () {
				this.$emit('myChange', null);
			},
			beforeRemove () {

			},
			handleExceed () {

			},
			clear () {

			}
		},
		mounted() {
			// 监听弹框关闭事件
			this.$parent.$parent.$parent.$on('closed', () => {
				this.init();
				this.$emit('myChange', null);
			});
		}
	}
</script>

<style lang="less" scoped>

</style>