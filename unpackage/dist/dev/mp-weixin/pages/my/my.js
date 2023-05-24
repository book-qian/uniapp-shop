"use strict";
const common_vendor = require("../../common/vendor.js");
const hook_useTabbarBadge = require("../../hook/useTabbarBadge.js");
if (!Array) {
  const _easycom_my_login2 = common_vendor.resolveComponent("my-login");
  const _easycom_my_userinfo2 = common_vendor.resolveComponent("my-userinfo");
  (_easycom_my_login2 + _easycom_my_userinfo2)();
}
const _easycom_my_login = () => "../../components/my-login/my-login.js";
const _easycom_my_userinfo = () => "../../components/my-userinfo/my-userinfo.js";
if (!Math) {
  (_easycom_my_login + _easycom_my_userinfo)();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const store = common_vendor.useStore();
    const token = common_vendor.computed(() => store.state["m_user"].token);
    common_vendor.onShow(() => {
      hook_useTabbarBadge.setBarge();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(token)
      }, !common_vendor.unref(token) ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=my.js.map
