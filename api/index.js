import {PostReq, GetReq} from '@/api/http.js'

export function mainInfo(callback) {
	let apiUrl = "/main" 
	return GetReq(apiUrl, {}, callback)
}

export function lottery(id, callback) {
	let apiUrl = "/lottery" 
	return GetReq(apiUrl, {id:id}, callback)
}



