"use strict";require("./axios.js");const t=require("../common/vendor.js");exports.ajaxGet=function(e,r){return new Promise((async(o,s)=>{o(await t.$http.get("https://www.fxgh.top/memorandumServer"+e,r))}))},exports.fetchPost=function(e,r){return new Promise((async(o,s)=>{o(await t.$http.post("https://api-hmugo-web.itheima.net"+e,r))}))};
//# sourceMappingURL=api.js.map
