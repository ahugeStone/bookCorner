//index.js
//获取应用实例
const app = getApp()

import util from '../../utils/util'
import env from '../../utils/env.js'

Page({
  data: {
    bookInfo:{},
    commentHistoryList: [],
    showDialog: false,
    commentText: "",
    bookId: null,
    bookName: "",
    borrowHistoryList: null,
    activeTab: 1 // 被激活的tab，默认为1
  },
  // 获取传入参数
  onLoad: function (options) {
    // console.info(options.bookId)
    var pages = getCurrentPages()

    this.setData({
      bookId: parseInt(options.bookId)
    })
    app.globalData.edBookId.push(this.data.bookId)
  },
  // 每次展示刷新图书详情
  onShow: function () {
    this.searchBookDetail()
  },
  // 替换父页面的bookList
  changeBookList: function() {
    // var pages = getCurrentPages()
    // console.info(pages)
    // console.info("pages length:", pages.length)
    // for (var page of pages) {
    //   //如果父页面有booklist则进行替换
    //   var bookList = page.data.bookList
    //   if (bookList) {
    //     for (var i = 0; i < bookList.length; i++) {
    //       if (bookList[i].bookId == this.data.bookId) {
    //         break;
    //       }
    //     }
    //     bookList.splice(i, 1, this.data.bookInfo)
    //     page.setData({
    //       bookList: bookList
    //     })
    //   }
    // }
  },
  // 切换标签
  clickTab: function(e) {
    // console.info(e.currentTarget.dataset.tabId)
    this.setData({
      activeTab: e.currentTarget.dataset.tabid
    })
  },
  // 获取图书详情
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
      data.bookDate = data.bookTime?data.bookTime.substring(0,10):""
      this.setData({
        bookInfo: data,
        bookName: data.bookName
      })
      return util.rest("GET", "books/" + this.data.bookId + "/comments", {
      }, {
          method: "CustQueryBookCommentHistory"
        })
    })
    // 获取图书评论
    .then(res => {
      var data = res
      this.setData({
        commentHistoryList: data.commentHistoryList
      })
      // 满足条件调用豆瓣api获取豆瓣用户评论
      if (this.data.bookInfo.isbn13) {
        util.restDouban("GET", "book/isbn/"+this.data.bookInfo.isbn13+"/comments", {
          count: 10
        }).then(res2 => {
          var comments = res2.comments
          for(var comment of comments) {
            comment.userName = '豆瓣用户-' + comment.author.name
            comment.comment = comment.summary
            comment.recTime = comment.published
            comment.isDouban = true
          }
          var comments = this.data.commentHistoryList.concat(comments)
          this.setData({
            commentHistoryList: comments
          })
        })
      }
    })
    // 获取图书评论历史
    util.rest("GET", "books/" + this.data.bookId + "/history", {}, {
      method: "CustQueryBookBorrowHistory"
    }).then(res => {
      var data = res
      this.setData({
        borrowHistoryList: data.borrowHistoryList
      })
      // console.log(this.data.borrowHistoryList)
    })
  },
  // 图书点赞
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
  // 评论点赞
  thumbupComment: function(e) {
    var commentid = e.target.dataset.commentid
    util.rest("POST", "books/" + this.data.bookId + "/comments/" + commentid, {
      action: "THUMBUP"
    }, {
        method: "CustLikeComment"
      }).then(res => {
        for (var comment of this.data.commentHistoryList) {
          if (comment.id == commentid) {
            comment.isLiked = "1"
            comment.commentLikeNum++
          }
        }
        this.setData({
          commentHistoryList: this.data.commentHistoryList
        })
        wx.showToast({
          title: '点赞成功',
          // icon: 'success',
          duration: 1000
        })
      })
      // .catch(e => {
      //   wx.showToast({
      //     icon: 'none',
      //     title: '网络卡了',
      //     duration: 1000
      //   })
      // })
    console.info(e.target.dataset.commentid)
  },
  // 切换到图书历史（废弃）
  gotoBorrowHistory: function(e) {
    wx.navigateTo({
      url: '../borrowHistory/borrowHistory?bookId=' +
      e.currentTarget.dataset.bookid + 
      '&bookName=' + e.currentTarget.dataset.bookname
    })
  },
  // 切换到评论（废弃）
  gotoComment: function(e) {
    wx.navigateTo({
      url: '../comment/comment?bookId=' +
      e.currentTarget.dataset.bookid
    })
  },
  // 生成图书来源
  getSource: function(buyer, source) {
    // console.log("123")
    var list = ["采购", "捐赠"]
    return buyer + " " + (list[source] ? list[source]:"")
  },
  // 借阅或归还
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
              that.data.bookInfo.id = that.data.bookInfo.bookId
            }
            
            that.setData({
              bookInfo: that.data.bookInfo
            })
          }).catch(e => {
            wx.navigateTo({
              url: '../result/result?bookId=' +
              that.data.bookInfo.bookId +
              '&action=' + action +
              '&success=false'
            })
          })
        } else if (res.cancel){
          console.log('用户点击取消')
        }
      }
    })
  },
  //打开评论框
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  // 保存评论
  commitComment: function () {
    if (this.data.commentText.trim().length == 0) {
      wx.showModal({
        title: '注意',
        content: '请输入有效的评论内容',
        showCancel: false
      })
      return
    }
    util.rest("POST", "books/" + this.data.bookId + "/comments", {
      comment: this.data.commentText
    }, {
        method: "CustCommentBook"
      }).then(res => {
        wx.showToast({
          title: '发布成功',
          mask: true,
          // icon: 'success',
          duration: 2000,
          success: () => {
            this.toggleDialog()
            this.setData({
              commentText: ""
            })
            setTimeout(() => {
              this.getComments()
            }, 2000)
          }
        })
      })
  },
  // 临时保存评论内容
  oninput: function (e) {
    this.setData({
      commentText: e.detail.value
    })
  },
  // 获取评论（刷新）
  getComments: function () {
    // 获取图书评论
    util.rest("GET", "books/" + this.data.bookId + "/comments", {
    }, {
        method: "CustQueryBookCommentHistory"
      }).then(res => {
        var data = res
        this.setData({
          commentHistoryList: data.commentHistoryList
        })
        // 满足条件调用豆瓣api获取豆瓣用户评论
        if (this.data.bookInfo.isbn13) {
           util.restDouban("GET", "book/isbn/" + this.data.bookInfo.isbn13 + "/comments", {
            count: 10
          }).then(res2 => {
            var comments = res2.comments
            for (var comment of comments) {
              comment.userName = '豆瓣用户-' + comment.author.name
              comment.comment = comment.summary
              comment.recTime = comment.published
              comment.isDouban = true
            }
            var comments = this.data.commentHistoryList.concat(comments)
            this.setData({
              commentHistoryList: comments
            })
          })
        }
      })


  }
})
