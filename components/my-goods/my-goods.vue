<template>
	<view class="goods-item">
		<view class="good-item-left"><image class="goods-pic" :src="goods.goods_small_logo || defaultPic"></image></view>
		<view class="goods-item-right">
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info">
				<view class="goods-price">¥{{ goodsPrice }}</view>
			</view>
		</view>
	</view>
</template>

<script setup name="my-goods">
import { ref, computed } from 'vue';
const defaultPic = ref('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg');
const props = defineProps({
	goods: {
		type: Object,
		default: {}
	}
});
const goodsPrice = computed(() => Number(props.goods?.goods_price).toFixed(2));
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.good-item-left {
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
		.goods-name {
			font-size: 13px;
		}
		.goods-info {
			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
}
</style>
