const Util = {
	/**
	 * 获取当前时间yyyy-MM-dd HH:mm
	 *
	 * @auther: 陈宇驰
	 * @date: 29/8/19 下午3:26
	 */
	getCurrentDate () {
		var d = new Date();
		var year = d.getFullYear() + '';
		var month = d.getMonth() + 1;
		month = month < 10 ? '0' + month : month;
		var day = d.getDate();
		day = day < 10 ? '0' + day : day;
		var hour = d.getHours();
		var minute = d.getMinutes();
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
	},
	/**
	 * 重置表单
	 *
	 * @param: {Object}vue vue作用域
	 * @param: {String}formName form组件名
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午2:58
	 */
	resetForm (vue, formName) {
		vue.$refs[formName].resetFields();
	},
	/**
	 * 保存表单
	 *
	 * @param: {Object}vue vue作用域
	 * @param: {String}url 保存接口地址
	 * @param: {String}formName form组件名
	 * @param: {Function}success 保存成功回调
	 * @param: {Function}error 保存失败回调
	 * @param: {Boolean}tips 是否显示接口回应提示
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午2:58
	 */
	saveForm (vue, url, formName, success, error, tips = true) {
		vue.$refs[formName].validate(valid => {
			if (valid) { // 表单验证通过
				var loading = vue.$loading({
					lock: true,
					text: '正在提交...',
					spinner: 'el-icon-loading'
				});
				var formData = vue.$refs[formName] && vue.$refs[formName]['model']
				vue.$http.post(url, formData).then(res => {
					loading.close();
					if (res.data.code == 0) {
						if (tips) {
							vue.$message({
								message: '保存成功',
								type: 'success',
								center: true
							});
						}
						if (typeof success == 'function') {
							success(res);
						}
					} else {
						if (tips) {
							vue.$message({
								message: res.data.message || '操作失败',
								type: 'error',
								center: true
							});
						}
					}
				}).catch(err => {
					loading.close();
					if (tips) {
						vue.$message({
							message: err,
							type: 'error',
							center: true
						});
					}
					if (typeof error == 'function') {
						error(err);
					}
				});
			} else {
				vue.$message({
					message: '请完整填写表单',
					type: 'error',
					center: true
				});
				return false;
			}
		});
	},
	/**
	 * 请求接口
	 *
	 * @param: {Object}vue vue作用域
	 * @param: {String}url 请求接口地址
	 * @param: {Object}data 参数对象
	 * @param: {Function}success 保存成功回调
	 * @param: {Function}error 保存失败回调
	 * @param: {Boolean}tips 是否显示接口回应提示
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午2:58
	 */
	request (vue, url = '', data = {}, success, error, tips = true) {
		if (tips) {
			var loading = vue.$loading({
				lock: true,
				text: '正在提交...',
				spinner: 'el-icon-loading'
			});
		}
		vue.$http.post(url, data).then(res => {
			loading && loading.close();
			if (res.data.code == 0) {
				if (tips) {
					vue.$message({
						message: res.data.message || '操作成功',
						type: 'success',
						center: true
					});
				}
				if (typeof success == 'function') {
					success(res);
				}
			} else {
				if (tips) {
					vue.$message({
						message: res.data.message || '操作失败',
						type: 'error',
						center: true
					});
				}
				if (typeof error == 'function') {
					error(res);
				}
			}
		}).catch(err => {
			if (tips) {
				loading.close();
				vue.$message({
					message: err,
					type: 'error',
					center: true
				});
			}
		});
	},
	/**
	 * 路由调整
	 *
	 * @param: {Object}vue vue作用域
	 * @param: {String}url 跳转地址
	 * @param: {Object}query 地址栏参数
	 * @param: {Object}param request body参数
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午3:01
	 */
	routeTo (vue, url, query, param) {
		vue.$router.push({
			path: url,
			query: query || {},
			param: param || {}
		});
	},
	/**
	 * 设置cookie值
	 *
	 * @param: {String}cname cookie名
	 * @param: {String}cvalue cookie值
	 * @param: {String}exdays 保存期限
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午3:02
	 */
	setCookie (cname, value, iDay) {
		let oDate = new Date();
		oDate.setDate(oDate.getDate() + iDay);
		document.cookie = cname + '=' + value + ';expires=' + oDate;
	},
	/**
	 * 获取cookie值
	 *
	 * @param: {String}cname cookie名
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午3:02
	 */
	getCookie (cname) {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		for(var i = 0; i < arrCookie.length; i++){
			var arr = arrCookie[i].split("=");
			if(cname == arr[0]){
				return arr[1];
			}
		}
		return "";
	},
	/**
	 * 删除cookie值
	 *
	 * @param: {String}cname cookie名
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午3:02
	 */
	removeCookie : function (cname) {
		let oDate = new Date();
		oDate.setDate(oDate.getDate() + -1);
		document.cookie = cname + '=' + 1 + ';expires=' + oDate;
	},
	/**
	 * 设置localStorage
	 *
	 * @param: {String}name 名
	 * @param: {String}value 值
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午3:02
	 */
	setLocalStorage (name, value) {
		if (window.Storage && window.localStorage && window.localStorage instanceof Storage) { // 支持本地存储
			window.localStorage.setItem(name, value);
			return true;
		}
		return false;
	},
	/**
	 * 获取localStorage
	 *
	 * @param: {String}name 名
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午3:02
	 */
	getLocalStorage (name) {
		if (window.Storage && window.localStorage && window.localStorage instanceof Storage) { // 支持本地存储
			return window.localStorage.getItem(name);
		}
		return false;
	},
	/**
	 * 删除localStorage
	 *
	 * @param: {String}name 名
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午3:02
	 */
	removeLocalStorage (name) {
		if (window.Storage && window.localStorage && window.localStorage instanceof Storage) { // 支持本地存储
			window.localStorage.removeItem(name);
			return true;
		}
		return false;
	},
	/**
	 * 格式化方法集合
	 *
	 * @auther: 陈宇驰
	 * @date: 21/6/19 下午3:02
	 */
	formatter: {
		/**
		 * 去除时间的秒
		 *
		 * @param: {String}value 日期值
		 * @auther: 陈宇驰
		 * @date: 21/6/19 下午3:02
		 */
		noSecond (value) {
			return /\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}/g.exec(value);
		}
	}
}

export default Util;