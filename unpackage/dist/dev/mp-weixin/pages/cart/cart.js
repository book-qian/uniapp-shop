"use strict";
const common_vendor = require("../../common/vendor.js");
const hook_useTabbarBadge = require("../../hook/useTabbarBadge.js");
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
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    const store = common_vendor.useStore();
    const cart = common_vendor.computed(() => store.state["m_cart"].cart);
    const options = common_vendor.ref([
      {
        text: "删除",
        style: {
          backgroundColor: "#C00000"
        }
      }
    ]);
    const radioChangeHandler = (e) => store.commit("m_cart/updateGoodsState", e);
    const numChangeHandler = (e) => store.commit("m_cart/updateGoodsCount", e);
    const total = common_vendor.computed(() => store.getters["m_cart/total"]);
    const swiperItemClickHandler = ({ goods_id }) => {
      store.commit("m_cart/deleteCartGoods", goods_id);
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: total.value + ""
      });
    };
    common_vendor.onShow(() => {
      hook_useTabbarBadge.setBarge();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(cart).length > 0
      }, common_vendor.unref(cart).length > 0 ? {
        b: common_vendor.p({
          type: "shop",
          size: "18"
        }),
        c: common_vendor.f(common_vendor.unref(cart), (goods, i, i0) => {
          return {
            a: common_vendor.o(radioChangeHandler, i),
            b: common_vendor.o(numChangeHandler, i),
            c: "2cb99d08-4-" + i0 + "," + ("2cb99d08-3-" + i0),
            d: common_vendor.p({
              goods,
              ["show-radio"]: true,
              ["show-num"]: true
            }),
            e: common_vendor.o(($event) => swiperItemClickHandler(goods), i),
            f: "2cb99d08-3-" + i0 + ",2cb99d08-2",
            g: i
          };
        }),
        d: common_vendor.p({
          ["right-options"]: options.value
        })
      } : {
        e: common_vendor.p({
          type: "cart",
          size: "40",
          color: "#c00000"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=cart.js.map
