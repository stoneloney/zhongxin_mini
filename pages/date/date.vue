<template>
	<view class="content">
		<!-- <view class="search">
			<image src="../../static/citys2.png" mode="widthFix"></image>
			<input type="text" placeholder="请输入关键字" placeholder-class="s">
			<view>搜索</view>
		</view> -->
		<view class="date">
			<scroll-view scroll-x="true">
				<view>
					<text class="day">5-15</text>
					<text class="des">今天</text>
					<text class="price">￥1999</text>
				</view>
				<view>
					<text class="day">5-16</text>
					<text class="des">明天</text>
					<text class="price">￥1999</text>
				</view>
				<view>
					<text class="day">5-17</text>
					<text class="des">后天</text>
					<text class="price">￥1999</text>
				</view>
				<view>
					<text class="day">5-18</text>
					<text class="des">周四</text>
					<text class="price">￥1999</text>
				</view>
				<view>
					<text class="day">5-19</text>
					<text class="des">周五</text>
					<text class="price">￥1999</text>
				</view>
				<view>
					<text class="day">5-20</text>
					<text class="des">周六</text>
					<text class="price">￥1999</text>
				</view>
				<view>
					<text class="day">5-21</text>
					<text class="des">周日</text>
					<text class="price">￥1999</text>
				</view>
				<view>
					<text class="day">5-22</text>
					<text class="des">周一</text>
					<text class="price">￥1999</text>
				</view>
			</scroll-view>
			<view class="icon" @click="link('/pages/Booking/Booking1')">
				<image src="../../static/citys3.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="list" @click="link('/pages/confire/confire')">
			<view class="label">
				<view class="top">
					<view class="vi">
						<text class="time">10:10</text>
						<text class="name">深圳南头直升机场</text>
					</view>
					<view class="mid">
						<image src="../../static/citys1.png" mode="widthFix" class="f"></image>
						<image src="../../static/book6.png" mode="widthFix" class="l"></image>
						<view>
							<image src="../../static/citys.png" mode="widthFix"></image>
							<text>30分钟</text>
						</view>
					</view>
					<view class="vi">
						<text class="time">12:30</text>
						<text class="name">中信金沙湾</text>
					</view>
				</view>
				<view class="bot">
					<view class="icon">
						<image src="../../static/citys1.png" mode="widthFix"></image>
						<text>空客H135</text>
					</view>
					<view class="price">
						<text class="f">￥<text>1999</text></text>
						<!-- <text class="des">税 ￥110</text> -->
					</view>
				</view>
			</view>
			<view class="label">
				<view class="top">
					<view class="vi">
						<text class="time">10:10</text>
						<text class="name">中信金沙湾</text>
					</view>
					<view class="mid">
						<image src="../../static/citys1.png" mode="widthFix" class="f"></image>
						<image src="../../static/book6.png" mode="widthFix" class="l"></image>
						<view>
							<image src="../../static/citys.png" mode="widthFix"></image>
							<text>30分钟</text>
						</view>
					</view>
					<view class="vi">
						<text class="time">12:30</text>
						<text class="name">深圳南头直升机场</text>
					</view>
				</view>
				<view class="bot">
					<view class="icon">
						<image src="../../static/citys1.png" mode="widthFix"></image>
						<text>空客H135</text>
					</view>
					<view class="price">
						<text class="f">￥<text>1999</text></text>
						<!-- <text class="des">税 ￥110</text> -->
					</view>
				</view>
			</view>
			<view class="label">
				<view class="top">
					<view class="vi">
						<text class="time">10:10</text>
						<text class="name">深圳南头直升机场</text>
					</view>
					<view class="mid">
						<image src="../../static/citys1.png" mode="widthFix" class="f"></image>
						<image src="../../static/book6.png" mode="widthFix" class="l"></image>
						<view>
							<image src="../../static/citys.png" mode="widthFix"></image>
							<text>30分钟</text>
						</view>
					</view>
					<view class="vi">
						<text class="time">12:30</text>
						<text class="name">黄埔穗港澳直升机场 (静待开通)</text>
					</view>
				</view>
				<view class="bot">
					<view class="icon">
						<image src="../../static/citys1.png" mode="widthFix"></image>
						<text>空客H135</text>
					</view>
					<view class="price">
						<text class="f">￥<text>1999</text></text>
						<!-- <text class="des">税 ￥110</text> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

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
		padding: 30rpx 24rpx;
		position: relative;
		.search{
			width: 702rpx;
			position: relative;
			z-index: 99;
			margin: 0 auto;
			border: 1px solid #FFFFFF;
			height: 72rpx;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			padding-left: 13rpx;
			image{
				width: 30rpx;
			}
			input{
				flex: 1;
				height: 100%;
				font-size: 28rpx;
				color: #fff;
				padding-left: 9rpx;
			}
			.s{
				color: #fff;
			}
			view{
				width: 108rpx;
				height: 58rpx;
				background: #FFFFFF;
				border: 1px solid #FFFFFF;
				box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 5rpx;
				top: 50%;
				transform: translateY(-50%);
				font-size: 28rpx;
				z-index: 99;
				color: #2764F2;
			}
		}
		.list{
			width: 702rpx;
			position: relative;
			z-index: 99;
			margin: 0 auto;
			margin-top: 27rpx;
			.label{
				width: 100%;
				height: 185rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
				border-radius: 20rpx;
				margin-bottom: 26rpx;
				.bot{
					width: 100%;
					height: 61rpx;
					border-top: 1px solid #EEEEEE;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 36rpx 0 39rpx;
					.icon{
						display: flex;
						align-items: center;
						image{
							width: 27rpx;
							margin-right: 13rpx;
						}
						text{
							font-size: 24rpx;
							color: #444A58;
						}
					}
					.price{
						display: flex;
						align-items: flex-end;
						.des{
							font-size: 20rpx;
							margin-left: 11rpx;
							color: #444A58;
						}
						.f{
							display: flex;
							align-items: flex-end;
							font-size: 22rpx;
							font-weight: bold;
							color: #D30101;
							text{
								font-size: 34rpx;
								line-height: 1;
								display: inline-block;
							}
						}
					}
				}
				.top{
					overflow: hidden;
					min-height: 123rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.mid{
						overflow: hidden;
						.f{
							display: block;
							margin: 0 auto;
							width: 34rpx;
							margin-bottom: 4rpx;
						}
						.l{
							display: block;
							margin: 0 auto;
							width: 100rpx;
							margin-bottom: 6rpx;
						}
						view{
							display: flex;
							align-items: center;
							justify-content: center;
							image{
								width: 18rpx;
								margin-right: 6rpx;
							}
							text{
								font-size: 20rpx;
								color: #444A58;
							}
						}
					}
					.vi{
						overflow: hidden;
						width: 40%;
						padding-bottom: 5rpx;
						.time{
							display: block;
							text-align: center;
							font-size: 36rpx;
							font-weight: bold;
							margin-bottom: 10rpx;
							color: #222222;
						}
						.name{
							display: block;
							text-align: center;
							font-size: 24rpx;
							color: #444A58;
							padding: 0 20rpx;
						}
					}
				}
			}
		}
		.date{
			width: 702rpx;
			position: relative;
			z-index: 99;
			background: #fff;
			margin: 0 auto;
			margin-top: 22rpx;
			overflow: hidden;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
			height: 126rpx;
			.icon{
				position: absolute;
				right: 0;
				top: 0;
				width: 106rpx;
				z-index: 999;
				padding-right: 33rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				height: 100%;
				background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,1));
				image{
					width: 44rpx;
				}
			}
			scroll-view{
				width: 100%;
				height: 100%;
				white-space: nowrap;
				view{
					display: inline-block;
					height: 100%;
					width: 121rpx;
					position: relative;
					padding: 24rpx 0 0 0;
					&::after{
						content: '';
						width: 1px;
						height: 102rpx;
						background: #EEEEEE;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
					}
					.day{
						display: block;
						text-align: center;
						font-size: 28rpx;
						color: #000000;
						line-height: 1;
					}
					.des{
						display: block;
						text-align: center;
						font-size: 22rpx;
						color: #000000;
						line-height: 39rpx;
						opacity: 0.5;
					}
					.price{
						display: block;
						text-align: center;
						font-size: 22rpx;
						color: #000000;
						line-height: 1;
					}
				}
			}
		}
		&::after{
			content: '';
			width: 100%;
			height: 564rpx;
			position: absolute;
			left: 0;
			top: 0;
			background: linear-gradient(#2765F2, #F7F7F7);
		}
		
	}
</style>
