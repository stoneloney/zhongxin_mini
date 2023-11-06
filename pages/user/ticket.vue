<template>
	<view class="ma_ticket"  >
		<view class="swiper-tab">  
			<view class="swiper-tab-list" :class="currentTab == 0?'on':''" @click="selectTab(0)">有效礼券</view>  
			<view class="swiper-tab-list" :class="currentTab == 1?'on':''" @click="selectTab(1)">过期礼券</view>   
		</view>  
		
		<view class="ticket-list" v-if="hasTicket">
			<view class="coupon-item" :class="!currentTab==0?'h':''" v-for="(item, index) in tickets">
				<view class="coupon-item-left">
					<view class="coupon-item-info">
						<view class="coupon-item-money">¥{{ item.gprice }}</view>
						<view class="coupon-item-ask">{{maxPrice == 0?'无门槛':'满' + maxPrice + '元可用'}}</view>
					</view>
					<view class="coupon-item-content">
						<view class="coupon-left-top">
							<view class="coupon-item-name">{{ item.gprice }}元代金券</view>
							<view class="coupon-item-tip">订单结算支付时可用</view>
						</view>
						<view class="coupon-left-bottom">
							<view class="coupon-item-time">有效期至 {{ $u.timeFormat(item.gend_date, 'yyyy-mm-dd hh:MM:ss')}}</view>
						</view>
					</view>
				</view>

				<view class="coupon-item-right" v-if="currentTab==0">
					<view class="coupon-item-botton" @click="userEvent">
						去使用
					</view>
				</view>
			</view>
		</view>
		
		<view class="ticket-list" v-if="!hasTicket">
			<view class="address">
			  <view class="address_a">
				  <view class="img" style="background-image: url('http://m.qpic.cn/psb?/V13t2G4i0uprYL/uYo8U.oo0vWONsW93wC*ppXK6ZFdHOgOlSEiEbXukxY!/b/dFIBAAAAAAAA&bo=OQKmAQAAAAADB74!&rf=viewer_4'); width: 569rpx;height: 422rpx;"></view>
				  <view class="img2">暂无礼券</view>
			  </view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { IsLogin } from '@/api/member'
	import { TicketList } from '@/api/ticket'
	
	export default {
		name: "ticket",
		data() {
			return {
				maxPrice: 0,
				currentTab: 0,
				tickets: [],
				hasTicket: false,
			}
		},
		created() {
			var that = this
			this.isLogin = IsLogin() ? true : false
			if (!this.isLogin) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			} else {
				TicketList({'page': this.page, 'limit': this.limit, 'type': this.currentTab}, (res) => {
					if (res.code !== 0) {
						uni.showModal({
							title: '错误提示',
							content: '网络异常，请稍后重试',
							showCancel: false
						})
						return 
					}
					if(!res.data.list || res.data.list.length <= 0) {
						that.hasTicket = false
					} else{
						that.hasTicket = true
						that.tickets = res.data.list
					}
				})
			}
			
		},
		methods:{
			userEvent(){
				this.$emit('onClick')
			},
			link(url) {
				uni.navigateTo({
					url,
				})
			},
			selectTab(id) {
				var that = this
				this.currentTab = id
				TicketList({'page': this.page, 'limit': this.limit, 'type': id}, (res) => {
					if (res.code !== 0) {
						uni.showModal({
							title: '错误提示',
							content: '网络异常，请稍后重试',
							showCancel: false
						})
						return 
					}
					if(!res.data.list || res.data.list.length <= 0) {
						that.hasTicket = false
					} else{
						that.hasTicket = true
						that.tickets = res.data.list
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.ma_ticket {
	  font-family: PingFang SC;
	  color: rgba(0, 21, 62, 1);
	}
	
	.swiper-tab {
	  background: #fff;
	  z-index: 9;
	  position: fixed;
	  width: 100%;
	  border-bottom: 1rpx solid #dee3f0;
	  text-align: center;
	  line-height: 80rpx;
	}
	
	.swiper-tab-list {
	  display: inline-block;
	  width: 50%;
	  color: rgba(0, 21, 62, 1);
	  font-size: 32rpx;
	  font-weight: 500;
	}
	
	.on {
	  color: #0D5EFF;
	  border-bottom: 4rpx solid #0d5eff;
	}
	
	.address_a{
	  width: 650rpx;
	  margin: auto;
	}
	
	.address{
	  width: 100%;
	  font-family:PingFang SC;
	  color:rgba(0,21,62,1);
	}
	.img{
	   background-repeat: no-repeat;
	   background-size: cover;
	   margin: auto;
	   margin-top: 150rpx;
	}
	.img2{
		font-size:38rpx;
		font-weight:400;
		margin-top: 65rpx;
		text-align: center;
	}
	
	.ticket-list {
		position: relative;
		top:80rpx;
		display: block;
		width: 100%;
		overflow: hidden;
	}
	
	.coupon-item {
		background: #fff;
		padding: 20rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;

		&.h {
			filter: grayscale(100%);
		}

		.coupon-item-left {
			display: flex;
			align-items: center;

			.coupon-item-info {
				width: 170rpx;
				height: 170rpx;
				background-image: url("data:image/png;base64,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");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;

				.coupon-item-money {
					font-size: 50rpx;
					font-weight: bold;
				}

				.coupon-item-money::first-letter {
					font-size: 24rpx;
					font-weight: normal;
				}

				.coupon-item-ask {
					font-size: 26rpx;
				}
			}

			.coupon-item-content {
				color: #333;
				font-size: 28rpx;
				height: 160rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;
				flex-shrink: 0;

				.coupon-left-top {
					.coupon-item-name {
						font-size: 30rpx;
						font-weight: bold;
					}

					.coupon-item-tip {
						font-size: 24rpx;
						color: #888888;
					}
				}

				.coupon-left-bottom {
					.coupon-item-time {
						font-size: 24rpx;
						color: #888888;
					}
				}
			}
		}

		.coupon-item-right {
			.coupon-item-botton {
				background: #ff4131;
				color: #fff;
				border-radius: 50rpx;
				padding: 12rpx 24rpx;
				font-size: 24rpx;
				flex-shrink: 0;
			}
		}
	}
</style>