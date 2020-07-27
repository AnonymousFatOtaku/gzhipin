// 登陆路由组件
import React, {Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'

const ListItem = List.Item

class Login extends Component {

  // 使用state保存收集的数据
  state = {
    username: '',  // 用户名
    password: '',  // 密码
  }

  // 点击登录调用
  login = () => {
    // console.log(this.state)
    this.props.login(this.state)
  }

  // 根据输入数据的改变更新对应的状态，参数为要更新的属性名和属性值
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val  // 属性名不是name而是name变量的值
    })
  }

  // 跳转到注册页面
  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {
    const {msg, redirectTo} = this.props.user
    // 如果redirectTo有值就需要重定向到指定的路由
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}
            <WhiteSpace/>
            {/*通过onChange收集用户输入数据，产生变化时才会触发，比onclick效率更高，onclick点击相同也会触发*/}
            <InputItem placeholder='请输入用户名' onChange={val => {
              this.handleChange('username', val)
            }}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入密码' type="password" onChange={val => {
              this.handleChange('password', val)
            }}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)