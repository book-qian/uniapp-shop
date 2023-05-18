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
		<view class="btn-settle">结算({{ checkedCount }})</view>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	name: 'my-settle',
	computed: {
		...mapGetters('m_cart', ['checkedCount', 'allCount', 'checkedGoodsAmount']),
		isFullChecked() {
			return this.allCount === this.checkedCount;
		}
	},
	data() {
		return {};
	},
	methods: {
		...mapMutations('m_cart', ['updateAllGoodsState']),
		changeState() {
			this.updateAllGoodsState(!this.isFullChecked);
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
