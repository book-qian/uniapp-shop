import store from './store/store.js'
import '@/utils/axios.js'

// 封装弹框方法
uni.$showMessage = function(title = '网络请求失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

console.log(process.env.VUE_APP_BASE_URL, '获取处于当前开发环境的url');
console.log(process.env.VUE_APP_BASE_API, '获取处于当前开发环境的api');
console.log(process.env.ENV_TYPE, '获取当前处于哪个开发环境');


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