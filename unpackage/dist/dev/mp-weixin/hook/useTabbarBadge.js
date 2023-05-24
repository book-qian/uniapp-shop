"use strict";
const common_vendor = require("../common/vendor.js");
function setBarge() {
  const store = common_vendor.useStore();
  const total = common_vendor.computed(() => store.getters["m_cart/total"]);
  common_vendor.index.setTabBarBadge({
    index: 2,
    text: total.value + ""
  });
}
exports.setBarge = setBarge;
//# sourceMappingURL=useTabbarBadge.js.map
