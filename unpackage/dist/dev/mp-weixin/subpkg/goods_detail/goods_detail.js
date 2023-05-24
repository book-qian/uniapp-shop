"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  (_easycom_uni_icons2 + _easycom_uni_goods_nav2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_goods_nav)();
}
const _sfc_main = {
  __name: "goods_detail",
  setup(__props) {
    const store = common_vendor.useStore();
    const goodsDetail = common_vendor.reactive({
      goodsInfo: {},
      options: [
        {
          icon: "shop",
          text: "店铺"
        },
        {
          icon: "cart",
          text: "购物车",
          info: 0
        }
      ],
      buttonGroup: [
        {
          text: "加入购物车",
          backgroundColor: "#ff0000",
          color: "#fff"
        },
        {
          text: "立即购买",
          backgroundColor: "#ffa200",
          color: "#fff"
        }
      ]
    });
    const total = common_vendor.computed(() => store.getters["m_cart/total"]);
    common_vendor.watch(
      () => total.value,
      (newVal) => {
        const findResult = goodsDetail.options.find((t) => t.text === "购物车");
        if (findResult) {
          findResult.info = newVal;
        }
      },
      { immediate: true }
    );
    const onClick = (e) => {
      if (e.content.text === "购物车") {
        common_vendor.index.switchTab({
          url: "/pages/cart/cart"
        });
      }
    };
    const buttonClick = (e) => {
      if (e.content.text === "加入购物车") {
        const { goods_id, goods_name, goods_price, goods_small_logo } = goodsDetail.goodsInfo;
        let goods = {
          goods_id,
          goods_name,
          goods_price,
          goods_small_logo,
          goods_count: 1,
          goods_state: true
        };
        store.commit("m_cart/addToCart", goods);
      }
    };
    const getGoodsInfo = async (goods_id) => {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/goods/detail", { goods_id });
      const { meta, message } = res;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage();
      message.goods_introduce = message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp,'jpg'/g);
      goodsDetail.goodsInfo = message;
    };
    common_vendor.onLoad(({ goods_id }) => {
      getGoodsInfo(goods_id);
    });
    const preview = (i) => {
      common_vendor.index.previewImage({
        urls: goodsDetail.goodsInfo.pics.map((t) => t.pics_big),
        current: i
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: (_a = goodsDetail.goodsInfo) == null ? void 0 : _a.goods_name
      }, ((_b = goodsDetail.goodsInfo) == null ? void 0 : _b.goods_name) ? {
        b: common_vendor.f((_c = goodsDetail.goodsInfo) == null ? void 0 : _c.pics, (item, i, i0) => {
          return {
            a: item.pics_big,
            b: i,
            c: common_vendor.o(($event) => preview(i), i)
          };
        }),
        c: common_vendor.t((_d = goodsDetail.goodsInfo) == null ? void 0 : _d.goods_price),
        d: common_vendor.t((_e = goodsDetail.goodsInfo) == null ? void 0 : _e.goods_name),
        e: common_vendor.p({
          type: "star",
          size: "18",
          color: "gray"
        }),
        f: (_f = goodsDetail.goodsInfo) == null ? void 0 : _f.goods_introduce,
        g: common_vendor.o(onClick),
        h: common_vendor.o(buttonClick),
        i: common_vendor.p({
          fill: true,
          options: goodsDetail.options,
          buttonGroup: goodsDetail.buttonGroup
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/subpkg/goods_detail/goods_detail.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=goods_detail.js.map
