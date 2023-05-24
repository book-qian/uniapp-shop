"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my-login",
  setup(__props) {
    const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
    const store = common_vendor.useStore();
    const redirectInfo = common_vendor.computed(() => store.state["m_user"].redirectInfo);
    const loginHandler = (e) => {
      store.commit("m_user/updateUserinfo", e.detail.userInfo);
      getToken(e.detail);
    };
    const getToken = async ({ encryptedData, iv, rawData, signature }) => {
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
      store.commit("m_user/updateToken", TOKEN);
      if (!redirectInfo.value)
        return;
      const { openType = "", from: url } = redirectInfo.value;
      if (redirectInfo.value && openType === "switchTab") {
        common_vendor.index[openType]({
          url,
          complete: () => {
            store.commit("m_user/updateRedirectInfo", null);
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "contact-filled",
          size: "100",
          color: "#afafaf"
        }),
        b: common_vendor.o(loginHandler)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangyongqian/code/uni-shop/components/my-login/my-login.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=my-login.js.map
