"use strict";
const common_vendor = require("../../common/vendor.js");
const minxins_tabbarBadge = require("../../minxins/tabbar-badge.js");
const _sfc_main = {
  mixins: [minxins_tabbarBadge.badgeMix],
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    };
  },
  onLoad() {
    this.getSwiperData();
    this.getNavListData();
    this.getFloorListData();
  },
  methods: {
    async getSwiperData() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/home/swiperdata");
      const { meta, message } = res;
      if (meta.status !== 200) {
        return common_vendor.index.$showMessage();
      }
      this.swiperList = message;
    },
    async getNavListData() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/home/catitems");
      const { meta, message } = res;
      if (meta.status !== 200)
        common_vendor.index.$showMessage();
      this.navList = message;
    },
    navClickHander(item) {
      if (item.name === "分类") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    },
    async getFloorListData() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/home/floorData");
      const { meta, message } = res;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage();
      message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = `/subpkg/goods_list/goods_list?${prod.navigator_url.split("?")[1]}`;
        });
      });
      this.floorList = message;
    },
    gotoSearch() {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.gotoSearch),
    b: common_vendor.f($data.swiperList, (item, i, i0) => {
      return {
        a: item.image_src,
        b: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`,
        c: i
      };
    }),
    c: common_vendor.f($data.navList, (item, i, i0) => {
      return {
        a: item.image_src,
        b: i,
        c: common_vendor.o(($event) => $options.navClickHander(item), i)
      };
    }),
    d: common_vendor.f($data.floorList, (item, i, i0) => {
      return {
        a: item.floor_title.image_src,
        b: item.product_list[0].image_src,
        c: item.product_list[0].image_width + "rpx",
        d: item.product_list[0].url,
        e: common_vendor.f(item.product_list, (item2, index, i1) => {
          return common_vendor.e({
            a: index !== 0
          }, index !== 0 ? {
            b: item2.image_src,
            c: item2.image_width + "rpx",
            d: item2.url
          } : {}, {
            e: index
          });
        }),
        f: i
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
