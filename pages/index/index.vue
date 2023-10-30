<template>
	<view class="content">
		<view class="navbara">
			<view :style="{'height':statusBarHeight+'px'}"></view>
			<view class="child" :style="{height: navBarHeight+'px'}">
				<image src="../../static/logo.png" mode="widthFix"></image>
				<image src="../../static/logo2.png" mode="widthFix"></image>
			</view>
		</view>
		
		 <view class="banner" v-if="videoShow">
			<video id="myVideo" src="https://boatfun.oss-cn-shenzhen.aliyuncs.com/20220524/hhsh.mp4" controls="false" autoplay="true" loop="true" enable-progress-gesture="false" show-center-play-btn="false" show-fullscreen-btn="false" show-play-btn object-fit="fill"></video>
		 </view>
		 
		 <view class="banner" v-if="bannerShow">
			 <u-swiper
						:list="banners"
						keyName="image"
						showTitle
						:autoplay="true"
						circular
						:height="600"
				></u-swiper>
		</view>
		
		<view class="navbar">
			<view @click="link('/pages/list/list')">
				<image src="../../static/home12.png" mode="widthFix"></image>
				<text>空中游览</text>
			</view>
			<view @click="link('/pages/wait/wait')">
				<image src="../../static/home6.png" mode="widthFix"></image>
				<text>包机预定</text>
			</view>
			<!--
			<view @click="link('/pages/Booking/Booking')">
				<image src="../../static/home6.png" mode="widthFix"></image>
				<text>包机预定</text>
			</view>
			-->
			<view @click="link('/pages/date/date')">
				<image src="../../static/home7.png" mode="widthFix"></image>
				<text>长途游览</text>
			</view>
			<view @click="link('/pages/exchange/exchange')">
				<image src="../../static/home8.png" mode="widthFix"></image>
				<text>兑换礼券</text>
			</view>
			<view @click="link('/pages/wait/wait')">
				<image src="../../static/home10.png" mode="widthFix"></image>
				<text>空中120</text>
			</view>
			<view @click="link('/pages/wait/wait')">
				<image src="../../static/home9.png" mode="widthFix"></image>
				<text>中信优选</text>
			</view>
		</view>
		<view class="main_item">
			<text class="title">最新<text>资讯</text></text>
			<scroll-view scroll-x="true" :scroll-with-animation='true'>
				<view class="label" v-for="(item, index) in articles" @tap.click="articleLink(item.id)">
					<view class="pic">
						<image :src="item.image"></image>
					</view>
					<text>{{ item.title }}</text>
				</view> 
			</scroll-view>
		</view>
		<view class="main_item">
			<text class="title">中信<text>优选</text></text>
			<scroll-view scroll-x="true" @click="link('/pages/wait/wait')">
				<view class="label">
					<view class="pic">
						<image src="http://img.chinaboatfun.com/zhongxin/5faed9aeae4b6581ad0e9b0a701c8dd8.jpeg" mode="aspectFill"></image>
					</view>
					<text>中信金沙湾水世界</text>
				</view>
				<view class="label">
					<view class="pic">
						<image src="https://qietu.ahqian.com/xiaot/5.12/home.png" mode="aspectFill"></image>
					</view>
					<text>中信金沙湾公寓</text>
				</view>
				<view class="label">
					<view class="pic">
						<image src="https://qietu.ahqian.com/xiaot/5.12/home3.png" mode="aspectFill"></image>
					</view>
					<text>中信金沙湾海滩</text>
				</view>
			</scroll-view>
		</view>
	
		<footers :currentx='0'></footers>
		
		<u-popup v-if="lotteryShow" mode="center" v-model="lotteryShow" :mask-close-able="false" :closeable="true">
			<view>
				<pt-lottery
					ref="pt-lottery"
					lotteryBg="../../static/lottery/lotteryBg.png"
					lotteryBtn="../../static/lottery/lotteryBtn.png"
					:times="1"
					:prizeList="prizeList"
					:showTimes="false"
					@start="lotteryStart"
					@end="lotteryEnd">
				</pt-lottery>
			</view>
		</u-popup>
		
	</view>
	
</template>

