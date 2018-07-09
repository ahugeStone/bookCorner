//mine.js
const app = getApp()
const util = require('../../utils/util.js')
import env from '../../utils/env.js'

Page({
  data: {
    historyList: null,
    readingList: null
  },
  onLoad: function () {
    
  },
  onShow: function () {
    // console.log("show mine")
    util.rest("GET", "users/" + + app.globalData.userNo + "/history" , {
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
  }
})
