// 老板主界面路由容器组件
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Laoban extends Component {
  // 初始化显示直接写在组件中,通过操作显示在事件回调函数中发请求
  componentDidMount() {
    // 获取userList
    this.props.getUserList('dashen')
  }

  render() {
    return (
      <UserList userList={this.props.userList}/>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Laoban)