<template>
	<el-pagination
			background
			layout="total, sizes, jumper, ->, prev, pager, next"
			@size-change="sizeChange"
			@current-change="currentChange"
			:current-page="currentPage"
			:page-sizes="pageSizeSelect"
			:page-size="pageSize"
			:total="total">
	</el-pagination>
</template>

<script>
	export default {
		name: "myPagination",
		props: {
			// 数据总数
			total: {
				type: Number,
				required: true
			},
			// 一页条数
			size: {
				type: Number,
				default: 10
			}
		},
		computed: {
			pageSizeSelect () {
				if(this.total <= 100){
					let count = Math.ceil(this.total / 10);
					let pageSizeSelect = [];
					// 循环 ，到  为止
					for (let i = 1; i <= count; i++) {
						pageSizeSelect.push(i * 10);
					}
					return pageSizeSelect;
				}else {
					return [10, 30, 50, 100];
				}
			}
		},
		data() {
			return {
				// 一页条数
				pageSize: this.size,
				// 当前页码
				currentPage: 1
			};
		},
		watch: {},
		methods: {
			/**
			 * 一页条数改变事件
			 *
			 * @param: {Number}size 一页条数
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:37
			 */
			sizeChange (size) {
				this.$set(this.$data, 'pageSize', size);
				this.$set(this.$data, 'currentPage', 1);
				this.$emit('sizeChange', size);
			},
			/**
			 * 页码改变事件
			 *
			 * @param: {Number}page 页码
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:37
			 */
			currentChange (page) {
				this.$set(this.$data, 'currentPage', page);
				this.$emit('currentChange', page);
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>

</style>