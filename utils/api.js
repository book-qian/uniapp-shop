import request from '@/utils/axios.js'

const BASE_URL = process.env.VUE_APP_BASE_URL // node接口地址

// node接口get请求封装
export function ajaxGet(url) {
	return new Promise(async (resolve, reject) => {
		const res = await request.get(BASE_URL + url)
		resolve(res)
	})
}

// node接口post请求封装
export function ajaxPost(url, params) {
	return new Promise(async (resolve, reject) => {
		const res = await request.post(BASE_URL + url, params)
		resolve(res)
	})
}



const BASE_API = process.env.VUE_APP_BASE_API // java 接口地址

// java post请求封装
export function fetchPost(url, params) {
	return new Promise(async (resolve, reject) => {
		const res = await request.post(BASE_API + url, params)
		resolve(res)
	})
}
// java get请求封装
export function fetchGet(url) {
	return new Promise(async (resolve, reject) => {
		const res = await request.get(BASE_API + url)
		resolve(res)
	})
}