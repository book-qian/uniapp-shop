<template>
	<view class="my-search-container" :style="{ 'background-color': bgcolor }" @click="searchBoxHander">
		<view class="my-search-box" :style="{ 'border-radius': radius + 'px' }">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	bgcolor: {
		type: String,
		default: '#f2ba4b'
	},
	radius: {
		type: Number,
		default: 18 // 单位px
	}
});

const emits = defineEmits(['handle-click']);

const searchBoxHander = () => {
	emits('handle-click');
};
</script>

<style lang="scss">
.my-search-container {
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.my-search-box {
		width: 100%;
		height: 36px;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>
