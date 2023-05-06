<template>
	<view class="scroll-view-container">
		<!-- 左侧滑动区域 -->
		<scroll-view class="left-scroll-view" scroll-y="true" :style="{ height: wh + 'px' }">
			<block v-for="(item, i) in cateList" :key="i">
				<view @click="activeChange(i)" :class="['left-scroll-view-item', i === active ? 'active' : '']">{{ item.cat_name }}</view>
			</block>
		</scroll-view>
		<!-- 右侧滑动区域 -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true" :style="{ height: wh + 'px' }">
			<view class="cate-level2" v-for="(item2, i2) in cateLevel2" :key="i2">
				<!-- 二级分类 -->
				<view class="cate-level2-title">-{{ item2.cat_name }}-</view>
				<!-- 二级分类下的三级分类 -->
				<!-- 三级分类列表 -->
				<view class="cate-level3-list">
					<!-- 三级分类的item项 -->
					<view class="cate-level3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
						<image :src="item3.cat_icon"></image>
						<text>{{ item3.cat_name }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wh: 0, //当前屏幕可使用高度
			cateList: [],
			active: 0,
			cateLevel2: [], //二级分类
			scrollTop: 0
		};
	},
	async onLoad() {
		const { windowHeight } = await uni.getSystemInfo();
		this.wh = windowHeight;
		this.getCateListData();
	},
	methods: {
		// 获取分类列表的数据
		async getCateListData() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories');
			const { meta, message } = res;
			if (meta.status !== 200) uni.$showMessage();
			console.log(message);
			this.cateList = message;
			this.cateLevel2 = message[0].children;
		},
		activeChange(i) {
			this.active = i;
			// 更新二级分类数据
			this.cateLevel2 = this.cateList[i].children;
			// 回到顶部
			this.scrollTop = this.scrollTop === 0 ? 1 : 0;
		},
		gotoGoodsList({ cat_id }) {
			uni.navigateTo({
				url: '/subpkg/goods_list/goods_list?c_id=' + cat_id
			});
		}
	}
};
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	.left-scroll-view {
		width: 120px;
		.left-scroll-view-item {
			background: #f7f7f7;
			font-size: 12px;
			line-height: 60px;
			text-align: center;
			&.active {
				background: #ffffff;
				position: relative;
				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background: #c00000;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
	.cate-level2-title {
		text-align: center;
		font-size: 12px;
		font-weight: bold;
		padding: 15px 0;
	}
	.cate-level3-list {
		display: flex;
		flex-wrap: wrap;
		.cate-level3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			image {
				width: 60px;
				height: 60px;
			}
			text {
				font-size: 12px;
			}
		}
	}
}
</style>
