<template>
<div class="page" id="page_home">
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="statistics module" v-loading="totalInfoLoading">
                <div class="wrap">
                    <div class="item">
                        <i class="icon i-user"></i>
                        <p class="title">注册用户</p>
                        <p class="number">{{totalInfo.userCounts}} <span class="unit">个</span></p>
                    </div>
                    <div class="item">
                        <i class="icon i-task"></i>
                        <p class="title">业务申请量</p>
                        <p class="number">{{totalInfo.applicationCounts}} <span class="unit">笔</span></p>
                    </div>
                    <div class="item">
                        <i class="icon i-institution"></i>
                        <p class="title">合作伙伴</p>
                        <p class="number">{{totalInfo.institutionCounts}} <span class="unit">个</span></p>
                    </div>
                    <div class="item">
                        <i class="icon i-money"></i>
                        <p class="title">产品数量</p>
                        <p class="number">{{totalInfo.productCounts}} <span class="unit">个</span></p>
                    </div>
                    <div class="item">
                        <i class="icon i-medal"></i>
                        <p class="title">信用体验量</p>
                        <p class="number">{{totalInfo.creditApplyCounts}} <span class="unit">次</span></p>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="statistics_user_bar module hasDateSelector" v-loading="loading_chart_1">
                <div class="dateSelector">
                    <el-radio-group v-model="radio_chart_1" size="small">
                        <el-radio-button :label="7">近7天</el-radio-button>
                        <el-radio-button :label="30">近一个月</el-radio-button>
                        <el-radio-button :label="90">近三个月</el-radio-button>
                        <el-radio-button :label="180">近6个月</el-radio-button>
                        <el-radio-button :label="365">近一年</el-radio-button>
                        <!-- <el-radio-button :label="0">全部</el-radio-button> -->
                    </el-radio-group>
                </div>
                <div class="wrap_chart" ref="statistics_user_bar">

                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="statistics_business_bar module hasDateSelector" v-loading="loading_chart_2">
                <div class="dateSelector">
                    <el-radio-group v-model="radio_chart_2" size="small">
                        <el-radio-button :label="7">近7天</el-radio-button>
                        <el-radio-button :label="30">近一个月</el-radio-button>
                        <el-radio-button :label="90">近三个月</el-radio-button>
                        <el-radio-button :label="180">近6个月</el-radio-button>
                        <el-radio-button :label="365">近一年</el-radio-button>
                        <!-- <el-radio-button :label="0">全部</el-radio-button> -->
                    </el-radio-group>
                </div>
                <div class="wrap_chart" ref="statistics_business_bar">

                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="statistics_credit_bar module hasDateSelector" v-loading="loading_chart_3">
                <div class="dateSelector">
                    <el-radio-group v-model="radio_chart_3" size="small">
                        <el-radio-button :label="7">近7天</el-radio-button>
                        <el-radio-button :label="30">近一个月</el-radio-button>
                        <el-radio-button :label="90">近三个月</el-radio-button>
                        <el-radio-button :label="180">近6个月</el-radio-button>
                        <el-radio-button :label="365">近一年</el-radio-button>
                        <!-- <el-radio-button :label="0">全部</el-radio-button> -->
                    </el-radio-group>
                </div>
                <div class="wrap_chart" ref="statistics_credit_bar">

                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="statistics_business_pie module" v-loading="loading_chart_4">
                <div class="wrap_chart" ref="statistics_business_pie">

                </div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import Echarts from '../modules/charts';
