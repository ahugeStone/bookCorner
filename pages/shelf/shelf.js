//shelf.js
//获取应用实例
const app = getApp()
import util from '../../utils/util'
import env from '../../utils/env.js'

Page({
  data: {
    bookList:null,
    bookNameSearch: "",
    bookType: "",
    bookStatus: "",
    env: env,
    showDialog: false
  },
  onLoad() {
    // this.searchBookList()
  },
  onShow() {
    this.searchBookList()
  },
  searchBookList() {
    return util.post("CustQueryBookList", {
      openid: app.globalData.openid,
      bookName: this.data.bookNameSearch,
      bookType: this.data.bookType,
      bookStatus: this.data.bookStatus
    }, null).then(res => {
      var data = res.result
      for(var book of data.bookList) {
        book.bookImage = env.imgurl + book.bookId + '.png'
      }
      this.setData({
        bookList: data.bookList
      })
      this.toggleDialog(false)
    }).catch(res => {
      console.error("error", res)
      this.toggleDialog(false)
    })
  },
  changeBookStatus(e) {
    this.setData({
      bookStatus: e.currentTarget.dataset.bookstatus
    })
  },
  changeBookType(e) {
    this.setData({
      bookType: e.currentTarget.dataset.booktype
    })
  },
  //控制 pop 的打开关闭
  toggleDialog(value) {
    this.setData({
      showDialog: value==null? !this.data.showDialog : value
    });
  },
  bookNameSearchInput(e) {
    this.setData({
      bookNameSearch: e.detail.value
    })
  },
  gotoDetail(e) {
    wx.navigateTo({
      url: '../bookDetail/bookDetail?bookId=' +
      e.currentTarget.dataset.bookid
    })
  }
})
