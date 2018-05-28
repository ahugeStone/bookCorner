//borrowHistory.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    bookName: "",
    borrowHistoryList: null,
    bookId: null
  },
  onLoad: function (options) {
    // console.info(options.bookId)
    this.setData({
      bookId: options.bookId,
      bookName: options.bookName
    })
    util.post("CustQueryBookBorrowHistory", {
      openid: app.globalData.openid,
      bookId: this.data.bookId
    }).then(res => {
      var data = res.result
      this.setData({
        borrowHistoryList: data.borrowHistoryList
      })
      console.log(this.data.borrowHistoryList)
    })
  }
})
