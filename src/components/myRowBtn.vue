<template>
	<el-tooltip :content="text" placement="top" transition="false" :enterable="false">
		<el-button size="mini" :type="type" :icon="icon" circle @click.native.prevent.stop="handle"></el-button>
	</el-tooltip>
</template>

<script>
	export default {
		name: "myOptBtn",
		props: {
			// 按钮提示文字
			text: {
				type: String,
				required: true
			},
			// 按钮图标
			icon: {
				type: String,
				required: true
			},
			// 按钮样式类型
			type: {
				type: String
			}
		},
		computed: {},
		data() {
			return {};
		},
		watch: {},
		methods: {
			/**
			 * 按钮点击事件
			 *
			 * @param: {Object}evetn 事件对象
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:40
			 */
			handle (event) {
				let myEvent = new Event('mouseleave');
				this.$el.dispatchEvent(myEvent);
				this.$emit('handle', event);
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>

</style>