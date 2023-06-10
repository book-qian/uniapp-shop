"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
require("../../utils/axios.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my-settle",
  setup(__props) {
    const store = common_vendor.useStore();
    const allCount = common_vendor.computed(() => store.getters["m_cart/allCount"]);
    const checkedCount = common_vendor.computed(() => store.getters["m_cart/checkedCount"]);
    const isFullChecked = common_vendor.computed(() => allCount.value === checkedCount.value);
    const changeState = () => store.commit("m_cart/updateAllGoodsState", !isFullChecked.value);
    const token = common_vendor.computed(() => store.state["m_user"].token);
    const settlement = () => {
      if (!checkedCount.value)
        return common_vendor.index.$showMessage("请先勾选备忘录");
      if (!token.value)
        return delayNavigation();
      payOrder();
    };
    const seconds = common_vendor.ref(3);
    const timer = common_vendor.ref(null);
    const delayNavigation = () => {
      showTips(seconds.value);
      timer.value = setInterval(() => {
        seconds.value--;
        if (seconds.value <= 0) {
          clearInterval(timer.value);
          common_vendor.index.switchTab({
            url: "/pages/my/my",
            success: () => {
              store.commit("m_user/updateRedirectInfo", {
                openType: "switchTab",
                from: "/pages/cart/cart"
              });
            }
          });
          return;
        }
        showTips(seconds.value);
      }, 1e3);
    };
    const showTips = (n) => {
      common_vendor.index.showToast({
        title: `请登录后再入库，${n}秒之后将跳转登录页面`,
        icon: "none",
        mask: true,
        // 添加遮罩层，防止点击穿透
        duration: 1500
      });
    };
    const checkedGoodsAmount = common_vendor.computed(() => store.getters["m_cart/checkedGoodsAmount"]);
    const payOrder = async () => {
      const cartResult = common_vendor.computed(() => store.state["m_cart"].cart);
      const goods = cartResult.value.filter((t) => t.goods_state).map((s) => {
        return {
          goods_id: s.goods_id,
          goods_number: s.goods_count,
          goods_price: s.goods_price
        };
      });
      const orderInfo = {
        // order_price: checkedGoodsAmount
        order_price: "0.01",
        consignee_addr: "",
        // consignee_addr: addstr.value,
        goods
      };
      const { data } = await utils_api.fetchPost("/api/public/v1/my/orders/create", orderInfo);
      const { meta, message } = data;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage("操作失败");
      const orderNum = message.order_number;
      const { data: prepayment } = await utils_api.fetchPost("/api/public/v1/my/orders/req_unifiedorder", orderNum);
      const { meta: prepaymentMeta, message: prepaymentMessage } = prepayment;
      if ((prepaymentMeta == null ? void 0 : prepaymentMeta.status) !== 200)
        return common_vendor.index.$showMessage("操作失败");
      const payInfo = prepaymentMessage.pay;
      common_vendor.index.requestPayment({
        ...payInfo,
        success: async (res) => {
          const { data: res3 } = await utils_api.fetchPost("/api/public/v1/my/orders/chkOrder", { order_number: orderNum });
          if (res3.meta.status !== 200)
            return common_vendor.index.$showMessage("订单未支付！");
          common_vendor.index.showToast({
            title: "支付完成！",
            icon: "success"
          });
        },
        fail: (err) => {
          return common_vendor.index.$showMessage("订单未支付！");
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(isFullChecked),
        b: common_vendor.o(changeState),
        c: common_vendor.p({
          type: "fire",
          size: "17",
          color: "#f2ba4b"
        }),
        d: common_vendor.t(common_vendor.unref(checkedGoodsAmount)),
        e: common_vendor.t(common_vendor.unref(checkedCount)),
        f: common_vendor.o(settlement)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/components/my-settle/my-settle.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=my-settle.js.map
