// pages/message/message.js
const app = getApp()
import util from '../../utils/util'
import env from '../../utils/env.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMessages()
  },
  getMessages() {
    util.rest("GET", "messages", {
      num: 10
    }, {
        method: "CustqueryMessage"
      }).then(res => {
        var cont = ['借阅', '归还', '评论']
        for (var message of res.messageList) {
          message.action = cont[message.operationType]
          message.actiontime = message.operationTime.slice(0, 10)
        }
        this.setData({
          messageList: res.messageList
        })
      })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})