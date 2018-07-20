//comment.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    commentHistoryList: null,
    showDialog: false,
    commentText: "",
    bookId: null
  },
  //控制 pop 的打开关闭
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  commitComment: function() {
    if (this.data.commentText.trim().length == 0) {
      wx.showModal({
        title: '注意',
        content: '请输入有效的评论内容',
        showCancel: false
      })
      return
    }
    util.rest("POST", "books/" + this.data.bookId + "/comments",{
      comment: this.data.commentText
    }, {
      method: "CustCommentBook"
    }).then(res => {
      wx.showToast({
        title: '发布成功',
        mask: true,
        // icon: 'success',
        duration: 2000,
        success: ()=>{
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
  oninput: function(e) {
    this.setData({
      commentText: e.detail.value
    })
  },
  onLoad: function (options) {
    // console.info(options.bookId)
    this.setData({
      bookId: parseInt(options.bookId)
    })
    this.getComments()
  },
  getComments: function() {
    util.rest("GET", "books/" + this.data.bookId + "/comments", {
    }, {
      method: "CustQueryBookCommentHistory"
    }).then(res => {
      var data = res
      this.setData({
        commentHistoryList: data.commentHistoryList
      })
    })
  }
})
