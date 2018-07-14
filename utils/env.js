const url = [// 只使用第1项环境
// 'https://shanximokey.cn/CustApp/_bfwajax.do',//老版本后台
// 'https://cvm.ahuangtongxue.cn/bookCorner/', // 新版本bfw风格接口后台
// 'https://cvm.ahuangtongxue.cn/bookCornertest/v1/',// 新版本rest风格后台-测试
'https://cvm.ahuangtongxue.cn/bookCornerprod/v1/',// 新版本rest风格后台-生产
'http://localhost:8080/bookCorner/v1/'// 本地调试环境
]
const imgurl = 'https://cvm.ahuangtongxue.cn/images/'
const debug = "false" // 是否跳过腾讯oauth
const demo = false //是否模板数据
const springboot = true // 是否使用springboot

module.exports = {
  url: url,
  imgurl: imgurl,
  debug: debug,
  demo: demo,
  springboot
}
