// 包含多个工具函数的模块
/*
用户主界面路由
  dashen:/dashen
  laoban:/laoban
用户信息完善界面路由
  dashen:/dasheninfo
  laoban:/laobaninfo
*/

// 返回对应的路由路径
export function getRedirectTo(type, header) {
  let path
  // 根据user.type判断用户类型
  if (type === 'laoban') {
    path = '/laoban'
  } else {
    path = '/dashen'
  }
  // 根据user.header是否有值判断是否已经完善信息
  if (!header) { // 没有值则返回信息完善界面的path
    path += 'info'
  }
  return path
}