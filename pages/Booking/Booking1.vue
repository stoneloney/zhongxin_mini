<template>
	<view class="content">
		<view class="main_top">
			<view class="label" @click="link('/pages/predetermine/predetermine?type=1')">
				<text class="title">出发地</text>
				<view>
					<image src="../../static/book1.png" mode="widthFix"></image>
					<text>{{stars?stars:'起始地'}}</text>
				</view>
			</view>
			<view class="icon">
				<image src="../../static/book7.png" class="i" mode="widthFix"></image>
				<image src="../../static/book6.png" class="i1" mode="widthFix"></image>
			</view>
			<view class="label" @click="link('/pages/predetermine/predetermine?type=2')">
				<text class="title">到达地</text>
				<view>
					<image src="../../static/book1.png" mode="widthFix"></image>
					<text>{{ends?ends:'目的地'}}</text>
				</view>
			</view>
		</view>
		<view class="item" @click="show2 = true">
			<view class="icon">
				<image src="../../static/book5.png" mode="widthFix"></image>
				<text>出发日期</text>
			</view>
			<view class="change">
				<text>{{date}}</text>
				<image src="../../static/book4.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="button" @click="backs">确定</view>
		<u-picker mode="time" title='出发日期' @confirm='change1' v-model="show2" :params="params"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				show1: false,
				show2: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				seat: ['A座(靠窗)', 'B座', 'C座(靠窗)', 'D座(靠窗)', 'E座(靠窗)'],
				current: 0,
				list: [{
					name: '空客H135型直升机',
					price: '￥2916/人',
				}, {
					name: '空客H135型直升机1',
					price: '￥2916/人',
				}, {
					name: '空客H135型直升机2',
					price: '￥2916/人',
				}, {
					name: '空客H135型直升机3',
					price: '￥2916/人',
				}],
				current1: 0,
				date: '2023-05-09 09:20',
				stars: '',
				ends: ''
			}
		},
		onLoad() {

		},
		onShow() {
			if(uni.getStorageSync('infotype') == 1){
				this.stars = uni.getStorageSync('info').name
			}else{
				this.ends = uni.getStorageSync('info').name
			}
			uni.removeStorageSync('infotype')
			uni.removeStorageSync('info')
			
		},
		methods: {
			change1(e) {
				this.date = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
				console.log(e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute)
			},
			backs(){
				uni.navigateBack({
					delta: 1
				})
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
	item page {
		background: #F7F7F7;
	}

	.fade_aircraft {
		overflow: hidden;
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		position: relative;
		padding: 80rpx 35rpx;

		.buttons {
			width: 100%;
			height: 97rpx;
			background: #2765F2;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			margin-top: 35rpx;
			color: #FFFFFF;
		}

		.label {
			width: 100%;

			.slide {
				overflow: hidden;
				width: 100%;
				background: #EEEEEE;
				border-radius: 10rpx;
				padding: 28rpx;

				.pic {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

					image {
						width: 306rpx;
						border-radius: 10rpx;
						margin-top: 40rpx;
					}
				}

				.titles {
					display: block;
					font-size: 30rpx;
					font-weight: bold;
					letter-spacing: 1rpx;
					color: #444A58;
					margin-bottom: 30rpx;
				}

				.des {
					display: block;
					font-size: 25rpx;
					color: #444A58;
					line-height: 38rpx;
					text-indent: 30rpx;
				}
			}

			.line {
				width: 100%;
				height: 91rpx;
				border-bottom: 1px solid #EEEEEE;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&.on {
					.icon {
						view {
							background-image: url('../../static/confire4.png');
						}
					}

					.down image {
						transform: rotate(180deg);
					}
				}

				&.on1 {
					.down image {
						transform: rotate(180deg);
					}
				}

				.down {
					display: flex;
					align-items: center;

					text {
						font-size: 26rpx;
						opacity: 0.5;
						margin-right: 22rpx;
						color: #444A58;
					}

					image {
						width: 23rpx;
						transition: all .2s;
					}
				}

				.price {
					font-size: 30rpx;
					color: #FF4200;
				}

				.icon {
					height: 100%;
					display: flex;
					align-items: center;

					view {
						width: 29rpx;
						height: 29rpx;
						background-image: url('../../static/confire3.png');
						background-size: 100% 100%;
						margin-right: 26rpx;
					}

					text {
						font-size: 26rpx;
						color: #444A58;
					}
				}
			}
		}

		.close {
			width: 36rpx;
			position: absolute;
			right: 45rpx;
			top: 27rpx;
			z-index: 999;
		}

		.title {
			display: block;
			font-size: 41rpx;
			font-weight: bold;
			letter-spacing: 1rpx;
			color: #444A58;
		}
	}

	.fade_seat {
		overflow: hidden;
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		position: relative;
		padding: 80rpx 35rpx;

		.close {
			width: 36rpx;
			position: absolute;
			right: 45rpx;
			top: 27rpx;
			z-index: 999;
		}

		.title {
			display: block;
			font-size: 41rpx;
			font-weight: bold;
			letter-spacing: 1rpx;
			color: #444A58;
			margin-bottom: 76rpx;
		}

		.buttons {
			width: 100%;
			height: 97rpx;
			background: #2765F2;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			margin-top: 69rpx;
			color: #FFFFFF;
		}

		.icon {
			width: 100%;
			margin-top: 46rpx;

			image {
				width: 504rpx;
				display: block;
				margin: 0 auto;
			}

			text {
				display: block;
				text-align: center;
				font-size: 24rpx;
				color: #A1A5AC;
			}
		}

		.ls {
			display: flex;
			flex-wrap: wrap;

			view {
				width: 183rpx;
				height: 79rpx;
				background: #FFFFFF;
				border: 1px solid #EEEEEE;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 51rpx;
				margin-bottom: 32rpx;
				font-size: 28rpx;
				color: #444A58;

				&:nth-child(3n) {
					margin-right: 0;
				}

				&.on {
					background: #2765F2;
					color: #fff;
					border: 1px solid #2765F2;
				}
			}
		}
	}

	.content {
		width: 100%;
		height: 100vh;
		position: relative;
		padding: 30rpx 24rpx;
		position: relative;

		&::after {
			content: '';
			width: 100%;
			height: 564rpx;
			position: absolute;
			left: 0;
			top: 0;
			background: linear-gradient(#2765F2, #fff);
		}

		.button {
			width: 100%;
			height: 97rpx;
			background: #2765F2;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 99;
			font-size: 28rpx;
			margin-top: 32rpx;
			color: #FFFFFF;
		}

		.item {
			width: 100%;
			overflow: hidden;
			background: #fff;
			border-radius: 20rpx;
			margin-top: 22rpx;
			position: relative;
			z-index: 99;
			box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19, 108, 242, 0.35);
			padding: 32rpx 0 0 39rpx;

			.price {
				display: block;
				font-size: 32rpx;
				margin-top: 22rpx;
				color: #FF4200;
				margin-bottom: 39rpx;
			}

			.change {
				display: flex;
				align-items: center;
				height: 95rpx;
				justify-content: space-between;
				padding-right: 28rpx;

				text {
					font-size: 28rpx;
					color: #444A58;
				}

				image {
					width: 11rpx;
				}
			}

			.icon {
				display: flex;
				align-items: center;

				image {
					width: 36rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: bold;
					color: #444A58;
					margin-left: 7rpx;
				}
			}
		}

		.main_top {
			width: 100%;
			overflow: hidden;
			background: #fff;
			border-radius: 20rpx;
			padding: 40rpx 0;
			position: relative;
			z-index: 99;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.icon {
				overflow: hidden;

				.i {
					display: block;
					margin: 0 auto;
					width: 34rpx;
					margin-bottom: 4rpx;
				}

				.i1 {
					display: block;
					margin: 0 auto;
					width: 100rpx;
				}
			}

			.label {
				width: 40%;
				padding-left: 30rpx;
				padding-right: 10rpx;
				.title {
					display: block;
					font-size: 26rpx;
					color: #6C768D;
				}

				view {
					display: flex;
					margin-top: 20rpx;
					width: 100%;
					align-items: center;

					image {
						width: 36rpx;
						margin-right: 9rpx;
					}

					text {
						font-size: 32rpx;
						color: #444A58;
						flex: 1;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>