/**
 * @Auther: 陈宇驰
 * @Date: 2/9/19 10:04
 * @Description:
 */

const webpack = require('webpack'); //webpack模块
const merge = require("webpack-merge");
const parts = require("./webpack.parts");   //引入配置零件文件
const webConfig = require('./web.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');//打包删除旧文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');//分离样式

const config = {
	devtool: false,
	plugins: [
		//把模式变量添加到webpack全局变量中
		new webpack.DefinePlugin({
			'process.env': {
				PROD_PROTOCAL: '"' + webConfig.prodProtocol + '"',
				PROD_IP: '"' + webConfig.prodIp + '"',
				PROD_PORT: '"' + webConfig.prodPort + '"',
				PROD_APIIDENTITY: '"' + webConfig.prodAPIIdentity + '"'
			}
		}),
		new CleanWebpackPlugin(['dist/js/*.js', 'dist/css/*.css', 'dist/js/chunks/*.js'], {//打包前删除原来的文件
			root: __dirname,//根目录
			verbose: true,//开启在控制台输出信息
			dry: webConfig.dry//启用删除文件
		}),
		new ExtractTextPlugin({
			// filename: 'css/common-[hash:8].css',//输出css名称
			filename:  getPath => {
				return getPath('css/[name]-[chunkhash:8].css').replace('css/js', 'css');
			},
			allChunks: true////分块输出需配置
		})
	]
};

module.exports = merge([
	config,
	parts.cssLoaderProd(),
	parts.cssLoaderProd({
		reg: /\.less$/,
		uses: ['less-loader']
	}),
	parts.cssLoaderProd({
		reg: /\.(s[ac]ss)$/,
		uses: ['sass-loader']
	})
]);