"use strict";const e=require("../../../../common/vendor.js"),a=require("./i18n/index.js"),{t:t}=e.initVueI18n(a.messages),c={name:"UniSearchBar",emits:["input","update:modelValue","clear","cancel","confirm","blur","focus"],props:{placeholder:{type:String,default:""},radius:{type:[Number,String],default:5},clearButton:{type:String,default:"auto"},cancelButton:{type:String,default:"auto"},cancelText:{type:String,default:"取消"},bgColor:{type:String,default:"#F8F8F8"},maxlength:{type:[Number,String],default:100},value:{type:[Number,String],default:""},modelValue:{type:[Number,String],default:""},focus:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},data:()=>({show:!0,showSync:!0,searchVal:""}),computed:{cancelTextI18n(){return this.cancelText||t("uni-search-bar.cancel")},placeholderText(){return this.placeholder||t("uni-search-bar.placeholder")}},watch:{modelValue:{immediate:!0,handler(e){this.searchVal=e,e&&(this.show=!0)}},focus:{immediate:!0,handler(e){if(e){if(this.readonly)return;this.show=!0,this.$nextTick((()=>{this.showSync=!0}))}}},searchVal(e,a){this.$emit("input",e),this.$emit("update:modelValue",e)}},methods:{searchClick(){this.readonly||this.show||(this.show=!0,this.$nextTick((()=>{this.showSync=!0})))},clear(){this.$emit("clear",{value:this.searchVal}),this.searchVal=""},cancel(){this.readonly||(this.$emit("cancel",{value:this.searchVal}),this.searchVal="",this.show=!1,this.showSync=!1,e.index.hideKeyboard())},confirm(){e.index.hideKeyboard(),this.$emit("confirm",{value:this.searchVal})},blur(){e.index.hideKeyboard(),this.$emit("blur",{value:this.searchVal})},emitFocus(e){this.$emit("focus",e.detail)}}};if(!Array){e.resolveComponent("uni-icons")()}Math;const l=e._export_sfc(c,[["render",function(a,t,c,l,r,o){return e.e({a:e.p({color:"#c0c4cc",size:"18",type:"search"}),b:r.show||r.searchVal},r.show||r.searchVal?{c:r.showSync,d:c.readonly,e:o.placeholderText,f:c.maxlength,g:e.o(((...e)=>o.confirm&&o.confirm(...e))),h:e.o(((...e)=>o.blur&&o.blur(...e))),i:e.o(((...e)=>o.emitFocus&&o.emitFocus(...e))),j:r.searchVal,k:e.o((e=>r.searchVal=e.detail.value))}:{l:e.t(c.placeholder)},{m:r.show&&("always"===c.clearButton||"auto"===c.clearButton&&""!==r.searchVal)&&!c.readonly},r.show&&("always"===c.clearButton||"auto"===c.clearButton&&""!==r.searchVal)&&!c.readonly?{n:e.p({color:"#c0c4cc",size:"20",type:"clear"}),o:e.o(((...e)=>o.clear&&o.clear(...e)))}:{},{p:c.radius+"px",q:c.bgColor,r:e.o(((...e)=>o.searchClick&&o.searchClick(...e))),s:"always"===c.cancelButton||r.show&&"auto"===c.cancelButton},"always"===c.cancelButton||r.show&&"auto"===c.cancelButton?{t:e.t(o.cancelTextI18n),v:e.o(((...e)=>o.cancel&&o.cancel(...e)))}:{})}]]);wx.createComponent(l);
//# sourceMappingURL=uni-search-bar.js.map
