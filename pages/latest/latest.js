// latest.js
var formatutil = require("../../utils/formatutil.js");
var apiutil = require('../../utils/apiutil.js');

Page({
    data: {
        query: {
            page: 1,
            size: 10
        },
        title: '最新段子',
        latest: [],
        hidden: false
    },
    onPullDownRefresh: function () {
        console.log('onPullDownRefresh', new Date())
        this.fetchData({page: 1, size: 10}, true);
    },
    // 事件处理函数
    redictDetail: function(e) {
        var id = e.currentTarget.id,
        url = '../detail/detail?id=' + id;
        wx.navigateTo({
            url: url
        })
    },
    fetchData: function(query, pullDownRefresh) {
        var that = this;
        apiutil.getLatests(query).then(function(resp) {
            var respData = resp.data.data;
            var latest = respData.list;
            latest.forEach(function(item) {
                item.createdAt = formatutil.formatTime(formatutil.transLocalTime(item.createdAt));
            });
            var currentData = that.data.latest;
            if (!pullDownRefresh) { // 不是下拉刷新, 添加数据
                latest = currentData.concat(latest);
            }
            that.setData({
                hidden: true,
                latest: latest
            })
        });
    },
    loadMore: function() {
        var that = this
        that.data.query.page += 1;
        console.info("当前页:", that.data.query);
        that.fetchData(that.data.query);
    },
    onLoad: function () {
        this.fetchData({});
    }
})
