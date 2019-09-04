/**
 * @Auther: 陈宇驰
 * @Date: 1/5/19 08:53
 * @Description: 登录页入口文件
 */

// Vue.js
import Vue from 'vue'
// 登录页
import login from './pages/login.vue'
// 初始化样式
import './styles/init.less';
// axios配置
import axios from './modules/axios.config'
delete axios.defaults.headers.common['token'];
Vue.prototype['$http'] = axios;

new Vue({
	el : "#myApp_login",
	data : () => {
		return {

		}
	},
	render: (h) => h(login),
	mounted () {

	}
});

// Vue.config.devtools = false;
Vue.config.silent = true;

if(process.env.NODE_ENV == "development"){
	console.log("当前是开发模式！");
}else if(process.env.NODE_ENV == "production"){
	console.log("当前是生产模式！");
}