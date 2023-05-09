"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-goods",
  props: {
    goods: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    const props = __props;
    const defaultPic = common_vendor.ref("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");
    const goodsPrice = common_vendor.computed(() => {
      var _a;
      return Number((_a = props.goods) == null ? void 0 : _a.goods_price).toFixed(2);
    });
    return (_ctx, _cache) => {
      return {
        a: __props.goods.goods_small_logo || defaultPic.value,
        b: common_vendor.t(__props.goods.goods_name),
        c: common_vendor.t(common_vendor.unref(goodsPrice))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/components/my-goods/my-goods.vue"]]);
wx.createComponent(Component);
