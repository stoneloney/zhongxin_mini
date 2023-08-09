import {PostReq} from '@/api/http.js'

export function orderList(data, callback) {
	let apiUrl = "/order/list"
	return PostReq(apiUrl, data, callback)
}

export function orderDetail(data, callback) {
	let apiUrl = "/order/detail"
	return PostReq(apiUrl, data, callback)
}

export function payOrderUse(data, callback) {
	let apiUrl = "/order/use"
	return PostReq(apiUrl, data, callback)
}

export function cancelOrder(data, callback) {
	let apiUrl = "/order/cancel"
	return PostReq(apiUrl, data, callback)
}

export function OrderStatusStr(status) {
	switch (status) {
		case 0:
			return '待支付'
		case 1:
			return '待使用'
		case 2:
		    return '已超时'
		case 3:
			return '订单异常'
	    case 4:
			return '待退款'
		case 5:
			return '已使用'
		case 6:
			return '退款完成'					
	}
}