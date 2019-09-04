/**
 * @Auther: 陈宇驰
 * @Date: 2/9/19 10:04
 * @Description:
 */

const webpack = require('webpack'); //webpack模块
const merge = require("webpack-merge");
const parts = require("./webpack.parts");   //引入配置零件文件
const webConfig = require('./web.config');

const config = {
	//调试模式
	devtool: '#cheap-module-eval-source-map',
	plugins: [
		//把模式变量添加到webpack全局变量中
		new webpack.DefinePlugin({
			'process.env': {
				PROXY_PROTOCAL: '"' + webConfig.proxyProtocol + '"',
				PROXY_IP: '"' + webConfig.proxyIp + '"',
				PROXY_PORT: '"' + webConfig.proxyPort + '"',
				PROXY_APIIDENTITY: '"' + webConfig.proxyAPIIdentity + '"',
				PROXY_IDENTITY: '"' + webConfig.proxyIdentity + '"'
			}
		}),
		//	添加热加载插件
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(), //HMR
		new webpack.NoEmitOnErrorsPlugin()
	],
	devServer: {//本地服务器配置
		port: "8089", //端口号
		host: "0.0.0.0", //可通过localhost或本机ip访问
		overlay: {
			error: true //把错误都显示在网页上
		},
		contentBase: "dist", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, // 任意的 404 响应都替代为 index.html
		hot: true, // 启用 webpack 的模块热替换特
		proxy: {
			['/' + webConfig.proxyIdentity]: {
				target: webConfig.proxyProtocol + '://' + webConfig.proxyIp + ':' + webConfig.proxyPort + (webConfig.proxyAPIIdentity ? '/' + webConfig.proxyAPIIdentity : ''),
				pathRewrite: {['^/' + webConfig.proxyIdentity] : ''}
			}
		}
		// inline: true// 启用内联模式
	}
};

module.exports = merge([
	config,
	parts.cssLoader(),
	parts.cssLoader({
		reg: /\.less$/,
		uses: ['less-loader']
	}),
	parts.cssLoader({
		reg: /\.(s[ac]ss)$/,
		uses: ['sass-loader']
	})
]);