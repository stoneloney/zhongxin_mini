<template>
	<view class="content">
		<!-- <view class="search">
			<image src="../../static/citys2.png" mode="widthFix"></image>
			<input type="text" placeholder="请输入关键字" placeholder-class="s">
			<view>搜索</view>
		</view> -->
		<view class="date">
			<scroll-view scroll-x="true">
				<view v-for="(item, index) in dates" @click="selectDate(item.date_timestamp)" :class="{ active:item.date_simple==dateSelectSimple }">
					<text class="day">{{ item.date_simple }}</text>
					<text class="des">{{ item.week_day }}</text>
					<text class="price">￥{{ item.price }}</text>
				</view>
			</scroll-view>
			<view class="icon" @click="link('/pages/Booking/Booking1')">
				<image src="../../static/citys3.png" mode="widthFix"></image> 
			</view>
		</view>
		<view class="list">
			<view class="label" v-for="(item, index) in freeys" @click="buy(item.id)">
				<view class="top">
					<view class="vi">
						<text class="time">{{ item.start_date }}</text>
						<text class="name">{{ item.start_area }}</text>
					</view>
					<view class="mid">
						<image src="../../static/citys1.png" mode="widthFix" class="f"></image>
						<image src="../../static/book6.png" mode="widthFix" class="l"></image>
						<view>
							<image src="../../static/citys.png" mode="widthFix"></image>
							<text>{{ item.times }}分</text>
						</view>
					</view>
					<view class="vi">
						<text class="time">{{ item.end_date }}</text>
						<text class="name">{{ item.end_area }}</text>
					</view>
				</view>
				<view class="bot">
					<view class="icon">
						<image src="../../static/citys1.png" mode="widthFix"></image>
						<text>{{ item.plane_name }}</text>
					</view>
					<view class="price">
						<text class="f">￥<text>{{ item.price }}</text></text>
						<!-- <text class="des">税 ￥110</text> -->
					</view>
				</view>
			</view>
		</view>
		<view class="navbar">
			<view @click="showIntroduce('goupiao')">
				<image src="../../static/s-goupiao.png" mode="widthFix"></image>
				<text>购票须知</text>
			</view>
			<view @click="showIntroduce('anquan')">
				<image src="../../static/s-anquan.png" mode="widthFix"></image>
				<text>安全须知</text>
			</view>
			<view @click="showIntroduce('dengji')">
				<image src="../../static/s-dengji.png" mode="widthFix"></image>
				<text>登机流程</text>
			</view>
			<view @click="showIntroduce('chengke')">
				<image src="../../static/s-chengke.png" mode="widthFix"></image>
				<text>乘客要求</text>
			</view>
			<view @click="showIntroduce('tuipiao')">
				<image src="../../static/s-tuipiao.png" mode="widthFix"></image>
				<text>退票说明</text>
			</view>
			<view @click="showIntroduce('lvke')">
				<image src="../../static/s-xin.png" mode="widthFix"></image>
				<text>致旅客信</text>
			</view>
			<view @click="showIntroduce('shouhou')">
				<image src="../../static/s-shouhou.png" mode="widthFix"></image>
				<text>售后服务</text>
			</view>
			<view @click="showIntroduce('yuyue')">
				<image src="../../static/s-yuyue.png" mode="widthFix"></image>
				<text>预约机票</text>
			</view>
			<view @click="showIntroduce('zhongzhuan')">
				<image src="../../static/s-zhongzhuan.png" mode="widthFix"></image>
				<text>中转飞行</text>
			</view>
		</view>
		
		<u-popup v-model="popShow" mode='bottom'>
			<view class="fade_aircraft">
				<image src="../../static/close.png" mode="widthFix" class="close" @click="popShow = false"></image>
				<!-- 标题展示 -->
				<text class="title" v-if="showType=='goupiao'">购票须知</text>
				<text class="title" v-if="showType=='anquan'">安全提示</text>
				<text class="title" v-if="showType=='dengji'">登机流程</text>
				<text class="title" v-if="showType=='chengke'">乘客要求</text>
				<text class="title" v-if="showType=='tuipiao'">退票说明</text>
				<text class="title" v-if="showType=='lvke'">致旅客信</text>
				<text class="title" v-if="showType=='shouhou'">售后服务</text>
				<text class="title" v-if="showType=='yuyue'">预约机票</text>
				<text class="title" v-if="showType=='zhongzhuan'">中转飞行</text>
				
				<scroll-view scroll-y="true" style="height: 65vh;margin-top: 20rpx;">
				<view class="label" v-if="showType === 'goupiao'">
					<view class="slide">
						<text class="des">购票须知</text>
						<text class="des">购票须知购票须知购票须知购票须知</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'anquan'">
					<view class="slide">
						<text class="des">安全提示</text>
						<text class="des">安全提示安全提示安全提示安全提示</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'anquan'">
					<view class="slide">
						<text class="des">安全提示</text>
						<text class="des">安全提示安全提示安全提示安全提示</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'dengji'">
					<view class="slide">
						<text class="des">登机流程</text>
						<text class="des">登机流程登机流程</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'chengke'">
					<view class="slide">
						<text class="des">乘客要求</text>
						<text class="des">乘客要求</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'tuipiao'">
					<view class="slide">
						<text class="des">退票说明</text>
						<text class="des">退票说明退票说明</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'lvke'">
					<view class="slide">
						<text class="des">致旅客信</text>
						<text class="des">致旅客信致旅客信</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'shouhou'">
					<view class="slide">
						<text class="des">售后服务</text>
						<text class="des">安全提示安全提示安全提示安全提示</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'yuyue'">
					<view class="slide">
						<text class="des">预约机票</text>
						<text class="des">1111</text>
					</view>
				</view>
				
				<view class="label" v-if="showType == 'zhongzhuan'">
					<view class="slide">
						<text class="des">中转飞行</text>
						<text class="des">2222</text>
					</view>
				</view>
				
				</scroll-view>
				<view class="buttons" @click="popShow = false">确定</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import { FreeyList } from "@/api/freey"
	export default {
		data() {
			return {
				dates: [],
				freeys: [],
				dateSelectSimple: '',
				popShow: false,
				showType: '',
			}
		},
		onLoad() {
			var that = this
			FreeyList({}, (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				that.dates = res.data.dates
				that.freeys = res.data.freeys
				that.dateSelectSimple = res.data.selectDate
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
			buy: function(id) { 
				uni.navigateTo({
					url: '/pages/confire/confire?id='+id+'&number=1&from=ferry'
				})
			},
			selectDate: function(timestamp) {
				var that = this
				FreeyList({
					'date': timestamp
				}, (res) => {
					if (res.code !== 0) {
						uni.showModal({
							title: '错误提示',
							content: '网络异常，请稍后重试',
							showCancel: false
						})
						return
					}
					that.dates = res.data.dates
					that.freeys = res.data.freeys
					that.dateSelectSimple = res.data.selectDate
				})
			},
			showIntroduce: function(page) {
				console.log(page)
				this.popShow = true
				this.showType = page
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
		.search{
			width: 702rpx;
			position: relative;
			z-index: 99;
			margin: 0 auto;
			border: 1px solid #FFFFFF;
			height: 72rpx;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			padding-left: 13rpx;
			image{
				width: 30rpx;
			}
			input{
				flex: 1;
				height: 100%;
				font-size: 28rpx;
				color: #fff;
				padding-left: 9rpx;
			}
			.s{
				color: #fff;
			}
			view{
				width: 108rpx;
				height: 58rpx;
				background: #FFFFFF;
				border: 1px solid #FFFFFF;
				box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 5rpx;
				top: 50%;
				transform: translateY(-50%);
				font-size: 28rpx;
				z-index: 99;
				color: #2764F2;
			}
		}
		.list{
			width: 702rpx;
			position: relative;
			z-index: 99;
			margin: 0 auto;
			margin-top: 27rpx;
			.label{
				width: 100%;
				height: 185rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
				border-radius: 20rpx;
				margin-bottom: 26rpx;
				.bot{
					width: 100%;
					height: 61rpx;
					border-top: 1px solid #EEEEEE;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 36rpx 0 39rpx;
					.icon{
						display: flex;
						align-items: center;
						image{
							width: 27rpx;
							margin-right: 13rpx;
						}
						text{
							font-size: 24rpx;
							color: #444A58;
						}
					}
				}
				.top{
					overflow: hidden;
					min-height: 123rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.mid{
						overflow: hidden;
						.f{
							display: block;
							margin: 0 auto;
							width: 34rpx;
							margin-bottom: 4rpx;
						}
						.l{
							display: block;
							margin: 0 auto;
							width: 100rpx;
							margin-bottom: 6rpx;
						}
						view{
							display: flex;
							align-items: center;
							justify-content: center;
							image{
								width: 18rpx;
								margin-right: 6rpx;
							}
							text{
								font-size: 20rpx;
								color: #444A58;
							}
						}
					}
					.vi{
						overflow: hidden;
						width: 40%;
						padding-bottom: 5rpx;
						.time{
							display: block;
							text-align: center;
							font-size: 36rpx;
							font-weight: bold;
							margin-bottom: 10rpx;
							color: #222222;
						}
						.name{
							display: block;
							text-align: center;
							font-size: 24rpx;
							color: #444A58;
							padding: 0 20rpx;
						}
					}
				}
			}
		}
		.date{
			width: 702rpx;
			position: relative;
			z-index: 99;
			background: #fff;
			margin: 0 auto;
			margin-top: 22rpx;
			overflow: hidden;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
			height: 126rpx;
			.icon{
				position: absolute;
				right: 0;
				top: 0;
				width: 106rpx;
				z-index: 999;
				padding-right: 33rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				height: 100%;
				background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,1));
				image{
					width: 44rpx;
				}
			}
			scroll-view{
				width: 100%;
				height: 100%;
				white-space: nowrap;
				view{
					display: inline-block;
					height: 100%;
					width: 121rpx;
					position: relative;
					padding: 24rpx 0 0 0;
					&::after{
						content: '';
						width: 1px;
						height: 102rpx;
						background: #EEEEEE;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
					}
					.day{
						display: block;
						text-align: center;
						font-size: 28rpx;
						color: #000000;
						line-height: 1;
					}
					.des{
						display: block;
						text-align: center;
						font-size: 30rpx;
						color: #000000;
						line-height: 39rpx;
						opacity: 0.5;
					}
					.price{
						display: block;
						text-align: center;
						font-size: 22rpx;
						color: #000000;
						line-height: 1;
					}
				}
			}
		}
		&::after{
			content: '';
			width: 100%;
			height: 564rpx;
			position: absolute;
			left: 0;
			top: 0;
			background: linear-gradient(#2765F2, #F7F7F7);
		}
		.active {
			background: #60b1f1;
		}
		.navbar{
			overflow: hidden;
			width: 702rpx;
			margin: 0 auto;
			background: #fff;
			position: absolute;
			margin-top: 70rpx;
			//border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19,108,242,0.35);
			padding: 54rpx 0 9rpx 0;
			display: flex;
			margin-bottom: 43rpx;
			flex-wrap: wrap;
			z-index:9999;
			view{
				width: 33.33%;
				overflow: hidden;
				margin-bottom: 48rpx;
				image{
					display: block;
					margin: 0 auto;
					width: 98rpx;
					margin-bottom: 5rpx;
					height: 40rpx;
					width: 40rpx;
				}
				text{
					display: block;
					font-size: 28rpx;
					color: #6C768D;
					text-align: center;
				}
			}
		}
	}
	
	.fade_aircraft {
		overflow: hidden;
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		position: relative;
		padding: 80rpx 35rpx;
	
		.buttons {
			width: 100%;
			height: 97rpx;
			background: #2765F2;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			margin-top: 35rpx;
			color: #FFFFFF;
		}
	
		.label {
			width: 100%;
	
			.slide {
				overflow: hidden;
				width: 100%;
				background: #EEEEEE;
				border-radius: 10rpx;
				padding: 28rpx;
	
				.pic {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
	
					image {
						width: 306rpx;
						margin-top: 40rpx;
					}
				}
	
				.titles {
					display: block;
					font-size: 30rpx;
					font-weight: bold;
					letter-spacing: 1rpx;
					color: #444A58;
					margin-bottom: 30rpx;
				}
	
				.des {
					display: block;
					font-size: 30rpx;
					color: #444A58;
					line-height: 45rpx;
					//text-indent: 30rpx;
				}
			}
	
			.line {
				width: 100%;
				height: 91rpx;
				border-bottom: 1px solid #EEEEEE;
				display: flex;
				align-items: center;
				justify-content: space-between;
	
				&.on {
					.icon {
						view {
							background-image: url('../../static/confire4.png');
						}
					}
	
					.down image {
						transform: rotate(180deg);
					}
				}
	
				&.on1 {
					.down image {
						transform: rotate(180deg);
					}
				}
	
				.down {
					display: flex;
					align-items: center;
	
					text {
						font-size: 26rpx;
						opacity: 0.5;
						margin-right: 22rpx;
						color: #444A58;
					}
	
					image {
						width: 23rpx;
						transition: all .2s;
					}
				}
	
				.icon {
					height: 100%;
					display: flex;
					align-items: center;
	
					view {
						width: 29rpx;
						height: 29rpx;
						background-image: url('../../static/confire3.png');
						background-size: 100% 100%;
						margin-right: 26rpx;
					}
	
					text {
						font-size: 26rpx;
						color: #444A58;
					}
				}
			}
		}
	}
	
	.close {
		width: 36rpx;
		position: absolute;
		right: 45rpx;
		top: 27rpx;
		z-index: 999;
	}
	
	.title {
		display: block;
		font-size: 35rpx;
		font-weight: bold;
		letter-spacing: 1rpx;
		color: #444A58;
		text-align: center;
	}
	
</style>