import { setInterval, clearTimeout, setTimeout} from 'timers';
import { userInfo } from 'os';
import { debuglog } from 'util';
export default {
    data() {
        return {
            // 加载总数信息标识
            totalInfoLoading: false,
            // 加载标识
            loading_chart_1: false,
            loading_chart_2: false,
            loading_chart_3: false,
            loading_chart_4: false,
            chart_user_bar: null,
            chart_business_bar: null,
            chart_credit_bar: null,
            chart_business_pie: null,
            // 总数信息
            totalInfo: {},
            // 用户统计区间选择
            radio_chart_1: 7,
            // 业务统计区间选择
            radio_chart_2: 7,
            // 信用体验选择
            radio_chart_3: 7
        }
    },
    watch: {
        // 监听用户统计区间选择
        radio_chart_1(val) {
            this.userBar(val);
        },
        // 用户业务统计区间选择
        radio_chart_2(val) {
            this.businessBar(val);
        },
        // 用户业务统计区间选择
        radio_chart_3(val) {
            this.creditBar(val);
        }
    },
    methods: {
        /**
         * 功能描述
         *
         * @param: {String | Number}num 距离今天几天前
         * @return: 
         * @auther: "陈宇驰"
         * @date: 2019-09-04 15:38:44
        */
        getDate(num) {
            num = num || 0;
            num = num * 1;
            if (typeof num == 'number' && !isNaN(num)) { // 时间格式
                let today = new Date();
                let time = today.getTime();
                let myTime = time - num * 24 * 60 * 60 * 1000;
                let myDate = new Date(myTime);
                let year = myDate.getFullYear();
                let month = myDate.getMonth() + 1;
                month = month < 10 ? '0' + month : month;
                let day = myDate.getDate();
                day = day < 10 ? '0' + day : day;
                return year + '-' + month + '-' + day;
            } else {
                return '';
            }
        },
        /**
         * 滚动数字效果
         *
         * @param: {String}key 修改数据名
         * @param: {String}num 最终值
         * @return: 
         * @auther: "陈宇驰"
         * @date: 2019-09-04 15:35:35
        */
        renderNumber(key, num) {
            num = num + '';
            num = num.split('');
            let count = 0;
            let t = setInterval(() => {
                let numArr = [];
                for (let i = 0 ; i < num.length ; i++) {
                    if (count < num[i] * 1) {
                        numArr.push(count);
                    } else {
                        numArr.push(num[i]);
                    }
                }
                count++;
                if (count > 9) {
                    clearTimeout(t);
                }
                this.$set(this.totalInfo, key, numArr.join(''));
            }, 80);
        },
        /**
        //  * 获取总数统计信息
         *
         * @auther: "陈宇驰"
         * @date: 2019-09-04 13:07:32
        */
        getTotalInfo() {
            this.totalInfoLoading = true;
            this.$util.request(this, 'statistics/manager/totalInfo', {}, res => {
                var data = res.data.data;
                this.totalInfoLoading = false;
                // this.totalInfo = res.data.data;
                this.renderNumber('userCounts', data.userCounts);
                this.renderNumber('applicationCounts', data.applicationCounts);
                this.renderNumber('institutionCounts', data.institutionCounts);
                this.renderNumber('productCounts', data.productCounts);
                this.renderNumber('creditApplyCounts', data.creditApplyCounts);
            }, e => {
                this.totalInfoLoading = false;
            }, false);
        },
        /**
         * 用户统计
         *
         * @param: {String}type 查询类型
         * @param: {Function}callback 渲染回调
         * @auther: "陈宇驰"
         * @date: 2019-09-04 13:07:54
        */
        userBar(type, callback) {
            if (typeof type != 'number') { // 非数字
                return;  
            }
            var renderType = 'bar';
            if (type > 30) { //
                renderType = 'line';
            }
            this.loading_chart_1 = true;
            this.$util.request(this, 'statistics/manager/countUserInfos', {
                'filter': {
                    'startDate': this.getDate(type),
                    'endDate': this.getDate(0)
                }
            }, res => {
                this.loading_chart_1 = false;
                let userInfos = res.data.data.userInfos;
                var labelArr = [];
                var dataArr = [];
                for (let i = 0 ; i < type ; i++) {
                    labelArr.push(this.getDate(type - i));
                    let data = userInfos.find(item => {
                        return item.key == labelArr[i];
                    });
                    if (data) { //
                        dataArr[i] = data.count;
                    } else {
                        dataArr[i] = 0;
                    }
                }
                this.chart_user_bar = Echarts[renderType]({
                    title: {
                        text: '用户注册情况'
                    },
                    dom: this.$refs.statistics_user_bar,
                    y: {
                        unit: '个'
                    },
                    x: {
                        data: [
                            dataArr
                        ],
                        name: '注册量',
                        label: labelArr
                    },
                    label: {
                        show: true
                    }
                }, opt => {
                    opt.series[0].barWidth = '30%';
                    opt.series[0].itemStyle = {
                        barBorderRadius: [100, 100, 0, 0],
                        color: '#348498'
                    };
                    opt.series[0].areaStyle = {
                        opacity: 0.5,
                        color: '#348498'
                    }
                    if (renderType == 'bar') { //
				        opt.xAxis.boundaryGap = true;
                    }
                    opt.toolbox.feature.dataView.show = false;
                    opt.toolbox.feature.restore.show = false;
                    return opt;
                });
                if (typeof callback == 'function') { // 有配置回调
                    callback();
                }
            }, err => {
                this.loading_chart_1 = false;
            }, false);
        },
        /**
         * 业务统计
         *
         * @param: {String}type 查询类型
         * @param: {Function}callback 回调
         * @auther: "陈宇驰"
         * @date: 2019-09-04 13:07:54
        */
        businessBar(type, callback) {
            if (typeof type != 'number') { // 非数字
                return;  
            }
            var renderType = 'bar';
            if (type > 30) { //
                renderType = 'line';
            }
            this.loading_chart_2 = true;
            this.$util.request(this, 'statistics/manager/countApplicationInfos', {
                'filter': {
                    'startDate': this.getDate(type),
                    'endDate': this.getDate(0)
                }
            }, res => {
                this.loading_chart_2 = false;
                let applicationInfos = res.data.data.applicationInfos;
                var labelArr = [];
                var dataArr = [];
                for (let i = 0 ; i < type ; i++) {
                    labelArr.push(this.getDate(type - i));
                    let data = applicationInfos.find(item => {
                        return item.key == labelArr[i];
                    });
                    if (data) { //
                        dataArr[i] = data.count;
                    } else {
                        dataArr[i] = 0;
                    }
                }
                this.chart_business_bar = Echarts[renderType]({
                    title: {
                        text: '业务申请情况'
                    },
                    dom: this.$refs.statistics_business_bar,
                    y: {
                        unit: '个'
                    },
                    x: {
                        data: [
                            dataArr
                        ],
                        name: '申请量',
                        label: labelArr
                    },
                    label: {
                        show: true
                    }
                }, opt => {
                    opt.series[0].barWidth = '30%';
                    opt.series[0].itemStyle = {
                        barBorderRadius: [100, 100, 0, 0],
                        color: '#f7b71d'
                    };
                    opt.series[0].areaStyle = {
                        opacity: 0.5,
                        color: '#f7b71d'
                    }
                    if (renderType == 'bar') { //
				        opt.xAxis.boundaryGap = true;
                    }
                    opt.toolbox.feature.dataView.show = false;
                    opt.toolbox.feature.restore.show = false;
                    return opt;
                });
                if (typeof callback == 'function') { // 有配置回调
                    callback();
                }
            }, err => {
                this.loading_chart_2 = false;
            }, false);
        },
        /**
         * 信用评分统计
         *
         * @param: {String}type 查询类型
         * @param: {Function}callback 回调
         * @auther: "陈宇驰"
         * @date: 2019-09-04 13:07:54
        */
        creditBar(type, callback) {
            if (typeof type != 'number') { // 非数字
                return;  
            }
            this.loading_chart_3 = true;
            this.$util.request(this, 'statistics/manager/countApplications', {
                'filter': {
                    'startDate': this.getDate(type),
                    'endDate': this.getDate(0)
                }
            }, res => {
                this.loading_chart_3 = false;
                let applications = res.data.data.applications;
                var labelArr = [];
                var dataArr = [];
                for (let i = 0 ; i < type ; i++) {
                    labelArr.push(this.getDate(type - i));
                    let data = applications.find(item => {
                        return item.key == labelArr[i];
                    });
                    if (data) { //
                        dataArr[i] = data.count;
                    } else {
                        dataArr[i] = 0;
                    }
                }
                this.chart_credit_bar = Echarts.line({
                    title: {
                        text: '信用体验情况'
                    },
                    dom: this.$refs.statistics_credit_bar,
                    y: {
                        unit: '次'
                    },
                    x: {
                        data: [
                            dataArr
                        ],
                        name: '体验次数',
                        label: labelArr
                    },
                    label: {
                        show: true
                    }
                }, opt => {
                    opt.series[0].areaStyle = {
                        opacity: 0.5,
                        color: '#05a19c'
                    }
                    opt.toolbox.feature.dataView.show = false;
                    opt.toolbox.feature.restore.show = false;
                    return opt;
                });
                if (typeof callback == 'function') { // 有配置回调
                    callback();
                }
            }, err => {
                this.loading_chart_3 = false;
            }, false);
        },
        /**
         * 业务申请类型统计
         *
         * @param: {String}type 查询类型
         * @return: echart对象
         * @auther: "陈宇驰"
         * @date: 2019-09-04 13:07:54
        */
        businessPie() {
            this.loading_chart_4 = true;
            this.$util.request(this, 'statistics/manager/countApplicationTypeInfos', {}, res => {
                this.loading_chart_4 = false;
                var applicationTypeInfos = res.data.data.applicationTypeInfos;
                var dataArr = [];
                for (let i = 0 ; i < applicationTypeInfos.length ; i++) {
                    dataArr.push({
                        name: applicationTypeInfos[i].key,
                        value: applicationTypeInfos[i].count
                    })
                };
                this.chart_business_pie = Echarts.pie({
                    title: {
                        text: '业务申请类型统计'
                    },
                    dom: this.$refs.statistics_business_pie,
                    data: dataArr,
                    label: {
                        show: true
                    }
                }, opt => {
                    opt.series[0].center = ['40%', '58%'];
                    opt.series[0].radius = [60, 120];
                    opt.legend.right = 5;
                    return opt;
                });
                if (typeof callback == 'function') { // 有配置回调
                    callback();
                }
            }, err => {
                this.loading_chart_4 = false;
            }, false)
        }
    },
    mounted() {
        // 设置背景色
        this.$emit('setBgColor', '#f3f4f6');
        // 获取总数信息
        this.getTotalInfo();
        this.userBar(this.radio_chart_1);
        this.businessBar(this.radio_chart_2);
        this.creditBar(this.radio_chart_3);
        this.businessPie();

        var t_chart_resize = null;
        window.addEventListener('resize', () => {
            t_chart_resize && clearTimeout(t_chart_resize);
            t_chart_resize = setTimeout(() => {
                this.chart_user_bar && this.chart_user_bar.resize();
                this.chart_business_bar && this.chart_business_bar.resize();
                this.chart_credit_bar && this.chart_credit_bar.resize();
                this.chart_business_pie && this.chart_business_pie.resize();
                if (document.body.clientWidth < 1200) { // 注释
                    this.chart_business_pie && this.chart_business_pie.setOption({
                        legend: {
                            show: false
                        },
                        series: [{
                            center: ['50%', '58%']
                        }]
                    });
                } else {
                    this.chart_business_pie && this.chart_business_pie.setOption({
                        legend: {
                            show: true
                        },
                        series: [{
                            center: ['40%', '58%']
                        }]
                    });
                }
            }, 400);
        });
    }
}
</script>

