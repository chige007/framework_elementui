<template>
	<div class="page">
		<div class="title">消息模板列表</div>
		<my-table url="message/manager/listTemplate"
				  add-url="message/manager/saveOrUpdateTemplate"
				  delete-url="message/manager/deleteTemplate"
				  search-label-width="90px"
				  opt-col-width="180px"
				  dialog-width="600px"
				  dialog-title="消息模板"
				  dialog-top="5vh"
				  dialog-label-width="100px"
				  dialog-form-label-position="right"
				  :dialog-data="dialogData"
				  :dialog-form-rules="dialogFormRules">
			<template slot="column">
				<el-table-column prop="code"
								 label="code"
								 sortable="custom"
								 searchable>
				</el-table-column>
				<el-table-column prop="type"
								 label="类型"
								 sortable="custom"
								 :formatter="typeFormatter"
								 searchable>
				</el-table-column>
				<el-table-column prop="title"
								 label="标题"
								 sortable="custom"
								 searchable>
				</el-table-column>
			</template>
			<template slot="dialog">
				<el-form-item label="类型：" prop="type">
					<el-radio-group v-model="dialogData.type">
						<el-radio label="SMS">短信</el-radio>
						<el-radio label="EMAIL">邮件</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="code：" prop="code">
					<el-input v-model="dialogData.code" placeholder="请填写"></el-input>
				</el-form-item>
				<el-form-item v-if="dialogData.type == 'EMAIL'" label="标题：" prop="title">
					<el-input v-model="dialogData.title" placeholder="请填写"></el-input>
				</el-form-item>
				<el-form-item label="内容：" prop="content">
					<el-input type="textarea"
							  placeholder="请填写"
							  :rows="10"
							  v-model="dialogData.content">
					</el-input>
				</el-form-item>
				<el-form-item label="描述：" prop="description">
					<el-input type="textarea"
							  placeholder="请填写"
							  :rows="3"
							  v-model="dialogData.description">
					</el-input>
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
				// 新增/编辑表单绑定数据对象
				dialogData: {
					type: 'SMS',
					code: null,
					title: null,
					content: null,
					description: null
				},
				// 新增/编辑表单验证配置
				dialogFormRules: {
					type: [
						{ required: true, message: '请选择模板类型', trigger: 'blur' }
					],
					code: [
						{ required: true, message: '请填写模板code', trigger: 'blur' }
					],
					title: [
						{ required: true, message: '请填写模板标题', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请填写模板名称', trigger: 'blur' }
					],
					content: [
						{ required: true, message: '请填写模板详情', trigger: 'blur' }
					]
				}
			};
		},
		watch: {},
		methods: {
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
		}
	}
</script>

<style lang="less" scoped>

</style>