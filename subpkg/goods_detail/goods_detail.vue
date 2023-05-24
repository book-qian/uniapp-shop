<template>
	<view v-if="goodsDetail.goodsInfo?.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goodsDetail.goodsInfo?.pics" :key="i" @click="preview(i)"><image :src="item.pics_big"></image></swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price">￥{{ goodsDetail.goodsInfo?.goods_price }}</view>
			<!-- 商品信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{ goodsDetail.goodsInfo?.goods_name }}</view>
				<!-- 收藏 -->
				<view class="goods-favr">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>
		<!-- 商品介绍 -->
		<rich-text :nodes="goodsDetail.goodsInfo?.goods_introduce"></rich-text>

		<!-- 商品导航区域 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="goodsDetail.options" :buttonGroup="goodsDetail.buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
const store = useStore();
const goodsDetail = reactive({
	goodsInfo: {},
	options: [
		{
			icon: 'shop',
			text: '店铺'
		},
		{
			icon: 'cart',
			text: '购物车',
			info: 0
		}
	],
	buttonGroup: [
		{
			text: '加入购物车',
			backgroundColor: '#ff0000',
			color: '#fff'
		},
		{
			text: '立即购买',
			backgroundColor: '#ffa200',
			color: '#fff'
		}
	]
});

const total = computed(() => store.getters['m_cart/total']);
watch(
	() => total.value,
	newVal => {
		const findResult = goodsDetail.options.find(t => t.text === '购物车');
		if (findResult) {
			findResult.info = newVal;
		}
	},
	{ immediate: true }
);
// 左侧导航点击
const onClick = e => {
	if (e.content.text === '购物车') {
		uni.switchTab({
			url: '/pages/cart/cart'
		});
	}
};

// 右侧点击
const buttonClick = e => {
	if (e.content.text === '加入购物车') {
		// 组织商品对象 goods_id goods_name goods_price goods_count goods_small_logo goods_state
		const { goods_id, goods_name, goods_price, goods_small_logo } = goodsDetail.goodsInfo;
		let goods = {
			goods_id,
			goods_name,
			goods_price,
			goods_small_logo,
			goods_count: 1,
			goods_state: true
		};
		// 添加购物车
		store.commit('m_cart/addToCart', goods);
	}
};

// 右侧导航点击
const getGoodsInfo = async goods_id => {
	const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });
	const { meta, message } = res;
	if (meta.status !== 200) return uni.$showMessage();
	message.goods_introduce = message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp,'jpg'/g);

	goodsDetail.goodsInfo = message;
};

onLoad(({ goods_id }) => {
	getGoodsInfo(goods_id);
});

const preview = i => {
	uni.previewImage({
		urls: goodsDetail.goodsInfo.pics.map(t => t.pics_big),
		current: i
	});
};
</script>

<style lang="scss">
swiper {
	height: 750rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.goods-info-box {
	padding: 10px;
	padding-right: 0;
	.goods-price {
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info-body {
		display: flex;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
			margin-right: 10px;
		}
		.goods-favr {
			width: 120px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 12px;
			color: gray;
			border-left: 1px solid #efefef;
		}
	}
	.yf {
		color: gray;
		font-size: 12px;
		margin: 10px 0;
	}
}
.goods-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
.goods-detail-container {
	padding-bottom: 50px;
}
</style>
