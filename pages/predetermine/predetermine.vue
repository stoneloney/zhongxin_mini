<template>
	<view class="content">
		<map style="width: 100%; height: 100vh;" id="map" ref="map" :enable-3D='true' :show-location='true' scale='16'
			:latitude="latitude" :longitude="longitude" :markers="covers">
		</map>
		<view class="box">
			<view class="list">
				<scroll-view scroll-y="true">
					<view class="label" @click="change(item, index)"
						:class="current == index?'on':'' || item.use===1?'':'dis'" v-for="(item, index) in list">
						<view></view>
						<text>{{item.title}}</text>
					</view>
				</scroll-view>
			</view>

			<view class="button" @click="changes">确定</view>
		</view>
	</view>
</template>

<script>
	import { LandPlaceList } from "@/api/land_place.js"
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 22.5615,
				longitude: 113.93678,
				list: [],
				covers: [],
				/*
				covers: [{
					id: 0,
					width: 25,
					height: 25,
					latitude: 22.562549,
					longitude: 113.93678,
					iconPath: '/static/dws.png'
				}, {
					id: 1,
					width: 25,
					height: 25,
					latitude: 31.338515,
					longitude: 121.632692,
					iconPath: '/static/dws.png'
				}],
				list: [{
					name: '深圳南头直升机场',
					use: true,
					latitude: 22.5615,
					longitude: 113.93678,
				}, {
					name: '金沙湾起降点',
					use: true,
					latitude: 31.3375,
					longitude: 121.632692,
				}, {
					name: '北京大学深圳医院',
					use: true,
					latitude: 22.5615,
					longitude: 113.93678,
				}, {
					name: '香港大学深圳医院',
					use: true,
					latitude: 31.3375,
					longitude: 121.632692,
				}, {
					name: '鸿荣源前海中心',
					use: true,
					latitude: 22.5615,
					longitude: 113.93678,
				}, {
					name: '广州南沙游轮码头',
					use: true,
					latitude: 31.3375,
					longitude: 121.632692,
				}, {
					name: '黄浦穗港澳直升机场',
					use: true,
					latitude: 31.3375,
					longitude: 121.632692,
				},  {
					name: '珠海（静待开通）',
					use: false
				}, {
					name: '潮汕（静待开通）',
					use: false
				}, {
					name: '湛江（静待开通）',
					use: false
				}],
				*/
				current: 0,
				type: 1
			}
		},
		created() {
			var that = this
			LandPlaceList('', (res) => {
				if (res.code !== 0) {
					uni.showModal({
						title: '错误提示',
						content: '网络异常，请稍后重试',
						showCancel: false
					})
					return
				}
				// 创建 covers
				res.data.list.forEach(function(item, i) {
					 let t = {
						 id: i,
						 width: 25,
						 height: 25,
						 latitude: item.latitude,
						 longitude: item.longitude,
						 iconPath: '/static/dws.png'
					 }
					 that.covers.push(t)
				}) 
				this.list = res.data.list
			})
		},
		onLoad(options) {
			this.type = options.type
			let map = uni.createMapContext('map');
			map.setCenterOffset({
				offset: [0.5, 0.25]
			})
		},

		methods: {
			changes(){
				uni.setStorageSync('infotype',this.type)
				uni.setStorageSync('info',this.list[this.current])
				uni.navigateBack({
					delta: 1
				})
			},
			change(item, index) {
				if (item.use) {
					this.current = index
					this.latitude = item.latitude
					this.longitude = item.longitude
				}
			}
		}
	}
</script>

<style lang="scss">
	item page {
		background: #F7F7F7;
	}

	.content {
		width: 100%;
		height: 100vh;
		position: relative;

		.box {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 9999;
			padding: 0 24rpx 10rpx 24rpx;

			.button {
				width: 100%;
				height: 97rpx;
				background: #2765F2;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #fff;
			}

			.list {
				overflow: hidden;
				width: 100%;
				background: #fff;
				border-radius: 20rpx;
				box-shadow: 0rpx 0rpx 29rpx 0rpx rgba(19, 108, 242, 0.35);
				margin-bottom: 16rpx;
				padding: 23rpx 28rpx;

				scroll-view {
					width: 100%;
					height: 500rpx;
				}

				.label {
					width: 100%;
					display: flex;
					align-items: center;
					padding: 23rpx 0;

					&.dis {
						opacity: 0.5;
					}

					&.on {
						view {
							background-image: url('../../static/confire4.png');
						}
					}

					view {
						width: 29rpx;
						height: 29rpx;
						background-image: url('../../static/confire3.png');
						background-size: 100% 100%;
						margin-right: 25rpx;
					}

					text {
						font-size: 32rpx;
						color: #444A58;
					}
				}
			}
		}
	}
</style>