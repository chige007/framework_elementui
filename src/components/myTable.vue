<template>
	<div class="myTable"
		 v-loading="loading">
		<!--工具栏-->
		<el-row :gutter="8"
				class="myToolbar">
			<!--工具栏按钮组-->
			<el-col :xs="24"
					:sm="16"
					:md="17"
					:lg="18"
					:xl="20">
				<slot name="toolbar"></slot>
				<el-button v-if="addBtn" size="medium" icon="el-icon-plus" type="primary" round @click="add">新增</el-button>
				<el-button-group v-if="toolbar">
					<slot name="pre_toolbar"></slot>
					<!--批量删除按钮-->
					<el-button v-if="batchDeleteBtn"
							   size="medium"
							   icon="el-icon-delete"
							   @click="batchDelete"
							   round>删除
					</el-button>
					<!--/批量删除按钮-->
					<!--刷新按钮-->
					<el-button v-if="refreshBtn"
							   size="medium"
							   icon="el-icon-refresh-right"
							   @click="refresh"
							   round>刷新
					</el-button>
					<!--/刷新按钮-->
					<slot name="sub_toolbar"></slot>
				</el-button-group>
			</el-col>
			<!--/工具栏按钮组-->
			<!--搜索栏-->
			<el-col :xs="24"
					:sm="8"
					:md="7"
					:lg="6"
					:xl="4"
					class="searchWrap">
				<el-popover v-if="searchable && searchbarOpt.length"
							placement="bottom"
							width="400"
							trigger="click">
					<el-button size="small"
							   slot="reference"
							   icon="el-icon-search"
							   round>搜索
					</el-button>
					<!--搜索栏form表单-->
					<el-form ref="form_keyword"
							 class="form_keyword"
							 :model="keyword"
							 :label-width="searchLabelWidth">
						<my-searcher v-for="x in searchbarOpt"
									 :key="x.name"
									 :label="x.label"
									 :name="x.name"
									 :search-type="x.searchType"
									 :option-url="x.optionUrl"
									 :option-data="x.optionData"
									 :option-dict-code="x.optionDictCode"
									 :option-key="x.optionKey"
									 :option-label="x.optionLabel"
									 v-model="keyword[x.name]">
						</my-searcher>
					</el-form>
					<!--/搜索栏form表单-->
					<div class="buttonGroup">
						<el-button size="small"
								   @click="resetKeyword">重置
						</el-button>
						<el-button type="primary"
								   size="small"
								   @click="doSearch">查询
						</el-button>
					</div>
					<slot name="searchbar"></slot>
				</el-popover>
			</el-col>
			<!--/搜索栏-->
		</el-row>
		<!--/工具栏-->
		<!--表格-->
		<el-table ref="table"
				  :data="listData"
				  :border="border"
				  row-key="id"
				  @sort-change="sort"
				  @selection-change="selectionChange"
				  stripe
				  fit>
			<el-table-column v-if="expandColumn"
							 type="expand">
				<template slot-scope="scope">
					<slot name="expandColumn" :$index="scope.$index" :column="scope.column" :row="scope.row" :store="scope.store" :_self="scope._self"></slot>
				</template>
			</el-table-column>
			<el-table-column v-if="orderNum"
							 type="index"
							 width="40">
			</el-table-column>
			<el-table-column v-if="checkbox"
							 type="selection"
							 width="45"
							 align="center">
			</el-table-column>
			<slot name="column"></slot>
			<!--行操作栏-->
			<el-table-column v-if="optColumn" align="center"
							 class-name="optCol"
							 label="操作"
							 :width="optColWidth">
				<template slot-scope="scope">
					<!--查看按钮-->
					<my-row-btn v-if="checkBtn"
								text="查看"
								icon="el-icon-search"
								@handle="checkRow(scope)">
					</my-row-btn>
					<!--/查看按钮-->
					<!--查看按钮-->
					<my-row-btn v-if="editBtn"
								text="编辑"
								icon="el-icon-edit"
								@handle="editRow(scope)">
					</my-row-btn>
					<!--/查看按钮-->
					<slot name="optBtn" :$index="scope.$index" :column="scope.column" :row="scope.row" :store="scope.store" :_self="scope._self"></slot>
					<!--删除按钮-->
					<my-tips-btn v-if="deleteBtn"
								 text="删除"
								 icon="el-icon-delete"
								 tips="是否确认删除？"
								 @handle="deleteRow(scope)">
					</my-tips-btn>
					<!--/删除按钮-->
				</template>
			</el-table-column>
			<!--/行操作栏-->
		</el-table>
		<!--/表格-->
		<!--页码-->
		<my-pagination v-if="pagination"
					   :total="total"
					   :size="myPageSize"
					   @currentChange="currentChange"
					   @sizeChange="sizeChange">
		</my-pagination>
		<!--/页码-->
		<!--新增/查看弹框-->
		<el-dialog v-if="$slots.dialog && $slots.dialog.length"
				   :title="dialogTitle"
				   :width="dialogWidth"
				   :top="dialogTop"
				   :append-to-body="dialogAppendToBody"
				   :visible.sync="dialogVisible"
				   @open="onDialogOpen"
				   @opened="onDialogOpened"
				   @close="onDialogClose"
				   @closed="onDialogClosed">
			<el-form ref="dialogForm"
					 :rules="dialogFormRules"
					 :model="dialogData"
					 :label-width="dialogLabelWidth"
					 :disabled="dialogFormIsDisabled"
					 :label-position="dialogFormLabelPosition"
					 style="padding: 0px 20px">
				<slot name="dialog"></slot>
			</el-form>
			<div v-if="!dialogFormIsDisabled && dialogBtn" slot="footer"
				 class="dialog-footer">
				<el-button @click="dialogVisible = false"
						   round>取 消
				</el-button>
				<el-button type="primary"
						   @click="doAdd"
						   round>确 定
				</el-button>
			</div>
		</el-dialog>
		<!--/新增/查看弹框-->
	</div>
