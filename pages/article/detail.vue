<template>
	<view class="content">
		<view class="info">
			<text class="name">{{ detail.title }}</text>
			<view>
				<text class="price">{{ detail.author }}</text>
				<text class="num">{{ detail.create_date }}</text>
			</view>
		</view>
		
		<view class="main_info">
			<rich-text class="font" :nodes="detail.content" space="nbsp"></rich-text>
		</view>
		
		<footers :currentx='3'></footers>
		
	</view>
</template>

<script>
	import { ArticleDetail } from "@/api/article"
	import footers from '@/compontents/footers/footers.vue'
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad(params) {
			var that = this
			ArticleDetail(parseInt(params.id), (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				that.detail = res.data
				console.log(that.detail.content)
			})
		},
		methods: {
			
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
		padding-bottom: 40rpx;
		.main_info{
			overflow: hidden;
			background: #fff;
			margin-top: 14rpx;
			padding: 28rpx 30rpx;
			view{
				display: flex;
				align-items: center;
				image{
					width: 5rpx;
				}
				text{
					font-size: 26rpx;
					margin-left: 12rpx;
					color: #333333;
				}
			}
			.font{
				display: block;
				font-size: 30rpx;
				margin-top: 30rpx;
				color: #333333;
				line-height: 50rpx;
				opacity: 0.8;
			}
			.wscnph {
				width: 100%;
			}
		}
		.info{
			overflow: hidden;
			padding: 24rpx;
			background: #fff;
			.name{
				display: block;
				font-size: 32rpx;
				color: #333333;
				line-height: 40rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				justify-content: center;	
			}
			view{
				display: flex;
				align-items: center;
				margin-top: 16rpx;
				justify-content: space-between;
				.price{
					display: block;
					font-size: 28rpx;
					color: #E06400;
				}
				.num{
					display: block;
					font-size: 24rpx;
					color: #333333;
					opacity: 0.5;
				}
			}
		}
	}
</style>
