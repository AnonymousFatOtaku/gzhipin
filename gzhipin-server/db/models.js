// 包含多个操作数据库集合数据的Model模块

// 1.连接数据库
// 1.1.引入mongoose
const mongoose = require('mongoose')
// 1.2.连接指定数据库(URL只有数据库是变化的),gzhipin_test即数据库名
mongoose.connect('mongodb://localhost:27017/gzhipin')
// 1.3.获取连接对象
const conn = mongoose.connection
// 1.4.绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () { // 连接成功回调
  console.log('数据库连接成功')
})

// 2.得到对应特定集合的Model
// 2.1.定义Schema(描述文档结构)
const userSchema = mongoose.Schema({ // 通过约束Schema指定文档的结构:属性名/属性值的类型,是否是必须的,默认值
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型:dashen/laoban
  header: {type: String}, // 头像名称
  post: {type: String}, // 职位
  info: {type: String}, // 个人或职位简介
  company: {type: String}, // 公司名称
  salary: {type: String} // 月薪
})
// 2.2.定义Model(与集合对应,可以操作集合)
const UserModel = mongoose.model('user', userSchema) // 集合的名称为:users
// 2.3.向外暴露Model
exports.UserModel = UserModel