<template>
	<view class="content">
		<view class="navbara">
			<view :style="{'height':statusBarHeight+'px'}"></view>
			<view class="child" :style="{height: navBarHeight+'px'}">
				<image src="../../static/logo.png" mode="widthFix"></image>
			</view>
		</view>
		<image src="https://qietu.ahqian.com/xiaot/5.12/banner.png" class="banner" mode="aspectFill"></image>
		<view class="navbar">
			<view @click="link('/pages/list/list')">
				<image src="../../static/home12.png" mode="widthFix"></image>
				<text>空中游览</text>
			</view>
			<view @click="link('/pages/Booking/Booking2')">
				<image src="../../static/home6.png" mode="widthFix"></image>
				<text>包机预定</text>
			</view>
			<view @click="link('/pages/date/date')">
				<image src="../../static/home7.png" mode="widthFix"></image>
				<text>城际摆渡</text>
			</view>
			<view @click="link('/pages/exchange/exchange')">
				<image src="../../static/home8.png" mode="widthFix"></image>
				<text>兑换礼券</text>
			</view>
			<view>
				<image src="../../static/home10.png" mode="widthFix"></image>
				<text>空中120</text>
			</view>
			<view>
				<image src="../../static/home9.png" mode="widthFix"></image>
				<text>中信优选</text>
			</view>
		</view>
		<view class="main_item">
			<text class="title">中信<text>优选</text></text>
			<scroll-view scroll-x="true" @click="link('/pages/list/info')">
				<view class="label">
					<view class="pic">
						<image src="https://qietu.ahqian.com/xiaot/5.12/home1.png" mode="aspectFill"></image>
					</view>
					<text>中信金沙湾公寓</text>
				</view>
				<view class="label">
					<view class="pic">
						<image src="https://qietu.ahqian.com/xiaot/5.12/home.png" mode="aspectFill"></image>
					</view>
					<text>中信金沙湾公寓</text>
				</view>
				<view class="label">
					<view class="pic">
						<image src="https://qietu.ahqian.com/xiaot/5.12/home3.png" mode="aspectFill"></image>
					</view>
					<text>中信金沙湾公寓</text>
				</view>
			</scroll-view>
		</view>
		<view class="main_item">
			<text class="title">最新<text>资讯</text></text>
			<scroll-view scroll-x="true" :scroll-with-animation='true'>
				<view class="label">
					<view class="pic">
						<image src="https://qietu.ahqian.com/xiaot/5.12/home5.png" mode="aspectFill"></image>
					</view>
					<text>空客H135试飞成功</text>
				</view>
				<view class="label">
					<view class="pic">
						<image src="https://qietu.ahqian.com/xiaot/5.12/home2.png" mode="aspectFill"></image>
					</view>
					<text>开通金沙湾空中游...</text>
				</view>
				<view class="label">
					<view class="pic">
						<image src="https://qietu.ahqian.com/xiaot/5.12/home4.png" mode="aspectFill"></image>
					</view>
					<text>开通城际摆渡</text>
				</view>
			</scroll-view>
		</view>
		<footers :currentx='0'></footers>
	</view>
</template>

<script>
	import footers from '@/compontents/footers/footers.vue'
	import { mainInfo } from '@/api/index.js'
	export default {
		components:{
			footers: footers
		},
		data() {
			return {
				height: 0,
				//胶囊位置信息
				menuButtonRect: {},
				//状态栏的高度
				statusBarHeight: 0,
				//导航栏的高度
				navBarHeight: 0
			}
		},
		mounted() {
			this.getheight()
		},
		created() {
			mainInfo((res) => {
				console.log(res)
			})
		},
		methods: { 
			link(url){ 
				uni.navigateTo({
					url,
				})
			},
			links(url){
				uni.switchTab({
					url,
				})
			},
			getheight() {
					this.navBarHeight = 50
				// #ifdef MP-WEIXIN
					let sysInfo = wx.getSystemInfoSync();
					this.statusBarHeight = sysInfo.statusBarHeight;
					let rect = wx.getMenuButtonBoundingClientRect();
					this.menuButtonRect = JSON.parse(JSON.stringify(rect));
					let navBarHeight = (rect.top - sysInfo.statusBarHeight) * 2 + rect.height;
					this.navBarHeight = navBarHeight;
					this.height = sysInfo.statusBarHeight + navBarHeight
				// #endif
				
				var that = this
				setTimeout(()=>{
					uni.createSelectorQuery().in(this).select(".navbara").boundingClientRect(data => {
						that.heightEle = data.height
						console.log(data.height)
					}).exec()
				},10)
			},
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
		.navbara{
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 999;
			.child {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				padding-left: 28rpx;
				image {
					width: 195rpx;
				}
			
			}
		}
		.banner{
			width: 100%;
			height: 801rpx;
		}
		.main_item{
			width: 100%;
			background: #fff;
			padding: 35rpx 0 39rpx 29rpx;
			margin-bottom: 19rpx;
			scroll-view{
				width: 100%;
				white-space: nowrap;
				margin-top: 26rpx;
				.label{
					width: 249rpx;
					overflow: hidden;
					background: #F3F7F9;
					border-radius: 20rpx;
					margin-right: 30rpx;
					display: inline-block;
					.pic{
						width: 100%;
						height: 178rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					text{
						display: block;
						font-size: 24rpx;
						line-height: 60rpx;
						text-align: center;
						color: #494F5F;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						width: 100%;
						padding: 0 15rpx;
					}
				}
			}
			.title{
				display: block;
				font-size: 30rpx;
				color: #494F5F;
				font-weight: bold;
				letter-spacing: 2rpx;
				text{
					color: #2765F2;
					font-size: 32rpx;
				}
			}
		}
		.navbar{
			overflow: hidden;
			width: 702rpx;
			margin: 0 auto;
			background: #fff;
			position: relative;
			margin-top: -70rpx;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
			padding: 54rpx 0 9rpx 0;
			display: flex;
			margin-bottom: 43rpx;
			flex-wrap: wrap;
			view{
				width: 33.33%;
				overflow: hidden;
				margin-bottom: 48rpx;
				image{
					display: block;
					margin: 0 auto;
					width: 98rpx;
					margin-bottom: 25rpx;
				}
				text{
					display: block;
					font-size: 28rpx;
					color: #6C768D;
					text-align: center;
				}
			}
		}
	}
</style>
