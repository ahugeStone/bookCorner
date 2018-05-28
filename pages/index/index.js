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
    util.post("CustBind", {
      userNo: this.data.userNo,
      userName: this.data.userName,
      code: wx.getStorageSync("code"),
      openid: app.globalData.openid,
      nickName: app.globalData.userInfo.nickName,
      headImgUrl: app.globalData.userInfo.avatarUrl
    }).then(res => {
      app.globalData.userName = this.data.userName
      // console.log('123123' , app.globalData)
      wx.switchTab({
        url: '../shelf/shelf'
      })
    }).catch(e => {
      wx.showModal({
        title: '失败',
        content: "请检查是否授权及输入信息是否有误",
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
        this.gotoIsBinded()
        // console.log("onLoad2", this.data.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // wx.openSetting({
      //   success: (res) => {
      //     /*
      //      * res.authSetting = {
      //      *   "scope.userInfo": true,
      //      *   "scope.userLocation": true
      //      * }
      //      */
      //     if (!res.authSetting['scope.userInfo']) {
      //       wx.showModal({
      //         title: '提示',
      //         content: "请点击上方按钮授权",
      //         showCancel: false
      //       })
      //     } 
      //   }
      // })
      wx.authorize({
        scope: 'scope.userInfo',
        success() {
          // 用户已经同意小程序
          console.log("authorize ok")
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              this.gotoIsBinded()
              // console.log("onLoad3", this.data.userInfo)
            }
          })
        },
        fail() {
          wx.showModal({
            title: '提示',
            content: "请点击上方按钮授权",
            showCancel: false
          })
        }
      })
    }
  },
  onShow: function () {
  //   wx.openSetting({
  //     success: (res) => {
  //       if (!res.authSetting['scope.userInfo']) {
  //         wx.showModal({
  //           title: '提示',
  //           content: "请点击上方按钮授权",
  //           showCancel: false
  //         })
  //       }
  //     }
  //   })
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.gotoIsBinded()
        // console.log("onLoad3", this.data.userInfo)
      }
    })
  },
  gotoIsBinded: function() {
    if (app.globalData.isBinded) {
      console.info('ISBINDED2')
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
  }
})
