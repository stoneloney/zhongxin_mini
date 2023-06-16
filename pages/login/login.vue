<template>
	 <view class="container">
		 <button open-type="getUserInfo" @getuserinfo="getUserInfo">微信一键登录</button>
	 </view>
</template>

<script>
	import Member from '@/api/member'
	import {mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['SET_MEMBER']),
			async getUserInfo(e) {
				const {errMsg, userInfo} = e.detail
				if (errMsg != "getUserInfo:ok") {
					uni.showModal({
						title: 'title',
						content: '您取消了授权登录，请重新授权',
						showCancel: false
					})
					return
				} else {
					const {avatarUrl:avatar, city, country, gender, nickName:nickname, province} = userInfo
					const member = Object.assign(Member, {avatar, city, country, gender, nickname, province})
					this.SET_MEMBER(member)
					
					uni.navigateBack()
				}
			}
		}
	}
	
</script>

<style>
</style>