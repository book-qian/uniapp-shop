<template>
	<view class="goods-list">
		<view v-for="(goods, i) in goodsList" :key="i" @click="gotoGoodsDetail(goods)"><my-goods :goods="goods"></my-goods></view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';

const queryObj = reactive({
	query: '',
	cid: '',
	pagenum: 1,
	pagesize: 10
});
const isload = ref(false); // 节流阀
const total = ref(0);
const goodsList = ref([]);
const getGoodsList = async cb => {
	isload.value = true;
	const { data: res } = await uni.$http.get('/api/public/v1/goods/search', queryObj);
	isload.value = false;

	// 下拉刷新请求数据之后 关闭下拉效果
	cb && cb();

	const { meta, message } = res;
	if (meta.status !== 200) return uni.$showMessage();
	total.value = message.total;
	goodsList.value = [...goodsList.value, ...message.goods];
};

const gotoGoodsDetail = ({ goods_id }) => {
	uni.navigateTo({
		url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
	});
};

// 触底事件/上拉加载
onReachBottom(() => {
	// 判断数据加载完毕
	if (queryObj.pagenum * queryObj.pagesize >= total.value) return uni.$showMessage('数据加载完毕');
	if (isload.value) retuen;
	queryObj.pagenum++;
	getGoodsList();
});

//下拉刷新
onPullDownRefresh(() => {
	queryObj.pagenum = 1;
	total.value = 0;
	goodsList.value = [];

	// 重新获取数据
	getGoodsList(() => uni.stopPullDownRefresh());
});

onLoad(({ query = '', cid = '' }) => {
	queryObj.query = query;
	queryObj.cid = cid;
	getGoodsList();
});
</script>

<style lang="scss"></style>
