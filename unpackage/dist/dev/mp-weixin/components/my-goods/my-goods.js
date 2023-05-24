"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  _easycom_uni_number_box2();
}
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  _easycom_uni_number_box();
}
const _sfc_main = {
  __name: "my-goods",
  props: {
    // 商品信息对象
    goods: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 是否展示单选按钮
    showRadio: {
      type: Boolean,
      default: false
    },
    // 是否展示数字选择
    showNum: {
      type: Boolean,
      default: false
    }
  },
  emits: ["radio-change", "num-change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const goodsPrice = common_vendor.computed(() => {
      return props.goods && Number(props.goods.goods_price).toFixed(2);
    });
    const defaultPic = common_vendor.ref("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");
    const radioClickHandler = (e) => {
      emits("radio-change", {
        goods_id: props.goods.goods_id,
        goods_state: !props.goods.goods_state
      });
    };
    const numChangeHandler = (val) => {
      emits("num-change", {
        goods_id: props.goods.goods_id,
        goods_count: +val
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showRadio
      }, __props.showRadio ? {
        b: __props.goods.goods_state,
        c: common_vendor.o(radioClickHandler)
      } : {}, {
        d: __props.goods.goods_small_logo || defaultPic.value,
        e: common_vendor.t(__props.goods.goods_name),
        f: common_vendor.t(common_vendor.unref(goodsPrice)),
        g: __props.showNum
      }, __props.showNum ? {
        h: common_vendor.o(numChangeHandler),
        i: common_vendor.o(($event) => __props.goods.goods_count = $event),
        j: common_vendor.p({
          min: 1,
          modelValue: __props.goods.goods_count
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/components/my-goods/my-goods.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=my-goods.js.map
