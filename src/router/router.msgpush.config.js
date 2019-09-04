/**
 * @Auther: 陈宇驰
 * @Date: 20/6/19 18:27
 * @Description:
 */
// 消息模板列表
const msg_push_tmpl_list = () => import ( /* webpackChunkName: "msg_push_tmpl_list" */ './../pages/message_push/template_list.vue');
// 推送记录列表
const msg_push_history_list = () => import ( /* webpackChunkName: "msg_push_history_list" */ './../pages/message_push/history_list.vue');
// 路由配置
const routes = [
	{
		path: '/msg_push/tmpl_list',
		component: msg_push_tmpl_list
	},
	{
		path: '/msg_push/history_list',
		component: msg_push_history_list
	}
];

export default routes;