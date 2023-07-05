<template>
	<view>
	<view class="address" v-if="!hasList">
	  <view class="address_a">
		  <view class="img" style="background-image: url('http://m.qpic.cn/psb?/V13t2G4i0uprYL/uYo8U.oo0vWONsW93wC*ppXK6ZFdHOgOlSEiEbXukxY!/b/dFIBAAAAAAAA&bo=OQKmAQAAAAADB74!&rf=viewer_4'); width: 569rpx;height: 422rpx;"></view>
		  <view class="img2"></view>
			<navigator hover-class="none" class="enter" @click="link('/pages/add_people/add_people')" >+ 新增乘客</navigator>
	  </view>
	</view>
	
	<view class="hed" v-if="hasList">
	    <view class="hd" v-for="(item, index) in passengerList">
	    <view  class="hed_a">
	    <view class="content" bindtouchstart="touchS" bindtouchmove="touchM">
			<view class="fl" bindtap="xiugai">
				<view class="tex1">
				  <text class="name">{{ item.name }}</text>
				  <text class="num"></text>
				  <text class="moren" v-if="item.commonly_use === 1">常用</text>
				</view>
				<view class="tex2">证件号: {{ item.id_number }}</view>
			</view>
			<view class="fr"  hover-class="none" @click="delInfo(item.id)">
				<image src="../../static/shanchu.png"></image>
			</view>
			<view class="fr"  hover-class="none" @click="editInfo(item.id)">
				<image src="../../static/bj.png"></image>
			</view>
		</view>
	    <view class="del-button" bindtap="remove">删除</view>
	    </view>
	    </view> 
		
		<view class="butt" style="padding-bottom: 100rpx">
			<view class="but_a">
			<view hover-class="none" @click="link('/pages/add_people/add_people')" class="buy"  >+ 新增乘客</view>
			</view>
		  </view>
		
	</view>
	</view>
</template>

