"use strict";const e=require("../common/vendor.js");e.$http.beforeRequest=function(t){e.index.showLoading({title:"数据加载中..."});const{url:n,header:o}=t;n.includes("/my/")&&(t.header={Authorization:store.state.m_user.token})},e.$http.afterRequest=function(){e.index.hideLoading()};
//# sourceMappingURL=axios.js.map
