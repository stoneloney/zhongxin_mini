<template>
	<view class="content">
		<view class="box">
			<view class="tabbar">
				<!--
				<view :class="current == 0?'on':''" @click="current = 0">
					<text>中信银行 </text>
					<text>VIP客户礼券兑换</text>
				</view>
				<view :class="current == 1?'on':''" @click="current = 1">
					<text>中信银行 </text>
					<text>信用卡礼券兑换</text>
				</view>
				-->
				<view :class="atype == item.id?'on':''" @click="atype = item.id" v-for="(item, index) in types">
					<text>中信银行 </text>
					<text>{{ item.title }}</text>
				</view>
			</view>
			<view class="change">
				<image src="../../static/phones.png" mode="widthFix"></image>
				<input type="text" placeholder="请输入礼券兑换码" placeholder-class="s" v-model="number">
			</view>
			<view class="button" @click="exchange">确认兑换</view>
		</view>
	</view>
</template>

<script>
	import { VoucherTypes, VoucherExchange } from "@/api/voucher"
	import { IsLogin } from "@/api/member"
	export default {
		data() {
			return {
				atype:0,
				number: '',
				types: []
			}
		},
		onLoad(options) {
			var that = this
			VoucherTypes({}, (res) => {
				if (res.code !== 0 ) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				that.types = res.data
				if (res.data.length > 0) {
					that.atype = res.data[0].id
				}
			})
		},

		methods: {
			exchange: function() {
				VoucherExchange({
					'atype': this.atype,
					'number': this.number
				}, (res) => {
					if (res.code !== 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					} else {
						uni.showToast({
							title: '兑换成功',
							duration: 2000
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}

	.content {
		width: 100%;
		height: 100vh;
		position: relative;
		overflow: hidden;
		.box{
			width: 702rpx;
			height: 542rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			position: relative;
			z-index: 99;
			margin: 0 auto;
			margin-top: 20rpx;
			padding: 47rpx 30rpx 99rpx 30rpx;
			.change{
				width: 100%;
				height: 97rpx;
				display: flex;
				align-items: center;
				padding-left: 24rpx;
				background: #EEEEEE;
				border-radius: 10rpx;
				margin-top: 46rpx;
				border: 1px solid #EEEEEE;
				image{
					width: 25rpx;
				}
				input{
					flex: 1;
					height: 100%;
					font-size: 30rpx;
					color: #333;
					padding-left: 13rpx;
				}
				.s{
					color: #9B9EA3;
				}
			}
			.button{
				display: flex;
				justify-content: center;
				align-items: center;
				letter-spacing: 1rpx;
				font-size: 28rpx;
				width: 100%;
				height: 97rpx;
				background: #2765F2;
				border-radius: 20rpx;
				color: #fff;
				margin-top: 39rpx;
			}
			.tabbar{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				view{
					width: 49%;
					overflow: hidden;
					background: #F7F7F7;
					border-radius: 20rpx;
					padding: 20rpx 0;
					&.on{
						background: #2765F2;
						box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(39,101,242,0.48);
						text{
							color: #fff;
						}
					}
					text{
						display: block;
						text-align: center;
						font-size: 30rpx;
						color: #5B5B5B;
					}
				}
			}
		}
		&::after {
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