<style lang="less" scoped>
#page_home {
    min-width: 900px;
    background-color: #f3f4f6;
    padding: 7px 7px 0px 7px;

    .el-row {
        .el-col {
            padding: 0px 7px !important;

            .module {
                margin-bottom: 14px;
            }
        }
    }

    @media screen and (max-width: 1034px) {
        padding: 0px 5px;

        .el-row {
            .el-col {
                padding: 0px 5px !important;

                .module {
                    margin-bottom: 10px;
                }
            }
        }
    }

    .module {
        padding: 15px;
        border-radius: 4px;
        box-shadow: 0px 1px 3px #bbb;
        background-color: #fff;

        &.hasDateSelector{
            padding-top: 55px;
        }

        .title {
            font-size: 15px;
            color: #222;
        }

        .dateSelector{
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            padding: 10px;
            text-align: center;
        }

        .wrap_chart {
            width: 100%;
            height: 100%;
        }
    }

    .statistics {
        width: 100%;

        .wrap {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;

            .item {
                padding: 10px 10px 10px 65px;

                .icon {
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    bottom: 10px;
                    margin: auto;
                    width: 45px;
                    height: 45px;
                    text-align: center;
                    line-height: 45px;
                    color: #fff;
                    background-color: #333;
                    border-radius: 100px;
                    font-size: 18px;

                    &.i-user {
                        background-color: #348498;
                    }

                    &.i-task {
                        background-color: #f7b71d;
                    }

                    &.i-institution {
                        background-color: #ca3e47;
                    }

                    &.i-money {
                        background-color: #866ec7;
                    }

                    &.i-medal {
                        background-color: #05a19c;
                    }
                }

                p {
                    &.title {
                        font-size: 14px;
                        color: #888;
                    }

                    &.number {
                        font-size: 24px;
                        color: #222;

                        .unit {
                            color: #888;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    .statistics_user_bar {
        height: 400px;
    }

    .statistics_business_bar {
        height: 400px;
    }

    .statistics_credit_bar {
        height: 400px;
    }

    .statistics_business_pie {
        height: 400px;
    }
}
</style>
