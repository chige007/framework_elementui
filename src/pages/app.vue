<template>
	<el-container id="myApp_container">
		<!--菜单栏-->
		<el-aside :width="isCollapse ? '55px' : '200px'">
			<el-container>
				<el-header :height="isCollapse ? '70px' : '125px'">
					<!--logo-->
					<div class="logo">
						<!--<img src="../images/logo_32.png" alt="">-->
						<span v-show="!isCollapse">云浮中小微企业金融服务平台</span>
					</div>
					<!--/logo-->
					<!--菜单搜索栏-->
					<div v-show="!isCollapse" class="searchbar">
						<input type="text" placeholder="搜索菜单" v-model="menu_keyword" @keyup.13="searchMenus">
						<i class="icon i-search" @click="searchMenus"></i>
					</div>
					<!--/菜单搜索栏-->
				</el-header>
				<el-main>
					<!--菜单列表-->
					<el-menu :default-active="currentActive" :collapse="isCollapse">
						<my-home-menu ref="homeMenu" v-for="(x, index) in menus" :key="x.title" :menu-option="x" :index="index + ''" @handle="menuClick"></my-home-menu>
					</el-menu>
					<!--/菜单列表-->
				</el-main>
			</el-container>
		</el-aside>
		<!--/菜单栏-->
		<el-container>
			<el-header class="header" height="50px">
				<!--头部菜单栏-->
				<el-menu mode="horizontal">
					<!--左侧菜单栏收缩按钮-->
					<div class="toggleLeft" @click="toggleLeft">
						<i class="icon" :class="{'i-hide-menus': !isCollapse, 'i-show-menus': isCollapse}"></i>
					</div>
					<!--/左侧菜单栏收缩按钮-->
					<el-menu-item index="3">
						<el-dropdown @command="personalHandle">
							<div class="dropdown">
								<img class="portrait" src="../images/portrait.png" alt="">
								<span class="el-dropdown-link">管理员</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="editInfo">修改个人资料</el-dropdown-item>
									<el-dropdown-item command="exit">退出系统</el-dropdown-item>
								</el-dropdown-menu>
							</div>
						</el-dropdown>
					</el-menu-item>
					<el-menu-item index="1">
						<i class="icon i-message"></i>
						<!--<span>消息</span>-->
						<el-badge :value="102" :max="99"  class="item">消息</el-badge>
					</el-menu-item>
					<el-menu-item index="2">
						<i class="icon i-waitHandler"></i>
						<el-badge :value="12" :max="99"  class="item">待办</el-badge>
					</el-menu-item>
				</el-menu>
				<!--/头部菜单栏-->
			</el-header>
			<!--主体内容-->
			<el-main class="content" :style="{'background-color': bgColor}">
				<router-view @setBgColor="setBgColor"></router-view>
			</el-main>
			<!--/主体内容-->
		</el-container>
	</el-container>

</template>

<script>
var menus = require('./../json/home_menu.json');
export default {
	name: 'app',
	data () {
		return {
			// 菜单搜索关键字
			menu_keyword: '',
			menu_keyword_result: '',
			// 左侧菜单栏是否收起
			isCollapse: false,
			// 左侧菜单栏
			menus: menus,
			// 背景颜色
            bgColor: '#fff',
            // 当前菜单选择索引
            currentActive: '0'
		}
    },
	computed: {
	},
	components: {
    },
	methods: {
		/**
		 * 收起/展开菜单栏
		 *
		 * @auther: 陈宇驰
		 * @date: 1/5/19 上午9:52
		 */
		toggleLeft () {
			this.$set(this.$data, 'isCollapse', !this.isCollapse);
		},
		/**
		 * 菜单栏点击事件
		 *
		 * @param: {String}url 菜单加载地址
		 * @param: {String}index 菜单索引
		 * @auther: 陈宇驰
		 * @date: 1/5/19 上午9:52
		 */
		menuClick (url, index) {
			this.$router.push({
				path: url
			});
            this.bgColor = '#fff';
            this.currentActive = index + '';
		},
		/**
		 * 登录用户个人操作
		 *
		 * @param: {String}指令标识
		 * @auther: 陈宇驰
		 * @date: 11/6/19 上午11:41
		 */
		personalHandle (cammand) {
			if (cammand == 'editInfo') {
				alert('编辑个人信息');
			} else if (cammand == 'exit') {
				this.$confirm('是否确认退出系统？').then(_ => {
					// done();
					this.$http.post('login/logout').then(res => {
						if (res.data.code == 0) { // 注释
							window.location.href = './login.html';
						}
					});
				}).catch(_ => {});
			}
		},
		/**
		 * 设置菜单关键字
		 *
		 * @auther: 陈宇驰
		 * @date: 11/6/19 下午2:07
		 */
		searchMenus () {
			this.$set(this.$data, 'menu_keyword_result', this.menu_keyword);
		},
		/**
		 * 匹配菜单关键字
		 *
		 * @param: {String}菜单标题
		 * @auther: 陈宇驰
		 * @date: 11/6/19 下午2:07
		 */
		testMenuName (menuName) {
			if(menuName.indexOf(this.menu_keyword_result) == -1)
				return false
			else
				return true;
		},
		/**
		 * 更换背景颜色
		 *
		 * @param: {String}color 颜色色值
		 * @auther: 陈宇驰
		 * @date: 28/8/19 上午9:50
		 */
		setBgColor (color) {
			this.$nextTick(_ => {
				this.bgColor = color;
			})
        },
        findMenuIndex (menus, path) {
            let index = '0';
            // 遍历菜单
            for (var i = 0 ; i < menus.length ; i++) {
                let menu = menus[i];
                if (menu.menuOption.url == path) { //
                    index = menu.index;
                    return index;
                } else if (menu.$children.length && menu.$children[0]['$children'].length) {
                    let index = this.findMenuIndex(menu.$children[0]['$children'], path);
                    if (index) {
                        return index;
                    }
                }
            };
            return false;
        }
	},
	mounted () {
        this.$router.afterEach((to, from) => {
            let path = to.path;
            if (path != '/' && this.currentActive == '0') { //
               let index = this.findMenuIndex(this.$refs.homeMenu, path);
               if (index) {
                   this.currentActive = index;
               }
            }
        });
	}
}
</script>

