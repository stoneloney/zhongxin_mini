<template>
	<view class="content">
		<view class="tabbars">
			<view :class="current2 == 0?'on':''" @click="current2 = 0">起降地包机</view>
			<view :class="current2 == 1?'on':''" @click="current2 = 1">按时长包机</view>
		</view>
		<view class="main_top">
			<view class="label" :class="current2 == 1?'on':''" @click="link('/pages/predetermine/predetermine?type=1')">
				<text class="title">出发地</text>
				<view>
					<image src="../../static/book1.png" mode="widthFix"></image>
					<text>{{stars?stars:'起始地'}}</text>
				</view>
			</view>
			<view class="icon" v-if="current2 == 0">
				<image src="../../static/book7.png" class="i" mode="widthFix"></image>
				<image src="../../static/book6.png" class="i1" mode="widthFix"></image>
			</view>
			<view class="label" v-if="current2 == 0" @click="link('/pages/predetermine/predetermine?type=2')">
				<text class="title">到达地</text>
				<view>
					<image src="../../static/book1.png" mode="widthFix"></image>
					<text>{{ends?ends:'目的地'}}</text>
				</view>
			</view>
		</view>
		<view class="item" @click="show2 = true">
			<view class="icon">
				<image src="../../static/book5.png" mode="widthFix"></image>
				<text>出发日期</text>
			</view>
			<view class="change">
				<text>{{date}}</text>
				<image src="../../static/book4.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="item" @click="show1 = true">
			<view class="icon">
				<image src="../../static/book8.png" mode="widthFix"></image>
				<text>选择飞机</text>
			</view>
			<view class="change">
				<text>{{list[current1].name}}</text>
				<image src="../../static/book4.png" mode="widthFix"></image>
			</view>
		</view>
		<!-- <view class="item" @click="show = true">
			<view class="icon">
				<image src="../../static/book.png" mode="widthFix"></image>
				<text>选着舱位</text>
			</view>
			<view class="change">
				<text>{{seat[current]}}</text>
				<image src="../../static/book4.png" mode="widthFix"></image>
			</view>
		</view> -->
		<view class="item"  v-if="current2 == 0">
			<view class="icon">
				<image src="../../static/book2.png" mode="widthFix"></image>
				<text>包机价格</text>
			</view>
			<text class="price">￥{{prices}}</text>
		</view>
		<view class="item" @click="show3 = true" v-if="current2 == 1">
			<view class="icon">
				<image src="../../static/book2.png" mode="widthFix"></image>
				<text>包机时长</text>
			</view>
			<text class="price">￥{{prices}}/{{selector3[index3]}}</text>
		</view>
		<view class="button" @click="link('/pages/confire/confire')">下一步</view>
		<u-popup v-model="show" mode='bottom'>
			<view class="fade_seat">
				<image src="../../static/close.png" mode="widthFix" class="close" @click="show = false"></image>
				<text class="title">选择舱座</text>
				<view class="ls">
					<view v-for="(item, index) in seat" @click="current = index" :class="current == index?'on':''">
						{{item}}
					</view>
				</view>
				<view class="icon">
					<image src="https://qietu.ahqian.com/xiaot/5.12/tost.png" mode="widthFix"></image>
					<text>舱位示意图</text>
				</view>
				<view class="buttons" @click="show = false">确定</view>
			</view>
		</u-popup>
		<u-popup v-model="show1" mode='bottom'>
			<view class="fade_aircraft">
				<image src="../../static/close.png" mode="widthFix" class="close" @click="show1 = false"></image>
				<text class="title">选择飞机</text>
				<scroll-view scroll-y="true" style="height: 65vh;margin-top: 20rpx;">
				<view class="label" v-for="(item ,index) in list" @click="current1 = index">
					<view class="line" :class="current1 == index?'on':''">
						<view class="icon">
							<view></view>
							<text>{{item.name}}</text>
						</view>
						<text class="price">{{item.price}}</text>
						<view class="down">
							<text>飞机介绍</text>
							<image src="../../static/ws2.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="slide" v-show="current1 == index">
						<text class="titles">空客H135型直升机</text>
						<text class="des">价值七千万的空客轻型双发3吨级H135型直升机，性能优异、高可靠度、低噪音、多用途、高性价比。
						</text>
						<text class="des">
							H135直升机机身全长12.16米，机高2.67米，最大巡航速度为253公里/小时，最大航程可以达到750公里。最新款机型，定制化VIP舱内构型，空调、观景窗一应俱全。</text>
						<view class="pic">
							<image src="https://qietu.ahqian.com/xiaot/5.12/ws1.png" mode="widthFix"></image>
							<image src="https://qietu.ahqian.com/xiaot/5.12/ws.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				</scroll-view>
				<view class="buttons" @click="show1 = false">确定</view>
			</view>
		</u-popup>
		<u-picker mode="time" title='出发日期' @confirm='change1' v-model="show2" :params="params"></u-picker>
		<u-picker mode="selector" v-model="show3" @confirm='change3' :range="selector3"></u-picker>
		<u-picker mode="selector" v-model="show4" @confirm='change4' :range="selector4"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current2: 0,
				selector3:['15min','30min','45min','60min','75min','90min','105min','120min'],
				selector4:['15min','30min','45min','60min','75min','90min','105min','120min'],
				show3: false,
				show4: false,
				mins: '请选择包机时长',
				index3: 0,
				index4: 0,
				show: false,
				show1: false,
				show2: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},
				seat: ['A座(靠窗)', 'B座', 'C座(靠窗)', 'D座(靠窗)', 'E座(靠窗)'],
				current: 0,
				list: [{
					name: '空客H135型直升机',
					price: '￥2916/人',
				}, {
					name: '空客H135型直升机1',
					price: '￥2916/人',
				}, {
					name: '空客H135型直升机2',
					price: '￥2916/人',
				}, {
					name: '空客H135型直升机3',
					price: '￥2916/人',
				}],
				current1: 0,
				date: '2023-05-09 09:20',
				stars: '',
				ends: '',
				
			}
		},
		computed:{
			prices(){
				return (this.index3+1) * 7500
			}
		},
		onLoad() {

		},
		onShow() {
			if(uni.getStorageSync('infotype') == 1){
				this.stars = uni.getStorageSync('info').name
			}else{
				this.ends = uni.getStorageSync('info').name
			}
			uni.removeStorageSync('infotype')
			uni.removeStorageSync('info')
			
		},
		methods: {
			change3(e){
				this.index3 = e[0]
			},
			change4(e){
				this.index4 = e[0]
			},
			change1(e) {
				this.date = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
				console.log(e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute)
			},
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
		}
	}
