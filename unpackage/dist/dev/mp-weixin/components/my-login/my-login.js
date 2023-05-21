"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "my-login",
  data() {
    return {};
  },
  computed: {
    ...common_vendor.mapState("m_user", ["redirectInfo"])
  },
  methods: {
    ...common_vendor.mapMutations("m_user", ["updateUserinfo", "updateToken", "updateRedirectInfo"]),
    loginHandler(e) {
      console.log(e);
      this.updateUserinfo(e.detail.userInfo);
      this.getToken(e.detail);
    },
    async getToken({ encryptedData, iv, rawData, signature }) {
      const { errMsg, code } = await common_vendor.index.login();
      if (errMsg !== "login:ok")
        return common_vendor.index.$showMessage("登录失败");
      const query = {
        code,
        encryptedData,
        iv,
        rawData,
        signature
      };
      const { data: loginResult } = await common_vendor.index.$http.post("/api/public/v1/users/wxlogin", query);
      const { meta, message } = loginResult;
      if (meta.status == 200)
        return common_vendor.index.$showMessage("登录失败");
      common_vendor.index.$showMessage("登录成功");
      this.updateToken(
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      );
      const { openType, from: url } = this.redirectInfo;
      if (this.redirectInfo && openType === "switchTab") {
        common_vendor.index[openType]({
          url,
          complete: () => {
            this.updateRedirectInfo(null);
          }
        });
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
    a: common_vendor.p({
      type: "contact-filled",
      size: "100",
      color: "#afafaf"
    }),
    b: common_vendor.o((...args) => $options.loginHandler && $options.loginHandler(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangyongqian/code/uni-shop/components/my-login/my-login.vue"]]);
wx.createComponent(Component);
