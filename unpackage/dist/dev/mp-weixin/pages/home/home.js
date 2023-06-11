"use strict";
const common_vendor = require("../../common/vendor.js");
const hook_useTabbarBadge = require("../../hook/useTabbarBadge.js");
const utils_api = require("../../utils/api.js");
const utils_config = require("../../utils/config.js");
require("../../utils/axios.js");
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const swiperList = common_vendor.ref([]);
    const navList = common_vendor.ref([]);
    const floorList = common_vendor.ref([]);
    const getSwiperData = async () => {
      const { data: res } = await utils_api.ajaxGet("/api/public/v1/home/swiperdata");
      const { meta, message } = res;
      if (meta.status !== 200) {
        return common_vendor.index.$showMessage();
      }
      swiperList.value = message;
    };
    const getNavListData = async () => {
      const { data: res } = await utils_api.ajaxGet("/api/public/v1/home/catitems");
      const { meta, message } = res;
      if (meta.status !== 200)
        common_vendor.index.$showMessage();
      navList.value = message;
    };
    const navClickHander = (item) => {
      if (item.name === "分类") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
    };
    const getFloorListData = async () => {
      const { data: res } = await utils_api.ajaxGet("/api/public/v1/home/floorData");
      const { meta, message } = res;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage();
      message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = `/subpkg/goods_list/goods_list?${prod.navigator_url.split("?")[1]}`;
        });
      });
      floorList.value = message;
    };
    const gotoSearch = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    };
    common_vendor.onShow(() => {
      hook_useTabbarBadge.setBarge();
    });
    common_vendor.onLoad(() => {
      getSwiperData();
      getNavListData();
      getFloorListData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(gotoSearch),
        b: common_vendor.f(swiperList.value, (item, i, i0) => {
          return {
            a: `${common_vendor.unref(utils_config.BASE_URL)}${item.image_src}`,
            b: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`,
            c: i
          };
        }),
        c: common_vendor.f(navList.value, (item, i, i0) => {
          return {
            a: `${common_vendor.unref(utils_config.BASE_URL)}${item.image_src}`,
            b: common_vendor.t(item.name),
            c: i,
            d: common_vendor.o(($event) => navClickHander(item), i)
          };
        }),
        d: common_vendor.f(floorList.value, (item, i, i0) => {
          return {
            a: `${common_vendor.unref(utils_config.BASE_URL)}${item.floor_title.image_src}`,
            b: common_vendor.t(item.floor_title.name),
            c: common_vendor.t(item.product_list[0].name),
            d: `${common_vendor.unref(utils_config.BASE_URL)}${item.product_list[0].image_src}`,
            e: item.product_list[0].image_width + "rpx",
            f: `${common_vendor.unref(utils_config.BASE_URL)}${item.product_list[0].url}`,
            g: common_vendor.f(item.product_list, (item2, index, i1) => {
              return common_vendor.e({
                a: index !== 0
              }, index !== 0 ? {
                b: common_vendor.t(item2.name),
                c: item2.image_width + "rpx",
                d: `${common_vendor.unref(utils_config.BASE_URL)}${item2.image_src}`,
                e: item2.url
              } : {}, {
                f: index
              });
            }),
            h: i
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=home.js.map
