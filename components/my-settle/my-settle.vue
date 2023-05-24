<template>
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeState">
			<radio color="#c00000" :checked="isFullChecked" />
			<text>全选</text>
		</label>
		<!-- 合计区域 -->
		<view class="amount-box">
			合计:
			<text class="amount">￥{{ checkedGoodsAmount }}</text>
		</view>
		<!-- 结算区域 -->
		<view class="btn-settle" @click="settlement">结算({{ checkedCount }})</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const allCount = computed(() => store.getters['m_cart/allCount']);
const checkedCount = computed(() => store.getters['m_cart/checkedCount']);
const isFullChecked = computed(() => allCount.value === checkedCount.value);
const changeState = () => store.commit('m_cart/updateAllGoodsState', !isFullChecked.value);

const addstr = computed(() => store.getters['m_user/addstr']);
const token = computed(() => store.state['m_user'].token);
// 用户结算
const settlement = () => {
	if (!checkedCount.value) return uni.$showMessage('请先勾选商品');
	if (!addstr.value) return uni.$showMessage('请先选择地址');
	if (!token.value) return delayNavigation();
	// 支付订单
	payOrder();
};

const seconds = ref(3);
const timer = ref(null);
// 延迟跳转到我的页面
const delayNavigation = () => {
	showTips(seconds.value);
	timer.value = setInterval(() => {
		seconds.value--;
		// 添加定时器边界
		if (seconds.value <= 0) {
			clearInterval(timer.value);
			uni.switchTab({
				url: '/pages/my/my',
				success: () => {
					store.commit('m_user/updateRedirectInfo', {
						openType: 'switchTab',
						from: '/pages/cart/cart'
					});
				}
			});
			return;
		}
		showTips(seconds.value);
	}, 1000);
};
const showTips = n => {
	uni.showToast({
		title: `请登录后再结算，${n}秒之后将跳转登录页面`,
		icon: 'none',
		mask: true, // 添加遮罩层，防止点击穿透
		duration: 1500
	});
};

const checkedGoodsAmount = computed(() => store.getters['m_cart/checkedGoodsAmount']);
// 订单支付
const payOrder = async () => {
	// 1.创建订单
	const cartResult = computed(() => store.state['m_cart'].cart);
	const goods = cartResult.value
		.filter(t => t.goods_state)
		.map(s => {
			return {
				goods_id: s.goods_id,
				goods_number: s.goods_count,
				goods_price: s.goods_price
			};
		});
	//1.1 组建订单信息对象
	const orderInfo = {
		// order_price: checkedGoodsAmount
		order_price: '0.01',
		consignee_addr: addstr.value,
		goods
	};
	//1.2 发起网络请求
	const { data } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo);
	const { meta, message } = data;
	if (meta.status !== 200) return uni.$showMessage('创建订单失败');
	//1.3 获取订单编号
	const orderNum = message.order_number;
	// 2.订单预支付 参数：订单编号 =>返回微信支付需要的参数
	//2.1 发起订单预支付的请求
	const { data: prepayment } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', orderNum);
	const { meta: prepaymentMeta, message: prepaymentMessage } = prepayment;
	if (prepaymentMeta?.status !== 200) return uni.$showMessage('创建订单失败');
	const payInfo = prepaymentMessage.pay;

	// 3.发起微信支付 调用 uni.requestPayment() 发起微信支付
	uni.requestPayment({
		...payInfo,
		success: async res => {
			// 3.3 完成了支付，进一步查询支付的结果
			const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNum });
			if (res3.meta.status !== 200) return uni.$showMessage('订单未支付！');
			// 3.5 检测到订单支付完成
			uni.showToast({
				title: '支付完成！',
				icon: 'success'
			});
		},
		fail: err => {
			// 3.4 检测到订单未支付
			return uni.$showMessage('订单未支付！');
		}
	});
};
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	.radio {
		display: flex;
		align-items: center;
	}
	.amount-box {
		.amount {
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn-settle {
		height: 50px;
		background: #c00000;
		color: #fff;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}
}
</style>
