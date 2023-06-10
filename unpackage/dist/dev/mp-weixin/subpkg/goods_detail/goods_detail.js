"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
require("../../utils/axios.js");
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
          icon: "fire",
          text: "热度"
        },
        {
          icon: "wallet",
          text: "备忘录",
          info: 0
        }
      ],
      buttonGroup: [
        {
          text: "加入备忘录",
          backgroundColor: "#ff0000",
          color: "#fff"
        },
        {
          text: "作为模板",
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
      if (e.content.text === "备忘录") {
        common_vendor.index.switchTab({
          url: "/pages/cart/cart"
        });
      }
    };
    const buttonClick = (e) => {
      if (e.content.text === "加入备忘录") {
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
    const memorandum_detail = common_vendor.ref([]);
    const getGoodsInfo = async (goods_id) => {
      const { data: res } = await utils_api.ajaxGet("/api/public/v1/goods/detail", { goods_id });
      const { meta, message } = res;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage();
      memorandum_detail.value = message.memorandum_detail;
      goodsDetail.goodsInfo = message;
    };
    common_vendor.onLoad(({ goods_id }) => {
      getGoodsInfo(goods_id);
    });
    const BASE_URL = common_vendor.ref("http://127.0.0.1:8090");
    const preview = (i) => {
      let urls = goodsDetail.goodsInfo.pics.map((t) => {
        return {
          pics_big: `${BASE_URL.value}${t.pics_big}`
        };
      }).map((t) => t.pics_big);
      common_vendor.index.previewImage({
        urls,
        current: i
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return common_vendor.e({
        a: (_a = goodsDetail.goodsInfo) == null ? void 0 : _a.goods_name
      }, ((_b = goodsDetail.goodsInfo) == null ? void 0 : _b.goods_name) ? {
        b: common_vendor.f((_c = goodsDetail.goodsInfo) == null ? void 0 : _c.pics, (item, i, i0) => {
          return {
            a: `${BASE_URL.value}${item.pics_big}`,
            b: i,
            c: common_vendor.o(($event) => preview(i), i)
          };
        }),
        c: common_vendor.p({
          type: "fire",
          size: "17",
          color: "#f2ba4b"
        }),
        d: common_vendor.t((_d = goodsDetail.goodsInfo) == null ? void 0 : _d.goods_number),
        e: common_vendor.t((_e = goodsDetail.goodsInfo) == null ? void 0 : _e.goods_name),
        f: common_vendor.p({
          type: "star",
          size: "18",
          color: "gray"
        }),
        g: common_vendor.f(memorandum_detail.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: `${BASE_URL.value}${item.url}`,
            c: index
          };
        }),
        h: common_vendor.o(onClick),
        i: common_vendor.o(buttonClick),
        j: common_vendor.p({
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
