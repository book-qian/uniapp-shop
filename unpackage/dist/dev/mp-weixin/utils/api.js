"use strict";
require("./axios.js");
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://127.0.0.1:8090";
function ajaxGet(url) {
  return new Promise(async (resolve, reject) => {
    const res = await common_vendor.$http.get(BASE_URL + url);
    resolve(res);
  });
}
exports.ajaxGet = ajaxGet;
//# sourceMappingURL=api.js.map
