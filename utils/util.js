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
  // var json = {
  //   json: JSON.stringify(data)
  // }
  var json = JSON.stringify(data)
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
  } else {// 否则使用真是环境
    return requestPromisified({
      url: env.url + '?method=' + method,
      //上线的话必须是https，没有appId的本地请求貌似不受影响  
      data: json,
      method: 'POST',
      // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header: {
        'content-type': 'application/json',//application/x-www-form-urlencoded;
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
  formatTime: formatTime,
  formatNumber: formatNumber,
  // wxPromisify: wxPromisify,
  post: post,
  log: log
}
