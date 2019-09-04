/**
 * @Auther: 陈宇驰
 * @Date: 1/5/19 08:53
 * @Description:
 */

import msg_push from './router.msgpush.config';
import system from './router.system.config';
// 首页
const home = () => import ( /* webpackChunkName: "home" */ './../pages/home.vue');

const routes = [
	{
		path: '/',
		component: home
	},
	...msg_push,
	...system
];

export default routes;