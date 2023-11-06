<template>
	<view class="content">
		<view class="main_info">
			<text class="title">航程信息</text>
			<view class="label">
				<text class="f">飞机型号：</text>
				<view class="change">
					<text> {{ reserve.plane.name }}   </text>
				</view>
			</view>
			<view class="label">
				<text class="f">座位数：</text>
				<view class="change">
					<text> {{ reserve.plane.number }}座</text>
					<!--
					<image src="../../static/confire2.png" mode="widthFix"></image>
					 -->
				</view>
			</view>
		</view>
		<view class="userinfo">
			<text class="title" v-if="selectIds.length > 0">已选：{{ selectIds.length }}人</text>
			<view class="label" :class="{ on:selectIds.indexOf(item.id) > -1 }" v-for="(item, index) in reserve.passenger" @click="addSelect(item.id)">
				<view class="check"></view>
				<view class="grow">
					<text class="name">{{ item.name }}</text>
					<text class="id">身份证：{{ item.id_number }}</text>
				</view>
				<view class="edit" @click="edit(item.id)">
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
					<input type="text" placeholder="请输入" placeholder-class="s" v-model="msg_phone">
					<text>订单信息发送到此手机号</text>
				</view>
			</view>
		</view>
		<view class="contact2" v-if="hasTicket">
			<text class="title">优惠</text>
			<view class="change">
				<view class="fl2">
					<text>代金券￥{{ticket.gprice}}</text>
					<text style="color:#FF4200;">-￥{{ticket.gprice}}</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<text class="price">￥<text>{{ totalPrice }} </text></text>
			<view class="btn" @click="PrePay()">立即支付</view>
		</view>
	</view>
</template>

<script>
	import { MemberTicketReserve, IsLogin, MemberPassengerInfo } from "@/api/member"
	import { PrePay, Pay } from "@/api/weixin"
	export default {
		data() {
			return {
				reserve: {},
				selectIds: [],
				totalPrice: 0,
				from: '',
				id: '',
				number: 0,
				msg_phone: '',  // 信息接受人
				pageParams: {},
				// 优惠券
				tickets: [],
				ticket: {},
			    hasTicket: false,
			}
		},
		computed: {
			//...mapGetters(['isLogin'])
		},
		onShow() {
		   var that = this
		   let pages = getCurrentPages();
		   let currPage = pages[pages.length-1];
		   if (currPage.data.isDoRefresh == true){
		     currPage.data.isDoRefresh = false;
		     MemberTicketReserve({
		     	'from': this.pageParams.from,
		     	'id': this.pageParams.id,
		     	'number': this.pageParams.number
		     }, (res) => {
		     	if (res.code !== 0) {
		     		uni.showModal({
		     			title: '错误提示',
		     			content: '网络异常，请稍后重试',
		     			showCancel: false
		     		})
		     		return
		     	}
				that.reserve = res.data
		     	if (that.from == "tour") {
		     		that.totalPrice = that.number * that.reserve.price
		     	}
		     	console.log(that.reserve)
		     })
		   }
		},
 		onLoad(params) {
			/* 
			if (!IsLogin()) {
				console.log('not login, to login page')
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
			*/
		    console.log("params.selectDate:" + params.selectDate)
		    var that = this
			that.from = params.from
			that.id = params.id
			that.number = params.number
			that.pageParams = params
		    MemberTicketReserve({
				'from': params.from,
				'id': params.id,
				'number': params.number,
				'select_date': params.selectDate
			}, (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				that.reserve = res.data
				if (that.from == "tour") {
					that.totalPrice = that.number * that.reserve.price
				}
				// 查看是否有优惠券可以使用
				if (res.data.tickets.length > 0) {
					that.hasTicket = true
					that.ticket = res.data.tickets[0]
					that.totalPrice -= that.ticket.gprice
				}
				console.log(that.reserve)
			})
		},
		methods: {
			link(url){
				uni.navigateTo({
					url,
				})
			},
			addSelect:function(id) {
				let selectIndex = this.selectIds.indexOf(id)
				console.log(selectIndex)
				if (selectIndex < 0) {
					this.selectIds.push(id)
				} else {
					this.selectIds.splice(selectIndex, 1)
				}
				if (this.from == 'ferry') {
					this.totalPrice = this.selectIds.length * this.reserve.price
				}		
			},
			// 修改乘客信息
			edit:function(id) {
				uni.navigateTo({
					url: '/pages/add_people/add_people?id='+id
				})
			},
			// 支付
			PrePay: function() {
				if (this.selectIds.length === 0) {
					uni.showToast({
						title: '请选择乘机人',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.msg_phone.length === 0) {
					uni.showToast({
						title: '请填写联系人号码',
						icon: 'none',
						duration: 2000
					})
					return
				}
				PrePay({
					'id': this.id,
					'from': this.from,
					'select_ids': this.selectIds,   // 选择乘机人
					'number': this.number,          // 购买数量
					'msg_phone': this.msg_phone     ,// 联系人
					'ticket': this.ticket,           // 优惠券
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
				height: 200rpx;
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
				.fl2{
					width: 80%;
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
		.contact2 {
			overflow: hidden;
			width: 100%;
			height: 300rpx;
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
				.fl2{
					width: 100%;
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
