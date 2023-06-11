"use strict";
require("./axios.js");
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://www.fxgh.top/memorandumServer";
function ajaxGet(url, params) {
  return new Promise(async (resolve, reject) => {
    const res = await common_vendor.$http.get(BASE_URL + url, params);
    resolve(res);
  });
}
const BASE_API = "https://api-hmugo-web.itheima.net";
function fetchPost(url, params) {
  return new Promise(async (resolve, reject) => {
    const res = await common_vendor.$http.post(BASE_API + url, params);
    resolve(res);
  });
}
exports.ajaxGet = ajaxGet;
exports.fetchPost = fetchPost;
//# sourceMappingURL=api.js.map
