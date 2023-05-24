<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="loginHandler">一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo';
const store = useStore();
const redirectInfo = computed(() => store.state['m_user'].redirectInfo);

const loginHandler = e => {
	store.commit('m_user/updateUserinfo', e.detail.userInfo);
	getToken(e.detail);
};
const getToken = async ({ encryptedData, iv, rawData, signature }) => {
	const { errMsg, code } = await uni.login();
	if (errMsg !== 'login:ok') return uni.$showMessage('登录失败');

	const query = {
		code,
		encryptedData,
		iv,
		rawData,
		signature
	};

	const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query);
	const { meta, message } = loginResult;
	if (meta.status == 200) return uni.$showMessage('登录失败');
	uni.$showMessage('登录成功');
	store.commit('m_user/updateToken', TOKEN);

	// 登录成功之后再跳转原来的页面
	if (!redirectInfo.value) return;
	const { openType = '', from: url } = redirectInfo.value;
	if (redirectInfo.value && openType === 'switchTab') {
		uni[openType]({
			url,
			complete: () => {
				store.commit('m_user/updateRedirectInfo', null);
			}
		});
	}
};
</script>

<style lang="scss">
.login-container {
	height: 750rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #f5f5f5;
	position: relative;
	overflow: hidden;
	// 绘制底部椭圆
	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 40px;
		background-color: #fff;
		border-radius: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		transform: translateY(50%);
	}

	.btn-login {
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	.tips-text {
		color: gray;
		font-size: 12px;
	}
}
</style>
