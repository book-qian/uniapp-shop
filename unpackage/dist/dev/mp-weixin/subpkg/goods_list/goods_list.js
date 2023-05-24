"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  _easycom_my_goods2();
}
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
if (!Math) {
  _easycom_my_goods();
}
const _sfc_main = {
  __name: "goods_list",
  setup(__props) {
    const queryObj = common_vendor.reactive({
      query: "",
      cid: "",
      pagenum: 1,
      pagesize: 10
    });
    const isload = common_vendor.ref(false);
    const total = common_vendor.ref(0);
    const goodsList = common_vendor.ref([]);
    const getGoodsList = async (cb) => {
      isload.value = true;
      const { data: res } = await common_vendor.index.$http.get("/api/public/v1/goods/search", queryObj);
      isload.value = false;
      cb && cb();
      const { meta, message } = res;
      if (meta.status !== 200)
        return common_vendor.index.$showMessage();
      total.value = message.total;
      goodsList.value = [...goodsList.value, ...message.goods];
    };
    const gotoGoodsDetail = ({ goods_id }) => {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods_id
      });
    };
    common_vendor.onReachBottom(() => {
      if (queryObj.pagenum * queryObj.pagesize >= total.value)
        return common_vendor.index.$showMessage("数据加载完毕");
      if (isload.value)
        retuen;
      queryObj.pagenum++;
      getGoodsList();
    });
    common_vendor.onPullDownRefresh(() => {
      queryObj.pagenum = 1;
      total.value = 0;
      goodsList.value = [];
      getGoodsList(() => common_vendor.index.stopPullDownRefresh());
    });
    common_vendor.onLoad(({ query = "", cid = "" }) => {
      queryObj.query = query;
      queryObj.cid = cid;
      getGoodsList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(goodsList.value, (goods, i, i0) => {
          return {
            a: "274c8898-0-" + i0,
            b: common_vendor.p({
              goods
            }),
            c: i,
            d: common_vendor.o(($event) => gotoGoodsDetail(goods), i)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/subpkg/goods_list/goods_list.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=goods_list.js.map
