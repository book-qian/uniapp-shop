"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-search",
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
  data() {
    return {};
  },
  methods: {
    searchBoxHander() {
      this.$emit("handle-click");
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "search",
      size: "17"
    }),
    b: $props.radius + "px",
    c: $props.bgcolor,
    d: common_vendor.o((...args) => $options.searchBoxHander && $options.searchBoxHander(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/components/my-search/my-search.vue"]]);
wx.createComponent(Component);
