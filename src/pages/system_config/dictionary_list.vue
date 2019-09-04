<template>
	<div class="page">
		<el-container style="height: 100%;">
			<el-aside width="200px" style="padding-top: 20px;">
				<el-tree :data="treeData"
						 :props="defaultProps"
						 :expand-on-click-node="false"
						 :load="treeLoad"
						 :current-node-key="'-1'"
						 :default-expanded-keys="['-1']"
						 ref="tree"
						 node-key="id"
						 render-after-expand
						 highlight-current
						 lazy
						 @node-click="handleNodeClick"></el-tree>
			</el-aside>
			<el-main>
				<my-table ref="list"
						  url="dict/findByParams"
						  add-url="dict/saveOrUpdate"
						  delete-url="dict/delete"
						  search-label-width="90px"
						  opt-col-width="180px"
						  dialog-width="450px"
						  dialog-title="字典项详情"
						  dialog-label-width="100px"
						  :filter="{parentCode: ''}"
						  :batch-delete-btn="false"
						  :check-btn="false"
						  :checkbox="false"m
						  :dialog-data="dialogData"
						  :dialog-form-rules="dialogFormRules"
						  @onDelete="onDelete"
						  @onEdit="onEdit"
						  @onAdd="onAdd" 
						  @onChangeList="onChangeList">
					<template slot="column">
						<el-table-column prop="code" label="类型代码" sortable="custom" searchable></el-table-column>
						<el-table-column prop="name" label="类型名称" sortable="custom" searchable></el-table-column>
						<el-table-column prop="description" label="描述" sortable="custom" searchable></el-table-column>
					</template>
					<template slot="dialog">
						<input type="hidden" value="articleType" v-model="dialogData.parentCode">
						<el-form-item label="类型代码：" prop="code">
							<el-input v-model="dialogData.code"></el-input>
						</el-form-item>
						<el-form-item label="类型名称：" prop="name">
							<el-input v-model="dialogData.name"></el-input>
						</el-form-item>
						<el-form-item label="描述：" prop="description">
							<el-input v-model="dialogData.description" type="textarea" :rows="3"></el-input>
						</el-form-item>
					</template>
				</my-table>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: "list",
		props: {},
		computed: {},
		data() {
			return {
				// 字典树初始节点数据
				treeData: [{
					id: '-1',
					code: '',
					name: '全部',
					children: [

					]
				}],
				// 列表过滤条件
				listFilter: {
					parentCode: ''
				},
				// 配置选项
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				// 新增/编辑表单绑定数据对象
				dialogData: {
					parentCode: '',
					code: null,
					name: null,
					description: null
				},
				// 新增/编辑表单验证配置
				dialogFormRules: {
					code: [
						{ required: true, message: '请输入类型代码', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入类型名称', trigger: 'blur' }
					]
				}
			};
		},
		components: {},
		watch: {},
		methods: {
			/**
			 * 树节点点击事件
			 *
			 * @param: {Object}data 树节点对象
			 * @auther: 陈宇驰
			 * @date: 27/6/19 下午3:12
			 */
			handleNodeClick (data) {
				this.dialogData.parentCode = data.code;
				this.$refs.list.setFilter({
					parentCode: data.code
				}).getList();
			},
			/**
			 * 加载字典树
			 *
			 * @param: {Object}node 节点对象
			 * @param: {Function}resolve 异步回调函数
			 * @auther: 陈宇驰
			 * @date: 27/6/19 下午3:12
			 */
			treeLoad (node, resolve) {
				if (node.level === 0) {
					return resolve(node.data);
				} else {
					this.$util.request(this, 'dict/findByParams', {
						filter: {
							parentCode: node.data.code
						}
					}, res => {
						resolve(res.data.data.rows);
					}, null, false);
				}
			},
			/**
			 * 新增回调
			 *
			 * @param: {Object}data 节点数据
			 * @auther: 陈宇驰
			 * @date: 27/6/19 下午3:59
			 */
			onAdd (data = {}) {
				var {id, code, name} = data;
				var parentNode = this.$refs.tree.getCurrentNode();
				this.$refs.tree.append({
					id,
					code,
					name
				}, parentNode);
			},
			/**
			 * 删除回调
			 *
			 * @param: {String}id 节点id
			 * @auther: 陈宇驰
			 * @date: 27/6/19 下午3:59
			 */
			onDelete (id) {
				if (!id) { // 注释
					return;
				}
				var node = this.$refs.tree.getNode(id);
				if (node) { // 找到熟节点
					this.$refs.tree.remove(node);
				}
			},
			/**
			 * 编辑回调
			 *
			 * @param: {Object}data 节点数据
			 * @auther: 陈宇驰
			 * @date: 27/6/19 下午3:59
			 */
			onEdit (data = {}) {
				var {id, code, name} = data;
				var node = this.$refs.tree.getNode(id);
				if (node) { // 找到熟节点
					node.setData({
						id,
						code,
						name
					})
				}
			},
			/**
			 * 列表改变事件
			 *
			 * @param: {Object}data 节点数据
			 * @auther: 陈宇驰
			 * @date: 27/6/19 下午3:59
			 */
			onChangeList () {
				var parentNode = this.$refs.tree.getCurrentNode();
				var parentCode = parentNode.code;
				var isExists = this.$store.getters.findDict(parentCode);
				if (isExists) { // 已存在数据字典缓存
					this.$store.commit('clearDict', {
						dictCode: parentCode
					});
				}
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>

</style>