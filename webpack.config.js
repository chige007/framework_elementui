const commConfig = require("./webpack.common");
const devConfig = require("./webpack.development");
const prodConfig = require("./webpack.production");
const merge = require("webpack-merge");

module.exports = mode => {
	console.log('mode：' + mode);
	if(mode === "production"){
		return merge(commConfig, prodConfig, {mode});
	}
	return merge(commConfig, devConfig, {mode});
}

