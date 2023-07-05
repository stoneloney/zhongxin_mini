<template>
	<view class="ma_ticket"  >
	<view class="swiper-tab">  
	    <view class="swiper-tab-list" :class="currentTab == 0?'on':''" @click="currentTab = 0">有效礼券</view>  
	    <view class="swiper-tab-list" :class="currentTab == 1?'on':''" @click="currentTab = 1">过期礼券</view>   
	</view>  
	  
	<!-- 有效票 -->  
	<view class="swiper-box">  
	 <view hover-class="none" class="chanpin2" v-if="hasTicket">
		<view class="fc"><image src="aaaa"></image></view>
		<view class="fr_huo">
		  <view class="y_h">11111</view>
		 <view class="shijian">
		  <view class="sheng">2222</view>  <view class="shi">3333</view>
		   <view class="sjj">444444</view>
		   </view>
		  <view class="pric">¥ 11111 </view>
		</view>
		 <view class="aoto"></view>
	  </view>   
	       
	    
		<view class="address" v-if="!hasTicket">
		  <view class="address_a">
			  <view class="img" style="background-image: url('http://m.qpic.cn/psb?/V13t2G4i0uprYL/uYo8U.oo0vWONsW93wC*ppXK6ZFdHOgOlSEiEbXukxY!/b/dFIBAAAAAAAA&bo=OQKmAQAAAAADB74!&rf=viewer_4'); width: 569rpx;height: 422rpx;"></view>
			  <view class="img2">暂无礼券</view>
		  </view>
		</view>
	</view>  
	
	    <!-- 无效票 -->  
	<view class="swiper-box" v-if="hasTicket"> 
		<view class="chanpin2">
		<view class="fc"><image src="aaaaa"></image></view>
		<view class="fr_huo">
		  <view class="y_h">1111</view>
		  <view class="shijian">
		  <view class="sheng">2222</view>  <view class="shi">3333</view>
		   <view class="sjj">44444</view>
		   </view>
		  <view class="pric">¥55555</view>
		</view>
		<view class="fr_img"><image src="../../static/shanchu.png"></image></view>
		<view class="aoto"></view>
    </view>  
	     
	
	
	<view class="address" v-if="!hasTicket">
	  <view class="address_a">
	      <view class="img" style="background-image: url('http://m.qpic.cn/psb?/V13t2G4i0uprYL/uYo8U.oo0vWONsW93wC*ppXK6ZFdHOgOlSEiEbXukxY!/b/dFIBAAAAAAAA&bo=OQKmAQAAAAADB74!&rf=viewer_4'); width: 569rpx;height: 422rpx;"></view>
	      <view class="img2">暂无票券~</view>
	  </view>
	</view>
	    </view>  
	</view>

</template>

<script>
	import { IsLogin } from '@/api/member'
	import footers from '@/compontents/footers/footers.vue'
	export default {
		components:{
			footers: footers
		},
		data() {
			return {
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
	  /* height: 80rpx; */
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
	
	.swiper-box {
	  position: relative;
	  top:80rpx;
	  display: block;
	  /* height: 100%; */
	  width: 100%;
	  overflow: hidden;
	}
	
	
	.aoto{
	  height: 1rpx;
	
	 width: 650rpx;
	 background: #dee3f0;
	 /* border-bottom: 1rpx solid #dee3f0; */
	}
	/* .aoto:last-child{
	  border: none;
	} */
	.chanpin2:nth-child(1) .aoto{
	display: none;
	}
	.chanpin2{
	  overflow: hidden;
	  margin-left: 50rpx;
	  height: 256rpx;
	}
	.fl image{
	  margin-top: 50rpx;
	  float: left;
	  width: 186rpx;
	  height: 120rpx;
	}
	.fr{
	  width: 428rpx;
	    margin-top: 52rpx;
	  float: left;
	  margin-left: 29rpx;
	  font-weight:500;
	}
	.fr_img{
	  height: 255rpx;
	  width: 50rpx;
	  float: right;
	}
	.fr_img image{
	    margin-top: 115rpx;
	  width: 28rpx;
	  height: 30rpx;
	}
	.fr view:nth-child(1){
	  font-size:28rpx;
	}
	.fr view:nth-child(2){
	  font-size:24rpx;
	  margin-top: 16rpx;
	}
	
	.fr_a{
	   width: 428rpx;
	    margin-top: 52rpx;
	  float: left;
	  margin-left: 29rpx;
	  font-weight:500;
	}
	
	.fr_a view:nth-child(1){
	  font-size:28rpx;
	}
	.fr_a view:nth-child(2){
	  font-size:24rpx;
	font-weight:400;
	  margin-top: 10rpx;
	}
	.fr_a view:nth-child(3){
	  font-size:28rpx;
	font-weight:500;
	  margin-top: 10rpx;
	  color:rgba(255,62,42,1)
	}
	/*  */
	
	.fc image{
	    margin-top: 50rpx;
	  float: left;
	  width: 240rpx;
	  height: 155rpx;
	}
	
	.fr_huo{
	  overflow: hidden;
	   width: 370rpx;
	    margin-top: 52rpx;
	  float: left;
	  margin-left: 29rpx;
	  font-weight:500;
	}
	.y_h{
	  font-size:24rpx;
	  width: 340rpx;
	    display:-webkit-box;
	   overflow:hidden;
	   text-overflow:ellipsis;
	   -webkit-line-clamp:2;
	   -webkit-box-orient:vertical;
	}
	.pric{
	    font-size:28rpx;
	font-weight:500;
	  margin-top: 15rpx;
	color:rgba(255,62,42,1);
	}
	.shijian{
	  width: 350rpx;
	  overflow: hidden;
	color:rgba(79,90,119,1);
	font-weight:400;
	  font-size:20rpx;
	  margin-top: 15rpx;
	}
	.sheng{
	  float: left;
	  width: 60rpx;
	  overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	}
	.shi{
	  float: left;
	  margin-left: 10rpx;
	    width: 60rpx;
	  overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	}
	.sjj{
	 float: right;
	 /* margin-right: 20rpx; */
	}
	
	/* pages/address/address.wxss */
	.address{
	  width: 100%;
	  /* height: 100%; */
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
</style>