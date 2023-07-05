import {PostReq, GetReq} from '@/api/http.js'

export function mainInfo(callback) {
	let apiUrl = "/main" 
	return GetReq(apiUrl, {}, callback)
}

