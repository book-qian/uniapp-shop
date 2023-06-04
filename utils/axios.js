// 导入网络请求的包
import {
	$http
} from '@escook/request-miniprogram';
// uni.$axios = $http
// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})
	const {
		url,
		header
	} = options

	// 为需要登录权限的接口添加token
	if (url.includes('/my/')) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}
// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}


export default $http;