<script>
	import footers from '@/compontents/footers/footers.vue'
	import { mainInfo, lottery } from '@/api/index.js'
	export default {
		components:{
			footers: footers
		},
		data() {
			return {
				height: 0,
				//胶囊位置信息
				menuButtonRect: {},
				//状态栏的高度
				statusBarHeight: 0,
				//导航栏的高度
				navBarHeight: 0,
			    banners: [],
				articles:[],
				share: {
					title: '',
					path: '',
					imageUrl: '',
					desc: '',
					content: ''
				},
				videoShow: true,
				bannerShow: false,
				// 抽奖
				lotteryShow: false,
				prizeIndex: 0,
				prizeList: [],
				lotteryId: 0,
				/*
				prizeList: [{
					prizeName: 'iphone 12',
					prizeIcon: '../../static/lottery/prizeIcon.png'
				},{
					prizeName: 'iphone 11',
					prizeIcon: '../../static/lottery/prizeIcon.png'
				},{
					prizeName: 'iphone 10',
					prizeIcon: '../../static/lottery/prizeIcon.png'
				},{
					prizeName: 'iphone 9',
					prizeIcon: '../../static/lottery/prizeIcon.png'
				},{
					prizeName: 'iphone 8',
					prizeIcon: '../../static/lottery/prizeIcon.png'
				},{
					prizeName: 'iphone 7',
					prizeIcon: '../../static/lottery/prizeIcon.png'
				},{
					prizeName: 'iphone 6',
					prizeIcon: '../../static/lottery/prizeIcon.png'
				},{
					prizeName: '谢谢惠顾',
					prizeIcon: '../../static/lottery/no.png'
				}]
				*/
			}
		},
		mounted() {
			this.getheight()
		},
		onLoad() {
			var that = this
			setTimeout(function() {
				that.videoShow = false
				that.bannerShow = true
			}, 10000)			
		},
		created() {
			var that = this
			mainInfo((res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				that.banners = res.data.banners
				that.articles = res.data.articles
				
				// 初始化抽奖
				if (res.data.lotterys.length > 0) {
				    that.lotteryId = res.data.lotterys[0].id
					let gifts = JSON.parse(res.data.lotterys[0].gift)
					gifts.forEach(function(item, i) {
						let t = {
							prizeName: item.title,
							prizeIcon: item.image,
						}
						that.prizeList.push(t)
						that.lotteryShow = true
					})
				}
			})			
		},
		methods: { 
			link(url){ 
				uni.navigateTo({
					url,
				})
			},
			links(url){
				uni.switchTab({
					url,
				})
			},
			getheight() {
					this.navBarHeight = 50
				// #ifdef MP-WEIXIN
					let sysInfo = wx.getSystemInfoSync();
					this.statusBarHeight = sysInfo.statusBarHeight;
					let rect = wx.getMenuButtonBoundingClientRect();
					this.menuButtonRect = JSON.parse(JSON.stringify(rect));
					let navBarHeight = (rect.top - sysInfo.statusBarHeight) * 2 + rect.height;
					this.navBarHeight = navBarHeight;
					this.height = sysInfo.statusBarHeight + navBarHeight
				// #endif
				
				var that = this
				setTimeout(()=>{
					uni.createSelectorQuery().in(this).select(".navbara").boundingClientRect(data => {
						that.heightEle = data.height
						console.log(data.height)
					}).exec()
				},10)
			},
			articleLink(id) {
				uni.navigateTo({
					url: '/pages/article/detail?id=' + id
				})
			},
			// 抽奖
			lotteryStart(){
				/*
				this.prizeIndex = Math.ceil(Math.random()*7)
				this.$refs['pt-lottery'].init(this.prizeIndex)
				*/
			   var that = this
			   lottery(that.lotteryId, (res) => {
				   // 出错给保底数据
				   if (res.code !== 0) {
					  that.prizeIndex = 100
					  that.$refs['pt-lottery'].init(this.prizeIndex)
					  return
				   }
				   console.log(res)
			   })
			},
			lotteryEnd(){
				switch (this.prizeIndex){
					case 7:
						uni.showToast({
							icon: 'none',
							title: '未中奖，再接再厉!'
						})
						break;
					default:
						uni.showToast({
							icon: 'none',
							title: '恭喜您获取'+this.prizeList[this.prizeIndex].prizeName
						})
						break;
				}
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
		.navbara{
			width: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 999;
			.child {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				padding-left: 28rpx;
				image {
					width: 155rpx;
					padding-left: 10px;
				} 
			
			}
		}
		.banner{
			width: 100%;
			height: 601rpx;
		}
		.main_item{
			width: 100%;
			background: #fff;
			padding: 35rpx 0 39rpx 29rpx;
			margin-bottom: 19rpx;
			scroll-view{
				width: 100%;
				white-space: nowrap;
				margin-top: 26rpx;
				.label{
					width: 249rpx;
					overflow: hidden;
					background: #F3F7F9;
					border-radius: 20rpx;
					margin-right: 30rpx;
					display: inline-block;
					.pic{
						width: 100%;
						height: 178rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					text{
						display: block;
						font-size: 24rpx;
						line-height: 60rpx;
						text-align: center;
						color: #494F5F;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						width: 100%;
						padding: 0 15rpx;
					}
				}
			}
			.title{
				display: block;
				font-size: 30rpx;
				color: #494F5F;
				font-weight: bold;
				letter-spacing: 2rpx;
				text{
					color: #2765F2;
					font-size: 32rpx;
				}
			}
		}
		.navbar{
			overflow: hidden;
			width: 702rpx;
			margin: 0 auto;
			background: #fff;
			position: relative;
			margin-top: -70rpx;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
			padding: 54rpx 0 9rpx 0;
			display: flex;
			margin-bottom: 43rpx;
			flex-wrap: wrap;
			view{
				width: 33.33%;
				overflow: hidden;
				margin-bottom: 48rpx;
				image{
					display: block;
					margin: 0 auto;
					width: 98rpx;
					margin-bottom: 25rpx;
				}
				text{
					display: block;
					font-size: 28rpx;
					color: #6C768D;
					text-align: center;
				}
			}
		}
		#myVideo {
		  width: 100%;
		  height: 800rpx;
		  position: absolute;
		  top: 0;
		  left: 0;
		}
	}
</style>
