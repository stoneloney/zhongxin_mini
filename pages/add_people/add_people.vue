<template>
	<view class="content">
		<view class="form">
			<view class="label" @click="show = true">
				<text class="name">证件类型</text>
				<view class="change">
					<text>{{selector[index]}}</text>
					<image src="../../static/rights.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="label">
				<text class="name">姓名</text>
				<view class="change">
					<input type="text" v-model="name" placeholder="与乘机人证件一致" placeholder-class="s">
				</view>
			</view>
			<view class="label">
				<text class="name">证件号码</text>
				<view class="change">
					<input type="text" v-model="id_number" placeholder="与乘机人证件一致" placeholder-class="s">
				</view>
			</view>
			<view class="label">
				<text class="name">手机号</text>
				<view class="change">
					<view class="select" @click="show1 = true">
						<text>{{selector1[index1]}}</text>
						<image src="../../static/downs.png" mode="widthFix"></image>
					</view>
					<input type="text" v-model="phone" placeholder="用于接受航变信息" placeholder-class="s">
				</view>
			</view>
		</view>
		<view class="line">
			<text>常旅客卡(选填)</text>
			<switch checked style="transform: scale(0.8);" @change="switch1Change" />
		</view>
		<view class="fonts">
			<text class="title">点击保存表示您已阅读并同意以下内容</text>
			<text
				class="des">请您根据航空公司要求，购买机票需提交乘机人身份证件信息，并在乘机时出具对应身份证件用于验证，请确保录入信息真实有效。将通过加密等方式保护您录入的身份证件信息，且在具体订票过程中授权提供给您提供服务的产品供应商、承运人、机票分销系统服务商。</text>
		</view>
		<view class="button" @click="save">保存</view>
		<u-picker mode="selector" @confirm='change' v-model="show" :default-selector="[0]" :range="selector"></u-picker>
		<u-picker mode="selector" @confirm='change1' v-model="show1" :default-selector="[0]"
			:range="selector1"></u-picker>
	</view>
</template>

<script>
	//import {mapState, mapGetters, mapMutations} from 'vuex'
	import {MemberPassengerCreate, MemberPassengerUpdate, MemberPassengerInfo} from '@/api/member'
	export default {
		data() {
			return {
				id: '',
				isEdit: false,
				show: false,
				selector: ['身份证', '护照', '回乡证'],
				index: 0,
				show1: false,
				selector1: ['+86', '+241'],
				index1: 0,
				name: '',   // 用户名
				id_number: '',
				phone: '',
			}
		},
		computed: {
			//...mapGetters(['isLogin','openid','token'])
		},
		onLoad(params) {
			var that = this
			if (params.id > 0) {
				this.isEdit = true
				this.id = params.id
				
				// 获取信息填充
				MemberPassengerInfo({
					id: parseInt(params.id)
				}, (res) => {
					if (res.code !== 0) {
						uni.showModal({
							title: '错误提示',
							content: '网络异常，请稍后重试',
							showCancel: false
						})
						return 
					}
					that.name = res.data.name
					that.phone = res.data.phone
					that.id_number = res.data.id_number
				})
			}
		},
		methods: {
			save: function() {
				if (this.isEdit) {
					MemberPassengerUpdate({
						id: parseInt(this.id),
						name: this.name,
						phone: this.phone,
						id_number: this.id_number
					}, (res) => {
						if (res.code !== 0) {
							uni.showModal({
								title: '错误提示',
								content: '网络异常，请稍后重试',
								showCancel: false
							})
							return
						}
						
						// 修改完成 返回上页
						uni.navigateBack()
					})
				} else {
					MemberPassengerCreate({
						'name': this.name,
						'phone': this.phone,
						'id_number': this.id_number
					}, (res) => {
						if (res.code !== 0) {
							uni.showModal({
								title: '错误提示',
								content: '网络异常，请稍后重试',
								showCancel: false
							})
							return
						}
						/*
						uni.redirectTo({
							url: '/pages/confire/confire'
						})
						*/
					   //uni.navigateBack()
					   uni.showToast({
					        title:'添加成功',
							success:function() {
								var pages = getCurrentPages();
								var currPage = pages[pages.length - 1]; //当前页面
								var prevPage = pages[pages.length - 2]; //上一个页面
								prevPage.setData({
									 isDoRefresh:true
								})
								uni.navigateBack();
							}
					   })
						  
					})
				}
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
			},
			change(e) {
				this.index = e[0]
			},
			change1(e) {
				this.index1 = e[0]
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
		min-height: 100vh;
		padding: 30rpx 24rpx;
		position: relative;

		.button {
			position: fixed;
			left: 50%;
			transform: translateX(-50%);
			bottom: 39rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			width: 683rpx;
			height: 97rpx;
			background: #2765F2;
			border-radius: 20rpx;
			color: #fff;
		}

		.fonts {
			width: 100%;
			margin-top: 30rpx;

			.title {
				display: block;
				font-size: 23rpx;
				color: #888888;
				font-weight: bold;
				margin-bottom: 10rpx;
			}

			.des {
				display: block;
				font-size: 23rpx;
				color: #888888;
				line-height: 42rpx;
			}
		}

		.line {
			width: 100%;
			background: #fff;
			border-radius: 20rpx;
			position: relative;
			z-index: 9;
			margin-top: 27rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 28rpx 0 52rpx;

			text {
				font-size: 28rpx;
				color: #444A58;
			}
		}

		.form {
			width: 100%;
			background: #fff;
			border-radius: 20rpx;
			position: relative;
			z-index: 9;
			padding-left: 29rpx;

			.label {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #EEEEEE;
				padding-left: 21rpx;

				.change {
					height: 100%;
					display: flex;
					align-items: center;
					width: 498rpx;
					position: relative;

					&>image {
						width: 11rpx;
						position: absolute;
						right: 36rpx;
						top: 50%;
						transform: translateY(-50%);
					}

					.select {
						display: flex;
						height: 100%;
						align-items: center;
						justify-content: center;
						padding-right: 20rpx;

						text {
							font-size: 28rpx;
							color: #444A58;
						}

						image {
							width: 11rpx;
							margin-left: 10rpx;
						}
					}

					&>text {
						font-size: 28rpx;
						color: #444A58;
					}

					input {
						height: 100%;
						flex: 1;
						font-size: 28rpx;
						color: #444A58;
					}

					.s {
						color: #C4C5C8;
					}
				}

				.name {
					display: block;
					font-size: 28rpx;
					color: #444A58;
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