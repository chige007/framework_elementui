/**
 * @Auther: 陈宇驰
 * @Date: 26/6/19 15:18
 * @Description:
 */

// 数据字典列表
const dictionary_list = () => import ( /* webpackChunkName: "dictionary_list" */ './../pages/system_config/dictionary_list.vue');
// 模板下载管理
const system_temp_list = () => import ( /* webpackChunkName: "system_temp_list" */ './../pages/system_config/template_list.vue');
// 网站配置
const web_config = () => import ( /* webpackChunkName: "web_config" */ './../pages/system_config/web_config.vue');
// 路由配置
const routes = [
	{
		path: '/dictionary/list',
		component: dictionary_list
	},
	{
		path: '/system/webconfig',
		component: web_config
	},
	{
		path: '/system/temp/list',
		component: system_temp_list
	}
];

export default routes;