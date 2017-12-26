let api = require("../../utils/api.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    menu: [],
    userinfo:{
      avatarUrl: "../../images/avatar.png",
      nickName: ""
    } 
  },

  fetchUserInfo:function() {
    var app = getApp();
    var userInfo = app.appData.userInfo;
    console.log(userInfo);
    return userInfo;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userinfo = that.fetchUserInfo();
    that.setData({
      hidden: true,
      userinfo: userinfo,
      menu:[
        {title: "我要提现", url: "carsh"},
        {title: "我的收入", url: "income"},
        {title: "我的支出", url: "outcome"},
        {title: "发布记录", url: "deploy"},
        {title: "评论记录", url: "replies"},
        {title: "意见反馈", url: "feedback"}
      ]
    })
  },
})
