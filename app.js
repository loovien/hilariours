"use strict";
var apiutil = require("./utils/apiutil.js");
App({
    onLaunch: function () {
        var that = this;
        that.getUserInfo();
    },
    getUserInfo:function(callback){
        var that = this;
        if(that.appData.userInfo){
            if (typeof cb == "function") {
                callback(that.appData.userInfo);
            }
            return;
        }
        var wxlogin = new Promise(function(resolve, reject){
          wx.login({ //调用登录接口
            withCredentials: true,
            success: function (resp) {
              console.log(resp)
              if (!resp.errMsg == "login:ok") {
                that.getUserInfo();
                return;
              }
              resolve(resp)
            }
          });
        });
        var wxuserinfo = new Promise(function(resolve){
              wx.getUserInfo({
                success: function (res) {
                  that.appData.userInfo = res.userInfo;
                  resolve(res.userInfo)
                }
              });
        });
        Promise.all([wxlogin, wxuserinfo]).then(function(values){
            var code = values[0]['code'];
            apiutil.getOpenID({jscode: code}).then(function(resp) {
                that.appData.openid = resp.data.data.openid;
                var putUserInfo = Object.assign({}, resp.data.data, values[1]);
                putUserInfo.nickname = putUserInfo.nickName;
                putUserInfo.avatar = putUserInfo.avatarUrl;
                apiutil.putUserInfo(putUserInfo).then(function(resp) {
                    console.log("上报用户信息:", resp);
                });
            });
        });
    },
    appData: {
        openid: "",
        unionid: "",
        userInfo: null
    }
});
