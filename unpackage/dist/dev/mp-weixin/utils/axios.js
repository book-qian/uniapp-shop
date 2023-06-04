"use strict";
const common_vendor = require("../common/vendor.js");
common_vendor.$http.beforeRequest = function(options) {
  common_vendor.index.showLoading({
    title: "数据加载中..."
  });
  const {
    url,
    header
  } = options;
  if (url.includes("/my/")) {
    options.header = {
      Authorization: store.state.m_user.token
    };
  }
};
common_vendor.$http.afterRequest = function() {
  common_vendor.index.hideLoading();
};
//# sourceMappingURL=axios.js.map
