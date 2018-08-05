//shelf.js
//获取应用实例
const app = getApp()
import util from '../../utils/util'
import env from '../../utils/env.js'

Page({
  data: {
    bookList:[],
    bookNameSearch: "",
    bookType: "",
    bookStatus: "",
    env: env,
    showDialog: false,
    nextNum: 0,//下一页开始序号
    isLastPage: false,//是否为最后一页
    loading: false,//是否正在加载
    messageList: [] // 最新消息
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
  showMore(){
    // console.info("111");
    if(!this.data.isLastPage) {
      this.searchBookList()
    }
  },
  getMessages() {
    util.rest("GET", "messages", {
      num: 2
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
  refreshBookId() {
    var edBookId = app.globalData.edBookId
    if (edBookId && edBookId.length > 0) {
      // 遍历所有用户访问过的图书，调用接口刷新其数据
      for (var index of edBookId) {
        util.rest("GET", "books/" + index, {
        }, {
            method: "CustQueryBookDetail"
          }).then(res => {
            var data = res
            data.bookImage = env.imgurl + data.bookId + '.png'
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
      app.globalData.edBookId = [] // 刷新数据后清空待处理图书列表
    }
  },
  resetBookList() {
    this.setData({
      bookList: [],
      nextNum: 0,
      isLastPage: false
    })
    this.searchBookList()
  },
  searchBookList() {
    this.setData({
      loading: true //正在加载
    })
    return util.rest("GET", "books", {
      // openid: app.globalData.openid,
      bookName: this.data.bookNameSearch,
      bookType: this.data.bookType,
      bookStatus: this.data.bookStatus,
      num: this.data.nextNum
    }, {
      method: "CustQueryBookList",
      hideLoading: true
    }).then(res => {
      var data = res
      for(var book of data.bookList) {
        book.bookImage = env.imgurl + book.bookId + '.png'
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
  changeBookStatus(e) {
    this.setData({
      bookStatus: e.currentTarget.dataset.bookstatus
    })
    this.resetBookList()
  },
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
  },
  gotoMessage(e) {
    wx.navigateTo({
      url: '../message/message'
    })
    // 允许从相机和相册扫码
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
  }
})