</template>

<script>
	export default {
		name: "myTable",
		props: {
			// 列表数据远程路径
			url: {
				type: String,
				default: '',
			},
			// 是否有边框
			border: {
				type: Boolean,
				default: false
			},
			// 是否可搜索
			searchable: {
				type: Boolean,
				default: true
			},
			// 列表查询过滤条件
			filter: {
				type: Object,
				default () {
					return {};
				}
			},
			// 列表地址请求参数
			params: {
				type: Object,
				default () {
					return {};
				}
			},
			// 列表数据
			data: {
				type: Array,
				default () {
					return [];
				}
			},
			// 行记录主键id
			unique: {
				type: String,
				default: 'id'
			},
			// 新增记录接口地址
			addUrl: {
				type: String,
				default: ''
			},
			checkUrl: {
				type: String,
				default: ''
			},
			// 删除记录接口地址
			deleteUrl: {
				type: String,
				default: ''
			},
			// 排序字段
			orderby: {
				type: String,
				default: 'updateTime'
			},
			// 排序方式
			ordertype: {
				type: String,
				default: 'desc'
			},
			// 是否显示工具栏
			toolbar: {
				type: Boolean,
				default: true
			},
			// 是否显示序号
			orderNum: {
				type: Boolean,
				default: true
			},
			// 是否显示复选框
			checkbox: {
				type: Boolean,
				default: true
			},
			// 提交前事件
			beforeSave: {
				type: Function,
				default: null
			},
			// 是否显示默认的新增按钮
			addBtn: {
				type: Boolean,
				default: true
			},
			// 是否显示默认的批量删除按钮
			batchDeleteBtn: {
				type: Boolean,
				default: true
			},
			// 是否显示刷新按钮
			refreshBtn: {
				type: Boolean,
				default: true
			},
			// 是否显示默认的行删除按钮
			deleteBtn: {
				type: Boolean,
				default: true
			},
			// 是否显示默认的行编辑按钮
			editBtn: {
				type: Boolean,
				default: true
			},
			// 是否显示默认的行查看按钮
			checkBtn: {
				type: Boolean,
				default: true
			},
			// 是否显示操作栏
			optColumn: {
				type: Boolean,
				default: true
			},
			// 是否显示折叠
			expandColumn: {
				type: Boolean,
				default: false
			},
			// 是否显示页码
			pagination: {
				type: Boolean,
				default: true
			},
			// 查询栏表单标题宽度
			searchLabelWidth: {
				type: String,
				default: '100px'
			},
			// 行操作列宽度
			optColWidth: {
				type: String,
				default: '120px'
			},
			// 一页显示条数
			pageSize: {
				type: Number,
				default: 10
			},
			// 默认新增/编辑弹框标题
			dialogTitle: {
				type: String,
				default: '标题'
			},
			// 默认新增/编辑弹框离顶部的距离
			dialogTop: {
				type: String,
				default: '15vh'
			},
			// 默认新增/编辑弹框宽度
			dialogWidth: {
				type: String,
				default: '50%'
			},
			// 默认新增/编辑弹框form绑定的数据
			dialogData: {
				type: Object,
				default () {
					return {};
				}
			},
			// 默认新增/编辑弹框form表单标题宽度
			dialogLabelWidth: {
				type: String,
				default: '100px	'
			},
			// 默认新增/编辑弹框form表单标题排列位置
			dialogFormLabelPosition: {
				type: String,
				default: 'left'
			},
			// 默认新增/编辑弹框form验证规则
			dialogFormRules: {
				type: Object,
				default () {
					return {}
				}
			},
			// 是否需要默认弹框按钮
			dialogBtn: {
				type: Boolean,
				default: true
			},
			dialogAppendToBody: {
				type: Boolean,
				default: false
			}
		},
		computed: {},
		data() {
			return {
				// 列表数据
				listData: this.data || [],
				// 列表数据总数
				total: 0,
				// 一页显示条数
				myPageSize: this.pageSize,
				// 列表复选框选择情况
				selection: [],
				// 加载提示显示标识
				loading: false,
				// 搜索栏表单渲染配置
				searchbarOpt: [],
				// 列表查询关键字绑定数据
				keyword: {},
				// 新增/编辑弹框显示标识
				dialogVisible: false,
				// 新增/编辑弹框form表单禁用标识
				dialogFormIsDisabled: false,
				// 最终请求的过滤参数
				myFilter: this.filter || {}
			};
		},
		watch: {},
		methods: {
			/**
			 * 列表查询
			 *
			 * @param: {Number}page 页数，默认1
			 * @param: {Number}pageSize 一页条数 默认
			 * @param: {String}sort 排序字段
			 * @param: {String}order 排序方式
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:06
			 */
			getList (page = 1, pageSize = 10, orderby, ordertype) {
				this.loading = true;
				for (let x in this.keyword) {
					if(this.keyword[x] === '')
						this.keyword[x] = null;
				}
				this.setFilter(this.keyword);
				orderby = orderby || this.orderby;
				ordertype = ordertype || this.ordertype;
				if(ordertype == 'descending')ordertype = 'desc';
				if(ordertype == 'ascending')ordertype = 'asc';
				let params = Object.assign({
					filter: this.myFilter,
					page,
					rows: pageSize || this.pageSize,
					orderBy: orderby,
					orderType: ordertype
				}, this.params);
				this.$http.post(this.url, params).then(res => {
					this.loading = false;
					this.$set(this.$data, 'listData', res.data.data.rows || []);
					if (typeof res.data.data.total == 'number') { // 后台有返回total字段（第一页会返回，第二页不会返回）
						this.$set(this.$data, 'total', res.data.data.total);
					}
					this.$emit('onLoaded', res.data);
				}).catch(err => {
					this.loading = false;
				});
				return this;
			},
			/**
			 * 列表排序事件
			 *
			 * @param: {Object} 返回参数
			 * * @sub_param: {Object}column 排序列配置
			 * * @sub_param: {Object}prop 字段值
			 * * @sub_param: {Object}prop 排序方式（ascending/descending）
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:08
			 */
			sort ({column, prop, order}) {
				this.getList(1, this.myPageSize, prop, order);
				this.$emit('onSortChange', 1, this.myPageSize, column, prop, order);
				return this;
			},
			/**
			 * 刷新列表
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:14
			 */
			refresh () {
				this.getList(1, this.myPageSize);
				this.$emit('onRefresh', this.myFilter);
				return this;
			},
			/**
			 * 打开弹框
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:14
			 */
			openDialog () {
				this.dialogVisible = true;
			},
			/**
			 * 关闭弹框
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:14
			 */
			closeDialog () {
				this.dialogVisible = false;
			},
			/**
			 * 显示新增/编辑/查看弹框
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:14
			 */
			add () {
				this.dialogVisible = true;
				this.dialogFormIsDisabled = false;
				return this;
			},
			/**
			 * 提交新增/编辑表单
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:15
			 */
			doAdd () {
				let doAdd = () => {
					this.$refs['dialogForm'].validate((valid) => {
						if (valid) {// 验证通过
							this.$emit('onBeforeSave');
							let loading = this.$loading({
								lock: true,
								text: '正在提交...',
								spinner: 'el-icon-loading'
							});
							this.$util.request(this, this.addUrl, this.dialogData, res => {
								this.dialogVisible = false;
								this.refresh();
								loading.close();
								let returnData = Object.assign({}, this.dialogData);
								if (res.data.data.id) { // 有返回id
									returnData[this.unique] = res.data.data.id;
								}
								if (this.dialogData.id) { // 编辑
									this.$emit('onEdit', returnData);
									this.$emit('onChangeList', 'edit');
								} else { // 新增
									this.$emit('onAdd', returnData);
									this.$emit('onChangeList', 'add');
								}
								this.$emit('onSave', returnData);
							});
						} else {
							return false;
						}
					});
				};

				if (typeof this.beforeSave == 'function') { // 有配置保存前事件
					let p = new Promise((resolve, reject) => {
						this.beforeSave(resolve, reject);
					});
					p.then(val => {
						doAdd();
					}, err => {
						this.$message({
							message: err,
							type: 'error',
							center: true
						});
					});
				} else { // 直接保存
					doAdd();
				}

				return this;
			},
			/**
			 * 查看行数据详情
			 *
			 * @param: {Object}scope 点击回调的作用域
			 * @auther: 陈宇驰
			 * @date: 19/6/19上午10:15
			 */
			checkRow (scope) {
				this.dialogVisible = true;
				this.dialogFormIsDisabled = true;
				this.$nextTick(() => {
					if (this.checkUrl) { // 有配置查看详情路径
						let param = {};
						param[this.unique] = scope.row[this.unique];
						this.$http.post(this.checkUrl, param).then(res => {
                            let data = res.data.data.obj;
                            if (data) { // 
                                for (let x in this.dialogData) {
                                    this.$set(this.dialogData, x, data[x]);
                                }
                                this.$emit('onCheck', this.dialogData, scope.row);
                            } else { // 
                                this.$emit('onCheck', res, scope.row);
                            }
						});
					} else { // 没有配置查看详情路径
						this.dialogData[this.unique] = scope.row[this.unique];
						for (let x in this.dialogData) {
							this.$set(this.dialogData, x, scope.row[x]);
                        }
                        this.$emit('onCheck', this.dialogData, scope.row);
					}
				});
				return this;
			},
			/**
			 * 编辑行数据详情
			 *
			 * @param: {Object}scope 点击回调的作用域
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:15
			 */
			editRow (scope) {
				this.dialogVisible = true;
				this.dialogFormIsDisabled = false;
				this.$nextTick(() => {
					if (this.checkUrl) { // 有配置查看详情路径
						let param = {};
						param[this.unique] = scope.row[this.unique];
						this.$http.post(this.checkUrl, param).then(res => {
							let data = res.data.data.obj;
							if (data) { // 
                                for (let x in this.dialogData) {
                                    this.$set(this.dialogData, x, data[x]);
                                }
                                this.$emit('onCheck', this.dialogData, scope.row);
                            } else { // 
                                this.$emit('onCheck', res, scope.row);
                            }
						});
					} else { // 没有配置查看详情路径
						this.dialogData[this.unique] = scope.row[this.unique];
						for (let x in this.dialogData) {
							this.$set(this.dialogData, x, scope.row[x]);
                        }
                        this.$emit('onCheck', this.dialogData, scope.row);
					}
				});
				return this;
			},
			/**
			 * 批量删除行记录
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:16
			 */
			batchDelete () {
				let selection = this.selection;
				if (!selection.length) { // 注释
					this.$message({
						message: '请选择您要删除的记录',
						type: 'warning',
						center: true
					});
				} else {
					let ids = [];
					selection.forEach(elem => {
						ids.push(elem[this.unique]);
					});
					this.$confirm('是否确认删除?', '系统提示').then(_ => {
						this.loading = true;
						this.$http.post(this.deleteUrl, {
							ids
						}).then(res => {
							if (res.data.code == 0) {
								this.refresh();
								this.$message({
									message: '删除成功',
									type: 'success',
									center: true
								});
								this.$emit('onBatchDelete', ids);
								this.$emit('onChangeList', 'batchDelete');
							} else {
								this.$message({
									message: res.data.message,
									type: 'error',
									center: true
								});
							}
						}).catch(err => {
							this.$message({
								message: err,
								type: 'error',
								center: true
							});
						});
					}).catch(_ => {});
				}
			},
			/**
			 * 删除单个行记录
			 *
			 * @param: {Object}scope 点击回调的作用域
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:16
			 */
			deleteRow (scope) {
				this.loading = true;
				this.$http.post(this.deleteUrl, {
					ids: [scope.row[this.unique]]
				}).then(res => {
					if (res.data.code == 0) {
						this.refresh();
						this.$message({
							message: '删除成功',
							type: 'success',
							center: true
						});
						this.$emit('onDelete', scope.row[this.unique]);
						this.$emit('onChangeList', 'delete');
					} else {
						this.$message({
							message: res.data.message,
							type: 'error',
							center: true
						});
					}
				}).catch(err => {
					this.loading = false;
					this.$message({
						message: err,
						type: 'error',
						center: true
					});
				});
				return this;
			},
			/**
			 * 列表复选框选择事件回调
			 *
			 * @param: {Array}selection 选择行数据
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:17
			 */
			selectionChange (selection) {
				this.selection = selection;
				return this;
			},
			/**
			 * 一页条数变化事件回调
			 *
			 * @param: {Number}size 一页条数
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:17
			 */
			sizeChange (size) {
				this.myPageSize = size;
				this.getList(1, size);
				this.$emit('onSizeChange', size);
				return this;
			},
			/**
			 * 页码变化事件回调
			 *
			 * @param: {Number}page 页码
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:17
			 */
			currentChange (page) {
				this.getList(page);
				this.$emit('onPageChange', page);
				return this;
			},
			/**
			 * 行数据更新方法
			 *
			 * @param: {Number}index 行序号
			 * @param: {Object}data 变更的数据对象
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:17
			 */
			updateRow (index, data = {}) {
				Object.assign(this.listData[index], data);
				return this;
			},
			/**
			 * 获取列表数据
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:17
			 */
			getListData () {
				return this.listData;
			},
			/**
			 * 根据配置生成搜索栏
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:20
			 */
			generateSearchbar () {
				let columns = this.$slots.column;
				for(let x in columns){
					if(/(ElTableColumn)/g.test(columns[x]['tag'])){
						let col = columns[x];
						let attr = col.data.attrs;
						let prop = col.componentOptions.propsData;
						if (attr.searchable !== undefined) { // 是查询列
							this.searchbarOpt.push({
								label: prop.label,
								name: attr.name || prop.prop,
								searchType: attr.searchType || attr['search-type'],
								optionUrl: attr.optionUrl || attr['option-url'],
								optionData: prop.optionData || attr['option-data'],
								optionDictCode: prop.optionDictCode || attr['option-dict-code'],
								optionKey: prop.optionKey || attr['option-key'],
								optionLabel: prop.optionLabel || attr['option-label'],
								labelWidth: attr.labelWidth || attr['label-width']
							})
						}
					}
				}
			},
			/**
			 * 重置查询栏
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:20
			 */
			resetKeyword () {
				// this.$refs.form_keyword.resetFields();
				this.$refs.form_keyword.$children.forEach(elem => {
					elem.reset();
				});
				return this;
			},
			/**
			 * 根据关键字查询列表
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:20
			 */
			doSearch () {
				this.getList(1, this.myPageSize);
				this.$emit('onSearch', this.keyword);
				return this;
			},
			/**
			 * 重置列表请求参数
			 *
			 * @param: {Object}filter 过滤条件
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:20
			 */
			setFilter (filter) {
				Object.assign(this.myFilter, filter);
				return this;
			},
			/**
			 * 新增/编辑弹框关闭事件
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:20
			 */
			onDialogClose () {
				this.$emit('onDialogClose');
			},
			onDialogClosed () {
				this.$refs.dialogForm.resetFields();
				this.dialogData[this.unique] = null;
				this.$emit('onDialogClosed');
			},
			/**
			 * 新增/编辑弹框打开事件
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:20
			 */
			onDialogOpen () {
				this.$emit('onDialogOpen');
			},
			onDialogOpened () {
				this.$emit('onDialogOpened');
			}
		},
		mounted() {
			// 查询列表数据
			this.getList();
			// 生成查询栏表单
			this.generateSearchbar();
		}
	}
</script>

<style lang="less" scoped>
.el-table{
	width: 100%;
}
.searchWrap{
	text-align: right;
}
</style>