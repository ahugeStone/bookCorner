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
    util.rest("GET", "books/" + this.data.bookId + "/history", {}, {
      method: "CustQueryBookBorrowHistory"
    }).then(res => {
      var data = res
      this.setData({
        borrowHistoryList: data.borrowHistoryList
      })
      // console.log(this.data.borrowHistoryList)
    })
  }
})
