<template>
	<view class="content">
		<view class="label" v-for="(item, index) in tours" @tap.click="tourLink(item.id)">
			<view class="pic">
				<image :src="item.image" mode="aspectFill"></image>
			</view>
			<view class="info">
				<text class="name">{{ item.title }}</text>
				<view>
					<text class="price">￥{{ item.price }}</text>
					<text class="num" v-if="item.sell > 0">已售{{ item.sell }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { TourList } from "@/api/tour.js"
	import footers from '@/compontents/footers/footers.vue'
	export default {
		components:{
			footers: footers
		},
		data() {
			return {
				tours: [],
				page: 1,
				limit: 20,
			}
		},
		created() {
			TourList(this.page, this.limit, (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
				}
				this.tours = res.data.list
			})
		},
		methods: {
			tourLink(id) {
				console.log('/pages/list/info?id=' + id)
				uni.navigateTo({
					url: '/pages/list/info?id=' + id
				})
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
