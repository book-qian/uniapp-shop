<template>
	<view v-if="goodsDetail.goodsInfo?.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goodsDetail.goodsInfo?.pics" :key="i" @click="preview(i)"><image :src="`${BASE_URL}${item.pics_big}`"></image></swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price">
				<uni-icons type="fire" size="17" color="#f2ba4b"></uni-icons>
				{{ goodsDetail.goodsInfo?.goods_number }}
			</view>
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
		</view>
		<!-- 商品介绍 -->
		<!-- <rich-text :nodes="goodsDetail.goodsInfo?.goods_introduce"></rich-text> -->
		<view class="memorandum_detail" v-for="(item, index) in memorandum_detail" :key="index">
			<text class="memorandum-text">{{ item.name }}</text>
			<image :src="`${BASE_URL}${item.url}`"></image>
		</view>
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
import { ajaxGet } from '@/utils/api.js';
import { BASE_URL } from '@/utils/config.js';
const store = useStore();
const goodsDetail = reactive({
	goodsInfo: {},
	options: [
		{
			icon: 'fire',
			text: '热度'
		},
		{
			icon: 'wallet',
			text: '备忘录',
			info: 0
		}
	],
	buttonGroup: [
		{
			text: '加入备忘录',
			backgroundColor: '#ff0000',
			color: '#fff'
		},
		{
			text: '作为模板',
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
	if (e.content.text === '备忘录') {
		uni.switchTab({
			url: '/pages/cart/cart'
		});
	}
};

// 右侧点击
const buttonClick = e => {
	if (e.content.text === '加入备忘录') {
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

// 获取备忘录详情
const memorandum_detail = ref([]);
const getGoodsInfo = async goods_id => {
	const { data: res } = await ajaxGet('/api/public/v1/goods/detail', { goods_id });
	const { meta, message } = res;
	if (meta.status !== 200) return uni.$showMessage();
	memorandum_detail.value = message.memorandum_detail;

	goodsDetail.goodsInfo = message;
};

onLoad(({ goods_id }) => {
	getGoodsInfo(goods_id);
});

const preview = i => {
	let urls = goodsDetail.goodsInfo.pics
		.map(t => {
			return {
				pics_big: `${BASE_URL}${t.pics_big}`
			};
		})
		.map(t => t.pics_big);

	uni.previewImage({
		urls,
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
		color: #f2ba4b;
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
.memorandum_detail {
	padding: 10px;
	.memorandum-text {
		text-align: left;
		font-size: 17px;
	}

	image {
		margin-top: 60rpx;
	}
}
</style>
