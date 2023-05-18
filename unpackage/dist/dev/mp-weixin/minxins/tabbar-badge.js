"use strict";
const common_vendor = require("../common/vendor.js");
const badgeMix = {
  computed: {
    ...common_vendor.mapGetters("m_cart", ["total"])
  },
  onShow() {
    this.setBarge();
  },
  methods: {
    // 动态为tarbar设置数字徽标
    setBarge() {
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: this.total + ""
      });
    }
  }
};
exports.badgeMix = badgeMix;
