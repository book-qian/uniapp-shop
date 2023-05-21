"use strict";
const common_vendor = require("../common/vendor.js");
const moduleUser = {
  // 开启命名空间
  namespaced: true,
  // 数据
  state: () => ({
    address: JSON.parse(common_vendor.index.getStorageSync("address") || "{}"),
    token: common_vendor.index.getStorageSync("token") || "",
    userinfo: JSON.parse(common_vendor.index.getStorageSync("userinfo") || "{}"),
    redirectInfo: null
    // 重定向信息对象 { openType,from}
  }),
  // 方法
  mutations: {
    updateAddress(state, address) {
      state.address = address;
      this.commit("m_user/saveAddressToStorage");
    },
    // 持久化存储地址信息
    saveAddressToStorage(state) {
      common_vendor.index.setStorageSync("address", JSON.stringify(state.address));
    },
    // 修改用户信息
    updateUserinfo(state, userinfo) {
      state.userinfo = userinfo;
      this.commit("m_user/saveUserinfoToStorage");
    },
    // 持久化存储用户信息
    saveUserinfoToStorage(state) {
      common_vendor.index.setStorageSync("userinfo", JSON.stringify(state.userinfo));
    },
    //修改token
    updateToken(state, token) {
      state.token = token;
      this.commit("m_user/saveTokenToStorage");
    },
    // 持久化存储token
    saveTokenToStorage(state) {
      common_vendor.index.setStorageSync("token", state.token);
    },
    // 更新重定向信息
    updateRedirectInfo(state, redirectInfo) {
      state.redirectInfo = redirectInfo;
      console.log(state.redirectInfo);
    }
  },
  // 数据包装器
  getters: {
    addstr(state) {
      const {
        provinceName,
        cityName,
        countyName,
        detailInfo
      } = state.address;
      if (!provinceName)
        return "";
      return `${provinceName}${cityName}${countyName}${detailInfo}`;
    }
  }
};
exports.moduleUser = moduleUser;
