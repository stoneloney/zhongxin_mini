<template>
	<view class="content">
		<view class="main_info">
			<text class="title">航程信息</text>
			<view class="label">
				<text class="f">飞机型号：</text>
				<view class="change">
					<text>空客H135   </text>
				</view>
			</view>
			<view class="label">
				<text class="f">座位数：</text>
				<view class="change">
					<text>A座 (靠窗)</text>
					<image src="../../static/confire2.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="userinfo">
			<text class="title">已选：1成人</text>
			<view class="label on">
				<view class="check"></view>
				<view class="grow">
					<text class="name">李小童</text>
					<text class="id">身份证：320323199902035623</text>
				</view>
				<view class="edit">
					<image src="../../static/confire.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="label">
				<view class="check"></view>
				<view class="grow">
					<text class="name">赵孟族</text>
					<text class="id">身份证：320323199902035623</text>
				</view>
				<view class="edit">
					<image src="../../static/confire.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="add" @click="link('/pages/add_people/add_people')">+更多乘机人</view>
		</view>
		<view class="contact">
			<text class="title">联系人信息</text>
			<view class="change">
				<view class="fl">
					<text>手机号</text>
					<text>+86</text>
				</view>
				<view class="fs">
					<input type="text" placeholder="请输入" placeholder-class="s">
					<text>订单信息发送到此手机号</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<text class="price">￥<text>1599</text></text>
			<view class="btn">立即支付</view>
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
		&::after{
			content: '';
			width: 100%;
			height: 564rpx;
			position: absolute;
			left: 0;
			top: 0;
			background: linear-gradient(#2765F2, #F7F7F7);
		}
		.footer{
			width: 100%;
			height: 103rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 29rpx 0 45rpx;
			background: #fff;
			box-shadow: 0 0 20rpx rgba(0,0,0,.1);
			z-index: 9999;
			position: fixed;
			left: 0;
			bottom: 0;
			.price{
				display: flex;
				align-items: flex-end;
				font-size: 27rpx;
				color: #FF4200;
				text{
					display: inline-block;
					font-size: 40rpx;
					line-height: 1;
				}
			}
			.btn{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 267rpx;
				height: 80rpx;
				background: #2765F2;
				border-radius: 40rpx;
				font-size: 28rpx;
				color: #fff;
			}
		}
		.contact{
			overflow: hidden;
			width: 100%;
			background: #fff;
			border-radius: 20rpx;
			margin-top: 19rpx;
			position: relative;
			z-index: 99;
			padding: 36rpx 26rpx 34rpx 26rpx;
			.title{
				display: block;
				font-size: 28rpx;
				color: #444A58;
				font-weight: bold;
				margin-bottom: 2rpx;
			}
			.change{
				width: 100%;
				display: flex;
				align-items: flex-start;
				margin-top: 30rpx;
				justify-content: space-between;
				.fs{
					height: 100%;
					width: calc(100% - 184rpx);
					font-size: 12px;
					position: relative;
					// &::after{
					// 	content: '';
					// 	width: 1px;
					// 	height: 27rpx;
					// 	background: #E3E3E3;
					// 	position: absolute;
					// 	left: 0;
					// 	top: 50%;
					// 	transform: translateY(-50%);
					// }
					input{
						height: 70rpx;
						width: 100%;
						border-bottom: 1px solid #EEEEEE;
						font-size: 28rpx;
						color: #333;
					}
					text{
						display: block;
						font-size: 24rpx;
						color: #2765F2;
						margin-top: 16rpx;
					}
				}
				.fl{
					width: 170rpx;
					display: flex;
					align-items: center;
					height: 70rpx;
					margin-right: 14rpx;
					justify-content: space-between;
					text{
						font-size: 28rpx;
						color: #444A58;
					}
				}
			}
		}
		.userinfo{
			overflow: hidden;
			width: 100%;
			background: #fff;
			border-radius: 20rpx;
			margin-top: 19rpx;
			position: relative;
			z-index: 99;
			padding: 36rpx 26rpx 34rpx 26rpx;
			.title{
				display: block;
				font-size: 28rpx;
				color: #444A58;
				font-weight: bold;
				margin-bottom: 2rpx;
			}
			.add{
				width: 603rpx;
				height: 81rpx;
				background: #E9EFFE;
				border-radius: 41rpx;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #2765F2;
				margin-top: 30rpx;
			}
			.label{
				width: 100%;
				padding: 33rpx 0;
				position: relative;
				border-bottom: 1px solid #EEEEEE;
				display: flex;
				align-items: center;
				&.on{
					.check{
						background-image: url('../../static/confire4.png');
					}
				}
				.edit{
					width: 100rpx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 999;
					position: absolute;
					right: 0;
					top: 0;
					image{
						width: 30rpx;
					}
				}
				.check{
					width: 63rpx;
					height: 80rpx;
					background-image: url('../../static/confire3.png');
					background-size: 29rpx;
					background-repeat: no-repeat;
					background-position: center left;
				}
				.grow{
					overflow: hidden;
					.name{
						display: block;
						font-size: 28rpx;
						margin-bottom: 14rpx;
						color: #444A58;
					}
					.id{
						display: block;
						font-size: 24rpx;
						color: #444A58;
						opacity: 0.5;
					}
				}
			}
		}
		.main_info{
			width: 100%;
			overflow: hidden;
			background: #fff;
			border-radius: 20rpx;
			position: relative;
			z-index: 99;
			padding: 40rpx 26rpx 12rpx 26rpx;
			.title{
				display: block;
				font-size: 28rpx;
				color: #444A58;
				font-weight: bold;
				margin-bottom: 12rpx;
			}
			.label{
				width: 100%;
				height: 62rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.f{
					font-size: 26rpx;
					color: #444A58;
				}
				.change{
					display: flex;
					align-items: center;
					height: 100%;
					flex: 1;
					justify-content: flex-end;
					text{
						font-size: 26rpx;
						color: #444A58;
					}
					image{
						width: 11rpx;
						margin-left: 17rpx;
					}
				}
			}
		}
	}
</style>
