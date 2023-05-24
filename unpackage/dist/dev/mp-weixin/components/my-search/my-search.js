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
  __name: "my-search",
  props: {
    bgcolor: {
      type: String,
      default: "#C00000"
    },
    radius: {
      type: Number,
      default: 18
      // 单位px
    }
  },
  emits: ["handle-click"],
  setup(__props, { emit: emits }) {
    const searchBoxHander = () => {
      emits("handle-click");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "search",
          size: "17"
        }),
        b: __props.radius + "px",
        c: __props.bgcolor,
        d: common_vendor.o(searchBoxHander)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/components/my-search/my-search.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=my-search.js.map
