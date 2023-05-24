<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { setBarge } from '@/hook/useTabbarBadge.js';
import { useStore } from 'vuex';

const store = useStore();
const token = computed(() => store.state['m_user'].token);

onShow(() => {
	setBarge();
});
</script>

<style lang="scss">
page,
.my-container {
	height: 100%;
}
</style>
