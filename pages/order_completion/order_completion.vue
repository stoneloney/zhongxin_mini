<template>
	<view class="YmContent">
			<view class="order_completion_72">
				<view class="order_completion_70" v-if="detail.pay_order.status_int != 0">
					<text decode="true" class="order_completion_18">订单二维码</text>
					<view decode="true" class="num">
						<ayQrcode ref="qrcode" qrcode_id="qrcode" :modal="modalQr" :url="qrUrl" @hideQrcode="hideQrcode" :height="180" :width="180" />
					</view>
					<view class="order_completion_20">
						<text decode="true" class="order_completion_21" :class="used?'used':''">单号: {{ detail.pay_order.order_id }}</text>
					</view>
					<text decode="true" class="order_completion_23" v-if="used && detail.pay_order.status_int == 5 ">订单已使用</text>
					<text decode="true" class="order_completion_23" v-if="used && detail.pay_order.status_int == 4 || detail.pay_order.status_int == 6 ">订单已取消</text>
					<text decode="true" class="order_completion_23" v-if="!used">二维码提供给工作人员</text>
				</view>
				<view class="order_completion_69">
					<view class="order_completion_74">
						<view class="order_completion_26">
							<text decode="true" class="order_completion_27">明细信息</text>
							<text decode="true" class="order_completion_28">{{ statusStr }}</text>
						</view>
					</view>
					<view class="goods">
						<view class="row">
							<view class="order_completion_32">
								<image  :src="detail.goods.image" mode="scaleToFill" border="0"    class="icon"></image>
								<view class="order_completion_76">
									<text decode="true" class="subject">{{ detail.goods.name }}</text>
								</view>
								<text decode="true" class="price">¥{{ detail.pay_order.price }}</text>
								<text decode="true" class="num">x 1</text>
							</view>
						</view>
					</view>
					<text decode="true" class="total_money">总价: ¥{{ detail.pay_order.price }}</text>
					<text decode="true" class="order-button" @click="againBuy(detail.pay_order.from, detail.pay_order.goods_id)" v-if="detail.pay_order.status_int == 1">再来一单</text>
					<text decode="true" class="del-button" @click="cancelOrder(detail.pay_order.order_id)" v-if="detail.pay_order.status_int == 1">申请退款</text>
					<text decode="true" class="order-button" @click="againPrePay(detail.pay_order.order_id)" v-if="detail.pay_order.status_int == 0">继续支付</text>
				</view>
			</view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
	import { orderDetail, cancelOrder, OrderStatusStr } from '@/api/orders'
	import { AgainPrePay } from "@/api/weixin"
	import ayQrcode from "@/compontents/ay-qrcode/ay-qrcode.vue"
	export default {
		components: {
			ayQrcode,
		},
		data() {
			return {
				detail: {},
				modalQr: false,
				qrUrl: '', // 要生成的二维码值
				used: false,  // 订单是否已使用
				cancel: false,// 订单取消
				statusStr: '',
			}
		},
		onLoad(params) {
			var that = this
			orderDetail({
				'id': parseInt(params.id)
			}, (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				that.detail = res.data
				if (that.detail.pay_order.status_int > 3) {  // 4：取消  5：已使用  6:已退款
					that.used = true
				}
				if (that.detail.pay_order.status_int > 0) {   // 支付完成才会展示二维码
					that.qrUrl = "https://hzthxcx.cohc.citic/pqr/check?id=" + that.detail.pay_order.order_id
					that.showQrcode()  // 生成二维码
					that.statusStr = OrderStatusStr(that.detail.pay_order.status_int)
				}
			})
		},
		methods: {
			// 展示二维码
			showQrcode() {
				let _this = this;
				this.modalQr = true;
				// uni.showLoading()
				setTimeout(function() {
					// uni.hideLoading()
					_this.$refs.qrcode.crtQrCode()
				}, 100)
			},
			hideQrcode() {
				this.modalQr = false;
			},
			cancelOrder(orderId) {
				var that = this
				uni.showModal({
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "确认", // 确认按钮文字 
					title: '确认提示',
					content: '确定取消该订单?',
					confirmColor:'#3B8BFF',
					cancelColor:'#222222',
					success: res => {
						if (res.confirm) {
							cancelOrder({
								'order_id': parseInt(orderId)
							}, (res) => {
								if (res.code !== 0) {
									uni.showModal({
										title: '错误提示',
										content: '网络异常，请稍后重试',
										showCancel: false
									})
									return
								}
								uni.showToast({
								    title:'订单取消成功',
								    icon:'none'
								})
								that.detail.pay_order.status_int = 4   // 订单取消
								that.statusStr = OrderStatusStr(that.detail.pay_order.status_int)
								that.used = true
							})
						} else if (res.cancel) {
							console.log('cancel')
						}
					}
				});
			},
			againPrePay(orderId) {
				AgainPrePay({
					'order_id': orderId
				}, (res) => {
					if (res.code !== 0) {
						uni.showModal({
							title: '错误提示',
							content: '网络异常，请稍后重试',
							showCancel: false
						})
						return
					}
					wx.requestPayment
					(
						{
							"timeStamp": res.data.timeStamp,
							"nonceStr": res.data.nonceStr,
							"package": res.data.package,
							"signType": res.data.signType,
							"paySign": res.data.paySign,
							"success":function(res){
							     // 跳转个人中心
							     uni.navigateTo({
							     	url: '/pages/user/user'
							     })
							},
							"fail":function(res){
								uni.showModal({
									title: '提示',
									content: '已取消支付',
									showCancel: false
								})
								return
							},
							"complete":function(res2){
								console.log("complete:"+res)
							}
						}
					)
				})
			},
			againBuy(from, goodsId) {
				if (from == 'tour') {
					console.log(from)
					console.log(goodsId)
					uni.navigateTo({
						url: '/pages/list/info?id=' + goodsId
					})
				}
				if (from == 'freey') {
					
				}
			}
		}
	}

</script>

<style lang="scss" scoped>
   @import './order_completion.scss'
</style>

<style>
	.used {
		color:#DCDCDC !important;
		text-decoration: line-through;
	}
	.del-button {
		display: flex;
		justify-content: center;
		align-items: center;
		letter-spacing: 1rpx;
		font-size: 20rpx;
		width: 20%;
		height: 57rpx;
		background: #c8c8c8;
		border-radius: 20rpx;
		color: #fff;
		margin-top: 39rpx;
		float: right;
		margin-right: 15rpx;
	}
	.order-button {
		display: flex;
		justify-content: center;
		align-items: center;
		letter-spacing: 1rpx;
		font-size: 20rpx;
		width: 20%;
		height: 57rpx;
		background: #2765F2;
		border-radius: 20rpx;
		color: #fff;
		margin-top: 39rpx;
		float: right;
		margin-right: 15rpx;
	}
</style>