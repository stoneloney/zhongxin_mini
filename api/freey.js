import {PostReq} from '@/api/http.js'

export function FreeyList(data, callback) {
	let apiUrl = "/freey/list"
	return PostReq(apiUrl, data, callback)
}