"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 防抖处理
      timer: null,
      kw: "",
      searchResult: [],
      // 搜索历史
      searchHistory: []
    };
  },
  computed: {
    histories() {
      return [...this.searchHistory].reverse();
    }
  },
  onLoad() {
    this.searchHistory = JSON.parse(common_vendor.index.getStorageSync("kw") || "[]");
  },
  methods: {
    input(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.kw = value;
        this.getSearchList();
      }, 500);
    },
    async getSearchList() {
      if (this.kw.length === 0) {
        this.searchResult = [];
        return;
      }
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/goods/qsearch", { query: this.kw });
      const { meta, message } = res;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage();
      this.searchResult = message;
      this.saveHistory();
      console.log(this.searchResult);
    },
    gotoGoodsDetail({ goods_id }) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods_id
      });
    },
    saveHistory() {
      const set = new Set(this.searchHistory);
      set.delete(this.kw);
      set.add(this.kw);
      this.searchHistory = Array.from(set);
      common_vendor.index.setStorageSync("kw", JSON.stringify(this.searchHistory));
    },
    clean() {
      this.searchHistory = [];
      common_vendor.index.setStorageSync("kw", "[]");
    },
    gotoGoodsList(item) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?query=" + item
      });
    }
  }
};
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.input),
    b: common_vendor.p({
      placeholder: "请输入搜索内容",
      cancelButton: "none",
      radius: 100
    }),
    c: $data.kw.length !== 0
  }, $data.kw.length !== 0 ? {
    d: common_vendor.f($data.searchResult, (item, i, i0) => {
      return {
        a: common_vendor.t(item.goods_name),
        b: "046dbb10-1-" + i0,
        c: common_vendor.o(($event) => $options.gotoGoodsDetail(item), i),
        d: i
      };
    }),
    e: common_vendor.p({
      type: "arrowright",
      size: "16"
    })
  } : {
    f: common_vendor.o($options.clean),
    g: common_vendor.p({
      type: "trash",
      size: "17"
    }),
    h: common_vendor.f($options.histories, (item, i, i0) => {
      return {
        a: common_vendor.o(($event) => $options.gotoGoodsList(item), i),
        b: i,
        c: "046dbb10-3-" + i0,
        d: common_vendor.p({
          inverted: true,
          text: item
        })
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/subpkg/search/search.vue"]]);
wx.createPage(MiniProgramPage);
