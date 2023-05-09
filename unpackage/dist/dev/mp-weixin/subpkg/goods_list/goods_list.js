"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      queryObj: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      goodsList: [],
      isload: false
      // 节流阀
    };
  },
  onLoad({ query = "", cid = "" }) {
    this.queryObj.query = query;
    this.queryObj.cid = cid;
    this.getGoodsList();
  },
  methods: {
    async getGoodsList(cb) {
      this.isload = true;
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/goods/search", this.queryObj);
      this.isload = false;
      cb && cb();
      const { meta, message } = res;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage();
      this.total = message.total;
      this.goodsList = [...this.goodsList, ...message.goods];
    },
    gotoGoodsDetail({ goods_id }) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods_id
      });
    }
  },
  // 触底事件/上拉加载
  onReachBottom() {
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
      return common_vendor.index.$showMessage("数据加载完毕");
    if (this.isload)
      retuen;
    this.queryObj.pagenum++;
    this.getGoodsList();
  },
  //下拉刷新
  onPullDownRefresh() {
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.goodsList = [];
    this.getGoodsList(() => common_vendor.index.stopPullDownRefresh());
  }
};
if (!Array) {
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  _easycom_my_goods2();
}
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
if (!Math) {
  _easycom_my_goods();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.goodsList, (goods, i, i0) => {
      return {
        a: "274c8898-0-" + i0,
        b: common_vendor.p({
          goods
        }),
        c: i,
        d: common_vendor.o(($event) => $options.gotoGoodsDetail(goods), i)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/subpkg/goods_list/goods_list.vue"]]);
wx.createPage(MiniProgramPage);
