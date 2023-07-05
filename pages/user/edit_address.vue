<template>
	<view class="newly">
	  <view class="newly_a">
	
	    <view class="tex">
	    <text>收件人</text>
	     <input placeholder="请输入姓名" v-model="name" maxlength='6' placeholder-style=" color:#99A1B2;"></input>
	    </view>
	
	     <view class="tex">
	    <text>手机号码</text>
	     <input placeholder="请输入11位手机号码" v-model="phone"  type="number" maxlength='11' placeholder-style=" color:#99A1B2;"></input>
	    </view>
	                    
	     <view class="tex">
	    <text>详细地址</text>
	     <input placeholder="收货地址" v-model="address"  maxlength='25' placeholder-style=" color:#99A1B2;"></input>
	    </view>
	
	     <view class="tex" style="border:none;">
	    <text>设为默认</text>
	    <view class="moren" v-model="is_default">
	      <switch class="quan2" color="#2F7DFE" />
	    </view>
	    </view>
		
		<view class="cans" @click="agreeBtn">
		  <image class="gou" v-if="agree" src="../../static/gouxuan.png"></image>
		  <view class="gou" v-else></view>
		  已阅读并同意
		  <text style="color: #0055FF;" @click="toxieyi">《用户协议及隐私政策》</text>
		</view>
	  
	    <!-- butt -->
	<view class="but">
	    <view class="but_a" >
	    <button class="buy" @click="quxiao">取消</button>
	    <button class="buy2" @click="handleSubmit">保存</button>
	    </view>
	  </view>
	
	  </view>
	</view>
	

</template>

<script>
	import { IsLogin } from '@/api/member'
	import { addressOperate } from '@/api/address'
	import footers from '@/compontents/footers/footers.vue'
	export default {
		components:{
			footers: footers
		},
		data() {
			return {
				id: '',
				name: '',
				phone: '',
				address: '',
				is_default: 0,
				agree: false,
			}
		},
		onLoad(params) {
			var that = this
			if (params.id > 0) {
				this.isEdit = true
				this.id = params.id
				
				// 获取信息填充
				addressOperate({
					'oper': 'edit',
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
					that.name = res.data.name
					that.phone = res.data.phone
					that.address = res.data.address
				})
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
			},
			quxiao() {
				uni.navigateBack();
			},
			handleSubmit() {
				if (!this.agree) {
					uni.showToast({
						title:'请先阅读隐私协议',
						icon: 'none',
					})
					return
				}
				if (this.name == '' || this.phone == '' || this.address == '') {
					uni.showToast({
						title:'用户信息不完整',
						icon: 'none',
					})
					return
				}
				addressOperate({
					'oper': 'create',
					'name': this.name,
					'phone': this.phone,
					'address': this.address,
					'is_default': this.is_default
				}, (res) => {
					if (res.code === 0) {
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
						
					} else {
						uni.showToast({
						    title:'添加失败',
							icon:'none',
						})
					}
				})
			},
			agreeBtn() {
				this.agree = !this.agree
			},
			toxieyi() {
				uni.navigateTo({
					url: '/pages/conceal/conceal'
				})
			}
		}
	}
</script>

<style>
	.personage{
	  width: 100%;
	  height: 100%;
	    font-family:PingFang SC;
	}
	.personage_a{
	  width: 650rpx;
	  margin: auto;
	}
	.tex{
	  font-size: 28rpx;
	  height: 120rpx;
	  line-height: 120rpx;
	  border-bottom: 1rpx solid #DEE3F0;
	font-weight:500;
	color:rgba(0,21,62,1);
	}
	.tex text{
	  height: 28rpx;
	  display: inline-block
	}
	
	.tex input{
	  width: 485rpx;
	  position: absolute;
	  height: 28rpx;
	  display: inline-block;
	  margin-top: 40rpx;  
	  margin-left: 114rpx;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow:ellipsis;
	    /* color:#99A1B2; */
	      color:rgba(0,21,62,1);
	}
	picker{
	  display: inline-block;
	     margin-left: 60rpx;
	      /* color:#99A1B2; */
	      font-weight:400;
	        color:rgba(0,21,62,1);
	}
	
	/* 底部 */
	.but{
	  display: flex;
	  position: fixed;
	  bottom:0px;
	  width: 100%;
	  height: 100rpx;
	    background:#feffff;
	}
	.but_a{
	  width: 650rpx;
	}
	
	.buy{
	  margin-top: 5rpx;
	  float: left;
	  width: 305rpx;
	  height: 90rpx;
	  line-height: 90rpx;
	  background: #fff;
	  border: none;
	  border-radius: 40rpx;
	  font-size:28rpx;
	  color: #000;
	font-weight:500;
	box-shadow:0px 20rpx 30rpx 0px rgba(13,94,255,0.08);
	}
	.buy2{
	  margin-top: 5rpx;
	  float: right;
	  width: 305rpx;
	  height: 90rpx;
	  line-height: 90rpx;
	 background:linear-gradient(30deg,rgba(13,94,255,1),rgba(47,174,254,1));
	box-shadow:0px 2rpx 2rpx 0px rgba(255,255,255,1), 0px 20rpx 30rpx 0px rgba(13,94,255,0.16);
	  border: none;
	  border-radius: 40rpx;
	  font-size:28rpx;
	  color: #fff;
	font-weight:500;
	}
	/* 去除默认边框 */
	button::after{ border: none; }
	.newly{
	  width: 100%;
	  height: 100%;
	    font-family:PingFang SC;
	}
	.newly_a{
	  width: 650rpx;
	  margin: auto;
	}
	.tex text{
	  width: 121rpx;
	}
	.tex input{
	  margin-left: 60rpx;
	}
	.moren{
	  margin-left: 60rpx;
	  display: inline-block;	
	}
	.quan2{
	    margin-top: -50rpx;
	}
	switch{
	  position: relative;
	    top: -8rpx;
	    zoom: .7;
	    color: #2F7DFE;
	}
	.gou {
	  width: 26rpx;
	  height: 26rpx;
	  background: #f5f5f5;
	  border: 1rpx solid #999;
	  border-radius: 50%;
	  margin-right: 15rpx;
	}
	.cans{
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin-top: 30rpx;
	}
</style>