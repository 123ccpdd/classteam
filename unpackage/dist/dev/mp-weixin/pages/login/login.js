"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "欢迎回到班级！",
      //填写logo或者app名称，也可以用：欢迎回来，看您需求
      second: 60,
      //默认60秒
      showText: true,
      //判断短信是否发送
      phone: "",
      //手机号码
      yzm: ""
      //验证码
    };
  },
  onLoad() {
  },
  methods: {
    //当前登录按钮操作
    login() {
      common_vendor.index.showToast({ title: "登录成功！", icon: "none" });
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    },
    //获取短信验证码
    getCode() {
      var that = this;
      var interval = setInterval(() => {
        that.showText = false;
        var times = that.second - 1;
        that.second = times;
        console.log(times);
      }, 1e3);
      setTimeout(() => {
        clearInterval(interval);
        that.second = 60;
        that.showText = true;
      }, 6e4);
      common_vendor.index.request({
        //......//此处省略
        success: function(res) {
          that.showText = false;
        }
      });
    },
    //等三方微信登录
    wxLogin() {
      common_vendor.index.showToast({ title: "微信登录", icon: "none" });
    },
    //第三方支付宝登录
    zfbLogin() {
      common_vendor.index.showToast({ title: "qq登录", icon: "none" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.title),
    b: $data.phone,
    c: common_vendor.o(($event) => $data.phone = $event.detail.value),
    d: $data.yzm,
    e: common_vendor.o(($event) => $data.yzm = $event.detail.value),
    f: $data.showText
  }, $data.showText ? {
    g: common_vendor.o(($event) => $options.getCode())
  } : {
    h: common_vendor.t($data.second)
  }, {
    i: common_vendor.o(($event) => $options.login()),
    j: common_vendor.o(($event) => $options.wxLogin()),
    k: common_vendor.o(($event) => $options.zfbLogin())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/liu/Documents/HBuilderProjects/classteam/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
