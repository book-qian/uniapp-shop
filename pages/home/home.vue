<template>
	<view>
		<!-- 搜索区域 -->
		<view class="search-box"><my-search @handle-click="gotoSearch"></my-search></view>

		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`"><img :src="item.image_src" alt="轮播图片" /></navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHander(item)"><img :src="item.image_src" class="nav-img" /></view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-img"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧区域 -->
					<navigator :url="item.product_list[0].url" class="left-img-box">
						<image :src="item.product_list[0].image_src" mode="widthFix" :style="{ width: item.product_list[0].image_width + 'rpx' }"></image>
					</navigator>
					<!-- 右侧区域 -->
					<view class="right-img-box">
						<template v-for="(item2, index) in item.product_list" :key="index">
							<navigator :url="item2.url" class="right-item" v-if="index !== 0">
								<image :src="item2.image_src" :style="{ width: item2.image_width + 'rpx' }" mode="widthFix"></image>
							</navigator>
						</template>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import badgeMix from '@/minxins/tabbar-badge.js';
export default {
	mixins: [badgeMix],
	data() {
		return {
			swiperList: [],
			navList: [],
			floorList: []
		};
	},
	onLoad() {
		this.getSwiperData();
		this.getNavListData();
		this.getFloorListData();
	},
	methods: {
		async getSwiperData() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
			const { meta, message } = res;
			// 请求失败
			if (meta.status !== 200) {
				return uni.$showMessage();
			}
			this.swiperList = message;
		},
		async getNavListData() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
			const { meta, message } = res;
			if (meta.status !== 200) uni.$showMessage();
			this.navList = message;
		},
		navClickHander(item) {
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				});
			}
		},
		async getFloorListData() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/floorData');
			const { meta, message } = res;
			if (meta.status !== 200) return uni.$showMessage();
			//对数据进行处理
			message.forEach(floor => {
				floor.product_list.forEach(prod => {
					prod.url = `/subpkg/goods_list/goods_list?${prod.navigator_url.split('?')[1]}`;
				});
			});
			this.floorList = message;
		},
		gotoSearch() {
			uni.navigateTo({
				url: '/subpkg/search/search'
			});
		}
	}
};
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
	display: flex;
	justify-content: space-around;
	margin: 15rpx 0;
	.nav-img {
		width: 128rpx;
		height: 140rpx;
	}
}

.floor-list {
	.floor-img {
		width: 100%;
		height: 60rpx;
	}
	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}
}

.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
</style>
