"use strict";
const common_vendor = require("../../common/vendor.js");
const hook_useTabbarBadge = require("../../hook/useTabbarBadge.js");
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
const _sfc_main = {
  __name: "cate",
  setup(__props) {
    const cateList = common_vendor.ref([]);
    const cateLevel2 = common_vendor.ref([]);
    const getCateListData = async () => {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/categories");
      const { meta, message } = res;
      if (meta.status !== 200)
        common_vendor.index.$showMessage();
      cateList.value = message;
      cateLevel2.value = message[0].children;
    };
    const active = common_vendor.ref(0);
    const scrollTop = common_vendor.ref(0);
    const activeChange = (i) => {
      active.value = i;
      cateLevel2.value = cateList.value[i].children;
      scrollTop.value = scrollTop.value === 0 ? 1 : 0;
    };
    const gotoGoodsList = ({ cat_id }) => {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?cid=" + cat_id
      });
    };
    const gotoSearch = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    };
    const wh = common_vendor.ref(0);
    common_vendor.onLoad(async () => {
      const { windowHeight } = await common_vendor.index.getSystemInfo();
      wh.value = windowHeight - 50;
      getCateListData();
    });
    common_vendor.onShow(() => {
      hook_useTabbarBadge.setBarge();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(gotoSearch),
        b: common_vendor.f(cateList.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.cat_name),
            b: common_vendor.o(($event) => activeChange(i), i),
            c: common_vendor.n(i === active.value ? "active" : ""),
            d: i
          };
        }),
        c: wh.value + "px",
        d: common_vendor.f(cateLevel2.value, (item2, i2, i0) => {
          return {
            a: common_vendor.t(item2.cat_name),
            b: common_vendor.f(item2.children, (item3, i3, i1) => {
              return {
                a: item3.cat_icon,
                b: common_vendor.t(item3.cat_name),
                c: i3,
                d: common_vendor.o(($event) => gotoGoodsList(item3), i3)
              };
            }),
            c: i2
          };
        }),
        e: scrollTop.value,
        f: wh.value + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/pages/cate/cate.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=cate.js.map
