<template>
	<view class="cart-container" v-if="cart.length > 0">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		<!-- 商品列表标题区域 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表内容区域 -->
		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swiperItemClickHandler(goods)">
					<my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler" />
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算组件区域 -->
		<my-settle></my-settle>
	</view>
	<!--空白购物车区域 -->
	<view class="empty-cart" v-else>
		<uni-icons type="cart" size="40" color="#c00000"></uni-icons>
		<text class="tips-text">空空如也~</text>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { setBarge } from '@/hook/useTabbarBadge.js';
import { useStore } from 'vuex';

const store = useStore();
// 购物车数据
const cart = computed(() => store.state['m_cart'].cart);

const options = ref([
	{
		text: '删除',
		style: {
			backgroundColor: '#C00000'
		}
	}
]);
// 更新购物车商品状态
const radioChangeHandler = e => store.commit('m_cart/updateGoodsState', e);

// 更新购物车商品数量
const numChangeHandler = e => store.commit('m_cart/updateGoodsCount', e);

const total = computed(() => store.getters['m_cart/total']);
// 删除购物车商品
const swiperItemClickHandler = ({ goods_id }) => {
	store.commit('m_cart/deleteCartGoods', goods_id);
	// 更新tarbar数字徽标
	uni.setTabBarBadge({
		index: 2,
		text: total.value + ''
	});
};

onShow(() => {
	setBarge();
});
</script>

<style lang="scss">
.cart-container {
	padding-bottom: 50px;
}
.cart-title {
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text {
		margin-left: 10px;
	}
}
.empty-cart {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img {
		width: 90px;
		height: 90px;
	}
	.tips-text {
		font-size: 12px;
		color: gray;
		margin-top: 15px;
	}
}
</style>
