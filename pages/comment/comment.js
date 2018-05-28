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
    util.post("CustCommentBook", {
      openid: app.globalData.openid,
      bookId: this.data.bookId,
      headImageUrl: app.globalData.userInfo.avataUrl,
      userName: app.globalData.userName,
      comment: this.data.commentText
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
    util.post("CustQueryBookCommentHistory", {
      openid: app.globalData.openid,
      bookId: this.data.bookId
    }).then(res => {
      var data = res.result
      this.setData({
        commentHistoryList: data.commentHistoryList
      })
    })
  }
})
