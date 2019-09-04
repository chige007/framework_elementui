<template>
	<div class="page">
		<div class="title">模板列表</div>
		<my-table url="template/manage/findTemplateLists"
				  add-url="template/manage/uploadTemplate"
				  delete-url="template/manager/delete"
				  search-label-width="90px"
				  opt-col-width="180px"
				  dialog-width="450px"
				  dialog-title="模板"
				  dialog-label-width="100px"
				  dialog-form-label-position="right"
				  :dialog-data="dialogData"
				  :dialog-form-rules="dialogFormRules">
			<template slot="column">
				<el-table-column prop="name" label="模板名称" sortable="custom" searchable></el-table-column>
				<el-table-column prop="code" label="唯一编号" sortable="custom" searchable></el-table-column>
				<el-table-column prop="businessTypeName"
								 label="类型"
								 sortable="custom"
								 searchable
								 search-type="select"
								 name="businessTypeCode"
								 option-dict-code="templateType"
								 option-label="name"
								 option-key="code"></el-table-column>
			</template>
			<template slot="dialog">
				<el-form-item label="模板文件：" prop="attachmentId">
					<my-file-uploader v-model="dialogData.attachmentId"
									  :filename="dialogData.name"
									  :params="{businessType: 'template', businessId: ''}">
					</my-file-uploader>
				</el-form-item>
				<el-form-item label="模板名称：" prop="name">
					<el-input v-model="dialogData.name"></el-input>
				</el-form-item>
				<el-form-item label="唯一编号：" prop="code">
					<el-input v-model="dialogData.code"></el-input>
				</el-form-item>
				<el-form-item label="类  型：" prop="businessTypeCode">
					<el-select v-model="dialogData.businessTypeCode" @change="getTypeName">
						<el-option v-for="x in typeCodeData" :key="x.code" :label="x.name" :value="x.code"></el-option>
					</el-select>
				</el-form-item>
			</template>
		</my-table>
	</div>
</template>

<script>
	export default {
		props: {},
		computed: {},
		data() {
			return {
				typeCodeData: [],
				// 新增/编辑表单绑定数据对象
				dialogData: {
					attachmentId: null,
					name: null,
					code: null,
					businessTypeCode: null,
					businessTypeName: null
				},
				// 新增/编辑表单验证配置
				dialogFormRules: {
					name: [
						{ required: true, message: '请填写模板名称', trigger: 'blur' }
					],
					code: [
						{ required: true, message: '请填写模板唯一标识', trigger: 'blur' }
					],
					businessTypeCode: [
						{ required: true, message: '请选择模板类型', trigger: 'blur' }
					]
				}
			};
		},
		watch: {},
		methods: {
			/**
			 * 类型下拉选择事件
			 *
			 * @param: {String} value 所选值
			 * @auther: 陈宇驰
			 * @date: 28/6/19 下午1:04
			 */
			getTypeName (value) {
				let seletedOption = this.typeCodeData.find(elem => {
					return elem.code == value;
				});
				this.dialogData.businessTypeName = seletedOption['name'];
			},
			/**
			 * 类型列格式化
			 *
			 * @param: row 行数据
			 * @param: column 列配置
			 * @param: cellValue 单元格值
			 * @param: index 行数
			 * @return: {String}
			 * @auther: 陈宇驰
			 * @date: 18/6/19 下午4:56
			 */
			typeFormatter (row, column, cellValue, index) {
				if (cellValue == 'SMS') {
					return '短信';
				} else if (cellValue == 'EMAIL'){
					return '邮件';
				}
			}
		},
		mounted() {
			// 获取文章类型下拉数据
			this._dictToData('templateType', data => {
				this.typeCodeData = data;
			});
		}
	}
</script>

<style lang="less" scoped>

</style>