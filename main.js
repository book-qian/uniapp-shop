 import store from './store/store.js'
 // 导入网络请求的包
 import {
 	$http
 } from '@escook/request-miniprogram';
 uni.$http = $http
 // 请求的根路径
 $http.baseUrl = 'https://api-hmugo-web.itheima.net'
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

 // 封装弹框方法
 uni.$showMessage = function(title = '网络请求失败', duration = 1500) {
 	uni.showToast({
 		title,
 		duration,
 		icon: 'none'
 	})
 }



 // #ifndef VUE3
 import Vue from 'vue'
 import App from './App'

 Vue.config.productionTip = false

 App.mpType = 'app'

 const app = new Vue({
 	...App,
 	store
 })
 app.$mount()
 // #endif

 // #ifdef VUE3
 import {
 	createSSRApp
 } from 'vue'
 import App from './App.vue'
 export function createApp() {
 	const app = createSSRApp(App)
 	app.use(store)
 	return {
 		app
 	}
 }
 // #endif