"use strict";const e=require("../../common/vendor.js");if(!Array){e.resolveComponent("uni-icons")()}Math;const t={__name:"my-userinfo",setup(t){const r=e.useStore(),o=e.computed((()=>r.state.m_user.userinfo)),n=async()=>{const{confirm:t}=await e.index.showModal({title:"提示",content:"确认退出登录吗？"}).catch((e=>e));t&&(r.commit("m_user/updateAddress",{}),r.commit("m_user/updateUserinfo",{}),r.commit("m_user/updateToken",""))};return(t,r)=>({a:e.unref(o).avatarUrl,b:e.t(e.unref(o).nickName),c:e.p({type:"arrowright",size:"15"}),d:e.p({type:"arrowright",size:"15"}),e:e.p({type:"arrowright",size:"15"}),f:e.o(n)})}};wx.createComponent(t);
//# sourceMappingURL=my-userinfo.js.map
