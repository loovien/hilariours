// topicList.js
var formatutil = require("../../utils/formatutil.js");
var apiutil = require('../../utils/apiutil.js');

Page({
    data: {
        query: {
            page: 1, 
            size: 10,
            classId: 0
        },
        title: '段子分类列表',
        topics: [],
        hidden: false,
        more: true
    },
    // 事件处理函数
    redictDetail: function(e) {
        var id = e.currentTarget.id,
        url = '../detail/detail?id=' + id;
        wx.navigateTo({
            url: url
        })
    },
    fetchData: function(id) {
        var that = this;
        var query = that.data.query;
        query.classId = id;
        apiutil.getJokersByClassId(query).then(function(resp){
            var respData = resp.data.data;
            var jokerList = respData.list || [];
            if (Math.ceil(respData.cnt / respData.size) == query.page) {
                that.more = false;
            }
            jokerList.forEach(function(item) {
                item.createdAt = formatutil.formatTime(formatutil.transLocalTime(item.createdAt));
                return item;
            });
            that.setData({
                hidden: true,
                topics: jokerList,
            });
        });
    },
    loadMore: function() {
        var that = this;
        if (!that.more) {
            return;
        }
        that.query.page += 1;
        that.fetchData();
    },
    onLoad: function (options) {
        this.fetchData(options.id);
    }
})