<script>
	import { IsLogin, MemberPassengerList, MemberPassengerDelete } from '@/api/member'
	import footers from '@/compontents/footers/footers.vue'
	export default {
		components:{
			footers: footers
		},
		data() {
			return {
				hasList: true,
				passengerList: [],
			}
		},
		onShow() {
		   var that = this
		   let pages = getCurrentPages();
		   let currPage = pages[pages.length-1];
		   console.log('on show')
		   console.log(currPage.data.isDoRefresh)
		   if (currPage.data.isDoRefresh == true){
			 currPage.data.isDoRefresh = false;
			 MemberPassengerList({}, (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return 
				}
				if (res.data.length > 0) {
					that.hasList = true
					that.passengerList = res.data
				} else {
					that.hasList = false
				}
			 })
		   }
		},
		created() {
			var that = this
			this.isLogin = IsLogin() ? true : false
			if (this.isLogin) {
				MemberPassengerList({}, (res) => {
					if (res.code !== 0) {
						uni.showModal({
							title: '错误提示',
							content: '网络异常，请稍后重试',
							showCancel: false
						})
						return 
					}
					if (res.data.length > 0) {
						that.hasList = true
						that.passengerList = res.data
					} else {
						that.hasList = false
					}
				})
			} else {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
		},
		methods: {
			login() {
				if (!IsLogin()) {
					console.log('not login, to login page')
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				return 
			},
			editInfo(id) {
				uni.navigateTo({
					url: '/pages/add_people/add_people?id='+id
				})	
			},
			delInfo(id) {
				var that = this
				uni.showModal({
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "确认", // 确认按钮文字 
					title: '删除提示',
					content: '是否删除该乘客?',
					confirmColor:'#3B8BFF',
					cancelColor:'#222222',
					success: res => {
						if (res.confirm) {
							MemberPassengerDelete({
								'id': parseInt(id)
							}, (res) => {
								if (res.code !== 0) {
									uni.showModal({
										title: '错误提示',
										content: '网络异常，请稍后重试',
										showCancel: false
									})
									return 
								}
								MemberPassengerList({}, (res) => {
									if (res.code !== 0) {
										uni.showModal({
											title: '错误提示',
											content: '网络异常，请稍后重试',
											showCancel: false
										})
										return 
									}
									if (res.data.length > 0) {
										that.hasList = true
										that.passengerList = res.data
									}
								})
							})
						} else if (res.cancel) {
							console.log('cancel')
						}
					}
				});
			},
			logout() {
				uni.clearStorageSync()
				uni.navigateTo({
					url: '/pages/user/user'
				})
			},
			link(url) {
				uni.navigateTo({
					url,
				})
			}
		}
	}
</script>

<style>
	.address{
	  width: 100%;
	  height: 100%;
	  font-family:PingFang SC;
	  color:rgba(0,21,62,1);
	}
	.address_a{
	  width: 650rpx;
	  margin: auto;
	}
	.img{
	   background-repeat: no-repeat;
	  /* background-size: 100% 100%;  */
	  background-size: cover;
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
	  font-size: 32rpx;
	  color: #fff;
	  font-weight:500;
	 line-height: 100rpx;
	 text-align: center;
	   background-image: linear-gradient(to right, #0055ff , #8dd2fe);
	}
	/* pages/address_a/address_a.wxss */
	
	.hed{
	overflow: hidden;
	  width: 100%;
	  height: 100%;
	  font-family:PingFang SC;
	  color:rgba(0,21,62,1);
	}
	.hd{
	  width: 650rpx;
	  margin: auto;
	}
	.hed_a{
	  overflow: hidden;
	 margin-top: 30rpx;
	  /* margin: auto; */
	  width: 650rpx;
	  height: 180rpx;
	  border:1rpx solid rgba(222,227,240,1);
	  border-radius:10px;
	  position: relative;
	  left: 0;
	/* width: 100%; */
	transition: all 0.3s;
	}
	.content{
	  width: 650rpx;
	  height: 180rpx;
	  position: relative;
	left: 0;
	transition: all 0.3s;
	
	}
	.tex{
	   overflow: hidden;
	
	   padding-top: 49rpx;
	}
	.tex text{
	  height: 38rpx;
	   margin-top: 49rpx;
	  display: inline-block;
	  font-size:30rpx;
	font-weight:500;
	}
	.name{
	      margin-top: 49rpx;
	  height:38rpx;
	   display: inline-block;
	  margin-left: 41rpx;
	}
	.num{
	  height:38rpx;
	   display: inline-block;
	  margin-left: 19rpx;
	}
	.moren{
	 
	  /* margin-top: 40rpx; */
	  display: inline-block;
	  margin-left: 20rpx;
	  width:76rpx;
	height:38rpx;
	background:rgba(13,94,255,1);
	border-radius:19rpx;
	font-size:24rpx;
	text-align: center;
	line-height: 38rpx;
	color:rgba(255,255,255,1);
	}
	.tex2{
	  font-size:26rpx;
	font-weight:400;
	margin-left: 41rpx;
	margin-top: 18rpx;
	}
	.fl{
	    float: left;
	    height: 180rpx;
	      width: 465rpx;
	}
	.fr{
	  float: right;
	  height: 180rpx;
	  width: 70rpx;
	
	}
	.fr image{
	    margin-top: 75rpx;
	    margin-left: 20rpx;
	  width: 28rpx;
	  height: 30rpx;
	}
	/* 底部 */
	.butt{
	  display: flex;
	  position: fixed;
	  bottom:0px;
	  width: 100%;
	  height: 100rpx;
	
	  background: #fff;
	}
	.but_a{
	  width: 650rpx;
	  margin: auto;
	}
	.buy{
	  margin-top: 5rpx;
	  height: 90rpx;
	  text-align:center;
	  line-height: 90rpx;
	background:linear-gradient(30deg,rgba(13,94,255,1),rgba(47,174,254,1));
	box-shadow:0px 2px 0px 0px rgba(255,255,255,1), 0px 20px 30px 0px rgba(13,94,255,0.16);
	  border-radius: 45rpx;
	  font-size:32rpx;
	  color: #fff;
	font-weight:500;
	}
	checkbox{
	  width:40rpx;
	height:40rpx;
	background:rgba(255,255,255,1);
	border-radius:50%;
	}
	
	.item .content{
	  background-color: #ffffff;
	  height: 100%;
	  position: relative;
	  left: 0;
	  width: 100%;
	  transition: all 0.3s;
	}
	 .del-button {
	  position: absolute;
	  right: -140rpx;
	  width: 140rpx;
	  height: 100%;
	  background-color: #df3448;
	  color: #fff;
	  top: 0;
	  text-align: center;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  transition: all 0.3s;
	  font-size: 24rpx;
	}
	.active .content{
	  left: -140rpx;
	}
	.active .del-button{
	  right: 0rpx;
	}
</style>