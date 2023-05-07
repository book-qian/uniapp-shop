"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      wh: 0,
      //当前屏幕可使用高度
      cateList: [],
      active: 0,
      cateLevel2: [],
      //二级分类
      scrollTop: 0
    };
  },
  async onLoad() {
    const { windowHeight } = await common_vendor.index.getSystemInfo();
    this.wh = windowHeight - 50;
    this.getCateListData();
  },
  methods: {
    // 获取分类列表的数据
    async getCateListData() {
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/categories");
      const { meta, message } = res;
      if (meta.status !== 200)
        common_vendor.index.$showMessage();
      console.log(message);
      this.cateList = message;
      this.cateLevel2 = message[0].children;
    },
    activeChange(i) {
      this.active = i;
      this.cateLevel2 = this.cateList[i].children;
      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
    },
    gotoGoodsList({ cat_id }) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?c_id=" + cat_id
      });
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
    b: common_vendor.f($data.cateList, (item, i, i0) => {
      return {
        a: common_vendor.t(item.cat_name),
        b: common_vendor.o(($event) => $options.activeChange(i), i),
        c: common_vendor.n(i === $data.active ? "active" : ""),
        d: i
      };
    }),
    c: $data.wh + "px",
    d: common_vendor.f($data.cateLevel2, (item2, i2, i0) => {
      return {
        a: common_vendor.t(item2.cat_name),
        b: common_vendor.f(item2.children, (item3, i3, i1) => {
          return {
            a: item3.cat_icon,
            b: common_vendor.t(item3.cat_name),
            c: i3,
            d: common_vendor.o(($event) => $options.gotoGoodsList(item3), i3)
          };
        }),
        c: i2
      };
    }),
    e: $data.scrollTop,
    f: $data.wh + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/pages/cate/cate.vue"]]);
wx.createPage(MiniProgramPage);
