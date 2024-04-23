"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 默认输入框获得焦点
      inputFocus: true,
      form: {
        content: "",
        address: "",
        imageList: [],
        video: ""
      }
    };
  },
  methods: {
    back() {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    },
    // 选择媒体类型
    selectType() {
      let that2 = this;
      let itemL = that2.form.imageList.length != 0 ? !that2.form.imageList.video ? ["拍照", "从相册选择照片"] : "" : ["拍照", "从相册选择照片", "从相册选择视频"];
      common_vendor.index.showActionSheet({
        itemList: itemL,
        success: function(res) {
          if (res.tapIndex == 0) {
            common_vendor.index.chooseImage({
              sourceType: ["camera"],
              // 拍照选择
              success: function(res2) {
                that2.form.imageList.push(res2.tempFilePaths);
              }
            });
          }
          if (res.tapIndex == 1) {
            common_vendor.index.chooseImage({
              count: 9 - that2.form.imageList.length,
              sourceType: ["album"],
              //从相册选择
              success: function(res2) {
                res2.tempFilePaths.forEach((path) => {
                  that2.form.imageList.push(path);
                });
              }
            });
          }
          if (res.tapIndex == 2) {
            common_vendor.index.chooseVideo({
              sourceType: ["album"],
              // 从相册选择视频
              success: function(res2) {
                if (res2.size > 20971520) {
                  common_vendor.index.showToast({
                    title: "视频文件过大",
                    duration: 2e3
                  });
                  return;
                }
                that2.form.video = true;
                that2.form.imageList.push(res2.tempFilePath);
              }
            });
          }
        }
      });
    },
    // 图片状态选择
    imgTypeSelect(item2) {
      let that2 = this;
      common_vendor.index.showActionSheet({
        itemList: ["预览", "删除"],
        success: function(res) {
          if (res.tapIndex == 0) {
            common_vendor.index.previewImage({
              current: item2,
              urls: that2.form.imageList
            });
          }
          if (res.tapIndex == 1) {
            let index = that2.form.imageList.findIndex((url) => url === item2);
            if (index !== -1) {
              that2.form.imageList.splice(index, 1);
            }
          }
        }
      });
    },
    // 视频状态选择
    videoTypeSelect() {
      common_vendor.index.showActionSheet({
        itemList: ["删除"],
        success: function(res) {
          if (res.tapIndex == 0) {
            let index = that.form.imageList.findIndex((url) => url === item);
            if (index !== -1) {
              that.form.imageList.splice(index, 1);
            }
          }
        }
      });
    },
    // 文字内容
    inputBlur(event) {
      this.inputCursor = event.detail.cursor;
      this.inputFocus = false;
    },
    // 位置选择
    chooseLocation() {
      let that2 = this;
      common_vendor.index.chooseLocation({
        success: function(res) {
          that2.form.address = res.name;
        }
      });
    },
    // 发布
    clickCreate() {
      console.log(this.form);
      if (!this.form.content) {
        common_vendor.index.showToast({
          title: "请输入内容噢",
          icon: "error"
        });
        return;
      }
      this.$request.post("/api/article/save", {
        "type": 1,
        "content": this.form.content
      }).then((res) => {
        if (res.message == "保存成功") {
          common_vendor.index.showToast({
            title: "发布成功",
            duration: 1500,
            mask: true
          });
          setTimeout(() => {
            common_vendor.index.redirectTo({
              url: "/pages/community/community"
            });
          }, 1500);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _component_uni_section = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  (_easycom_uni_nav_bar2 + _component_uni_section + _easycom_uni_icons2 + _component_u_icon)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.back),
    b: common_vendor.p({
      ["background-color"]: "#1CB1F6",
      color: "white",
      ["left-icon"]: "back",
      title: "分享这一刻"
    }),
    c: common_vendor.p({
      type: "line"
    }),
    d: common_vendor.o((...args) => $options.inputBlur && $options.inputBlur(...args)),
    e: $data.inputFocus,
    f: $data.form.content,
    g: common_vendor.o(($event) => $data.form.content = $event.detail.value),
    h: common_vendor.f($data.form.imageList, (item2, index, i0) => {
      return common_vendor.e(!$data.form.video ? {
        a: item2,
        b: common_vendor.o(($event) => $options.imgTypeSelect(item2), index)
      } : {
        c: item2,
        d: common_vendor.o(($event) => $options.videoTypeSelect(item2), index)
      }, {
        e: index
      });
    }),
    i: !$data.form.video,
    j: $data.form.imageList.length < 9 && !$data.form.video
  }, $data.form.imageList.length < 9 && !$data.form.video ? {
    k: common_vendor.p({
      type: "camera-filled",
      size: "27",
      color: "#D3D4D6"
    }),
    l: common_vendor.o((...args) => $options.selectType && $options.selectType(...args))
  } : {}, {
    m: common_vendor.p({
      name: "map",
      size: "30rpx"
    }),
    n: common_vendor.t($data.form.address || "开启定位"),
    o: common_vendor.o((...args) => $options.chooseLocation && $options.chooseLocation(...args)),
    p: common_vendor.o((...args) => $options.clickCreate && $options.clickCreate(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ceb22cc9"], ["__file", "C:/Users/liu/Documents/HBuilderProjects/classteam/pages/share/share.vue"]]);
wx.createPage(MiniProgramPage);
