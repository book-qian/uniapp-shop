"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_store = require("./store/store.js");
require("./utils/axios.js");
require("./store/cart.js");
require("./store/user.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/cate/cate.js";
  "./pages/cart/cart.js";
  "./pages/my/my.js";
  "./subpkg/goods_detail/goods_detail.js";
  "./subpkg/goods_list/goods_list.js";
  "./subpkg/search/search.js";
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
common_vendor.index.$showMessage = function(title = "网络请求失败", duration = 1500) {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
};
console.log("https://www.fxgh.top/memorandumServer", "获取处于当前开发环境的url");
console.log("https://api-hmugo-web.itheima.net", "获取处于当前开发环境的api");
console.log("pro", "获取当前处于哪个开发环境");
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_store.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=app.js.map
