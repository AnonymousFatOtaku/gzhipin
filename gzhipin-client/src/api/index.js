// 包含多个接口请求的函数的模块,函数返回值为promise,通常习惯让接口请求函数以req开头
import ajax from './ajax'

// 注册接口,查询用GET,POST主要用于隐藏提交的数据,在提交了参数数据、修改(增删改)服务器端数据时使用POST
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 登陆接口
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')
// 更新用户接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// 获取用户信息
export const reqUser = () => ajax('/user')