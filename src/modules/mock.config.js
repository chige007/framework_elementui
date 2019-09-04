if(process.env.NODE_ENV == "mock"){
	var MockConfig = require('mockjs')

	var listMock = (url, rowData) => {
		var rows = [rowData];
		var dataObj = {
			'total|10-99': 0,
			'rows|10': rows
		}
		MockConfig.mock(url, 'get', {
			"code": 0,
			"msg": "操作成功",
			"data": dataObj
		});
	}

	var treeMock = (url, nodeData) => {
		var treeData = {
			'id': MockConfig.Random.id(),
			'text|4-8': /[a-z]/,
			'children': []
		}
		MockConfig.mock(url, 'get', {
			"code": 0,
			"msg": "操作成功",
			"data|8": [treeData]
		});
	}

	listMock("article/getList", {
		'id|16': /[a-zA-Z0-9]/,
		'title|16-30': /[a-z]/,
		'date': '@date',
		'comment|1-3': /[0-9]/,
		'good|1-3': /[0-9]/,
		'share|1-3': /[0-9]/,
		'status': /已发布|未发布/
	});
	listMock("company/authentication/user/info", {
		'id|16': /[a-zA-Z0-9]/,
		'companyName': '东鹏瓷砖有限公司',
		'registrationCode|16': /[0-9]/,
		'legalName': '张三',
		'legalNumber|18': /[0-9]/,
		'createTime': '@date',
		'approvalstatus': '审批中|审批通过'
	});
}