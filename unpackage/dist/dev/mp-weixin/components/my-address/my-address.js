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
  __name: "my-address",
  setup(__props) {
    const store = common_vendor.useStore();
    const address = common_vendor.computed(() => store.state["m_user"].address);
    const addstr = common_vendor.computed(() => store.getters["m_user/addstr"]);
    const chooseAddres = async () => {
      const res = await common_vendor.index.chooseAddress().catch((err) => err);
      if (res.errMsg === "chooseAddress:ok") {
        store.commit("m_user/updateAddress", res);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: JSON.stringify(common_vendor.unref(address)) === "{}"
      }, JSON.stringify(common_vendor.unref(address)) === "{}" ? {
        b: common_vendor.o(chooseAddres)
      } : {
        c: common_vendor.t(common_vendor.unref(address).userName),
        d: common_vendor.t(common_vendor.unref(address).telNumber),
        e: common_vendor.p({
          type: "arrowright",
          size: "16"
        }),
        f: common_vendor.t(common_vendor.unref(addstr)),
        g: common_vendor.o(chooseAddres)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/components/my-address/my-address.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=my-address.js.map
