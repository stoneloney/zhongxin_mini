<template>
	<view>
		<view class="null"></view>
		<view class="footer_icon">
			<view class="v">
				<view class="label" @click="link(item.url)" v-for="(item, index) in nav" :class="currentx == index?'on':''">
					<image :src="currentx == index?item.src1:item.src" mode="widthFix"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="mid">
				<image src="../../static/home11.png" mode="widthFix"></image>
			</view>
			<view class="v">
				<view class="label" @click="link(item.url)" v-for="(item, index) in nav1" :class="currentx == index+2?'on':''">
					<image :src="currentx == index+2?item.src1:item.src" mode="widthFix"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav:[{
					src: '../../static/footericon1.png',
					src1: '../../static/footericon2.png',
					name: '首页',
					url: '../../pages/index/index'
				},{
					src: '../../static/footericon3.png',
					src1: '../../static/footericon4.png',
					name: '品牌',
					url: '../../pages/index/index'
				}],
				nav1:[{
					src: '../../static/footericon5.png',
					src1: '../../static/footericon55.png',
					name: '资讯',
					url: '../../pages/index/index'
				},{
					src: '../../static/footericon7.png',
					src1: '../../static/footericon6.png',
					name: '我的',
					url: '../../pages/user/user'
				}]
			}
		},
		props: {
			currentx: Number
		},
		onLoad() {

		},
		methods: {
			link(url){
				uni.reLaunch({
					url,
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F7F7F7;
	}
	.null{
		height: 110rpx;
	}
	.footer_icon{
		width: 100%;
		height: 100rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		box-shadow: 0 0 20rpx rgba(0,0,0,.1);
		align-items: center;
		justify-content: space-between;
		.mid{
			width: 98rpx;
			height: 98rpx;
			position: absolute;
			left: 50%;
			border-radius: 50%;
			background: #fff;
			transform: translate(-50%, -50%);
			top: 40%;
			padding: 8rpx;
			image{
				width: 100%;
			}
		}
		.v{
			display: flex;
			align-items: center;
			height: 100%;
			view{
				width: 160rpx;
				height: 100%;
				&.on{
					text{
						color: #2765F2;
					}
				}
				image{
					width: 60rpx;
					display: block;
					margin: 0 auto;
				}
				text{
					display: block;
					text-align: center;
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
	}
</style>
