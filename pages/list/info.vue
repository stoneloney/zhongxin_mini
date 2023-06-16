<template>
	<view class="content">
		<view class="banner">
			<image src="https://qietu.ahqian.com/xiaot/5.12/list1.png" mode="aspectFill"></image>
		</view>
		<view class="info">
			<text class="name">[市区观光]直升机观光旅程，以绝佳角度观赏深圳！</text>
			<view>
				<text class="price">￥1599</text>
				<text class="num">已售642</text>
			</view>
		</view>
		<view class="address">
			<view class="icon">
				<image src="../../static/info.png" mode="widthFix"></image>
				<text>广东省深圳市南头直升机场</text>
			</view>
			<view class="btn" @click="maps">地图/导航</view>
		</view>
		<view class="list">
			<view class="label">
				<view class="icon">
					<view class="f"><text>日期</text><image src="../../static/info3.png" mode="widthFix"></image></view>
					<text class="des">预定前请先选择日期(可以直接线上购买套餐)</text>
				</view>
				<image src="../../static/info2.png" mode="widthFix"></image>
			</view>
			<view class="label">
				<view class="icon">
					<view class="f"><text>规格</text><image src="../../static/info3.png" mode="widthFix"></image></view>
					<text class="des">1次</text>
				</view>
				<image src="../../static/info2.png" mode="widthFix"></image>
			</view>
			<view class="label">
				<view class="icon">
					<view class="f"><text>数量</text><image src="../../static/info3.png" mode="widthFix"></image></view>
					<view class="change">
						<view @click="rem"><image src="../../static/info4.png" mode="widthFix"></image></view>
						<input type="text" v-model="value">
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
			<text class="font">月色沉淀，烛火摇曳的夜晚，有时可能听见自己慢慢老去的声音。在杯茗余烟里看见更真实的自己。日子在软绵绵的温柔，父母还算健康，有三五知心好友可与推杯换盏，有一良人可与倾心挂念。有目标，有事做，兜里恰好有一包玉溪的烟钱。虽然自己笨拙疏庸，偶尔偷偷小懒，偶尔小小泄气，但一直在不急不缓的慢慢向前，一分幼稚，一分可爱，七分成熟交于世态，还有一分吧，藏起来，等你来猜。</text>
		</view>
		<view class="button" @click="link('/pages/confire/confire')">立即购买</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1
			}
		},
		onLoad() {

		},
		methods: {
			maps(){
				uni.openLocation({
							latitude: 22.562549,
							longitude: 113.93678,
							success: function () {
								console.log('success');
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
