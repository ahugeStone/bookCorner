import util from '../../utils/util'
import env from '../../utils/env.js'
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
    bookBuyer: '开发二部',
    bookType: [
      { name: 'bookType', value: '党建', checked: 'true' },
      { name: 'bookType', value: '技术' },
    ],
    file: '',
    isbn13: '',
    bookSource: '',
    bookBrief: '',
    flag:0

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
        filePaths = res.tempFilePaths;
        console.log(filePaths[0])
        
        that.setData({
          file: filePaths[0],
          flag:1
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
    
    this.setData({
      file: '',
      flag: 0
    })
    
  },
  //提交给后台
  submit:function(){
    console.info("图片路径：" + this.data.file)
    wx.uploadFile({
      url: env.url[0] + 'books',//仅为示例，非真实的接口地址//接口连接
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': getApp().globalData.sessionId, // 设置sessionid，保持会话-已废弃
        'Authorization': 'Bearer ' + getApp().globalData.token// 设置token
      }, // 设置请求的 header  
      filePath: this.data.file,
      name: 'file',
      formData: {
        'bookName': this.data.bookName,
        'bookWriter': this.data.bookWriter,
        'bookScore': this.data.bookScore,
        'bookTime': this.data.bookTime,
        'bookBuyer': this.data.bookBuyer,
        'bookType': this.data.bookType,
        'isbn13': this.data.isbn13,
        'bookSource': this.data.bookSource,
        'bookBrief': this.data.bookBrief
      },
      success: function (res) {
        console.info(res.data)
        //获取全局变量，给isNew赋值
        app.globalData.isNew = 1     
        //跳转到首页
        wx.showToast({
          title: '操作成功',//提示文字
          duration: 2000,//显示时长
          mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
          icon: 'success', //图标
          success(){
            wx.switchTab({
              url: '../shelf/shelf',
            })
          }
        })
       
      },
      fail:function(e){
        console.error(e)
        // wx.showToast({
        //   title: '出错了' + e.errMsg,//提示文字
        //   duration: 2000,//显示时长
        //   mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        //   icon: 'loading', //图标  
        // })
        wx.showModal({
          title: '错误',
          content: e.errMsg
        })
      }
    })
  },
  //点击提交按钮
  submitbook: function (){
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
    var that = this
    wx.showModal({
      title: '提示',
      content: '检查每一项都填好了哦',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //执行submit函数
          that.submit()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  loadISBN: function() {
    console.info("加载摄像头")
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
              bookWriter: res.author.toString(),
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadISBN()
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