const config = {
	// 代理请求路径替换标识
	proxyIdentity: 'api',

	// 代理服务器请求地址
	proxyProtocol: 'http',
	// proxyIp: '0.0.0.0',
	// proxyPort: '8090',
	prodIp: '0.0.0.0',
	proxyPort: '3000',
	proxyAPIIdentity: 'api',

	// 生成环境请求地址
	prodProtocol: 'http',
	prodIp: '0.0.0.0',
	prodPort: '3000',
	prodAPIIdentity: 'api',

	dry: false
}

module.exports = config