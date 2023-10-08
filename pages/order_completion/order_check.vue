<template>
	<view class="YmContent">
			<view class="order_completion_72">
				<view class="order_completion_66">
					<text decode="true" class="order_completion_48">订单信息</text>
					<view class="order_completion_67">
						<view class="order_completion_51">
							<text decode="true" class="order_completion_52">产品名称</text>
							<text decode="true" class="address">{{ detail.goods.name }}</text>
						</view>
						<view class="order_completion_51">
							<text decode="true" class="order_completion_52">订单号</text>
							<text decode="true" class="address">{{ detail.pay_order.order_id }}</text>
						</view>
						<view class="order_completion_51">
							<text decode="true" class="order_completion_52">价格</text>
							<text decode="true" class="address">¥{{ detail.pay_order.price }} x {{ detail.pay_order.number }} </text>
						</view>
						<view class="order_completion_51">
							<text decode="true" class="order_completion_52">订单时间</text>
							<text decode="true" class="address">{{ detail.pay_order.create_date }}</text>
						</view>
						<view class="order_completion_51">
							<text decode="true" class="order_completion_52">订单状态</text>
							<text decode="true" class="address">{{ OrderStatusStr(detail.pay_order.status_int) }}</text>
						</view>
						<view class="order_completion_51">
							<text decode="true" class="order_completion_52">微信昵称</text>
							<text decode="true" class="address">{{ detail.member.name }}</text>
						</view>
						<view class="order_completion_51">
							<text decode="true" class="order_completion_52">联系人电话</text>
							<text decode="true" class="address">{{ detail.member.phone }}</text>
						</view>
					</view>
					<view class="order_completion_60">
						<view @click="orderUse(detail.pay_order.order_id)">
							<image  src="/static/use.png" mode="scaleToFill" border="0"    class="order_completion_61"></image>
							<text decode="true" class="btFaPiao">确认使用</text>
							<view class="order_completion_63"></view>
						</view>
						<view @click="back">
							<image  src="/static/back.png" mode="scaleToFill" border="0"    class="order_completion_64"></image>
							<text decode="true" class="btService">返回</text>
						</view>
					</view>
				</view>
			</view>

		<view class="ymBbottom"></view>
	</view>
</template>

<script>
	import { orderDetail, payOrderUse, OrderStatusStr } from '@/api/orders'
	export default {
		data() {
			return {
				detail: {}
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
			})
		},
		methods: {
			OrderStatusStr,
			orderUse(orderId) {
				var that = this
				uni.showModal({
				    title: '提示',
				    content: '确认销核吗？',
				    success: function (res) {
				        if (res.confirm) {
				            payOrderUse({
				            	'order_id': parseInt(orderId),
				            }, (res) => {
				            	if (res.code !== 0) {
				            		uni.showModal({
				            			title: '错误提示',
				            			content: '销核失败',
				            			showCancel: false
				            		})
				            		return
				            	}
								that.detail.pay_order.status = "订单已使用"
				            	uni.showToast({
				            	    title:'销核成功'
				            	})
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			back() {
				uni.navigateBack()
			}
		}
	}

</script>

<style lang="scss" scoped>
   @import './order_completion.scss'
</style>