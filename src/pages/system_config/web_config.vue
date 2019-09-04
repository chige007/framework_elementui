<template>
	<div class="page">
		<el-page-header v-if="hasBack" @back="_prevPage" content="网站信息配置列表"></el-page-header>
		<div v-else class="title">网站信息配置列表</div>
		<my-table url="websiteSetting/open/info"
				  add-url="websiteSetting/manager/saveOrUpdate"
				  delete-url="websiteSetting/manager/delete"
				  :check-btn="false"
				  search-label-width="90px"
				  opt-col-width="180px"
				  dialog-width="450px"
				  dialog-title="网站信息配置"
				  dialog-label-width="100px"
				  :dialog-data="dialogData"
				  :dialog-form-rules="dialogFormRules">
			<template slot="column">
				<el-table-column prop="code" label="配置标识" sortable="custom" searchable></el-table-column>
				<el-table-column prop="value" label="配置信息"></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
			</template>
			<template slot="dialog">
				<el-form-item label="配置标识：" prop="code">
					<el-input v-model="dialogData.code" placeholder="请填写"></el-input>
				</el-form-item>
				<el-form-item label="配置信息：" prop="value">
					<el-input type="textarea" :rows="3" v-model="dialogData.value" placeholder="请填写"></el-input>
				</el-form-item>
				<el-form-item label="备　注：" prop="remark">
					<el-input type="textarea" :rows="3" v-model="dialogData.remark" placeholder="请填写"></el-input>
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
					code: null,
					value: null,
					remark: null
				},
				// 新增/编辑表单验证配置
				dialogFormRules: {
					code: [
						{ required: true, message: '请输入代码标识', trigger: 'blur' }
					],
					value: [
						{ required: true, message: '请输入配置信息', trigger: 'blur' }
					]
				}
			};
		},
		watch: {},
		methods: {

		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>

</style>