const BaseUrl = "http://127.0.0.1:9805/zhongxin/api"

// post请求
export function PostReq(reqUrl, data, callback) {
	uni.request({
		url: BaseUrl + reqUrl,
		data: data,
		method: 'POST',
		header:{
			'content-type': 'application/json',
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

// get请求
export function GetReq(reqUrl, data, callback) {
	uni.request({
		url: BaseUrl + reqUrl,
		data: data,
		method: 'GET',
		success: (res) => {
			callback(res.data)
		},
		fail: (res) => {
			console.log("req fail, error:" + res)
			callback(res.data)
		}
	})
}