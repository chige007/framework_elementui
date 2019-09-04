const config = {
	// 代理请求路径替换标识
	proxyIdentity: 'api',

	// 代理服务器请求地址
	proxyProtocol: 'http',
	// proxyIp: '0.0.0.0',
	// proxyPort: '8090',
	proxyIp: '202.104.31.181',
	proxyPort: '13808',
	proxyAPIIdentity: 'api',

	// 生成环境请求地址
	prodProtocol: 'http',
	prodIp: '202.104.31.181',
	prodPort: '13808',
	prodAPIIdentity: 'api',

	dry: false
}

module.exports = config