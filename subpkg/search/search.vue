<template>
	<!-- 搜索框 -->
	<div class="search-box"><uni-search-bar placeholder="请输入搜索内容" @input="input" cancelButton="none" :radius="100"></uni-search-bar></div>
	<!-- 搜索建议列表 -->
	<view class="sugg-list" v-if="kw.length !== 0">
		<view class="sugg-item" @click="gotoGoodsDetail(item)" v-for="(item, i) in searchResult" :key="i">
			<view class="goods-name">{{ item.goods_name }}</view>
			<uni-icons type="arrowright" size="16"></uni-icons>
		</view>
	</view>
	<!-- 搜索历史 -->
	<view class="history-box" v-else>
		<!-- 标题区域 -->
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons type="trash" size="17" @click="clean"></uni-icons>
		</view>
		<!-- 列表区域 -->
		<view class="history-list"><uni-tag @click="gotoGoodsList(item)" inverted :text="item" v-for="(item, i) in histories" :key="i"></uni-tag></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 防抖处理
			timer: null,
			kw: '',
			searchResult: [],
			// 搜索历史
			searchHistory: []
		};
	},
	computed: {
		histories() {
			return [...this.searchHistory].reverse();
		}
	},
	onLoad() {
		this.searchHistory = JSON.parse(uni.getStorageSync('kw') || '[]');
	},
	methods: {
		input(value) {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.kw = value;
				// 根据关键字查询搜索建议列表
				this.getSearchList();
			}, 500);
		},
		async getSearchList() {
			if (this.kw.length === 0) {
				this.searchResult = [];
				return;
			}
			const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw });
			const { meta, message } = res;
			if (meta.status !== 200) return uni.$showMessage();

			this.searchResult = message;
			this.saveHistory();
			console.log(this.searchResult);
		},
		gotoGoodsDetail({ goods_id }) {
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
			});
		},
		saveHistory() {
			const set = new Set(this.searchHistory);
			set.delete(this.kw);
			set.add(this.kw);
			this.searchHistory = Array.from(set);
			//搜索历史的持久化存储
			uni.setStorageSync('kw', JSON.stringify(this.searchHistory));
		},
		clean() {
			this.searchHistory = [];
			uni.setStorageSync('kw', '[]');
		},
		gotoGoodsList(item) {
			uni.navigateTo({
				url: '/subpkg/goods_list/goods_list?query=' + item
			});
		}
	}
};
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list {
	padding: 0 5px;
	.sugg-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;
		padding: 13px 0px;
		.goods-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 12px;
			margin-right: 3px;
		}
	}
}
.history-box {
	padding: 0 5px;
	.history-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		border-bottom: 1px solid #efefef;
		font-size: 13px;
	}
	:deep(.history-list) {
		display: flex;
		flex-wrap: wrap;
		uni-tag {
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
