"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my-userinfo",
  setup(__props) {
    const store = common_vendor.useStore();
    const userinfo = common_vendor.computed(() => store.state["m_user"].userinfo);
    const logout = async () => {
      const { confirm } = await common_vendor.index.showModal({
        title: "提示",
        content: "确认退出登录吗？"
      }).catch((err) => err);
      if (confirm) {
        store.commit("m_user/updateAddress", {});
        store.commit("m_user/updateUserinfo", {});
        store.commit("m_user/updateToken", "");
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userinfo).avatarUrl,
        b: common_vendor.t(common_vendor.unref(userinfo).nickName),
        c: common_vendor.p({
          type: "arrowright",
          size: "15"
        }),
        d: common_vendor.p({
          type: "arrowright",
          size: "15"
        }),
        e: common_vendor.p({
          type: "arrowright",
          size: "15"
        }),
        f: common_vendor.o(logout)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/components/my-userinfo/my-userinfo.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=my-userinfo.js.map
