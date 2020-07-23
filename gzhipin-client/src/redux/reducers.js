// 包含n个reducer函数:根据老的state和指定的action返回一个新的state
import {combineReducers} from "redux";

function xxx(state = 0, action) {
  return state
}

function yyy(state = 1, action) {
  return state
}

// 通过combineReducers合并多个reducer，向外暴露的状态的结构为：{xxx:0,yyy:1}
export default combineReducers({
  xxx,
  yyy
})