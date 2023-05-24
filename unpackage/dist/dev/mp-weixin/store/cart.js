"use strict";
const common_vendor = require("../common/vendor.js");
const moduleCart = {
  namespaced: true,
  state: () => ({
    // 购物车数组 
    // 包含 goods_id goods_name goods_price goods_count goods_small_logo goods_state
    cart: JSON.parse(common_vendor.index.getStorageSync("cart") || "[]")
  }),
  getters: {
    // 购物车商品总数
    total(state) {
      return state.cart.length;
    },
    // 所有商品的总数量
    allCount(state) {
      return state.cart.reduce((prev, goods) => prev + goods.goods_count, 0);
    },
    // 已选中商品的总数量
    checkedCount(state) {
      return state.cart.filter((t) => t.goods_state).reduce((total, item) => total + item.goods_count, 0);
    },
    // 已选中商品的总价格
    checkedGoodsAmount(state) {
      return state.cart.filter((t) => t.goods_state).reduce((total, item) => total + item.goods_count * item.goods_price, 0).toFixed(2);
    }
  },
  mutations: {
    // 添加商品到购物车
    addToCart(state, goods) {
      const findCart = state.cart.find((t) => t.goods_id === goods.goods_id);
      if (!findCart) {
        state.cart.push(goods);
      } else {
        findCart.goods_count++;
      }
      this.commit("m_cart/saveToStorage");
    },
    // 本地持久化存储购物车信息
    saveToStorage(state) {
      common_vendor.index.setStorageSync("cart", JSON.stringify(state.cart));
    },
    // 更新购物车中商品的状态
    updateGoodsState(state, goods) {
      const findResult = state.cart.find((t) => t.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_state = goods.goods_state;
        this.commit("m_cart/saveToStorage");
      }
    },
    // 更新商品数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find((t) => t.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_count = goods.goods_count;
        this.commit("m_cart/saveToStorage");
      }
    },
    deleteCartGoods(state, goods_id) {
      state.cart = state.cart.filter((t) => t.goods_id !== goods_id);
      this.commit("m_cart/saveToStorage");
    },
    // 更新购物车所有商品的状态
    updateAllGoodsState(state, checked) {
      state.cart.forEach((t) => t.goods_state = checked);
      this.commit("m_cart/saveToStorage");
    }
  }
};
exports.moduleCart = moduleCart;
//# sourceMappingURL=cart.js.map
