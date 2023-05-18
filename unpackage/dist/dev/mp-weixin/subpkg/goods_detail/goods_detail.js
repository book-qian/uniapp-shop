"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
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
    };
  },
  onLoad(option) {
    let goods_id = option.goods_id;
    this.getGoodsInfo(goods_id);
  },
  watch: {
    total: {
      handler(newVal) {
        const findResult = this.options.find((t) => t.text === "购物车");
        if (findResult) {
          findResult.info = newVal;
        }
      },
      immediate: true
    }
  },
  computed: {
    ...common_vendor.mapGetters("m_cart", ["total"])
  },
  methods: {
    ...common_vendor.mapMutations("m_cart", ["addToCart"]),
    // 左侧导航点击
    onClick(e) {
      if (e.content.text === "购物车") {
        common_vendor.index.switchTab({
          url: "/pages/cart/cart"
        });
      }
    },
    // 右侧点击
    buttonClick(e) {
      if (e.content.text === "加入购物车") {
        const { goods_id, goods_name, goods_price, goods_small_logo } = this.goodsInfo;
        let goods = {
          goods_id,
          goods_name,
          goods_price,
          goods_small_logo,
          goods_count: 1,
          goods_state: true
        };
        this.addToCart(goods);
      }
    },
    // 右侧导航点击
    async getGoodsInfo(goods_id) {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/goods/detail", { goods_id });
      const { meta, message } = res;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage();
      message.goods_introduce = message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp,'jpg'/g);
      this.goodsInfo = message;
    },
    preview(i) {
      common_vendor.index.previewImage({
        urls: this.goodsInfo.pics.map((t) => t.pics_big),
        current: i
      });
    }
  }
};
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.goodsInfo.goods_name
  }, $data.goodsInfo.goods_name ? {
    b: common_vendor.f($data.goodsInfo.pics, (item, i, i0) => {
      return {
        a: item.pics_big,
        b: i,
        c: common_vendor.o(($event) => $options.preview(i), i)
      };
    }),
    c: common_vendor.t($data.goodsInfo.goods_price),
    d: common_vendor.t($data.goodsInfo.goods_name),
    e: common_vendor.p({
      type: "star",
      size: "18",
      color: "gray"
    }),
    f: $data.goodsInfo.goods_introduce,
    g: common_vendor.o($options.onClick),
    h: common_vendor.o($options.buttonClick),
    i: common_vendor.p({
      fill: true,
      options: $data.options,
      buttonGroup: $data.buttonGroup
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/subpkg/goods_detail/goods_detail.vue"]]);
wx.createPage(MiniProgramPage);
