export default {
	// 开启命名空间
	namespaced: true,

	// 数据
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),

	// 方法
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		// 持久化存储地址信息
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},

	// 数据包装器
	getters: {
		addstr(state) {
			const {
				provinceName,
				cityName,
				countyName,
				detailInfo
			} = state.address;
			if (!provinceName) return '';
			return `${provinceName}${cityName}${countyName}${detailInfo}`;
		}
	}
}