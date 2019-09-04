<template>
	<div id="page_login">
		<div class="container">
			<!--左侧宣传区域-->
			<div class="left">
				<img class="publicityPic" src="./../images/loginBg.png" alt="">
			</div>
			<!--/左侧宣传区域-->
			<!--右侧登录框-->
			<div class="right">
				<div class="box">
					<!--登录方式选择-->
					<div class="loginType">
						<div class="active"><span>密码登录</span></div>
						<div><span>二维码登录</span></div>
					</div>
					<!--/登录方式选择-->
					<form action="">
						<div class="inputGroup">
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAPFBMVEUAAACZmZmampqZmZmXl5eXl5eZmZmZmZmZmZmZmZmfn5+YmJiZmZmXl5eYmJiZmZmZmZmZmZmYmJiZmZnHKcGcAAAAE3RSTlMA4DDwQCDAoE/PENCAXpBw77GUP8a+nwAAAJJJREFUGNNdj1sOxCAIRUVBfLS1Lfvf6xhHhfR8GHJDrhw3ObNIRGcpUbg1lqeYkMNYwnBohpL+QxLa4QFrMqsx6qSVeU312uG5qqiXbyCWcVmuTvEBElGC4J3hBOlAsotZ6vO+XCXTzm7w0wJuXD68lQuLn1/b9jpuboFsSMMUhoRyQX9UQvVwNut9gl3GfQj+B+T4BGteRKWaAAAAAElFTkSuQmCC" alt="icon">
							<input type="text" v-model="username" placeholder="请输入用户名" auto-focus="auto-focus" @keyup.enter="login"/>
						</div>
						<div class="inputGroup">
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAOVBMVEUAAACXl5eZmZmYmJiYmJiXl5eZmZmampqYmJiZmZmYmJiZmZmYmJiZmZmYmJiZmZmfn5+ZmZmZmZkK8frLAAAAEnRSTlMAQIC/nyDwMJDgYFDf0LBwEKCZBaiTAAAAfUlEQVQY053P2Q7CIBCFYYad0s3//R/WhpJ00BqN54YzHwmL6Qne4XwwY2qkuEKcBk1EORYpJM1LHxOL0p1Hb5n9YmHrbUM0y9W+sFiPty2tnRuB17RPWazR6bNFBpafuObphgMQ3jkBcnPIyvrhyv+5MjudmfOhOaIT82FPsEMHdtuIZP8AAAAASUVORK5CYII=" alt="icon">
							<input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="login"/>
						</div>
						<div class="passwordOpt">
							<label class="remember">
								<input type="checkbox"/>
								记住密码
							</label>
							<label class="forgot">
								<a href="">忘记密码？</a>
							</label>
						</div>
						<button type="button" @click="login" v-text="loading ? '登录中...' : '登录'"></button>
					</form>
				</div>
			</div>
			<!--/右侧登录框-->
		</div>
		<!--提示框-->
		<div v-cloak class="tipsBox" :class="{show: requestMsg}">
			{{requestMsg}}
		</div>
		<!--/提示框-->
	</div>
</template>

<script>
	const MD5 = require('md5');
	import util from './../modules/util';
	export default {
		name: "login",
		props: {},
		computed: {},
		data () {
			return {
				// 加载提示标识
				loading: false,
				// 用户名
				username: '',
				// 密码
				password: '',
				// 请求回应提示
				requestMsg: '',
				// 提示框定时器
				t_msg: null
			};
		},
		watch: {},
		methods: {
			/**
			 * 登录
			 *
			 * @auther: 陈宇驰
			 * @date: 21/6/19 下午3:07
			 */
			login () {
				if (!this.username || !this.password) { // 没有输入用户名或密码
					this.showMsg('请输入用户名和密码');
					return;
				}
				this.loading = true;
				this.$http.post('/login/checkUser', {
					account: this.username,
					password: MD5(this.password)
				}).then(res => {
					this.loading = false;
					if (res.data.code == 0) { // 登录成功
						util.setCookie('token', res.data.data.token, 1);
						window.location.href = './index.html';
					} else { // 登录失败
						this.showMsg(res.data.message);
					}
				}).catch( err => {
					this.loading = false;
					console.log(err);
				})
			},
			/**
			 * 登录接口回应提示
			 *
			 * @param: {Stirng}msg 提示文字
			 * @auther: 陈宇驰
			 * @date: 21/6/19 下午3:07
			 */
			showMsg (msg) {
				clearTimeout(this.t_msg);
				this.requestMsg = msg;
				this.t_msg = setTimeout(() => {
					this.requestMsg = '';
				}, 3000);
			}
		},
		mounted () {
		}
	}
