<template>
	<view class="content" @click="link('info')">
		<view class="label">
			<view class="pic">
				<image src="https://qietu.ahqian.com/xiaot/5.12/list1.png" mode="aspectFill"></image>
			</view>
			<view class="info">
				<text class="name">[市区观光]直升机观光旅程，以绝佳角度观赏深圳！</text>
				<view>
					<text class="price">￥1599</text>
					<text class="num">已售642</text>
				</view>
			</view>
		</view>
		<view class="label">
			<view class="pic">
				<image src="https://qietu.ahqian.com/xiaot/5.12/list.png" mode="aspectFill"></image>
			</view>
			<view class="info">
				<text class="name">[金沙湾观光]直升机擎天阔海，与爱人齐飞！</text>
				<view>
					<text class="price">￥799</text>
					<text class="num">已售642</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import footers from '@/compontents/footers/footers.vue'
	export default {
		components:{
			footers: footers
		},
		data() {
			return {
				
			}
		},
		created() {
			
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
		padding: 25rpx;
		.label{
			width: 100%;
			overflow: hidden;
			background: #fff;
			border-radius: 10rpx;
			margin-bottom: 25rpx;
			.pic{
				width: 100%;
				height: 376rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.info{
				overflow: hidden;
				padding: 24rpx 30rpx;
				.name{
					display: block;
					font-size: 28rpx;
					color: #333333;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				view{
					display: flex;
					align-items: center;
					margin-top: 22rpx;
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
	}
</style>
