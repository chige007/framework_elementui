<template>
	<div>
		<el-tag :key="tag"
				v-for="tag in tagsData"
				closable
				:disable-transitions="false"
				@close="removeTag(tag)">{{tag}}
		</el-tag>
		<el-input class="newTagInput"
				  v-if="inputVisible"
				  v-model="newTagValue"
				  ref="newTagInput"
				  size="small"
				  @keyup.enter.native="inputConfirm"
				  @blur="inputConfirm">
		</el-input>
		<el-button v-else
				   class="addTagBtn"
				   size="small"
				   @click="addTag">+ 新增
		</el-button>
	</div>
</template>

<script>
	export default {
		name: "myTagEditor",
		model: {
			prop: 'value',
			event: 'myChange'
		},
		props: {
			value: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		computed: {},
		data() {
			return {
				// 标签数据
				tagsData: this.value || [],
				// 是否显示新增输入框
				inputVisible: false,
				// 新增标签值
				newTagValue: ''
			};
		},
		components: {},
		watch: {},
		methods: {
			/**
			 * 删除标签
			 *
			 * @param: {String}tag 删除的标签名
			 * @auther: 陈宇驰
			 * @date: 19/8/19 下午4:48
			 */
			removeTag (tag) {
				this.tagsData.splice(this.tagsData.indexOf(tag), 1);
				this.$emit('myChange', this.tagsData);
			},
			/**
			 * 新增标签
			 *
			 * @auther: 陈宇驰
			 * @date: 19/8/19 下午4:48
			 */
			addTag () {
				this.inputVisible = true;
				this.$nextTick(() => {
					this.$refs.newTagInput.$refs.input.focus();
				});
			},
			/**
			 * 确认新增
			 *
			 * @auther: 陈宇驰
			 * @date: 19/8/19 下午4:48
			 */
			inputConfirm () {
				let newTagValue = this.newTagValue;
				if (newTagValue) {// 有输入值
					this.tagsData.push(newTagValue);
					this.$emit('myChange', this.tagsData);
				}
				this.inputVisible = false;
				this.newTagValue = '';
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>
	.el-tag{
		margin-right: 10px;
	}
	.addTagBtn {
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.newTagInput {
		width: 100px!important;
		margin-right: 10px;
		vertical-align: bottom;
	}
</style>