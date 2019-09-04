<template>
	<!--有子菜单的情况-->
	<el-submenu :path="menuOption.url" :index="index" v-if="menuOption.children && menuOption.children.length">
		<template slot="title">
			<i :class="menuOption.icon"></i>
			<span>{{ menuOption.title }}</span>
		</template>
		<my-home-menu v-for="(x, index_sub) in menuOption.children" :key="x.title" :menu-option="x" :index="index + '-' + index_sub + ''" @handle="click"></my-home-menu>
	</el-submenu>
	<!--无子菜单的情况-->
	<el-menu-item :path="menuOption.url" :index="index" v-else :key="menuOption.title" @click="click(menuOption.url, index)">
		<i :class="menuOption.icon"></i>
		<span slot="title">{{ menuOption.title }}</span>
	</el-menu-item>
</template>

<script>
	export default {
		name: "myHomeMenu",
		props: {
			// 菜单配置
			menuOption: {
				type: Object,
				default () {
					return {};
				}
			},
			// 菜单索引/序号
			index: {
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
			 * 点击菜单事件
			 *
			 * @param: {String}url 菜单加载路径
			 * @auther: 陈宇驰
			 * @date: 19/6/19 上午10:35
			 */
			click (url, index) {
				this.$emit('handle', url, index);
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped>

</style>