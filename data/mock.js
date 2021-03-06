const mock = {
  PSNCreatConversationLoginPre: {
    "header":{ 
      "local": "zh_CN", 
      "agent": "WEB15", 
      "bfw-ctrl": "json", 
      "version": "", 
      "device": "", 
      "platform": "", 
      "plugins": "", 
      "page": "", 
      "ext": "", 
      "cipherType": "0" 
    }, 
    "result": "ca381c23-7c4c-418c-8bd5-4d079c63e587",
    "_isException_": false 
  },
  CustQueryIsBinded: {// 查询用户是否绑定
    "result": {
      isBinded: "1",// 0未绑定 1已绑定
      openid: "123123123123123123",
      userName: "老员工",
      userNo: "3693"
    }
  },
  CustBind: {// 用户绑定验证－不报错表示成功
    "result": {},
    "_isException_": false,
    "code":"您的员工号已被别的微信号绑定,请联系管理员!",
    "message":"您的员工号已被别的微信号绑定,请联系管理员!"
  },
  CustQueryBookList: {// 查询图书列表
    "result":{
      pageSize: 3,
      startNum: 1,
      endNum: 3,
      totalPageNum: 1,
      currentPageNum:1 ,
      lastPage: true,
      bookList: [
        {
          bookId: 1,
          bookName: "党的十九大报告",
          bookWriter:"习近平",
          bookBrief:"党的十九大报告简介",
          bookType: "0",// 0党建 1技术
          bookStatus: "1", //0借出 1在库
          bookSource: "党员捐赠", // 图书来源
          bookBuyer: "红领巾", // 图书购买者
          bookTime: "20170808",
          bookRemark: "",
          bookLikeNum: "10",
          bookCommentNum: "20",
          recTime: "20170808"
        }, {
          bookId: 2,
          bookName: "党的十九大报告2",
          bookWriter: "习近平",
          bookBrief: "党的十九大报告简介",
          bookType: "0",// 0党建 1技术
          bookStatus: "0", //0借出 1在库
          bookSource: "党员捐赠", // 图书来源
          bookBuyer: "红领巾", // 图书购买者
          bookTime: "20170808",
          bookRemark: "",
          bookLikeNum: "11",
          bookCommentNum: "22",
          recTime: "20170808"
        },{
          bookId: 3,
          bookName: "党的十九大报告3",
          bookWriter: "习近平",
          bookBrief: "党的十九大报告简介",
          bookType: "0",// 0党建 1技术
          bookStatus: "0", //0借出 1在库
          bookSource: "党员捐赠", // 图书来源
          bookBuyer: "红领巾", // 图书购买者
          bookTime: "20170808",
          bookRemark: "",
          bookLikeNum: "13",
          bookCommentNum: "23",
          recTime: "20170808"
        }
      ]
    },
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustQueryBookDetail: {// 查询图书详情
    "result": {
      bookId: 3,
      bookName: "党的十九大报告3",
      bookWriter: "习近平",
      bookBrief: "党的十九大报告简介,党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介党的十九大报告简介",
      bookType: "0",// 0党建 1技术
      bookStatus: "1", //0借出 1在库
      bookSource: "党员捐赠", // 图书来源
      bookBuyer: "红领巾", // 图书购买者
      bookTime: "20170808",
      bookRemark: "要注意政治正确！",
      bookLikeNum: 13,
      bookCommentNum: 23,
      recTime: "20170808",
      isBorrowed: "0", // 0没有借阅 1正在借阅
      isLiked: "0", // 是否点赞 0否 1是
      isCommented: "1", //是否评论 0否1 是
      bookScore: "9.0",
      id: 100 // 借书id，只有在isBorrowed＝＝1是有此字段
    },
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustQueryBookCommentHistory: {// 查询图书评论历史
    "result": {
      commentHistoryList:[
        {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！学习必备，考试必胜！",
          commentLikeNum: 10,
          isLiked: '0',
          id: 1,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！1",
          commentLikeNum: 10,
          isLiked: '1',
          id: 2,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！2",
          commentLikeNum: 10,
          isLiked: '1',
          id: 3,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 4,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 5,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 6,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 7,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 8,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 9,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 10,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 11,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 12,
          recTime: "2017-12-04 20:01:13.0"
        }, {
          bookId: 1,
          openid: "321321321",
          headImageUrl: "111",
          userName: "讲讲啦",
          comment: "学习必备，考试必胜！3",
          commentLikeNum: 10,
          isLiked: '1',
          id: 13,
          recTime: "2017-12-04 20:01:13.0"
        }
      ]
    },
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustLikeBook: {// 点赞图书－不报错表示成功
    "result": {},
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustCommentBook: {// 评论图书－不报错表示成功
    "result": {},
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustQueryBookBorrowHistory: {// 查看图书借阅历史
    "result": {
      borrowHistoryList: [{
        bookId: '1',
        bookStatus: '0', //0借出 1在库
        borrowStatus: '0', // 本条借阅记录状态 0:已借出 1:已归还
        openid: 'adsfasdf',
        headImgUrl: "123",
        userName: '一个借阅人',
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      }, {
        bookId: '1',
        bookStatus: '1', //0借出 1在库
        borrowStatus: '1', // 本条借阅记录状态 0:已借出 1:已归还
        openid: 'adsfasdf',
        headImgUrl: "123",
        userName: '一个借阅人2',
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      },{
        bookId: '1',
        bookStatus: '1', //0借出 1在库
        borrowStatus: '1', // 本条借阅记录状态 0:已借出 1:已归还
        openid: 'adsfasdf',
        headImgUrl: "123",
        userName: '一个借阅人3',
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      }, {
        bookId: '1',
        bookStatus: '1', //0借出 1在库
        borrowStatus: '1', // 本条借阅记录状态 0:已借出 1:已归还
        openid: 'adsfasdf',
        headImgUrl: "123",
        userName: '一个借阅人4',
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      }, {
        bookId: '1',
        bookStatus: '1', //0借出 1在库
        borrowStatus: '1', // 本条借阅记录状态 0:已借出 1:已归还
        openid: 'adsfasdf',
        headImgUrl: "123",
        userName: '一个借阅人5',
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      }]
    },
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustBorrowBook: {// 借书－不报错表示成功
    "result": {},
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustReturnBook: {// 还书－不报错表示成功
    "result": {},
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustLikeComment: {// 评论点赞
    "result": {},
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustqueryMessage: {// 获取最新动态（消息）
    "result": {
      "messageList": [{
        "id": "1",
        "operationType": "0",
        "operationContent": "",
        "operationTime": "2018-07-18 18:41:45",
        "userName": "黄实",
        "bookName": "中华民族伟大振兴事业"
      },{
        "id": "1",
        "operationType": "2",
          "operationContent": "这是一本非常有意思的书，评价文字请在此区域内显示。这是一本非常有意思的书，评价文字请在此区域内显示。这是一本非常有意思的书，评价文字请在此区域内显示。这是一本非常有意思的书，评价文字请在此区域内显示。",
        "operationTime": "2018-07-18 18:41:45",
        "userName": "黄实",
        "bookName": "中华振兴"
      }, {
        "id": "2",
        "operationType": "1",
        "operationContent": "",
        "operationTime": "2018-07-18 18:41:45",
        "userName": "黄实",
        "bookName": "中华崛起"
      }]
    },
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  },
  CustQueryBookBorrowRecord: {// 用户查看自己的借阅记录
    "result": {
      borrowRecordList: [{
        bookId: '1',
        bookStatus: '0', //0借出 1在库
        bookName: 'JAVA编程思想1',
        openid: '123123',
        headImgUrl: '23ffff',
        userName: '我自己的名字',
        borrowStatus: "0",
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      }, {
        bookId: '2',
        bookStatus: '0', //0借出 1在库
        bookName: 'JAVA编程思想2',
        openid: '123123',
        headImgUrl: '23ffff',
        userName: '我自己的名字',
        borrowStatus: "0",
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      },{
        bookId: '3',
        bookStatus: '0', //0借出 1在库
        bookName: 'JAVA编程思想3',
        openid: '123123',
        headImgUrl: '23ffff',
        userName: '我自己的名字',
        borrowStatus: "1",
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      }, {
        bookId: '4',
        bookStatus: '1', //0借出 1在库
        bookName: 'JAVA编程思想4',
        openid: '123123',
        headImgUrl: '23ffff',
        userName: '我自己的名字',
        borrowStatus: "1",
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      }, {
        bookId: '5',
        bookStatus: '1', //0借出 1在库
        bookName: 'JAVA编程思想5',
        openid: '123123',
        headImgUrl: '23ffff',
        userName: '我自己的名字',
        borrowStatus: "1",
        borrowTime: '2017-12-04 20:01:13.0',
        returnTime: '2017-12-04 20:01:13.0'
      }]
    },
    "_isException_": false,
    "code": "role.invalid_user",
    "message": "用户绑定验证错误"
  }
}

module.exports = {
  mock: mock
}
