import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
var store = new Vuex.Store({
	state: {
		dictLib: {

        },
        currentPath: '/'
	},
	getters: {
        /**
         * 获取数据字典
         *
         * @param {String}dictCode 字典code值
         * @return: 
         * @auther: "陈宇驰"
         * @date: 2019-09-03 15:28:53
        */
		getDict: (state) => (dictCode) => {
			return state.dictLib[dictCode];
        },
        /**
         * 检查数据字典数据是否存在
         *
         * @param {String}dictCode 字典code值
         * @return: 
         * @auther: "陈宇驰"
         * @date: 2019-09-03 15:28:53
        */
		findDict: (state) => (dictCode) => {
			let keys = Object.keys(state.dictLib);
			return keys.indexOf(dictCode) == -1 ? false : true;
		}
	},
	mutations: {
        /**
         * 添加数据字典数据
         *
         * @param {String}dictCode 字典code值
         * @return: 
         * @auther: "陈宇驰"
         * @date: 2019-09-03 15:28:53
        */
		setDict: (state, payload) => {
			state.dictLib[payload.dictCode] = payload.data;
        },
        /**
         * 清除数据字典数据
         *
         * @param {String}dictCode 字典code值
         * @return: 
         * @auther: "陈宇驰"
         * @date: 2019-09-03 15:28:53
        */
		clearDict: (state, payload) => {
			delete state.dictLib[payload.dictCode];
        }
	}
});

export default store;