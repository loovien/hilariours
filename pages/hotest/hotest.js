// latest.js
var formatutil = require("../../utils/formatutil.js");
var apiutil = require('../../utils/apiutil.js');
Page({
    data: {
        query: {
            page: 1,
            size: 10
        },
        title: '最热段子',
        hots: [],
        hidden: false,
        more: true,
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
        var query = that.data.query;
        apiutil.getHots(query).then(function(resp) {
            var respData = resp.data.data;
            var hots = respData.list;
            if (Math.ceil(respData.cnt / respData.size) == query.page) {
                that.more = false;
            }
            hots.forEach(function(item) {
                item.createdAt = formatutil.formatTime(formatutil.transLocalTime(item.createdAt));
            });
            var currentData = that.data.hots;
            if (!pullDownRefresh) { // 不是下拉刷新, 添加数据
                hots = currentData.concat(hots);
            }
            that.setData({
                hidden: true,
                hots: hots
            })
        });
    },
    loadMore: function() {
        var that = this
        if (!that.data.more) {
            return;
        }
        that.data.query.page += 1;
        console.info("当前页:", that.data.query);
        that.fetchData(that.data.query);
    },
    onLoad: function () {
        this.fetchData({});
    }
})
