var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const {UserModel, ChatModel} = require('../db/models')
const filter = {password: 0, __v: 0} // 指定要过滤的属性

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/*
回调函数的使用步骤：
1.获取请求参数
2.处理
3.返回响应数据
*/
/*
注册用户注册路由
path为:/register
请求方式为:POST
接收username和password参数
admin是已注册用户
注册成功返回:{code: 0, data: {_id: 'abc', username: ‘xxx’, password:’123’}
注册失败返回:{code: 1, msg: '此用户已存在'}
*/
/*router.post('/register', function (req, res) {
  console.log('register()')
  // 获取请求参数
  const {username, password} = req.body
  // 处理
  if (username === 'admin') { // 注册失败
    // 返回响应数据(失败)
    res.send({code: 1, msg: '此用户已存在'})
  } else { // 注册成功
    // 返回响应数据(成功)
    res.send({code: 0, data: {id: 'abc1', username, password}})
  }
})*/

// 注册的路由
router.post('/register', function (req, res) {
  // 读取请求参数数据
  const {username, password, type} = req.body
  // 处理:根据username查询,判断用户是否已经存在,如果存在则返回提示错误的信息,如果不存在则保存
  UserModel.findOne({username}, function (err, user) {
    if (user) { // 如果user有值则用户已存在
      // 返回提示错误的信息
      res.send({code: 1, msg: '此用户已存在'})
    } else { // 无值则不存在
      // 保存,密码要用md5加密
      new UserModel({username, type, password: md5(password)}).save(function (error, user) {
        // 生成一个cookie(userid:user._id)标识用户登录,并交给浏览器保存,maxAge为存活时间以毫秒为单位
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
        // 返回包含user的json数据
        const data = {username, type, _id: user._id} // 响应数据中不要携带password
        res.send({code: 0, data})
      })
    }
  })
})

// 登录的路由
router.post('/login', function (req, res) {
  const {username, password} = req.body
  // 根据username和password查询数据库users,如果没有则返回提示错误的信息,如果有则返回包含user的登录成功信息
  UserModel.findOne({username, password: md5(password)}, filter, function (err, user) {
    if (user) { // 登录成功
      // 生成一个cookie(userid:user._id)标识用户登录,并交给浏览器保存,maxAge为存活时间以毫秒为单位
      res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
      // 返回登录成功信息(包含user)
      res.send({code: 0, data: user})
    } else {// 登录失败
      res.send({code: 1, msg: '用户名或密码不正确!'})
    }
  })
})

module.exports = router;
