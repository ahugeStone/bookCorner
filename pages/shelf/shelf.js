//shelf.js
//获取应用实例
const app = getApp()
import util from '../../utils/util'
import env from '../../utils/env.js'

Page({
  data: {
    bookList:[],
    bookNameSearch: "",
    bookCodeSearch:"",
    bookType: "",
    bookStatus: "",
    env: env,
    showDialog: false,
    nextNum: 0,//下一页开始序号
    isLastPage: false,//是否为最后一页
    loading: false,//是否正在加载
    messageList: null ,// 最新消息
    bookLikeNum: "",
    bookCommentNum: "",
    showMask: false, //显示蒙版
    cantDel: false // 可否删除（需动态判断）
  },
  onLoad() {
    this.resetBookList()    
  },
  onShow() {
    // this.resetBookList()
    this.getMessages()
    this.refreshBookId() // 刷新刚访问过的图书信息
    // this.searchBookList()
  },
  // 清空输入内容
  clearInput() {
    this.setData({
      bookNameSearch: ''
    })
    this.resetBookList()
  },
  // 加载更多图书
  showMore(){
    // console.info("111");
    if(!this.data.isLastPage) {
      this.searchBookList()
    }
  },
  // 获取最新消息
  getMessages() {
    util.rest("GET", "messages", {
      num: 5
    }, {
        method: "CustqueryMessage"
      }).then(res => {
        var cont = ['借阅', '归还', '评论']
        for (var message of res.messageList) {
          message.action = cont[message.operationType]
          message.actiontime = message.operationTime.slice(0, 10)
        }
        this.setData({
          messageList: res.messageList
        })
      })
  },
  // 刷新图书状态，可以防止更新整个图书列表
  refreshBookId() {
    var edBookId = app.globalData.edBookId
    if (edBookId && edBookId.length > 0) {
      // 遍历所有用户访问过的图书，调用接口刷新其数据
      var index
      while (index = app.globalData.edBookId.pop()) {
        util.rest("GET", "books/" + index, {
        }, {
            method: "CustQueryBookDetail"
          }).then(res => {
            var data = res
            data.bookImage = env.imgurl + data.bookId + '.png'
            data.xmove = 0
            data.confirmDel = false
            var bookList = this.data.bookList
            for (var i = 0; i < bookList.length; i++) {
              if (bookList[i] && bookList[i].bookId == data.bookId) {
                break;
              }
            }
            bookList.splice(i, 1, data)
            this.setData({
              bookList: bookList
            })
          })
      }
    }
  },
  // 重置图书列表
  resetBookList() {
    this.setData({
      bookList: [],
      nextNum: 0,
      isLastPage: false
    })
    this.searchBookList()
  },
  // 搜索图书，增量添加到图书列表
  searchBookList() {
    this.setData({
      loading: true //正在加载
    })
    return util.rest("GET", "books", {
      // openid: app.globalData.openid,
      bookName: this.data.bookNameSearch,
      bookType: this.data.bookType,
      bookStatus: this.data.bookStatus,
      isbn13: this.data.bookCodeSearch,
      num: this.data.nextNum
    }, {
      method: "CustQueryBookList",
      hideLoading: true
    }).then(res => {
      var data = res
      for(var book of data.bookList) {
        book.bookImage = env.imgurl + book.bookId + '.png' 
        book.xmove = 0
        book.confirmDel = false
      }
      
      let list = this.data.bookList.concat(data.bookList)
      // console.info(list)
      this.setData({
        bookList: list,
        nextNum: data.endNum,
        isLastPage: data.lastPage,
        loading: false // 加载完毕
      })
      
      // this.toggleDialog(false)
    }).catch(res => {
      // console.error("error", res)
      // this.toggleDialog(false)
      this.setData({
        loading: false // 加载完毕
      })
    })
  },
  // 搜索指定状态图书
  changeBookStatus(e) {
    this.setData({
      bookStatus: e.currentTarget.dataset.bookstatus
    })
    this.resetBookList()
  },
  // 搜索指定类型图书
  changeBookType(e) {
    this.setData({
      bookType: e.currentTarget.dataset.booktype
    })
    this.resetBookList()
  },
  //控制 pop 的打开关闭
  toggleDialog(value) {
    if (typeof (value) == "boolean") {
      this.setData({
        showDialog: value
      });
    } else {
      this.setData({
        showDialog: !this.data.showDialog
      });
    }
  },
  // 搜索指定关键字图书
  bookNameSearchInput(e) {
    this.setData({
      bookNameSearch: e.detail.value
    })
  },
  // 允许从相机和相册扫码
  bookcodesearch(e) {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        console.log(res.result)
        this.setData({
          bookCodeSearch: res.result
        })
        this.resetBookList()
      }
    })
  },
  // 进入图书详情页面
  gotoDetail(e) {
    wx.navigateTo({
      url: '../bookDetail/bookDetail?bookId=' +
      e.currentTarget.dataset.bookid
    })
  },
  // 进入消息详情页
  gotoMessage(e) {
    wx.navigateTo({
      url: '../message/message'
    })
  },
  focusInput(e) {
    this.setData({
      showMask: true
    })
  },
  blurInput(e) {
    this.setData({
      showMask: false
    })
  },
  toggleInput(e) {
    this.setData({
      showMask: false
    })
  },
  // 滑动删除处理
  handleMovableChange(e) {
    this.data.bookList[e.currentTarget.dataset.bookindex].xmove = e.detail.x
    // if (e.detail.source === 'friction') {
    //   if (e.detail.x < -30) {
    //     this.showDeleteButton(e)
    //   } else {
    //     this.hideDeleteButton(e)
    //   }
    // } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
    //   this.hideDeleteButton(e)
    // }
    // console.info(e.detail.source)
  },
  handleTouchend(e) {
    let bookIndex = e.currentTarget.dataset.bookindex
    let bookList = this.data.bookList
    // if (bookList[bookIndex].xmove < -30) {
    //   this.showDeleteButton(e)
    // } else {
    //   this.hideDeleteButton(e)
    // }
    for (var bookIdx in bookList) {
      if (bookIdx != bookIndex && bookList[bookIdx].xmove < 0) {
        this.setXmove(bookIdx, 0)
      }
    }
  },
  /**
   * 点击删除按钮
   */
  handleDeleteProduct(e) {
    let bookIndex = e.currentTarget.dataset.bookindex
    let bookList = this.data.bookList
    if (bookList[bookIndex].confirmDel) {
      this.setXmove(bookIndex, 0)
      bookList[bookIndex].confirmDel = false
      this.setData({
        bookList: bookList
      })
      // 调用接口删除
    } else {
      for (var bookIdx in bookList) {
        bookList[bookIdx].confirmDel = false
      }
      bookList[bookIndex].confirmDel = true
      this.setData({
        bookList: bookList
      })
      this.setXmove(bookIndex, -120)
    }
  },
  /**
   * 显示删除按钮
   */
  showDeleteButton: function (e) {
    let bookIndex = e.currentTarget.dataset.bookindex
    if (this.data.bookList[bookIndex].confirmDel) {
      this.setXmove(bookIndex, -120)
    } else {
      this.setXmove(bookIndex, -65)
    }
  },
  /**
   * 隐藏删除按钮
   */
  hideDeleteButton: function (e) {
    let bookIndex = e.currentTarget.dataset.bookindex
    this.setXmove(bookIndex, 0)
  },
  /**
   * 设置movable-view位移
   */
  setXmove: function (bookIndex, xmove) {
    let bookList = this.data.bookList
    bookList[bookIndex].xmove = xmove
    this.setData({
      bookList: bookList
    })
  },
})
