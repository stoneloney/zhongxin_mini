import {PostReq} from '@/api/http.js'

export function TourList(page, limit, callback) {
	let apiUrl = "/tour/list"
	return PostReq(apiUrl, {
		page: page,
		limit: limit,
	}, callback)
}

export function TourDetail(id, callback) {
	let apiUrl = "/tour/detail"
	return PostReq(apiUrl,{
		id: id,
	}, callback)
}