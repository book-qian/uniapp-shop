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

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	name: 'my-settle',
	computed: {
		...mapGetters('m_cart', ['checkedCount', 'allCount', 'checkedGoodsAmount']),
		...mapGetters('m_user', ['addstr']),
		...mapState('m_user', ['token']),
		...mapState('m_cart', ['cart']),
		isFullChecked() {
			return this.allCount === this.checkedCount;
		}
	},
	data() {
		return {
			seconds: 3, //倒计时的秒数
			timer: null //定时器id
		};
	},
	methods: {
		...mapMutations('m_cart', ['updateAllGoodsState']),
		...mapMutations('m_user', ['updateRedirectInfo']),
		changeState() {
			this.updateAllGoodsState(!this.isFullChecked);
		},
		// 用户结算
		settlement() {
			if (!this.checkedCount) return uni.$showMessage('请先勾选商品');

			if (!this.addstr) return uni.$showMessage('请先选择地址');

			if (!this.token) return this.delayNavigation();
			// 支付订单
			this.payOrder();
		},
		async payOrder() {
			// 微信支付的流程
			// 1.创建订单 =>订单编号
			//1.1 组建订单信息对象
			const goods = this.cart
				.filter(t => t.goods_state)
				.map(s => {
					return {
						goods_id: s.goods_id,
						goods_number: s.goods_count,
						goods_price: s.goods_price
					};
				});
			const orderInfo = {
				// order_price: this.checkedGoodsAmount
				order_price: 0.01,
				consignee_addr: this.addstr,
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
			// const payInfo = {
			// 	nonceStr: 'IetkN22VgkNYQr8t',
			// 	package: 'prepay_id=wx01124228305228b1aa856d4d868d4b0000',
			// 	paySign: '8DA7BD5EA9CC52C520A6B6CD00B923F5',
			// 	signType: 'MD5',
			// 	timeStamp: '1598935352'
			// };

			// 3.发起微信支付
			//3.1 调用 uni.requestPayment() 发起微信支付
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
		},
		// 展示倒计时的信息
		showTips(n) {
			uni.showToast({
				title: `请登录后再结算，${n}秒之后将跳转登录页面`,
				icon: 'none',
				mask: true, // 添加遮罩层，防止点击穿透
				duration: 1500
			});
		},
		// 延迟跳转到我的页面
		delayNavigation() {
			this.seconds = 3;
			this.showTips(this.seconds);
			this.timer = setInterval(() => {
				this.seconds--;
				// 添加定时器边界
				if (this.seconds <= 0) {
					clearInterval(this.timer);
					uni.switchTab({
						url: '/pages/my/my',
						success: () => {
							this.updateRedirectInfo({
								openType: 'switchTab',
								from: '/pages/cart/cart'
							});
						}
					});
					return;
				}
				this.showTips(this.seconds);
			}, 1000);
		}
	}
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
