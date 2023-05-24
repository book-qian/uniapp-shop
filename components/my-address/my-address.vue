<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button class="btnChooseAddress" type="primary" size="mini" @click="chooseAddres">请选择收货地址+</button>
		</view>
		<!-- 收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddres">
			<view class="row1">
				<view class="row1-left">
					<view class="user-name">收货人：{{ address.userName }}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：{{ address.telNumber }}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{ addstr }}</view>
			</view>
		</view>
		<!-- 底部边框区域 -->
		<image class="address-border" src="/static/cart_border@2x.png"></image>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const address = computed(() => store.state['m_user'].address);
const addstr = computed(() => store.getters['m_user/addstr']);

const chooseAddres = async () => {
	const res = await uni.chooseAddress().catch(err => err);
	// 调用小程序chooseAddress方法
	if (res.errMsg === 'chooseAddress:ok') {
		store.commit('m_user/updateAddress', res);
	}
};
</script>

<style lang="scss">
.address-choose-box {
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.address-border {
	display: block;
	height: 5px;
	width: 100%;
}
.address-info-box {
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 12px;
	padding: 0 5px;
	.row1 {
		display: flex;
		justify-content: space-between;
		.row1-right {
			display: flex;
			justify-content: space-between;
		}
	}
	.row2 {
		display: flex;
		align-items: center;
		margin-top: 10px;
		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>
