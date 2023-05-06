"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/cate/cate.js";
  "./pages/cart/cart.js";
  "./pages/my/my.js";
  "./subpkg/goods_detail/goods_detail.js";
  "./subpkg/goods_list/goods_list.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
common_vendor.index.$http = common_vendor.$http;
common_vendor.$http.baseUrl = "https://api-hmugo-web.itheima.net";
common_vendor.$http.beforeRequest = function(options) {
  common_vendor.index.showLoading({
    title: "数据加载中..."
  });
};
common_vendor.$http.afterRequest = function() {
  common_vendor.index.hideLoading();
};
common_vendor.index.$showMessage = function(title = "网络请求失败", duration = 1500) {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
};
createApp().app.mount("#app");
exports.createApp = createApp;
