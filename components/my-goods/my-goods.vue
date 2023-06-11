<template>
	<view class="goods-item">
		<view class="good-item-left">
			<radio :checked="goods.goods_state" color="#f2ba4b" v-if="showRadio" @click="radioClickHandler"></radio>
			<image class="goods-pic" :src="`${BASE_URL}${goods.goods_small_logo}` || defaultPic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info">
				<view class="goods-price">
					<uni-icons type="fire" size="17" color="#f2ba4b"></uni-icons>
					{{ goodsPrice }}
				</view>
				<uni-number-box :min="1" v-model="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { BASE_URL } from '@/utils/config.js';

const props = defineProps({
	// 商品信息对象
	goods: {
		type: Object,
		default: () => {
			return {};
		}
	},
	// 是否展示单选按钮
	showRadio: {
		type: Boolean,
		default: false
	},
	// 是否展示数字选择
	showNum: {
		type: Boolean,
		default: false
	}
});

const emits = defineEmits(['radio-change', 'num-change']);

const goodsPrice = computed(() => {
	return props.goods && Number(props.goods.goods_price);
});
const defaultPic = ref('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg');

const radioClickHandler = e => {
	emits('radio-change', {
		goods_id: props.goods.goods_id,
		goods_state: !props.goods.goods_state
	});
};

const numChangeHandler = val => {
	emits('num-change', {
		goods_id: props.goods.goods_id,
		goods_count: +val
	});
};
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.good-item-left {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 10px;
		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		.goods-name {
			font-size: 13px;
		}
		.goods-info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.goods-price {
				font-size: 16px;
				color: #f2ba4b;
			}
		}
	}
}
</style>
