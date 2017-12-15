"use strict";
var wxUtil = {
  getAuthURL: function (code) {
    return "https://api.weixin.qq.com/sns/jscode2session?appid="
      + this.appId + "&secret=" + this.appSecret + "&js_code=" + code + "&grant_type=authorization_code";
  }
};
module.exports = wxUtil;