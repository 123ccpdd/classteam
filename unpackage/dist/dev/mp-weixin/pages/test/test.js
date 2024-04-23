"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      imagePath: "",
      videoPath: ""
    };
  },
  onLoad() {
  },
  methods: {
    videoErrorCallback: function() {
      common_vendor.index.showModal({
        content: "视频加载失败",
        showCancel: false
      });
    },
    saveImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["camera"],
        success: (res) => {
          this.imagePath = res.tempFilePaths[0];
          this.getTempFilePath(res.tempFilePaths[0], "imageTempPath");
        },
        fail: (err) => {
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.camera"];
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "授权失败",
                  content: "Hello uni-app需要从您的相机获取图片，请在设置界面打开相关权限",
                  success: (res2) => {
                    if (res2.confirm) {
                      common_vendor.index.openSetting();
                    }
                  }
                });
              }
            }
          });
        }
      });
    },
    saveVideo() {
      common_vendor.index.chooseVideo({
        count: 1,
        sourceType: ["camera"],
        success: (res) => {
          console.log(res.tempFilePath);
          this.videoPath = res.tempFilePath;
          this.getTempFilePath(res.tempFilePath, "videoTempPath");
        },
        fail: (err) => {
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.camera"];
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "授权失败",
                  content: "Hello uni-app需要从您的相机获取视频，请在设置界面打开相关权限",
                  success: (res2) => {
                    if (res2.confirm) {
                      common_vendor.index.openSetting();
                    }
                  }
                });
              }
            }
          });
        }
      });
    },
    getTempFilePath(url, types) {
      common_vendor.index.showLoading({
        title: "保存中..."
      });
      let obj = {
        filePath: url,
        success: () => {
          common_vendor.index.showModal({
            content: "保存成功",
            showCancel: false
          });
          common_vendor.index.hideLoading();
        },
        fail: (e) => {
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            content: "保存失败",
            showCancel: false
          });
        }
      };
      if (types === "videoTempPath") {
        common_vendor.index.saveVideoToPhotosAlbum(obj);
      } else {
        common_vendor.index.saveImageToPhotosAlbum(obj);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.imagePath !== ""
  }, $data.imagePath !== "" ? {
    b: $data.imagePath
  } : {}, {
    c: common_vendor.o((...args) => $options.saveImage && $options.saveImage(...args)),
    d: $data.videoPath !== ""
  }, $data.videoPath !== "" ? {
    e: $data.videoPath,
    f: common_vendor.o((...args) => $options.videoErrorCallback && $options.videoErrorCallback(...args))
  } : {}, {
    g: common_vendor.o((...args) => $options.saveVideo && $options.saveVideo(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/liu/Documents/HBuilderProjects/classteam/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
