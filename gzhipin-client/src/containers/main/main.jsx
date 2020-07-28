// 主界面路由组件
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象,有set()/get()/remove()等方法

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'

import {getUser} from '../../redux/actions'

class Main extends Component {

  componentDidMount() {
    //登录过(cookie中有userid),但目前没有登录(redux管理的user中没有_id),发请求获取对应的user
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if (userid && !_id) {
      // 发送异步请求获取user
      this.props.getUser()
    }
  }

  render() {
    // 读取cookie中的userid
    const userid = Cookies.get('userid')
    // 如果没有则自动重定向到登录界面
    if (!userid) {
      return <Redirect to='/login'/>
    }
    // 如果有则读取redux中的user状态
    const {user} = this.props
    // 如果user有没有_id则返回null(不做任何显示)
    if (!user._id) {
      return null
    } else {
      // 如果有_id则显示对应的界面
      // 如果请求根路径则根据user的type和header来计算出一个重定向的路由路径,并自动重定向
      let path = this.props.location.pathname
      if (path === '/') {
        // 得到一个重定向的路由路径
        path = getRedirectTo(user.type, user.header)
        return <Redirect to={path}/>
      }
    }
    return (
      <div>
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
        </Switch>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)