<template>
	<view class="login-page">	
    <!-- 授权登录按钮 -->
    <view class="submit-btn"  @tap.stop="openAuthorizationModal" v-if="hasPhone && !hasUserInfo">
      授权您的昵称和头像信息
    </view>
	<button class="submit-btn" style="padding:2px;" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="!hasPhone">
	  用户账号一键登陆
	</button>
	<view class="submit-btn"  @tap.stop="openAuthorizationModal" v-if="hasPhone && hasUserInfo">
	  已注册 一键登陆
	</view>

    <wx-user-info-modal
      v-model="showAuthorizationModal"
      @updated="updatedUserInfoEvent"
    ></wx-user-info-modal>
	</view>
</template>

<script>
    import WxUserInfoModal from '@/uni_modules/tuniaoui-wx-user-info/components/tuniaoui-wx-user-info/tuniaoui-wx-user-info.vue'
	import { WeixinPhone, WeixinCode } from '@/api/weixin'
	import { MemberInfoUpdate, Member } from '@/api/member'
	export default {
    components: { WxUserInfoModal },
	data() {
			return {
				showAuthorizationModal: false,
				userInfo: {},
				phone: '',
				hasPhone: false,
				hasUserInfo: false,
			}
	},
	created() {
		let phone = uni.getStorageSync('phone')
		if (phone) {
			this.hasPhone = true
			this.phone = phone
			// 获取用户信息
			let userInfo = uni.getStorageSync('userInfo')
			if (userInfo) {
				this.hasUserInfo = true
				this.userInfo = userInfo
			}
		}
	},
	methods: {
		 // 打开获取用户信息弹框
		  openAuthorizationModal() {
			this.showAuthorizationModal = true
		  },
		  // 获取到的用户信息
		  updatedUserInfoEvent(info) {
			this.userInfo = info
			console.log(info)
			// 放入缓存中
			uni.setStorageSync('userInfo', info)
			// 开始登陆
			this.login()
		  },
		  // 获取用户手机号
		  getPhoneNumber(e) {
			 var that = this
			 WeixinPhone(e.detail.code, (res) => {
				 if (res.code !== 0) {
					uni.showModal({
						title: 'title',
						content: '授权失败，请重新授权',
						showCancel: false
					})
					return 
				 }
				 that.phone = res.data.phone
				 that.hasPhone = true
				 // 放入缓存中
				 uni.setStorageSync('phone', that.phone)
			 })
		  },
		  login() {
		  	var that = this
		  	uni.login({
		  	  provider: 'weixin', //使用微信登录
		  	  onlyAuthorize: true,
		  	  success: function (res) {
		  	    if (res.errMsg != "login:ok") {
		  			uni.showModal({
		  				title: 'title',
		  				content: '您取消了授权登录，请重新授权',
		  				showCancel: false
		  			})
		  			return
		  		} else {
		  			console.log(res)
		  			WeixinCode(res.code, (res) => {
		  				if (res.code !== 0) {
		  					uni.showModal({
		  						title: 'title',
		  						content: '授权失败，请重新授权(1001)',
		  						showCancel: false
		  					})
		  					return
		  				}
		  				// 设置openid, token
		  				that.openid = res.data.openid
		  				uni.setStorageSync('openid', res.data.openid)
		  				uni.setStorageSync('token', res.data.salt)
		  				
		  				// 获取用户基本数据
		  				wx.getUserInfo({
		  					success: function(res) {
		  					   if (res.errMsg != "getUserInfo:ok") {
		  					   	uni.showModal({
		  					   		title: 'title',
		  					   		content: '您取消了授权登录，请重新授权(1003)',
		  					   		showCancel: false
		  					   	})
		  					   	return
		  					   } else {
		  					   	const {avatarUrl:avatar, city, country, gender, nickName:nickname, province} = res.userInfo
		  						// 更新用户数据
		  						MemberInfoUpdate({
		  							"avatar": that.userInfo.avatar,
		  							"nickname": that.userInfo.nickname,
		  							"gender": gender,
		  							"country": country,
		  							"province": province,
		  						    "city": city,
									"phone": that.phone,
		  							"openid": that.openid		  
		  						}, (res) => {
		  							if (res.code !== 0) {
		  								uni.showModal({
		  									title: 'title',
		  									content: '授权失败，请重新授权(1004)',
		  									showCancel: false
		  								})
		  								return
		  							}
		  						    uni.setStorageSync('memberInfo', {
		  								"avatar": that.userInfo.avatar,
		  								"nickname": that.userInfo.nickname,
		  								"gender": gender,
		  								"country": country,
		  								"province": province,
										"phone": that.phone,
		  								"city": city	  
		  							})
		  							// 跳转个人中心
		  							uni.navigateTo({
		  								url: '/pages/user/user'
		  							})
		  						})
		  					   }
		  					},
		  					fail: function(e) {
		  						uni.showModal({
		  							title: 'title',
		  							content: '授权失败，请重新授权(1002)',
		  							showCancel: false
		  						})
		  						return
		  					}
		  				})
		  			})
		  		}
		  	  }
		  	});
		  }
		}
	}
</script>

<style>
	.login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* 授权按钮 */
  .submit-btn {
    width: 100%;
    background-color: #05C160;
    color: #FFFFFF;
    margin-top: 60rpx;
    border-radius: 10rpx;
    padding: 25rpx;
    font-size: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30rpx;
  }
</style>
