//index.js
//获取应用实例
const app = getApp()

import util from '../../utils/util'
import env from '../../utils/env.js'

Page({
  data: {
    bookInfo:{},
    commentHistoryList: [],
    bookId: null
  },
  onLoad: function (options) {
    // console.info(options.bookId)
    this.setData({
      bookId: parseInt(options.bookId)
    })
    // this.searchBookDetail()
  },
  onShow: function () {
    this.searchBookDetail()
  },
  searchBookDetail: function () {
    util.rest("GET", "books/" + this.data.bookId,{
      // openid: app.globalData.openid,
      // bookId: this.data.bookId
    }, {
        method: "CustQueryBookDetail"
    }).then(res => {
      var data = res
      data.bresource = this.getSource(data.bookBuyer, data.bookSource)
      data.bookImage = env.imgurl + data.bookId + '.png'
      this.setData({
        bookInfo: data
      })
    })
    util.rest("GET", "books/" + this.data.bookId + "/comments", {
    }, {
      method: "CustQueryBookCommentHistory"
    }).then(res => {
      var data = res
      this.setData({
        commentHistoryList: data.commentHistoryList
      })
    })
  },
  thumbup: function() {
    if (this.data.bookInfo.isLiked == "1") {
      return
    }
    util.rest("POST", "books/" + this.data.bookId, {
      action: "THUMBUP"
    }, {
      method: "CustLikeBook"
    }).then(res => {
      this.data.bookInfo.isLiked = "1"
      this.data.bookInfo.bookLikeNum++
      this.setData({
        bookInfo: this.data.bookInfo
      })
      wx.showToast({
        title: '点赞成功',
        // icon: 'success',
        duration: 1000
      })
    }).catch(e => {
      wx.showToast({
        title: '网络卡了',
        duration: 1000
      })
    })
  },
  gotoBorrowHistory: function(e) {
    wx.navigateTo({
      url: '../borrowHistory/borrowHistory?bookId=' +
      e.currentTarget.dataset.bookid + 
      '&bookName=' + e.currentTarget.dataset.bookname
    })
  },
  gotoComment: function(e) {
    wx.navigateTo({
      url: '../comment/comment?bookId=' +
      e.currentTarget.dataset.bookid
    })
  },
  getSource: function(buyer, source) {
    // console.log("123")
    var list = ["采购", "捐赠"]
    return buyer + " " + list[source]
  },
  gotoResult: function(e) {
    var that = this
    // console.log(that.data.bookInfo)
    var action = e.currentTarget.dataset.action
    var tips = action=="borrow"? "借阅":"归还"
    wx.showModal({
      title: '提示',
      content: '确认' + tips 
      + '《' + that.data.bookInfo.bookName + '》?',
      success: function(res) {
        // console.log(res)
        if (res.confirm) {
          // console.log('用户点击确定')
          util.rest("POST", "books/" + that.data.bookInfo.bookId, {
            action: action.toUpperCase()
          }, {
            method: action == "borrow" ? "CustBorrowBook" :"CustReturnBook"
          }).then(res => {
            wx.navigateTo({
              url: '../result/result?bookId=' +
              e.currentTarget.dataset.bookid +
              '&action=' + action +
              '&success=true'
            })
            that.data.bookInfo.isBorrowed = action == "borrow" ? "1" : "0"
            that.data.bookInfo.bookStatus = action == "borrow" ? "0" : "1"
            if(action == "borrow") {
              that.data.bookInfo.id = res.result.id
            }
            
            that.setData({
              bookInfo: that.data.bookInfo
            })
          }).catch(e => {
            wx.navigateTo({
              url: '../result/result?bookId=' +
              e.currentTarget.dataset.bookid +
              '&action=' + action +
              '&success=false'
            })
          })
        } else if (res.cancel){
          console.log('用户点击取消')
        }
      }
    })
  }
})
