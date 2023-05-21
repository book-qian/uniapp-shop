<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
import badgeMix from '@/minxins/tabbar-badge.js';
import { mapState } from 'vuex';
export default {
	mixins: [badgeMix],
	computed: {
		...mapState('m_user', ['token'])
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss">
page,
.my-container {
	height: 100%;
}
</style>
