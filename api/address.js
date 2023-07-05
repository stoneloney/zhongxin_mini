import {PostReq} from '@/api/http.js'

export function addressList(data, callback) {
	let apiUrl = "/address/list"
	return PostReq(apiUrl, data, callback)
}

export function addressOperate(data, callback) {
	let apiUrl = "/address/operate"
	return PostReq(apiUrl, data, callback)
}