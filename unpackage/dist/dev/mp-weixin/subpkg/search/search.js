"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_tag2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_tag)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const searchHistory = common_vendor.ref([]);
    const kw = common_vendor.ref("");
    const saveHistory = () => {
      const set = new Set(searchHistory.value);
      set.delete(kw.value);
      set.add(kw.value);
      searchHistory.value = Array.from(set);
      common_vendor.index.setStorageSync("kw", JSON.stringify(searchHistory.value));
    };
    const clean = () => {
      searchHistory.value = [];
      common_vendor.index.setStorageSync("kw", "[]");
    };
    const gotoGoodsList = (item) => {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?query=" + item
      });
    };
    const gotoGoodsDetail = ({ goods_id }) => {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods_id
      });
    };
    const searchResult = common_vendor.ref([]);
    const getSearchList = async () => {
      if (kw.value.length === 0) {
        searchResult.value = [];
        return;
      }
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/goods/qsearch", { query: kw.value });
      const { meta, message } = res;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage();
      searchResult.value = message;
      saveHistory();
    };
    const timer = common_vendor.ref(null);
    const input = (value) => {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        kw.value = value;
        getSearchList();
      }, 500);
    };
    const histories = common_vendor.computed(() => [...searchHistory.value].reverse());
    common_vendor.onLoad(() => {
      searchHistory.value = JSON.parse(common_vendor.index.getStorageSync("kw") || "[]");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(input),
        b: common_vendor.p({
          placeholder: "请输入搜索内容",
          cancelButton: "none",
          radius: 100
        }),
        c: kw.value.length !== 0
      }, kw.value.length !== 0 ? {
        d: common_vendor.f(searchResult.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.goods_name),
            b: "046dbb10-1-" + i0,
            c: common_vendor.o(($event) => gotoGoodsDetail(item), i),
            d: i
          };
        }),
        e: common_vendor.p({
          type: "arrowright",
          size: "16"
        })
      } : {
        f: common_vendor.o(clean),
        g: common_vendor.p({
          type: "trash",
          size: "17"
        }),
        h: common_vendor.f(common_vendor.unref(histories), (item, i, i0) => {
          return {
            a: common_vendor.o(($event) => gotoGoodsList(item), i),
            b: i,
            c: "046dbb10-3-" + i0,
            d: common_vendor.p({
              inverted: true,
              text: item
            })
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/subpkg/search/search.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=search.js.map
