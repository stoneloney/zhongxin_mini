<template>
	<view class="indent">
	  <view class="indent_a" v-if="hasOrder">
	   <view hover-class="none" v-for="(item, index) in orders">
		 <view class="chanpin" @click="detail(item.order_id)">
			  <view class="fl"><image :src="item.timage"></image></view>
				<view class="fr">
				  <view>{{ item.ttitle }}</view>
				</view>
	      </view>  
	      <view class="mone">
	        <view class="fr_a">
			   <text class="status">{{ OrderStatusStr(item.status) }} </text>
	           <text class="goods_total"> 共1件商品 </text>
	           <text> 共计: ¥{{ item.price }} </text>
	        </view>
	      </view>
	    </view> 
	       <!--
		  <view class="consult">
			<view class="consult_a">
				<view class="butt" bindtap="tel">客服咨询</view>
			</view>
		  </view>
		  -->
	   </view>
	   
	   <view class="address" v-if="!hasOrder">
	     <view class="address_a">
	   	  <view class="img" style="background-image: url('http://m.qpic.cn/psb?/V13t2G4i0uprYL/uYo8U.oo0vWONsW93wC*ppXK6ZFdHOgOlSEiEbXukxY!/b/dFIBAAAAAAAA&bo=OQKmAQAAAAADB74!&rf=viewer_4'); width: 569rpx;height: 422rpx;"></view>
	   	  <view class="img2">暂无订单</view>
	     </view>
	   </view>
	   
	</view> 
	
</template>

<script>
	import { IsLogin } from '@/api/member'
	import { orderList, OrderStatusStr } from '@/api/orders'
	import footers from '@/compontents/footers/footers.vue'
	export default {
		components:{
			footers: footers
		},
		data() {
			return {
				isLogin: false,
				orders: [],
				hasMore: true,
				page: 1,
				limit: 20,
				hasOrder: true,
			}
		},
		created() {
			var that = this
			this.isLogin = IsLogin() ? true : false
			
			if (this.isLogin) {
				orderList({'page': this.page, 'limit': this.limit}, (res) => {
					if (res.code !== 0) {
						uni.showModal({
							title: '错误提示',
							content: '网络异常，请稍后重试',
							showCancel: false
						})
						return 
					}
					if(res.data.list.length <= 0) {
						that.hasOrder = false
					}
					that.orders = res.data.list
				})
			} else {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
		},
		// 页面触底加载数据
		onReachBottom() {
			console.log('onReachBottom')
			var that = this
			if (!this.hasMore) {
				return
			}
			this.page += 1
			orderList(this.page, this.limit, (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				if (res.data.list.length < that.limit) {
					that.hasMore = false
				}
				that.orders = that.orders.concat(res.data.list)
			})
		},
		methods: {
			OrderStatusStr,
			link(url) {
				uni.navigateTo({
					url,
				})
			},
			detail(orderId) {
				uni.navigateTo({
					url: '/pages/order_completion/order_completion?id=' + orderId
				})
			},
			imgError(index) {
				this.$set(this.orders, index, '/static/ws1.png');
			}
		}
	}
</script>

<style>
	page{
	    background: rgba(244, 247, 255, 1);
	}
	.indent {
	  width: 100%;
	  height: 100%;
	  background: rgba(244, 247, 255, 1);
	  font-family: PingFang SC;
	}
	
	.indent_a {
	  background: #fff;
	
	}
	
	.chanpin {
	  width: 650rpx;
	  margin: auto;
	  height: 170rpx;
	
	}
	
	/* .chanpin:last-child {
	  border: none;
	} */
	
	.fl image {
	  margin-top: 50rpx;
	  float: left;
	  width: 186rpx;
	  height: 120rpx;
	  border-radius: 5rpx;
	}
	
	.fr {
	    display:-webkit-box;
	   overflow:hidden;
	   text-overflow:ellipsis;
	   -webkit-line-clamp:2;
	   -webkit-box-orient:vertical;
	  height: 85rpx;
	  width: 428rpx;
	  margin-top: 52rpx;
	  float: left;
	  margin-left: 29rpx;
	  font-weight: 500;
	  font-size: 28rpx;
	}
	
	.fr view:nth-child(1) {
	  font-size: 28rpx;
	}
	
	.mone {
	  width: 100%;
	  background: #fff;
	  height: 82rpx;
	  line-height: 82rpx;
	}
	
	.fr_a {
	  width: 650rpx;
	  height: 81rpx;
	  margin: auto;
	  font-size: 24rpx;
	  font-weight: 500;
	  border-bottom: 1rpx solid #dee3f0;
	}
	
	.fr_a text:nth-child(1) {
	  margin-left: 309rpx;
	  display: inline-block;
	}
	
	.fr_a text:nth-child(2) {
	  margin-left: 17rpx;
	  display: inline-block;
	}
	.consult{
	  height: 100rpx;
	  background: #fff;
	  border-bottom: 30rpx solid #F4F7FF;
	}
	.consult_a{
	  width: 650rpx;
	  margin: auto;
	}
	.butt{
	  margin-top: 23rpx;
	  float: right;
	  width:149rpx;
	height:54rpx;
	border:1px solid rgba(13,94,255,1);
	border-radius:27px;
	font-size:24rpx;
	font-weight:500;
	color:rgba(13,94,255,1);
	line-height: 54rpx;
	text-align: center;
	}
	
	
	/* pages/address/address.wxss */
	.address{
	  width: 100%;
	  height: 100%;
	  font-family:PingFang SC;
	  color:rgba(0,21,62,1);
	}
	.img{
	   background-repeat: no-repeat;
	  /* background-size: 100% 100%;  */
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
	.enter{
	    margin-top: 188rpx;
	  width: 650rpx;
	  height: 100rpx;
	  border-radius: 50rpx 50rpx;
	  font-size: rpx;
	  background: #f9f9f9;
	  color: #fff;
	  font-weight:500;
	 line-height: 100rpx;
	 text-align: center;
	   background-image: linear-gradient(to right, #0055ff , #8dd2fe);
	}
	.status {
		float: left;
		color: indianred;
	}
	.goods_total {
		margin-right: 5px;
	}
</style>