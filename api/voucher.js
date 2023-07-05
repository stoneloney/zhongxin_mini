import {PostReq} from '@/api/http.js'

export function VoucherExchange(data, callback) {
	let apiUrl = "/voucher/exchange"
	return PostReq(apiUrl, data, callback)
}

export function VoucherTypes(data, callback) {
	let apiUrl = "/voucher/types"
	return PostReq(apiUrl, data, callback)
}