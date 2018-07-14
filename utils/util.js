import env from "env.js"
import mock from "../data/mock.js"

var Promise = require('./bluebird.min')
var loadingCount = 0

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        res = res.data
        console.log("response body", res)
        log("response body:" + JSON.stringify(res))
        hideLoading()
        if(!res._isException_) {
          resolve(res)
        } else {
          if (res.code =='not Login!') {
            console.info("没有登陆或登陆超时")
            // wx.navigateTo({
            //   url: '/pages/index/index',
            // })
            wx.showModal({
              title: '失败',
              content: "登陆超时，请重新进入",
              showCancel: false
            })
          }
          reject(res)
        }     
      }
      obj.fail = function (res) {
        console.log("response body fail", res)
        log("response body fail:" + JSON.stringify(res))
        hideLoading()
        reject(res)
      }
      fn(obj)
    })
  }
}

const post = function (method, param, options) {
  var data = {
    method: method,
    params: param,
    header: {
      "local": "zh_CN",
      "agent": "WEB15",
      "bfw-ctrl": "json",
      "version": "",
      "device": "",
      "platform": "",
      "plugins": "",
      "page": "",
      "ext": "",
      "cipherType": "0"
    }
  }
  var json = {
    json: JSON.stringify(data)
  }
  if(env.springboot){
    var json = JSON.stringify(data)
  }
  console.log("request body", json)
  log("request body:" + JSON.stringify(json))
  var requestPromisified = wxPromisify(wx.request)
  showLoading()
  // 如果是挡板调试模式，则接口调用使用挡板
  if(env.demo) {
    return new Promise((resolve, reject) => {
      var result = mock.mock[method];
      console.log("response body(mock)", result)
      log("response body(mock):" + JSON.stringify(result))
      if (!result._isException_) {
        resolve(result)
      } else {
        reject(result)
      }
      hideLoading()
    })
  } else {// 否则使用后台环境
    var url = env.springboot ? env.url[1] : env.url[0]

    return requestPromisified({
      url: env.springboot ? url + method : url + '?method=' + method,
      //上线的话必须是https，没有appId的本地请求貌似不受影响  
      data: json,
      method: 'POST',
      // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header: {
        'content-type': env.springboot ? 'application/json' : 'application/x-www-form-urlencoded',
        // 'content-type':'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.sessionId // 设置sessionid，保持会话
      }, // 设置请求的 header  
      success: function (res) {
        console.info("success")
      },
      fail: function (e) {
        console.error("fail")
        console.error(e)
      },
      complete: function (res) {
        console.info("complete")
        if (res.header['Set-Cookie']) {// 如果服务器需要设置会话
          getApp().globalData.sessionId = res.header['Set-Cookie']//保存sessionid
          console.info("set-cookie:" + getApp().globalData.sessionId)          
        }
      }
    })
  }
}

const rest = function (method, resource, param, options) {
  var data = param
  var json = JSON.stringify(data)

  console.log("request body", json)
  log("request body:" + JSON.stringify(json))
  var requestPromisified = wxPromisify(wx.request)
  showLoading()
  // 如果是挡板调试模式，则接口调用使用挡板
  if (env.demo) {
    return new Promise((resolve, reject) => {
      var result = mock.mock[method];
      console.log("response body(mock)", result)
      log("response body(mock):" + JSON.stringify(result))
      if (!result._isException_) {
        resolve(result)
      } else {
        reject(result)
      }
      hideLoading()
    })
  } else {// 否则使用后台环境
    var url = env.url[0] + resource

    return requestPromisified({
      url: url,
      //上线的话必须是https，没有appId的本地请求貌似不受影响  
      data: data,
      method: method,
      // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.sessionId, // 设置sessionid，保持会话
        'Authorization': 'Bearer ' + getApp().globalData.token// 设置token
      }, // 设置请求的 header  
      success: function (res) {
        console.info("success")
      },
      fail: function (e) {
        console.error("fail")
        console.error(e)
      },
      complete: function (res) {
        console.info("complete")
        if (res.header['Set-Cookie']) {// 如果服务器需要设置会话
          getApp().globalData.sessionId = res.header['Set-Cookie']//保存sessionid
          console.info("set-cookie:" + getApp().globalData.sessionId)
        }
        if (res.data.token) {
          // console.info('token' + res)
          getApp().globalData.token = res.data.token//保存token
          getApp().globalData.userName = res.data.userName // 员工姓名
          getApp().globalData.userNo = res.data.userNo //员工号
          // getApp().globalData.isBinded = true
          console.info("token:" + getApp().globalData.token)
        }
      }
    })
  }
}

const log = function(logText) {
  var logs = wx.getStorageSync('logs') || []
  while(logs.length > 100) {
    logs.pop();
  }
  logs.unshift(logText)
  // console.log("logs",logs)
  wx.setStorageSync('logs', logs)
}

const showLoading = function() {
  wx.showLoading({
    mask: true
  })
  loadingCount++
}
const hideLoading = function() {
  if(--loadingCount <= 0) {
    wx.hideLoading()
  }
}

module.exports = {
  formatTime,
  formatNumber,
  // wxPromisify: wxPromisify,
  post,
  log,
  rest
}