</script>

<style lang="less">
	@theme: #4E69EA;
	@import "./../styles/init.less";
	@import "./../styles/util.less";
	#page_login{
		background-color: #edeff2;
		width: 100%;
		height: 100%;
		overflow: auto;
		.container{
			width: 100%;
			height: 100%;
			display: table;
			margin: 0px auto;
			min-width: 1024px;
			.left,
			.right{
				display: table-cell;
				height: 100%;
				text-align: center;
				vertical-align: middle;
			}
			.left{
				width: 55%;
				.publicityPic{
					width: 85%;
					max-width: 800px;
					margin: 0px auto;
				}
			}
			.right{
				background-color: #fff;
				width: 45%;
				min-width: 475px;
				.box{
					display: inline-block;
					width: 360px;
					height: 360px;
					padding: 20px 35px;
					.boxShadow(0px 0px 40px #ddd);
					.radius(20px);
					.loginType{
						text-align: center;
						padding-bottom: 10px;
						>div{
							display: inline-block;
							padding: 10px;
							margin: 0px 10px;
							>span{
								display: inline-block;
								font-size: 16px;
								color: #888;
								&:after{
									position: absolute;
									bottom: -10px;
									left: 0px;
									content: '';
									height: 3px;
									background-color: #888;
									width: 0%;
									.animation(.3s);
									.radius(10px)
								}
							}
							&.active{
								span{
									color: @theme;
									&:after{
										background-color: @theme;
										width: 100%;
									}
								}
							}
							&:hover{
								cursor: pointer;
								span{
									&:after{
										display: block;
										width: 100%;
									}
								}
							}
						}
					}
					form{
						.inputGroup{
							margin-top: 25px;
							img{
								position: absolute;
								left: 3px;
								top: 0px;
								bottom: 0px;
								margin: auto;
								z-index: 1;
							}
							input[type='text'],
							input[type='password']{
								height: 45px;
								width: 100%;
								padding-left: 40px;
								border: none;
								border-bottom: 1px solid #ddd;
								font-size: 15px;
								color: #444;
								letter-spacing: 1px;
								.animation(.3s);
								&:focus{
									border-color: @theme;
								}
							}
						}
						.passwordOpt{
							margin-top: 20px;
							overflow: hidden;
							>label{
								display: inline-block;
								float: left;
								color: #666;
								font-size: 14px;
								cursor: pointer;
								&.forgot{
									float: right;
								}
								input[type="checkbox"]{
									height: 15px;
									width: 15px;
								}
								a{
									color: #666;
									&:hover{
										text-decoration: underline!important;
										color: @theme;
									}
								}
							}
						}
						button{
							border: none;
							background-color: @theme;
							font-size: 16px;
							color: #fff;
							height: 45px;
							width: 100%;
							margin-top: 35px;
							.radius(50px);
							.animation();
							&:hover{
								background-color: darken(@theme, 10%);
								cursor: pointer;
							}
						}
					}
				}
			}
		}
		.tipsBox{
			position: absolute;
			top: 20px;
			left: 0px;
			right: 0px;
			margin: auto;
			width: 280px;
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			color: #f0a93a;
			background-color: #fef6eb;
			border: 1px solid #eed0c7;
			padding: 0px 20px;
			text-align: center;
			.opacity(0);
			.radius(3px);
			.animation();
			&.show{
				top: 40px;
				.opacity(1);
			}
		}
	}
</style>