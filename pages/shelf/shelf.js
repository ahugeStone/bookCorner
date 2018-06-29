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
    loading: false//是否正在加载
  },
  onLoad() {
    // this.searchBookList()
  },
  onShow() {
    this.resetBookList()
    // this.searchBookList()
  },
  showMore(){
    // console.info("111");
    if(!this.data.isLastPage) {
      this.searchBookList()
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
    return util.post("CustQueryBookList", {
      openid: app.globalData.openid,
      bookName: this.data.bookNameSearch,
      bookType: this.data.bookType,
      bookStatus: this.data.bookStatus,
      num: this.data.nextNum
    }, null).then(res => {
      var data = res.result
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
      
      this.toggleDialog(false)
    }).catch(res => {
      console.error("error", res)
      this.toggleDialog(false)
      this.setData({
        loading: false // 加载完毕
      })
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
