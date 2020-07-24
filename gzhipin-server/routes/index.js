var express = require('express');
var router = express.Router();

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
router.post('/register', function (req, res) {
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
})

module.exports = router;
