import { createStore,applyMiddleware } from 'redux'  //添加了applyMiddlewareaction就可以是一个处理异步请求的函数了
import reducer from './reducer'
import thunk from 'redux-thunk' //添加了redux-thunk中间件,action就可以是一个处理异步请求的函数了

/**
 * createStore的主要作用:
 * 1. 初始化store里面的state,在创建时调用一次reducer,action的类型时一个随机每次都会变化的字符串,reducer会返回一个默认的初始化state
 * 2. 给store指定reducer,今后一旦有action派发到store,store就会调用这个reducer
 */
const store = createStore(reducer, applyMiddleware(thunk))

export default store