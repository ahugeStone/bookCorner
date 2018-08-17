//index.js
//获取应用实例
const app = getApp()

import util from '../../utils/util'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName: null,
    userNo: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userNoInput: function (e) {
    this.setData({
      userNo: e.detail.value
    })
  },
  empLogin: function() {
    if (!app.globalData.userInfo || !app.globalData.userInfo.nickName) {
      wx.showModal({
        title: '失败',
        content: "请点击点我授权按钮并允许授权",
        showCancel: false
      })
      return;
    }
    if (!this.data.userNo) {
      wx.showModal({
        title: '失败',
        content: "请输入工号",
        showCancel: false
      })
      return;
    }
    if (!this.data.userName) {
      wx.showModal({
        title: '失败',
        content: "请输入姓名",
        showCancel: false
      })
      return;
    }
    // 用户绑定验证
    util.rest("POST", "users/" + this.data.userNo , {
      userNo: this.data.userNo,
      userName: this.data.userName,
      nickName: app.globalData.userInfo.nickName,
      headImgUrl: app.globalData.userInfo.avatarUrl
    }, {
        method: "CustBind"
    }).then(res => {
      app.globalData.userName = this.data.userName
      // console.log('123123' , app.globalData)
      wx.switchTab({
        url: '../shelf/shelf'
      })
    }).catch(e => {
      console.info(e)
      wx.showModal({
        title: '失败',
        content: (e.message && e.message.length < 20 && e.message) || "请检查是否授权及输入信息是否有误",
        showCancel: false
      })
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo && JSON.stringify(app.globalData.userInfo) != "{}") {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // 用户信息更新
      this.updateUserInfo()
      this.gotoIsBinded()
      // console.log("onLoad1", this.data.userInfo)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 用户信息更新
        this.updateUserInfo()
        this.gotoIsBinded()
        // console.log("onLoad2", this.data.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
    }
  },
  onShow: function () {
  },
  gotoIsBinded: function() {
    if (app.globalData.isBinded) {
      // console.info('ISBINDED2')
      wx.switchTab({
        url: '/pages/shelf/shelf',
      })
    }
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log("getUserInfo",this.data.userInfo)
    // 用户信息更新
    this.updateUserInfo()
    this.gotoIsBinded()
  },
  /**
   * 更新用户信息
   */
  updateUserInfo() {
    if (app.globalData.userInfo && app.globalData.userInfo.nickName) {
      util.rest("POST", "users/" + this.data.userNo, {
        userNo: this.data.userNo,
        userName: this.data.userName,
        nickName: app.globalData.userInfo.nickName,
        headImgUrl: app.globalData.userInfo.avatarUrl
      }, {
          method: "CustBind"
        }).then(res => {
          console.info("用户信息更新成功")
        })
    }
  }
})
