import {PostReq} from '@/api/http.js'

export function LandPlaceList(data, callback) {
	let apiUrl = "/land_place/list"
	return PostReq(apiUrl, data, callback)
}