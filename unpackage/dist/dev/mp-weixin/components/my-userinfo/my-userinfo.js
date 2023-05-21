"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-userinfo",
  data() {
    return {};
  },
  computed: {
    ...common_vendor.mapState("m_user", ["userinfo"])
  },
  methods: {
    ...common_vendor.mapMutations("m_user", ["updateAddress", "updateUserinfo", "updateToken"]),
    async logout() {
      const { confirm } = await common_vendor.index.showModal({
        title: "提示",
        content: "确认退出登录吗？"
      }).catch((err) => err);
      if (confirm) {
        this.updateAddress({});
        this.updateUserinfo({});
        this.updateToken("");
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.userinfo.avatarUrl,
    b: common_vendor.t(_ctx.userinfo.nickName),
    c: common_vendor.p({
      type: "arrowright",
      size: "15"
    }),
    d: common_vendor.p({
      type: "arrowright",
      size: "15"
    }),
    e: common_vendor.p({
      type: "arrowright",
      size: "15"
    }),
    f: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/components/my-userinfo/my-userinfo.vue"]]);
wx.createComponent(Component);
