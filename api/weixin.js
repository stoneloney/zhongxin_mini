import {PostReq} from '@/api/http.js'

export function WeixinCode(code, callback) {
	let apiUrl = "/wx/code"
	return PostReq(apiUrl,{
		code: code,
	}, callback)
}

export function Pay(data, callback) {
	let apiUrl = "/wx/pay"
	return PostReq(apiUrl, data, callback)
}

export function PrePay(data, callback) {
	let apiUrl = "/wx/prepay"
	return PostReq(apiUrl, data, callback)
}

export function AgainPrePay(data, callback) {
	let apiUrl = "/wx/again_prepay"
	return PostReq(apiUrl, data, callback)
}

export function WeixinPhone(code, callback) {
	let apiUrl = "/wx/phone"
	return PostReq(apiUrl, { 
		code: code,
	}, callback)
}