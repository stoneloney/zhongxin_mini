import {PostReq} from '@/api/http.js'

export function TicketList(data, callback) {
	let apiUrl = "/ticket/list"
	return PostReq(apiUrl, data, callback)
}

export function TicketDetail(id, callback) {
	let apiUrl = "/ticket/detail"
	return PostReq(apiUrl,{
		id: id,
	}, callback)
}