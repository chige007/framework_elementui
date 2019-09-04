const path = require('path'); //路劲模块
const webpack = require('webpack'); //webpack模块
const merge = require("webpack-merge");
const parts = require("./webpack.parts")    //引入配置零件文件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html模块
const { VueLoaderPlugin } = require('vue-loader'); //渲染vue模板模块

const config = {
	devtool: false,
	entry: { //入口配置
		'index': path.join(__dirname, 'src/index.js'), //入口js文件
		'login': path.join(__dirname, 'src/login.js') //入口js文件
	},
	output: { //输出配置
		path: path.join(__dirname, 'dist'), //输出路径
		// publicPath: 'js',//发布路径前缀
		filename: 'js/[name]-[hash:8].js', //输出文件名+哈希值
		chunkFilename: 'js/chunks/[name]-[chunkhash:8].js'//分块输出
	},
	plugins: [
		//把模式变量添加到webpack全局变量中
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"' + process.env.NODE_ENV + '"'
			}
		}),
		new HtmlWebpackPlugin({ //生成html插件
			filename: 'index.html', //html文件名
			template: 'template/index.html', //生成html的模板
			// historyFallback : {},//单页面应用记录历史
			chunks: ['index'],
			minify: {
				collapseWhitespace: true, //合并空格
				removeComments: true, //去掉注释
				removeEmptyAttributes: true, //去掉空属性
				collapseInlineTagWhitespace: true, //合并内联空格
				minifyCSS: true, //压缩css
				minifyJS: true //压缩js
			},
			inject: 'body' //script标签插入的位置（head,body,false）
		}),
		new HtmlWebpackPlugin({ //生成html插件
			filename: 'login.html', //html文件名
			template: 'template/login.html', //生成html的模板
			// historyFallback : {},//单页面应用记录历史
			chunks: ['login'],
			minify: {
				collapseWhitespace: true, //合并空格
				removeComments: true, //去掉注释
				removeEmptyAttributes: true, //去掉空属性
				collapseInlineTagWhitespace: true, //合并内联空格
				minifyCSS: true, //压缩css
				minifyJS: true //压缩js
			},
			inject: 'body' //script标签插入的位置（head,body,false）
		}),
		new VueLoaderPlugin(), //渲染vue模板插件
	]
};

module.exports = merge([
	config,
	parts.vueLoader(),
	parts.jsLoader(),
	parts.imgLoader(),
	parts.fontLoader()
]);