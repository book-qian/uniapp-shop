"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-goods",
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
  computed: {
    goodsPrice() {
      return this.goods && Number(this.goods.goods_price).toFixed(2);
    }
  },
  data() {
    return {
      defaultPic: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
    };
  },
  methods: {
    radioClickHandler(e) {
      this.$emit("radio-change", {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state
      });
    },
    numChangeHandler(val) {
      this.$emit("num-change", {
        goods_id: this.goods.goods_id,
        goods_count: +val
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  _easycom_uni_number_box2();
}
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  _easycom_uni_number_box();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showRadio
  }, $props.showRadio ? {
    b: $props.goods.goods_state,
    c: common_vendor.o((...args) => $options.radioClickHandler && $options.radioClickHandler(...args))
  } : {}, {
    d: $props.goods.goods_small_logo || $data.defaultPic,
    e: common_vendor.t($props.goods.goods_name),
    f: common_vendor.t($options.goodsPrice),
    g: $props.showNum
  }, $props.showNum ? {
    h: common_vendor.o($options.numChangeHandler),
    i: common_vendor.o(($event) => $props.goods.goods_count = $event),
    j: common_vendor.p({
      min: 1,
      modelValue: $props.goods.goods_count
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/components/my-goods/my-goods.vue"]]);
wx.createComponent(Component);
