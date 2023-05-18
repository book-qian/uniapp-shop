"use strict";
const common_vendor = require("../../common/vendor.js");
const minxins_tabbarBadge = require("../../minxins/tabbar-badge.js");
const _sfc_main = {
  mixins: [minxins_tabbarBadge.badgeMix],
  computed: {
    ...common_vendor.mapState("m_cart", ["cart"])
  },
  data() {
    return {
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#C00000"
          }
        }
      ]
    };
  },
  methods: {
    ...common_vendor.mapMutations("m_cart", ["updateGoodsState", "updateGoodsCount", "deleteCartGoods"]),
    radioChangeHandler(e) {
      this.updateGoodsState(e);
    },
    numChangeHandler(e) {
      this.updateGoodsCount(e);
    },
    swiperItemClickHandler({ goods_id }) {
      this.deleteCartGoods(goods_id);
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: this.total + ""
      });
    }
  }
};
if (!Array) {
  const _easycom_my_address2 = common_vendor.resolveComponent("my-address");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_my_settle2 = common_vendor.resolveComponent("my-settle");
  (_easycom_my_address2 + _easycom_uni_icons2 + _easycom_my_goods2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_my_settle2)();
}
const _easycom_my_address = () => "../../components/my-address/my-address.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_my_settle = () => "../../components/my-settle/my-settle.js";
if (!Math) {
  (_easycom_my_address + _easycom_uni_icons + _easycom_my_goods + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_my_settle)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.cart.length > 0
  }, _ctx.cart.length > 0 ? {
    b: common_vendor.p({
      type: "shop",
      size: "18"
    }),
    c: common_vendor.f(_ctx.cart, (goods, i, i0) => {
      return {
        a: common_vendor.o($options.radioChangeHandler, i),
        b: common_vendor.o($options.numChangeHandler, i),
        c: "2cb99d08-4-" + i0 + "," + ("2cb99d08-3-" + i0),
        d: common_vendor.p({
          goods,
          ["show-radio"]: true,
          ["show-num"]: true
        }),
        e: common_vendor.o(($event) => $options.swiperItemClickHandler(goods), i),
        f: "2cb99d08-3-" + i0 + ",2cb99d08-2",
        g: i
      };
    }),
    d: common_vendor.p({
      ["right-options"]: $data.options
    })
  } : {
    e: common_vendor.p({
      type: "cart",
      size: "40",
      color: "#c00000"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
