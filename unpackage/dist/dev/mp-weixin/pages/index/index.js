"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    back() {
      common_vendor.index.reLaunch({
        url: "/pages/login/login"
      });
    },
    share() {
      common_vendor.index.reLaunch({
        url: "/pages/share/share"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_nav_bar2 + _component_uni_section)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.back),
    b: common_vendor.o($options.share),
    c: common_vendor.p({
      ["background-color"]: "#1CB1F6",
      color: "white",
      ["left-icon"]: "back",
      ["right-icon"]: "redo",
      title: "欢迎来到班级圈"
    }),
    d: common_vendor.p({
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/liu/Documents/HBuilderProjects/classteam/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
