/**
 * @Auther: 陈宇驰
 * @Date: 17/6/19 16:08
 * @Description:
 */
// http库
import axios from 'axios'
import util from './util';
const token = util.getCookie('token');

if (process.env.NODE_ENV == 'production') { // 生成环境
	axios.defaults.baseURL = process.env.PROD_PROTOCAL + '://' + process.env.PROD_IP + ':' + process.env.PROD_PORT + '/' + (process.env.PROD_APIIDENTITY ? process.env.PROD_APIIDENTITY + '/' : '');
} else if (process.env.NODE_ENV == 'development') { // 开发环境
	// axios.defaults.baseURL = process.env.PROXY_PROTOCAL + '://' + process.env.PROXY_IP + ':' + process.env.PROXY_PORT + '/';
	axios.defaults.baseURL = process.env.PROXY_IDENTITY + '/';
}
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 60000;

axios.interceptors.response.use(function (response) {
	if (response.data.code == 105) { // 没有token
		window.location.href = './login.html#timeout';
	}
	return response;
}, function (error) {
	alert(error.response.statusText + '(' + error.response.status + ')');
	return Promise.reject(error);
});

export default axios;