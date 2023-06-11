<template>
	<view>
		<!-- 搜索区域 -->
		<view class="search-box"><my-search @handle-click="gotoSearch"></my-search></view>

		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<img :src="`${BASE_URL}${item.image_src}`" alt="轮播图片" />
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view v-for="(item, i) in navList" :key="i" @click="navClickHander(item)" class="nav-item">
				<image class="nav-img" :src="`${BASE_URL}${item.image_src}`"></image>
				<text class="nav-text">{{ item.name }}</text>
			</view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<view class="floor-title">
					<image :src="`${BASE_URL}${item.floor_title.image_src}`" class="floor-img"></image>
					<text class="floor-text">{{ item.floor_title.name }}</text>
				</view>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧区域 -->
					<navigator :url="`${BASE_URL}${item.product_list[0].url}`" class="left-img-box">
						<image class="cover-bg" :src="`${BASE_URL}${item.product_list[0].image_src}`" mode="widthFix" :style="{ width: item.product_list[0].image_width + 'rpx' }">
							<text class="cover-text">{{ item.product_list[0].name }}</text>
						</image>
					</navigator>
					<!-- 右侧区域 -->
					<view class="right-img-box">
						<template v-for="(item2, index) in item.product_list" :key="index">
							<navigator :url="item2.url" class="right-item" v-if="index !== 0">
								<image class="cover-bg" :style="{ width: item2.image_width + 'rpx' }" :src="`${BASE_URL}${item2.image_src}`" mode="widthFix">
									<text class="cover-text">{{ item2.name }}</text>
								</image>
							</navigator>
						</template>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { setBarge } from '@/hook/useTabbarBadge.js';
import { ajaxGet } from '@/utils/api.js';
import { BASE_URL } from '@/utils/config.js';

const swiperList = ref([]);
const navList = ref([]);
const floorList = ref([]);

const getSwiperData = async () => {
	const { data: res } = await ajaxGet('/api/public/v1/home/swiperdata');
	const { meta, message } = res;
	// 请求失败
	if (meta.status !== 200) {
		return uni.$showMessage();
	}
	swiperList.value = message;
};

const getNavListData = async () => {
	const { data: res } = await ajaxGet('/api/public/v1/home/catitems');
	const { meta, message } = res;
	if (meta.status !== 200) uni.$showMessage();
	navList.value = message;
};

const navClickHander = item => {
	if (item.name === '分类') {
		uni.switchTab({
			url: '/pages/cate/cate'
		});
	}
};

const getFloorListData = async () => {
	const { data: res } = await ajaxGet('/api/public/v1/home/floorData');
	const { meta, message } = res;
	if (meta.status !== 200) return uni.$showMessage();
	//对数据进行处理
	message.forEach(floor => {
		floor.product_list.forEach(prod => {
			prod.url = `/subpkg/goods_list/goods_list?${prod.navigator_url.split('?')[1]}`;
		});
	});
	floorList.value = message;
};

const gotoSearch = () => {
	uni.navigateTo({
		url: '/subpkg/search/search'
	});
};

onShow(() => {
	setBarge();
});

onLoad(() => {
	getSwiperData();
	getNavListData();
	getFloorListData();
});
</script>
<style lang="scss">
swiper {
	height: 330rpx;
	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}

.nav-list {
}
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15rpx 0;
	.nav-item {
		width: 128rpx;
		height: 140rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		.nav-img {
			width: 100%;
		}
	}
}

.floor-list {
	padding: 10px;
	.floor-item {
		margin-bottom: 10px;
		.cover-bg {
			position: relative;
			border-radius: 10rpx;
			.cover-text {
				width: 100%;
				position: absolute;
				color: #fff;
				font-size: 20px;
				top: 50%;
				text-align: center;
				font-weight: bold;
				transform: translateY(-50%);
			}
		}
		.floor-title {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			.floor-text {
				margin-left: 10px;
				font-size: 18px;
				font-weight: bold;
			}
			.floor-img {
				width: 40rpx;
				height: 40rpx;
			}
		}
		.floor-img-box {
			display: flex;
			.left-img-box {
				font-size: 0;
			}
			.right-img-box {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.right-item {
					display: flex;
					align-items: center;
					justify-content: center;
					.cover-bg {
						.cover-text {
							font-size: 20rpx;
							color: #000;
						}
					}
				}
			}
		}
	}
}

.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
</style>
