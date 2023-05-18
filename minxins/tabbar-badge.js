import {
	mapGetters
} from 'vuex';
export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	onShow() {
		this.setBarge();
	},
	methods: {
		// 动态为tarbar设置数字徽标
		setBarge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			});
		}
	}
}