<style lang="less">
	@theme: #4E69EA;
	@topBarHeight: 50px;
	#myApp_container{
		width: 100%;
		height: 100%;
		/*左侧菜单栏*/
		>.el-aside{
			background-color: #353D59;
			transition: all 0.3s;
			>.el-container{
				height: 100%;
				padding: 0px;
				>.el-header{
					padding: 0px;
					z-index: 1;
					/*logo*/
					.logo{
						height: @topBarHeight;
						line-height: @topBarHeight;
						color: #cde;
						/*font-size: 18px;*/
						padding: 0px 10px;
						white-space: nowrap;
						>*{
							display: inline-block;
							vertical-align: middle;
						}
						span{
							white-space: nowrap;
							font-size: 14px;
						}
					}
					/*菜单搜索栏*/
					.searchbar{
						width: 90%;
						margin: 20px auto;
						input{
							font-size: 14px;
							height: 35px;
							width: 100%;
							border: none;
							border-radius: 3px;
							padding: 5px 10px;
							background-color: #4e5983;
							color: #999;
							transition: all 0.3s;
							&:focus{
								background-color: #fff;
							}
						}
						.icon{
							font-size: 18px;
							position: absolute;
							width: 30px;
							height: 100%;
							right: 0px;
							top: 0px;
							color: #999;
							line-height: 35px;
							cursor: pointer;
						}
					}
				}
				>.el-main{
					padding: 0px;
					/*左侧菜单栏*/
					.el-menu{
						background-color: transparent;
						border: none;
						.el-submenu .el-submenu__title,
						.el-menu-item{
							color: #b8c7ce;
							height: 45px;
							line-height: 43px;
							&:hover{
								background-color: #4e5983;
							}
							&.is-active{
								background-color: #4e5983;
								border-left: 4px solid @theme;
							}
							i{
								color: inherit;
							}
						}
						/*左侧菜单栏收起*/
						&.el-menu--collapse{
							width: 55px;
						}
					}
				}
			}
		}
		>.el-container{
			>.header{
				background-color: #fff;
				padding: 0px;
				z-index: 1;
				/*头部菜单栏*/
				.el-menu--horizontal{
					.el-menu-item{
						float: right;
						height: @topBarHeight;
						line-height: @topBarHeight;
						.dropdown{
							vertical-align: top;
							.portrait{
								height: 30px;
								margin-right: 4px;
							}
						}
						.el-badge{
							line-height: 26px;
						}
						&:hover{
							background-color: #f2f2f2;
						}
						&.is-active{
							border-bottom: none;
						}
					}
					/*左侧菜单栏收起按钮*/
					.toggleLeft{
						display: inline-block;
						vertical-align: top;
						height: @topBarHeight;
						line-height: @topBarHeight;
						width: @topBarHeight;
						text-align: center;
						cursor: pointer;
						float: left;
						.icon{
							font-size: 16px;
							color: #444;
						}
						&:hover{
							background-color: #f2f2f2;
						}
						&:hover,&:active,&:focus,&:focus:active{
							text-decoration: none!important;
							outline: none!important;
							box-shadow: none!important;
						}
					}
				}
			}
			/*主题内容*/
			>.content{
				/*background-color: #E4Eaec;*/
				padding: 10px;
			}
		}
	}
</style>