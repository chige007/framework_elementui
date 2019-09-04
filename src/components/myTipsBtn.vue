<template>
	<el-popover ref="popover" placement="top" width="180" v-model="visible">
		<p class="text">{{tips}}</p>
		<div class="buttonGroup">
			<el-button size="mini" @click.stop.prevent="hide">取消</el-button>
			<el-button type="primary" size="mini" @click.stop.prevent="handle">确定</el-button>
		</div>
		<my-row-btn slot="reference" :text="text" :icon="icon"></my-row-btn>
	</el-popover>
</template>

<script>
	export default {
		name: "myTipsButton",
		props: {
			// 确认提示信息
			tips: {
				type: String,
				default: '确认删除？'
			},
			// 按钮图标
			icon: {
				type: String,
				default: ''
			},
			// 按钮提示文字
			text: {
				type: String,
				default: ''
			}
		},
		computed: {},
		data() {
			return {
				// 确认提示显示标识
				visible: false
			};
		},
		watch: {},
		methods: {
			/**
			 * 确认事件
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:43
			 */
			handle () {
				this.$emit('handle');
				this.hide();
			},
			/**
			 * 隐藏提示
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:43
			 */
			hide () {
				this.visible = false;
			},
			/**
			 * 显示提示
			 *
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:43
			 */
			show () {
				this.visible = true;
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>
.text{
	text-align: center;
}
.buttonGroup{
	text-align: center;
	margin-top: 15px;
}
</style>