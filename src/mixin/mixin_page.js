/**
 * @Auther: 陈宇驰
 * @Date: 2/5/19 16:42
 * @Description:
 */
export default {
	props: {
	},
	data () {
		return {

		}
	},
	computed: {
		_file_prefix () {
			return 'file/open/downloadFile'
		},
		// 请求根路径
		_ROOT_PATH () {
			var env = process.env.NODE_ENV;
			if (env == 'production') { // 生产环境
				return process.env.PROD_PROTOCAL + '://' + process.env.PROD_IP + ':' + process.env.PROD_PORT + '/' + (process.env.PROD_APIIDENTITY ? process.env.PROD_APIIDENTITY + '/' : '');
			} else {
				// return process.env.PROXY_PROTOCAL + '://' + process.env.PROXY_IP + ':' + process.env.PROXY_PORT + '/';
				return process.env.PROXY_IDENTITY + '/'
			}
		},
		// 请求根路径(没有)
		_ROOT_PATH_2 () {
			var env = process.env.NODE_ENV;
			if (env == 'production') { // 生产环境
				return process.env.PROD_PROTOCAL + '://' + process.env.PROD_IP + ':' + process.env.PROD_PORT + '/';
			} else {
				return process.env.PROXY_IDENTITY + '/'
			}
		},
		// 是否存在返回标识
		hasBack () {
			return this.$route.query.hasBack == 1 ? true : false;
		}
	},
	methods: {
		/**
		 * 图片加载失败回调
		 *
		 * @param:
		 * @param: 图片加载失败
		 * @return:
		 * @auther: 陈宇驰
		 * @date: 9/7/19 下午11:17
		 */
		_imgLoadFail (img) {
			img.src = 'images/loadFail.png';
		},
		/**
		 * 返回上层路由
		 *
		 * @auther: 陈宇驰
		 * @date: 18/5/19 上午11:23
		 */
		_prevPage () {
			this.$router.go(-1);
		},
		/**
		 * 通过url获取数据
		 *
		 * @param: {String}url 加载路径
		 * @param: {Object}filter 请求参数
		 * @param: {Function}then 请求成功回调
		 * @auther: 陈宇驰
		 * @date: 27/5/19 上午9:18
		 */
		_urlToData (url, filter, then) {
			this.$http.post(url, {filter}).then(res => {
				if (typeof then == 'function') {
					then(res);
				}
			}).catch(err => {
				console.log(err);
			});
		},
		/**
		 * 通过dictCode获取数据字典数据
		 *
		 * @param: {String}url 数据字典code
		 * @param: {Function}then 请求成功回调
		 * @auther: 陈宇驰
		 * @date: 27/5/19 上午9:18
		 */
		_dictToData (dictCode, then) {
			if (this.$store.state.dictLib[dictCode] != undefined) { // 注释
			    then(this.$store.state.dictLib[dictCode]);
			} else { // 注释
				this.$http.post('dict/findByParams', {
					filter: {
						parentCode: dictCode
					}
				}).then(res => {
					if (typeof then == 'function') {
						this.$store.commit('setDict', {
							dictCode: dictCode,
							data: res.data.data.rows
						});
						then(res.data.data.rows);
					}
				}).catch(err => {
					console.log(err);
				});
			}
		},
		/**
		 * 通过code获取字典中文值
		 *
		 * @param: {Array}dictData 数据字典数据
		 * @param: {String}value 要匹配的code
		 * @auther: 陈宇驰
		 * @date: 27/5/19 上午9:18
		 */
		_codeToName (dictData, value) {
			if (!Array.isArray(dictData) || !value) return;
			if (typeof value == 'string' && value.indexOf(',') != -1) { // 多个值且逗号隔开
				value = value.split(',');
				var matchData = this._codeToName(dictData, value);
				return matchData.join(',');
			} else if (Array.isArray(value)) { // 多个值且数组
				var matchData = [];
				value.forEach(elem => {
					matchData.push(this._codeToName(dictData, elem));
				});
				return matchData;
			} else if (typeof value == 'string') { // 单个值
				var matchData = dictData.find((elem) => {
					return elem['code'] == value;
				});
				if(matchData)
					return matchData['name'];
			}
		},
		/**
		 * 列表数据转下拉框
		 *
		 * @param: {Object} {
		 * {String}url:列表路径,
		 * {Object}params:列表加载地址,
		 * {String}code: 下拉的code对应列表的字段名,
		 * {String}name: 下拉的name对应列表的字段名,
		 * {String}callback: 转化后回调事件
		 * }
		 * @auther: 陈宇驰
		 * @date: 27/8/19 上午8:51
		 */
		_listToSelect ({url = '', params = {}, code = '', name = '', callback = null}) {
			var selectorData = [];
			this.$http.post(url, params).then(res => {
				var dataList = res.data.data.rows;
				dataList.forEach((elem, i) => {
					selectorData.push({
						code: elem[code],
						name: elem[name]
					});
				});
				if (typeof callback == 'function') { // 有回调函数
					callback(selectorData);
				}
			});
		},
		/**
		 * 去除日期的秒
		 *
		 * @param: row 行数据
		 * @param: column 列配置
		 * @param: cellValue 单元格值
		 * @param: index 行数
		 * @return: {String}
		 * @auther: 陈宇驰
		 * @date: 18/6/19 下午4:56
		 */
		_noSecondFormatter (row, column, cellValue, index) {
			return this.$util.formatter.noSecond(cellValue);
		},
		/**
		 * 是/否格式化
		 *
		 * @param: row 行数据
		 * @param: column 列配置
		 * @param: cellValue 单元格值
		 * @param: index 行数
		 * @return: {String}
		 * @auther: 陈宇驰
		 * @date: 18/6/19 下午4:56
		 */
		_booleanFormatter (row, column, cellValue, index) {
			if (cellValue) {
			    return '是';
			} else {
				return '否';
			}
		}
	},
	mounted: function(){
	}
}
