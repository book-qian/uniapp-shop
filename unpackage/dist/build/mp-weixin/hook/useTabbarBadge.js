"use strict";const e=require("../common/vendor.js");exports.setBarge=function(){const t=e.useStore(),o=e.computed((()=>t.getters["m_cart/total"]));e.index.setTabBarBadge({index:2,text:o.value+""})};
//# sourceMappingURL=useTabbarBadge.js.map
