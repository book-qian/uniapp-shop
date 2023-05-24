import {
	useStore
} from 'vuex'
import {
	computed
} from 'vue'

export function setBarge() {
	const store = useStore()
	const total = computed(() => store.getters['m_cart/total'])
	uni.setTabBarBadge({
		index: 2,
		text: total.value + ''
	});
}