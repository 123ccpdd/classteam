"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "login",
  data() {
    return {
      formInline: {
        email: "",
        password: ""
      },
      ruleInline: {
        email: [
          { required: true, message: "请填写邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur,change" }
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码长度不能小于6位", trigger: "blur" }
        ]
      },
      bg: {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        position: "absolute"
      }
    };
  },
  computed: {
    mdpassword: function() {
      return coreJS.encryptedPassword(this.formInline.password);
    }
  },
  methods: {
    handleSubmit(name, form) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          var loginParams = {
            email: form.email,
            password: this.mdpassword
          };
          requestLogin(loginParams).then((response) => {
            if (response.re_code === "0") {
              this.$Message.success("登录成功");
              let token = response.token;
              this.$store.commit("set_token", token);
              this.$router.push("/");
            } else {
              this.$Message.error(response.msg);
            }
          }).catch((error) => {
            this.$Message.error(error.status);
          });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    }
  }
};
if (!Array) {
  const _component_Icon = common_vendor.resolveComponent("Icon");
  const _component_Input = common_vendor.resolveComponent("Input");
  const _component_FormItem = common_vendor.resolveComponent("FormItem");
  const _component_Button = common_vendor.resolveComponent("Button");
  const _component_Form = common_vendor.resolveComponent("Form");
  const _component_router_link = common_vendor.resolveComponent("router-link");
  const _component_Card = common_vendor.resolveComponent("Card");
  const _component_Col = common_vendor.resolveComponent("Col");
  const _component_Row = common_vendor.resolveComponent("Row");
  (_component_Icon + _component_Input + _component_FormItem + _component_Button + _component_Form + _component_router_link + _component_Card + _component_Col + _component_Row)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "person"
    }),
    b: common_vendor.o(($event) => $options.handleSubmit("formInline", $data.formInline)),
    c: common_vendor.o(($event) => $data.formInline.email = $event),
    d: common_vendor.p({
      type: "text",
      placeholder: "邮箱",
      size: "large",
      modelValue: $data.formInline.email
    }),
    e: common_vendor.p({
      prop: "email"
    }),
    f: common_vendor.p({
      type: "locked"
    }),
    g: common_vendor.o(($event) => $options.handleSubmit("formInline", $data.formInline)),
    h: common_vendor.o(($event) => $data.formInline.password = $event),
    i: common_vendor.p({
      type: "password",
      placeholder: "密码",
      size: "large",
      modelValue: $data.formInline.password
    }),
    j: common_vendor.p({
      prop: "password"
    }),
    k: common_vendor.o(($event) => $options.handleSubmit("formInline", $data.formInline)),
    l: common_vendor.p({
      type: "info",
      long: true
    }),
    m: common_vendor.sr("formInline", "860aaed2-3,860aaed2-2"),
    n: common_vendor.p({
      model: $data.formInline,
      rules: $data.ruleInline
    }),
    o: common_vendor.p({
      to: "/signin"
    }),
    p: common_vendor.p({
      span: "5"
    }),
    q: common_vendor.p({
      type: "flex",
      justify: "center"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-860aaed2"], ["__file", "C:/Users/liu/Documents/HBuilderProjects/classteam/pages/myself/myself.vue"]]);
wx.createPage(MiniProgramPage);
