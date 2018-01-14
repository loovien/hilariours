// latest.js
var formatutil = require("../../utils/formatutil.js");
var apiutil = require('../../utils/apiutil.js');

Page({
  data: {
    cancel: true,
    title: '全部分类',
    nodes: [],
    hidden: false,
    value: ""
  },
  fetchData: function() {
    var that = this;
    var value = that.data.value;
    apiutil.getClassification({page: 1, size: 20, name: value}).then(function(resp){
        var nodes = resp.data.data.list;
        that.setData({
            hidden: true,
            nodes: nodes
        });
    });
  },
  inputtxt: function(evt) {
      var that = this;
      var newValue = evt.detail.value;
      that.data.value = newValue;
      that.fetchData();
  },
  onLoad: function () {
    this.fetchData();
  }
})
