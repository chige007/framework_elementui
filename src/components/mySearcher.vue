<template>
	<!--下拉选择-->
	<el-form-item v-if="searchType == 'select'" :label="label + '：'" :prop="name">
		<el-select size="small" placeholder="请选择" v-model="myValue" clearable>
			<el-option v-for="x in myOptionData" :key="x.id" :label="x[optionLabel]" :value="x[optionKey]"></el-option>
		</el-select>
	</el-form-item>
	<!--输入框-->
	<el-form-item v-else-if="searchType == 'input'" :label="label + '：'" :prop="name">
		<el-input size="small" v-model="myValue" placeholder="请输入"></el-input>
	</el-form-item>
	<!--日期选择-->
	<el-form-item v-else-if="searchType == 'date'" :label="label + '：'" :prop="name">
		<el-date-picker size="small" v-model="myValue" type="date" placeholder="请选择" value-format="yyyy-MM-dd"></el-date-picker>
	</el-form-item>
</template>

<script>
	export default {
		model: {
			prop: 'value',
			event: 'myChange'
		},
		name: "mySearcher",
		props: {
			// 默认值
			value: {

			},
			// 表单标题
			label: {
				type: String
			},
			// 查询类型
			searchType: {
				type: String,
				default: 'input'
			},
			// 下拉数据路径
			optionUrl: {
				type: String
			},
			// 下拉数据
			optionData: {
				type: Array,
				default () {
					return [];
				}
			},
			// 下拉数据字典
			optionDictCode: {
				type: String
			},
			optionLabel: {
				type: String,
				default: 'text'
			},
			optionKey: {
				type: String,
				default: 'id'
			},
			// 字段名
			name: {
				type: String
			}
		},
		computed: {},
		data() {
			return {
				// 表单值
				myValue: null,
				myOptionData: this.optionData || []
			};
		},
		watch: {
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
		methods: {
			/**
			 * 重置表单
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:42
			 */
			reset () {
				this.myValue = null;
				this.$emit('myChange', null);
			}
		},
		mounted() {
			if (this.optionDictCode) { // 传了数据字典code
				this._dictToData(this.optionDictCode, data => {
					this.myOptionData = data;
				});
			}
		}
	}
</script>

<style lang="less" scoped>

</style>