/**
 * @Auther: 陈宇驰
 * @Date: 2/9/19 10:05
 * @Description:
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');//分离样式

exports.vueLoader = ({reg = /\.vue$/, include, exclude, uses = []} = {}) => ({
	module : {
		rules:[{
			test : reg,
			include,
			exclude,
			use: ['vue-loader', ...uses]
		}]
	}
});

exports.jsLoader = ({reg = /\.js$/, include, exclude, uses = []} = {}) => ({
	module : {
		rules:[{
			test : reg,
			include,
			exclude,
			use: [{
				loader: 'babel-loader',
				options: {//配合路由分块输出的配置
					compact: true,
					plugins: ['syntax-dynamic-import']
				}
			}, ...uses]
		}]
	}
});

exports.imgLoader = ({reg = /\.(jpg|png|jpeg|gif|ico|bmp|Webp)(\?.*)?$/, include, exclude, uses = []} = {}) => ({
	module : {
		rules:[{
			test : reg,
			include,
			exclude,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'images/[name].[ext]'
				}
			}, ...uses]
		}]
	}
});

exports.fontLoader = ({reg = /\.(woff2|woff|svg|eot|ttf)(\?.*)?$/, include, exclude, uses = []} = {}) => ({
	module : {
		rules:[{
			test : reg,
			include,
			exclude,
			use: [{
				loader: 'url-loader'
			}, ...uses]
		}]
	}
});

exports.cssLoader = ({reg = /\.css$/, include, exclude, uses = []} = {}) => ({
	module : {
		rules:[{
			test : reg,
			include,
			exclude,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						minimize: false
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [
								require('autoprefixer')({
									"browsers": "last 5 version"
								})
							]
						}
					}
				},
				...uses
			]
		}]
	}
});

exports.cssLoaderProd = ({reg = /\.css$/, include, exclude, uses = []} = {}) => ({
	module : {
		rules:[{
			test : reg,
			include,
			exclude,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							minimize: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function () {
								return [
									require('autoprefixer')({
										"browsers": "last 5 version"
									})
								]
							}
						}
					},
					...uses
				]
			})
		}]
	}
});