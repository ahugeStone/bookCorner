// pages/addbook/addbook.js
var filePaths = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookName:"",
    bookWriter: '',
    bookScore: '',
    bookTime: '',
    bookBuyer: '',
    array: [
      { name: 'bookType', value: '党建', checked: 'true' },
      { name: 'bookType', value: '技术' },
    ],
    files: [],
  },
  /**
  * radio监听事件
  */
  listenerRadioGroup: function (e) {
    console.log(e);
  },

  //清除输入框数据
  clearNameInput() {
    this.setData({
      bookName: '',
    })
  },
  clearWriterInput() {
    this.setData({
      bookWriter: '',
    })
  },
  clearScoreInput() {
    this.setData({
      bookScore: '',
    })
  },
  clearTimeInput() {
    this.setData({
      bookTime: '',
    })
  },
  clearBuyerInput() {
    this.setData({
      bookBuyer: '',
    })
  },

  //输入框的值
  bookNameInput: function (e) {
    this.setData({
      bookName: e.detail.value
    })
  },
  bookWriterInput: function (e) {
    this.setData({
      bookWriter: e.detail.value
    })
  }, 
  bookScoreInput: function (e) {
    this.setData({
      bookScore: e.detail.value
    })
  },
  bookTimeInput: function (e) {
    this.setData({
      bookTime: e.detail.value
    })
  },
  bookBuyerInput: function (e) {
    this.setData({
      bookBuyer: e.detail.value
    })
  },
  oninput: function (e) {
    this.setData({
      bookBrief: e.detail.value
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        filePaths = (res.tempFilePaths);
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
//图书详情上传
  commitbookBrief: function () {
    if (this.data.bookBrief.trim().length == 0) {
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
  //删除图片
  clearImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var evalList = this.data.evalList;
    var img = evalList[0].tempFilePaths;
    img.splice(index, 1);
    this.setData({
      evalList: evalList
    })
    this.upLoadImg(img);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})