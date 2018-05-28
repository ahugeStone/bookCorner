//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    success: 'true',
    action: null
  },
  onLoad: function (options) {
    this.setData({
      action: options.action,
      success: options.success,
    })
  },
  gotoShelf: function(e) {
    wx.switchTab({
      url: '../shelf/shelf'
    })
  },
  gotoMine: function(e) {
    wx.switchTab({
      url: '../mine/mine'
    })
  }
})
