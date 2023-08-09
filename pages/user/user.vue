<template>
	<view class="content">
		<view class="userbox">
			<view class="userinfo" @tap="login">
				<image :src="isLogin ? member.avatar : '../../static/user1.png'" mode=""></image>
				<view>
					<text class="name">{{ isLogin ? member.nickname : "游客"}}</text>
					<text class="des">{{ isLogin ? "您好" : "欢迎登录"}}</text>
				</view>
			</view>
		</view>
		<view class="main_link">
			<view class="label">
				<view class="icon">
					<image src="../../static/user2.png" mode="widthFix"></image>
					<text>我的积分</text>
				</view>
				<view class="right" @click="link('/pages/user/integral')">
					<text>{{ integral }}</text>
					<image src="../../static/user3.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="label" @click="link('/pages/user/orders')">
				<view class="icon">
					<image src="../../static/user7.png" mode="widthFix"></image>
					<text>我的订单</text>
				</view>
				<view class="right">
					<text v-if="toBeUsed > 0">{{ toBeUsed }}个待使用</text>
					<image src="../../static/user3.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="label" @click="link('/pages/user/ticket')">
				<view class="icon">
					<image src="../../static/user5.png" mode="widthFix"></image>
					<text>我的礼券</text>
				</view>
				<view class="right">
					<image src="../../static/user3.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="label" @click="link('/pages/user/address')">
				<view class="icon">
					<image src="../../static/user.png" mode="widthFix"></image>
					<text>地址管理</text>
				</view>
				<view class="right">
					<image src="../../static/user3.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="label" @click="link('/pages/user/info')">
				<view class="icon">
					<image src="../../static/user6.png" mode="widthFix"></image>
					<text>乘客信息</text>
				</view>
				<view class="right">
					<image src="../../static/user3.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="label" @click="scanCode" v-if="isSuper">
				<view class="icon">
					<image src="../../static/scancode.png" mode="widthFix"></image>
					<text>扫码核销</text>
				</view>
				<view class="right">
					<image src="../../static/user3.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="footer">
			<view v-if="isLogin">
				<button @tap="logout">退出登录</button>
			</view>
			<view>
				<image src="../../static/user4.png" mode="widthFix"></image>
				<text> 客服电话：</text>
			</view>
			<text>       
400-000-0000,10:00-18:00</text>
		</view>
		<footers :currentx='3'></footers>
	</view>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
	import { IsLogin, MemberInfo, MemberDetail } from '@/api/member'
	import footers from '@/compontents/footers/footers.vue'
	export default {
		components:{
			footers: footers
		},
		data() {
			return {
				isLogin: false,
				integral: 0,
				member: {},
				isSuper:false,
				toBeUsed: 0,
			}
		},
		computed: {
			//...mapState(['member']),
			//...mapGetters(['isLogin'])
		},
		created() {
			var that = this
			this.isLogin = IsLogin() ? true : false
			this.member = MemberInfo()
			if (this.isLogin) {
				MemberDetail({}, (res) => {
					if (res.code !== 0) {
						uni.showModal({
							title: '错误提示',
							content: '网络异常，请稍后重试',
							showCancel: false
						})
						return 
					}
					that.integral = res.data.integral 
					that.isSuper = res.data.is_super ? true : false
					that.toBeUsed = res.data.to_be_used
					console.log(that.integral)
				})
			}
		},
		methods: {
			login() {
				if (!IsLogin()) {
					console.log('not login, to login page')
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				return 
			},
			logout() {
				uni.clearStorageSync()
				uni.navigateTo({
					url: '/pages/user/user'
				})
			},
			link(url) {
				uni.navigateTo({
					url,
				})
			},
			scanCode() {
				var that = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function (res) {
						console.log('条码类型：' + res.scanType)
						console.log('条码内容：' + res.result)
						if (res.scanType != "QR_CODE") {
							uni.showModal({
								title: '错误提示',
								content: '不能识别的二维码',
								showCancel: false
							})
							return 
						}
						let orderId = that.getQueryVariable(res.result, 'id')
						if (orderId == '') {
							uni.showModal({
								title: '错误提示',
								content: '二维码解析有误',
								showCancel: false
							})
							return 
						}
						uni.navigateTo({
							url: '/pages/order_completion/order_check?id='+orderId,
						})
						
					},
					fail: function() {
						uni.showModal({
							title: '错误提示',
							content: '扫码错误',
							showCancel: false
						})
						return 
					}
				})
			},
			getQueryVariable(url, name) {
				let vars = url.split("?")[1].split("&")
				for (let i=0;i<vars.length;i++) {
					let pair = vars[i].split("=");
					if(pair[0] == name){
						return pair[1]
					}
				}
				return ''
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F7F7F7;
	}
	.content{
		width: 100%;
		min-height: 100vh;
		.footer{
			overflow: hidden;
			margin-top: 80rpx;
			& > text{
				display: block;
				text-align: center;
				font-size: 28rpx;
				opacity: 0.6;
				color: #333333;
			}
			view{
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 15rpx;
				image{
					width: 32rpx;
					margin-right: 8rpx;
				}
				text{
					font-size: 28rpx;
					opacity: 0.6;
					color: #333333;
				}
			}
		}
		.main_link{
			width: 702rpx;
			margin: 0 auto;
			position: relative;
			z-index: 9;
			margin-top: -55rpx;
			.label{
				overflow: hidden;
				width: 100%;
				height: 130rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 38rpx 0 40rpx;
				margin-bottom: 16rpx;
				.icon{
					display: flex;
					align-items: center;
					image{
						width: 40rpx;
						margin-right: 24rpx;
					}
					text{
						font-size: 28rpx;
						color: #333333;
					}
				}
				.right{
					display: flex;
					align-items: center;
					image{
						width: 15rpx;
						margin-left: 13rpx;
					}
					text{
						font-size: 28rpx;
						color: #333333;
						opacity: 0.5;
					}
				}
			}
		}
		.userbox{
			width: 100%;
			height: 300rpx;
			background-image: url('https://qietu.ahqian.com/xiaot/5.12/userbg.png');
			background-size: 100%;
			background-position: bottom center;
			padding: 60rpx 64rpx 0 64rpx;
			.userinfo{
				display: flex;
				align-items: center;
				image{
					width: 107rpx;
					height: 107rpx;
					border-radius: 50%;
				}
				view{
					margin-left: 30rpx;
					.name{
						display: block;
						font-size: 32rpx;
						font-weight: 500;
						color: #fff;
						margin-bottom: 19rpx;
						letter-spacing: 1rpx;
					}
					.des{
						display: block;
						font-size: 24rpx;
						opacity: 0.5;
						font-weight: 500;
						color: #fff;
						letter-spacing: 1rpx;
					}
				}
			}
		}
	}
</style>
