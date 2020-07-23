// 入口JS
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'

ReactDOM.render((
  <Provider store={store}>
    {/*在路由器中渲染路由组件，在同一时刻只能有一个路由，所以要通过Switch来切换*/}
    <HashRouter>
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route component={Main}></Route> {/*默认组件*/}
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'))