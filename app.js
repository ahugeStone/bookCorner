//app.js
import util from '/utils/util'
import env from "/utils/env.js"

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    wx.showLoading({
      mask: true
    })
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        var that = this
        wx.setStorageSync('code', res.code)
        util.rest("GET", "token", {
          code: res.code
        }, {
          method: "CustQueryIsBinded"
        }).then(res => {
          var data = res
          // console.log(res)
          // console.log(that.globalData)
          //wx.setStorageSync('openid', data.openid)
          //that.globalData.openid = data.openid
          if(data.isBinded == "1") {
            console.info('ISBINDED')
            if (data && data.headImgUrl && "undefined" != data.headImgUrl) {
              wx.switchTab({
                url: '/pages/shelf/shelf',
              })
            }
            that.globalData.userName = data.userName // 员工姓名
            that.globalData.userNo = data.userNo //员工号
            that.globalData.isBinded = true
            that.globalData.headImgUrl = data.headImgUrl
            that.globalData.isAdmin = data.isAdmin
          } else {
            console.info('NOTBINDED')
          }
        }).catch(res => {
          console.error("error", res)
        })
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log(this.globalData.userInfo)
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: {},
    edBookId: [], // 刚访问过的bookId序列
    isNew:0
  }
})