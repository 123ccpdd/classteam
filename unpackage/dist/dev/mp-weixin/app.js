"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/cart/cart.js";
  "./pages/share/share.js";
  "./pages/myself/myself.js";
  "./pages/test/test.js";
}
const _sfc_main = {
  onLaunch: function(options) {
    console.log("App Launch");
    console.log("应用启动路径：", options.path);
  },
  onShow: function(options) {
    console.log("App Show");
    console.log("应用启动路径：", options.path);
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/liu/Documents/HBuilderProjects/classteam/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
