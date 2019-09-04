<template>
	<editor v-model='myValue' :init='init' :disabled="disabled"></editor>
</template>

<script>
	import tinymce from 'tinymce/tinymce'
	import editor from '@tinymce/tinymce-vue'
	import 'tinymce/themes/silver/theme.min'
	import 'tinymce/plugins/image'
	import 'tinymce/plugins/imagetools'
	import 'tinymce/plugins/media'
	import 'tinymce/plugins/hr'
	import 'tinymce/plugins/link'
	import 'tinymce/plugins/table'
	import 'tinymce/plugins/lists'
	import 'tinymce/plugins/contextmenu'
	import 'tinymce/plugins/wordcount'
	import 'tinymce/plugins/colorpicker'
	import 'tinymce/plugins/textcolor'
	import 'tinymce/plugins/preview'

	export default {
		name: "myEditor",
		model: {
			prop: 'value',
			event: 'myChange'
		},
		props: {
			value: {
				type: String,
				default: ''
			},
			options: {
				type: Object,
				default () {
					return {};
				}
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		computed: {

		},
		data () {
			return {
				myValue: this.value || '',
				init: {
					document_base_url: this._ROOT_PATH_2,
					language_url: 'tinymce/langs/zh_CN.js',
					language: 'zh_CN',
					skin_url: 'tinymce/skins/ui/oxide',
					height: 500,
					plugins: 'lists link hr image textcolor table media imagetools',
					toolbar: 'bold italic underline strikethrough removeformat |' +
					' alignleft aligncenter alignright alignjustify |' +
					' forecolor backcolor |' +
					' formatselect | fontselect | fontsizeselect |' +
					' outdent indent |' +
					' undo redo |' +
					' subscript superscript |' +
					' hr bullist numlist |' +
					' link unlink |' +
					' image quickimage media |' +
					' table tablemergecells tablesplitcells tableinsertrowbefore tableinsertrowafter |' +
					' preview',
					image_advtab: true,
					automatic_uploads: true,
					file_picker_types: 'image',
					branding: false,
					file_picker_callback: function (cb, value, meta) {
						let input = document.createElement('input');
						input.setAttribute('type', 'file');
						input.setAttribute('accept', 'image/*');
						input.onchange = function () {
							let file = this.files[0];
							let reader = new FileReader();
							reader.onload = function () {
								var id = 'blobid' + (new Date()).getTime();
								var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
								var base64 = reader.result.split(',')[1];
								var blobInfo = blobCache.create(id, file, base64);
								blobCache.add(blobInfo);
								cb(blobInfo.blobUri(), { title: file.name });
							};
							reader.readAsDataURL(file);
						};
						input.click();
					}
					// images_upload_handler: (blobInfo, success, failure) => {
					// }
				}
			};
		},
		components: {
			editor
		},
		watch: {
			/**
			 * 监听表单值变化
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:42
			 */
			value (val) {
				this.myValue = val;
			},
			/**
			 * 监听表单值变化
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:42
			 */
			myValue (val) {
				this.$emit('myChange', val);
			}
		},
		methods: {},
		mounted () {
			tinymce.init({})
		}
	}
</script>

<style lang="less" scoped>

</style>