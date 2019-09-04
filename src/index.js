/**
 * @Auther: 陈宇驰
 * @Date: 1/5/19 08:53
 * @Description: 首页入口文件
 */

// elementUI
// import './styles/theme/index.css'
import './styles/element-variables.scss'
import ElementUI from 'element-ui'
// Vue.js
import Vue from 'vue'
// Vue-router
import VueRouter from 'vue-router'
import routes from './router/router.config'
// 状态树
import store from './modules/store'
// 图标库
import './fonts/iconfont/iconfont.css'
//自定义组件
import myTable from './components/myTable.vue';
import myPagination from './components/myPagination.vue';
import myRowBtn from './components/myRowBtn.vue';
import myTipsBtn from './components/myTipsBtn.vue';
import mySearcher from './components/mySearcher.vue';
import myHomeMenu from './components/myHomeMenu.vue';
import myAvatarUploader from './components/myAvatarUploader.vue';
import myBreakpointsUpload from './components/myBreakpointsUpload.vue';
import myFileUploader from './components/myFileUploader.vue';
import myCkplayer from './components/myCkplayer.vue';
import myListSeletor from './components/myListSeletor.vue';
import myTagEditor from './components/myTagEditor.vue';
// 自定义混入
import mixin_page from './mixin/mixin_page';
// 自定义指令
import directives from './components/directives'
// 自定义过滤器
import filters from './components/filters'
// 自定义工具包
import util from './modules/util'
// 首页
import app from './pages/app.vue'
// 初始化样式
import './styles/init.less';
// 首页样式
import './styles/home.less';

// 路由插件
Vue.use(VueRouter);
// elementUI插件
Vue.use(ElementUI);
// 自定义插件
Vue.component('myTable', myTable);
Vue.component('myPagination', myPagination);
Vue.component('myRowBtn', myRowBtn);
Vue.component('myTipsBtn', myTipsBtn);
Vue.component('mySearcher', mySearcher);
Vue.component('myHomeMenu', myHomeMenu);
Vue.component('myAvatarUploader', myAvatarUploader);
Vue.component('myBreakpointsUpload', myBreakpointsUpload);
Vue.component('myFileUploader', myFileUploader);
Vue.component('myCkplayer', myCkplayer);
Vue.component('myListSeletor', myListSeletor);
Vue.component('myTagEditor', myTagEditor);
// 配置全局混入
Vue.mixin(mixin_page);
// 配置
Vue.use(directives);
Vue.use(filters);

// mock配置
import './modules/mock.config'
// axios配置
import axios from './modules/axios.config'
// 路由配置
const router = new VueRouter({
	linkActiveClass: 'active',
	routes: routes
});

// Vue原型链扩展
Vue.prototype['$util'] = util;

Vue.prototype['$http'] = axios;

new Vue({
    el : "#myApp_home",
	router,
	store,
	data : () => {
        return {

        }
	},
	render: (h) => h(app),
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