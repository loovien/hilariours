"use strict";

var wxUtil = require("utils/wx.js");
console.log(wxUtil)
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
        wx.login({ //调用登录接口
            withCredentials: true,
            success: function (resp) {
                console.log(resp)
                if (!resp.errMsg == "login:ok") {
                    that.getUserInfo();
                    return;
                }
                var authURL = wxUtil.getAuthURL();
                wx.getUserInfo({
                    success: function (res) {
                        that.appData.userInfo = res.userInfo;
                        typeof callback == "function" && callback(that.appData.userInfo)
                    }
                });
            }
        });
    },
    appData: {
        openid: "",
        unionid: "",
        userInfo: null
    }
});
