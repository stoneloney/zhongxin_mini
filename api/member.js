import {PostReq} from '@/api/http.js'

export default {
	
}

// 用户数据更新
export function MemberInfoUpdate(data, callback) {
	let apiUrl = "/member/update"
	return PostReq(apiUrl, data, callback)
}

// 用户票务预定信息
export function MemberTicketReserve(data, callback) {
	let apiUrl = "/member/ticket/reserve"
	return PostReq(apiUrl, data, callback)
}

// 乘机人添加
export function MemberPassengerCreate(data, callback) {
	let apiUrl = "/member/passenger/create"
	return PostReq(apiUrl, data, callback)
}

// 乘机人修改
export function MemberPassengerUpdate(data, callback) {
	let apiUrl = "/member/passenger/update"
	return PostReq(apiUrl, data, callback)
}

// 乘机人信息删除
export function MemberPassengerDelete(data, callback) {
	let apiUrl = "/member/passenger/del"
	return PostReq(apiUrl, data, callback)
}

// 乘机人信息
export function MemberPassengerInfo(data, callback) {
	let apiUrl = "/member/passenger/info"
	return PostReq(apiUrl, data, callback)
}

// 乘机人列表
export function MemberPassengerList(data, callback) {
	let apiUrl = "/member/passenger/list"
	return PostReq(apiUrl, data, callback)
}

// 获取用户资料
export function MemberDetail(data, callback) {
	let apiUrl = "/member/detail"
	return PostReq(apiUrl, data, callback)
}

// 判断是否登陆
export function IsLogin() {
	let openid = uni.getStorageSync('openid')
	let token = uni.getStorageSync('token')
	
	console.log('openid length:' + openid + ", token length:" + token)
	
	if (openid && token) { 
		return true
	}
	
	return false
}

// 获取用户信息
export function MemberInfo() {
	let info = uni.getStorageSync('memberInfo')
	return info
}