/**
 * @Auther: 陈宇驰
 * @Date: 28/8/19 15:02
 * @Description:
 */
const Echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/toolbox');

const echart = {
	/**
	 * 柱状图
	 *
	 * @param {Object} option
	 * @param {Function} echartOpt
	 */
	bar (option = {}, resetOpt) {
		var initOpt = {
			title: {},
			x: {},
			y: {},
			toolbox: {},
			tooltip: {},
			item: {},
			label: {},
			legend: {}
		}
		initOpt = Object.assign(initOpt, option);
		if (!initOpt.dom) return;
		var myChart = Echarts.init(initOpt.dom);

		var myOpt = {
			title: {
				text: initOpt.title && initOpt.title.text || '',
				textStyle: {
					color: initOpt.title.color || '#333',
					fontSize: initOpt.title.fontSize || 20
				},
				x: 'center',
				top: initOpt.title.top || 5
			},
			legend: {
				show: initOpt.legend.show && true,
				data: initOpt.legend.data || initOpt.item.name,
				orient: initOpt.legend.orient || 'horizontal',
				top: initOpt.legend.top || 'auto',
				right: initOpt.legend.right || 'auto'
			},
			toolbox: {
				feature: {
					dataView: {show: true, readOnly: false},
					magicType: {show: true, type: ['line', 'bar']},
					restore: {show: true},
					saveAsImage: {show: true}
				},
				top: 5,
				right: 10,
				show: initOpt.toolbox.show === undefined ? true : initOpt.toolbox.show
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					}
				},
				formatter: initOpt.tooltip.formatter || '{a}<br/>{b} ： {c}' + (initOpt.y.unit || '')
			},
			grid: {
				left: initOpt.left || 20,
				right: initOpt.right || 20,
				top: initOpt.top || (initOpt.title.text? 60 : 20),
				bottom: initOpt.bottom || 20,
				containLabel: true
			},
			xAxis: {
				data: initOpt.x.label || [],
				name: initOpt.x.unit || '',
				nameTextStyle: {
					color: initOpt.x.unitColor || '#999',
					fontSize: initOpt.x.unitFontSize || 12
				},
				axisLabel: {
					color: initOpt.x.labelColor || '#333',
					fontSize: initOpt.x.labelFontSize || 13
				},
				axisPointer: {
					type: 'shadow'
				}
			},
			yAxis: {
				name: initOpt.y.unit || '',
				nameTextStyle: {
					color: initOpt.y.unitColor || '#999',
					fontSize: initOpt.y.unitFontSize || 12
				},
				axisLabel: {
					color: initOpt.y.labelColor || '#333',
					fontSize: initOpt.y.labelFontSize || 13
				}
			},
			series: []
		}
		if(initOpt.x.data.length == 1){
			myOpt.series.push({
				name: initOpt.item.name || '',
				type: 'bar',
				data: initOpt.x.data[0] || [],
				barWidth: initOpt.item.width || '45%',
				label: {
					normal: {
						show: initOpt.label.show && true,
						position: initOpt.label.position || 'top',
						fontSize: initOpt.label.fontSize || 13,
						textShadowColor: '#fff'
					}
				},
				itemStyle: {
					barBorderRadius: initOpt.item.radius || [0, 0, 0, 0],
					color: initOpt.item.color || '#28b'
				}
			})
		}else{
			initOpt.x.data.forEach((elem,i) => {
				myOpt.series.push({
					name: initOpt.item.name[i],
					type: 'bar',
					data: elem,
					barWidth: initOpt.item.width || '45%',
					label: {
						normal: {
							show: initOpt.label.show && true,
							position: initOpt.label.position || 'top',
							fontSize: initOpt.label.fontSize || 13,
							textShadowColor: '#fff'
						}
					},
					itemStyle: {
						barBorderRadius: initOpt.item.radius || [0, 0, 0, 0],
						color: initOpt.item.color[i] || '#28b'
					}
				})
			});
			myOpt.legend.show = initOpt.legend.show === undefined ? true : initOpt.legend.show;
			myOpt.legend.top = initOpt.title.text ? 60 : 20;
		}
		if (typeof resetOpt == 'function') {
			myOpt = resetOpt(myOpt);
		}
		myChart.setOption(myOpt);
		return myChart;
	},
	/**
	 * 折线图
	 *
	 * @param {Object} option
	 * @param {Object} echartOpt
	 */
	line (option = {}, resetOpt) {
		var initOpt = {
			title: {},
			x: {},
			y: {},
			toolbox: {},
			tooltip: {},
			item: {},
			label: {},
			legend: {}
		}
		initOpt = Object.assign(initOpt, option);
		if (!initOpt.dom) return;
		var myChart = Echarts.init(initOpt.dom);

		var myOpt = {
			title: {
				text: initOpt.title && initOpt.title.text || '',
				textStyle: {
					color: initOpt.title.color || '#333',
					fontSize: initOpt.title.fontSize || 20
				},
				x: 'center',
				top: initOpt.title.top || 10
			},
			legend: {
				show: initOpt.legend.show && true,
				data: initOpt.legend.data || initOpt.item.name,
				orient: initOpt.legend.orient || 'horizontal',
				top: initOpt.legend.top || 'auto',
				right: initOpt.legend.right || 'auto'
			},
			toolbox: {
				feature: {
					dataView: {show: true, readOnly: false},
					magicType: {show: true, type: ['line', 'bar']},
					restore: {show: true},
					saveAsImage: {show: true}
				},
				top: 10,
				right: 10,
				show: initOpt.toolbox.show === undefined ? true : initOpt.toolbox.show
			},
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				left: initOpt.left || 20,
				right: initOpt.right || 20,
				top: initOpt.top || (initOpt.title.text? 60 : 20),
				bottom: initOpt.bottom || 20,
				containLabel: true
			},
			xAxis: {
				data: initOpt.x.label || [],
				type: 'category',
				boundaryGap: false,
				name: initOpt.x.unit || '',
				nameTextStyle: {
					color: initOpt.x.unitColor || '#999',
					fontSize: initOpt.x.unitFontSize || 12
				},
				axisLabel: {
					color: initOpt.x.labelColor || '#333',
					fontSize: initOpt.x.labelFontSize || 13
				}
			},
			yAxis: {
				type: 'value',
				name: initOpt.y.unit || '',
				nameTextStyle: {
					color: initOpt.y.unitColor || '#999',
					fontSize: initOpt.y.unitFontSize || 12
				},
				axisLabel: {
					color: initOpt.y.labelColor || '#333',
					fontSize: initOpt.y.labelFontSize || 13
				}
			},
			series: []
		}
		if(initOpt.x.data.length == 1){
			myOpt.series.push({
				name: initOpt.item.name || '',
				type: 'line',
				data: initOpt.x.data[0],
				label: {
					normal: {
						show: initOpt.label.show && true,
						position: initOpt.label.position || 'top',
						fontSize: initOpt.label.fontSize || 13,
						textShadowColor: '#fff'
					}
                },
                areaStyle: {
                    opacity: 0
                },
				itemStyle: {
					color: initOpt.item.color || '#28b'
				}
			})
		}else{
			initOpt.x.data.forEach((elem,i) => {
				myOpt.series.push({
					name: initOpt.item.name[i],
					type: 'line',
					data: elem,
					label: {
						normal: {
							show: initOpt.label.show && true,
							position: initOpt.label.position || 'top',
							fontSize: initOpt.label.fontSize || 13,
							textShadowColor: '#fff'
						}
					},
					itemStyle: {
						color: initOpt.item.color[i] || '#28b'
					}
				})
			});
			myOpt.legend.show = initOpt.legend.show === undefined ? true : initOpt.legend.show;
			myOpt.legend.top = initOpt.title.text ? 60 : 20;
		}
		if (typeof resetOpt == 'function') {
			myOpt = resetOpt(myOpt);
		}
		myChart.setOption(myOpt);
		return myChart;
	},
	/**
	 * 饼状图
	 *
	 * @param {Object} option
	 * @param {Object} echartOpt
	 */
	pie (option = {}, resetOpt) {
		var initOpt = {
			title: {},
			data: [],
			toolbox: {},
			tooltip: {},
			item: {},
			legend: {}
		}
		initOpt = Object.assign(initOpt, option);
		if (!initOpt.dom) return;
		var myChart = Echarts.init(initOpt.dom);

		var myOpt = {
			title: {
				text: initOpt.title && initOpt.title.text || '',
				textStyle: {
					color: initOpt.title.color || '#333',
					fontSize: initOpt.title.fontSize || 20
				},
				x: 'center',
				top: initOpt.title.top || 10
			},
			legend: {
				show: initOpt.legend.show === undefined ? true : initOpt.legend.show,
				data: initOpt.legend.data || initOpt.item.name,
				orient: initOpt.legend.orient || 'vertical',
				top: initOpt.legend.top || '20%',
				right: initOpt.legend.right || '10%'
			},
			toolbox: {
				feature: {
					dataView: {show: true, readOnly: false},
					restore: {show: true},
					saveAsImage: {show: true}
				},
				top: 10,
				right: 10,
				show: initOpt.toolbox.show && true
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			calculable : true,
			series: [{
				name: initOpt.item.name || '',
				type: 'pie',
				radius : initOpt.item.radius || [90, 150],
				center : initOpt.item.center || ['50%', '50%'],
				data: initOpt.data,
				label: {
					formatter: '{b}\n{c}\n{d}%'
				}
			}]
		}
		if (typeof resetOpt == 'function') {
			myOpt = resetOpt(myOpt);
		}
		myChart.setOption(myOpt);
		return myChart;
	}
}

export default echart;