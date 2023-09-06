//const BaseUrl = "http://127.0.0.1:9805/zhongxin/api"
const BaseUrl = "http://118.25.191.234:9805/zhongxin/api"
//const BaseUrl = "https://hzthxcx.cohc.citic/zhongxin/api"
// post请求
export function PostReq(reqUrl, data, callback) {
	console.log('openid:'+uni.getStorageSync('openid')+',token:'+uni.getStorageSync('token'))
	uni.request({
		url: BaseUrl + reqUrl,
		data: data,	
		method: 'POST',
		header:{
			'content-type': 'application/json',
			'openid': uni.getStorageSync('openid'),
			'token': uni.getStorageSync('token')
		},
		success: (res) => {
			if (res.data.code >= 9990) {
				// 清除登陆信息
				uni.clearStorageSync()
				// 跳转到登陆
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
			callback(res.data)
		},
		fail: (res) => {
			console.log("req fail, error:" + res)
			callback(res.data)
		}
	})
}

// get请求
export function GetReq(reqUrl, data, callback) {
	console.log('openid:'+uni.getStorageSync('openid')+',token:'+uni.getStorageSync('token'))
	uni.request({
		url: BaseUrl + reqUrl,
		data: data,
		method: 'GET',
		header:{
			'openid': uni.getStorageSync('openid'),
			'token': uni.getStorageSync('token')
		},
		success: (res) => {
			callback(res.data)
		},
		fail: (res) => {
			console.log("req fail, error:" + res)
			callback(res.data)
		}
	})
}