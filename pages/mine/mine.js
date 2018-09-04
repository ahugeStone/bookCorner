//mine.js
const app = getApp()
const util = require('../../utils/util.js')
import env from '../../utils/env.js'

Page({
  data: {
    historyList: null,
    readingList: null,
    indx: null,
    historyListLength: null,
    canAdd: false,
  },
  onLoad: function () {
    
  },
  onShow: function () {
    util.rest("GET", "users/" + app.globalData.userNo + "/history" , {
    }, {
      method: "CustQueryBookBorrowRecord"
    }).then(res => {
      this.data.historyList = []
      this.data.readingList = []
      for (var el of res.borrowRecordList) {
        el.bookImage = env.imgurl + el.bookId + '.png'
        if (el.borrowStatus == "0") {
          el.bookStatus = null
          this.data.readingList.push(el)
        } else {
          this.data.historyList.push(el)
        }
      }
      this.setData({
        userName: app.globalData.userName,
        headImgUrl: app.globalData.headImgUrl,
        historyList: this.data.historyList,
        readingList: this.data.readingList,
        historyListLength: this.data.historyList.length,
        indx: 2
      })
    })
      if (app.globalData.isAdmin == "1") {
      this.setData({
        canAdd: true,
      })
    }
  },
  gotoDetail(e) {
    wx.navigateTo({
      url: '../bookDetail/bookDetail?bookId=' +
      e.currentTarget.dataset.bookid
    })
  },
  // 滑动删除处理(空)
  handleMovableChange(e) {
  },
  handleTouchend(e) {
  },
  findMoreInfo(){
    this.setData({
      //将list长度赋值给indx，使前台展示全部数据
      indx: this.data.historyList.length,
      //长度设为0 ，前台判断后不再显示“查看更多”
      historyListLength: 0
    })
  },
  gotoAddbook(e) {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        console.log(res.result)
        wx.navigateTo({
          url: '../addbook/addbook?isbn13=' + res.result
        })
      }
    })
  },
})
