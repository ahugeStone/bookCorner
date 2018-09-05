import util from '../../utils/util'
var filePaths = '';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookName: '',
    bookWriter: '',
    bookScore: '',
    bookTime: '',
    bookBuyer: '',
    bookType: [
      { name: 'bookType', value: '党建', checked: 'true' },
      { name: 'bookType', value: '技术' },
    ],
    file: [],
    isbn13: '',
    bookSource: '',
    bookBrief: ''

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
        console.log(filePaths)
        
        that.setData({
          file: that.data.file.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.file // 需要预览的图片http链接列表
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
  //提交信息
  submitbook(){
    if (this.data.bookBuyer=="开发二部"){
      this.data.bookSource= "0"
    }else{
      this.data.bookSource= "1"
    } 
    if (this.data.bookType == "党建"){
      this.data.bookType = "0"
    }else{
      this.data.bookType = "1"
    }
    util.rest("POST", "books", {

      bookName: this.data.bookName,
      bookWriter: this.data.bookWriter,
      bookScore: this.data.bookScore,
      bookTime: this.data.bookTime,
      bookBuyer: this.data.bookBuyer,
      bookType: this.data.bookType,
      file: this.data.file,
      isbn13: this.data.isbn13,
      bookSource: this.data.bookSource,
      bookBrief: this.data.bookBrief
     
    }, {
        method: "custAddBook"
      }).then(res => {
        wx.showToast({
          title: '新增图书成功',
          mask: true,
          // icon: 'success',
          duration: 2000,
          success: () => {
           
          console.info("提交成功")
          }
        })
      })



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过isbn码调用豆瓣API获取图书信息
    wx.scanCode({
      success: (res) => {
        console.log(res)
        console.log(res.result)
        this.setData({
          isbn13: res.result
        })
        //console.info(this.data.isbn13)
        if (this.data.isbn13) {
          util.restDouban("GET", "book/isbn/" + this.data.isbn13, {
            count: 1
          }).then(res => {

            this.setData({
              bookName: res.title,
              bookWriter: res.author,
              bookBrief: res.summary,
              bookScore: res.rating.average
            })
          })
        }
      }
    })
    //获取当前时间
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
      month = '0' + month;
    };
    if (day < 10) {
      day = '0' + day;
    };
    //  如果需要时分秒，就放开
    // var h = now.getHours();
    // var m = now.getMinutes();
    // var s = now.getSeconds();
    var formatDate = year + '-' + month + '-' + day;
    this.setData({
      bookTime: formatDate
    })
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