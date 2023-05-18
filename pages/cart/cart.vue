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

<script>
import badgeMix from '@/minxins/tabbar-badge.js';
import { mapState, mapMutations } from 'vuex';
export default {
	mixins: [badgeMix],
	computed: {
		...mapState('m_cart', ['cart'])
	},
	data() {
		return {
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}
			]
		};
	},
	methods: {
		...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'deleteCartGoods']),
		radioChangeHandler(e) {
			this.updateGoodsState(e);
		},
		numChangeHandler(e) {
			this.updateGoodsCount(e);
		},
		swiperItemClickHandler({ goods_id }) {
			this.deleteCartGoods(goods_id);
			// 动态为tarbar设置数字徽标
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			});
		}
	}
};
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
