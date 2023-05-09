<template>
	<view class="goods-list">
		<view v-for="(goods, i) in goodsList" :key="i" @click="gotoGoodsDetail(goods)"><my-goods :goods="goods"></my-goods></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			queryObj: {
				query: '',
				cid: '',
				pagenum: 1,
				pagesize: 10
			},
			total: 0,
			goodsList: [],
			isload: false // 节流阀
		};
	},
	onLoad({ query = '', cid = '' }) {
		this.queryObj.query = query;
		this.queryObj.cid = cid;
		this.getGoodsList();
	},
	methods: {
		async getGoodsList(cb) {
			this.isload = true;
			const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
			this.isload = false;

			// 下拉刷新请求数据之后 关闭下拉效果
			cb && cb();

			const { meta, message } = res;
			if (meta.status !== 200) return uni.$showMessage();
			this.total = message.total;
			this.goodsList = [...this.goodsList, ...message.goods];
			// console.log(this.goodsList);
		},
		gotoGoodsDetail({ goods_id }) {
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
			});
		}
	},
	// 触底事件/上拉加载
	onReachBottom() {
		// 判断数据加载完毕
		if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMessage('数据加载完毕');
		if (this.isload) retuen;
		this.queryObj.pagenum++;
		this.getGoodsList();
	},
	//下拉刷新
	onPullDownRefresh() {
		// 重重关键数据
		this.queryObj.pagenum = 1;
		this.total = 0;
		this.goodsList = [];

		// 重新获取数据
		this.getGoodsList(() => uni.stopPullDownRefresh());
	}
};
</script>

<style lang="scss"></style>
