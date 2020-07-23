// redux最核心的管理对象模块，格式固定
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers from './reducers.js'

// 向外暴露store对象
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))