<template>
	<view class="content">
		<view class="banner">
			<image :src="detail.image" mode="aspectFill"></image>
		</view>
		<view class="info">
			<text class="name">{{ detail.title }}</text>
			<view>
				<text class="price">￥{{ detail.price }}</text>
				<text class="num">已售 {{ detail.sell }}</text>
			</view>
		</view>
		<view class="address">
			<view class="icon">
				<image src="../../static/info.png" mode="widthFix"></image>
				<text>{{ detail.area_name }}</text>
			</view>
			<view class="btn" @click="maps">地图/导航</view>
		</view>
		<view class="list">
			<view class="label" @click="dateShow = true">
				<view class="icon">
					<view class="f"><text>日期</text><image src="../../static/info3.png" mode="widthFix"></image></view>
					<text class="des">{{ selectDate }}</text>
				</view>
				<image src="../../static/info2.png" mode="widthFix"></image>
			</view>
			<view class="label"> 
				<view class="icon">
					<view class="f"><text>规格</text><image src="../../static/info3.png" mode="widthFix"></image></view>
					<text class="des">{{ detail.number }}</text>
				</view>
				<image src="../../static/info2.png" mode="widthFix"></image>
			</view>
			<view class="label">
				<view class="icon">
					<view class="f"><text>数量</text><image src="../../static/info3.png" mode="widthFix"></image></view>
					<view class="change">
						<view @click="rem"><image src="../../static/info4.png" mode="widthFix"></image></view>
						<input type="text" v-model="value" disabled="disabled">
						<view @click="add"><image src="../../static/info5.png" mode="widthFix"></image></view>
					</view>
				</view>
			</view>
		</view>
		<view class="main_info">
			<view>
				<image src="../../static/info6.png" mode="widthFix"></image>
				<text>商品详情</text>
			</view>
			<rich-text class="font" :nodes="detail.content"></rich-text>
		</view>
		<view class="button" @click="buy()">立即购买</view>
		<u-picker mode="time" title='出发日期' @confirm='dataSelect' v-model="dateShow" :params="params"></u-picker>
	</view>
</template>

<script>
	import { TourDetail } from "@/api/tour.js"
	export default {
		data() {
			return {
				id: '',
				value: 1,
				dateShow: false,
				selectDate: '预定前请先选择日期',
				detail: {},
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
			}
		},
		onLoad(params) {
			TourDetail(params.id, (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				console.log(res.data)
				this.id = res.data.id
				this.detail = res.data
			})
		},
		methods: {
			maps(){
				uni.openLocation({
					latitude: parseFloat(this.detail.latitude),
					longitude: parseFloat(this.detail.longitude), 
					success: function () {
						console.log('success');
					},
					fail:function(res) {
						console.log(res)
					}
				});
			},
			add(){
				this.value+=1
			},
			rem(){
				if(this.value > 1){
					this.value-=1
				}
			},
			buy() {
				/*
				if (!this.isLogin) {
					console.log('not login, to login page')
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				*/
				uni.navigateTo({
					url: '/pages/confire/confire?id='+this.id+'&number='+this.value+'&from=tour&selectDate='+this.selectDate
				})
			},
			dataSelect(e) {
				this.selectDate = e.year + '-' + e.month + '-' + e.day
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
		padding-bottom: 40rpx;
		.banner{
			width: 100%;
			height: 376rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.button{
			width: 700rpx;
			height: 97rpx;
			background: #2765F2;
			border-radius: 20rpx;
			margin: 0 auto;
			margin-top: 37rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #fff;
		}
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
				font-size: 26rpx;
				margin-top: 30rpx;
				color: #333333;
				line-height: 40rpx;
				opacity: 0.8;
			}
		}
		.list{
			overflow: hidden;
			background: #fff;
			padding-left: 29rpx;
			margin-top: 14rpx;
			.label{
				height: 90rpx;
				background: #fff;
				display: flex;
				align-items: center;
				padding-right: 25rpx;
				justify-content: space-between;
				border-bottom: 1px solid #F3F7F9;
				& > image{
					width: 13rpx;
				}
				.change{
					height: 100%;
					display: flex;
					align-items: center;
					margin-left: 41rpx;
					view{
						height: 100%;
						width: 50rpx;
							display: flex;
							align-items: center;
							justify-content: center;
					}
					image{
						width: 32rpx;
					}
					input{
						width: 57rpx;
						height: 100%;
						font-size: 26rpx;
						color: #333333;
						text-align: center;
					}
				}
				.icon{
					height: 100%;
					display: flex;
					align-items: center;
					.des{
						font-size: 26rpx;
						color: #333333;
						margin-left: 24rpx;
					}
					.f{
						position: relative;
						display: flex;
						align-items: center;
						text{
							font-size: 26rpx;
							color: #2765F2;
							position: relative;
							z-index: 9;
						}
						image{
							width: 24rpx;
							position: absolute;
							left: -5rpx;
							top: -8rpx;
						}
					}
				}
				&:last-child{
					border: none;
				}
			}
		}
		.address{
			width: 100%;
			height: 90rpx;
			margin-top: 14rpx;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			.icon{
				display: flex;
				align-items: center;
				image{
					width: 24rpx;
					margin-right: 19rpx;
				}
				text{
					font-size: 28rpx;
					color: #333333;
				}
			}
			.btn{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 131rpx;
				height: 50rpx;
				background: #E9EFFE;
				border-radius: 10rpx;
				font-size: 24rpx;
				color: #2765F2;
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
