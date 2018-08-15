//mine.js
const app = getApp()
const util = require('../../utils/util.js')
import env from '../../utils/env.js'

Page({
  data: {
    historyList: null,
    readingList: null,
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
        readingList: this.data.readingList
      })
    })
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
  }
})
