"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-settle",
  computed: {
    ...common_vendor.mapGetters("m_cart", ["checkedCount", "allCount", "checkedGoodsAmount"]),
    ...common_vendor.mapGetters("m_user", ["addstr"]),
    ...common_vendor.mapState("m_user", ["token"]),
    ...common_vendor.mapState("m_cart", ["cart"]),
    isFullChecked() {
      return this.allCount === this.checkedCount;
    }
  },
  data() {
    return {
      seconds: 3,
      //倒计时的秒数
      timer: null
      //定时器id
    };
  },
  methods: {
    ...common_vendor.mapMutations("m_cart", ["updateAllGoodsState"]),
    ...common_vendor.mapMutations("m_user", ["updateRedirectInfo"]),
    changeState() {
      this.updateAllGoodsState(!this.isFullChecked);
    },
    // 用户结算
    settlement() {
      if (!this.checkedCount)
        return common_vendor.index.$showMessage("请先勾选商品");
      if (!this.addstr)
        return common_vendor.index.$showMessage("请先选择地址");
      if (!this.token)
        return this.delayNavigation();
      this.payOrder();
    },
    async payOrder() {
      const goods = this.cart.filter((t) => t.goods_state).map((s) => {
        return {
          goods_id: s.goods_id,
          goods_number: s.goods_count,
          goods_price: s.goods_price
        };
      });
      const orderInfo = {
        // order_price: this.checkedGoodsAmount
        order_price: 0.01,
        consignee_addr: this.addstr,
        goods
      };
      const { data } = await common_vendor.index.$http.post("/api/public/v1/my/orders/create", orderInfo);
      const { meta, message } = data;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage("创建订单失败");
      const orderNum = message.order_number;
      const { data: prepayment } = await common_vendor.index.$http.post("/api/public/v1/my/orders/req_unifiedorder", orderNum);
      const { meta: prepaymentMeta, message: prepaymentMessage } = prepayment;
      if ((prepaymentMeta == null ? void 0 : prepaymentMeta.status) !== 200)
        return common_vendor.index.$showMessage("创建订单失败");
      const payInfo = prepaymentMessage.pay;
      common_vendor.index.requestPayment({
        ...payInfo,
        success: async (res) => {
          const { data: res3 } = await common_vendor.index.$http.post("/api/public/v1/my/orders/chkOrder", { order_number: orderNum });
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
    },
    // 展示倒计时的信息
    showTips(n) {
      common_vendor.index.showToast({
        title: `请登录后再结算，${n}秒之后将跳转登录页面`,
        icon: "none",
        mask: true,
        // 添加遮罩层，防止点击穿透
        duration: 1500
      });
    },
    // 延迟跳转到我的页面
    delayNavigation() {
      this.seconds = 3;
      this.showTips(this.seconds);
      this.timer = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) {
          clearInterval(this.timer);
          common_vendor.index.switchTab({
            url: "/pages/my/my",
            success: () => {
              this.updateRedirectInfo({
                openType: "switchTab",
                from: "/pages/cart/cart"
              });
            }
          });
          return;
        }
        this.showTips(this.seconds);
      }, 1e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.isFullChecked,
    b: common_vendor.o((...args) => $options.changeState && $options.changeState(...args)),
    c: common_vendor.t(_ctx.checkedGoodsAmount),
    d: common_vendor.t(_ctx.checkedCount),
    e: common_vendor.o((...args) => $options.settlement && $options.settlement(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/components/my-settle/my-settle.vue"]]);
wx.createComponent(Component);
