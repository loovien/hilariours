// detail.js
var formatutil = require("../../utils/formatutil.js");
var apiutil = require('../../utils/apiutil.js');

Page({
  data: {
    title: '段子详情',
    detail: {},
    replies: [],
    hidden: false
  },
  fetchDetail: function(id) {
    var that = this;
    apiutil.getJoker({id: id}).then(function(resp) {
        console.log(resp)
        var respData = resp.data.data;
        respData.createdAt = formatutil.formatTime(formatutil.transLocalTime(respData.createdAt));
        that.setData({
            detail: respData,
            hidden: true
        });
    });
  },
  fetchReplies: function(id) {
    var that = this;
    apiutil.getRepliesByJokerId({id: id}).then(function(resp){
        var replies = resp.data.data.list || [];
        replies.forEach(function(item) {
            item.createdAt = formatutil.formatTime(formatutil.transLocalTime(item.createdAt));
            return item;
        });
        that.setData({
            replies: replies,
            hidden: true
        })
    });
  },
  onLoad: function (options) {
    this.fetchDetail(options.id);
    this.fetchReplies(options.id);
    return;
  }
})
