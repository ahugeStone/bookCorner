const url = [// 只使用第1项环境
// 'https://shanximokey.cn/CustApp/_bfwajax.do',//老版本后台
// 'https://cvm.ahuangtongxue.cn/bookCorner/', // 新版本bfw风格接口后台
// 'https://cvm.ahuangtongxue.cn/bookCornertest/v1/',// 新版本rest风格后台-测试
// 'https://cvm.ahuangtongxue.cn/bookCornerprod/v1/',// 新版本rest风格后台-生产
// 'http://cvm.ahuangtongxue.cn:18080/bookCorner/v1/',// 新版本rest风格后台-测试非https
// 'http://cvm.ahuangtongxue.cn:18081/bookCorner/v1/',// 新版本rest风格后台-生产非https
'http://localhost:8081/bookCorner/v1/'// 本地调试环境
]
const imgurl = 'https://cvm.ahuangtongxue.cn/images/' // 图书图片的根路径
const doubanApi = 'https://cvm.ahuangtongxue.cn/douban/v2/' // 豆瓣api代理的url
// 'https://api.douban.com/v2/' // 豆瓣api的url
const debug = "false" // 是否跳过腾讯oauth-废弃
//const demo = true //是使用挡板数据数据
const demo = false //否使用挡板数据数据

const springboot = true // 是否使用springboot-废弃

module.exports = {
  url,
  imgurl,
  debug,
  demo,
  springboot,
  doubanApi
}
