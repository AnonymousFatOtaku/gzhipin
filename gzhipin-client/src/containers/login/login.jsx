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

const ListItem = List.Item

export default class Register extends Component {

  // 使用state保存收集的数据
  state = {
    username: '',  // 用户名
    password: '',  // 密码
  }

  // 点击登录调用
  login = () => {
    console.log(this.state)
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
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
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