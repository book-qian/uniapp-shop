"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-settle",
  computed: {
    ...common_vendor.mapGetters("m_cart", ["checkedCount", "allCount", "checkedGoodsAmount"]),
    isFullChecked() {
      return this.allCount === this.checkedCount;
    }
  },
  data() {
    return {};
  },
  methods: {
    ...common_vendor.mapMutations("m_cart", ["updateAllGoodsState"]),
    changeState() {
      this.updateAllGoodsState(!this.isFullChecked);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.isFullChecked,
    b: common_vendor.o((...args) => $options.changeState && $options.changeState(...args)),
    c: common_vendor.t(_ctx.checkedGoodsAmount),
    d: common_vendor.t(_ctx.checkedCount)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/components/my-settle/my-settle.vue"]]);
wx.createComponent(Component);