</script>

<style lang="scss">
	 page {
		background: #F7F7F7;
	}
	.tabbars{
		width: 88%;
		height: 88rpx;
		display: flex;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		z-index: 99;
		border-radius: 20rpx;
		border: 1px solid #fff;
		margin-bottom: 30rpx;
		view{
			width: 50%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			color: #fff;
			&.on{
				background: #fff;
				color: #2865F3;
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
						border-radius: 10rpx;
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
					font-size: 25rpx;
					color: #444A58;
					line-height: 38rpx;
					text-indent: 30rpx;
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

				.price {
					font-size: 30rpx;
					color: #FF4200;
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

		.close {
			width: 36rpx;
			position: absolute;
			right: 45rpx;
			top: 27rpx;
			z-index: 999;
		}

		.title {
			display: block;
			font-size: 41rpx;
			font-weight: bold;
			letter-spacing: 1rpx;
			color: #444A58;
		}
	}

	.fade_seat {
		overflow: hidden;
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		position: relative;
		padding: 80rpx 35rpx;

		.close {
			width: 36rpx;
			position: absolute;
			right: 45rpx;
			top: 27rpx;
			z-index: 999;
		}

		.title {
			display: block;
			font-size: 41rpx;
			font-weight: bold;
			letter-spacing: 1rpx;
			color: #444A58;
			margin-bottom: 76rpx;
		}

		.buttons {
			width: 100%;
			height: 97rpx;
			background: #2765F2;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			margin-top: 69rpx;
			color: #FFFFFF;
		}

		.icon {
			width: 100%;
			margin-top: 46rpx;

			image {
				width: 504rpx;
				display: block;
				margin: 0 auto;
			}

			text {
				display: block;
				text-align: center;
				font-size: 24rpx;
				color: #A1A5AC;
			}
		}

		.ls {
			display: flex;
			flex-wrap: wrap;

			view {
				width: 183rpx;
				height: 79rpx;
				background: #FFFFFF;
				border: 1px solid #EEEEEE;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 51rpx;
				margin-bottom: 32rpx;
				font-size: 28rpx;
				color: #444A58;

				&:nth-child(3n) {
					margin-right: 0;
				}

				&.on {
					background: #2765F2;
					color: #fff;
					border: 1px solid #2765F2;
				}
			}
		}
	}

	.content {
		width: 100%;
		height: 100vh;
		position: relative;
		padding: 30rpx 24rpx;
		position: relative;

		&::after {
			content: '';
			width: 100%;
			height: 564rpx;
			position: absolute;
			left: 0;
			top: 0;
			background: linear-gradient(#2765F2, #F7F7F7);
		}

		.button {
			width: 100%;
			height: 97rpx;
			background: #2765F2;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			margin-top: 32rpx;
			color: #FFFFFF;
		}

		.item {
			width: 100%;
			overflow: hidden;
			background: #fff;
			border-radius: 20rpx;
			margin-top: 22rpx;
			position: relative;
			z-index: 99;
			box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19, 108, 242, 0.35);
			padding: 32rpx 0 0 39rpx;

			.price {
				display: block;
				font-size: 32rpx;
				margin-top: 22rpx;
				color: #444A58;
				margin-bottom: 39rpx;
			}

			.change {
				display: flex;
				align-items: center;
				height: 95rpx;
				justify-content: space-between;
				padding-right: 28rpx;

				text {
					font-size: 28rpx;
					color: #444A58;
				}

				image {
					width: 11rpx;
				}
			}

			.icon {
				display: flex;
				align-items: center;

				image {
					width: 36rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: bold;
					color: #444A58;
					margin-left: 7rpx;
				}
			}
		}

		.main_top {
			width: 100%;
			overflow: hidden;
			background: #fff;
			border-radius: 20rpx;
			padding: 40rpx 0;
			position: relative;
			z-index: 99;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.icon {
				overflow: hidden;

				.i {
					display: block;
					margin: 0 auto;
					width: 34rpx;
					margin-bottom: 4rpx;
				}

				.i1 {
					display: block;
					margin: 0 auto;
					width: 100rpx;
				}
			}

			.label {
				width: 40%;
				padding-left: 30rpx;
				padding-right: 10rpx;
				&.on{
					width: 100%;
				}
				.title {
					display: block;
					font-size: 26rpx;
					color: #6C768D;
				}

				view {
					display: flex;
					margin-top: 20rpx;
					width: 100%;
					align-items: center;

					image {
						width: 36rpx;
						margin-right: 9rpx;
					}

					text {
						font-size: 32rpx;
						color: #444A58;
						flex: 1;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>