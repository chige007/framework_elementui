<template>
	<el-popover
			:placement="placement"
			:width="width"
			:trigger="trigger"
			v-model="visible"
			@hide="onHide"
			@show="onShow">
		<el-table ref="table"
				  v-loading="loading"
				  :data="listData"
				  size="small"
				  @row-click="onRowClick"
				  :highlight-current-row="true"
				  :current-row-key="value"
				  :row-key="unique">
			<slot name="column"></slot>
		</el-table>
		<div style="text-align: center">
			<el-button size="medium"
					   @click="visible = false"
					   round>关闭
			</el-button>
			<el-button size="medium"
					   type="primary"
					   :disabled="!currentRow"
					   @click="onConfirm"
					   round>选择
			</el-button>
		</div>
		<el-form-item slot="reference"
					  :label="label"
					  :prop="name">
			<el-input :name="name"
					  :readonly="true"
					  :class="inputClass"
					  :disabled="disabled"
					  :suffix-icon="suffixIcon"
					  :prefix-icon="prefixIcon"
					  :placeholder="placeholder"
					  v-model="value"></el-input>
		</el-form-item>
	</el-popover>
</template>

<script>
	export default {
		name: "myListSeletor",
		props: {
			// 列表数据行标识
			unique: {
				type: String,
				default: null
			},
			id: {
				type: String,
				default: null
			},
			value: {
				type: String,
				default: null
			},
			// 弹框宽度
			width: {
				type: Number,
				default: 400
			},
			// 触发形式
			trigger: {
				type: String,
				default: 'click'
			},
			// 表单标题
			label: {
				type: String,
				default: ''
			},
			// 表单控件class属性
			inputClass: {
				type: String,
				default: ''
			},
			// 列表数据加载地址
			url: {
				type: String,
				default: ''
			},
			// 列表数据加载参数
			params: {
				type: Object,
				default: () => {
					return {};
				}
			},
			// 表单控件name属性
			name: {
				type: String,
				default: ''
			},
			// 表单提示
			placeholder: {
				type: String,
				default: '请选择'
			},
			// 弹框位置
			placement: {
				type: String,
				default: 'right'
			},
			// 表单前缀图标
			prefixIcon: {
				type: String,
				default: null
			},
			// 表单后缀图标
			suffixIcon: {
				type: String,
				default: 'el-icon-chat-line-square'
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			multiple: {
				type: Boolean,
				default: false
			}
		},
		computed: {},
		data() {
			return {
				// 加载中标识
				loading: false,
				// 列表数据
				listData: [],
				// 弹框显示标识
				visible: false,
				// 选中行
				currentRow: this.multiple ? [] : null
			};
		},
		components: {},
		watch: {},
		methods: {
			/**
			 * 加载列表数据
			 *
			 * @auther: 陈宇驰
			 * @date: 14/8/19 下午3:22
			 */
			getList () {
				if (!this.url || this.listData.length != 0) { // 没有配置url
					this.currentRow= this.listData.find(item => {
						return item[this.unique] == this.id;
					});
					this.$refs.table.setCurrentRow(this.currentRow);
					return;
				}
				this.loading = true;
				this.$http.post(this.url, this.params).then(res => {
					this.loading = false;
					this.$set(this.$data, 'listData', res.data && res.data.data && res.data.data.rows || []);
					this.currentRow= this.listData.find(item => {
						return item[this.unique] == this.id;
					});
					this.$refs.table.setCurrentRow(this.currentRow);
				});
			},
			/**
			 * 弹框显示事件
			 *
			 * @auther: 陈宇驰
			 * @date: 14/8/19 下午6:10
			 */
			onShow () {
				this.getList();
			},
			/**
			 * 弹框隐藏事件
			 *
			 * @auther: 陈宇驰
			 * @date: 14/8/19 下午6:10
			 */
			onHide () {
				this.$refs.table.clearSelection();
				this.currentRow = this.multiple ? [] : null;
			},
			/**
			 * 选择确认事件
			 *
			 * @auther: 陈宇驰
			 * @date: 14/8/19 下午6:10
			 */
			onConfirm () {
				this.$emit('onSelected', this.currentRow);
				this.visible = false;
			},
			/**
			 * 点击列表行事件
			 *
			 * @param {Object}row 行数据
			 * @param {Object}column 列配置
			 * @param {Object}event 事件对象
			 * @auther: 陈宇驰
			 * @date: 14/8/19 下午6:10
			 */
			onRowClick (row, column, event) {
				if (this.multiple) { // 多选
					var isExist = this.currentRow.find(elem => {
						return elem[this.unique] == row[this.unique];
					});
					if (isExist) { // 已选
						this.$refs.table.toggleRowSelection(row, false);
						this.currentRow = this.currentRow.filter(item => {
							item[this.unique] != row[this.unique];
						})
					} else { // 未选
						this.$refs.table.toggleRowSelection(row, true);
						this.currentRow.push(row);
					}
					this.$refs.table.toggleRowSelection(row, true);
				} else { // 单选
					this.$refs.table.setCurrentRow(row);
					this.currentRow = row;
				}
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>
</style>