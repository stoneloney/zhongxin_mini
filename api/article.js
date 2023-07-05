import {PostReq} from '@/api/http.js'

export function ArticleList(page, limit, callback) {
	let apiUrl = "/article/list"
	return PostReq(apiUrl, {
		page: page,
		limit: limit,
	}, callback)
}

export function ArticleDetail(id, callback) {
	let apiUrl = "/article/detail"
	return PostReq(apiUrl,{
		id: id,
	}, callback)
}