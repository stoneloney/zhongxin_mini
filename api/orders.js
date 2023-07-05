import {PostReq} from '@/api/http.js'

export function orderList(data, callback) {
	let apiUrl = "/order/list"
	return PostReq(apiUrl, data, callback)
}